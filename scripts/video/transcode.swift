import AVFoundation
// transcode.swift <вход> <выход.mp4> <ширина> <высота> <fps> <видео бит/с> <аудио: 1|0>
// H.264 High, SDR Rec.709 (HDR тонмапится композицией), AAC 96k стерео,
// moov в начале файла (аналог +faststart), исходные метаданные не копируются.
let a = CommandLine.arguments
let src = URL(fileURLWithPath: a[1]), dst = URL(fileURLWithPath: a[2])
let W = Int(a[3])!, H = Int(a[4])!, FPS = Int32(a[5])!, VBR = Int(a[6])!, withAudio = a[7] == "1"
try? FileManager.default.removeItem(at: dst)
let asset = AVURLAsset(url: src)
let done = DispatchSemaphore(value: 0)

Task {
  do {
    let vtrack = try await asset.loadTracks(withMediaType: .video).first!
    let natural = try await vtrack.load(.naturalSize)
    let pt = try await vtrack.load(.preferredTransform)
    let duration = try await asset.load(.duration)

    // Композиция: поворот, масштаб с обрезкой до кадра, нужный fps, SDR.
    let comp = AVMutableVideoComposition()
    comp.renderSize = CGSize(width: W, height: H)
    comp.frameDuration = CMTime(value: 1, timescale: FPS)
    // Если исходник не чаще целевой частоты — берём тайминг его собственных кадров,
    // иначе композиция при совпадающей частоте теряет кадры.
    let srcFPS = try await vtrack.load(.nominalFrameRate)
    if srcFPS <= Float(FPS) + 0.5 { comp.sourceTrackIDForFrameTiming = vtrack.trackID }
    comp.colorPrimaries = AVVideoColorPrimaries_ITU_R_709_2
    comp.colorTransferFunction = AVVideoTransferFunction_ITU_R_709_2
    comp.colorYCbCrMatrix = AVVideoYCbCrMatrix_ITU_R_709_2
    let rect = CGRect(origin: .zero, size: natural).applying(pt)
    let ow = abs(rect.width), oh = abs(rect.height)
    let scale = max(CGFloat(W) / ow, CGFloat(H) / oh)
    let t = pt
      .concatenating(CGAffineTransform(translationX: -rect.minX, y: -rect.minY))
      .concatenating(CGAffineTransform(scaleX: scale, y: scale))
      .concatenating(CGAffineTransform(translationX: (CGFloat(W) - ow * scale) / 2,
                                       y: (CGFloat(H) - oh * scale) / 2))
    let layer = AVMutableVideoCompositionLayerInstruction(assetTrack: vtrack)
    layer.setTransform(t, at: .zero)
    let instr = AVMutableVideoCompositionInstruction()
    instr.timeRange = CMTimeRange(start: .zero, duration: duration)
    instr.layerInstructions = [layer]
    comp.instructions = [instr]

    let reader = try AVAssetReader(asset: asset)
    let vout = AVAssetReaderVideoCompositionOutput(videoTracks: [vtrack], videoSettings: [
      kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange,
    ])
    vout.videoComposition = comp
    reader.add(vout)

    let writer = try AVAssetWriter(outputURL: dst, fileType: .mp4)
    writer.shouldOptimizeForNetworkUse = true
    writer.metadata = []
    let vin = AVAssetWriterInput(mediaType: .video, outputSettings: [
      AVVideoCodecKey: AVVideoCodecType.h264,
      AVVideoWidthKey: W, AVVideoHeightKey: H,
      AVVideoColorPropertiesKey: [
        AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
        AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
        AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2,
      ],
      AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: VBR,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: Int(FPS) * 2,
        AVVideoExpectedSourceFrameRateKey: Int(FPS),
      ],
    ])
    vin.expectsMediaDataInRealTime = false
    writer.add(vin)

    var aout: AVAssetReaderAudioMixOutput?
    var ain: AVAssetWriterInput?
    let atracks = try await asset.loadTracks(withMediaType: .audio)
    if withAudio, !atracks.isEmpty {
      let o = AVAssetReaderAudioMixOutput(audioTracks: atracks, audioSettings: [
        AVFormatIDKey: kAudioFormatLinearPCM, AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2,
        AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false,
        AVLinearPCMIsNonInterleaved: false,
      ])
      reader.add(o); aout = o
      let i = AVAssetWriterInput(mediaType: .audio, outputSettings: [
        AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2,
        AVEncoderBitRateKey: 96000,
      ])
      i.expectsMediaDataInRealTime = false
      writer.add(i); ain = i
    }

    reader.startReading()
    writer.startWriting()
    writer.startSession(atSourceTime: .zero)

    let group = DispatchGroup()
    func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderOutput, _ label: String) {
      group.enter()
      let q = DispatchQueue(label: label)
      input.requestMediaDataWhenReady(on: q) {
        while input.isReadyForMoreMediaData {
          if let buf = output.copyNextSampleBuffer() {
            if !input.append(buf) { input.markAsFinished(); group.leave(); return }
          } else { input.markAsFinished(); group.leave(); return }
        }
      }
    }
    pump(vin, vout, "v")
    if let ain, let aout { pump(ain, aout, "a") }
    group.wait()

    if reader.status == .failed { throw reader.error ?? NSError(domain: "reader", code: 1) }
    await writer.finishWriting()
    if writer.status != .completed { throw writer.error ?? NSError(domain: "writer", code: 1) }
    let size = (try FileManager.default.attributesOfItem(atPath: dst.path)[.size] as? Int) ?? 0
    print(String(format: "готово: %@ — %.1f МБ, %.1f с", dst.lastPathComponent, Double(size) / 1_048_576, CMTimeGetSeconds(duration)))
  } catch {
    print("ОШИБКА:", error)
  }
  done.signal()
}
done.wait()

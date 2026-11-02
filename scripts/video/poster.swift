import AVFoundation
import AppKit
// poster.swift <видео> <секунда> <выход.jpg> [качество]
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero
let q = a.count > 4 ? Double(a[4])! : 0.82
let sem = DispatchSemaphore(value: 0)
Task {
  do {
    let (img, _) = try await gen.image(at: CMTime(seconds: Double(a[2])!, preferredTimescale: 600))
    let data = NSBitmapImageRep(cgImage: img).representation(using: .jpeg, properties: [.compressionFactor: q])!
    try data.write(to: URL(fileURLWithPath: a[3]))
    print("ок \(img.width)×\(img.height) \(data.count/1024) КБ → \(a[3])")
  } catch { print("ОШИБКА", error) }
  sem.signal()
}
sem.wait()

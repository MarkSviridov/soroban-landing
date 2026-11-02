# Видео

## Файлы (входят в сборку)

> **С 02.11.2026 на первом экране обеих версий основного сайта — `welcome-ro.mp4`**
> (преподаватель у доски, румынский; на `/` под ним пометка «Видео на румынском языке»).
> Ролики `vsl-soroban.mp4` и `ro/vsl-soroban-ro.mp4` с постерами больше нигде не
> используются — лежат в `public/videos/` на случай возврата. Отдельного блока
> с видео у доски на основном сайте больше нет, чтобы ролик не повторялся.

| Файл                            | Где используется                                                            | Параметры                                                           |
| ------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `vsl-soroban.mp4`               | **Hero** (`Hero.astro`) — автозапуск, muted, loop                           | H.264 High / AAC-LC, 720×1280 (9:16), 116 с, ~18.4 МБ, `+faststart` |
| `vsl-soroban-poster.jpg`        | постер для Hero-видео                                                       | 720×1280, ~82 КБ (кадр 45 с)                                        |
| `vsl-soroban-lesson.mp4`        | **секция «Видео о занятиях»** (`VSL.astro`) — с `controls`, без автозапуска | H.264 High / AAC-LC, 720×1280 (9:16), 27 с, ~3.2 МБ, `+faststart`   |
| `vsl-soroban-lesson-poster.jpg` | постер для секционного видео                                                | 720×1280, ~112 КБ (кадр 6 с)                                        |

Оригиналы (не входят в сборку) — `media-src/videos/`:
`VSLPlaceholder.MOV` (~42 МБ) → `vsl-soroban.mp4`; `IMG_9394.MP4` (~9 МБ) → `vsl-soroban-lesson.mp4`.

## Как пересобрать веб-версии (из корня проекта)

```bash
# Hero-видео
ffmpeg -i media-src/videos/VSLPlaceholder.MOV \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 23 -preset slow \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart -map_metadata -1 \
  public/videos/vsl-soroban.mp4
ffmpeg -ss 45 -i media-src/videos/VSLPlaceholder.MOV -frames:v 1 -q:v 3 public/videos/vsl-soroban-poster.jpg

# Видео для секции «Видео о занятиях»
ffmpeg -i media-src/videos/IMG_9394.MP4 \
  -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 23 -preset slow \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart -map_metadata -1 \
  public/videos/vsl-soroban-lesson.mp4
ffmpeg -ss 6 -i media-src/videos/IMG_9394.MP4 -frames:v 1 -q:v 3 public/videos/vsl-soroban-lesson-poster.jpg
```

Оба видео вертикальные (9:16) — пропорции менять нельзя. CRF 23 — базовое качество; больше качество — 21–22, меньше вес — 25.

## Внешний хостинг (YouTube / Vimeo)

Заменить `<video>` в нужном компоненте на
`<iframe class="aspect-[9/16] w-full rounded-3xl" src="…" loading="lazy" allowfullscreen>`.

## Онлайн-лендинг (`public/videos/online/`)

| Файл                       | Где используется                                                      | Параметры                                                           |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `online-lesson.mp4`        | первый экран `/online/` — автозапуск без звука, петля; звук по кнопке | H.264 High, 720×1280, 30 к/с, ~1,2 Мбит/с, AAC 96k, 31,7 с, ~4,9 МБ |
| `online-lesson-poster.jpg` | постер                                                                | кадр 18 с, ~160 КБ                                                  |
| `welcome-ro.mp4`           | блок «Prezentare» — только `/online/`, с кнопками, без автозапуска    | H.264 High, 720×1280, 30 к/с, ~1,4 Мбит/с, AAC 96k, 42,7 с, ~7,5 МБ |
| `welcome-ro-poster.jpg`    | постер                                                                | кадр 22 с, ~85 КБ                                                   |

Исходники — `media-src/videos/online/` (**исключены из git**: файл приветственного
видео 260 МБ, GitHub не принимает файлы больше 100 МБ). Хранятся только локально.

`online-lesson-IMG_6961.MOV` — 1080×1920 HEVC 30 к/с; `welcome-ro-IMG_5935.MP4` — 2160×3840 H.264 50 к/с.

### Пересборка без ffmpeg

На этом Mac нет ffmpeg, поэтому перекодировщик написан на AVFoundation —
`scripts/video/`. Он даёт то же, что рецепт выше: H.264 High, AAC 96k,
moov в начале файла, без метаданных исходника (в видео с iPhone записана геолокация).

```bash
swiftc -O -o /tmp/transcode scripts/video/transcode.swift
swiftc -O -o /tmp/poster scripts/video/poster.swift

/tmp/transcode media-src/videos/online/online-lesson-IMG_6961.MOV public/videos/online/online-lesson.mp4 720 1280 30 1200000 1
/tmp/poster public/videos/online/online-lesson.mp4 18 public/videos/online/online-lesson-poster.jpg

/tmp/transcode media-src/videos/online/welcome-ro-IMG_5935.MP4 public/videos/welcome-ro.mp4 720 1280 30 1400000 1
/tmp/poster public/videos/welcome-ro.mp4 22 public/videos/welcome-ro-poster.jpg
```

Аргументы `transcode`: вход, выход, ширина, высота, к/с, битрейт видео, звук (`1`/`0`).

После перекодирования удалите временные файлы `*.sb-*` в `public/videos/online/`,
если они появились, — иначе уедут в сборку.

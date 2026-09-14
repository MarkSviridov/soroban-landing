# Видео

## Файлы (входят в сборку)

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

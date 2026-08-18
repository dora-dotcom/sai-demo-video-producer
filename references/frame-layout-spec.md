# Sai Demo Frame Layout Specification

## Canvas and video opening

- Canvas: 2560×1440
- Format: RGBA PNG
- Transparent recording opening: `(128, 72)` through `(2432, 1368)`
- Opening size: 2304×1296
- Opening aspect ratio: exact 16:9
- Header rail: 72 px
- Footer rail: 72 px

The recording is composited beneath the frame at 2304×1296. Do not crop, stretch, or cover it.

## Header

- Exact bundled Sai wordmark at upper left
- Green mono labels: `INDUSTRY`, `DEMO`, `DESCRIPTION`
- Values appear on one line below the labels
- Green `LIVE` pill at upper right
- Values shrink to fit their assigned fields and ellipsize only as a last resort

## Footer capability rail

1. `EVERY OS` — `Works across platforms`
2. `GUI-NATIVE` — `No API or MCP required`
3. `ALWAYS ON` — `Cloud VM or BYOD`
4. `TOKEN-EFFICIENT` — `More done per token`

## Palette

- Sai green: `#16D342`
- Dark: `#0C0C0C`
- Off-white: `#F9FAF5`
- White: `#FFFFFF`
- Light rule: `#DADAD6`
- Dark rule: `#3A3A3A`

## Typography

- Values and subtitles: bundled Manrope
- Labels and capability titles: Menlo when available, with a bundled-font fallback

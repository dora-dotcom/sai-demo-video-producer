#!/usr/bin/env python3
"""Generate approved Sai light/dark demo-video frames and previews."""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


SKILL_DIR = Path(__file__).resolve().parents[1]
ASSETS = SKILL_DIR / "assets"
FONT_PATH = ASSETS / "Manrope-VariableFont_wght.ttf"
LOGO_PATH = ASSETS / "sai-wordmark-green-transparent.png"
MONO_CANDIDATES = (
    Path("/System/Library/Fonts/Menlo.ttc"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"),
    FONT_PATH,
)

W, H = 2560, 1440
VIDEO = (128, 72, 2432, 1368)
GREEN = (22, 211, 66, 255)
BLACK = (12, 12, 12, 255)
OFFWHITE = (249, 250, 245, 255)
WHITE = (255, 255, 255, 255)
MID = (106, 106, 106, 255)
RULE = (218, 218, 214, 255)


def regular(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_PATH), size=size)


def mono(size: int) -> ImageFont.FreeTypeFont:
    for candidate in MONO_CANDIDATES:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    raise FileNotFoundError("No label font is available")


def contain(image: Image.Image, max_w: int, max_h: int) -> Image.Image:
    scale = min(max_w / image.width, max_h / image.height)
    size = (round(image.width * scale), round(image.height * scale))
    return image.resize(size, Image.Resampling.LANCZOS)


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    return value[:80] or "sai-demo"


def fit_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    max_width: int,
    start_size: int = 22,
    min_size: int = 12,
) -> tuple[str, ImageFont.FreeTypeFont, bool]:
    text = " ".join(text.strip().split())
    for size in range(start_size, min_size - 1, -1):
        font = regular(size)
        if draw.textlength(text, font=font) <= max_width:
            return text, font, False
    font = regular(min_size)
    ellipsis = "…"
    while text and draw.textlength(text + ellipsis, font=font) > max_width:
        text = text[:-1].rstrip()
    return text + ellipsis, font, True


def draw_capability(
    draw: ImageDraw.ImageDraw,
    x: int,
    number: str,
    title: str,
    subtitle: str,
    *,
    rule: bool,
    dark: bool,
) -> None:
    title_color = WHITE if dark else BLACK
    subtitle_color = (168, 168, 168, 255) if dark else MID
    rule_color = (58, 58, 58, 255) if dark else RULE
    if rule:
        draw.line((x - 34, 1380, x - 34, 1426), fill=rule_color, width=2)
    draw.text((x, 1381), number, font=mono(13), fill=GREEN)
    draw.text((x + 40, 1379), title, font=mono(15), fill=title_color)
    draw.text((x + 40, 1408), subtitle, font=regular(15), fill=subtitle_color)


def render_frame(
    *,
    industry: str,
    demo: str,
    description: str,
    dark: bool,
    blank: bool,
) -> tuple[Image.Image, list[str]]:
    background = BLACK if dark else OFFWHITE
    text_color = WHITE if dark else BLACK
    rule_color = (58, 58, 58, 255) if dark else RULE
    frame = Image.new("RGBA", (W, H), background)
    draw = ImageDraw.Draw(frame)

    logo = contain(Image.open(LOGO_PATH).convert("RGBA"), 146, 42)
    frame.alpha_composite(logo, (24, 15))
    draw.line((192, 12, 192, 60), fill=rule_color, width=2)

    fields = (
        (220, 270, "INDUSTRY", industry),
        (516, 480, "DEMO", demo),
        (1030, 1300, "DESCRIPTION", description),
    )
    truncated: list[str] = []
    for x, max_width, label, value in fields:
        draw.text((x, 12), label, font=mono(10), fill=GREEN)
        if not blank and value.strip():
            fitted, font, was_truncated = fit_text(draw, value, max_width)
            draw.text((x, 29), fitted, font=font, fill=text_color)
            if was_truncated:
                truncated.append(label)

    label = "LIVE"
    label_font = mono(13)
    pill_width = round(draw.textlength(label, font=label_font)) + 40
    draw.rounded_rectangle((W - 24 - pill_width, 17, W - 24, 55), radius=19, fill=GREEN)
    draw.text((W - 24 - pill_width / 2, 36), label, font=label_font, fill=BLACK, anchor="mm")

    draw.rectangle(VIDEO, fill=(0, 0, 0, 0))
    draw.rectangle(
        (VIDEO[0] - 1, VIDEO[1] - 1, VIDEO[2], VIDEO[3]),
        outline=rule_color,
        width=1,
    )

    column_width = 576
    capabilities = (
        ("01", "EVERY OS", "Works across platforms"),
        ("02", "GUI-NATIVE", "No API or MCP required"),
        ("03", "ALWAYS ON", "Cloud VM or BYOD"),
        ("04", "TOKEN-EFFICIENT", "More done per token"),
    )
    for index, (number, title, subtitle) in enumerate(capabilities):
        draw_capability(
            draw,
            128 + column_width * index,
            number,
            title,
            subtitle,
            rule=index > 0,
            dark=dark,
        )
    return frame, truncated


def make_preview(frame: Image.Image, dark: bool) -> Image.Image:
    width = VIDEO[2] - VIDEO[0]
    height = VIDEO[3] - VIDEO[1]
    sample = Image.new("RGBA", (width, height), WHITE)
    draw = ImageDraw.Draw(sample)
    draw.rectangle((0, 0, width, 70), fill=(244, 244, 241, 255))
    draw.rounded_rectangle((24, 94, 292, height - 24), radius=18, fill=(241, 241, 237, 255))
    for index in range(6):
        y = 148 + index * 68
        draw.rounded_rectangle((62, y, 246, y + 16), radius=8, fill=(208, 208, 203, 255))
    draw.rounded_rectangle(
        (322, 94, width - 24, height - 24),
        radius=18,
        outline=(225, 225, 220, 255),
        width=2,
    )
    draw.rounded_rectangle((352, 128, width - 54, 190), radius=12, fill=(245, 245, 242, 255))
    draw.text(
        (1370, 670),
        "2304 × 1296 VIDEO · 16:9",
        font=mono(18),
        fill=(155, 155, 150, 255),
        anchor="mm",
    )
    preview = Image.new("RGBA", (W, H), BLACK if dark else WHITE)
    preview.alpha_composite(sample, (VIDEO[0], VIDEO[1]))
    preview.alpha_composite(frame)
    return preview


def validate_frame(path: Path) -> dict[str, object]:
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        samples = (
            rgba.getpixel((VIDEO[0] + 10, VIDEO[1] + 10))[3],
            rgba.getpixel(((VIDEO[0] + VIDEO[2]) // 2, (VIDEO[1] + VIDEO[3]) // 2))[3],
            rgba.getpixel((VIDEO[2] - 10, VIDEO[3] - 10))[3],
        )
        valid = image.size == (W, H) and image.mode == "RGBA" and samples == (0, 0, 0)
        return {
            "path": str(path),
            "size": list(image.size),
            "mode": image.mode,
            "transparent_opening_samples": list(samples),
            "valid": valid,
        }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--industry", default="")
    parser.add_argument("--demo", default="")
    parser.add_argument("--description", default="")
    parser.add_argument("--slug")
    parser.add_argument("--output-dir", type=Path, default=Path.cwd() / "outputs" / "sai_demo_frames")
    parser.add_argument("--modes", choices=("both", "light", "dark"), default="both")
    parser.add_argument("--blank", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not args.blank and not any((args.industry.strip(), args.demo.strip(), args.description.strip())):
        raise SystemExit("Provide frame copy or use --blank")
    output_dir = args.output_dir.expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    slug = slugify(args.slug or f"{args.industry}-{args.demo}" or "sai-standard")
    modes = ("light", "dark") if args.modes == "both" else (args.modes,)

    created: list[Path] = []
    validations: list[dict[str, object]] = []
    truncated: dict[str, list[str]] = {}
    for mode in modes:
        dark = mode == "dark"
        frame, truncated_fields = render_frame(
            industry=args.industry,
            demo=args.demo,
            description=args.description,
            dark=dark,
            blank=args.blank,
        )
        frame_path = output_dir / f"{slug}_{mode}_2560x1440_transparent.png"
        preview_path = output_dir / f"{slug}_{mode}_2560x1440_preview.jpg"
        frame.save(frame_path, optimize=True)
        make_preview(frame, dark).convert("RGB").save(preview_path, quality=95)
        created.extend((frame_path, preview_path))
        validations.append(validate_frame(frame_path))
        truncated[mode] = truncated_fields

    manifest = {
        "source": {
            "industry": args.industry,
            "demo": args.demo,
            "description": args.description,
            "blank": args.blank,
        },
        "layout": {
            "canvas": [W, H],
            "video_opening": list(VIDEO),
            "video_size": [VIDEO[2] - VIDEO[0], VIDEO[3] - VIDEO[1]],
            "video_aspect_ratio": "16:9",
        },
        "truncated_fields": truncated,
        "validation": validations,
    }
    manifest_path = output_dir / f"{slug}_manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    created.append(manifest_path)

    zip_path = output_dir / f"{slug}_sai_demo_frames.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in created:
            archive.write(path, arcname=path.name)

    result = {
        "output_dir": str(output_dir),
        "files": [str(path) for path in created],
        "zip": str(zip_path),
        "truncated_fields": truncated,
        "valid": all(item["valid"] for item in validations),
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

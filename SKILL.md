---
name: sai-demo-video-producer
description: Turn a raw or silent Sai computer-use screen recording into a polished, editable Simular product demo with the approved Sai outer frame, English Mark voiceover, English captions, subtle background music, product-capability messaging, and fixed neuro-symbolic and CTA end cards. Use for Sai demo-video production, branded demo packaging, repeatable product walkthroughs, ChatCut review edits, or native-4K delivery planning and NLE handoff.
---

# Sai Demo Video Producer

Produce the full Sai demo package while preserving editability and stating resolution truthfully.

## Load required skills

1. Load `sai-demo-frame-generator` for the approved outer frame.
2. Load the relevant ChatCut skills before acting:
   - `chatcut:asset-import`
   - `chatcut:chatcut-plugin-basics`
   - `chatcut:create-motion-graphics`
   - `chatcut:voice`
   - `chatcut:transcription`
   - `chatcut:music`
   - `chatcut:verification`
   - `chatcut:export`
3. Read `references/production-spec.md` before writing narration, captions, music, or end cards.
4. Read `references/4k-delivery.md` whenever the source or requested delivery is 4K.

## Workflow

1. Inspect the actual video stream with `ffprobe`. Record pixel dimensions, fps, duration, and audio presence. Never infer 4K from a filename or display size.
2. Establish the project, timeline fps, delivery mode, and Industry / Demo / Description copy. Default to:
   - `chatcut-review` for a fully editable ChatCut project and up to 1080p export.
   - `native-4k-handoff` when the source is native 4K and the user requests a true 4K master.
3. Generate both approved Sai frame variants with `sai-demo-frame-generator`; use light unless the footage needs dark. Fit the recording beneath the exact 16:9 opening without stretching.
4. Inspect representative source frames and map visible actions to narration beats. Write concise English narration that explains what Sai is doing and why it matters; do not describe unverified actions. Weave the four approved product-capability pillars into natural visual pauses using `references/production-spec.md`.
5. Generate segmented English voiceover with Mark. Write `Sigh` in TTS input when needed to obtain the pronunciation “赛”, but display `Sai` in captions and graphics.
6. Create English captions from the final narration and apply the fixed style from `references/production-spec.md`. Correct brand spellings manually.
7. Add a restrained instrumental technology bed. Keep narration dominant and use music ducking; omit music only when the user asks or it harms clarity.
8. Append the fixed neuro-symbolic card, then the fixed CTA card. Use the bundled JSX and brand assets exactly as directed in `references/production-spec.md`.
9. Verify source/action sync, frame fit, caption legibility, pronunciation, music ducking, end-card order, logo integrity, and final duration using composed timeline frames.
10. Deliver according to `references/4k-delivery.md`. Never label an upscale as native 4K.

## Fixed versus variable content

- Keep fixed: neuro-symbolic card design/copy/VO, CTA design/copy/VO, palette, Manrope typography, caption style, Mark voice, pronunciation rule, four capability pillars, and end-card order.
- Adapt per demo: Industry / Demo / Description, body narration, capability wording and placement, narration timing, footage trims, and total music duration.
- Change fixed content only when the user explicitly asks.

## Bundled resources

- `assets/motion-graphics/neuro-symbolic.jsx` — resolution-adaptive fixed explainer.
- `assets/motion-graphics/neuro-symbolic.properties.json` — its ChatCut property schema.
- `assets/motion-graphics/cta.jsx` — resolution-adaptive fixed CTA.
- `assets/motion-graphics/cta.properties.json` — its ChatCut property schema.
- `assets/brand/sai-logo-primary-horizontal.svg` — CTA Sai logo.
- `assets/brand/simular-logo-black.jpg` — CTA Simular wordmark.
- `references/production-spec.md` — exact copy, property defaults, audio, and captions.
- `references/4k-delivery.md` — truthful review/export decision tree.

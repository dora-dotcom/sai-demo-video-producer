---
name: sai-demo-video-producer
description: Generate approved Sai light and dark demo frames and turn a raw or silent Sai computer-use screen recording into a Simular product demo in either of two cuts - a branded marketing cut with the outer frame, English Mark voiceover, English captions, subtle background music, product-capability messaging, and fixed neuro-symbolic and CTA end cards, or an annotated silent cut with stage-coloured lower-left step labels and speed badges for live sales meetings, post-meeting follow-up, and trade-show loops. Always crops the recording's browser chrome so internal staging URLs never ship. Use for Sai demo-frame generation, Demo Library cases, full demo-video production, branded demo packaging, silent sales-meeting walkthroughs, leave-behind demo videos, repeatable product walkthroughs, ChatCut review edits, or native-4K delivery planning and NLE handoff.
---

# Sai Demo Video Producer

Produce the Sai demo package while preserving editability and stating resolution truthfully.

## Pick the cut first

This skill produces two cuts from the same source recording. Ask which ones are
wanted before doing any work; do not assume the branded cut.

- `branded-marketing` — a compressed narrative: selected acts, speed-ramped,
  under the outer frame, with narration, captions, music, and both fixed end
  cards. A few minutes. For the website, social, and email, where nobody is
  present and the video has to hold a stranger's attention.
- `annotated-silent` — the whole run in order, nothing removed from inside it,
  ramped per act with the rate printed on screen, with a lower-left step label
  on each act. A few minutes. Silent, so it never fights a salesperson
  narrating in the room, and legible on its own once it leaves that room. For
  live meetings, the "send me that video" follow-up, technical evaluation, and
  trade-show loops.

These are not the same edit at two lengths. They answer different questions.

**The time rule.** This demo's argument is elapsed time — a reasoning-led run
takes 8m 31s and costs $1.94; the compiled replay takes 3m 37s and costs $0.05.
Both cuts compress that. The question is whether the viewer can tell.

- **Speeding up with the rate on screen is honest compression.** `8x` in the
  corner lets anyone multiply back to the real duration, and the cost card
  still carries the absolute numbers. Nothing is hidden.
- **Cutting frames out of a run in progress is not.** An agent thinking for
  twenty seconds looks exactly like a recording of nobody doing anything.
  Remove it and the viewer has no way to know, and no way to recover the real
  figure.

So the rule is not "never speed up". It is: **once a run is in flight, do not
cut inside it — ramp the whole act instead and label the rate. Cut only where
no run is in flight**, which is the operator reading a result, editing the
script, or away from the desk. `references/delivery-cuts.md` gives the
two-signal test for that; expect it to remove a couple of minutes at most.

**The rates are a fixed card, not a per-project decision:** Exploration 5x,
Compile & debug 8x, Execute 5x, cost card 1x then 0.5x to hold on the open
card. To retarget the runtime, move the shared Exploration/Execute rate; never
split them. Exploration and Execute must stay equal — their on-screen lengths *are*
the 8m 31s versus 3m 37s comparison, and splitting them (say 8x and 4x) makes
two passages of equal length out of a 2.4x difference, with every badge still
technically correct. See `references/delivery-cuts.md`.

Never leave a ramp unlabelled in either cut. An unmarked speed-up is the one
version of this that really is dishonest.

Labels cost a presenter nothing: they are silent, and they double as their own
prompter. Offer `annotated-silent` for any demo whose value is "watch it
actually work".

Read `references/delivery-cuts.md` before building either one.

## Load required skills

1. Load the relevant ChatCut skills before acting:
   - `chatcut:asset-import`
   - `chatcut:chatcut-plugin-basics`
   - `chatcut:create-motion-graphics`
   - `chatcut:voice`
   - `chatcut:transcription`
   - `chatcut:music`
   - `chatcut:verification`
   - `chatcut:export`
2. Load `google-drive:google-sheets` before reading a Demo Library row. Treat the sheet as read-only.
3. Read `references/delivery-cuts.md` before cutting; it defines both cuts and the strip list.
4. Read `references/production-spec.md` before writing narration, captions, music, or end cards. Skip it for an `annotated-silent`-only request.
5. Read `references/4k-delivery.md` whenever the source or requested delivery is 4K.

## Generate the approved outer frame

Skip this whole section for an `annotated-silent`-only request; that cut has no frame.

1. Determine the copy source:
   - For a Demo Library row, case, or industry, read `references/demo-library.md` and use the current sheet values.
   - For copy supplied directly, use it exactly after trimming surrounding whitespace.
   - For a standard blank frame, keep the `INDUSTRY`, `DEMO`, and `DESCRIPTION` labels and leave their values empty.
2. Map Demo Library columns exactly: A → Industry, B → Demo, C → Description. Do not rewrite, title-case, summarize, or improve the copy unless the user asks.
3. Run `scripts/generate_frames.py` once with `--modes both` and an absolute output directory under the active project's `outputs/sai_demo_frames/`.
4. Inspect both preview JPGs. Confirm that all three values are legible and do not collide, and that the `LIVE` pill is unobstructed.
5. Verify that both production PNGs are 2560×1440 RGBA and that the 2304×1296 recording opening is transparent.
6. Read `references/frame-layout-spec.md` before changing geometry, typography, colors, logo treatment, or fixed footer copy.

Example:

```bash
python /path/to/sai-demo-video-producer/scripts/generate_frames.py \
  --industry "Banking" \
  --demo "Account Opening" \
  --description "Create and fund a new customer account" \
  --slug "banking-account-opening" \
  --modes both \
  --output-dir "/absolute/project/outputs/sai_demo_frames/banking-account-opening"
```

## Workflow

Steps 1-3 and 14 apply to every cut. Steps 4-12 build `branded-marketing`;
step 13 builds `annotated-silent` and is independent of them.

1. Inspect the actual video stream with `ffprobe`. Record pixel dimensions, fps, duration, and audio presence. Never infer 4K from a filename or display size.
2. Establish the project, timeline fps, requested cuts, resolution mode, and Industry / Demo / Description copy. Resolution mode defaults to:
   - `chatcut-review` for a fully editable ChatCut project and up to 1080p export.
   - `native-4k-handoff` when the source is native 4K and the user requests a true 4K master.
3. Crop the browser chrome off the recording before laying anything out. Sai demos are captured in a browser and the address bar carries an internal staging host; shipping it to a customer leaks infrastructure and looks unfinished. Measure the chrome's bottom edge on a real frame, keep the Sai application's own toolbar, and use the scale-and-offset method in `references/delivery-cuts.md` rather than the crop property.
4. Build the marketing shot list. Inspect source frames, find the real act boundaries, and lay the trimmed and speed-ramped footage onto V1. State the target runtime before cutting and check the assembled picture against it.
5. Generate both approved Sai frame artwork files with the bundled `scripts/generate_frames.py`; use light unless the footage needs dark. Fit the recording beneath the exact 16:9 opening without stretching.
6. Inspect representative source frames and map visible actions to narration beats. Write concise English narration that explains what Sai is doing and why it matters; do not describe unverified actions. Weave the four approved product-capability pillars into natural visual pauses using `references/production-spec.md`.
7. Generate segmented English voiceover with Mark. Write `Sigh` in TTS input when needed to obtain the pronunciation “赛”, but display `Sai` in captions and graphics. Read the pronunciation rules in `references/production-spec.md`; sentence-initial `Sigh` and the spelled-out `sai.work` URL both need the workarounds documented there.
8. Read each voiceover clip's real duration before placing it, and confirm it fits its visual window. Never let narration state a number or a result before that number or result is on screen.
9. Create English captions from the final narration and apply the fixed style from `references/production-spec.md`. Correct brand spellings manually.
10. Add a restrained instrumental technology bed. Keep narration dominant and use music ducking; omit music only when the user asks or it harms clarity.
11. Append the fixed neuro-symbolic card, then the fixed CTA card. Use the bundled JSX and brand assets exactly as directed in `references/production-spec.md`.
12. Verify source/action sync, frame fit, caption legibility, pronunciation, music ducking, end-card order, logo integrity, and final duration using composed timeline frames.
13. Build `annotated-silent` on its own timeline from the full source: run both scans in `references/delivery-cuts.md` (agent run state, and picture change), cut only the pauses where neither signal shows activity, pick a playback rate per act, lay every surviving segment end to end at its act's rate, then add one stage-coloured step label per act carrying that rate. Do not derive it from the marketing cut, and do not reuse that cut's trims.
14. Deliver according to `references/4k-delivery.md`. Never label an upscale as native 4K.

## Fixed versus variable content

- Keep fixed: neuro-symbolic card design/copy/VO, CTA design/copy/VO, palette, Manrope typography, caption style, Mark voice, pronunciation rule, four capability pillars, and end-card order.
- Adapt per demo: Industry / Demo / Description, body narration, capability wording and placement, narration timing, footage trims, and total music duration.
- Change fixed content only when the user explicitly asks.
- Keep fixed in `annotated-silent`: the three stage names and their colours, the lower-left placement, an always-visible speed badge, and the top-right product corner mark.
- Never cut inside a run in `annotated-silent`, not even "a little, just the boring part". Ramp the act instead and say so on screen.
- Browser chrome is always cropped, in every cut. This is not a style choice.

## Bundled resources

Text and code travel with this skill:

- `scripts/generate_frames.py` — deterministic light/dark/blank frame renderer and validator.
- `scripts/scan_run_state.py` — samples and clusters the `Agent run:` label, so you know when a run was actually in flight.
- `scripts/scan_picture_change.py` — frame-differences a recording and writes the per-sample change counts.
- `scripts/build_annotated_cut.py` — combines both signals into the between-runs cut list, applies the per-act rates, and lays out the step labels.
- `references/delivery-cuts.md` — the two cuts, the strip list, and the clean-cut framing math.
- `references/production-spec.md` — exact copy, property defaults, pronunciation workarounds, audio, and captions.
- `references/frame-layout-spec.md` — exact frame geometry, palette, typography, and footer copy.
- `references/demo-library.md` — current Demo Library location, field mapping, and read procedure.
- `references/4k-delivery.md` — truthful review/export decision tree.
- `references/motion-graphics/neuro-symbolic.jsx` + `.properties.json` — resolution-adaptive fixed explainer and its ChatCut property schema.
- `references/motion-graphics/cta.jsx` + `.properties.json` — resolution-adaptive fixed CTA and its schema.
- `references/motion-graphics/step-label.jsx` + `.properties.json` — lower-left step caption with speed badge, for `annotated-silent`.
- `references/motion-graphics/corner-mark.jsx` + `.properties.json` — top-right product mark for `annotated-silent`, which has no frame to carry the logo.
- `references/openai-agent-config.yaml` — the OpenAI agent definition.

## Binary brand assets

Fonts and logos live in `assets/` in this repository. They are too large to
travel inside a ChatCut Workflow Skill package, so when running from that
package rather than from a checkout, fetch them first:

    git clone https://github.com/dora-dotcom/sai-demo-video-producer

- `assets/sai-wordmark-green-transparent.png` — exact transparent Sai wordmark for the frame header.
- `assets/Manrope-VariableFont_wght.ttf` — frame value and subtitle typography; also install it so captions and motion graphics can use Manrope.
- `assets/brand/sai-logo-primary-horizontal.svg` — CTA Sai logo.
- `assets/brand/simular-logo-black.jpg` — CTA Simular wordmark.

`scripts/generate_frames.py` expects `assets/` beside it, so run it from a full
checkout rather than from a skill package's own `scripts/` directory. Never
typeset or reconstruct either wordmark when a file is missing; get the file.

# Sai Demo Production Specification

## Brand system

- Background: `#F9FAF5`
- Primary text: `#0C0C0C`
- Muted text: `#6A6A6A`
- Sai green: `#16D342`
- Light rule: `#D8DDD4`
- Typeface: Manrope
- Prefer the light Sai outer frame.
- Use bundled logos; never typeset or reconstruct either wordmark.

## Narration

- Voice: Mark, English.
- Tone: calm, credible, product-led, and concise.
- Pronunciation: Sai sounds like “赛”. Use `Sigh` only in TTS input when necessary; all visible text must say `Sai`.
- Explain the visible action first, then the product capability it demonstrates.
- When applicable, establish early that the demo is running inside a full Windows VM in the cloud.
- Segment narration around visual beats instead of generating one monolithic file.
- Do not claim success before it is visible on screen.

## Product-capability messaging

Use the four pillars printed on the Sai frame as the approved messaging structure:

1. `EVERY OS` — Sai works across macOS, Windows, and Android. Do not mention Linux unless the user explicitly asks.
2. `GUI-NATIVE` — Sai works through the graphical interface, so an API or MCP integration is not required.
3. `ALWAYS ON` — Sai can run in a full Windows VM in the cloud; BYOD is also available.
4. `TOKEN-EFFICIENT` — after a successful reasoning-led run, the proven workflow can become deterministic code and execute repeatedly with far fewer tokens.

Apply these editorial rules:

- Cover all four pillars when the runtime and visible pacing allow.
- Introduce the full cloud Windows VM near the beginning when that is the demonstrated environment.
- Tie each capability to a relevant action or transition; do not recite all four as a detached feature list.
- Use no more than one capability claim in a single narration beat.
- Keep the visible workflow as the main story. For a short demo, prioritize the environment plus the most relevant pillars; the fixed neuro-symbolic card supplies the token-efficiency explanation.
- Treat the frame footer as reinforcement, not a substitute for narration.

Approved sentence patterns to adapt rather than stack verbatim:

- `This demo runs inside a full Windows VM in the cloud, giving Sai a complete environment to work in.`
- `Because Sai is GUI-native, it can complete the workflow through the interface without requiring an API or MCP integration.`
- `The same approach extends across macOS, Windows, and Android.`
- `Teams can use an always-on cloud VM or choose a BYOD deployment.`

## Captions

Use these defaults on a 1920×1080 timeline and scale proportionally for other sizes:

- Font: Manrope
- Size: 36 px
- Weight: 500
- Text: `#F7F7F4`
- Background: `rgba(17,17,17,0.68)`
- Horizontal padding: 8 px
- Vertical padding: 3 px
- Radius: 6 px
- Stroke and shadow: off
- Highlight: off
- Safe box: left 288, top 888, width 1344, height 106

Keep captions to one or two readable lines. Correct `Sai`, `Simular`, `neuro-symbolic`, `Sai for Business`, and `sai.work` after generation.

## Music

- Use a minimal, modern instrumental technology bed without vocals.
- Avoid dramatic trailer music, busy percussion, and prominent melodies.
- Put the music beneath the complete program, including end cards.
- Use voice-led ducking; target approximately `-23 dB` under narration and audition transitions by ear.
- Fade cleanly at the final CTA.

## Fixed neuro-symbolic card

Create from `assets/motion-graphics/neuro-symbolic.jsx`.

- Duration: 12.3 seconds
- Default canvas: 1920×1080 for ChatCut review
- Native-4K asset: 3840×2160 using the same resolution-adaptive JSX
- Eyebrow: `THE NEURO-SYMBOLIC ADVANTAGE`
- Headline: `Explore once. Execute reliably.`
- Step 01 title: `NEURAL`
- Step 01 body: `Reason through the first successful run`
- Step 02 title: `SYMBOLIC`
- Step 02 body: `Compile the proven workflow into code`
- Step ∞ title: `REPEAT`
- Step ∞ body: `Run it again with far fewer tokens`
- Footer: `LLM flexibility × deterministic code`

Fixed voiceover:

> Sigh uses a neuro-symbolic approach. The first successful run uses model reasoning. Then the workflow becomes deterministic code, ready to execute again and again with far fewer tokens.

Caption display correction: replace `Sigh` with `Sai`.

## Fixed CTA card

Import these assets before creating the MG:

- `assets/brand/sai-logo-primary-horizontal.svg`
- `assets/brand/simular-logo-black.jpg`

Create from `assets/motion-graphics/cta.jsx` and set the two image properties to the imported project asset URLs.

- Duration: 11 seconds
- Background: `#F9FAF5`
- Sai logo above the headline
- Headline: `Ready to work with Sai?`
- Team label: `For teams`
- Team action: `Search “Sai for Business”`
- Consumer label: `For everyone`
- Consumer action: `sai.work`
- Footer left: `Powered by Sai`
- Footer right: black Simular wordmark

Fixed voiceover:

> Interested in bringing Sigh to your organization? Search for Sai for Business. To experience our consumer product, visit sai dot work.

Caption display correction: replace `Sigh` with `Sai`; display the URL as `sai.work`.

## End sequence

Place the neuro-symbolic card immediately before the CTA. Use the same warm off-white background so the transition feels continuous. Keep the final CTA on screen long enough for both destinations to be read after the narration ends.

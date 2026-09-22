# Delivery Cuts

Two cuts come out of one source recording. They are not the same edit at two
lengths: the marketing cut selects and compresses a story, the annotated cut
shows the whole run in order with nothing removed from inside it. Build them
separately.

## branded-marketing

The full package. For the website, social posts, email campaigns, and anywhere
the video plays without a person present.

Layers:

1. V1 — trimmed and speed-ramped screen recording, chrome cropped, fitted to
   the frame opening
2. V2 — the approved Sai outer frame PNG, full canvas
3. V1 tail — fixed neuro-symbolic card, then fixed CTA card
4. Higher tracks over the CTA — Sai and Simular wordmarks
5. A1 — segmented Mark narration
6. A2/A3 — instrumental bed with a crossfade where two copies meet
7. Caption item — English captions in the fixed style

## annotated-silent

The whole run, in order, nothing removed from inside it, with one lower-left
step label per act carrying that act's playback rate. No narration, no
captions, no music, no end cards. For live customer meetings, the follow-up
send, technical evaluation, and trade-show loops.

Layers: V1 footage filling the canvas, V2 carrying one step-label motion
graphic per act, and above those a product corner mark that runs the whole
length.

### Ramp, don't cut

The demo's argument is elapsed time: the reasoning-led run takes 8m 31s and
costs $1.94, the compiled replay takes 3m 37s and costs $0.05. Twenty-four
minutes of source has to come down, and there are two ways to do it that look
similar in the timeline and are completely different to a viewer.

Speeding an act up and printing `8x` on it is honest: anyone can multiply back,
and the cost card still shows the absolute numbers. Cutting seconds out of the
middle of a run is not: an agent thinking for twenty seconds is indistinguishable
from nobody doing anything, and once it is gone the viewer cannot tell it was
ever there.

So: **inside a run, never cut — ramp the whole act and label the rate. Between
runs, cut.** Between runs means the operator reading a result, editing the
script, or away from the keyboard; that is the only time the recording contains
nothing the demo is claiming.

### The rate card

Fixed. Do not re-derive it per project, and do not tune it to hit a runtime.

| Act | Rate | Why |
| --- | --- | --- |
| Exploration | **5x** | the reasoning-led run; slow enough to read what the agent is doing |
| Compile & debug | **8x** | repetitive trial and error, and it sits outside the comparison |
| Execute | **5x** | must equal Exploration — see below |
| Cost card appearing | **1x** | it is the conclusion; let it arrive |
| Cost card open | **0.5x** | holds on the opened card so the film ends on the numbers |

**Exploration and Execute must carry the same rate.** Their on-screen lengths
are the 8m 31s versus 3m 37s comparison. Give Exploration 8x and Execute 4x and
they come out 63s versus 59s — the viewer sees two passages of the same length
and the entire argument silently evaporates, even though every badge on screen
is accurate. At a shared rate they land at 112s versus 47s, a ratio of 2.38:1
against a true 2.35:1, and the comparison tells itself.

To change the runtime, move the shared Exploration/Execute rate and leave the
ratio alone — 6x lands the reference cut at 3:37, 5x at 4:03. Match the branded
cut's length so the two deliverables feel like one pair.

Compile & debug is exempt because nothing in the cost card refers to it. That
is also why it gets the fastest rate: it is the longest stretch of repeated
failure and the least rewarding to watch.

Total on the reference recording: 4:03, against a 4:17 branded cut.

## Finding the dead air

The trap here is obvious only in hindsight: **a frozen picture does not mean
nothing is happening.** An agent thinking for twenty seconds shows a completely
static screen, and so does a page loading, and so does a human who walked away.
The first two are the demo. The third is the only thing you may cut.

Cutting on stillness alone removed 11m 42s from the reference recording, almost
all of it agent reasoning — the exact quantity the video exists to demonstrate.
That is the same error as speeding the picture up, just harder to notice.

### The right signal

Sai prints its own run state in the panel: `Agent run: running`,
`Agent run: converting`, `Agent run: code-ready`. Read *that*, and only treat a
pause as cuttable when the agent is idle **and** the picture is frozen.

1. Sample the `Agent run:` strip once a second — crop that fixed region to
   greyscale and cluster identical-looking samples. A handful of clusters comes
   back; render one representative of each and read them. `running` and
   `converting` mean the system is working: never cut inside them.
2. Sample picture change at 4fps as well (see the threshold notes below).
3. A pause is cuttable only where **state is idle AND picture is frozen**, for
   at least 8 seconds. Keep 2.5s of it.

`code-ready` alone is not idle. Once the workflow is compiled, replays are
driven by the script and the agent state sits at `code-ready` for the entire
run — the picture is what tells you the script is working. That is why both
signals are required, not either one.

Expect this to remove very little: 1m 54s out of 24m 12s on the reference
recording, at six places in each source. **If your rule is removing ten minutes,
it is cutting real execution time and it is wrong** — that is what speed ramps
are for.

### Threshold notes for the picture signal

```
ffmpeg -i SOURCE -vf "fps=4,scale=640:-2,format=gray" -f rawvideo -pix_fmt gray -
```

Count pixels whose grey value moved by more than 30 between adjacent samples.

- **Reject the codec noise floor.** A delta of 10 is too loose: h264 makes a
  completely static screen recording register hundreds of changed pixels per
  frame, and two recordings from the same machine can differ by an order of
  magnitude in how much. At 30 the noise disappears and a moving cursor still
  registers. Never carry a "percent of frame changed" threshold between
  projects without re-checking it.
- **Do not require zero change.** A blinking text cursor alone fragments an
  otherwise dead minute. Treat a sample as frozen at <= 10 changed pixels of a
  640-wide frame.
- **Scale matters.** At 320 wide a mouse cursor is a couple of pixels and gets
  averaged away, so real activity reads as stillness.

**Verify before you cut.** Render the first and last frame of the longest few
candidate pauses and confirm they are identical, and check the run state shown
in each. Guard the tail as well: a segment ending exactly at the source
duration is rejected as out of range, so clamp every segment end a quarter
second short.

## Cropping the browser chrome

**Do this for every cut, before laying anything out.** Sai demos are captured in
a browser, and the address bar carries an internal staging host. Shipping that
to a customer leaks infrastructure and makes the video look like an internal
screen grab. It is also the single easiest thing to miss, because it is legible
in every frame and stops registering after twenty minutes of editing.

1. Render one real source frame and measure where the browser chrome ends — the
   tab strip and the address bar go; the Sai application's own toolbar (the
   environment selector row) stays. Measure it; do not guess a round number.
2. Convert to a source-pixel offset `C`.
3. Scale and offset the footage so row `C` lands on the top edge of its target
   box. **Do not use the `crop` property for this.** Crop takes a 0-1 fraction
   and then re-fits the cropped image inside the item box, which reintroduces
   letterboxing and makes the result hard to predict. Scaling and offsetting is
   exact.

For a target box of width `BW`, height `BH`, whose top-left sits at
`(BX, BY)` on the canvas, and a source `W × H` with chrome `C`:

```
item.height = ceil(BH * H / (H - C))
item.width  = round(item.height * W / H)
item.top    = BY - round(C * item.height / H)
item.left   = BX + round((BW - item.width) / 2)
```

Worked example, a 1952×1160 recording with 86px of chrome:

- Full canvas (`BX 0, BY 0, BW 1920, BH 1080`) →
  `width 1964, height 1167, left -22, top -87`
- Branded frame opening (`BX 96, BY 54, BW 1728, BH 972`) →
  `width 1767, height 1050, left 77, top -24`

The chrome now sits above the canvas or behind the frame, and the sides
overflow by ~22px of window border. Verify on a composed frame that the address
bar is gone and no black edge appeared.

## Building the annotated cut

Build it on its own timeline, from the full source. Do not derive it from the
marketing cut: that cut dropped whole passages and ramped the rest, and this one
keeps everything that moved.

1. Run both scans above — run state and picture change — and produce the
   between-runs cut list.
2. Apply the fixed rate card above. Do not invent per-project rates.
3. Create the timeline and lay every surviving segment end to end, each at its
   act's rate, framed for the full canvas with the chrome pushed off (formula
   above). A segment is a source range between two cuts; several of them can
   share one act and therefore one rate.
4. Add one step label per act on a track above, each carrying that act's rate.
5. Sample composed frames across the whole cut. Check that every label matches
   what is on screen underneath it, that every badge matches the real rate, and
   that no cut landed inside a run.

## Corner mark

The branded cut carries the Sai wordmark in its frame header. This cut has no
frame, so it needs its own. Without it a forwarded file or a screenshot is just
an anonymous screen recording of someone else's banking system — and forwarding
is exactly what this cut is for.

Build it from `references/motion-graphics/corner-mark.jsx`, running the full
length of the timeline, with the Sai wordmark placed as a separate SVG item in
the slot the plate reserves.

- Top right, 48px from both edges, on the same dark plate at 86% opacity as the
  step labels — one visual language, two corners.
- Layout: wordmark, hairline rule, then the product name in small caps. On a
  1920×1080 canvas the plate is `1568, 48, 304×58` and the wordmark item sits at
  `1586, 62, 120×30`.
- Use the real wordmark asset. Never typeset "Sai" as text.
- Give the plate absolute geometry rather than a flex row. A flex layout makes
  the wordmark's slot position depend on how the product name happens to
  measure, and the separately-placed wordmark item then lands on top of the
  text.

## Step labels

Create one motion graphic asset from
`references/motion-graphics/step-label.jsx`, then place one item per act on a
track above the footage, each spanning its act exactly and overriding `stage`,
`label`, `speed`, and `accentColor`.

### Stages

Three stages, each with a fixed name and colour. They mirror the neuro-symbolic
story and the closing cost card, so the colour is doing the same work the card
does: neutral while the agent is paying to think, amber while the workflow is
being hardened, green once it just runs.

| Stage | Colour | Covers |
| --- | --- | --- |
| `Exploration` | `#A8B0AC` | the first reasoning-led run, start to first success |
| `Compile & debug` | `#E8A33D` | compiling the run into code, replaying, failing, fixing |
| `Execute` | `#16D342` | the corrected script running clean |

Colour alone never carries meaning — a viewer cannot infer "amber means
debugging". The stage word is what communicates; the colour only makes the
three-act shape visible at a glance. Never ship the colours without the words.

### Form

- Lower left, 48px from both edges, dark panel at 86% opacity. The lower-left
  corner is the Sai chat composer — the least informative region of the frame.
  Never cover the VM viewport or the agent's step list.
- Layout: accent bar, stage name in small caps in the stage colour, then the
  step label in white, then a rule and the speed badge in the stage colour.
- One label per act, spanning the whole act. Labels persist rather than flash;
  a viewer who joins mid-act still needs to know where they are.
- 14-frame fade in and out, carried by the motion graphic itself.

### Writing the labels

- Name the visible action in the present tense, five to eight words:
  `Reading the application form`, `Creating a new client record`,
  `Correcting the script — three failed runs`.
- Put proof in the label where the act delivers it:
  `Client created and active — first run 8m 31s`.
- Find each stage boundary on the picture, not by estimating from source time.
  The moment a failed replay ends and the corrected one begins is visible — the
  run counter increments, the status flips from `Aborted` to `Starting…` — and
  it is rarely where the source timestamps suggest. A label that says
  `Corrected script runs end to end` over a frame still reading
  `Task stopped before any actions were taken` destroys the credibility of
  every other label in the cut.
- Do not restate narration from the branded cut, and do not make capability
  claims. This cut has no voiceover to balance a marketing line, so a claim
  reads as a caption on evidence that is not on screen.
- Set `speed` to the act's real playback rate and never leave it off. The badge
  is what converts a speed ramp from a trick into a disclosure, and it is the
  first thing a technical viewer looks for. Keep it on even at `1x`.
- Leave acts that are already self-explanatory unlabelled. The closing cost
  card is entirely text; a label on top of it is noise.

Implementation note: a motion graphic item cannot be longer than its asset's own
duration, so create the step-label asset at least as long as the longest act
before placing any items.

## Verification per cut

| Check | branded | annotated |
| --- | --- | --- |
| Browser chrome cropped, no staging URL anywhere | yes | yes |
| No stray gaps or overlaps on V1 | yes | yes |
| Frame opening fully covered, no black edges | yes | n/a |
| Narration never precedes its on-screen event | yes | n/a |
| Caption brand spellings corrected | yes | n/a |
| End-card order and logo integrity | yes | n/a |
| Footage fills canvas, crop is only chrome and window border | n/a | yes |
| Timeline is silent end to end | n/a | yes |
| No cut lands inside a run; every removed pause sits between runs | n/a | yes |
| Every act's badge matches that act's actual playback rate | n/a | yes |
| Exploration and Execute share a rate, and their on-screen lengths still read about 2.4 : 1 | n/a | yes |
| Every removed pause verified idle in the run state, not just frozen | n/a | yes |
| Total removed time is minutes at most; if it is more, the rule is wrong | n/a | yes |
| One label per act, spans the act, matches what is on screen | n/a | yes |
| Stage boundaries land on the real event, not an estimate | n/a | yes |
| Stage colour matches the stage word | n/a | yes |
| Speed badge matches the act's actual playback rate | n/a | yes |
| Labels clear of the VM viewport and the agent step list | n/a | yes |
| Corner mark present for the full length, wordmark seated in its slot | n/a | yes |
| Composed frames sampled across full duration | yes | yes |

## Naming

Keep both cuts in the same project so they share assets and stay in sync when
the footage changes. Put the audience in the timeline name, not just `annotated`
or `branded` — the person who opens the project six weeks later needs to know
which one goes to the customer.

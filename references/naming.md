# Naming

Every name here derives from the same three facts already on the outer frame:
Industry, Demo, and the recording date. Do not invent a second vocabulary for
the same demo.

`slug()` means: lowercase, spaces to hyphens, drop anything that is not
`a-z 0-9 -`. `Client Onboarding` becomes `client-onboarding`.

The date is the **recording** date, not the export date. Screen recordings
usually carry it (`longshot20260922191700` → `20260922`); fall back to the
file's modification time. Keeping the recording date means every deliverable
cut from one session sorts together, however long the edit takes.

## Exports

```
sai_<industry>_<demo>_<cut>_<yyyymmdd>_<resolution>[_r<n>].<ext>
```

```
sai_banking_client-onboarding_branded_20260922_1080p.mp4
sai_banking_client-onboarding_annotated_20260922_1080p.mp4
sai_banking_client-onboarding_branded_20260922.srt
sai_banking_client-onboarding_branded_20260922_resolve.xml
```

- `<cut>` is `branded` or `annotated`. Nothing else.
- Lowercase throughout, underscores between fields, hyphens inside a field.
  Survives URLs, email clients, Windows, and S3 keys without escaping.
- `_r2`, `_r3` only when re-exporting the same cut of the same recording after
  a content change. A re-export with no change keeps its name and overwrites.
- Resolution last, so `720p` and `1080p` versions sort next to each other.
- Never put an internal hostname, a ticket id, `final`, `FINAL`, `v2-real`, or
  a person's name in a delivered filename.

## Timelines

```
<Industry> · <Demo> — <Cut> (<audience>)
```

```
Banking · Client Onboarding — Branded (marketing)
Banking · Client Onboarding — Annotated (send to customer)
```

Human-readable, because this name is only ever read inside the editor. The
audience in parentheses is load-bearing: six weeks later it is the only thing
telling the next person which file goes to a customer.

## Generated assets in the project

| Asset | Pattern | Example |
| --- | --- | --- |
| Narration clip | `vo_<nn>_<topic-slug>` | `vo_07_first-run-result` |
| Music bed | `<slug>_bed` | `client-onboarding_bed` |
| Motion graphic | `Sai <Name> Card` / `Sai <Name>` | `Sai CTA Card`, `Sai Step Label` |
| Outer frame | `<slug>_<mode>_2560x1440_transparent.png` | produced by `generate_frames.py` |

Number narration clips so they sort in playback order, and put the topic in the
name. `vo01 … vo18` is unreadable the moment one line needs re-recording: the
replacement is `vo01b` and nobody can tell what either of them says.

## Working files

Keep intermediates out of the deliverable namespace. Frame renders, scans, and
keep-lists live under `outputs/` or a scratch directory; only the patterns
above ever leave the machine.

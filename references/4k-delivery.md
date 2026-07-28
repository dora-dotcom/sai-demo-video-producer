# 4K Delivery Rules

## Resolution classification

Inspect the primary video stream with `ffprobe`.

- Native UHD 4K: 3840×2160.
- Native DCI 4K: 4096×2160.
- Anything smaller is not native 4K.
- A 1920×1080 export enlarged to 3840×2160 is a `4K upscale`, not a native-4K master.

Report both source resolution and delivery resolution.

## ChatCut review mode

Use ChatCut for the editable project, timeline, captions, audio, and motion graphics. ChatCut video export currently supports 480p, 720p, and 1080p only. A 4K source can remain useful in the project, but ChatCut's direct video export is still capped at 1080p.

Deliver:

1. Editable ChatCut project.
2. Optional 1080p review MP4.
3. Optional subtitles/audio exports.

## Native-4K handoff mode

Use this path only when the source is native 4K and the user wants a true 4K final master.

1. Keep original 4K source media; never replace it with the 1080p ChatCut review export.
2. Create the two bundled motion graphics at 3840×2160. Their JSX scales the 1920×1080 design system to the output canvas.
3. Export needed motion graphics as transparent ProRes 4444 using timeline instances so property overrides are preserved.
4. Export DaVinci Resolve XML (`fcp_xml_resolve`) or Premiere-compatible XML, plus subtitles and mixed/stem audio as needed.
5. Relink the XML in the 4K-capable NLE to the original 4K source media and the rendered MG media.
6. Set the finishing timeline and export to 3840×2160, preserving the intended fps.
7. Inspect the final file with `ffprobe` and visually check representative frames before calling it native 4K.

If the external NLE or ProRes entitlement is unavailable, stop at a complete handoff package and explain the final manual relink/render step. Do not claim ChatCut alone produced a 4K master.

## Outer frame at 4K

The approved frame generator's canonical raster is 2560×1440 with a 2304×1296 opening. Treat it as the brand-layout source of truth.

For a 3840×2160 master:

- Scale the complete frame uniformly by 1.5 to 3840×2160.
- The transparent opening becomes 3456×1944 at `(192,108)` through `(3648,2052)`.
- Fit the 16:9 source beneath that opening without stretching.
- Label the frame layer as scaled brand artwork; the underlying screen recording can still be native 4K.

If a future native-vector or native-4K frame renderer becomes available, prefer it and retain the same geometry.

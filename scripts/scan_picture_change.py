import subprocess, numpy as np, imageio_ffmpeg, json

FF = imageio_ffmpeg.get_ffmpeg_exe()
FPS = 4
W = 640   # high enough that a mouse cursor moving is a detectable change

def scan(path, srcw, srch):
    h = int(round(srch / srcw * W / 2) * 2)
    cmd = [FF, "-nostdin", "-i", path, "-vf", f"fps={FPS},scale={W}:{h},format=gray",
           "-f", "rawvideo", "-pix_fmt", "gray", "-"]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    fsize = W * h
    prev, out = None, []
    while True:
        buf = p.stdout.read(fsize)
        if len(buf) < fsize: break
        f = np.frombuffer(buf, dtype=np.uint8).astype(np.int16)
        if prev is not None:
            out.append(int((np.abs(f - prev) > 30).sum()))
        prev = f
    p.wait()
    return out, fsize

for name in ("longshot20260922191700", "longshot20260922192712"):
    counts, fsize = scan(f"/Users/doraqian/Downloads/{name}.mp4", 1952, 1160)
    json.dump({"fps": FPS, "fsize": fsize, "counts": counts},
              open(f"work/still_{name}.json", "w"))
    a = np.array(counts)
    print(f"{name}: {len(a)} samples, frame = {fsize} px")
    print("   changed-pixel percentiles:",
          {p: int(np.percentile(a, p)) for p in (5, 10, 25, 50, 75, 90)})
    for th in (0, 5, 20, 60, 150, 400):
        print(f"   <= {th:>4} changed px -> {100*(a<=th).sum()/len(a):5.1f}% of samples")

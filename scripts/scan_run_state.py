"""Read the agent's own run-state label instead of guessing from pixels moving.

The Sai panel prints "Agent run: <state>" at a fixed spot. Sample that strip
once a second, cluster identical-looking samples, and we get an exact timeline
of when the agent was working versus when it was waiting on a human.
"""
import subprocess, numpy as np, imageio_ffmpeg, json
FF = imageio_ffmpeg.get_ffmpeg_exe()
X, Y, W, H = 28, 186, 190, 24      # the "Agent run: ..." strip, source pixels

def strip(path):
    cmd=[FF,"-nostdin","-i",path,"-vf",f"fps=1,crop={W}:{H}:{X}:{Y},format=gray",
         "-f","rawvideo","-pix_fmt","gray","-"]
    p=subprocess.Popen(cmd,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
    out=[]
    while True:
        b=p.stdout.read(W*H)
        if len(b)<W*H: break
        out.append(np.frombuffer(b,dtype=np.uint8).astype(np.int16))
    p.wait(); return out

for name in ("longshot20260922191700","longshot20260922192712"):
    fr=strip(f"/Users/doraqian/Downloads/{name}.mp4")
    reps=[]; lab=[]
    for f in fr:
        hit=-1
        for k,r in enumerate(reps):
            if np.abs(f-r).mean() < 3.0: hit=k; break
        if hit<0: reps.append(f); hit=len(reps)-1
        lab.append(hit)
    json.dump({"labels":lab}, open(f"work/status_{name}.json","w"))
    from PIL import Image
    sheet=Image.new("L",(W, H*len(reps)),255)
    for k,r in enumerate(reps):
        sheet.paste(Image.fromarray(r.astype(np.uint8).reshape(H,W)),(0,k*H))
    sheet.resize((W*3,H*len(reps)*3), Image.LANCZOS).save(f"work/status_reps_{name}.png")
    cnt={k:lab.count(k) for k in range(len(reps))}
    print(name, len(fr),"samples,",len(reps),"distinct states:", cnt)

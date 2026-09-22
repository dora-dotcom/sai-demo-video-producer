import json, numpy as np
WORKING={"longshot20260922191700":{1,2,3},"longshot20260922192712":set()}
STILL_PX,FPSM,MIN_IDLE,HOLD,FPS=10,4,8.0,2.5,30
SRC=[("A","longshot20260922191700","4743d007ab",944.93),
     ("B","longshot20260922192712","8dc6e9624f",507.10)]

def keeps(name,total):
    st=json.load(open(f"work/status_{name}.json"))["labels"]
    ch=np.array(json.load(open(f"work/still_{name}.json"))["counts"])
    n=int(total*FPSM); work=np.zeros(n,bool); fz=np.zeros(n,bool)
    for s,l in enumerate(st):
        if l in WORKING[name]: work[s*FPSM:(s+1)*FPSM]=True
    fz[:min(len(ch),n)]=ch[:n]<=STILL_PX
    idle=fz&~work
    cut=[];i=0
    while i<len(idle):
        if idle[i]:
            j=i
            while j<len(idle) and idle[j]: j+=1
            if (j-i)/FPSM>=MIN_IDLE: cut.append((i/FPSM+HOLD/2,j/FPSM-HOLD/2))
            i=j
        else: i+=1
    out=[];cur=0.0
    for a,b in cut:
        if a>cur: out.append((cur,a))
        cur=b
    if cur<total: out.append((cur,total-0.25))
    return out

KEEP={t:keeps(n,tot) for t,n,a,tot in SRC}
ASSET={t:a for t,n,a,tot in SRC}

# label acts: (stage, colour, source tag, from, to, rate, text)
# Fixed rate card. EXPLORE and EXECUTE must stay equal — their on-screen
# lengths are the 8m31s vs 3m37s comparison, and giving them different rates
# rewrites it. DEBUG sits outside that comparison and may run faster.
EXPLORE, DEBUG, EXECUTE = 5, 8, 5
ACTS=[("Exploration","#A8B0AC","A",0,120,EXPLORE,"Task received — Sai starts exploring"),
      ("Exploration","#A8B0AC","A",120,200,EXPLORE,"Reading the application form"),
      ("Exploration","#A8B0AC","A",200,260,EXPLORE,"Signing in to the core banking system"),
      ("Exploration","#A8B0AC","A",260,300,EXPLORE,"Creating a new client record"),
      ("Exploration","#A8B0AC","A",300,420,EXPLORE,"Filling every field from the form"),
      ("Exploration","#A8B0AC","A",420,505,EXPLORE,"Checking and submitting"),
      ("Exploration","#A8B0AC","A",505,562,EXPLORE,"Client created and active — first run 8m 31s"),
      ("Compile & debug","#E8A33D","A",562,632,DEBUG,"Compiling the successful run into code"),
      ("Compile & debug","#E8A33D","A",632,944.6,DEBUG,"Replaying the compiled script"),
      ("Compile & debug","#E8A33D","B",0,110,DEBUG,"Replay breaks on timing and late-loading fields"),
      ("Compile & debug","#E8A33D","B",110,236,DEBUG,"Correcting the script — three failed runs"),
      ("Execute","#16D342","B",236,300,EXECUTE,"Corrected script runs end to end"),
      ("Execute","#16D342","B",300,420,EXECUTE,"Filling the form — no model reasoning in the loop"),
      ("Execute","#16D342","B",420,492,EXECUTE,"Client created — one pass, 3m 37s"),
      ("Execute","#16D342","B",492,500.5,1,""),        # cost card appearing, real time
      ("Execute","#16D342","B",500.5,505.6,0.5,"")]    # hold on the opened card

items=[];labels=[];f=0
for stage,col,tag,a,b,rate,txt in ACTS:
    seg_start=f
    for ka,kb in KEEP[tag]:
        s,e=max(a,ka),min(b,kb)
        if e-s<0.2: continue
        n=max(1,int(round((e-s)*FPS/rate)))
        items.append({"type":"video","assetId":ASSET[tag],"startFrame":f,"durationFrames":n,
                      "sourceIn":int(round(s*1e6)),"playbackRate":rate,
                      "left":-22,"top":-87,"width":1964,"height":1167})
        f+=n
    if txt and f-seg_start>=15:
        labels.append({"type":"motion-graphic","assetId":"647979320a","startFrame":seg_start,
            "durationFrames":f-seg_start,"left":0,"top":0,"width":1920,"height":1080,
            "propertyOverrides":{"stage":stage,"label":txt,"speed":f"{rate}x","accentColor":col}})
print(f"{len(items)} items, {len(labels)} labels, {f} frames = {f//FPS//60}:{f//FPS%60:02d}")
for l in labels:
    p=l["propertyOverrides"]
    print(f"   f{l['startFrame']:<6}+{l['durationFrames']:<5} {p['speed']:>3}  {p['label']}")
json.dump(items,open("work/v6_items.json","w")); json.dump(labels,open("work/v6_labels.json","w"))
print()
for it in items: print(json.dumps({"a":it["assetId"][:4],"s":it["startFrame"],"d":it["durationFrames"],"i":it["sourceIn"],"r":it["playbackRate"]},separators=(',',':')))

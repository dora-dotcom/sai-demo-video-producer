const Component = ({ item }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const props = item.props || {};
  const scale = Math.min(width / 1920, height / 1080);
  const enter = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exit = interpolate(frame, [durationInFrames - 22, durationInFrames - 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = Math.min(enter, exit);
  const lift = interpolate(enter, [0, 1], [18, 0]);
  const p1 = interpolate(frame, [18, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2 = interpolate(frame, [62, 94], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p3 = interpolate(frame, [108, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1 = interpolate(frame, [48, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2 = interpolate(frame, [92, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rootStyle = { position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: props.transparentBackground ? 'transparent' : props.backgroundColor, fontFamily: props.fontFamily, color: props.textColor, opacity };
  const stageStyle = { position: 'absolute', width: 1920, height: 1080, left: (width - 1920 * scale) / 2, top: (height - 1080 * scale) / 2, transform: `scale(${scale})`, transformOrigin: 'top left' };
  const nodeStyle = { width: 430, minHeight: 246, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 34px 30px', borderTop: `2px solid ${props.textColor}`, borderBottom: `1px solid ${props.lineColor}` };
  const titleStyle = { fontSize: 22, lineHeight: 1, fontWeight: 700, letterSpacing: '0.14em' };
  const bodyStyle = { marginTop: 42, fontSize: 33, lineHeight: 1.25, fontWeight: 500, letterSpacing: '-0.02em', maxWidth: 350 };
  const numberStyle = { fontSize: 18, color: props.mutedColor, letterSpacing: '0.12em', fontWeight: 600 };
  return <div style={rootStyle}><div style={stageStyle}>
    <div style={{ position: 'absolute', left: 150, top: 118, right: 150, transform: `translateY(${lift}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: props.mutedColor, fontSize: 18, fontWeight: 700, letterSpacing: '0.14em' }}>
        <div style={{ width: 11, height: 11, backgroundColor: props.accentColor }} /><div>{props.eyebrow}</div>
      </div>
      <div style={{ marginTop: 25, fontSize: 66, lineHeight: 1.04, fontWeight: 620, letterSpacing: '-0.045em' }}>{props.headline}</div>
    </div>
    <div style={{ position: 'absolute', left: 150, right: 150, top: 392, display: 'flex', alignItems: 'center' }}>
      <div style={{ ...nodeStyle, opacity: p1, transform: `translateY(${(1-p1)*18}px)` }}>
        <div><div style={numberStyle}>01</div><div style={{ ...titleStyle, marginTop: 20 }}>{props.step1Title}</div></div><div style={bodyStyle}>{props.step1Body}</div>
      </div>
      <div style={{ width: 90, height: 2, backgroundColor: props.lineColor, transformOrigin: 'left center', transform: `scaleX(${line1})`, position: 'relative' }}><div style={{ position: 'absolute', right: -2, top: -5, width: 12, height: 12, borderTop: `2px solid ${props.textColor}`, borderRight: `2px solid ${props.textColor}`, transform: 'rotate(45deg)' }} /></div>
      <div style={{ ...nodeStyle, opacity: p2, transform: `translateY(${(1-p2)*18}px)` }}>
        <div><div style={numberStyle}>02</div><div style={{ ...titleStyle, marginTop: 20 }}>{props.step2Title}</div></div><div style={bodyStyle}>{props.step2Body}</div>
      </div>
      <div style={{ width: 90, height: 2, backgroundColor: props.lineColor, transformOrigin: 'left center', transform: `scaleX(${line2})`, position: 'relative' }}><div style={{ position: 'absolute', right: -2, top: -5, width: 12, height: 12, borderTop: `2px solid ${props.textColor}`, borderRight: `2px solid ${props.textColor}`, transform: 'rotate(45deg)' }} /></div>
      <div style={{ ...nodeStyle, borderTopColor: props.accentColor, opacity: p3, transform: `translateY(${(1-p3)*18}px)` }}>
        <div><div style={{ ...numberStyle, color: props.accentColor }}>∞</div><div style={{ ...titleStyle, marginTop: 20 }}>{props.step3Title}</div></div><div style={bodyStyle}>{props.step3Body}</div>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 150, bottom: 86, display: 'flex', alignItems: 'center', gap: 14, color: props.mutedColor, fontSize: 17, letterSpacing: '0.03em' }}>
      <div style={{ width: 44, height: 2, backgroundColor: props.accentColor }} /><div>LLM flexibility × deterministic code</div>
    </div>
  </div></div>;
};

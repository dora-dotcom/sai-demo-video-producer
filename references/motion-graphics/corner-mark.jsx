const Component = ({ item }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const props = item.props || {};
  const scale = Math.min(width / 1920, height / 1080);
  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames - 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = Math.min(enter, exit);
  // Absolute geometry so the wordmark slot is predictable. The Sai wordmark is
  // placed as its own timeline item at PLATE_X + PAD, MARK_Y, 120x30.
  const PLATE_X = 1568, PLATE_Y = 48, PLATE_W = 304, PLATE_H = 58, PAD = 18;
  const rootStyle = { position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: props.fontFamily, opacity };
  const stageStyle = { position: 'absolute', width: 1920, height: 1080, left: (width - 1920 * scale) / 2, top: (height - 1080 * scale) / 2, transform: `scale(${scale})`, transformOrigin: 'top left' };
  const plateStyle = { position: 'absolute', left: PLATE_X, top: PLATE_Y, width: PLATE_W, height: PLATE_H, backgroundColor: props.panelColor, opacity: 0.86, borderRadius: 10 };
  const ruleStyle = { position: 'absolute', left: PLATE_X + PAD + 120 + 14, top: PLATE_Y + 17, width: 1, height: 24, backgroundColor: props.textColor, opacity: 0.32 };
  const nameStyle = { position: 'absolute', left: PLATE_X + PAD + 120 + 29, top: PLATE_Y + 22, fontSize: 13, lineHeight: 1, fontWeight: 700, letterSpacing: '0.14em', color: props.textColor, whiteSpace: 'nowrap', textTransform: 'uppercase' };
  return <div style={rootStyle}><div style={stageStyle}>
    <div style={plateStyle} />
    <div style={ruleStyle} />
    <div style={nameStyle}>{props.product}</div>
  </div></div>;
};

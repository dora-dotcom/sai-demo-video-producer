const Component = ({ item }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const props = item.props || {};
  const scale = Math.min(width / 1920, height / 1080);
  const enter = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exit = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = Math.min(enter, exit);
  const lift = interpolate(enter, [0, 1], [14, 0]);
  const hasStage = props.stage && String(props.stage).length > 0;
  const hasSpeed = props.speed && String(props.speed).length > 0;
  const rootStyle = { position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: props.fontFamily };
  const stageStyle = { position: 'absolute', width: 1920, height: 1080, left: (width - 1920 * scale) / 2, top: (height - 1080 * scale) / 2, transform: `scale(${scale})`, transformOrigin: 'top left' };
  const wrapStyle = { position: 'absolute', left: 48, bottom: 48, display: 'flex', alignItems: 'center', gap: 18, padding: '17px 26px', opacity, transform: `translateY(${lift}px)` };
  const bgStyle = { position: 'absolute', inset: 0, backgroundColor: props.panelColor, opacity: 0.86, borderRadius: 10 };
  const barStyle = { position: 'relative', width: 4, height: 30, backgroundColor: props.accentColor, borderRadius: 2 };
  const stageTextStyle = { position: 'relative', fontSize: 19, lineHeight: 1, fontWeight: 700, letterSpacing: '0.15em', color: props.accentColor, textTransform: 'uppercase', whiteSpace: 'nowrap' };
  const labelStyle = { position: 'relative', fontSize: 27, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.01em', color: props.textColor, whiteSpace: 'nowrap' };
  const ruleStyle = { position: 'relative', width: 1, height: 22, backgroundColor: props.textColor, opacity: 0.3 };
  const speedStyle = { position: 'relative', fontSize: 23, lineHeight: 1, fontWeight: 700, letterSpacing: '0.04em', color: props.accentColor, whiteSpace: 'nowrap' };
  return <div style={rootStyle}><div style={stageStyle}>
    <div style={wrapStyle}>
      <div style={bgStyle} />
      <div style={barStyle} />
      {hasStage ? <div style={stageTextStyle}>{props.stage}</div> : null}
      <div style={labelStyle}>{props.label}</div>
      {hasSpeed ? <div style={ruleStyle} /> : null}
      {hasSpeed ? <div style={speedStyle}>{props.speed}</div> : null}
    </div>
  </div></div>;
};

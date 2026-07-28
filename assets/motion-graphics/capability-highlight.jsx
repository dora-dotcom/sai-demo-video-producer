const Component = ({ item }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const props = item.props || {};
  const enter = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const reveal = Math.min(enter, exit);
  const lift = interpolate(enter, [0, 1], [18, 0]);
  const pulse = 0.72 + 0.28 * Math.sin(frame * 0.16);
  const isFiles = props.mode === "files";
  const surface = props.transparentBackground ? "transparent" : props.surfaceColor;

  const rootStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "transparent",
    opacity: reveal,
    transform: `translateY(${lift}px)`,
    fontFamily: props.fontFamily,
    color: props.textColor,
  };
  const shellStyle = {
    position: "absolute",
    inset: 0,
    display: "grid",
    gridTemplateColumns: "164px 1fr",
    gap: 26,
    alignItems: "center",
    padding: "24px 30px 24px 22px",
    boxSizing: "border-box",
    backgroundColor: surface,
    borderLeft: `8px solid ${props.accentColor}`,
    borderTop: `1px solid ${props.accentColor}`,
    borderBottom: "1px solid rgba(249,250,245,0.18)",
    clipPath: "polygon(0 0, 97% 0, 100% 18%, 100% 100%, 0 100%)",
  };
  const iconStageStyle = {
    position: "relative",
    width: 142,
    height: 132,
    borderRight: "1px solid rgba(249,250,245,0.18)",
  };
  const popupVisual = (
    <div style={iconStageStyle}>
      <div style={{ position: "absolute", left: 12, top: 18, width: 96, height: 68, border: `2px solid ${props.mutedColor}`, opacity: 0.44 }} />
      <div style={{ position: "absolute", left: 24, top: 30, width: 96, height: 68, border: `2px solid ${props.textColor}`, opacity: 0.72 }} />
      <div style={{ position: "absolute", left: 36, top: 42, width: 96, height: 68, border: `3px solid ${props.accentColor}`, boxShadow: `0 0 0 ${2 + pulse * 3}px rgba(22,211,66,0.16)` }}>
        <div style={{ height: 12, borderBottom: `2px solid ${props.accentColor}` }} />
        <div style={{ position: "absolute", right: 7, top: 4, width: 5, height: 5, backgroundColor: props.accentColor }} />
      </div>
    </div>
  );
  const filesVisual = (
    <div style={iconStageStyle}>
      <div style={{ position: "absolute", left: 14, top: 22, width: 48, height: 16, borderTop: `3px solid ${props.accentColor}`, borderLeft: `3px solid ${props.accentColor}`, borderRight: `3px solid ${props.accentColor}`, backgroundColor: "rgba(22,211,66,0.08)" }} />
      <div style={{ position: "absolute", left: 14, top: 34, width: 112, height: 72, border: `3px solid ${props.accentColor}`, backgroundColor: "rgba(22,211,66,0.08)" }} />
      <div style={{ position: "absolute", left: 68, top: 46, width: 4, height: 38, backgroundColor: props.textColor, transform: `scaleY(${0.85 + pulse * 0.15})`, transformOrigin: "bottom" }} />
      <div style={{ position: "absolute", left: 57, top: 43, width: 22, height: 22, borderLeft: `4px solid ${props.textColor}`, borderTop: `4px solid ${props.textColor}`, transform: "rotate(45deg)" }} />
    </div>
  );

  return (
    <div style={rootStyle}>
      <div style={shellStyle}>
        {isFiles ? filesVisual : popupVisual}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
          <div style={{ color: props.accentColor, fontSize: 17, fontWeight: 800, letterSpacing: 2.5, lineHeight: 1 }}>{props.eyebrow}</div>
          <div style={{ color: props.textColor, fontSize: 34, fontWeight: 750, letterSpacing: -0.8, lineHeight: 1.08, whiteSpace: "normal", overflowWrap: "break-word" }}>{props.headline}</div>
          <div style={{ color: props.mutedColor, fontSize: 18, fontWeight: 500, lineHeight: 1.35, maxWidth: 470, whiteSpace: "normal", overflowWrap: "break-word" }}>{props.detail}</div>
        </div>
      </div>
    </div>
  );
};

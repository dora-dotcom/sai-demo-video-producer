const Component = ({ item }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const props = item.props || {};
  const scale = Math.min(width / 1920, height / 1080);
  const background = props.transparentBackground ? 'transparent' : props.backgroundColor;
  const headIn = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const routeOne = interpolate(frame, [18, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const routeTwo = interpolate(frame, [32, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoIn = interpolate(frame, [44, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rootStyle = { position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: background, color: props.textColor, fontFamily: props.fontFamily };
  const stageStyle = { position: 'absolute', width: 1920, height: 1080, left: (width - 1920 * scale) / 2, top: (height - 1080 * scale) / 2, transform: `scale(${scale})`, transformOrigin: 'top left' };
  const layoutStyle = { position: 'absolute', inset: '74px 118px 72px 118px', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 40 };
  const headerStyle = { opacity: headIn, transform: `translateY(${(1 - headIn) * 20}px)` };
  const saiLogoWrapStyle = { width: 170, height: 43, display: 'flex', alignItems: 'center', marginBottom: 20 };
  const saiLogoStyle = { width: 170, height: 43, objectFit: 'contain', objectPosition: 'left center' };
  const headlineStyle = { maxWidth: 1420, fontSize: 94, lineHeight: 1.02, fontWeight: 620, letterSpacing: -4 };
  const routesStyle = { display: 'grid', gridTemplateColumns: '1fr 1px 1fr', columnGap: 72, alignItems: 'center', padding: '18px 44px 32px 40px' };
  const dividerStyle = { width: 1, height: 260, backgroundColor: props.dividerColor };
  const routeOneStyle = { display: 'flex', flexDirection: 'column', gap: 22, opacity: routeOne, transform: `translateY(${(1 - routeOne) * 20}px)` };
  const routeTwoStyle = { display: 'flex', flexDirection: 'column', gap: 22, opacity: routeTwo, transform: `translateY(${(1 - routeTwo) * 20}px)` };
  const labelStyle = { color: props.mutedColor, fontSize: 21, lineHeight: 1, fontWeight: 700, letterSpacing: 3.8, textTransform: 'uppercase' };
  const actionStyle = { maxWidth: 690, fontSize: 50, lineHeight: 1.16, fontWeight: 520, letterSpacing: -1.5, whiteSpace: 'normal', overflowWrap: 'break-word' };
  const siteStyle = { alignSelf: 'flex-start', color: props.textColor, fontSize: 72, lineHeight: 1, fontWeight: 650, letterSpacing: -2, borderBottom: `5px solid ${props.accentColor}`, paddingBottom: 10 };
  const footerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', minHeight: 72, borderTop: `1px solid ${props.dividerColor}`, paddingTop: 24 };
  const poweredStyle = { color: props.mutedColor, fontSize: 18, lineHeight: 1, fontWeight: 650, letterSpacing: 2.8, textTransform: 'uppercase' };
  const logoWrapStyle = { width: 330, height: 64, opacity: logoIn, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' };
  const logoStyle = { width: 330, height: 64, objectFit: 'contain' };
  return <div style={rootStyle}><div style={stageStyle}><div style={layoutStyle}>
    <div style={headerStyle}>
      <div style={saiLogoWrapStyle}>{props.saiLogoImage ? <Img src={props.saiLogoImage} style={saiLogoStyle} /> : null}</div>
      <div style={headlineStyle}>{props.headline}</div>
    </div>
    <div style={routesStyle}>
      <div style={routeOneStyle}><div style={labelStyle}>{props.teamLabel}</div><div style={actionStyle}>{props.teamAction}</div></div>
      <div style={dividerStyle} />
      <div style={routeTwoStyle}><div style={labelStyle}>{props.consumerLabel}</div><div style={siteStyle}>{props.consumerAction}</div></div>
    </div>
    <div style={footerStyle}>
      <div style={poweredStyle}>{props.poweredBy}</div>
      <div style={logoWrapStyle}>{props.logoImage ? <Img src={props.logoImage} style={logoStyle} /> : null}</div>
    </div>
  </div></div></div>;
};

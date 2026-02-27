export default function NeonBorder({
  active,
  children,
  style = {},
  delay = "0s",
  color = "#8C0021",
}) {
  const base = parseFloat(delay);
  const d = (n) => `${(base + n * 0.45).toFixed(2)}s`;
  const EASE = "cubic-bezier(.4,0,.2,1)";
  const GLOW = `0 0 4px rgba(140,0,33,0.8), 0 0 8px rgba(140,0,33,0.3)`;

  const line = (extra) => ({
    position: "absolute",
    background: color,
    boxShadow: GLOW,
    transition: `transform 0.5s ${EASE}`,
    pointerEvents: "none",
    ...extra,
  });

  return (
    <div style={{
      position: "relative",
      boxShadow: active
        ? `0 0 15px rgba(140,0,33,0.15), 0 0 35px rgba(140,0,33,0.06)`
        : "none",
      transition: "box-shadow 0.8s ease",
      ...style
    }}>
      {/* Children first so border spans layer on top naturally */}
      {children}

      {/* Top: left → right */}
      <span style={line({ top: 0, left: 0, height: "1px", width: "100%", transformOrigin: "left", transform: active ? "scaleX(1)" : "scaleX(0)", transitionDelay: d(0) })} />

      {/* Right: top → bottom */}
      <span style={line({ top: 0, right: 0, width: "1px", height: "100%", transformOrigin: "top", transform: active ? "scaleY(1)" : "scaleY(0)", transitionDelay: d(1) })} />

      {/* Bottom: right → left */}
      <span style={line({ bottom: 0, right: 0, height: "1px", width: "100%", transformOrigin: "right", transform: active ? "scaleX(1)" : "scaleX(0)", transitionDelay: d(2) })} />

      {/* Left: bottom → top */}
      <span style={line({ bottom: 0, left: 0, width: "1px", height: "100%", transformOrigin: "bottom", transform: active ? "scaleY(1)" : "scaleY(0)", transitionDelay: d(3) })} />
    </div>
  );
}
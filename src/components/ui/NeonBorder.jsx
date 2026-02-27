export default function NeonBorder({
  active,
  children,
  style = {},
  delay = "0s",
  color = "#C8102E",
}) {
  const base = parseFloat(delay);
  const d = (n) => `${(base + n * 0.45).toFixed(2)}s`;
  const EASE = "cubic-bezier(.4,0,.2,1)";
  const GLOW = `0 0 2px rgba(220,30,60,1), 0 0 6px rgba(200,16,46,0.9), 0 0 14px rgba(200,16,46,0.55), 0 0 28px rgba(200,16,46,0.25)`;

  const line = (extra) => ({
    position: "absolute",
    background: color,
    boxShadow: GLOW,
    transition: `transform 0.5s ${EASE}`,
    pointerEvents: "none",
    ...extra,
  });

  return (
    <div style={{ position: "relative", ...style }}>
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
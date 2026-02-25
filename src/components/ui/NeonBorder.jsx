export default function NeonBorder({
  active,
  children,
  style = {},
  delay = "0s",
  color = "#ff003c",
  glow = "rgba(255,0,60,0.7)"
}) {
  const d = (n) => `${parseFloat(delay) + n * 0.4}s`;

  const line = (extra) => ({
    position: "absolute",
    background: color,
    boxShadow: `
      0 0 4px ${glow},
      0 0 12px ${glow},
      0 0 24px ${glow}
    `,
    transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
    ...extra,
  });

  return (
    <div style={{ position: "relative", ...style }}>
      <span
        style={line({
          top: 0,
          left: 0,
          height: "1px",
          width: "100%",
          transformOrigin: "left",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: d(0),
        })}
      />

      <span
        style={line({
          top: 0,
          right: 0,
          width: "1px",
          height: "100%",
          transformOrigin: "top",
          transform: active ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: d(1),
        })}
      />

      <span
        style={line({
          bottom: 0,
          right: 0,
          height: "1px",
          width: "100%",
          transformOrigin: "right",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: d(2),
        })}
      />

      <span
        style={line({
          bottom: 0,
          left: 0,
          width: "1px",
          height: "100%",
          transformOrigin: "bottom",
          transform: active ? "scaleY(1)" : "scaleY(0)",
          transitionDelay: d(3),
        })}
      />

      {children}
    </div>
  );
}
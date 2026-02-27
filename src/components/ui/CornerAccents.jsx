import C from "../../constants/colors.js";

export default function CornerAccents({ active }) {
  const corners = [
    { top: "-4px", left: "-4px", borderTop: `1px solid ${C.red}`, borderLeft: `1px solid ${C.red}`, transformOrigin: "top left" },
    { top: "-4px", right: "-4px", borderTop: `1px solid ${C.red}`, borderRight: `1px solid ${C.red}`, transformOrigin: "top right" },
    { bottom: "-4px", left: "-4px", borderBottom: `1px solid ${C.red}`, borderLeft: `1px solid ${C.red}`, transformOrigin: "bottom left" },
    { bottom: "-4px", right: "-4px", borderBottom: `1px solid ${C.red}`, borderRight: `1px solid ${C.red}`, transformOrigin: "bottom right" },
  ];

  return <>{corners.map((c, i) => {
    const { transformOrigin, ...pos } = c;
    return (
      <span key={i} style={{
        position: "absolute",
        width: "16px",
        height: "16px",
        ...pos,
        boxShadow: `0 0 8px ${C.redGlow}`,
        pointerEvents: "none",
        // Animate in: scale from corner + fade
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0)",
        transformOrigin,
        transition: `opacity 0.45s ease ${i * 0.1 + 0.05}s, transform 0.45s cubic-bezier(.34,1.4,.64,1) ${i * 0.1 + 0.05}s`,
        animation: active ? `cornerPulse 3s ease-in-out ${i * 0.4}s infinite` : "none",
      }} />
    );
  })}</>;
}

import C from "../../constants/colors.js";

export default function CornerAccents({ active }) {
  if (!active) return null;
  const corners = [
    { top: "-4px", left: "-4px", borderTop: `1px solid ${C.red}`, borderLeft: `1px solid ${C.red}` },
    { top: "-4px", right: "-4px", borderTop: `1px solid ${C.red}`, borderRight: `1px solid ${C.red}` },
    { bottom: "-4px", left: "-4px", borderBottom: `1px solid ${C.red}`, borderLeft: `1px solid ${C.red}` },
    { bottom: "-4px", right: "-4px", borderBottom: `1px solid ${C.red}`, borderRight: `1px solid ${C.red}` },
  ];
  return <>{corners.map((c, i) => (
    <span key={i} style={{ position: "absolute", width: "16px", height: "16px", ...c, boxShadow: `0 0 8px ${C.redGlow}`, animation: `cornerPulse 3s ease-in-out ${i * 0.4}s infinite`, pointerEvents: "none" }} />
  ))}</>;
}

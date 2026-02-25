import C from "../../constants/colors.js";

export default function Particles({ active }) {
  const ps = Array.from({ length: 35 }, (_, i) => ({
    id: i, left: `${4 + (i * 2.7) % 92}%`,
    delay: `${(i * 0.43) % 5}s`, dur: `${3.5 + (i * 0.31) % 4}s`,
    size: i % 4 === 0 ? 3.5 : i % 4 === 1 ? 2.5 : i % 4 === 2 ? 2 : 1.5,
  }));
  if (!active) return null;
  return <>{ps.map(p => (
    <span key={p.id} style={{ position: "absolute", left: p.left, bottom: "-10px", width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: C.red, boxShadow: `0 0 ${p.size * 4}px ${C.redGlow}`, animation: `floatUp ${p.dur} ease-in ${p.delay} infinite`, pointerEvents: "none", opacity: 0.5 }} />
  ))}</>;
}

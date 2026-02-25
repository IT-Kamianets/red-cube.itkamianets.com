import C from "../../constants/colors.js";

export default function HeroBorder({ active, done, children, style = {} }) {
  const DUR = 0.58, GAP = 0.05;
  const d = (n) => `${n * (DUR + GAP)}s`;
  return (
    <div style={{ position: "relative", ...style }}>
      <span style={{ position: "absolute", top: 520, left: 0, width: "1px", background: C.red, boxShadow: `0 0 10px ${C.redGlow}`, height: active ? "100%" : "0%", transition: `height ${DUR}s cubic-bezier(.4,0,.2,1) ${d(0)}`, transform: "scaleY(-1)", transformOrigin: "top" }} />
      <span style={{ position: "absolute", top: 0, left: 0, height: "1px", background: C.red, boxShadow: `0 0 10px ${C.redGlow}`, width: active ? "100%" : "0%", transition: `width ${DUR}s cubic-bezier(.4,0,.2,1) ${d(1)}` }} />
      <span style={{ position: "absolute", top: 0, right: 0, width: "1px", background: C.red, boxShadow: `0 0 10px ${C.redGlow}`, height: active ? "100%" : "0%", transition: `height ${DUR}s cubic-bezier(.4,0,.2,1) ${d(2)}` }} />
      <span style={{ position: "absolute", bottom: 0, right: 0, height: "1px", background: C.red, boxShadow: `0 0 10px ${C.redGlow}`, width: active ? "100%" : "0%", transition: `width ${DUR}s cubic-bezier(.4,0,.2,1) ${d(3)}`, transformOrigin: "right", transform: "scaleX(-1)" }} />
      {children}
    </div>
  );
}

import { useState, useEffect } from "react";
import C from "../../constants/colors.js";

export default function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById("rc-scroll");
    if (!el) return;
    const fn = () => setVisible(el.scrollTop > 400);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  const scrollTop = () =>
    document.getElementById("rc-scroll")?.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button onClick={scrollTop} title="На початок"
      style={{
        position: "fixed", bottom: "28px", right: "clamp(20px,4vw,40px)", zIndex: 200,
        width: "40px", height: "40px", background: "rgba(14,14,14,0.92)",
        border: `1px solid ${visible ? C.red : "transparent"}`,
        boxShadow: visible ? `0 0 18px ${C.redDim}` : "none",
        color: C.red, fontFamily: "'DM Mono',monospace", fontSize: "16px", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
        backdropFilter: "blur(10px)",
        lineHeight: 1,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = "#fff"; e.currentTarget.style.boxShadow = `0 0 28px ${C.redGlow}`; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,14,14,0.92)"; e.currentTarget.style.color = C.red; e.currentTarget.style.boxShadow = `0 0 18px ${C.redDim}`; }}
    >↑</button>
  );
}

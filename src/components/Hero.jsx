import { useState, useEffect } from "react";
import C from "../constants/colors.js";
import HeroBorder from "./ui/HeroBorder.jsx";
import Particles from "./ui/Particles.jsx";
import CornerAccents from "./ui/CornerAccents.jsx";

export default function Hero() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 2700),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 4400),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <section style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "40px" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 42%,rgba(200,16,46,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
      <Particles active={phase >= 4} />
      <HeroBorder active={phase >= 1} done={phase >= 4} style={{ width: "min(620px,90vw)", padding: "clamp(44px,7vw,80px) clamp(28px,5vw,64px)", textAlign: "center", marginTop: "clamp(16px,3vh,48px)" }}>
        <CornerAccents active={phase >= 4} />
        <div style={{ fontSize: "10px", letterSpacing: "0.45em", color: C.red, fontFamily: "'DM Mono',monospace", marginBottom: "16px", opacity: phase >= 2 ? 0.7 : 0, transition: "opacity 0.6s ease" }}>КАМ'ЯНЕЦЬ-ПОДІЛЬСЬКИЙ</div>
        <div style={{ fontSize: "clamp(72px,14vw,120px)", fontFamily: "'Playfair Display',serif", fontWeight: "900", color: C.text, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "6px", transition: "opacity 1s ease", opacity: phase >= 2 ? 1 : 0 }}>R</div>
        <div style={{ fontSize: "clamp(8px,1.4vw,11px)", letterSpacing: "0.4em", color: C.muted, textTransform: "uppercase", fontFamily: "'DM Mono',monospace", marginBottom: "clamp(32px,5vw,56px)", opacity: phase >= 2 ? 0.6 : 0, transition: "opacity 0.6s ease" }}>RED CUBE HOTEL</div>
        <div style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "translateY(0)" : "translateY(14px)", transition: "all 0.8s ease" }}>
          <p style={{ fontSize: "clamp(13px,2.2vw,16px)", color: C.text, fontFamily: "'Playfair Display',serif", lineHeight: 1.65, marginBottom: "clamp(24px,4vw,40px)", opacity: 0.75 }}>
            Сучасний готель<br />у серці Кам'янця-Подільського
          </p>
          <button style={{ background: "transparent", border: `1px solid ${C.red}`, color: C.red, padding: "13px 36px", fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", cursor: "pointer", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.target.style.background = C.red; e.target.style.color = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.red; }}
          >Забронювати</button>
        </div>
      </HeroBorder>
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: phase >= 3 ? 0.45 : 0, transition: "opacity 1s ease" }}>
        <div style={{ width: "1px", height: "32px", background: `linear-gradient(to bottom,${C.red},transparent)`, animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: "9px", letterSpacing: "0.22em", color: C.muted, fontFamily: "'DM Mono',monospace" }}>SCROLL</span>
      </div>
    </section>
  );
}

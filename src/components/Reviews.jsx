import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";

const reviews = [
  { name: "Kristina", score: "10", room: "Тримісний номер", date: "лютий 2026", text: "Гарний готель з свіжим ремонтом, дуже тепло. Чудовий персонал, який іде на зустріч — заселили трохи раніше ніж написано. Пряма вулиця до старого міста прям від готелю." },
  { name: "Медведчук", score: "10", room: "Тримісний номер", date: "січень 2026", text: "Дуже тепло, чисто, тихо! Опалення не вимикалось, душ має теплу підлогу." },
  { name: "Nataliia", score: "10", room: "Standard King", date: "листопад 2025", text: "Дуже сподобався персонал. Мене привітно зустріли і приємно провели. Працівники готелю раді були допомогти із моїми маленькими неприємностями — за що я дуже вдячна." },
];

export default function Reviews() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="reviews" ref={ref} style={{ background: C.warmBg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: `1px solid rgba(200,140,100,0.12)` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <Label n="06" text="Відгуки" warm />
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.textWarm, marginTop: "12px", fontWeight: "400" }}>Reviews</h2>
        </Slide>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "3px" }}>
          {reviews.map((r, i) => (
            <Slide key={i} inView={inView} delay={i * 0.12}>
              <div style={{ position: "relative", background: C.warmSurface, padding: "clamp(22px,3vw,32px)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <span style={{ position: "absolute", top: 0, left: 0, height: "1px", background: C.red, boxShadow: `0 0 8px ${C.redGlow}`, width: inView ? "100%" : "0%", transition: `width 0.52s cubic-bezier(.4,0,.2,1) ${0.15 + i * 0.15}s` }} />
                <span style={{ position: "absolute", top: 0, right: 0, width: "1px", background: C.red, boxShadow: `0 0 8px ${C.redGlow}`, height: inView ? "100%" : "0%", transition: `height 0.52s cubic-bezier(.4,0,.2,1) ${0.15 + i * 0.15 + 0.58}s` }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "22px", fontFamily: "'Playfair Display',serif", color: C.red, textShadow: `0 0 20px ${C.redGlow}`, lineHeight: 1 }}>{r.score}</span>
                  <span style={{ fontSize: "9px", letterSpacing: "0.18em", color: C.mutedWarm, fontFamily: "'DM Mono',monospace" }}>BOOKING.COM</span>
                </div>
                <p style={{ fontSize: "13px", color: C.textWarm, lineHeight: 1.75, flex: 1 }}>«{r.text}»</p>
                <div>
                  <div style={{ fontSize: "12px", color: C.mutedWarm }}>{r.name}</div>
                  <div style={{ fontSize: "10px", color: "rgba(138,127,120,0.6)", fontFamily: "'DM Mono',monospace", marginTop: "3px" }}>{r.room} · {r.date}</div>
                </div>
              </div>
            </Slide>
          ))}
        </div>
        <Slide inView={inView} delay={0.5} style={{ marginTop: "20px", textAlign: "right" }}>
          <a href="https://www.booking.com" target="_blank" rel="noreferrer" style={{ fontSize: "10px", letterSpacing: "0.25em", color: C.mutedWarm, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: `1px solid rgba(200,140,100,0.2)`, paddingBottom: "3px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.color = "rgba(210,150,110,0.85)"; e.target.style.borderColor = "rgba(200,140,100,0.6)"; }}
            onMouseLeave={e => { e.target.style.color = C.mutedWarm; e.target.style.borderColor = "rgba(200,140,100,0.2)"; }}>ВСІ ВІДГУКИ НА BOOKING →</a>
        </Slide>
      </div>
    </section>
  );
}

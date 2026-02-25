import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import Slide from "./ui/Slide.jsx";

export default function Stats() {
  const [ref, inView] = useInView(0.3);
  const stats = [{ v: "9.3", l: "Рейтинг Booking" }, { v: "9.5", l: "Персонал" }, { v: "9.4", l: "Чистота" }, { v: "715", l: "Відгуків" }];
  return (
    <section ref={ref} style={{ background: C.warmBg, padding: "clamp(36px,6vw,72px) clamp(20px,5vw,64px)", borderTop: `1px solid ${C.redBorder}`, borderBottom: `1px solid ${C.redBorder}` }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "20px" }}>
        {stats.map((s, i) => (
          <Slide key={i} inView={inView} delay={i * 0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(34px,5.5vw,54px)", fontFamily: "'Playfair Display',serif", color: C.red, lineHeight: 1, marginBottom: "8px" }}>{s.v}</div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: C.mutedWarm, fontFamily: "'DM Mono',monospace", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          </Slide>
        ))}
      </div>
    </section>
  );
}

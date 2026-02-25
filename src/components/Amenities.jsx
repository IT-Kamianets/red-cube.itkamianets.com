import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";

export default function Amenities() {
  const [ref, inView] = useInView(0.15);
  const items = [
    { l: "Безкоштовний Wi-Fi", s: "у всіх номерах" }, { l: "Кондиціонер", s: "індивідуальний" },
    { l: "Ліфт", s: "доступ на всі поверхи" }, { l: "Цілодобова стійка", s: "реєстрація 24/7" },
    { l: "Приватна парковка", s: "30 ₴ / добу" }, { l: "Теплий душ", s: "підігрів підлоги" },
    { l: "Сімейні номери", s: "до 3 гостей" }, { l: "Можна з тваринами", s: "за попереднім запитом" },
  ];
  return (
    <section id="amenities" ref={ref} style={{ background: C.darkBg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: `1px solid rgba(100,120,140,0.12)` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <Label n="04" text="Зручності" />
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.text, marginTop: "12px", fontWeight: "400" }}>Amenities</h2>
        </Slide>
        <NeonBorder active={inView} delay="0.2s">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "1px", background: "rgba(100,120,140,0.12)" }}>
            {items.map((item, i) => (
              <Slide key={i} inView={inView} delay={i * 0.06} style={{ background: C.darkBg }}>
                <div style={{ padding: "26px 22px", background: C.darkSurface, transition: "background 0.25s", cursor: "default", height: "100%" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1e2025"}
                  onMouseLeave={e => e.currentTarget.style.background = C.darkSurface}>
                  <div style={{ width: "16px", height: "2px", background: C.red, boxShadow: `0 0 6px ${C.redGlow}`, marginBottom: "14px" }} />
                  <div style={{ fontSize: "13px", color: C.text, marginBottom: "4px", lineHeight: 1.3 }}>{item.l}</div>
                  <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'DM Mono',monospace" }}>{item.s}</div>
                </div>
              </Slide>
            ))}
          </div>
        </NeonBorder>
      </div>
    </section>
  );
}

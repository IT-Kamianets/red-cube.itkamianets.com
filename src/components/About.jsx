import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";

const highlights = [
  { t: "Розташування", d: "Центр Кам'янця-Подільського. Пряма вулиця до Старого міста та фортеці — 10 хвилин пішки. Поруч зупинки транспорту та магазини." },
  { t: "Номери", d: "Власна ванна кімната в кожному номері з підігрівом підлоги. Кондиціонер, холодильник, телевізор, безкоштовні засоби гігієни, рушники та капці." },
  { t: "Сервіс", d: "Цілодобова стійка реєстрації. Спільна кухня з усім необхідним. Ліфт. Приватна парковка. Можна з тваринами за попереднім запитом." },
];

export default function About({ sectionRef, boxRef }) {
  const [ref, inView] = useInView(0.3);

  // Merge refs: useInView ref + sectionRef from App
  const setRef = (el) => {
    ref.current = el;
    if (sectionRef) sectionRef.current = el;
  };

  return (
    <section
      id="about"
      ref={setRef}
      style={{ background: C.darkBg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: `1px solid rgba(100,120,140,0.1)` }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <Label n="01" text="Про нас" />
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.text, marginTop: "12px", fontWeight: "400" }}>About</h2>
          <p style={{ marginTop: "18px", fontSize: "clamp(14px,2vw,16px)", color: C.muted, fontFamily: "'Playfair Display',serif", lineHeight: 1.75, maxWidth: "560px" }}>
            Готель нового формату у самому серці Кам'янець-Подільського — сучасний ремонт, власна ванна в кожному номері, уважний персонал і атмосфера, де хочеться повертатися.
          </p>
        </Slide>

        <div ref={boxRef}>
          <NeonBorder active={inView} delay="0.2s">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1px", background: "rgba(100,120,140,0.1)" }}>
              {highlights.map((item, i) => (
                <Slide key={i} inView={inView} delay={0.3 + i * 0.1}>
                  <div style={{ background: C.darkSurface, padding: "clamp(24px,3.5vw,36px)", height: "100%" }}>
                    <div style={{ width: "18px", height: "2px", background: C.red, boxShadow: `0 0 8px ${C.redGlow}`, marginBottom: "16px" }} />
                    <h4 style={{ fontSize: "14px", fontFamily: "'Playfair Display',serif", color: C.text, fontWeight: "400", marginBottom: "10px" }}>{item.t}</h4>
                    <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.7 }}>{item.d}</p>
                  </div>
                </Slide>
              ))}
            </div>
          </NeonBorder>
        </div>
      </div>
    </section>
  );
}

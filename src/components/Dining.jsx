import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";
import imgKukhnia from "../images/gallery/кухня.webp";
import imgBluda from "../images/gallery/декілька блюд.webp";
import imgYizha from "../images/gallery/їжа.webp";

export default function Dining({ sectionRef, boxRef, headingRef }) {
  const [ref, inView] = useInView(0.3);
  const setRef = (el) => { ref.current = el; if (sectionRef) sectionRef.current = el; };

  return (
    <section id="dining" ref={setRef} style={{ background: C.warmBg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: `1px solid rgba(200,140,100,0.12)` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div ref={headingRef}>
          <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <Label n="03" text="Простір" warm />
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.textWarm, marginTop: "12px", fontWeight: "400" }}>Dining & Кухня</h2>
          </Slide>
        </div>
        <div ref={boxRef}>
          <NeonBorder active={inView} delay="0.2s" style={{ background: C.warmSurface }}>
            <Slide inView={inView} delay={0.1}>
              <div style={{ padding: "clamp(28px,4.5vw,48px)", display: "flex", alignItems: "center", gap: "clamp(20px,3.5vw,40px)", flexWrap: "wrap", position: "relative", borderBottom: `1px solid rgba(200,140,100,0.15)` }}>
                <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                  {[[imgYizha, "Їжа в Red Cube Hotel"], [imgKukhnia, "Спільна кухня Red Cube Hotel"], [imgBluda, "Страви Red Cube Hotel"]].map(([img, alt], i) => (
                    <div key={i} style={{ width: "clamp(90px,14vw,140px)", height: "clamp(90px,14vw,140px)", borderRadius: "50%", border: `2px solid rgba(100,180,220,${0.25 + i * 0.18})`, boxShadow: `0 0 ${16 + i * 8}px rgba(100,180,220,${0.15 + i * 0.1})`, opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.6)", transition: `all 0.6s ease ${i * 0.12}s`, overflow: "hidden", flexShrink: 0 }}>
                      <img src={img} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ fontSize: "clamp(15px,2.5vw,20px)", fontFamily: "'Playfair Display',serif", color: C.textWarm, fontWeight: "400", marginBottom: "10px" }}>Спільна кухня та зона відпочинку</h3>
                  <p style={{ fontSize: "13px", color: C.mutedWarm, lineHeight: 1.75 }}>Велика зона з краєвидом на місто, мікрохвильова піч, холодильник, весь необхідний посуд. Атмосферна dining area з характерними круглими вікнами та підсвіткою.</p>
                </div>
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "2px", background: `linear-gradient(to bottom,transparent,${C.red} 50%,transparent)`, opacity: inView ? 1 : 0, transition: "opacity 1s ease 0.6s" }} />
              </div>
            </Slide>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1px", background: "rgba(200,140,100,0.08)" }}>
              {[
                { t: "Сніданок", d: "Доступний за запитом — млинці, сирники, каша" },
                { t: "Кухня 24/7", d: "Мікрохвильова піч, чайник, посуд завжди доступні" },
                { t: "Зона відпочинку", d: "Окремий простір від номерів, панорамні вікна" },
              ].map((item, i) => (
                <Slide key={i} inView={inView} delay={0.3 + i * 0.1}>
                  <div style={{ background: C.warmAccent, padding: "24px 24px 28px", height: "100%" }}>
                    <div style={{ width: "18px", height: "2px", background: C.red, boxShadow: `0 0 8px ${C.redGlow}`, marginBottom: "16px" }} />
                    <h4 style={{ fontSize: "14px", fontFamily: "'Playfair Display',serif", color: C.textWarm, fontWeight: "400", marginBottom: "8px" }}>{item.t}</h4>
                    <p style={{ fontSize: "12px", color: C.mutedWarm, lineHeight: 1.65 }}>{item.d}</p>
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

import { useState, useEffect, memo } from "react";
import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";
import imgStoliky from "../images/dining/столики.webp";
import imgKukhnia from "../images/dining/вид кухні.webp";
import imgBluda from "../images/dining/стіл з стравами (1).webp";

const Dining = memo(function Dining({ sectionRef, boxRef, headingRef }) {
  const [ref, inView] = useInView(0.3);
  const setRef = (el) => { ref.current = el; if (sectionRef) sectionRef.current = el; };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 600);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

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
            {/* Photo grid */}
            <Slide inView={inView} delay={0.1}>
              {isMobile ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ height: "220px", overflow: "hidden" }}>
                    <img src={imgBluda} alt="Страви Red Cube Hotel" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", height: "160px" }}>
                    <div style={{ overflow: "hidden" }}>
                      <img src={imgStoliky} alt="Зона столиків Red Cube Hotel" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <img src={imgKukhnia} alt="Кухня Red Cube Hotel" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gridTemplateRows: "240px 240px", gap: "4px" }}>
                  <div style={{ gridRow: "1 / 3", overflow: "hidden" }}>
                    <img src={imgStoliky} alt="Зона столиків Red Cube Hotel" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <img src={imgKukhnia} alt="Кухня Red Cube Hotel" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <img src={imgBluda} alt="Страви Red Cube Hotel" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              )}
            </Slide>

            {/* Text block */}
            <Slide inView={inView} delay={0.25}>
              <div style={{ padding: "clamp(24px,4vw,40px)", borderTop: `1px solid rgba(200,140,100,0.15)` }}>
                <h3 style={{ fontSize: "clamp(15px,2.2vw,19px)", fontFamily: "'Playfair Display',serif", color: C.textWarm, fontWeight: "400", marginBottom: "10px" }}>Спільна кухня та зона відпочинку</h3>
                <p style={{ fontSize: "13px", color: C.mutedWarm, lineHeight: 1.75, maxWidth: "560px" }}>Велика зона з краєвидом на місто, мікрохвильова піч, холодильник, весь необхідний посуд. Атмосферна dining area з характерними круглими вікнами та підсвіткою.</p>
              </div>
            </Slide>

            {/* Feature tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1px", background: "rgba(200,140,100,0.08)" }}>
              {[
                { t: "Сніданок", d: "Доступний за запитом — млинці, сирники, каша" },
                { t: "Кухня 24/7", d: "Мікрохвильова піч, чайник, посуд завжди доступні" },
                { t: "Зона відпочинку", d: "Окремий простір від номерів, панорамні вікна" },
              ].map((item, i) => (
                <Slide key={i} inView={inView} delay={0.4 + i * 0.1}>
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
});

export default Dining;

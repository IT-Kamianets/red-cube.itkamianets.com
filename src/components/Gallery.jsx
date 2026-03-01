import { useState, useEffect, memo } from "react";
import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";
import imgFasad from "../images/gallery/Фасад готелю RED CUBE HOTEL із логотипом.webp";
import imgAtrium from "../images/gallery/Атріум із червоним неоном та світловою інсталяцією RED.webp";
import imgLobi1 from "../images/gallery/Лобі з великим екраном та чорним диваном.webp";
import imgLobi2 from "../images/gallery/Лобі з логотипом RED CUBE HOTEL та повітряними кулями.webp";
import imgLaunge1 from "../images/gallery/Лаунж із високими вікнами та міським краєвидом.webp";
import imgLaunge2 from "../images/gallery/Панорамна лаунж-зона з барною стійкою та видом на місто.webp";
import imgKorydor from "../images/gallery/Коридор із високими столами та ролетами на вікнах.webp";
import imgRestoran from "../images/gallery/Сучасний ресторанний сегмент із круглими підсвіченими дзеркалами.webp";
import imgSpalna1 from "../images/gallery/Світла спальня з акцентною стіною та вбудованою шафою.webp";
import imgSpalna2 from "../images/gallery/Спальня з червоною акцентною стіною та підсвіткою.webp";
import imgZona from "../images/gallery/Зона відпочинку з диваном і телевізором.webp";
import imgVanna from "../images/gallery/Сучасна ванна кімната з умивальником та туалетом.webp";
import imgDush from "../images/gallery/Душова зона з текстильними шторами та рушниками.webp";

const Gallery = memo(function Gallery({ sectionRef, boxRef, headingRef }) {
  const [ref, inView] = useInView(0.25);
  const setRef = (el) => { ref.current = el; if (sectionRef) sectionRef.current = el; };
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 600);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Layout (4 cols × 200px rows) — matches each photo's actual proportions
  // Row 1-2: Фасад(P×2) | Лобі-екран(L×2col×1) | Атріум(P×2)
  //          Фасад cont  | Ванна(L×2col×1)       | Атріум cont
  // Row 3-4: Лаунж-пан(S×2col) Ресторан(S×1) Душова(P×2)
  //          Спальня-св(P cont 2×1→2rows) Спальня-черв(S×1) Душова cont
  // Row 5:   Спальня cont | Зона(S×1) | Лобі-кулі(L×2col)
  // Row 6:   Коридор(S×1) | Лаунж-вікна(S×2col) | empty→Коридор fills
  const cells = [
    // Row 1–2
    { label: "Фасад",           img: imgFasad,    col: "1 / 2", row: "1 / 3", alt: "Фасад готелю Red Cube Hotel із логотипом, Кам'янець-Подільський" },
    { label: "Лобі",            img: imgLobi1,    col: "2 / 4", row: "1 / 2", alt: "Лобі Red Cube Hotel з великим екраном та чорним диваном" },
    { label: "Атріум",          img: imgAtrium,   col: "4 / 5", row: "1 / 3", alt: "Атріум із червоним неоном та світловою інсталяцією RED" },
    { label: "Ванна кімната",   img: imgVanna,    col: "2 / 4", row: "2 / 3", alt: "Сучасна ванна кімната з умивальником в Red Cube Hotel" },
    // Row 3–4
    { label: "Лаунж",           img: imgLaunge2,  col: "1 / 3", row: "3 / 4", alt: "Панорамна лаунж-зона з барною стійкою та видом на місто" },
    { label: "Ресторан",        img: imgRestoran, col: "3 / 4", row: "3 / 4", alt: "Ресторан Red Cube Hotel із круглими підсвіченими дзеркалами" },
    { label: "Душова",          img: imgDush,     col: "4 / 5", row: "3 / 5", alt: "Душова зона з текстильними шторами та рушниками" },
    { label: "Спальня",         img: imgSpalna1,  col: "1 / 2", row: "4 / 7", alt: "Світла спальня з акцентною стіною та вбудованою шафою" },
    { label: "Спальня",         img: imgSpalna2,  col: "2 / 3", row: "4 / 5", alt: "Спальня з червоною акцентною стіною та підсвіткою" },
    { label: "Ресторан",        img: imgKorydor,  col: "3 / 4", row: "4 / 5", alt: "Коридор із високими столами та ролетами на вікнах" },
    // Row 5–6
    { label: "Зона відпочинку", img: imgZona,     col: "2 / 3", row: "5 / 6", alt: "Зона відпочинку з диваном і телевізором в Red Cube Hotel" },
    { label: "Лобі",            img: imgLobi2,    col: "3 / 5", row: "5 / 6", alt: "Лобі з логотипом RED CUBE HOTEL та повітряними кулями" },
    { label: "Лаунж",           img: imgLaunge1,  col: "2 / 5", row: "6 / 7", alt: "Лаунж із високими вікнами та міським краєвидом" },
  ];

  return (
    <section id="gallery" ref={setRef} style={{ background: C.brickBg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: `1px solid rgba(200,80,80,0.12)` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div ref={headingRef}>
          <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <Label n="05" text="Галерея" />
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.text, marginTop: "12px", fontWeight: "400" }}>Gallery</h2>
          </Slide>
        </div>
        <div ref={boxRef}>
          {isMobile ? (
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", display: "flex", gap: "10px", paddingBottom: "8px", paddingRight: "20px" }}>
              {cells.map((cell, i) => (
                <div key={i} style={{ flex: "0 0 76vw", scrollSnapAlign: "start", height: "240px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
                  <img src={cell.img} alt={cell.alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px", background: "linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: C.text, fontFamily: "'DM Mono',monospace" }}>{cell.label.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NeonBorder active={inView} delay="0.15s">
              <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "200px", gap: "4px" }}>
                {cells.map((cell, i) => (
                  <Slide key={i} inView={inView} delay={i * 0.06} style={{ gridColumn: cell.col, gridRow: cell.row }}>
                    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s ease" }}
                      onMouseEnter={e => { setActive(i); e.currentTarget.style.transform = "scale(1.015)"; e.currentTarget.style.zIndex = "2"; }}
                      onMouseLeave={e => { setActive(null); e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.zIndex = "1"; }}>
                      <img src={cell.img} alt={cell.alt} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: active === i ? "rgba(200,16,46,0.08)" : "transparent", border: active === i ? `1px solid ${C.redBorder}` : "1px solid transparent", transition: "all 0.3s" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px", background: "linear-gradient(to top,rgba(0,0,0,0.75),transparent)", opacity: active === i ? 1 : 0, transition: "opacity 0.3s" }}>
                        <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: C.text, fontFamily: "'DM Mono',monospace" }}>{cell.label.toUpperCase()}</span>
                      </div>
                    </div>
                  </Slide>
                ))}
              </div>
            </NeonBorder>
          )}
        </div>
        <Slide inView={inView} delay={0.5} style={{ marginTop: "18px", textAlign: "right" }}>
          <a href="https://www.instagram.com/red_cube_hotel/" target="_blank" rel="noreferrer" style={{ fontSize: "10px", letterSpacing: "0.25em", color: C.muted, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: `1px solid ${C.redBorder}`, paddingBottom: "3px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.color = C.red; e.target.style.borderColor = C.red; }}
            onMouseLeave={e => { e.target.style.color = C.muted; e.target.style.borderColor = C.redBorder; }}>БІЛЬШЕ ФОТО В INSTAGRAM →</a>
        </Slide>
      </div>
    </section>
  );
});

export default Gallery;

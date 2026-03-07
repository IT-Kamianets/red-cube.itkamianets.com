import { useState, memo } from "react";
import useImageSlider from "../hooks/useImageSlider.js";
import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";
import Lightbox from "./ui/Lightbox.jsx";
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

const cells = [
  { label: "Фасад",           img: imgFasad,    col: "1 / 2", row: "1 / 3", alt: "Фасад готелю Red Cube Hotel із логотипом, Кам'янець-Подільський" },
  { label: "Лобі",            img: imgLobi1,    col: "2 / 4", row: "1 / 2", alt: "Лобі Red Cube Hotel з великим екраном та чорним диваном" },
  { label: "Атріум",          img: imgAtrium,   col: "4 / 5", row: "1 / 3", alt: "Атріум із червоним неоном та світловою інсталяцією RED" },
  { label: "Ванна кімната",   img: imgVanna,    col: "2 / 4", row: "2 / 3", alt: "Сучасна ванна кімната з умивальником в Red Cube Hotel" },
  { label: "Лаунж",           img: imgLaunge2,  col: "1 / 3", row: "3 / 4", alt: "Панорамна лаунж-зона з барною стійкою та видом на місто" },
  { label: "Ресторан",        img: imgRestoran, col: "3 / 4", row: "3 / 4", alt: "Ресторан Red Cube Hotel із круглими підсвіченими дзеркалами" },
  { label: "Душова",          img: imgDush,     col: "4 / 5", row: "3 / 5", alt: "Душова зона з текстильними шторами та рушниками" },
  { label: "Спальня",         img: imgSpalna1,  col: "1 / 2", row: "4 / 7", alt: "Світла спальня з акцентною стіною та вбудованою шафою" },
  { label: "Спальня",         img: imgSpalna2,  col: "2 / 3", row: "4 / 5", alt: "Спальня з червоною акцентною стіною та підсвіткою" },
  { label: "Коридор",         img: imgKorydor,  col: "3 / 4", row: "4 / 5", alt: "Коридор із високими столами та ролетами на вікнах" },
  { label: "Зона відпочинку", img: imgZona,     col: "2 / 3", row: "5 / 6", alt: "Зона відпочинку з диваном і телевізором в Red Cube Hotel" },
  { label: "Лобі",            img: imgLobi2,    col: "3 / 5", row: "5 / 6", alt: "Лобі з логотипом RED CUBE HOTEL та повітряними кулями" },
  { label: "Лаунж",           img: imgLaunge1,  col: "2 / 5", row: "6 / 7", alt: "Лаунж із високими вікнами та міським краєвидом" },
];

const images = cells.map(c => c.img);

// Mobile slider — same pattern as RoomCard
function MobileSlider({ onOpen }) {
  const { idx, setIdx, prev, next, handleTouchStart, handleTouchEnd } = useImageSlider(images.length);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => onOpen(idx)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ height: "60vw", maxHeight: "340px", minHeight: "220px", position: "relative", overflow: "hidden", cursor: "pointer" }}
      >
        {images.map((src, i) => {
          const isActive = i === idx;
          const isAdjacent = i === (idx - 1 + images.length) % images.length || i === (idx + 1) % images.length;
          return (
            <img key={i} src={src} alt={cells[i].alt} loading={i === 0 ? "eager" : "lazy"} decoding="async"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: isActive || isAdjacent ? "block" : "none", opacity: isActive ? 1 : 0, transition: "opacity 0.4s ease" }} />
          );
        })}
        {/* label */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px", background: "linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: C.text, fontFamily: "'DM Mono',monospace" }}>{cells[idx].label.toUpperCase()}</span>
        </div>
        {/* counter */}
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Mono',monospace" }}>{idx + 1} / {images.length}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.7 }}>
            <path d="M8.5 1H13V5.5M13 1L8 6M5.5 13H1V8.5M1 13L6 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* prev/next */}
        <button onClick={e => { e.stopPropagation(); prev(); }} aria-label="Попереднє фото"
          style={{ position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)", zIndex: 3, background: "none", border: "none", cursor: "pointer", padding: "10px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,1)) drop-shadow(0 0 4px rgba(0,0,0,1))" }}
          onMouseEnter={() => setPrevHover(true)} onMouseLeave={() => setPrevHover(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={prevHover ? C.red : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={e => { e.stopPropagation(); next(); }} aria-label="Наступне фото"
          style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", zIndex: 3, background: "none", border: "none", cursor: "pointer", padding: "10px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,1)) drop-shadow(0 0 4px rgba(0,0,0,1))" }}
          onMouseEnter={() => setNextHover(true)} onMouseLeave={() => setNextHover(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke={nextHover ? C.red : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {/* dots */}
      <div onClick={e => e.stopPropagation()} style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "2px" }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Фото ${i + 1}`}
            style={{ width: i === idx ? "16px" : "8px", height: "8px", borderRadius: "4px", background: i === idx ? C.red : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", padding: 0, margin: "8px 0", transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

const Gallery = memo(function Gallery({ sectionRef, boxRef, headingRef }) {
  const [ref, inView] = useInView(0.25);
  const setRef = (el) => { ref.current = el; if (sectionRef) sectionRef.current = el; };
  const [active, setActive] = useState(null);
  const [lightbox, setLightbox] = useState(null); // index or null

  return (
    <section id="gallery" ref={setRef} className="gallery-section" style={{ background: C.brickBg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: `1px solid rgba(200,80,80,0.12)` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div ref={headingRef} className="gallery-header">
          <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <Label n="05" text="Галерея" />
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.text, marginTop: "12px", fontWeight: "400" }}>Gallery</h2>
          </Slide>
        </div>
        <div ref={boxRef}>
          {/* Mobile slider */}
          <div className="gallery-mobile">
            <MobileSlider onOpen={(i) => setLightbox(i)} />
          </div>
          {/* Desktop grid */}
          <div className="gallery-desktop">
            <NeonBorder active={inView} delay="0.15s">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "200px", gap: "4px" }}>
                {cells.map((cell, i) => (
                  <Slide key={i} inView={inView} delay={i * 0.06} style={{ gridColumn: cell.col, gridRow: cell.row }}>
                    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s ease" }}
                      onClick={() => setLightbox(i)}
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
          </div>
        </div>
        <div className="gallery-footer">
          <Slide inView={inView} delay={0.5} style={{ marginTop: "18px", textAlign: "right" }}>
            <a href="https://www.instagram.com/red_cube_hotel/" target="_blank" rel="noreferrer" style={{ fontSize: "10px", letterSpacing: "0.25em", color: C.muted, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: `1px solid ${C.redBorder}`, paddingBottom: "3px", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.color = C.red; e.target.style.borderColor = C.red; }}
              onMouseLeave={e => { e.target.style.color = C.muted; e.target.style.borderColor = C.redBorder; }}>БІЛЬШЕ ФОТО В INSTAGRAM →</a>
          </Slide>
        </div>
      </div>
      {lightbox !== null && (
        <Lightbox images={images} startIdx={lightbox} name="Red Cube Hotel" onClose={() => setLightbox(null)} />
      )}
    </section>
  );
});

export default Gallery;

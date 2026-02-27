import { useState } from "react";
import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";
import imgVyviska from "../images/gallery/вивіска з діваном.webp";
import imgVidVikna from "../images/gallery/вид на місто через панорамні вікна зі столиками.webp";
import imgKimnata from "../images/gallery/кімната.webp";
import imgKimnata2 from "../images/gallery/кімната2.webp";
import imgKimnata3 from "../images/gallery/кімната3.webp";
import imgKimnataRed from "../images/gallery/кімната з червоною стрічкою.webp";
import imgVanna from "../images/gallery/ванна кімната.webp";
import imgVanna2 from "../images/gallery/ванна кімната 2.webp";
import imgSydinnia from "../images/gallery/сидіння з дзеркалами.webp";

export default function Gallery({ sectionRef, boxRef, headingRef }) {
  const [ref, inView] = useInView(0.25);
  const setRef = (el) => { ref.current = el; if (sectionRef) sectionRef.current = el; };
  const [active, setActive] = useState(null);

  const cells = [
    { label: "Фасад", img: imgVyviska, col: "span 1", row: "span 2" },
    { label: "Панорамний ресторан", img: imgVidVikna, col: "span 3", row: "span 1" },
    { label: "Номер", img: imgKimnata, col: "span 1", row: "span 1" },
    { label: "Номер", img: imgKimnata2, col: "span 1", row: "span 1" },
    { label: "Номер", img: imgKimnata3, col: "span 1", row: "span 1" },
    { label: "Номер", img: imgKimnataRed, col: "span 1", row: "span 1" },
    { label: "Ванна кімната", img: imgVanna, col: "span 1", row: "span 1" },
    { label: "Ванна кімната", img: imgVanna2, col: "span 1", row: "span 1" },
    { label: "Сидіння", img: imgSydinnia, col: "span 2", row: "span 1" },
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
          <NeonBorder active={inView} delay="0.15s">
            <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "160px", gap: "4px" }}>
              {cells.map((cell, i) => (
                <Slide key={i} inView={inView} delay={i * 0.06} style={{ gridColumn: cell.col, gridRow: cell.row }}>
                  <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s ease" }}
                    onMouseEnter={e => { setActive(i); e.currentTarget.style.transform = "scale(1.015)"; e.currentTarget.style.zIndex = "2"; }}
                    onMouseLeave={e => { setActive(null); e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.zIndex = "1"; }}>
                    <img src={cell.img} alt={cell.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
        <Slide inView={inView} delay={0.5} style={{ marginTop: "18px", textAlign: "right" }}>
          <a href="#" style={{ fontSize: "10px", letterSpacing: "0.25em", color: C.muted, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: `1px solid ${C.redBorder}`, paddingBottom: "3px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.color = C.red; e.target.style.borderColor = C.red; }}
            onMouseLeave={e => { e.target.style.color = C.muted; e.target.style.borderColor = C.redBorder; }}>ВСІ ФОТО В INSTAGRAM →</a>
        </Slide>
      </div>
    </section>
  );
}

import { useState, memo } from "react";
import C from "../../constants/colors.js";
import useInView from "../../hooks/useInView.js";
import useImageSlider from "../../hooks/useImageSlider.js";
import NeonBorder from "../ui/NeonBorder.jsx";
import Slide from "../ui/Slide.jsx";
import Lightbox from "../ui/Lightbox.jsx";

const RoomCard = memo(function RoomCard({ room, theme }) {
  const [ref, inView] = useInView(0.2);
  const [lightbox, setLightbox] = useState(false);
  const images = room.images || [room.image];
  const { idx, setIdx, prev, next, handleTouchStart, handleTouchEnd } = useImageSlider(images.length);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  const photoBlock = (
    <div className="room-photo" onClick={() => setLightbox(true)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ flex: "0 0 clamp(200px,42%,440px)", minHeight: "clamp(220px,40vw,320px)", position: "relative", overflow: "hidden", cursor: "pointer" }}>
      {images.map((src, i) => {
        const isActive = i === idx;
        const isAdjacent = i === (idx - 1 + images.length) % images.length || i === (idx + 1) % images.length;
        return (
          <img key={i} src={src} alt={`${room.name} — фото ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"} decoding="async"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: isActive || isAdjacent ? "block" : "none", opacity: isActive ? 1 : 0, transition: "opacity 0.4s ease" }} />
        );
      })}
      {/* Red accent line */}
      <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px", background: `linear-gradient(to bottom,transparent,${C.red},transparent)`, boxShadow: `0 0 8px ${C.redGlow}`, opacity: inView ? 1 : 0, transition: "opacity 1s ease 1.5s", zIndex: 2 }} />
      {/* Expand icon — top right */}
      {images.length > 0 && (
        <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 3, display: "flex", alignItems: "center", gap: "6px" }}>
          {images.length > 1 && (
            <span style={{ fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", fontFamily: "'DM Mono',monospace" }}>{idx + 1} / {images.length}</span>
          )}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
            <path d="M8.5 1H13V5.5M13 1L8 6M5.5 13H1V8.5M1 13L6 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
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
        </>
      )}
      {/* Dots */}
      {images.length > 1 && (
        <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: "2px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "5px", zIndex: 3 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Фото ${i + 1}`}
              style={{ width: i === idx ? "16px" : "8px", height: "8px", borderRadius: "4px", background: i === idx ? C.red : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", padding: 0, margin: "8px 0", transition: "all 0.3s" }} />
          ))}
        </div>
      )}
    </div>
  );

  const infoBlock = (
    <div style={{ flex: 1, padding: "clamp(24px,3.5vw,44px)" }}>
      <span style={{ fontSize: "10px", letterSpacing: "0.28em", color: theme.labelColor, fontFamily: "'DM Mono',monospace" }}>{room.id} / НОМЕР</span>
      <h3 style={{ fontSize: "clamp(20px,3.5vw,30px)", fontFamily: "'Playfair Display',serif", color: theme.textColor, fontWeight: "400", margin: "10px 0 14px" }}>{room.name}</h3>
      <p style={{ fontSize: "13px", color: theme.mutedColor, lineHeight: 1.75, marginBottom: "20px" }}>{room.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "24px" }}>
        <span style={{ fontSize: "9px", letterSpacing: "0.12em", color: theme.mutedColor, border: `1px solid ${theme.borderColor}`, padding: "4px 10px", fontFamily: "'DM Mono',monospace", display: "inline-flex", alignItems: "center", gap: "5px" }}>
          {Array.from({ length: room.guests }).map((_, i) => (
            <svg key={i} width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4.5" cy="2.5" r="2" stroke={C.red} strokeWidth="1"/>
              <path d="M1 9.5c0-1.933 1.567-3.5 3.5-3.5S8 7.567 8 9.5" stroke={C.red} strokeWidth="1" strokeLinecap="round"/>
            </svg>
          ))}
          {room.guests} {room.guests === 1 ? "особа" : room.guests < 5 ? "особи" : "осіб"}
        </span>
        {room.tags.map((t, j) => (
          <span key={j} style={{ fontSize: "9px", letterSpacing: "0.12em", color: theme.mutedColor, border: `1px solid ${theme.borderColor}`, padding: "4px 10px", fontFamily: "'DM Mono',monospace" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "17px", color: C.red, fontFamily: "'DM Mono',monospace", textShadow: `0 0 15px ${C.redDim}` }}>{room.price}</span>
        <a href="https://www.booking.com/hotel/ua/red-cube-kamianets-39-podil-39-s-39-kyi1.uk.html" target="_blank" rel="noreferrer"
          style={{ fontSize: "10px", letterSpacing: "0.22em", color: theme.mutedColor, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: "2px", transition: "all 0.2s" }}
          onMouseEnter={e => { e.target.style.color = C.red; e.target.style.borderColor = C.red; }}
          onMouseLeave={e => { e.target.style.color = theme.mutedColor; e.target.style.borderColor = theme.borderColor; }}>ОБРАТИ →</a>
      </div>
    </div>
  );

  return (
    <div ref={ref}>
      <NeonBorder active={inView} delay="0s" className="room-neon" style={{ background: theme.surface, overflow: "hidden" }}>
        <Slide inView={inView} delay={0.1}>
          <div className="room-row" style={{ display: "flex", flexDirection: theme.reverse ? "row-reverse" : "row", flexWrap: "wrap" }}>
            {photoBlock}{infoBlock}
          </div>
        </Slide>
      </NeonBorder>
      {lightbox && <Lightbox images={images} startIdx={idx} name={room.name} onClose={() => setLightbox(false)} />}
    </div>
  );
});

export default RoomCard;

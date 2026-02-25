import C from "../../constants/colors.js";
import useInView from "../../hooks/useInView.js";
import NeonBorder from "../ui/NeonBorder.jsx";
import Slide from "../ui/Slide.jsx";

export default function RoomCard({ room, theme }) {
  const [ref, inView] = useInView(0.2);
  const photoBlock = (
    <div style={{ flex: "0 0 clamp(240px,42%,440px)", minHeight: "260px", position: "relative", overflow: "hidden" }}>
      <img src={room.image} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px", background: `linear-gradient(to bottom,transparent,${C.red},transparent)`, boxShadow: `0 0 8px ${C.redGlow}`, opacity: inView ? 1 : 0, transition: "opacity 1s ease 1.5s" }} />
    </div>
  );
  const infoBlock = (
    <div style={{ flex: 1, padding: "clamp(24px,3.5vw,44px)" }}>
      <span style={{ fontSize: "10px", letterSpacing: "0.28em", color: theme.labelColor, fontFamily: "'DM Mono',monospace" }}>{room.id} / НОМЕР</span>
      <h3 style={{ fontSize: "clamp(20px,3.5vw,30px)", fontFamily: "'Playfair Display',serif", color: theme.textColor, fontWeight: "400", margin: "10px 0 14px" }}>{room.name}</h3>
      <p style={{ fontSize: "13px", color: theme.mutedColor, lineHeight: 1.75, marginBottom: "20px" }}>{room.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "24px" }}>
        {room.tags.map((t, j) => (
          <span key={j} style={{ fontSize: "9px", letterSpacing: "0.12em", color: theme.mutedColor, border: `1px solid ${theme.borderColor}`, padding: "4px 10px", fontFamily: "'DM Mono',monospace" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "17px", color: C.red, fontFamily: "'DM Mono',monospace", textShadow: `0 0 15px ${C.redDim}` }}>{room.price}</span>
        <a href="#" style={{ fontSize: "10px", letterSpacing: "0.22em", color: theme.mutedColor, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: "2px", transition: "all 0.2s" }}
          onMouseEnter={e => { e.target.style.color = C.red; e.target.style.borderColor = C.red; }}
          onMouseLeave={e => { e.target.style.color = theme.mutedColor; e.target.style.borderColor = theme.borderColor; }}>ОБРАТИ →</a>
      </div>
    </div>
  );
  return (
    <div ref={ref}>
      <NeonBorder active={inView} delay="0s" style={{ background: theme.surface, overflow: "hidden" }}>
        <Slide inView={inView} delay={0.1}>
          <div style={{ display: "flex", flexDirection: theme.reverse ? "row-reverse" : "row", flexWrap: "wrap" }}>
            {photoBlock}{infoBlock}
          </div>
        </Slide>
      </NeonBorder>
    </div>
  );
}

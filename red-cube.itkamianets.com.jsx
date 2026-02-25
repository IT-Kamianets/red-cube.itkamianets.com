import { useState, useEffect, useRef } from "react";

const C = {
  bg:          "#0e0e0e",
  surface:     "#161616",
  warmBg:      "#2a2420",
  warmSurface: "#352d28",
  warmAccent:  "#3f3028",
  brickBg:     "#1f1010",
  brickSurface:"#2a1414",
  darkBg:      "#111214",
  darkSurface: "#16181b",
  red:         "#C8102E",
  redGlow:     "rgba(200,16,46,0.55)",
  redDim:      "rgba(200,16,46,0.12)",
  redBorder:   "rgba(200,16,46,0.22)",
  text:        "#EDEAE4",
  textWarm:    "#E8DDD5",
  muted:       "#6a6560",
  mutedWarm:   "#8a7f78",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function NeonBorder({ active, children, style = {}, delay = "0s", color = C.red, glow = C.redGlow }) {
  const d = (n) => `${parseFloat(delay) + n * 0.58}s`;
  const line = (extra) => ({
    position:"absolute", background:color,
    boxShadow:`0 0 8px ${glow}`,
    transition:"0.52s cubic-bezier(.4,0,.2,1)",
    ...extra,
  });
  return (
    <div style={{ position:"relative", ...style }}>
      <span style={line({ top:0,left:0,height:"1px",width:active?"100%":"0%",transitionProperty:"width",transitionDelay:d(0) })} />
      <span style={line({ top:0,right:0,width:"1px",height:active?"100%":"0%",transitionProperty:"height",transitionDelay:d(1) })} />
      <span style={line({ bottom:0,right:0,height:"1px",width:active?"100%":"0%",transitionProperty:"width",transitionDelay:d(2),transformOrigin:"right",transform:"scaleX(-1)" })} />
      <span style={line({ bottom:0,left:0,width:"1px",height:active?"100%":"0%",transitionProperty:"height",transitionDelay:d(3),transformOrigin:"bottom",transform:"scaleY(-1)" })} />
      {children}
    </div>
  );
}

function HeroBorder({ active, done, children, style = {} }) {
  const DUR = 0.58, GAP = 0.05;
  const d = (n) => `${n * (DUR + GAP)}s`;
  return (
    <div style={{ position:"relative", ...style }}>
      <span style={{ position:"absolute",bottom:0,left:0,width:"1px",background:C.red,boxShadow:`0 0 10px ${C.redGlow}`,height:active?"100%":"0%",transition:`height ${DUR}s cubic-bezier(.4,0,.2,1) ${d(0)}`,transformOrigin:"bottom" }}/>
      <span style={{ position:"absolute",top:0,left:0,height:"1px",background:C.red,boxShadow:`0 0 10px ${C.redGlow}`,width:active?"100%":"0%",transition:`width ${DUR}s cubic-bezier(.4,0,.2,1) ${d(1)}` }}/>
      <span style={{ position:"absolute",top:0,right:0,width:"1px",background:C.red,boxShadow:`0 0 10px ${C.redGlow}`,height:active?"100%":"0%",transition:`height ${DUR}s cubic-bezier(.4,0,.2,1) ${d(2)}` }}/>
      <span style={{ position:"absolute",bottom:0,right:0,height:"1px",background:C.red,boxShadow:`0 0 10px ${C.redGlow}`,width:active?"100%":"0%",transition:`width ${DUR}s cubic-bezier(.4,0,.2,1) ${d(3)}`,transformOrigin:"right",transform:"scaleX(-1)" }}/>
      <span style={{ position:"absolute",bottom:"100%",left:"-1px",width:"1px",background:`linear-gradient(to top,${C.red},rgba(200,16,46,0.3) 60%,transparent)`,boxShadow:`0 0 12px ${C.redGlow}`,height:done?"clamp(40px,8vh,80px)":"0px",transition:"height 0.7s cubic-bezier(.2,0,.1,1) 0.2s" }}/>
      {children}
    </div>
  );
}

function Particles({ active }) {
  const ps = Array.from({length:12},(_,i)=>({
    id:i, left:`${8+(i*7.3)%84}%`,
    delay:`${(i*0.7)%5}s`, dur:`${4+(i*0.4)%4}s`,
    size:i%3===0?3:i%3===1?2:1.5,
  }));
  if (!active) return null;
  return <>{ps.map(p=>(
    <span key={p.id} style={{ position:"absolute",left:p.left,bottom:"-10px",width:`${p.size}px`,height:`${p.size}px`,borderRadius:"50%",background:C.red,boxShadow:`0 0 ${p.size*3}px ${C.redGlow}`,animation:`floatUp ${p.dur} ease-in ${p.delay} infinite`,pointerEvents:"none" }}/>
  ))}</>;
}

function CornerAccents({ active }) {
  if (!active) return null;
  const corners = [
    {top:"-4px",left:"-4px",borderTop:`1px solid ${C.red}`,borderLeft:`1px solid ${C.red}`},
    {top:"-4px",right:"-4px",borderTop:`1px solid ${C.red}`,borderRight:`1px solid ${C.red}`},
    {bottom:"-4px",left:"-4px",borderBottom:`1px solid ${C.red}`,borderLeft:`1px solid ${C.red}`},
    {bottom:"-4px",right:"-4px",borderBottom:`1px solid ${C.red}`,borderRight:`1px solid ${C.red}`},
  ];
  return <>{corners.map((c,i)=>(
    <span key={i} style={{ position:"absolute",width:"16px",height:"16px",...c,boxShadow:`0 0 8px ${C.redGlow}`,animation:`cornerPulse 3s ease-in-out ${i*0.4}s infinite`,pointerEvents:"none" }}/>
  ))}</>;
}

function Slide({ inView, delay=0, children, style={} }) {
  return (
    <div style={{ opacity:inView?1:0,transform:inView?"translateY(0)":"translateY(28px)",transition:`opacity 0.7s ease ${delay}s,transform 0.7s ease ${delay}s`,...style }}>
      {children}
    </div>
  );
}

function Label({ n, text, warm=false }) {
  return (
    <span style={{ fontSize:"10px",letterSpacing:"0.3em",color:warm?"rgba(200,140,100,0.8)":C.red,fontFamily:"monospace",textTransform:"uppercase" }}>
      {n} / {text}
    </span>
  );
}

// ─── NAV ──────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const el = document.getElementById("rc-scroll");
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  },[]);
  return (
    <nav style={{ position:"sticky",top:0,zIndex:100,padding:"16px clamp(20px,5vw,64px)",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(14,14,14,0.96)":"transparent",borderBottom:scrolled?`1px solid ${C.redBorder}`:"1px solid transparent",backdropFilter:scrolled?"blur(14px)":"none",transition:"all 0.4s ease" }}>
      <div style={{ fontSize:"18px",fontFamily:"Georgia,serif",color:C.text,fontWeight:"700",letterSpacing:"0.04em" }}>
        R<span style={{ fontSize:"10px",color:C.muted,letterSpacing:"0.22em",marginLeft:"6px",fontFamily:"monospace",fontWeight:"400" }}>CUBE</span>
      </div>
      <div style={{ display:"flex",gap:"clamp(16px,3vw,36px)" }}>
        {["Номери","Галерея","Контакти"].map((item,i)=>(
          <a key={i} href="#" style={{ fontSize:"10px",letterSpacing:"0.22em",color:C.muted,textTransform:"uppercase",fontFamily:"monospace",textDecoration:"none",transition:"color 0.2s" }}
          onMouseEnter={e=>e.target.style.color=C.text}
          onMouseLeave={e=>e.target.style.color=C.muted}>{item}</a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────
function Hero() {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{
    const ts = [
      setTimeout(()=>setPhase(1),400),
      setTimeout(()=>setPhase(2),2700),
      setTimeout(()=>setPhase(3),3500),
      setTimeout(()=>setPhase(4),4400),
    ];
    return ()=>ts.forEach(clearTimeout);
  },[]);

  return (
    <section style={{ minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"40px" }}>
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 55% at 50% 42%,rgba(200,16,46,0.07) 0%,transparent 70%)",pointerEvents:"none" }}/>
      <Particles active={phase>=4}/>
      <HeroBorder active={phase>=1} done={phase>=4} style={{ width:"min(620px,90vw)",padding:"clamp(44px,7vw,80px) clamp(28px,5vw,64px)",textAlign:"center",marginTop:"clamp(16px,3vh,48px)" }}>
        <CornerAccents active={phase>=4}/>
        <div style={{ fontSize:"10px",letterSpacing:"0.45em",color:C.red,fontFamily:"monospace",marginBottom:"16px",opacity:phase>=2?0.7:0,transition:"opacity 0.6s ease" }}>КАМ'ЯНЕЦЬ-ПОДІЛЬСЬКИЙ</div>
        <div style={{ fontSize:"clamp(72px,14vw,120px)",fontFamily:"Georgia,serif",fontWeight:"900",color:C.text,lineHeight:1,letterSpacing:"-0.04em",marginBottom:"6px",textShadow:phase>=3?`0 0 40px ${C.redGlow},0 0 100px rgba(200,16,46,0.25)`:"none",transition:"text-shadow 1s ease",animation:phase>=4?"glowPulse 4s ease-in-out infinite":"none" }}>R</div>
        <div style={{ fontSize:"clamp(8px,1.4vw,11px)",letterSpacing:"0.4em",color:C.muted,textTransform:"uppercase",fontFamily:"monospace",marginBottom:"clamp(32px,5vw,56px)" }}>RED CUBE HOTEL</div>
        <div style={{ opacity:phase>=2?1:0,transform:phase>=2?"translateY(0)":"translateY(14px)",transition:"all 0.8s ease" }}>
          <p style={{ fontSize:"clamp(13px,2.2vw,16px)",color:C.text,fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.65,marginBottom:"clamp(24px,4vw,40px)",opacity:0.75 }}>
            Сучасний готель<br/>у серці Кам'янця-Подільського
          </p>
          <button style={{ background:"transparent",border:`1px solid ${C.red}`,color:C.red,padding:"13px 36px",fontSize:"10px",letterSpacing:"0.28em",textTransform:"uppercase",fontFamily:"monospace",cursor:"pointer",boxShadow:`0 0 20px ${C.redDim}`,transition:"all 0.3s ease" }}
          onMouseEnter={e=>{e.target.style.background=C.red;e.target.style.color="#fff";e.target.style.boxShadow=`0 0 35px ${C.redGlow}`;}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=C.red;e.target.style.boxShadow=`0 0 20px ${C.redDim}`;}}
          >Забронювати</button>
        </div>
      </HeroBorder>
      <div style={{ position:"absolute",bottom:"24px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",opacity:phase>=3?0.45:0,transition:"opacity 1s ease" }}>
        <div style={{ width:"1px",height:"32px",background:`linear-gradient(to bottom,${C.red},transparent)`,animation:"pulse 2s infinite" }}/>
        <span style={{ fontSize:"9px",letterSpacing:"0.22em",color:C.muted,fontFamily:"monospace" }}>SCROLL</span>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────
function Stats() {
  const [ref,inView]=useInView(0.3);
  const stats=[{v:"9.3",l:"Рейтинг Booking"},{v:"9.5",l:"Персонал"},{v:"9.4",l:"Чистота"},{v:"715",l:"Відгуків"}];
  return (
    <section ref={ref} style={{ background:C.warmBg,padding:"clamp(36px,6vw,72px) clamp(20px,5vw,64px)",borderTop:`1px solid rgba(200,140,100,0.15)`,borderBottom:`1px solid rgba(200,140,100,0.15)` }}>
      <div style={{ maxWidth:"900px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"20px" }}>
        {stats.map((s,i)=>(
          <Slide key={i} inView={inView} delay={i*0.1}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:"clamp(34px,5.5vw,54px)",fontFamily:"Georgia,serif",color:C.red,textShadow:`0 0 30px ${C.redGlow}`,lineHeight:1,marginBottom:"8px" }}>{s.v}</div>
              <div style={{ fontSize:"10px",letterSpacing:"0.2em",color:C.mutedWarm,fontFamily:"monospace",textTransform:"uppercase" }}>{s.l}</div>
            </div>
          </Slide>
        ))}
      </div>
    </section>
  );
}

// ─── ROOMS ────────────────────────────────────────────────
const roomThemes = [
  { bg:C.darkBg,surface:C.darkSurface,photoBg:"linear-gradient(135deg,#0f1214 0%,#1a1c20 60%,rgba(200,16,46,0.06) 100%)",labelColor:C.red,textColor:C.text,mutedColor:C.muted,borderColor:C.redBorder,reverse:false },
  { bg:C.warmBg,surface:C.warmSurface,photoBg:"linear-gradient(135deg,#2a2218 0%,#3d2e28 60%,rgba(180,80,50,0.12) 100%)",labelColor:"rgba(210,150,110,0.85)",textColor:C.textWarm,mutedColor:C.mutedWarm,borderColor:"rgba(200,140,100,0.2)",reverse:true },
  { bg:C.brickBg,surface:C.brickSurface,photoBg:"linear-gradient(135deg,#2a1414 0%,#3d1c1c 60%,rgba(200,16,46,0.1) 100%)",labelColor:"rgba(200,100,100,0.85)",textColor:C.text,mutedColor:"#7a5858",borderColor:"rgba(200,80,80,0.2)",reverse:false },
];

function RoomCard({ room, theme }) {
  const [ref,inView]=useInView(0.2);
  const photoBlock = (
    <div style={{ flex:"0 0 clamp(240px,42%,440px)",minHeight:"260px",background:theme.photoBg,position:"relative",display:"flex",alignItems:"flex-end",padding:"18px" }}>
      <span style={{ position:"absolute",top:"18px",right:"18px",fontSize:"clamp(44px,7vw,68px)",fontFamily:"Georgia,serif",color:"rgba(255,255,255,0.04)",fontWeight:"900",userSelect:"none",lineHeight:1 }}>{room.id}</span>
      <div style={{ position:"absolute",left:0,top:"20%",bottom:"20%",width:"2px",background:`linear-gradient(to bottom,transparent,${C.red},transparent)`,boxShadow:`0 0 8px ${C.redGlow}`,opacity:inView?1:0,transition:"opacity 1s ease 1.5s" }}/>
      <span style={{ fontSize:"9px",letterSpacing:"0.22em",color:theme.labelColor,fontFamily:"monospace" }}>ФОТО — {room.name.toUpperCase()}</span>
    </div>
  );
  const infoBlock = (
    <div style={{ flex:1,padding:"clamp(24px,3.5vw,44px)" }}>
      <span style={{ fontSize:"10px",letterSpacing:"0.28em",color:theme.labelColor,fontFamily:"monospace" }}>{room.id} / НОМЕР</span>
      <h3 style={{ fontSize:"clamp(20px,3.5vw,30px)",fontFamily:"Georgia,serif",color:theme.textColor,fontWeight:"400",margin:"10px 0 14px" }}>{room.name}</h3>
      <p style={{ fontSize:"13px",color:theme.mutedColor,lineHeight:1.75,marginBottom:"20px" }}>{room.desc}</p>
      <div style={{ display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"24px" }}>
        {room.tags.map((t,j)=>(
          <span key={j} style={{ fontSize:"9px",letterSpacing:"0.12em",color:theme.mutedColor,border:`1px solid ${theme.borderColor}`,padding:"4px 10px",fontFamily:"monospace" }}>{t}</span>
        ))}
      </div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <span style={{ fontSize:"17px",color:C.red,fontFamily:"monospace",textShadow:`0 0 15px ${C.redDim}` }}>{room.price}</span>
        <a href="#" style={{ fontSize:"10px",letterSpacing:"0.22em",color:theme.mutedColor,fontFamily:"monospace",textDecoration:"none",borderBottom:`1px solid ${theme.borderColor}`,paddingBottom:"2px",transition:"all 0.2s" }}
        onMouseEnter={e=>{e.target.style.color=C.red;e.target.style.borderColor=C.red;}}
        onMouseLeave={e=>{e.target.style.color=theme.mutedColor;e.target.style.borderColor=theme.borderColor;}}>ОБРАТИ →</a>
      </div>
    </div>
  );
  return (
    <div ref={ref}>
      <NeonBorder active={inView} delay="0s" style={{ background:theme.surface,overflow:"hidden" }}>
        <Slide inView={inView} delay={0.1}>
          <div style={{ display:"flex",flexDirection:theme.reverse?"row-reverse":"row",flexWrap:"wrap" }}>
            {photoBlock}{infoBlock}
          </div>
        </Slide>
      </NeonBorder>
    </div>
  );
}

function Rooms() {
  const [ref,inView]=useInView(0.1);
  const rooms=[
    { id:"01",name:"Standard King",desc:"Двоспальне ліжко king-size, вид на місто, власна ванна кімната з підігрівом підлоги. Кондиціонер, телевізор, холодильник.",price:"від 1 150 ₴",tags:["King-size","Вид на місто","Кондиціонер","Wi-Fi","Холодильник","14 м²"] },
    { id:"02",name:"Triple Room",desc:"Ліжко king-size + диван-ліжко. Більше простору, підходить для сімей або невеликої компанії. Вид на місто.",price:"від 1 350 ₴",tags:["King + Sofa","Вид на місто","Кондиціонер","Wi-Fi","Рушники","20 м²"] },
    { id:"03",name:"Triple Comfort",desc:"Тримісний номер без виду на місто — тихіший варіант. Ті самі зручності за нижчою ціною.",price:"від 1 250 ₴",tags:["King + Sofa","Тихий поверх","Кондиціонер","Wi-Fi","Білизна","20 м²"] },
  ];
  return (
    <section ref={ref} style={{ background:C.bg,padding:"clamp(56px,9vw,112px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth:"920px",margin:"0 auto" }}>
        <Slide inView={inView} style={{ marginBottom:"clamp(36px,5vw,56px)" }}>
          <Label n="02" text="Номери"/>
          <h2 style={{ fontSize:"clamp(28px,4.5vw,46px)",fontFamily:"Georgia,serif",color:C.text,marginTop:"12px",fontWeight:"400" }}>Spaces</h2>
        </Slide>
        <div style={{ display:"flex",flexDirection:"column",gap:"3px" }}>
          {rooms.map((room,i)=>(<RoomCard key={i} room={room} theme={roomThemes[i]}/>))}
        </div>
      </div>
    </section>
  );
}

// ─── DINING ───────────────────────────────────────────────
function Dining() {
  const [ref,inView]=useInView(0.2);
  return (
    <section ref={ref} style={{ background:C.warmBg,padding:"clamp(56px,9vw,112px) clamp(20px,5vw,64px)",borderTop:`1px solid rgba(200,140,100,0.12)` }}>
      <div style={{ maxWidth:"920px",margin:"0 auto" }}>
        <Slide inView={inView} style={{ marginBottom:"clamp(36px,5vw,56px)" }}>
          <Label n="03" text="Простір" warm/>
          <h2 style={{ fontSize:"clamp(28px,4.5vw,46px)",fontFamily:"Georgia,serif",color:C.textWarm,marginTop:"12px",fontWeight:"400" }}>Dining & Кухня</h2>
        </Slide>
        <NeonBorder active={inView} delay="0.2s">
          <Slide inView={inView} delay={0.1}>
            <div style={{ background:C.warmSurface,padding:"clamp(28px,4.5vw,48px)",display:"flex",alignItems:"center",gap:"clamp(20px,3.5vw,40px)",flexWrap:"wrap",position:"relative",overflow:"hidden",borderBottom:`1px solid rgba(200,140,100,0.15)` }}>
              <div style={{ display:"flex",gap:"12px",flexShrink:0 }}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{ width:"clamp(48px,8vw,72px)",height:"clamp(48px,8vw,72px)",borderRadius:"50%",border:`2px solid rgba(100,180,220,${0.25+i*0.18})`,boxShadow:`0 0 ${16+i*8}px rgba(100,180,220,${0.15+i*0.1})`,opacity:inView?1:0,transform:inView?"scale(1)":"scale(0.6)",transition:`all 0.6s ease ${i*0.12}s` }}/>
                ))}
              </div>
              <div style={{ flex:1,minWidth:"200px" }}>
                <h3 style={{ fontSize:"clamp(15px,2.5vw,20px)",fontFamily:"Georgia,serif",color:C.textWarm,fontWeight:"400",marginBottom:"10px" }}>Спільна кухня та зона відпочинку</h3>
                <p style={{ fontSize:"13px",color:C.mutedWarm,lineHeight:1.75 }}>Велика зона з краєвидом на місто, мікрохвильова піч, холодильник, весь необхідний посуд. Атмосферна dining area з характерними круглими вікнами та підсвіткою.</p>
              </div>
              <div style={{ position:"absolute",right:0,top:0,bottom:0,width:"2px",background:`linear-gradient(to bottom,transparent,${C.red} 50%,transparent)`,opacity:inView?1:0,transition:"opacity 1s ease 0.6s" }}/>
            </div>
          </Slide>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1px",background:"rgba(200,140,100,0.08)" }}>
            {[{t:"Сніданок",d:"Доступний за запитом — млинці, сирники, каша"},{t:"Кухня 24/7",d:"Мікрохвильова піч, чайник, посуд завжди доступні"},{t:"Зона відпочинку",d:"Окремий простір від номерів, панорамні вікна"}].map((item,i)=>(
              <Slide key={i} inView={inView} delay={0.3+i*0.1}>
                <div style={{ background:C.warmAccent,padding:"24px 24px 28px",height:"100%" }}>
                  <div style={{ width:"18px",height:"2px",background:C.red,boxShadow:`0 0 8px ${C.redGlow}`,marginBottom:"16px" }}/>
                  <h4 style={{ fontSize:"14px",fontFamily:"Georgia,serif",color:C.textWarm,fontWeight:"400",marginBottom:"8px" }}>{item.t}</h4>
                  <p style={{ fontSize:"12px",color:C.mutedWarm,lineHeight:1.65 }}>{item.d}</p>
                </div>
              </Slide>
            ))}
          </div>
        </NeonBorder>
      </div>
    </section>
  );
}

// ─── AMENITIES ────────────────────────────────────────────
function Amenities() {
  const [ref,inView]=useInView(0.15);
  const items=[
    {l:"Безкоштовний Wi-Fi",s:"у всіх номерах"},{l:"Кондиціонер",s:"індивідуальний"},
    {l:"Ліфт",s:"доступ на всі поверхи"},{l:"Цілодобова стійка",s:"реєстрація 24/7"},
    {l:"Приватна парковка",s:"30 ₴ / добу"},{l:"Теплий душ",s:"підігрів підлоги"},
    {l:"Сімейні номери",s:"до 3 гостей"},{l:"Можна з тваринами",s:"за попереднім запитом"},
  ];
  return (
    <section ref={ref} style={{ background:C.darkBg,padding:"clamp(56px,9vw,112px) clamp(20px,5vw,64px)",borderTop:`1px solid rgba(100,120,140,0.12)` }}>
      <div style={{ maxWidth:"920px",margin:"0 auto" }}>
        <Slide inView={inView} style={{ marginBottom:"clamp(36px,5vw,56px)" }}>
          <Label n="04" text="Зручності"/>
          <h2 style={{ fontSize:"clamp(28px,4.5vw,46px)",fontFamily:"Georgia,serif",color:C.text,marginTop:"12px",fontWeight:"400" }}>Amenities</h2>
        </Slide>
        <NeonBorder active={inView} delay="0.2s">
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:"1px",background:"rgba(100,120,140,0.12)" }}>
            {items.map((item,i)=>(
              <Slide key={i} inView={inView} delay={i*0.06} style={{ background:C.darkBg }}>
                <div style={{ padding:"26px 22px",background:C.darkSurface,transition:"background 0.25s",cursor:"default",height:"100%" }}
                onMouseEnter={e=>e.currentTarget.style.background="#1e2025"}
                onMouseLeave={e=>e.currentTarget.style.background=C.darkSurface}>
                  <div style={{ width:"16px",height:"2px",background:C.red,boxShadow:`0 0 6px ${C.redGlow}`,marginBottom:"14px" }}/>
                  <div style={{ fontSize:"13px",color:C.text,marginBottom:"4px",lineHeight:1.3 }}>{item.l}</div>
                  <div style={{ fontSize:"11px",color:C.muted,fontFamily:"monospace" }}>{item.s}</div>
                </div>
              </Slide>
            ))}
          </div>
        </NeonBorder>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────
function Gallery() {
  const [ref,inView]=useInView(0.1);
  const [active,setActive]=useState(null);
  const cells=[
    {label:"Вивіска / Фасад",bg:"linear-gradient(135deg,#1f1010 0%,#2a1515 100%)",col:"span 1",row:"span 2"},
    {label:"Dining Area",bg:"linear-gradient(135deg,#0a1018 0%,#0f1a28 100%)",col:"span 2",row:"span 1"},
    {label:"Standard King",bg:"linear-gradient(135deg,#1a1410 0%,#261e18 100%)",col:"span 1",row:"span 1"},
    {label:"Triple Room",bg:"linear-gradient(135deg,#1e1210 0%,#2a1a14 100%)",col:"span 1",row:"span 1"},
    {label:"Ванна кімната",bg:"linear-gradient(135deg,#111214 0%,#181a1e 100%)",col:"span 1",row:"span 1"},
    {label:"Кухня",bg:"linear-gradient(135deg,#141010 0%,#201818 100%)",col:"span 1",row:"span 1"},
    {label:"Вид з вікна",bg:"linear-gradient(135deg,#0e1210 0%,#181e16 100%)",col:"span 2",row:"span 1"},
  ];
  return (
    <section ref={ref} style={{ background:C.brickBg,padding:"clamp(56px,9vw,112px) clamp(20px,5vw,64px)",borderTop:`1px solid rgba(200,80,80,0.12)` }}>
      <div style={{ maxWidth:"920px",margin:"0 auto" }}>
        <Slide inView={inView} style={{ marginBottom:"clamp(36px,5vw,56px)" }}>
          <Label n="05" text="Галерея"/>
          <h2 style={{ fontSize:"clamp(28px,4.5vw,46px)",fontFamily:"Georgia,serif",color:C.text,marginTop:"12px",fontWeight:"400" }}>Gallery</h2>
        </Slide>
        <NeonBorder active={inView} delay="0.15s">
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(3,160px)",gap:"4px" }}>
            {cells.map((cell,i)=>(
              <Slide key={i} inView={inView} delay={i*0.07} style={{ gridColumn:cell.col,gridRow:cell.row }}>
                <div style={{ background:cell.bg,width:"100%",height:"100%",position:"relative",overflow:"hidden",cursor:"pointer",transition:"transform 0.3s ease" }}
                onMouseEnter={e=>{setActive(i);e.currentTarget.style.transform="scale(1.015)";e.currentTarget.style.zIndex="2";}}
                onMouseLeave={e=>{setActive(null);e.currentTarget.style.transform="scale(1)";e.currentTarget.style.zIndex="1";}}>
                  <div style={{ position:"absolute",inset:0,background:active===i?"rgba(200,16,46,0.07)":"transparent",border:active===i?`1px solid ${C.red}`:"1px solid transparent",boxShadow:active===i?`inset 0 0 24px rgba(200,16,46,0.1)`:"none",transition:"all 0.3s" }}/>
                  <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"12px",background:"linear-gradient(to top,rgba(0,0,0,0.75),transparent)",opacity:active===i?1:0,transition:"opacity 0.3s" }}>
                    <span style={{ fontSize:"9px",letterSpacing:"0.2em",color:C.text,fontFamily:"monospace" }}>{cell.label.toUpperCase()}</span>
                  </div>
                  <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <span style={{ fontSize:"9px",letterSpacing:"0.15em",color:"rgba(255,255,255,0.08)",fontFamily:"monospace" }}>{cell.label.toUpperCase()}</span>
                  </div>
                </div>
              </Slide>
            ))}
          </div>
        </NeonBorder>
        <Slide inView={inView} delay={0.5} style={{ marginTop:"18px",textAlign:"right" }}>
          <a href="#" style={{ fontSize:"10px",letterSpacing:"0.25em",color:C.muted,fontFamily:"monospace",textDecoration:"none",borderBottom:`1px solid ${C.redBorder}`,paddingBottom:"3px",transition:"all 0.2s" }}
          onMouseEnter={e=>{e.target.style.color=C.red;e.target.style.borderColor=C.red;}}
          onMouseLeave={e=>{e.target.style.color=C.muted;e.target.style.borderColor=C.redBorder;}}>ВСІ ФОТО В INSTAGRAM →</a>
        </Slide>
      </div>
    </section>
  );
}

// ─── CONTACTS ─────────────────────────────────────────────
function Contacts() {
  const [ref,inView]=useInView(0.2);
  return (
    <section ref={ref} style={{ background:C.bg,padding:"clamp(56px,9vw,112px) clamp(20px,5vw,64px)",borderTop:`1px solid ${C.redBorder}` }}>
      <div style={{ maxWidth:"920px",margin:"0 auto" }}>
        <Slide inView={inView} style={{ marginBottom:"clamp(36px,5vw,56px)" }}>
          <Label n="06" text="Контакти"/>
        </Slide>
        <NeonBorder active={inView} delay="0.2s" style={{ padding:"clamp(32px,4.5vw,52px)" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"40px" }}>
            <Slide inView={inView} delay={0.1}>
              <h2 style={{ fontSize:"clamp(26px,4.5vw,40px)",fontFamily:"Georgia,serif",color:C.text,fontWeight:"400",marginBottom:"28px",lineHeight:1.2 }}>Знайти<br/>нас просто</h2>
              <div style={{ display:"flex",flexDirection:"column",gap:"18px" }}>
                {[{k:"Адреса",v:"вул. Першотравнева 9Б\nКам'янець-Подільський"},{k:"Заїзд / Виїзд",v:"з 14:00 / до 11:00"},{k:"Стійка",v:"цілодобово"},{k:"Оплата",v:"готівка"}].map((item,i)=>(
                  <div key={i}>
                    <span style={{ fontSize:"9px",letterSpacing:"0.25em",color:C.red,fontFamily:"monospace",display:"block",marginBottom:"4px" }}>{item.k.toUpperCase()}</span>
                    <span style={{ fontSize:"13px",color:C.muted,lineHeight:1.6,whiteSpace:"pre-line" }}>{item.v}</span>
                  </div>
                ))}
              </div>
            </Slide>
            <Slide inView={inView} delay={0.2} style={{ display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:"14px" }}>
              <a href="https://www.booking.com" target="_blank" rel="noreferrer" style={{ display:"block",textAlign:"center",background:C.red,color:"#fff",padding:"16px 28px",fontSize:"10px",letterSpacing:"0.28em",textTransform:"uppercase",fontFamily:"monospace",textDecoration:"none",boxShadow:`0 0 30px ${C.redDim}`,transition:"box-shadow 0.3s" }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 0 45px ${C.redGlow}`}
              onMouseLeave={e=>e.currentTarget.style.boxShadow=`0 0 30px ${C.redDim}`}>Забронювати на Booking</a>
              <div style={{ display:"flex",justifyContent:"center",gap:"20px",flexWrap:"wrap" }}>
                {["Instagram","Google Maps","Booking.com"].map((s,i)=>(
                  <a key={i} href="#" style={{ fontSize:"10px",letterSpacing:"0.15em",color:C.muted,fontFamily:"monospace",textDecoration:"none",borderBottom:`1px solid ${C.redBorder}`,paddingBottom:"2px",transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.target.style.color=C.red;e.target.style.borderColor=C.red;}}
                  onMouseLeave={e=>{e.target.style.color=C.muted;e.target.style.borderColor=C.redBorder;}}>{s}</a>
                ))}
              </div>
            </Slide>
          </div>
        </NeonBorder>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────
export default function App() {
  return (
    <div id="rc-scroll" style={{ background:C.bg,color:C.text,fontFamily:"Georgia,serif",height:"100vh",overflowY:"auto",overflowX:"hidden" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        @keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}
        @keyframes glowPulse{
          0%,100%{text-shadow:0 0 40px rgba(200,16,46,0.55),0 0 100px rgba(200,16,46,0.2)}
          50%{text-shadow:0 0 60px rgba(200,16,46,0.85),0 0 140px rgba(200,16,46,0.38)}
        }
        @keyframes floatUp{
          0%{transform:translateY(0) scale(1);opacity:0.22}
          40%{opacity:0.22}
          80%{opacity:0}
          100%{transform:translateY(-55vh) scale(0.4);opacity:0}
        }
        @keyframes cornerPulse{
          0%,100%{opacity:0.25;box-shadow:0 0 4px rgba(200,16,46,0.3)}
          50%{opacity:0.9;box-shadow:0 0 14px rgba(200,16,46,0.9)}
        }
        ::selection{background:#C8102E;color:#fff;}
      `}</style>
      <Nav/>
      <Hero/>
      <Stats/>
      <Rooms/>
      <Dining/>
      <Amenities/>
      <Gallery/>
      <Contacts/>
      <footer style={{ padding:"20px clamp(20px,5vw,64px)",borderTop:`1px solid ${C.redBorder}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",background:C.bg }}>
        <span style={{ fontSize:"10px",color:C.muted,fontFamily:"monospace" }}>© 2025 Red Cube Hotel</span>
        <span style={{ fontSize:"10px",color:C.muted,fontFamily:"monospace" }}>Кам'янець-Подільський, Першотравнева 9Б</span>
      </footer>
    </div>
  );
}

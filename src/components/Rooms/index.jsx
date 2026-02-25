import C from "../../constants/colors.js";
import useInView from "../../hooks/useInView.js";
import Slide from "../ui/Slide.jsx";
import Label from "../ui/Label.jsx";
import RoomCard from "./RoomCard.jsx";
import imgStandard from "../../images/rooms/стандртний із ліжком king-size.webp";
import imgTripleCity from "../../images/rooms/Тримісний номер з видом на місто.webp";
import imgTriple from "../../images/rooms/Тримісний номер.webp";

const roomThemes = [
  { bg: C.darkBg, surface: C.darkSurface, photoBg: "linear-gradient(135deg,#0f1214 0%,#1a1c20 60%,rgba(200,16,46,0.06) 100%)", labelColor: C.red, textColor: C.text, mutedColor: C.muted, borderColor: C.redBorder, reverse: false },
  { bg: C.warmBg, surface: C.warmSurface, photoBg: "linear-gradient(135deg,#2a2218 0%,#3d2e28 60%,rgba(180,80,50,0.12) 100%)", labelColor: "rgba(210,150,110,0.85)", textColor: C.textWarm, mutedColor: C.mutedWarm, borderColor: "rgba(200,140,100,0.2)", reverse: true },
  { bg: C.brickBg, surface: C.brickSurface, photoBg: "linear-gradient(135deg,#2a1414 0%,#3d1c1c 60%,rgba(200,16,46,0.1) 100%)", labelColor: "rgba(200,100,100,0.85)", textColor: C.text, mutedColor: "#7a5858", borderColor: "rgba(200,80,80,0.2)", reverse: false },
];

export default function Rooms() {
  const [ref, inView] = useInView(0.1);
  const rooms = [
    { id: "01", name: "Standard King", desc: "Двоспальне ліжко king-size, вид на місто, власна ванна кімната з підігрівом підлоги. Кондиціонер, телевізор, холодильник.", price: "від 1 150 ₴", tags: ["King-size", "Вид на місто", "Кондиціонер", "Wi-Fi", "Холодильник", "14 м²"], image: imgStandard },
    { id: "02", name: "Triple Room", desc: "Ліжко king-size + диван-ліжко. Більше простору, підходить для сімей або невеликої компанії. Вид на місто.", price: "від 1 350 ₴", tags: ["King + Sofa", "Вид на місто", "Кондиціонер", "Wi-Fi", "Рушники", "20 м²"], image: imgTripleCity },
    { id: "03", name: "Triple Comfort", desc: "Тримісний номер без виду на місто — тихіший варіант. Ті самі зручності за нижчою ціною.", price: "від 1 250 ₴", tags: ["King + Sofa", "Тихий поверх", "Кондиціонер", "Wi-Fi", "Білизна", "20 м²"], image: imgTriple },
  ];
  return (
    <section id="rooms" ref={ref} style={{ background: C.bg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          <Label n="02" text="Номери" />
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.text, marginTop: "12px", fontWeight: "400" }}>Spaces</h2>
        </Slide>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {rooms.map((room, i) => (<RoomCard key={i} room={room} theme={roomThemes[i]} />))}
        </div>
      </div>
    </section>
  );
}

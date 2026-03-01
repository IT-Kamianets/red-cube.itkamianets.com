import { useEffect, useRef } from "react";

const LAT = 48.6784;
const LNG = 26.5744;
const MAPS_URL = "https://www.google.com/maps/search/Першотравнева+9Б+Кам'янець-Подільський";

export default function HotelMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    import("leaflet").then((L) => {
      const Lf = L.default || L;

      const map = Lf.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
      });

      // CartoDB Voyager — чиста світла карта, мінімалістична
      Lf.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
      }).addTo(map);

      // attribution в кутку, маленький
      Lf.control.attribution({ position: "bottomleft", prefix: false }).addTo(map);

      // пульсуючий маркер
      const icon = Lf.divIcon({
        html: `
          <div style="position:relative;width:32px;height:32px;">
            <div style="
              position:absolute;inset:0;
              border-radius:50%;
              background:rgba(200,16,46,0.15);
              animation:rc-pulse 2s ease-out infinite;
            "></div>
            <div style="
              position:absolute;top:50%;left:50%;
              transform:translate(-50%,-50%);
              width:12px;height:12px;
              background:#C8102E;
              border-radius:50%;
              border:2px solid #fff;
              box-shadow:0 2px 8px rgba(200,16,46,0.5);
            "></div>
          </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        className: "",
      });

      Lf.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindTooltip(
          `<span style="
            font-family:monospace;
            font-size:11px;
            letter-spacing:0.1em;
            color:#1a1a1a;
            font-weight:600;
          ">RED CUBE HOTEL</span>`,
          {
            permanent: true,
            direction: "top",
            offset: [0, -18],
            className: "rc-tooltip",
          }
        );

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "360px" }}>
      <style>{`
        @keyframes rc-pulse {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .rc-tooltip {
          background: #fff !important;
          border: none !important;
          border-radius: 2px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
          padding: 5px 10px !important;
        }
        .rc-tooltip::before { display: none !important; }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255,255,255,0.7) !important;
        }
      `}</style>
      <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "360px" }} />
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noreferrer"
        style={{ position: "absolute", inset: 0, zIndex: 1000, cursor: "pointer" }}
        aria-label="Відкрити на Google Maps"
      />
    </div>
  );
}

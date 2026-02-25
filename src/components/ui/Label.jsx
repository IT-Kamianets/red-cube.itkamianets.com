import C from "../../constants/colors.js";

export default function Label({ text, warm = false }) {
  return (
    <span style={{ fontSize: "10px", letterSpacing: "0.3em", color: warm ? "rgba(200,140,100,0.8)" : C.red, fontFamily: "'DM Mono',monospace", textTransform: "uppercase" }}>
      {text}
    </span>
  );
}

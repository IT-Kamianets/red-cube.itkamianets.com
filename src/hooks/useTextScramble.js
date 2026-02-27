import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ·—/\\|[]{}";

export default function useTextScramble(target, active, speed = 38) {
  const [text, setText] = useState(() => target.replace(/\S/g, "·"));

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    // each char gets ~5 scramble frames before resolving
    const framesPerChar = 5;
    const total = target.length * framesPerChar + 8;

    const id = setInterval(() => {
      const resolved = Math.floor(frame / framesPerChar);
      setText(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < resolved) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      frame++;
      if (frame > total) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [target, active]);

  return text;
}

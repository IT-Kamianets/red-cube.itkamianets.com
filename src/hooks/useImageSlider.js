import { useState, useCallback, useRef } from "react";

export default function useImageSlider(length) {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef(null);

  const prev = useCallback(() => setIdx(i => (i - 1 + length) % length), [length]);
  const next = useCallback(() => setIdx(i => (i + 1) % length), [length]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  }, [next, prev]);

  return { idx, setIdx, prev, next, handleTouchStart, handleTouchEnd };
}

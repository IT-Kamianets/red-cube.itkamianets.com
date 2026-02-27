import { useState, useEffect, useCallback, useRef } from "react";

const GLOW = `0 0 4px rgba(140,0,33,0.8), 0 0 8px rgba(140,0,33,0.3)`;
const RED = "#8C0021";

// How many px above the label div the vertical line stops
const LABEL_OFFSET = 10;

// Shared easing for all connector tails
const EASE = "cubic-bezier(.4,0,.2,1)";

/**
 * Global layer — renders cross-section connector lines above all sections.
 * pairs: [{ sectionRef, boxRef, nextHeadingRef, animDelay }]
 *   animDelay — when vertical tail starts (s), horizontal = animDelay + 0.3s
 */
export default function ConnectorLines({ pairs, scrollContainerRef }) {
    const [lines, setLines] = useState([]);
    const [inViews, setInViews] = useState(() => pairs.map(() => false));
    const triggered = useRef(pairs.map(() => false));

    const measure = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const cRect = container.getBoundingClientRect();
        const scrollTop = container.scrollTop;

        setLines(pairs.map(({ boxRef, nextHeadingRef }) => {
            if (!boxRef.current) return null;
            const bRect = boxRef.current.getBoundingClientRect();
            const boxBottom = bRect.bottom - cRect.top + scrollTop;
            const boxLeft = bRect.left - cRect.left;
            const boxRight = bRect.right - cRect.left;
            const contWidth = container.clientWidth;

            let downH = 0;
            if (nextHeadingRef && nextHeadingRef.current) {
                const nRect = nextHeadingRef.current.getBoundingClientRect();
                const headingTop = nRect.top - cRect.top + scrollTop;
                // Stop LABEL_OFFSET px above the label div
                downH = Math.max(0, headingTop - LABEL_OFFSET - boxBottom);
            }

            return {
                boxBottom,
                boxLeft,
                boxRight,
                downH,
                rightW: Math.max(0, contWidth - boxRight),
            };
        }));
    }, [pairs, scrollContainerRef]);

    // Trigger: use tailTriggerRef if provided (for tall sections like Rooms), else boxRef
    useEffect(() => {
        const container = scrollContainerRef.current;
        const observers = pairs.map(({ boxRef, nextHeadingRef, tailTriggerRef }, i) => {
            const target = tailTriggerRef?.current ?? boxRef.current;
            if (!target) return null;
            // For nextHeadingRef targets: fire as soon as heading enters view (threshold 0)
            // For boxRef targets: fire when 40% of the block is visible
            const usingNextHeading = !!tailTriggerRef;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !triggered.current[i]) {
                        triggered.current[i] = true;
                        setInViews(prev => { const n = [...prev]; n[i] = true; return n; });
                    }
                },
                {
                    root: container,
                    rootMargin: usingNextHeading ? "0px 0px -5% 0px" : "0px 0px -10% 0px",
                    threshold: usingNextHeading ? 0 : 0.4,
                }
            );
            obs.observe(target);
            return obs;
        });
        return () => observers.forEach(o => o && o.disconnect());
    }, [pairs, scrollContainerRef]);

    // Measure on mount / scroll / resize
    useEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        pairs.forEach(({ boxRef, nextHeadingRef, sectionRef }) => {
            if (boxRef.current) ro.observe(boxRef.current);
            if (sectionRef?.current) ro.observe(sectionRef.current);
            if (nextHeadingRef?.current) ro.observe(nextHeadingRef.current);
        });
        const el = scrollContainerRef.current;
        if (el) el.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            if (el) el.removeEventListener("scroll", measure);
            window.removeEventListener("resize", measure);
        };
    }, [measure, pairs, scrollContainerRef]);

    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }}>
            {lines.map((line, i) => {
                if (!line) return null;
                const inView = inViews[i];
                // Support separate delays for each tail
                const vDelay = pairs[i].vDelay ?? pairs[i].animDelay ?? 1.6;
                const hDelay = pairs[i].hDelay ?? (vDelay - 0.45);  // horizontal = right border finish
                const vDuration = "0.55s";
                const hDuration = "0.45s";

                return (
                    <div key={i}>
                        {/* Vertical: down from bottom-left of content block */}
                        {line.downH > 0 && (
                            <span style={{
                                position: "absolute",
                                left: line.boxLeft,
                                top: line.boxBottom,
                                width: "1px",
                                height: line.downH,
                                background: RED,
                                boxShadow: GLOW,
                                transformOrigin: "top",
                                transform: inView ? "scaleY(1)" : "scaleY(0)",
                                transition: inView ? `transform ${vDuration} ${EASE} ${vDelay}s` : "none",
                            }} />
                        )}
                        {/* Horizontal: right from bottom-right of content block */}
                        {line.rightW > 0 && (
                            <span style={{
                                position: "absolute",
                                left: line.boxRight,
                                top: line.boxBottom - 1,
                                height: "1px",
                                width: line.rightW,
                                background: RED,
                                boxShadow: GLOW,
                                transformOrigin: "left",
                                transform: inView ? "scaleX(1)" : "scaleX(0)",
                                transition: inView ? `transform ${hDuration} ${EASE} ${hDelay}s` : "none",
                            }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

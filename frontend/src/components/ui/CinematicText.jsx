import { useLayoutEffect, useRef } from "react";

function splitGraphemes(text) {
  if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/**
 * CinematicText — canonical animated heading component.
 * API: as, className, children (string | array of strings = explicit lines).
 * Full text stays in the DOM for SEO / no-JS / screen readers (aria-label);
 * the visible reveal is a one-run, in-view masked line + grapheme cascade.
 */
export const CinematicText = ({ as: Tag = "h2", className = "", children }) => {
  const ref = useRef(null);
  const lines = Array.isArray(children) ? children : [children];
  const plain = lines
    .map((l) => (typeof l === "string" ? l : ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    el.classList.add("ct-armed");
    let io;
    const start = () => {
      const lineInners = el.querySelectorAll(".ct-line-inner");
      lineInners.forEach((li, liIndex) => {
        const lineDelay = liIndex * 150;
        li.style.transitionDelay = `${lineDelay}ms`;
        li.classList.add("is-in");
        li.querySelectorAll(".ct-char").forEach((c, i) => {
          c.style.transitionDelay = `${lineDelay + 100 + i * 16}ms`;
          c.classList.add("is-in");
        });
      });
    };
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io && io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} aria-label={plain || undefined}>
      {lines.map((line, li) =>
        typeof line === "string" ? (
          <span className="ct-line" key={li} aria-hidden="true">
            <span className="ct-line-inner">
              {splitGraphemes(line).map((ch, i) => (
                <span className="ct-char" key={i}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
        ) : (
          line
        )
      )}
    </Tag>
  );
};

export default CinematicText;

export function FluxvexMark({ size = 28, className = "" }) {
  return (
    <img
      src="/fluxvex-icon.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 rounded-[18%] object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function FluxvexLogo({ tone = "ink", size = 26, className = "" }) {
  const textColor = tone === "white" ? "#FFFFFF" : "#101014";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <FluxvexMark size={size} />
      <span
        className="font-display font-semibold tracking-[-0.03em]"
        style={{ color: textColor, fontSize: size * 0.82, lineHeight: 1 }}
      >
        Fluxvex
      </span>
    </span>
  );
}

export default FluxvexLogo;

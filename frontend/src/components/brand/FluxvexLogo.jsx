export function FluxvexMark({ size = 28, tone = "accent" }) {
  const color = tone === "white" ? "#FFFFFF" : tone === "ink" ? "#0B0B0B" : "#0099FF";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7.5 6.5 15.5 16l-8 9.5"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 6.5 16.5 16l8 9.5"
        stroke={color}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function FluxvexLogo({ tone = "ink", size = 26, className = "" }) {
  const textColor = tone === "white" ? "#FFFFFF" : "#0B0B0B";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <FluxvexMark size={size} tone={tone === "white" ? "white" : "accent"} />
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

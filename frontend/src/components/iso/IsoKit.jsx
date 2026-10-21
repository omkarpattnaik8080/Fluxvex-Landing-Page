/* Shared isometric kit — ONE 3D diagram language used by HowItWorks, AiComparison, Platform, FeatureGrid and Consistency. */
import { motion } from "framer-motion";

export const PLANE = "rotateX(55deg) rotateZ(-45deg)";
export const BILLBOARD = "rotateZ(45deg) rotateX(-55deg)";

export function IsoPlane({ w = 280, h = 280, scale = "", className = "", children }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className={scale || "scale-100"}>
        <div className="relative" style={{ width: w, height: h, transform: PLANE, transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function IsoTile({ x, y, w = 64, h = 64, dim, active, float = true, testid, children }) {
  return (
    <div
      className={`absolute transition-[opacity,filter] duration-500 ${dim ? "opacity-25 saturate-0" : "opacity-100"}`}
      style={{ left: x, top: y, width: w, height: h }}
      data-testid={testid}
    >
      <motion.div
        animate={{ scale: active ? 1.07 : 1, y: float && !dim ? [0, -3, 0] : 0 }}
        transition={{
          scale: { type: "spring", stiffness: 220, damping: 20 },
          y: float && !dim ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 },
        }}
        className={`relative flex h-full w-full items-center justify-center rounded-2xl bg-white ring-1 ${
          active
            ? "ring-2 ring-accent/60 shadow-[0_30px_50px_-18px_rgba(61,67,232,0.55)]"
            : "ring-black/[0.06] shadow-[0_18px_30px_-14px_rgba(16,16,20,0.35)]"
        }`}
      >
        {active && <span className="absolute inset-0 rounded-2xl bg-accent/20 blur-md" aria-hidden="true" />}
        <span className="relative">{children}</span>
      </motion.div>
    </div>
  );
}

export function IsoBillboard({ x, y, children }) {
  return (
    <div className="pointer-events-none absolute z-10" style={{ left: x, top: y, transform: BILLBOARD, transformOrigin: "50% 100%" }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: [0, -4, 0] }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ opacity: { duration: 0.35 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" } }}
        className="rounded-xl border border-black/[0.06] bg-white px-3.5 py-2 shadow-[0_24px_45px_-16px_rgba(16,16,20,0.4)]"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function IsoWire({ from, to, active = true, delay = 0, dim = false }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.round(Math.hypot(dx, dy));
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <div
      className={`absolute transition-opacity duration-500 ${dim ? "opacity-25" : "opacity-100"}`}
      style={{ left: from[0], top: from[1], width: len, transform: `rotate(${ang}deg)`, transformOrigin: "0 0" }}
      aria-hidden="true"
    >
      <div className={`h-0 w-full border-t border-dashed ${active && !dim ? "border-accent/60" : "border-black/15"}`} />
      {active && !dim && (
        <motion.span
          className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 10px 2px rgba(61,67,232,0.45)" }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay }}
        />
      )}
    </div>
  );
}

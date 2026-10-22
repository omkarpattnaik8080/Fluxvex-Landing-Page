import { motion, useReducedMotion } from "framer-motion";

/* UPI-style success animation: spring pop + tick draw + particle burst + ripples */
export function SuccessBurst({ testid }) {
  const reduce = useReducedMotion();
  const particles = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: Math.cos(a) * 54,
      y: Math.sin(a) * 54,
      c: ["#43D675", "#3D43E8", "#F5D748"][i % 3],
    };
  });

  return (
    <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center" data-testid={testid}>
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-mint"
            initial={{ scale: 0.7, opacity: 0.7 }}
            animate={{ scale: 2.05, opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.3 + i * 0.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
            aria-hidden="true"
          />
        ))}
      {!reduce &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: p.c }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            aria-hidden="true"
          />
        ))}
      <motion.span
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mint to-[#2BBE5C] shadow-[0_20px_45px_-14px_rgba(67,214,117,0.65)]"
        initial={reduce ? false : { scale: 0 }}
        animate={reduce ? {} : { scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
      >
        <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
          <motion.path
            d="M11 21l6 6 12-13"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={reduce ? {} : { pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.span>
    </div>
  );
}

export default SuccessBurst;

/* Fluxvex hairline illustration kit — one common animated line-art style for the whole site.
   Thin 1.5px strokes, dashed guides, small accent fills, draw-on-scroll, reduced-motion safe. */
import { motion, useReducedMotion } from "framer-motion";

const ACCENT = "#3D43E8";
const INK = "rgba(16,16,20,0.55)";
const INK_SOFT = "rgba(16,16,20,0.3)";

function useHairline() {
  const reduce = useReducedMotion();
  const P = ({ d, delay = 0, dur = 1.1, stroke = INK, width = 1.5 }) => (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      {...(reduce
        ? {}
        : {
            initial: { pathLength: 0, opacity: 0 },
            whileInView: { pathLength: 1, opacity: 1 },
            viewport: { once: true, amount: 0.3 },
            transition: { pathLength: { duration: dur, delay, ease: "easeInOut" }, opacity: { duration: 0.01, delay } },
          })}
    />
  );
  const C = ({ cx, cy, r, delay = 0, dur = 1, stroke = INK, width = 1.5, fill = "none", dash }) => (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={fill === "none" ? stroke : "none"}
      strokeWidth={fill === "none" ? width : 0}
      strokeDasharray={dash}
      {...(reduce
        ? {}
        : {
            initial: { pathLength: 0, opacity: 0 },
            whileInView: { pathLength: 1, opacity: 1 },
            viewport: { once: true, amount: 0.3 },
            transition: { pathLength: { duration: dur, delay, ease: "easeInOut" }, opacity: { duration: 0.01, delay } },
          })}
    />
  );
  return { P, C, reduce };
}

const Frame = ({ children, label }) => (
  <div className="h-full w-full" role="img" aria-label={label}>
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {children}
    </svg>
  </div>
);

/* Hub — a connected center with spokes and an orbiting packet */
export function HubIllustration() {
  const { P, C, reduce } = useHairline();
  const spokes = [0, 72, 144, 216, 288];
  return (
    <Frame label="Connected hub illustration">
      <C cx={60} cy={60} r={52} stroke={INK_SOFT} width={1.2} dash="3 6" />
      {spokes.map((a, i) => {
        const rad = ((a - 90) * Math.PI) / 180;
        const x = 60 + 52 * Math.cos(rad);
        const y = 60 + 52 * Math.sin(rad);
        return (
          <g key={a}>
            <P d={`M60 60 L${x} ${y}`} delay={0.2 + i * 0.1} dur={0.5} />
            <C cx={x} cy={y} r={6} delay={0.3 + i * 0.1} dur={0.5} stroke={i === 0 ? ACCENT : INK} />
          </g>
        );
      })}
      <C cx={60} cy={60} r={13} delay={0.1} dur={0.7} stroke={ACCENT} />
      <circle cx={60} cy={60} r={3.5} fill={ACCENT} />
      {!reduce && (
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "60px 60px" }}>
          <circle cx={112} cy={60} r={2.6} fill={ACCENT} />
        </motion.g>
      )}
    </Frame>
  );
}

/* Cabinet — structured report drawers, the top one sliding open */
export function CabinetIllustration() {
  const { P, C, reduce } = useHairline();
  return (
    <Frame label="Report cabinet illustration">
      <P d="M24 14 H96 Q100 14 100 18 V102 Q100 106 96 106 H24 Q20 106 20 102 V18 Q20 14 24 14 Z" delay={0} dur={0.9} />
      {[30, 54, 78].map((y, i) => (
        <g key={y}>
          <motion.g
            animate={reduce ? {} : { x: i === 0 ? [0, 4, 0] : 0 }}
            transition={i === 0 ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" } : {}}
          >
            <P d={`M27 ${y} H93 V${y + 18} H27 Z`} delay={0.3 + i * 0.15} dur={0.6} stroke={i === 0 ? ACCENT : INK} />
            <P d={`M52 ${y + 9} H68`} delay={0.45 + i * 0.15} dur={0.3} />
          </motion.g>
        </g>
      ))}
      <C cx={60} cy={112} r={0.1} stroke="none" />
    </Frame>
  );
}

/* Riffle — report cards fanning out */
export function RiffleIllustration() {
  const { P, reduce } = useHairline();
  const cards = [
    { rot: -9, stroke: INK },
    { rot: 0, stroke: INK },
    { rot: 9, stroke: ACCENT },
  ];
  return (
    <Frame label="Report cards illustration">
      {cards.map((c, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: "60px 104px" }}
          animate={reduce ? { rotate: c.rot } : { rotate: [c.rot, c.rot + (i === 1 ? 2 : -2), c.rot] }}
          transition={reduce ? {} : { duration: 3.4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <P d={`M${34 + i * 0} 40 h52 a6 6 0 0 1 6 6 v52 a6 6 0 0 1 -6 6 h-52 a6 6 0 0 1 -6 -6 v-52 a6 6 0 0 1 6 -6 Z`} delay={0.15 * i} dur={0.7} stroke={c.stroke} />
          {i === 2 && (
            <>
              <P d="M40 56 H80" delay={0.6} dur={0.3} stroke={ACCENT} />
              <P d="M40 66 H72" delay={0.7} dur={0.3} stroke={INK_SOFT} />
              <P d="M40 76 H78" delay={0.8} dur={0.3} stroke={INK_SOFT} />
            </>
          )}
        </motion.g>
      ))}
    </Frame>
  );
}

/* Slow — a cycle clock with a sweeping hand */
export function SlowIllustration() {
  const { P, C, reduce } = useHairline();
  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <Frame label="Reporting cycle clock illustration">
      <C cx={60} cy={60} r={48} delay={0} dur={0.9} />
      {ticks.map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <P
            key={a}
            d={`M${60 + 42 * Math.cos(rad)} ${60 + 42 * Math.sin(rad)} L${60 + 48 * Math.cos(rad)} ${60 + 48 * Math.sin(rad)}`}
            delay={0.3}
            dur={0.3}
            stroke={INK_SOFT}
            width={1.2}
          />
        );
      })}
      <P d="M60 60 V36" delay={0.5} dur={0.4} width={2} />
      <P d="M60 60 L76 68" delay={0.6} dur={0.4} width={2} />
      <circle cx={60} cy={60} r={3} fill={ACCENT} />
      {!reduce && (
        <motion.line
          x1={60}
          y1={60}
          x2={60}
          y2={22}
          stroke={ACCENT}
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{ transformOrigin: "60px 60px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </Frame>
  );
}

/* Padlock — secured access with a slow scanning arc */
export function PadlockIllustration() {
  const { P, C, reduce } = useHairline();
  return (
    <Frame label="Secured padlock illustration">
      <C cx={60} cy={60} r={52} stroke={INK_SOFT} width={1.2} dash="2 6" />
      <P d="M44 56 V42 a16 16 0 0 1 32 0 V56" delay={0.1} dur={0.7} stroke={ACCENT} />
      <P d="M36 56 H84 Q88 56 88 60 V94 Q88 98 84 98 H36 Q32 98 32 94 V60 Q32 56 36 56 Z" delay={0.3} dur={0.8} />
      <C cx={60} cy={72} r={5} delay={0.6} dur={0.4} stroke={ACCENT} />
      <P d="M60 77 V86" delay={0.7} dur={0.3} stroke={ACCENT} />
      {!reduce && (
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "60px 60px" }}>
          <path d="M60 8 A52 52 0 0 1 104 34" fill="none" stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
        </motion.g>
      )}
    </Frame>
  );
}

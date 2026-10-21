import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

function RowDoc() {
  return (
    <svg viewBox="0 0 128 80" className="h-20 w-32" role="img" aria-label="Aligned report structure">
      <rect x="24" y="6" width="80" height="66" rx="8" fill="#fff" stroke="#E7E5DE" />
      <path d="M34 22h40M34 33h58M34 44h50M34 55h32" stroke="#D5D8FF" strokeWidth="4" strokeLinecap="round" />
      <motion.circle
        cx="104" cy="13" r="9" fill="#43D675"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.35 }}
      />
      <motion.path
        d="M99.8 13l3.2 3.2 5.6-6.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.55 }}
      />
    </svg>
  );
}

function RowBrand() {
  return (
    <svg viewBox="0 0 128 80" className="h-20 w-32" role="img" aria-label="Report wearing the agency brand">
      <rect x="18" y="10" width="92" height="62" rx="8" fill="#fff" stroke="#E7E5DE" />
      <rect x="28" y="21" width="19" height="19" rx="5" fill="#3D43E8" />
      <path d="M33 26.5l4 4.7-4 4.7M42 26.5l-4 4.7 4 4.7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
      <path d="M53 25h36M53 34h26" stroke="#D5D8FF" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M28 54h62" stroke="#EDEFFD" strokeWidth="6" strokeLinecap="round" />
      <path d="M28 54h40" stroke="#3D43E8" strokeWidth="6" strokeLinecap="round" className="animate-dash-flow" strokeDasharray="36 14" />
    </svg>
  );
}

function RowStrategy() {
  return (
    <svg viewBox="0 0 128 80" className="h-20 w-32" role="img" aria-label="Capacity shifting to strategy and analysis">
      <rect x="14" y="14" width="58" height="38" rx="10" fill="#3D43E8" />
      <path d="M24 40c5.5-11 11-11 16.5 0s11 11 16.5 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 58l-5.5 8 13.5-5.5" fill="#3D43E8" />
      <motion.path
        d="M86 58 C 94 52, 96 40, 94 30 S 102 16, 114 13"
        fill="none" stroke="#43D675" strokeWidth="3.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
      />
      <circle cx="114" cy="13" r="4.5" fill="#43D675" />
    </svg>
  );
}

const ROWS = [
  {
    num: "01",
    title: "A consistent reporting standard",
    desc: "Every account and reporting period follows the same clear structure.",
    visual: <RowDoc />,
  },
  {
    num: "02",
    title: "A client-ready presentation",
    desc: "Reports reflect the agency’s brand, not a disconnected tool.",
    visual: <RowBrand />,
  },
  {
    num: "03",
    title: "More room for analysis and client strategy",
    desc: "Instead of repeated report preparation, capacity shifts to the work that earns the retainer.",
    visual: <RowStrategy />,
  },
];

export default function Consistency() {
  return (
    <SectionShell id="operations">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Made for agency operations</p>
          </Reveal>
          <CinematicText
            as="h2"
            className="mt-4 font-display text-3xl font-semibold leading-[1.04] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
          >
            Every client gets a clearer story, not just another spreadsheet.
          </CinematicText>
          <Reveal y={14} delay={0.15}>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-ink-soft">
              The same standard applies to every client, every month—so quality stops depending on who built the deck.
            </p>
          </Reveal>
        </div>
        <div className="space-y-4">
          {ROWS.map((row, i) => (
            <Reveal key={row.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group flex items-center gap-6 rounded-xl border border-line bg-page p-6 shadow-[0_18px_40px_-26px_rgba(16,16,20,0.3)] transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/30 hover:shadow-[0_32px_64px_-28px_rgba(61,67,232,0.4)] sm:gap-8 sm:p-7"
                data-testid={`operations-row-${row.num}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint font-display text-sm font-bold text-accent">
                  {row.num}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-ink sm:text-2xl">{row.title}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-soft">{row.desc}</p>
                </div>
                <motion.div
                  className="hidden shrink-0 md:block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
                >
                  {row.visual}
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

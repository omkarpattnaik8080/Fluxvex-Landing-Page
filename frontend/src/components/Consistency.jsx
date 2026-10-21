import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

function RowDoc() {
  return (
    <svg viewBox="0 0 96 60" className="h-14 w-24" role="img" aria-label="Aligned report structure">
      <rect x="18" y="4" width="60" height="50" rx="6" fill="#fff" stroke="#E7E5DE" />
      <path d="M26 16h30M26 25h44M26 34h38M26 43h24" stroke="#D5D8FF" strokeWidth="3.4" strokeLinecap="round" />
      <motion.circle
        cx="78" cy="10" r="7" fill="#43D675"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.35 }}
      />
      <motion.path
        d="M74.8 10l2.4 2.4 4.2-4.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.55 }}
      />
    </svg>
  );
}

function RowBrand() {
  return (
    <svg viewBox="0 0 96 60" className="h-14 w-24" role="img" aria-label="Report wearing the agency brand">
      <rect x="14" y="8" width="68" height="46" rx="6" fill="#fff" stroke="#E7E5DE" />
      <rect x="22" y="16" width="14" height="14" rx="4" fill="#3D43E8" />
      <path d="M26 20.5l3 3.5-3 3.5M36 20.5l-3 3.5 3 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
      <path d="M42 19h26M42 26h18" stroke="#D5D8FF" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M22 40h46" stroke="#EDEFFD" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 40h30" stroke="#3D43E8" strokeWidth="5" strokeLinecap="round" className="animate-dash-flow" strokeDasharray="30 12" />
    </svg>
  );
}

function RowStrategy() {
  return (
    <svg viewBox="0 0 96 60" className="h-14 w-24" role="img" aria-label="Capacity shifting to strategy and analysis">
      <rect x="12" y="10" width="44" height="30" rx="8" fill="#3D43E8" />
      <path d="M20 30c4-8 8-8 12 0s8 8 12 0" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 44l-4 6 10-4" fill="#3D43E8" />
      <motion.path
        d="M66 44 C 72 40, 74 30, 72 22 S 78 12, 86 10"
        fill="none" stroke="#43D675" strokeWidth="2.6" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
      />
      <circle cx="86" cy="10" r="3.5" fill="#43D675" />
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
        </div>
        <div>
          {ROWS.map((row, i) => (
            <Reveal key={row.num} delay={i * 0.08}>
              <div className="flex items-center gap-6 border-t border-line py-8 last:border-b sm:gap-10" data-testid={`operations-row-${row.num}`}>
                <span className="hidden font-display text-sm font-semibold text-accent sm:block">{row.num}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-ink sm:text-2xl">{row.title}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-soft">{row.desc}</p>
                </div>
                <div className="hidden shrink-0 md:block">{row.visual}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

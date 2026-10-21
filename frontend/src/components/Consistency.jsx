import { motion } from "framer-motion";
import { CabinetIllustration, RiffleIllustration, SlowIllustration } from "@/components/hairline/Illustrations";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

const ROWS = [
  {
    num: "01",
    title: "A consistent reporting standard",
    desc: "Every account and reporting period follows the same clear structure.",
    visual: <CabinetIllustration />,
  },
  {
    num: "02",
    title: "A client-ready presentation",
    desc: "Reports reflect the agency’s brand, not a disconnected tool.",
    visual: <RiffleIllustration />,
  },
  {
    num: "03",
    title: "More room for analysis and client strategy",
    desc: "Instead of repeated report preparation, capacity shifts to the work that earns the retainer.",
    visual: <SlowIllustration />,
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
                  className="hidden h-24 w-24 shrink-0 md:block"
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

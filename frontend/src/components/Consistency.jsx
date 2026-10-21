import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

const ROWS = [
  {
    num: "01",
    title: "A consistent reporting standard",
    desc: "Every account and reporting period follows the same clear structure.",
  },
  {
    num: "02",
    title: "A client-ready presentation",
    desc: "Reports reflect the agency’s brand, not a disconnected tool.",
  },
  {
    num: "03",
    title: "More room for analysis and client strategy",
    desc: "Instead of repeated report preparation, capacity shifts to the work that earns the retainer.",
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
              <div className="flex gap-6 border-t border-line py-8 last:border-b sm:gap-10" data-testid={`operations-row-${row.num}`}>
                <span className="font-display text-sm font-semibold text-accent">{row.num}</span>
                <div>
                  <h3 className="text-xl font-semibold text-ink sm:text-2xl">{row.title}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-soft">{row.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

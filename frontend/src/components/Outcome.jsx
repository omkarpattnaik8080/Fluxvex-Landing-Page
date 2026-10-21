import { Database, LayoutTemplate, Palette, CalendarClock } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const CARDS = [
  {
    icon: Database,
    num: "01",
    title: "Pull the numbers together",
    desc: "Connect supported channels instead of collecting each metric manually.",
  },
  {
    icon: LayoutTemplate,
    num: "02",
    title: "Keep reports consistent",
    desc: "Use a repeatable reporting structure across clients.",
  },
  {
    icon: Palette,
    num: "03",
    title: "Make it yours",
    desc: "Apply agency branding and a client-facing presentation style.",
  },
  {
    icon: CalendarClock,
    num: "04",
    title: "Stay on schedule",
    desc: "Prepare reports around a defined reporting cadence when scheduling is available.",
  },
];

export default function Outcome() {
  return (
    <SectionShell id="outcome">
      <SectionHeader
        overline="The Fluxvex workflow"
        title="From scattered metrics to a client-ready report."
        copy="Fluxvex is designed to bring data collection, consistent reporting, agency branding, and report delivery into one repeatable workflow."
      />
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card, i) => (
          <Reveal key={card.num} delay={i * 0.08} className="bg-surface">
            <div className="group relative h-full p-7 transition-colors hover:bg-elevated" data-testid={`outcome-card-${card.num}`}>
              <span className="font-display text-sm font-semibold tracking-wide text-accent/70">{card.num}</span>
              <card.icon className="mt-6 h-6 w-6 text-accent" strokeWidth={1.7} />
              <h3 className="mt-4 text-[17px] font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{card.desc}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

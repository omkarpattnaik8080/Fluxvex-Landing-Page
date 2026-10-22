import { lazy, Suspense } from "react";
import { Database, LayoutTemplate, Palette, CalendarClock } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const Scene3D = lazy(() => import("@/components/three/Scene3D"));

function DiagramConverge() {
  return (
    <svg viewBox="0 0 220 64" className="w-full" role="img" aria-label="Three sources converging into one report">
      {[[16, 10], [16, 32], [16, 54]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x + 6} cy={y} r="5.5" fill="#EEF0FF" stroke="#3D43E8" strokeWidth="1.6" />
          <path d={`M28 ${y} C 62 ${y}, 78 32, 100 32`} fill="none" stroke="#3D43E8" strokeWidth="1.5" strokeDasharray="4 5" className="animate-dash-flow" style={{ animationDelay: `${i * 0.25}s` }} />
        </g>
      ))}
      <rect x="104" y="16" width="52" height="32" rx="9" fill="#3D43E8" />
      <path d="M114 24l6 8-6 8M126 24l-6 8 6 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
      <path d="M160 32h24" stroke="#3D43E8" strokeWidth="1.5" strokeDasharray="4 5" className="animate-dash-flow" />
      <path d="M180 27l6 5-6 5" fill="none" stroke="#3D43E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="188" y="12" width="30" height="40" rx="4" fill="#fff" stroke="#E7E5DE" />
      <path d="M193 22h20M193 30h20M193 38h13M193 46h16" stroke="#C9CCFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function DiagramConsistent() {
  return (
    <svg viewBox="0 0 220 64" className="w-full" role="img" aria-label="Three report structures aligned with one check">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={14 + i * 64} y="12" width="52" height="40" rx="5" fill="#fff" stroke="#E7E5DE" />
          <path d={`M${22 + i * 64} 24h${28}M${22 + i * 64} 32h${36}M${22 + i * 64} 40h${20}`} stroke="#D5D8FF" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="110" cy="10" r="8" fill="#43D675" />
      <path d="M106.5 10l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiagramBrand() {
  return (
    <svg viewBox="0 0 220 64" className="w-full" role="img" aria-label="A report wearing the agency brand">
      <rect x="30" y="10" width="160" height="44" rx="8" fill="#fff" stroke="#E7E5DE" />
      <rect x="40" y="20" width="20" height="20" rx="6" fill="#3D43E8" />
      <path d="M45 26l4 5-4 5M55 26l-4 5 4 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
      <path d="M68 24h52M68 32h38M68 40h46" stroke="#D5D8FF" strokeWidth="3" strokeLinecap="round" />
      <rect x="128" y="20" width="52" height="24" rx="5" fill="#EEF0FF" />
      <path d="M134 38l10-9 8 5 12-10" fill="none" stroke="#3D43E8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 58h160" stroke="#E7E5DE" strokeWidth="1.5" strokeDasharray="3 4" />
    </svg>
  );
}

function DiagramSchedule() {
  return (
    <svg viewBox="0 0 220 64" className="w-full" role="img" aria-label="A reporting calendar with the next date marked">
      <rect x="52" y="8" width="116" height="48" rx="8" fill="#fff" stroke="#E7E5DE" />
      {Array.from({ length: 21 }).map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        return i === 11 ? (
          <rect key={i} x={62 + col * 15} y={18 + row * 13} width="10" height="9" rx="2.5" fill="#3D43E8" />
        ) : (
          <circle key={i} cx={67 + col * 15} cy={22.5 + row * 13} r="1.8" fill="#D9DCE5" />
        );
      })}
      <path d="M129.5 39.5l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Scene({ scene, legacy, testid }) {
  return (
    <div className="h-full" data-testid={testid}>
      <Suspense fallback={legacy}>
        <Scene3D scene={scene} fallback={legacy} className="h-full w-full" />
      </Suspense>
    </div>
  );
}

const CARDS = [
  {
    icon: Database,
    num: "01",
    title: "Pull the numbers together",
    desc: "Connect supported channels instead of collecting each metric manually.",
    scene: "outcomePull",
    diagram: <DiagramConverge />,
  },
  {
    icon: LayoutTemplate,
    num: "02",
    title: "Keep reports consistent",
    desc: "Use a repeatable reporting structure across clients.",
    scene: "outcomeConsistent",
    diagram: <DiagramConsistent />,
  },
  {
    icon: Palette,
    num: "03",
    title: "Make it yours",
    desc: "Apply agency branding and a client-facing presentation style.",
    scene: "outcomeBrand",
    diagram: <DiagramBrand />,
  },
  {
    icon: CalendarClock,
    num: "04",
    title: "Stay on schedule",
    desc: "Prepare reports around a defined reporting cadence when scheduling is available.",
    scene: "outcomeSchedule",
    diagram: <DiagramSchedule />,
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
          <Reveal key={card.num} delay={i * 0.08} className="bg-page">
            <div className="group relative flex h-full flex-col transition-colors hover:bg-accent-tint/40" data-testid={`outcome-card-${card.num}`}>
              <div className="p-7 pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-wide text-accent/80">{card.num}</span>
                  <card.icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.desc}</p>
              </div>
              <div className="relative mt-5 min-h-[180px] flex-1 overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#FBFAF6_0%,#F1EFE8_100%)]">
                <Scene scene={card.scene} legacy={card.diagram} testid={`outcome-scene-${card.num}`} />
              </div>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

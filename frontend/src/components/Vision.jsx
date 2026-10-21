import { Plug, Sparkles, CalendarClock, ArrowRight } from "lucide-react";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { useWaitlist } from "@/components/WaitlistContext";

const PILLARS = [
  {
    icon: Plug,
    title: "Connected by default",
    desc: "Every channel an agency runs—ads, analytics, and beyond—flows into one governed pipeline instead of a folder of logins.",
  },
  {
    icon: Sparkles,
    title: "AI that drafts, humans approve",
    desc: "Fluxvex AI drafts summaries, flags anomalies, and suggests next steps. Your strategists review, refine, and own the story.",
  },
  {
    icon: CalendarClock,
    title: "Delivery on autopilot",
    desc: "Branded reports land with every client on schedule, every cycle—whether it is five clients or five hundred.",
  },
];

function VisionScene() {
  return (
    <IsoPlane w={330} h={246} scale="scale-[0.68] sm:scale-90 lg:scale-100" className="mx-auto h-full">
      <IsoTile x={16} y={18} w={54} h={54}>
        <GoogleAdsMark size={22} />
      </IsoTile>
      <IsoTile x={16} y={98} w={54} h={54}>
        <MetaMark size={22} />
      </IsoTile>
      <IsoTile x={16} y={178} w={54} h={54}>
        <GA4Mark size={22} />
      </IsoTile>
      <IsoWire from={[70, 45]} to={[150, 115]} delay={0} />
      <IsoWire from={[70, 125]} to={[150, 123]} delay={0.35} />
      <IsoWire from={[70, 205]} to={[150, 131]} delay={0.7} />
      <IsoTile x={150} y={97} w={68} h={68} active>
        <FluxvexMark size={30} />
      </IsoTile>
      <IsoWire from={[218, 131]} to={[262, 131]} delay={1} />
      <IsoTile x={262} y={107} w={52} h={52} float={false}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#3D43E8" strokeWidth="1.6" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="#3D43E8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </IsoTile>
      <IsoBillboard x={88} y={226}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">One connected pipeline</span>
      </IsoBillboard>
      <IsoBillboard x={158} y={58}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-[#0E8A3E]">Fluxvex AI · drafting</span>
      </IsoBillboard>
      <IsoBillboard x={226} y={188}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">On schedule</span>
      </IsoBillboard>
    </IsoPlane>
  );
}

export default function Vision() {
  const { openWaitlist } = useWaitlist();
  return (
    <SectionShell id="vision">
      <SectionHeader
        overline="Our vision"
        title="Every agency, reporting like the best in the business."
        copy="Fluxvex started with one belief: reporting should be the easiest part of the retainer—the moment your work looks its best, not the night it gets built."
      />
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div data-testid="vision-scene">
            <VisionScene />
          </div>
        </Reveal>
        <div className="space-y-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                className="group flex items-start gap-4 rounded-xl border border-line bg-page p-6 transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/30 hover:shadow-[0_32px_64px_-28px_rgba(61,67,232,0.35)]"
                data-testid={`vision-pillar-${i + 1}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <p.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-line bg-page p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
            We are building toward a launch where an agency connects its accounts once—and never rebuilds a
            client report by hand again.
          </p>
          <button
            onClick={() => openWaitlist("vision")}
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            data-testid="vision-cta-button"
          >
            Be part of the vision
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </Reveal>
    </SectionShell>
  );
}

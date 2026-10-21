import { Plug, Sparkles, CalendarClock, ArrowRight, FileText, PenLine, Receipt, Zap } from "lucide-react";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import ComplianceBadges from "@/components/ComplianceBadges";
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

/* The agency OS roadmap — reporting today, proposals and invoicing as future plans */
const STAGES = [
  {
    icon: FileText,
    chip: "Building now",
    chipStyle: "border-mint/40 bg-mint/10 text-[#0E8A3E]",
    title: "Client reporting",
    desc: "The launch focus. Automated, branded client reports from Google Ads, Meta Ads, and GA4—AI-drafted summaries, approved by your team, delivered on schedule.",
    testid: "vision-roadmap-reporting",
  },
  {
    icon: PenLine,
    chip: "Future plan",
    chipStyle: "border-accent/30 bg-accent-tint/60 text-accent",
    title: "Proposal making",
    desc: "AI-assisted proposals drafted from a prospect's real performance data—scope, deliverables, and pricing suggestions your team refines and sends.",
    testid: "vision-roadmap-proposals",
  },
  {
    icon: Receipt,
    chip: "Future plan",
    chipStyle: "border-accent/30 bg-accent-tint/60 text-accent",
    title: "Invoicing",
    desc: "Invoices generated from delivered work—retainers, reporting cycles, and ad spend—closing the loop from proposal to payment in one system.",
    testid: "vision-roadmap-invoicing",
  },
];

/* State-of-the-art AI capabilities — some at launch, some on the roadmap */
const AI_CAPABILITIES = [
  { text: "Drafts client-ready summaries and flags anomalies", plan: false },
  { text: "Answers questions about any reporting period in plain language", plan: false },
  { text: "Drafts proposals scoped from real client performance", plan: true },
  { text: "Turns delivered work into ready-to-send invoices", plan: true },
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
        title="Not just reporting. The operating system for agencies."
        copy="Fluxvex starts with the work agencies feel every month—client reporting. The plan is to expand into the full agency loop, from proposal making to invoicing, with state-of-the-art AI at the core of every step."
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

      {/* agency OS roadmap: reporting → proposals → invoicing */}
      <div className="mt-16" data-testid="vision-roadmap">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              One system for the whole agency loop
            </h3>
            <p className="max-w-2xl text-[15px] leading-[1.7] text-ink-soft">
              Reporting is where Fluxvex begins. From there, the same connected pipeline and AI core extend to the
              work on either side of it—winning the engagement and getting paid for it.
            </p>
          </div>
        </Reveal>
        <div className="relative mt-10 grid gap-5 lg:grid-cols-3 lg:gap-8">
          {STAGES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="h-full">
              <div className="relative h-full">
                <div
                  className="flex h-full flex-col rounded-2xl border border-line bg-page p-7 shadow-[0_24px_50px_-32px_rgba(16,16,20,0.35)]"
                  data-testid={s.testid}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-accent">
                      <s.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${s.chipStyle}`}>
                      {s.chip}
                    </span>
                  </div>
                  <h4 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
                    <span className="mr-2 text-sm font-bold text-black/30">0{i + 1}</span>
                    {s.title}
                  </h4>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
                {i < STAGES.length - 1 && (
                  <span
                    className="absolute -right-[26px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-page text-accent shadow-[0_10px_20px_-8px_rgba(16,16,20,0.3)] lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-xs text-black/45">
            Client reporting ships at launch; proposals and invoicing are future plans on the same AI core—built
            with waitlist feedback shaping the order.
          </p>
        </Reveal>
      </div>

      {/* state-of-the-art AI capabilities */}
      <Reveal>
        <div
          className="fine-grid relative mt-14 overflow-hidden rounded-2xl border border-accent-border bg-accent-tint p-8 sm:p-10"
          data-testid="vision-ai-block"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-[0_16px_30px_-10px_rgba(61,67,232,0.6)]">
                <Zap className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                State-of-the-art AI at the core
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                One AI engine learns your accounts and your voice—drafting the work, flagging what matters, and
                leaving every final call to your team.
              </p>
            </div>
            <ul className="grid flex-1 gap-3 sm:grid-cols-2">
              {AI_CAPABILITIES.map((c) => (
                <li
                  key={c.text}
                  className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-page/80 p-4 text-[13.5px] font-medium leading-snug text-ink"
                  data-testid={`vision-ai-capability${c.plan ? "-future" : ""}`}
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {c.text}
                    {c.plan && (
                      <span className="ml-2 inline-block rounded-full border border-accent/30 bg-accent-tint/70 px-2 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.12em] text-accent">
                        Future plan
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* compliance built in */}
      <Reveal>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-line bg-page p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Compliance built in from day one
          </p>
          <ComplianceBadges />
          <p className="max-w-xl text-xs leading-relaxed text-black/45">
            As the operating system expands into proposals and invoicing, the same privacy-first architecture—GDPR,
            HIPAA, DPDP, and CCPA aligned—carries across every module.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-line bg-page p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
            We are building toward a launch where an agency connects its accounts once—and never rebuilds a
            client report by hand again. The proposal and invoicing modules follow on the same foundation.
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

import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plug, Sparkles, CalendarClock, ArrowRight, FileText, PenLine, Receipt, Zap } from "lucide-react";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import ComplianceBadges from "@/components/ComplianceBadges";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { useWaitlist } from "@/components/WaitlistContext";

const Scene3D = lazy(() => import("@/components/three/Scene3D"));

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
    highlight: true,
    title: "Client reporting",
    desc: "The launch focus. Automated, branded client reports from Google Ads, Meta Ads, and GA4—AI-drafted summaries, approved by your team, delivered on schedule.",
    testid: "vision-roadmap-reporting",
  },
  {
    icon: PenLine,
    chip: "Future plan",
    title: "Proposal making",
    desc: "AI-assisted proposals drafted from a prospect's real performance data—scope, deliverables, and pricing suggestions your team refines and sends.",
    testid: "vision-roadmap-proposals",
  },
  {
    icon: Receipt,
    chip: "Future plan",
    title: "Invoicing",
    desc: "Invoices generated from delivered work—retainers, reporting cycles, and ad spend—closing the loop from proposal to payment in one system.",
    testid: "vision-roadmap-invoicing",
  },
  {
    icon: Sparkles,
    chip: "Future plan",
    title: "AI account manager",
    desc: "An AI account manager that runs day-to-day client communication—status updates, answers, and reporting calls—replacing a role most agencies pay lakhs for every year.",
    testid: "vision-roadmap-ai-account-manager",
  },
];

/* State-of-the-art AI capabilities — some at launch, some on the roadmap */
const AI_CAPABILITIES = [
  { text: "Drafts client-ready summaries and flags anomalies", plan: false },
  { text: "Answers questions about any reporting period in plain language", plan: false },
  { text: "Drafts proposals scoped from real client performance", plan: true },
  { text: "Turns delivered work into ready-to-send invoices", plan: true },
  { text: "An AI account manager that runs day-to-day client communication—saving what a full-time manager costs", plan: true },
];

function VisionSceneLegacy() {
  return (
    <IsoPlane w={330} h={246} scale="scale-[0.78] sm:scale-100 lg:scale-[1.18]" className="mx-auto h-full">
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
  const reduce = useReducedMotion();
  return (
    <SectionShell id="vision">
      <SectionHeader
        overline="Our vision"
        title="Not just reporting. The operating system for agencies."
        copy="Fluxvex starts with the work agencies feel every month—client reporting. The plan is to expand into the full agency loop, from proposal making to invoicing—all the way to an AI account manager—with state-of-the-art AI at the core of every step."
      />
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="overflow-x-clip" data-testid="vision-scene">
            <Suspense fallback={<VisionSceneLegacy />}>
              <Scene3D
                scene="vision"
                testid="vision-scene-3d"
                fallback={<VisionSceneLegacy />}
                className="mx-auto h-[400px] w-full sm:h-[440px] lg:h-[470px]"
              />
            </Suspense>
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

      {/* agency OS roadmap — dark launch sequence */}
      <div className="mt-16" data-testid="vision-roadmap">
        <div className="relative overflow-hidden rounded-[24px] bg-[#0B0B14] px-6 py-12 sm:px-10 sm:py-14">
          {/* ambience */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(93,99,255,0.35),transparent_70%)] blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.28),transparent_70%)] blur-3xl" aria-hidden="true" />
          <div className="fine-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative">
            <Reveal>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" aria-hidden="true" />
                  The agency loop
                </span>
                <h3 className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tighter2 text-white sm:text-4xl">
                  One system for the whole agency loop
                </h3>
                <p className="max-w-2xl text-[15px] leading-[1.7] text-white/55">
                  Reporting is where Fluxvex begins. From there, the same connected pipeline and AI core extend to the
                  work on either side of it—winning the engagement and getting paid for it.
                </p>
              </div>
            </Reveal>

            <div className="relative mt-12">
              {/* glowing connector — passes behind the icon tiles like circuit nodes */}
              <div className="pointer-events-none absolute inset-x-10 top-[49px] hidden h-px lg:block" aria-hidden="true">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5D63FF]/60 to-transparent" />
                {!reduce && (
                  <motion.span
                    className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-[#A3A8FF] shadow-[0_0_12px_3px_rgba(93,99,255,0.65)]"
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {STAGES.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.1} className="h-full">
                    <motion.div whileHover={reduce ? undefined : { y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                      <div
                        className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-[#5D63FF]/50 hover:bg-white/[0.07]"
                        data-testid={s.testid}
                      >
                        <span
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(93,99,255,0.16),transparent_75%)]"
                          aria-hidden="true"
                        />
                        <div className="relative flex items-center justify-between gap-3">
                          <span className={`relative flex h-11 w-11 items-center justify-center rounded-xl border text-white ${s.highlight ? "border-mint/40 bg-mint/10" : "border-white/15 bg-white/[0.06]"}`}>
                            <s.icon className="h-5 w-5" strokeWidth={1.8} />
                            {s.highlight && !reduce && (
                              <motion.span
                                className="absolute inset-0 rounded-xl border border-mint/50"
                                animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          <span
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                              s.highlight ? "border-mint/40 bg-mint/10 text-[#4ADE80]" : "border-white/15 bg-white/[0.06] text-white/60"
                            }`}
                          >
                            {s.highlight && <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse-dot" aria-hidden="true" />}
                            {s.chip}
                          </span>
                        </div>
                        <h4 className="relative mt-6 font-display text-xl font-semibold tracking-tight text-white">
                          <span className="mr-2 text-sm font-bold text-white/30">{`0${i + 1}`}</span>
                          {s.title}
                        </h4>
                        <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-white/55">{s.desc}</p>
                        <div className="relative mt-auto pt-6">
                          <span className={`block h-0.5 w-10 rounded-full ${s.highlight ? "bg-mint" : "bg-[#5D63FF]"}`} />
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 text-center text-xs leading-relaxed text-white/40">
                Client reporting ships at launch; proposals and invoicing are future plans on the same AI core—built
                with waitlist feedback shaping the order.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* state-of-the-art AI capabilities */}
      <Reveal>
        <div
          className="fine-grid relative mt-14 overflow-hidden rounded-2xl border border-accent-border bg-accent-tint p-8 sm:p-10"
          data-testid="vision-ai-block"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-sm">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-[0_16px_30px_-10px_rgba(61,67,232,0.6)]">
                <Zap className="h-5 w-5" />
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border-2 border-accent/50"
                    animate={{ scale: [1, 1.3], opacity: [0.9, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                )}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                State-of-the-art AI at the core
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                One AI engine learns your accounts and your voice—drafting the work, flagging what matters, and
                leaving every final call to your team.
              </p>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid flex-1 gap-3 sm:grid-cols-2"
            >
              {AI_CAPABILITIES.map((c) => (
                <motion.li
                  key={c.text}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
                  }}
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
                </motion.li>
              ))}
            </motion.ul>
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
          <TapCTA
            onClick={() => openWaitlist("vision")}
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            testid="vision-cta-button"
          >
            Be part of the vision
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </TapCTA>
        </div>
      </Reveal>
    </SectionShell>
  );
}

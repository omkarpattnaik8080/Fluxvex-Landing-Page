import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, HelpCircle, LayoutTemplate, MessageSquare, Minus, Plug, RefreshCw, Repeat, Send, SlidersHorizontal, Sparkles, Users } from "lucide-react";
import { IsoTile, IsoWire, IsoBillboard, PLANE } from "@/components/iso/IsoKit";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

const Scene3D = lazy(() => import("@/components/three/Scene3D"));

const ROWS = [
  { icon: Plug, need: "Connect to the agency's live accounts", ai: "Depends on available connectors, permissions, and setup", fx: "Designed around supported advertising and analytics integrations" },
  { icon: SlidersHorizontal, need: "Use consistent metric definitions", ai: "Requires explicit definitions and checking", fx: "Can centralize definitions in the product workflow, if implemented" },
  { icon: Repeat, need: "Repeat the same report each cycle", ai: "Usually requires additional instructions or automation", fx: "Designed for a repeatable reporting process" },
  { icon: LayoutTemplate, need: "Preserve a consistent agency report format", ai: "Requires templates and manual checks or extra tooling", fx: "White-label report workflow, where supported" },
  { icon: Users, need: "Keep client data and access separated", ai: "Depends on the tools, configuration, and permissions used", fx: "Must be enforced by Fluxvex's actual access-control design" },
  { icon: Send, need: "Review, correct, and deliver a report", ai: "Depends on the process wrapped around the AI tool", fx: "Report review and delivery process can be built into the workflow" },
];

/* A drawn-circle check — the "verified" micro-badge for the Fluxvex verdict */
function DrawnCheck({ color = "#8A8FFF" }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 22 22" className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <motion.circle
        cx="11"
        cy="11"
        r="9.5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? {} : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      <motion.path
        d="M6.6 11.3 L9.7 14.2 15.4 8.2"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? {} : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
      />
    </svg>
  );
}

/* Prompt scene — a question answered, then a manual loop that never ends */
function PromptVisual() {
  return (
    <div
      className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
      data-testid="comparison-prompt-visual"
    >
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-2">
        <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
          A prompt, by itself
        </span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-white/40">
          <Repeat className="h-3 w-3" /> manual loop
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <Suspense fallback={<PromptSceneLegacy />}>
          <Scene3D scene="prompt" fallback={<PromptSceneLegacy />} className="absolute inset-0" />
        </Suspense>
      </div>

      <p className="relative max-w-[300px] text-center text-[12px] leading-relaxed text-white/50">
        Answers the question—then waits for the next instruction, every cycle.
      </p>
    </div>
  );
}

function PromptSceneLegacy() {
  return (
    <div className="scale-[0.85] sm:scale-100">
      <div className="relative h-[230px] w-[230px]" style={{ transform: PLANE, transformStyle: "preserve-3d" }}>
            {/* dashed loop on the plane with an orbiting packet */}
            <div className="absolute left-[45px] top-[45px] h-[140px] w-[140px] rounded-full border border-dashed border-white/30" aria-hidden="true" />
            <motion.div
              className="absolute left-[45px] top-[45px] h-[140px] w-[140px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <span className="absolute -top-[3px] left-1/2 -ml-[3px] h-1.5 w-1.5 rounded-full bg-white/80" />
            </motion.div>
            {/* loop step tiles */}
            <IsoTile x={97} y={27} w={36} h={36}>
              <HelpCircle className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            </IsoTile>
            <IsoTile x={160} y={132} w={36} h={36}>
              <MessageSquare className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            </IsoTile>
            <IsoTile x={34} y={132} w={36} h={36}>
              <Repeat className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            </IsoTile>
            {/* the question, floating above the loop */}
            <IsoBillboard x={115} y={112}>
              <span className="block max-w-[190px] whitespace-normal text-center text-[11.5px] font-medium leading-snug text-ink">
                "Claude, how did the client's ads do in June?"
              </span>
              <span className="mt-1.5 flex items-center justify-center gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-surface px-3 py-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-black/50" style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </span>
            </IsoBillboard>
      </div>
    </div>
  );
}

/* Workflow scene — one dependable diagonal pipeline with packets */
function WorkflowVisual() {
  return (
    <div
      className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl border border-[#7B7FFF]/30 bg-[#5D63FF]/[0.08] p-6"
      data-testid="comparison-workflow-visual"
    >
      <div className="relative flex items-center justify-between gap-2">
        <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_-8px_rgba(93,99,255,0.7)]">
          The Fluxvex workflow
        </span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-[#A3A8FF]">
          <RefreshCw className="h-3 w-3 motion-safe:animate-[spin_5s_linear_infinite]" /> on schedule
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <Suspense fallback={<WorkflowSceneLegacy />}>
          <Scene3D scene="pipeline" fallback={<WorkflowSceneLegacy />} className="absolute inset-0" />
        </Suspense>
      </div>

      <p className="relative max-w-[300px] text-center text-[12px] leading-relaxed text-white/55">
        Runs the same dependable loop on schedule, without being asked.
      </p>
    </div>
  );
}

function WorkflowSceneLegacy() {
  const nodes = [
    { icon: Plug, label: "Connect" },
    { icon: SlidersHorizontal, label: "Define" },
    { icon: Sparkles, label: "Generate" },
    { icon: Send, label: "Deliver" },
  ];
  return (
    <div className="scale-[0.78] sm:scale-95">
      <div className="relative h-[180px] w-[300px]" style={{ transform: PLANE, transformStyle: "preserve-3d" }}>
            {/* pipeline wires with packets */}
            <IsoWire from={[54, 90]} to={[86, 90]} delay={0} />
            <IsoWire from={[134, 90]} to={[166, 90]} delay={0.3} />
            <IsoWire from={[214, 90]} to={[246, 90]} delay={0.6} />
            {/* loop-back wire: deliver → connect, next cycle */}
            <div className="absolute left-[54px] top-[134px] h-0 w-[192px] border-t border-dashed border-[#7B7FFF]/40" aria-hidden="true" />
            {/* node tiles */}
            {nodes.map((n, i) => (
              <div key={n.label} className="absolute" style={{ left: 6 + i * 80, top: 66, width: 48, height: 48 }}>
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white shadow-[0_14px_26px_-12px_rgba(0,0,0,0.7)] ring-1 ring-[#8A8FFF]/40">
                  <n.icon className="h-5 w-5 text-accent" strokeWidth={1.9} />
                </div>
              </div>
            ))}
            <IsoBillboard x={268} y={60}>
              <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white">Client-ready</span>
            </IsoBillboard>
            <IsoBillboard x={120} y={148}>
              <span className="text-[11px] font-semibold text-ink">Same dependable loop, every cycle</span>
            </IsoBillboard>
      </div>
    </div>
  );
}

/* Verdict card — one workflow need, prompt-vs-system, in the dark bento language */
function VerdictCard({ row, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#8A8FFF]/45 hover:bg-white/[0.055] hover:shadow-[0_44px_84px_-44px_rgba(93,99,255,0.55)]"
      data-testid={`comparison-need-${i + 1}`}
    >
      <span
        className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#5D63FF]/[0.16] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      {/* the need */}
      <div className="relative flex items-center gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white/75 transition-colors duration-300 group-hover:border-[#8A8FFF]/40 group-hover:text-[#A3A8FF]">
          <row.icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <h3 className="font-display text-[16.5px] font-semibold leading-snug tracking-tight text-white">{row.need}</h3>
      </div>

      {/* a prompt by itself */}
      <div className="relative rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/35">A prompt by itself</p>
        <p className="mt-1.5 flex items-start gap-2.5 text-[13px] leading-relaxed text-white/50">
          <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/30" strokeWidth={2.4} />
          {row.ai}
        </p>
      </div>

      {/* the Fluxvex workflow */}
      <div className="relative overflow-hidden rounded-xl border border-[#7B7FFF]/30 bg-[#5D63FF]/[0.1] px-4 py-3 transition-shadow duration-300 group-hover:shadow-[0_16px_36px_-18px_rgba(93,99,255,0.55)]">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#A3A8FF]">The Fluxvex workflow</p>
        <p className="mt-1.5 flex items-start gap-2.5 text-[13px] font-medium leading-relaxed text-white/90">
          <DrawnCheck />
          {row.fx}
        </p>
      </div>
    </motion.div>
  );
}

/* Animated 6-for-6 score strip */
function ScoreStrip() {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <div className="mt-12 flex justify-center" data-testid="ai-comparison-score">
        <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            {ROWS.map((_, i) => (
              <motion.span
                key={i}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 320, damping: 18 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6B70FF]/25"
              >
                <Check className="h-3 w-3 text-[#A3A8FF]" strokeWidth={3} />
              </motion.span>
            ))}
          </span>
          <span className="text-[12.5px] font-semibold text-white/80">6 for 6 — every workflow need, run by the system</span>
        </div>
      </div>
    </Reveal>
  );
}

export default function AiComparison() {
  return (
    <section id="why" className="relative overflow-hidden bg-[#0B0B14]" data-testid="section-why">
      {/* ambient glows + fine grid */}
      <div className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(93,99,255,0.2),transparent_70%)] blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.14),transparent_70%)] blur-3xl" aria-hidden="true" />
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
        {/* header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#A3A8FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3A8FF] animate-pulse-dot" aria-hidden="true" />
                Why a prompt isn&apos;t a reporting system
              </span>
            </Reveal>
            <CinematicText
              as="h2"
              className="mt-5 font-display text-3xl font-semibold leading-[1.06] tracking-tighter2 text-white sm:text-4xl lg:text-[44px]"
            >
              Claude and ChatGPT can help explain the numbers. Fluxvex is built to run the reporting workflow.
            </CinematicText>
          </div>
          <Reveal delay={0.15} className="max-w-sm lg:pb-2">
            <p className="text-[15px] leading-[1.7] text-white/55">
              General AI assistants—Claude, ChatGPT, and similar tools—can help draft summaries and explore data. An
              agency reporting workflow also needs dependable data connections, metric definitions, client separation,
              consistent branding, repeatable schedules, and a delivery process people can trust.
            </p>
          </Reveal>
        </div>

        {/* prompt vs workflow isometric illustrations */}
        <div className="mt-14 grid items-stretch gap-4 sm:grid-cols-2">
          <Reveal className="h-full">
            <PromptVisual />
          </Reveal>
          <Reveal delay={0.12} className="h-full">
            <WorkflowVisual />
          </Reveal>
        </div>

        <ScoreStrip />

        {/* verdict cards — every workflow need, side by side */}
        <div className="mt-6 grid gap-4 md:grid-cols-2" data-testid="ai-comparison-table">
          {ROWS.map((row, i) => (
            <VerdictCard key={row.need} row={row} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl" data-testid="ai-comparison-close">
            Use AI where it helps. Use a reporting system for the work that must happen every month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

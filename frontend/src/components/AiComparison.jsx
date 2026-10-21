import { motion, useReducedMotion } from "framer-motion";
import { Check, HelpCircle, LayoutTemplate, MessageSquare, Minus, Plug, RefreshCw, Repeat, Send, SlidersHorizontal, Sparkles, Users } from "lucide-react";
import { IsoTile, IsoWire, IsoBillboard, PLANE } from "@/components/iso/IsoKit";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const ROWS = [
  { icon: Plug, need: "Connect to the agency's live accounts", ai: "Depends on available connectors, permissions, and setup", fx: "Designed around supported advertising and analytics integrations" },
  { icon: SlidersHorizontal, need: "Use consistent metric definitions", ai: "Requires explicit definitions and checking", fx: "Can centralize definitions in the product workflow, if implemented" },
  { icon: Repeat, need: "Repeat the same report each cycle", ai: "Usually requires additional instructions or automation", fx: "Designed for a repeatable reporting process" },
  { icon: LayoutTemplate, need: "Preserve a consistent agency report format", ai: "Requires templates and manual checks or extra tooling", fx: "White-label report workflow, where supported" },
  { icon: Users, need: "Keep client data and access separated", ai: "Depends on the tools, configuration, and permissions used", fx: "Must be enforced by Fluxvex's actual access-control design" },
  { icon: Send, need: "Review, correct, and deliver a report", ai: "Depends on the process wrapped around the AI tool", fx: "Report review and delivery process can be built into the workflow" },
];

/* A drawn-circle check — the "verified" micro-badge for the Fluxvex column */
function DrawnCheck() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 22 22" className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true">
      <motion.circle
        cx="11"
        cy="11"
        r="9.5"
        fill="none"
        stroke="#3D43E8"
        strokeWidth="2"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? {} : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      <motion.path
        d="M6.6 11.3 L9.7 14.2 15.4 8.2"
        fill="none"
        stroke="#3D43E8"
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
      className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-xl border border-line bg-page p-6"
      data-testid="comparison-prompt-visual"
    >
      <div className="fine-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-2">
        <span className="rounded-full border border-line bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          A prompt, by itself
        </span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-black/40">
          <Repeat className="h-3 w-3" /> manual loop
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="scale-[0.85] sm:scale-100">
          <div className="relative h-[230px] w-[230px]" style={{ transform: PLANE, transformStyle: "preserve-3d" }}>
            {/* dashed loop on the plane with an orbiting packet */}
            <div className="absolute left-[45px] top-[45px] h-[140px] w-[140px] rounded-full border border-dashed border-black/25" aria-hidden="true" />
            <motion.div
              className="absolute left-[45px] top-[45px] h-[140px] w-[140px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <span className="absolute -top-[3px] left-1/2 -ml-[3px] h-1.5 w-1.5 rounded-full bg-ink/70" />
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
      </div>

      <p className="relative max-w-[300px] text-center text-[12px] leading-relaxed text-ink-soft">
        Answers the question—then waits for the next instruction, every cycle.
      </p>
    </div>
  );
}

/* Workflow scene — one dependable diagonal pipeline with packets */
function WorkflowVisual() {
  const nodes = [
    { icon: Plug, label: "Connect" },
    { icon: SlidersHorizontal, label: "Define" },
    { icon: Sparkles, label: "Generate" },
    { icon: Send, label: "Deliver" },
  ];
  return (
    <div
      className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-xl border border-accent-border bg-accent-tint/60 p-6"
      data-testid="comparison-workflow-visual"
    >
      <div className="relative flex items-center justify-between gap-2">
        <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          The Fluxvex workflow
        </span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-accent">
          <RefreshCw className="h-3 w-3 motion-safe:animate-[spin_5s_linear_infinite]" /> on schedule
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className="scale-[0.78] sm:scale-95">
          <div className="relative h-[180px] w-[300px]" style={{ transform: PLANE, transformStyle: "preserve-3d" }}>
            {/* pipeline wires with packets */}
            <IsoWire from={[54, 90]} to={[86, 90]} delay={0} />
            <IsoWire from={[134, 90]} to={[166, 90]} delay={0.3} />
            <IsoWire from={[214, 90]} to={[246, 90]} delay={0.6} />
            {/* loop-back wire: deliver → connect, next cycle */}
            <div className="absolute left-[54px] top-[134px] h-0 w-[192px] border-t border-dashed border-accent/30" aria-hidden="true" />
            {/* node tiles */}
            {nodes.map((n, i) => (
              <div key={n.label} className="absolute" style={{ left: 6 + i * 80, top: 66, width: 48, height: 48 }}>
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white shadow-[0_14px_26px_-12px_rgba(16,16,20,0.4)] ring-1 ring-accent/20">
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
      </div>

      <p className="relative max-w-[300px] text-center text-[12px] leading-relaxed text-ink-soft">
        Runs the same dependable loop on schedule, without being asked.
      </p>
    </div>
  );
}

export default function AiComparison() {
  return (
    <SectionShell id="why">
      <SectionHeader
        overline="Why a prompt isn't a reporting system"
        title="Claude and ChatGPT can help explain the numbers. Fluxvex is built to run the reporting workflow."
        copy="General AI assistants—Claude, ChatGPT, and similar tools—can help draft summaries and explore data. An agency reporting workflow also needs dependable data connections, metric definitions, client separation, consistent branding, repeatable schedules, and a delivery process people can trust."
      />

      {/* prompt vs workflow isometric illustrations */}
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        <Reveal className="h-full">
          <PromptVisual />
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <WorkflowVisual />
        </Reveal>
      </div>

      {/* versus cards — every workflow need, side by side */}
      <div className="mt-10" data-testid="ai-comparison-table">
        {/* column headers (desktop) */}
        <div className="hidden gap-4 px-3 md:grid md:grid-cols-[1.05fr_1fr_1fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">The workflow needs</p>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
            <span className="h-1.5 w-1.5 rounded-full bg-black/25" /> A prompt by itself
          </p>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> The Fluxvex workflow
          </p>
        </div>

        <div className="mt-3 space-y-4">
          {ROWS.map((row, i) => (
            <Reveal key={row.need} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="group grid gap-3 rounded-2xl border border-line bg-page p-4 shadow-[0_18px_40px_-28px_rgba(16,16,20,0.3)] md:grid-cols-[1.05fr_1fr_1fr] md:items-center md:gap-4 md:p-5"
              >
                {/* need */}
                <div className="flex items-center gap-3.5" data-testid={`comparison-need-${i + 1}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent">
                    <row.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-ink">{row.need}</p>
                </div>

                {/* a prompt by itself */}
                <div className="flex items-start gap-2.5 rounded-xl border border-black/[0.06] bg-surface/70 px-4 py-3.5">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-black/30" strokeWidth={2.4} />
                  <div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-black/35 md:hidden">A prompt by itself</p>
                    <p className="text-[13px] leading-relaxed text-ink-soft">{row.ai}</p>
                  </div>
                </div>

                {/* the Fluxvex workflow */}
                <div className="relative flex items-start gap-2.5 overflow-hidden rounded-xl border border-accent/25 bg-accent-tint/70 px-4 py-3.5 transition-shadow duration-300 group-hover:shadow-[0_16px_36px_-18px_rgba(61,67,232,0.5)]">
                  <DrawnCheck />
                  <div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-accent md:hidden">The Fluxvex workflow</p>
                    <p className="text-[13px] font-medium leading-relaxed text-ink">{row.fx}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl" data-testid="ai-comparison-close">
          Use AI where it helps. Use a reporting system for the work that must happen every month.
        </p>
      </Reveal>
    </SectionShell>
  );
}

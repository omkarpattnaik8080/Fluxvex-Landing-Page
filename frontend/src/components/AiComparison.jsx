import { motion, useReducedMotion } from "framer-motion";
import { Check, HelpCircle, MessageSquare, Minus, Plug, RefreshCw, Repeat, Send, SlidersHorizontal, Sparkles } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const ROWS = [
  ["Connect to the agency’s live accounts", "Depends on available connectors, permissions, and setup", "Designed around supported advertising and analytics integrations"],
  ["Use consistent metric definitions", "Requires explicit definitions and checking", "Can centralize definitions in the product workflow, if implemented"],
  ["Repeat the same report each cycle", "Usually requires additional instructions or automation", "Designed for a repeatable reporting process"],
  ["Preserve a consistent agency report format", "Requires templates and manual checks or extra tooling", "White-label report workflow, where supported"],
  ["Keep client data and access separated", "Depends on the tools, configuration, and permissions used", "Must be enforced by Fluxvex’s actual access-control design"],
  ["Review, correct, and deliver a report", "Depends on the process wrapped around the AI tool", "Report review and delivery process can be built into the workflow"],
];

/* ---- isometric primitives (same technique as the workflow stage) ---- */
const PLANE = "rotateX(55deg) rotateZ(-45deg)";
const BILLBOARD = "rotateZ(45deg) rotateX(-55deg)";

function IsoTile({ x, y, s = 36, children }) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: s, height: s }}>
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white shadow-[0_14px_26px_-12px_rgba(16,16,20,0.4)] ring-1 ring-black/[0.06]">
        {children}
      </div>
    </div>
  );
}

function IsoBillboard({ x, y, children }) {
  return (
    <div className="pointer-events-none absolute z-10" style={{ left: x, top: y, transform: BILLBOARD, transformOrigin: "50% 100%" }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: [0, -4, 0] }}
        viewport={{ once: true }}
        transition={{ opacity: { duration: 0.35 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" } }}
        className="rounded-xl border border-black/[0.06] bg-white px-3.5 py-2 shadow-[0_22px_44px_-16px_rgba(16,16,20,0.4)]"
      >
        {children}
      </motion.div>
    </div>
  );
}

function IsoWire({ from, to, delay = 0 }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.round(Math.hypot(dx, dy));
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <div className="absolute" style={{ left: from[0], top: from[1], width: len, transform: `rotate(${ang}deg)`, transformOrigin: "0 0" }} aria-hidden="true">
      <div className="h-0 w-full border-t border-dashed border-accent/50" />
      <motion.span
        className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ boxShadow: "0 0 8px 2px rgba(61,67,232,0.4)" }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </div>
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
            <IsoTile x={97} y={27}>
              <HelpCircle className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            </IsoTile>
            <IsoTile x={160} y={132}>
              <MessageSquare className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            </IsoTile>
            <IsoTile x={34} y={132}>
              <Repeat className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            </IsoTile>
            {/* the question, floating above the loop */}
            <IsoBillboard x={115} y={112}>
              <span className="block max-w-[190px] whitespace-normal text-center text-[11.5px] font-medium leading-snug text-ink">
                “How did the client’s ads do in June?”
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
        overline="Why a prompt isn’t a reporting system"
        title="ChatGPT can help explain the numbers. Fluxvex is built to run the reporting workflow."
        copy="General AI assistants can help draft summaries and explore data. An agency reporting workflow also needs dependable data connections, metric definitions, client separation, consistent branding, repeatable schedules, and a delivery process people can trust."
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

      <Reveal>
        <div
          className="mt-8 overflow-hidden rounded-xl border border-line bg-page shadow-[0_36px_80px_-40px_rgba(16,16,20,0.28)]"
          data-testid="ai-comparison-table"
        >
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-line bg-elevated shadow-[0_1px_0_rgba(16,16,20,0.04)]">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Workflow need</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">General AI assistant used by itself</th>
                <th className="border-l border-accent-border bg-accent-tint px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  A dedicated reporting workflow like Fluxvex
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([need, ai, fx], i) => (
                <motion.tr
                  key={need}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`group border-b border-hairline transition-colors last:border-b-0 hover:bg-surface/80 ${i % 2 ? "bg-surface/40" : "bg-page"}`}
                >
                  <td className="px-5 py-4 text-sm font-medium text-ink" data-testid={`comparison-need-${i + 1}`}>
                    {need}
                  </td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-soft">
                    <span className="flex items-start gap-2">
                      <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/30" strokeWidth={2.2} />
                      {ai}
                    </span>
                  </td>
                  <td className="border-l border-accent-border/60 bg-accent-tint/50 px-5 py-4 text-sm leading-relaxed text-ink transition-colors group-hover:bg-accent-tint">
                    <span className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.2} />
                      {fx}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl" data-testid="ai-comparison-close">
          Use AI where it helps. Use a reporting system for the work that must happen every month.
        </p>
      </Reveal>
    </SectionShell>
  );
}

import { motion } from "framer-motion";
import { Check, HelpCircle, MessageSquare, Minus, Plug, Repeat, RefreshCw, Send, SlidersHorizontal, Sparkles } from "lucide-react";
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

/* Prompt visual — a question answered, then a manual loop, every cycle */
function PromptVisual() {
  const loop = [
    { icon: HelpCircle, label: "Re-ask with context" },
    { icon: MessageSquare, label: "Re-explain the setup" },
    { icon: Repeat, label: "Re-check the output" },
  ];
  return (
    <div
      className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl border border-line bg-page p-6"
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

      {/* chat exchange */}
      <div className="relative mt-6 space-y-2.5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-[12.5px] font-medium text-white shadow-[0_16px_30px_-14px_rgba(16,16,20,0.5)]"
        >
          “How did the client’s ads do in June?”
        </motion.div>
        <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="typing-dot h-1.5 w-1.5 rounded-full bg-black/50"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      </div>

      {/* the manual loop */}
      <div className="relative mt-6 grid grid-cols-3 gap-2">
        {loop.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.14 }}
            className="rounded-lg border border-hairline bg-surface p-2.5 text-center"
          >
            <s.icon className="mx-auto h-4 w-4 text-black/40" strokeWidth={1.8} />
            <p className="mt-1.5 text-[10px] font-medium leading-tight text-ink-soft">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <p className="relative mt-5 max-w-[280px] text-[12px] leading-relaxed text-ink-soft">
        Answers the question—then waits for the next instruction, every cycle.
      </p>
    </div>
  );
}

/* Workflow visual — one dependable loop with data packets */
function WorkflowVisual() {
  const nodes = [
    { icon: Plug, label: "Connect" },
    { icon: SlidersHorizontal, label: "Define" },
    { icon: Sparkles, label: "Generate" },
    { icon: Send, label: "Deliver" },
  ];
  return (
    <div
      className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl border border-accent-border bg-accent-tint/60 p-6"
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

      {/* pipeline with traveling packets */}
      <div className="relative mt-8 flex items-start justify-between px-1">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.15 + i * 0.16 }}
              className="flex flex-col items-center gap-1.5"
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_16px_30px_-12px_rgba(61,67,232,0.45)] ring-1 ring-accent/30"
              >
                <n.icon className="h-5 w-5 text-accent" strokeWidth={1.9} />
              </motion.span>
              <span className="text-[9.5px] font-semibold uppercase tracking-wide text-ink/70">{n.label}</span>
            </motion.div>
            {i < nodes.length - 1 && (
              <span className="relative mx-1 mt-5 hidden h-px w-8 border-t border-dashed border-accent/50 sm:block lg:w-12" aria-hidden="true">
                <motion.span
                  className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 8px 2px rgba(61,67,232,0.4)" }}
                  animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* loop-back note */}
      <div className="relative mt-7 flex items-center gap-2.5 rounded-lg border border-dashed border-accent/35 bg-page/70 px-3.5 py-2.5">
        <RefreshCw className="h-3.5 w-3.5 shrink-0 text-accent motion-safe:animate-[spin_5s_linear_infinite]" />
        <p className="text-[11px] font-medium leading-snug text-ink-soft">
          The loop repeats next cycle—no one rebuilds it.
        </p>
      </div>

      <p className="relative mt-5 max-w-[280px] text-[12px] leading-relaxed text-ink-soft">
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

      {/* prompt vs workflow illustration */}
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

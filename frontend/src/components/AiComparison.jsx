import { motion } from "framer-motion";
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

function PromptVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-line bg-page p-6" data-testid="comparison-prompt-visual">
      <span className="rounded-full border border-line bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        A prompt
      </span>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-black/50" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
      <p className="max-w-[220px] text-center text-[12px] leading-relaxed text-ink-soft">
        Answers the question—then waits for the next instruction, every cycle.
      </p>
    </div>
  );
}

function WorkflowVisual() {
  const nodes = ["Connect", "Define", "Generate", "Deliver"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-accent-border bg-accent-tint/60 p-6" data-testid="comparison-workflow-visual">
      <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
        The Fluxvex workflow
      </span>
      <div className="flex w-full items-center justify-between px-1">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.2 + i * 0.18 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-accent/30">
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[9.5px] font-semibold uppercase tracking-wide text-ink/70">{n}</span>
            </motion.div>
            {i < nodes.length - 1 && (
              <svg width="34" height="10" className="mx-1 mb-4 hidden sm:block" aria-hidden="true">
                <line x1="0" y1="5" x2="34" y2="5" stroke="#3D43E8" strokeWidth="1.6" strokeDasharray="4 5" className="animate-dash-flow" style={{ animationDelay: `${i * 0.2}s` }} />
              </svg>
            )}
          </div>
        ))}
      </div>
      <p className="max-w-[240px] text-center text-[12px] leading-relaxed text-ink-soft">
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal>
          <PromptVisual />
        </Reveal>
        <Reveal delay={0.12}>
          <WorkflowVisual />
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-page" data-testid="ai-comparison-table">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-elevated">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Workflow need</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">General AI assistant used by itself</th>
                <th className="border-l border-accent-border bg-accent-tint px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  A dedicated reporting workflow like Fluxvex
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([need, ai, fx], i) => (
                <tr key={need} className={`border-b border-hairline last:border-b-0 ${i % 2 ? "bg-surface/60" : "bg-page"}`}>
                  <td className="px-5 py-4 text-sm font-medium text-ink" data-testid={`comparison-need-${i + 1}`}>{need}</td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-soft">{ai}</td>
                  <td className="border-l border-accent-border/60 bg-accent-tint/50 px-5 py-4 text-sm leading-relaxed text-ink">{fx}</td>
                </tr>
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

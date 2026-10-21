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

export default function AiComparison() {
  return (
    <SectionShell id="why">
      <SectionHeader
        overline="Why a prompt isn’t a reporting system"
        title="ChatGPT can help explain the numbers. Fluxvex is built to run the reporting workflow."
        copy="General AI assistants can help draft summaries and explore data. An agency reporting workflow also needs dependable data connections, metric definitions, client separation, consistent branding, repeatable schedules, and a delivery process people can trust."
      />

      <Reveal>
        <div className="overflow-x-auto rounded-xl border border-line" data-testid="ai-comparison-table">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-elevated">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Workflow need</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">General AI assistant used by itself</th>
                <th className="border-l border-line bg-accent/[0.06] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                  A dedicated reporting workflow like Fluxvex
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([need, ai, fx], i) => (
                <tr key={need} className={`border-b border-hairline last:border-b-0 ${i % 2 ? "bg-surface" : "bg-[#0D0D0D]"}`}>
                  <td className="px-5 py-4 text-sm font-medium text-white" data-testid={`comparison-need-${i + 1}`}>{need}</td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-white/50">{ai}</td>
                  <td className="border-l border-line bg-accent/[0.04] px-5 py-4 text-sm leading-relaxed text-white/85">{fx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl font-display text-xl font-medium leading-snug tracking-tight text-white/85 sm:text-2xl" data-testid="ai-comparison-close">
          Use AI where it helps. Use a reporting system for the work that must happen every month.
        </p>
      </Reveal>
    </SectionShell>
  );
}

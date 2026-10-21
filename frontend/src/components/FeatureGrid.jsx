import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

function CardVisualInputs() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6">
      <div className="flex gap-2.5">
        {[<GoogleAdsMark size={15} key="g" />, <MetaMark size={15} key="m" />, <GA4Mark size={15} key="a" />].map((m, i) => (
          <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-elevated shadow">
            {m}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 200 34" className="w-48" aria-hidden="true">
        {[30, 100, 170].map((x, i) => (
          <path key={x} d={`M${x} 0 C ${x} 20, 100 14, 100 34`} fill="none" stroke="#0099FF" strokeWidth="1.4" strokeDasharray="4 5" className="animate-dash-flow" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
      <div className="w-52 rounded-lg border border-line bg-elevated p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded bg-accent/60" />
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-semibold uppercase text-accent-soft">Report</span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          <div className="h-1.5 w-full rounded bg-white/15" />
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
          <div className="h-1.5 w-5/6 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function CardVisualWhiteLabel() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-52 rounded-lg border border-line bg-elevated p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent font-display text-[10px] font-bold text-white">N</span>
          <div>
            <div className="h-1.5 w-20 rounded bg-white/25" />
            <div className="mt-1 h-1 w-12 rounded bg-white/12" />
          </div>
        </div>
        <div className="mt-3 h-1.5 w-24 rounded bg-white/20" />
        <div className="mt-1 h-1 w-16 rounded bg-white/10" />
        <svg viewBox="0 0 160 44" className="mt-3 w-full" aria-hidden="true">
          <path d="M0 36 20 30 40 33 60 22 80 26 100 14 120 18 140 8 160 10" fill="none" stroke="#0099FF" strokeWidth="2" />
        </svg>
        <div className="mt-3 flex items-center justify-between border-t border-hairline pt-2.5">
          <div className="h-1.5 w-14 rounded bg-white/12" />
          <div className="h-4 w-12 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

function CardVisualDelivery() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-52 space-y-2 rounded-lg border border-line bg-elevated p-4 shadow-lg">
        {[
          ["Northbeam Media", "Ready", "bg-[#0E8A3E]/20 text-[#4ADE80]"],
          ["Halcyon Dental", "Ready", "bg-[#0E8A3E]/20 text-[#4ADE80]"],
          ["Vela Studio", "Draft", "bg-accent/20 text-accent-soft"],
        ].map(([name, status, tone]) => (
          <div key={name} className="flex items-center justify-between rounded-md border border-hairline px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <span className="text-[11px] font-medium text-white/80">{name}</span>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${tone}`}>{status}</span>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-md border border-dashed border-accent/40 bg-accent/[0.06] px-3 py-2">
          <span className="text-[11px] font-medium text-white/80">Next cycle</span>
          <span className="text-[11px] font-semibold text-accent-soft">July 1 · Scheduled</span>
        </div>
      </div>
    </div>
  );
}

export default function FeatureGrid() {
  return (
    <SectionShell id="features">
      <SectionHeader
        overline="Features"
        title="Built for the reporting work agencies actually do."
        copy="Three capabilities carry the workflow—from connected data to a client-ready deliverable—so the same effort never has to be repeated from scratch."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { visual: <CardVisualInputs />, title: "Unified reporting inputs", desc: "Bring supported advertising and analytics data into one repeatable reporting workflow." },
          { visual: <CardVisualWhiteLabel />, title: "White-label reports", desc: "Make the report feel like an extension of your agency, not a disconnected tool." },
          { visual: <CardVisualDelivery />, title: "Repeatable delivery", desc: "Reduce the recurring setup and formatting work required for every reporting cycle." },
        ].map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-white/25" data-testid={`feature-card-${i + 1}`}>
              <div className="fine-grid h-56 border-b border-line bg-[#070707]">{card.visual}</div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{card.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

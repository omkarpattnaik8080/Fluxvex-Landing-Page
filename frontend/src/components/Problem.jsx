import { Layers, RefreshCw, Hourglass } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

function MiniWindow({ title, offset, children }) {
  return (
    <div className={`w-56 rounded-lg border border-hairline bg-elevated shadow-xl ${offset}`}>
      <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="ml-2 text-[10px] font-medium text-white/45">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default function Problem() {
  return (
    <SectionShell id="problem">
      <SectionHeader
        overline="The reporting bottleneck"
        title="Your agency shouldn’t spend reporting day rebuilding last month’s work."
        copy="Data lives in different platforms. Metrics need context. Charts need formatting. Every client expects a clear explanation. Repeating that process one account at a time consumes capacity your team could use to improve campaigns."
      />

      <Reveal>
        <div className="relative grid overflow-hidden rounded-xl border border-line bg-surface lg:grid-cols-2" data-testid="problem-comparison-visual">
          {/* left: disconnected manual workflow */}
          <div className="fine-grid relative min-h-[340px] overflow-hidden p-8 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Today</p>
            <div className="relative mt-6 h-[220px]">
              <MiniWindow title="Google Ads" offset="absolute left-0 top-0">
                <div className="space-y-1.5">
                  <div className="h-2 w-3/4 rounded bg-white/15" />
                  <div className="h-2 w-1/2 rounded bg-white/10" />
                  <svg viewBox="0 0 120 32" className="mt-2 w-full" aria-hidden="true">
                    <path d="M0 8 20 14 40 10 60 20 80 18 100 26 120 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  </svg>
                </div>
              </MiniWindow>
              <MiniWindow title="Spreadsheet" offset="absolute left-16 top-16">
                <div className="space-y-1.5">
                  <div className="h-2 w-2/3 rounded bg-white/15" />
                  <div className="grid grid-cols-4 gap-1 pt-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-3 rounded-sm bg-white/[0.07]" />
                    ))}
                  </div>
                </div>
              </MiniWindow>
              <MiniWindow title="Slide deck" offset="absolute left-32 top-32">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 rounded bg-white/[0.08]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-full rounded bg-white/15" />
                    <div className="h-2 w-2/3 rounded bg-white/10" />
                  </div>
                </div>
              </MiniWindow>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Copy, paste, reformat…", "Which number is current?"].map((t) => (
                <span key={t} className="rounded-full border border-hairline bg-ink px-3 py-1.5 text-[11px] text-white/55">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* right: unified */}
          <div className="relative flex flex-col justify-center border-t border-line bg-[#06121E] p-8 lg:border-l lg:border-t-0 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-soft">With Fluxvex</p>
            <div className="mt-6 rounded-xl border border-accent/25 bg-accent/[0.07] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-xs font-bold text-white">F</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Client report — June</p>
                    <p className="text-[11px] text-white/50">One structure, every account</p>
                  </div>
                </div>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-soft">Ready</span>
              </div>
              <svg viewBox="0 0 400 90" className="mt-5 w-full" role="img" aria-label="Unified report trend rising">
                <defs>
                  <linearGradient id="unifiedArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0099FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0099FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 74 40 68 80 70 120 56 160 58 200 44 240 40 280 30 320 24 360 14 400 10 L400 90 0 90 Z" fill="url(#unifiedArea)" />
                <path d="M0 74 40 68 80 70 120 56 160 58 200 44 240 40 280 30 320 24 360 14 400 10" fill="none" stroke="#0099FF" strokeWidth="2.2" />
              </svg>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Connected sources", "One structure", "Client-ready"].map((t) => (
                <span key={t} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] text-accent-soft">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-3">
        {[
          { icon: Layers, title: "Data scattered across platforms", desc: "The team has to gather metrics from multiple places before any report can start." },
          { icon: RefreshCw, title: "Formatting repeated every cycle", desc: "Reports vary by person, client, or month—and the setup work never carries over." },
          { icon: Hourglass, title: "Insights trapped in manual effort", desc: "Less time remains for analysis, optimization, and client conversations." },
        ].map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="border-t border-line pt-6" data-testid={`pain-point-${i + 1}`}>
              <p.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
              <h3 className="mt-4 text-[17px] font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

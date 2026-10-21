import { motion } from "framer-motion";
import { Layers, RefreshCw, Hourglass } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const AVATARS = [
  ["https://randomuser.me/api/portraits/men/32.jpg", "Google Ads"],
  ["https://randomuser.me/api/portraits/women/44.jpg", "Meta Ads"],
  ["https://randomuser.me/api/portraits/men/54.jpg", "GA4"],
  ["https://randomuser.me/api/portraits/women/68.jpg", "Google Ads"],
  ["https://randomuser.me/api/portraits/men/75.jpg", "Meta Ads"],
];

function TooltipChip({ a, b }) {
  return (
    <div className="flex items-center divide-x divide-white/20 rounded-lg bg-[#111116] px-3 py-2 text-[11px] leading-tight text-white shadow-[0_16px_36px_-12px_rgba(0,0,0,0.45)]">
      <span className={`flex items-center gap-1.5 ${b ? "pr-3" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        <span className="whitespace-nowrap font-semibold">{a[0]}</span>
        <span className="whitespace-nowrap text-white/55">{a[1]}</span>
      </span>
      {b && (
        <span className="flex items-center gap-1.5 pl-3">
          <span className="h-1.5 w-1.5 rounded-full bg-note" />
          <span className="whitespace-nowrap font-semibold">{b[0]}</span>
          <span className="whitespace-nowrap text-white/55">{b[1]}</span>
        </span>
      )}
    </div>
  );
}

export default function Problem() {
  return (
    <SectionShell id="problem">
      {/* framed centered heading, matching the reference */}
      <div className="rounded-xl border border-accent-border bg-page px-5 py-12 text-center sm:px-8 sm:py-14" data-testid="problem-heading-frame">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">The reporting bottleneck</p>
        </Reveal>
        <CinematicText
          as="h2"
          className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tighter2 text-ink sm:text-4xl lg:text-[42px]"
        >
          Your agency shouldn’t spend reporting day rebuilding last month’s work.
        </CinematicText>
      </div>

      <Reveal>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-[1.75] text-ink-soft">
          Data lives in different platforms. Metrics need context. Charts need formatting. Every client expects a
          clear explanation. Repeating that process one account at a time consumes capacity your team could use to
          improve campaigns.
        </p>
      </Reveal>

      {/* diagram: red manual chart vs blue unified chart */}
      <Reveal>
        <div className="relative mt-14 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white via-[#FDF6F6] to-white" data-testid="problem-comparison-visual">
          {/* top row: avatars | problem/solution | platform chips */}
          <div className="relative flex items-start justify-between gap-6 px-6 pt-8 sm:px-10">
            <div className="flex -space-x-2.5" aria-hidden="true">
              {AVATARS.map(([src, alt], i) => (
                <span key={src} className="relative">
                  <img src={src} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[7px] font-bold text-ink">
                    {i % 3 === 0 ? "G" : i % 3 === 1 ? "M" : "A"}
                  </span>
                </span>
              ))}
            </div>

            <div className="absolute left-1/2 top-6 flex -translate-x-1/2 flex-col items-center">
              <span className="flex items-center divide-x divide-black/10 rounded-full border border-line bg-page px-1 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm">
                <span className="flex items-center gap-1.5 px-3 text-[#D64545]">
                  <span className="h-2 w-2 rounded-full bg-[#D64545]" /> Problem
                </span>
                <span className="flex items-center gap-1.5 px-3 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Solution
                </span>
              </span>
              <span className="mt-2 h-8 w-px border-l border-dashed border-black/20" aria-hidden="true" />
              <span className="relative -mt-1 flex h-14 w-14 items-center justify-center rounded-full border border-accent-border bg-page shadow-[0_18px_40px_-12px_rgba(61,67,232,0.4)]">
                <span className="absolute inset-0 rounded-full bg-accent/20 blur-md" aria-hidden="true" />
                <FluxvexMark size={36} className="relative rounded-[10px]" />
              </span>
            </div>

            <div className="hidden flex-col items-end gap-2 sm:flex" aria-hidden="true">
              <div className="flex gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5"><GoogleAdsMark size={16} /></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5"><MetaMark size={16} /></span>
              </div>
              <div className="flex gap-2 pr-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5"><GA4Mark size={16} /></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 text-[10px] font-bold text-black/60">X</span>
              </div>
            </div>
          </div>

          {/* charts */}
          <div className="relative grid lg:grid-cols-2">
            <div className="relative px-6 pb-4 pt-6 sm:px-10" data-testid="problem-chart-manual">
              <svg viewBox="0 0 480 160" className="w-full" role="img" aria-label="Declining chart representing manual reporting effort piling up">
                <defs>
                  <linearGradient id="redArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F26D6D" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#F26D6D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[30, 75, 120].map((y) => (
                  <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(16,16,20,0.05)" strokeWidth="1" />
                ))}
                <motion.path
                  d="M0 46 C 40 60, 70 40, 105 62 S 170 96, 210 84 S 280 118, 330 108 S 420 134, 480 140 L 480 160 L 0 160 Z"
                  fill="url(#redArea)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                <motion.path
                  d="M0 46 C 40 60, 70 40, 105 62 S 170 96, 210 84 S 280 118, 330 108 S 420 134, 480 140"
                  fill="none"
                  stroke="#F26D6D"
                  strokeWidth="2.4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute left-1/2 top-[38%] -translate-x-1/2">
                <TooltipChip a={["Manual work", "repeats monthly"]} b={["Effort", "grows per client"]} />
              </div>
            </div>

            <div className="relative border-t border-line px-6 pb-4 pt-6 sm:px-10 lg:border-l lg:border-t-0" data-testid="problem-chart-unified">
              <svg viewBox="0 0 480 160" className="w-full" role="img" aria-label="Rising chart representing one unified reporting workflow">
                <defs>
                  <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3D43E8" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#3D43E8" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {[30, 75, 120].map((y) => (
                  <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(16,16,20,0.05)" strokeWidth="1" />
                ))}
                <motion.path
                  d="M0 132 C 50 126, 90 112, 130 116 S 210 84, 250 88 S 330 52, 380 44 S 460 22, 480 18 L 480 160 L 0 160 Z"
                  fill="url(#blueArea)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                />
                <motion.path
                  d="M0 132 C 50 126, 90 112, 130 116 S 210 84, 250 88 S 330 52, 380 44 S 460 22, 480 18"
                  fill="none"
                  stroke="#3D43E8"
                  strokeWidth="2.4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                />
                <line x1="298" y1="10" x2="298" y2="60" stroke="rgba(16,16,20,0.3)" strokeWidth="1" strokeDasharray="3 4" />
              </svg>
              <div className="absolute left-[62%] top-[12%] z-10 -translate-x-1/2">
                <TooltipChip a={["One workflow", "every client"]} />
              </div>
            </div>
          </div>

          {/* captions */}
          <div className="grid border-t border-line lg:grid-cols-2">
            <div className="px-6 py-7 text-center sm:px-10">
              <p className="text-[15px] font-semibold text-ink">Too many disconnected tools</p>
              <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-soft">
                Reporting lives across platforms, spreadsheets, and decks that never quite agree.
              </p>
            </div>
            <div className="border-t border-line px-6 py-7 text-center sm:px-10 lg:border-l lg:border-t-0">
              <p className="text-[15px] font-semibold text-ink">One repeatable reporting workflow</p>
              <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-ink-soft">
                Data collection, structure, branding, and delivery—handled in one place.
              </p>
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
              <h3 className="mt-4 text-[17px] font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

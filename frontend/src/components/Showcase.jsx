import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, ChevronDown, Sparkles } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const CHANNELS = [
  ["Google Ads", "$28,140", "46%"],
  ["Meta Ads", "$15,070", "41%"],
  ["GA4 sessions", "—", "13%"],
];

const AI_SUMMARY =
  "June delivered the strongest conversion month so far—spend held near plan while Meta efficiency improved for the third week running.";
const AI_CHIPS = ["Spend pacing above plan", "Meta ROAS improving", "Conversions +14.9% vs May"];

/* Typewriter that re-types whenever the text changes (reduced-motion safe) */
function useTypewriter(text, { speed = 20, pause = 3600, reduce = false } = {}) {
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) {
      setN(text.length);
      return undefined;
    }
    setN(0);
    let i = 0;
    let t;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) t = setTimeout(tick, speed);
    };
    t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [text, speed, reduce]);
  useEffect(() => {
    if (reduce || n < text.length) return undefined;
    const t = setTimeout(() => setN(0), pause);
    return () => clearTimeout(t);
  }, [n, text, pause, reduce]);
  return text.slice(0, n);
}

export default function Showcase() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const typed = useTypewriter(AI_SUMMARY, { reduce });
  const [chipIdx, setChipIdx] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setChipIdx((v) => (v + 1) % AI_CHIPS.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <SectionShell id="product">
      <SectionHeader
        overline="Inside Fluxvex"
        title="A report your client can understand at a glance."
        copy="One frame holds the whole story: what was spent, what came back, and what it means—labeled, sourced, and ready to send."
      />
      <Reveal>
        <div
          ref={ref}
          onMouseMove={onMove}
          className="spotlight overflow-hidden rounded-2xl border border-line bg-page shadow-[0_50px_120px_-40px_rgba(20,21,122,0.35)]"
          data-testid="showcase-mockup"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-3 border-b border-line bg-elevated px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
            </div>
            <span className="mx-auto hidden rounded-full border border-line bg-page px-4 py-1 text-[11px] font-medium text-black/50 sm:block">
              fluxvex.app/reports/northbeam-media/june-2025
            </span>
            <span className="rounded-full bg-accent-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent" data-testid="showcase-sample-badge">
              Sample report · Illustrative data
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {/* selectors */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-accent font-display text-[10px] font-bold text-white">N</span>
                Northbeam Media <ChevronDown className="h-3.5 w-3.5 text-black/40" />
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink/80">
                June 2025 <ChevronDown className="h-3.5 w-3.5 text-black/40" />
              </span>
              <span className="ml-auto hidden items-center gap-2 text-xs text-ink-soft sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> White-label enabled
              </span>
            </div>

            {/* KPIs */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Spend", "$48,210", "+8.2% vs May"],
                ["Impressions", "1.24M", "+11.6% vs May"],
                ["Clicks", "34,880", "+6.1% vs May"],
                ["Conversions", "1,204", "+14.9% vs May"],
              ].map(([label, value, note]) => (
                <div key={label} className="rounded-xl border border-line bg-surface p-4" data-testid={`showcase-kpi-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">{label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{value}</p>
                  <p className="mt-1 text-[11px] text-accent">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-5">
              {/* trend */}
              <div className="rounded-xl border border-line bg-surface p-5 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Performance trend</p>
                  <p className="text-[11px] text-black/40">Conversions · last 30 days</p>
                </div>
                <svg viewBox="0 0 480 140" className="mt-3 w-full" role="img" aria-label="Conversions trend rising across the month">
                  <defs>
                    <linearGradient id="showArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3D43E8" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="#3D43E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[30, 70, 110].map((y) => (
                    <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(16,16,20,0.06)" strokeWidth="1" />
                  ))}
                  <path d="M0 112 C 40 104, 70 118, 105 96 S 170 58, 210 70 S 280 34, 320 42 S 400 12, 480 14 L 480 140 L 0 140 Z" fill="url(#showArea)" />
                  <path d="M0 112 C 40 104, 70 118, 105 96 S 170 58, 210 70 S 280 34, 320 42 S 400 12, 480 14" fill="none" stroke="#3D43E8" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="480" cy="14" r="4" fill="#3D43E8" />
                </svg>
              </div>

              {/* channels + insight */}
              <div className="space-y-3 lg:col-span-2">
                <div className="rounded-xl border border-line bg-surface p-5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Channel comparison</p>
                  <div className="mt-3 space-y-2.5">
                    {CHANNELS.map(([name, val, w]) => (
                      <div key={name}>
                        <div className="flex items-center justify-between text-xs text-ink-soft">
                          <span>{name}</span>
                          <span className="font-medium text-ink">{val}</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-black/[0.07]">
                          <div className="h-full rounded-full bg-accent transition-all" style={{ width: w }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-accent-border bg-accent-tint/60 p-5" data-testid="showcase-ai-insights">
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                      <Sparkles className="h-3 w-3" /> Fluxvex AI insights
                    </p>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-black/40">
                      Illustrative
                    </span>
                  </div>
                  <p className="mt-2.5 min-h-[63px] text-[13px] leading-relaxed text-ink">
                    {typed}
                    <motion.span
                      animate={reduce ? {} : { opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent"
                      aria-hidden="true"
                    />
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {AI_CHIPS.map((chip, i) => (
                      <span
                        key={chip}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors duration-300 ${
                          i === chipIdx ? "bg-accent text-white" : "bg-white text-ink-soft ring-1 ring-black/[0.06]"
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* footer controls */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-5 py-4">
              <span className="text-xs text-ink-soft">Branded for Northbeam Media · fluxvex.app</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white" data-testid="showcase-export-button">
                <Download className="h-3.5 w-3.5" /> Export branded PDF
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

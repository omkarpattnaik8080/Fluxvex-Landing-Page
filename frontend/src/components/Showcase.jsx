import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Download, ChevronDown, Sparkles } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { useTween } from "@/hooks/useTween";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import CrossFade3D from "@/components/three/CrossFade3D";

const fmtUsd = (v) => `$${Math.round(v).toLocaleString("en-US")}`;
const fmtMils = (v) => `${(v / 1e6).toFixed(2)}M`;
const fmtInt = (v) => Math.round(v).toLocaleString("en-US");

const PERIODS = {
  may: {
    label: "May 2025",
    slug: "may-2025",
    days: "Conversions · last 30 days",
    kpis: [
      { label: "Spend", value: 44540, fmt: fmtUsd, note: "-1.8% vs Apr" },
      { label: "Impressions", value: 1110000, fmt: fmtMils, note: "-0.9% vs Apr" },
      { label: "Clicks", value: 32875, fmt: fmtInt, note: "+2.2% vs Apr" },
      { label: "Conversions", value: 1048, fmt: fmtInt, note: "+4.6% vs Apr" },
    ],
    line: "M0 120 C 60 114, 110 122, 160 110 S 260 92, 320 96 S 420 78, 480 80",
    dot: [480, 80],
    channels: [
      ["Google Ads", "$23,940", "44%"],
      ["Meta Ads", "$13,540", "40%"],
      ["GA4 sessions", "—", "16%"],
    ],
    ai: "May closed steady—spend held on plan while conversions climbed as the new landing pages settled in.",
    chips: ["Spend on plan", "Landing pages settling in", "Conversions +4.6% vs Apr"],
  },
  june: {
    label: "June 2025",
    slug: "june-2025",
    days: "Conversions · last 30 days",
    kpis: [
      { label: "Spend", value: 48210, fmt: fmtUsd, note: "+8.2% vs May" },
      { label: "Impressions", value: 1240000, fmt: fmtMils, note: "+11.6% vs May" },
      { label: "Clicks", value: 34880, fmt: fmtInt, note: "+6.1% vs May" },
      { label: "Conversions", value: 1204, fmt: fmtInt, note: "+14.9% vs May" },
    ],
    line: "M0 112 C 40 104, 70 118, 105 96 S 170 58, 210 70 S 280 34, 320 42 S 400 12, 480 14",
    dot: [480, 14],
    channels: [
      ["Google Ads", "$28,140", "46%"],
      ["Meta Ads", "$15,070", "41%"],
      ["GA4 sessions", "—", "13%"],
    ],
    ai: "June delivered the strongest conversion month so far—spend held near plan while Meta efficiency improved for the third week running.",
    chips: ["Spend pacing above plan", "Meta ROAS improving", "Conversions +14.9% vs May"],
  },
  q2: {
    label: "Q2 2025",
    slug: "q2-2025",
    days: "Conversions · last 90 days",
    kpis: [
      { label: "Spend", value: 128760, fmt: fmtUsd, note: "+18.3% vs Q1" },
      { label: "Impressions", value: 3520000, fmt: fmtMils, note: "+21.4% vs Q1" },
      { label: "Clicks", value: 99410, fmt: fmtInt, note: "+17.2% vs Q1" },
      { label: "Conversions", value: 3220, fmt: fmtInt, note: "+24.8% vs Q1" },
    ],
    line: "M0 124 C 80 116, 140 100, 200 92 S 320 64, 380 48 S 440 22, 480 16",
    dot: [480, 16],
    channels: [
      ["Google Ads", "$71,240", "45%"],
      ["Meta Ads", "$50,180", "39%"],
      ["GA4 sessions", "—", "16%"],
    ],
    ai: "Q2 compounded month over month—conversions grew every month while efficiency held within plan.",
    chips: ["Conversions up every month", "Efficiency within plan", "Q2 conversions +24.8% vs Q1"],
  },
};

const PERIOD_ORDER = ["may", "june", "q2"];

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

/* Static layers composition — the base layer beneath the 3D scene */
function LayersLegacy() {
  return (
    <div className="flex h-full items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 300 240" className="h-[82%] w-auto">
        <g transform="rotate(-8 110 130)">
          <rect x="60" y="60" width="130" height="150" rx="12" fill="#F3F2EE" stroke="#E7E5DE" />
        </g>
        <g transform="rotate(-2 150 125)">
          <rect x="85" y="50" width="130" height="150" rx="12" fill="#FFFFFF" stroke="#E7E5DE" />
          <rect x="100" y="70" width="60" height="10" rx="5" fill="#7B5CFF" opacity="0.85" />
          <rect x="100" y="92" width="100" height="7" rx="3.5" fill="rgba(16,16,20,0.14)" />
          <rect x="100" y="106" width="86" height="7" rx="3.5" fill="rgba(16,16,20,0.09)" />
          <rect x="100" y="126" width="40" height="26" rx="6" fill="#10B981" opacity="0.15" />
          <rect x="148" y="126" width="40" height="26" rx="6" fill="#3D43E8" opacity="0.12" />
        </g>
        <g transform="rotate(5 210 130)">
          <rect x="120" y="58" width="120" height="140" rx="12" fill="#FFFFFF" stroke="#E7E5DE" opacity="0.95" />
          <rect x="136" y="78" width="46" height="10" rx="5" fill="#3D43E8" />
          <rect x="136" y="98" width="90" height="7" rx="3.5" fill="rgba(16,16,20,0.12)" />
        </g>
        <circle cx="150" cy="70" r="4" fill="#3D43E8" />
        <circle cx="215" cy="150" r="4" fill="#10B981" />
      </svg>
    </div>
  );
}

/* KPI tile — numbers count up on first view and tween when the period switches */
function Kpi({ kpi, reduce, testid }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const v = useTween(inView ? kpi.value : 0, { duration: 720 });
  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border border-line bg-surface p-4" data-testid={testid}>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">{kpi.label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{kpi.fmt(v)}</p>
      <p className="mt-1 text-[11px] text-accent">{kpi.note}</p>
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-accent/60"
        initial={reduce ? false : { width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function Showcase() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState("june");
  const [exportNote, setExportNote] = useState(false);
  const data = PERIODS[period];
  const typed = useTypewriter(data.ai, { reduce });
  const [chipIdx, setChipIdx] = useState(0);
  /* Autoplay only while the section is on screen — an off-screen interval
     re-renders this whole subtree every couple of seconds and that shows up as
     a dropped frame mid-scroll. */
  const onScreen = useInView(ref, { amount: 0.05 });

  useEffect(() => {
    if (reduce || !onScreen) return undefined;
    const t = setInterval(() => setChipIdx((v) => (v + 1) % data.chips.length), 2200);
    return () => clearInterval(t);
  }, [reduce, data, onScreen]);

  useEffect(() => {
    if (!exportNote) return undefined;
    const t = setTimeout(() => setExportNote(false), 2600);
    return () => clearTimeout(t);
  }, [exportNote]);

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
        copy="One frame holds the whole story: what was spent, what came back, and what it means—labeled, sourced, and ready to send. Switch the period to see the report update itself."
      />
      {/* Iso3D — the report's three layers, exploded; hover fans them apart */}
      <Reveal>
        <div
          className="relative mb-5 overflow-hidden rounded-2xl border border-line bg-[linear-gradient(135deg,#FBFAF6_0%,#F1EFE8_100%)] shadow-[0_40px_90px_-40px_rgba(20,21,122,0.35)]"
          data-testid="showcase-layers-3d"
        >
          <div className="fine-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-accent via-violet-500 to-emerald-400" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            {/* left — the layer index */}
            <div className="relative z-10 px-6 pb-1 pt-6 sm:px-9 sm:pt-8 lg:pb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Three layers, one frame</p>
              <h3 className="mt-3 max-w-xs font-display text-2xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-3xl">
                One report, three working layers.
              </h3>
              <p className="mt-3 max-w-sm text-[13.5px] leading-[1.7] text-ink-soft">
                Connected data feeds Fluxvex AI, which fills the branded delivery your client reads.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  ["#3D43E8", "Connected data"],
                  ["#7B5CFF", "Fluxvex AI"],
                  ["#10B981", "Branded delivery"],
                ].map(([dot, label]) => (
                  <li key={label} className="flex items-center gap-2.5 text-[13px] font-semibold text-ink">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dot }} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line bg-page px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" /> Hover to fan the layers
              </span>
            </div>
            {/* right — the 3D scene (SVG base layer cross-fades into WebGL) */}
            <div className="relative h-[250px] sm:h-[300px] lg:min-h-[400px]">
              <CrossFade3D scene="layers" legacy={<LayersLegacy />} className="absolute inset-0" testid="showcase-layers-3d" />
            </div>
          </div>
        </div>
      </Reveal>
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
            <span className="mx-auto hidden rounded-full border border-line bg-page px-4 py-1 text-[11px] font-medium text-black/50 sm:block" data-testid="showcase-url-pill">
              fluxvex.app/reports/northbeam-media/{data.slug}
            </span>
            <span className="rounded-full bg-accent-tint px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent" data-testid="showcase-sample-badge">
              Sample report · Illustrative data
            </span>
          </div>

          <div className="p-5 sm:p-8">
            {/* selectors — the period tabs are live */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium text-ink">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-accent font-display text-[10px] font-bold text-white">N</span>
                Northbeam Media <ChevronDown className="h-3.5 w-3.5 text-black/40" />
              </span>
              <div className="inline-flex items-center rounded-full border border-line bg-surface p-1" role="tablist" aria-label="Reporting period" data-testid="showcase-period-tabs">
                {PERIOD_ORDER.map((key) => {
                  const active = period === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPeriod(key)}
                      className="relative rounded-full px-3.5 py-1 text-xs font-semibold"
                      data-testid={`showcase-period-tab-${key}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="showcase-period-pill"
                          className="absolute inset-0 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className={`relative transition-colors ${active ? "text-white" : "text-ink-soft hover:text-ink"}`}>{PERIODS[key].label}</span>
                    </button>
                  );
                })}
              </div>
              <span className="ml-auto hidden items-center gap-2 text-xs text-ink-soft sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> White-label enabled
              </span>
            </div>

            {/* KPIs — count up on view, tween between periods */}
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {data.kpis.map((kpi) => (
                <Kpi
                  key={kpi.label}
                  kpi={kpi}
                  reduce={reduce}
                  testid={`showcase-kpi-${kpi.label.toLowerCase().replace(/\s+/g, "-")}`}
                />
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-5">
              {/* trend */}
              <div className="rounded-xl border border-line bg-surface p-5 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Performance trend</p>
                  <p className="text-[11px] text-black/40">{data.days}</p>
                </div>
                <motion.svg
                  key={period}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewBox="0 0 480 140"
                  className="mt-3 w-full"
                  role="img"
                  aria-label="Conversions trend across the selected period"
                >
                  <defs>
                    <linearGradient id="showArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3D43E8" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="#3D43E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[30, 70, 110].map((y) => (
                    <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(16,16,20,0.06)" strokeWidth="1" />
                  ))}
                  <motion.path
                    d={`${data.line} L 480 140 L 0 140 Z`}
                    fill="url(#showArea)"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.45 }}
                  />
                  {/* glow under-stroke */}
                  <motion.path
                    d={data.line}
                    fill="none"
                    stroke="#3D43E8"
                    strokeWidth="7"
                    strokeLinecap="round"
                    opacity="0.13"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <motion.path
                    d={data.line}
                    fill="none"
                    stroke="#3D43E8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx={data.dot[0]}
                    cy={data.dot[1]}
                    r={4}
                    fill="#3D43E8"
                    initial={reduce ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 14 }}
                  />
                </motion.svg>
              </div>

              {/* channels + insight */}
              <div className="space-y-3 lg:col-span-2">
                <div className="rounded-xl border border-line bg-surface p-5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-black/45">Channel comparison</p>
                  <div className="mt-3 space-y-2.5">
                    {data.channels.map(([name, val, w], i) => (
                      <div key={name}>
                        <div className="flex items-center justify-between text-xs text-ink-soft">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ["#3D43E8", "#7B5CFF", "#10B981"][i] }} aria-hidden="true" />
                            {name}
                          </span>
                          <span className="font-medium text-ink">{val}</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-black/[0.07]">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: ["#3D43E8", "#7B5CFF", "#10B981"][i] }}
                            initial={false}
                            animate={{ width: w }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-accent-border bg-accent-tint/60 p-5" data-testid="showcase-ai-insights">
                  {typed.length < data.ai.length && !reduce && (
                    <motion.span
                      className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/[0.08] to-transparent"
                      animate={{ x: ["-120%", "320%"] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                      <motion.span
                        animate={typed.length < data.ai.length && !reduce ? { opacity: [1, 0.35, 1] } : {}}
                        transition={{ duration: 0.9, repeat: Infinity }}
                      >
                        <Sparkles className="h-3 w-3" />
                      </motion.span>
                      Fluxvex AI insights
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
                    {data.chips.map((chip, i) => (
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
              <span className="text-xs text-ink-soft">
                {exportNote ? (
                  <motion.span
                    key="note"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-accent"
                    data-testid="showcase-export-note"
                  >
                    Sample report — exports unlock at launch.
                  </motion.span>
                ) : (
                  `Branded for Northbeam Media · fluxvex.app`
                )}
              </span>
              <TapCTA
                onClick={() => setExportNote(true)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-strong"
                testid="showcase-export-button"
              >
                <Download className="h-3.5 w-3.5" /> Export branded PDF
              </TapCTA>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

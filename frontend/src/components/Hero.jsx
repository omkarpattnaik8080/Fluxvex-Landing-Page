import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, CalendarDays, CalendarClock, Lock, Plus, Check, Trophy, Sparkles } from "lucide-react";
import CinematicText from "@/components/ui/CinematicText";
import { useWaitlist } from "@/components/WaitlistContext";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

function CornerFastener({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#23279E] shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.35)] ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-white/70" />
    </span>
  );
}

function CountUp({ value, decimals = 0, prefix = "", suffix = "", delay = 0 }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now() + delay * 1000;
    const dur = 1100;
    const tick = (t) => {
      const p = Math.min(1, Math.max(0, (t - start) / dur));
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay, reduce]);

  return (
    <>
      {prefix}
      {n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </>
  );
}

const KPIS = [
  { label: "Spend", value: 48210, prefix: "$", decimals: 0, suffix: "", delta: "+8.2%" },
  { label: "Impressions", value: 1.24, prefix: "", decimals: 2, suffix: "M", delta: "+11.6%" },
  { label: "Clicks", value: 34880, prefix: "", decimals: 0, suffix: "", delta: "+6.1%" },
  { label: "Conversions", value: 1204, prefix: "", decimals: 0, suffix: "", delta: "+14.9%" },
];

const CHANNELS = [
  ["Google Ads", "58%", 58],
  ["Meta Ads", "31%", 31],
  ["GA4 sessions", "11%", 11],
];

function ReportPreview() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-3xl" data-testid="hero-report-preview">
      {/* integration markers + connection lines */}
      <div className="pointer-events-none absolute -top-11 left-0 right-0 z-20 hidden justify-between px-10 md:flex" aria-hidden="true">
        {[
          { mark: <GoogleAdsMark size={16} />, label: "Google Ads" },
          { mark: <MetaMark size={16} />, label: "Meta Ads" },
          { mark: <GA4Mark size={16} />, label: "GA4" },
        ].map((c, i) => (
          <div key={c.label} className={`flex flex-col items-center ${i === 0 ? "items-start pl-2" : i === 2 ? "items-end pr-2" : ""}`}>
            <span className="flex items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-3 text-[11px] font-medium text-ink shadow-[0_14px_30px_-10px_rgba(0,0,0,0.4)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface">{c.mark}</span>
              {c.label}
            </span>
            <svg width="2" height="20" className="overflow-visible">
              <line x1="1" y1="0" x2="1" y2="20" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeDasharray="4 5" className="animate-dash-flow" />
            </svg>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white text-left shadow-[0_40px_90px_-24px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-black/[0.07] bg-[#FAFAF8] px-4 py-2.5">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E0]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8E6E0]" />
          </div>
          <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-black/50 ring-1 ring-black/[0.06] sm:text-[11px]">
            <Lock className="h-3 w-3 shrink-0" />
            <span className="truncate">fluxvex.app/reports/northbeam-june</span>
          </span>
          <span className="w-10 shrink-0" />
        </div>

        <div className="p-4 sm:p-6">
          {/* header */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-white">N</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">Northbeam Media</p>
              <p className="text-[11px] text-black/45">Agency report · Jun 1 – Jun 30, 2025</p>
            </div>
            <span className="ml-auto flex items-center gap-2">
              <span className="hidden rounded-full border border-black/[0.08] px-3 py-1 text-[11px] font-medium text-black/60 sm:inline">June 2025 ▾</span>
              <span className="rounded-full bg-accent-tint px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">Sample report</span>
            </span>
          </div>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-4">
            {KPIS.map((k, i) => (
              <motion.div
                key={k.label}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={reduce ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.25 + i * 0.09, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-lg border border-black/[0.07] bg-[#FAFAF8] p-3"
              >
                <p className="text-[10.5px] font-medium uppercase tracking-wide text-black/45">{k.label}</p>
                <p className="mt-1 font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                  <CountUp value={k.value} decimals={k.decimals} prefix={k.prefix} suffix={k.suffix} delay={1.35 + i * 0.09} />
                </p>
                <p className="text-[10.5px] font-medium text-[#0E8A3E]">{k.delta}</p>
              </motion.div>
            ))}
          </div>

          {/* chart + channels */}
          <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-5">
            <div className="rounded-lg border border-black/[0.07] p-3 sm:col-span-3">
              <p className="text-[10.5px] font-medium uppercase tracking-wide text-black/45">Performance trend</p>
              <svg viewBox="0 0 300 90" className="mt-2 w-full" role="img" aria-label="Performance trend chart with an upward trajectory">
                <defs>
                  <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3D43E8" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="#3D43E8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[18, 42, 66].map((y) => (
                  <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#EEECE6" strokeWidth="1" />
                ))}
                <motion.path
                  d="M0 70 C 30 62, 45 74, 70 60 S 115 34, 140 44 S 190 20, 215 26 S 265 8, 300 10 L 300 90 L 0 90 Z"
                  fill="url(#heroArea)"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={reduce ? {} : { opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                />
                <motion.path
                  d="M0 70 C 30 62, 45 74, 70 60 S 115 34, 140 44 S 190 20, 215 26 S 265 8, 300 10"
                  fill="none"
                  stroke="#3D43E8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={reduce ? {} : { pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 1.4, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="300"
                  cy="10"
                  r="3.5"
                  fill="#3D43E8"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={reduce ? {} : { opacity: 1 }}
                  transition={{ delay: 2.9 }}
                />
              </svg>
            </div>
            <div className="space-y-2 rounded-lg border border-black/[0.07] p-3 sm:col-span-2">
              <p className="text-[10.5px] font-medium uppercase tracking-wide text-black/45">Channel mix</p>
              {CHANNELS.map(([label, pct, w], i) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-[11px] text-black/60">
                    <span>{label}</span>
                    <span className="font-medium text-black/80">{pct}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={reduce ? false : { width: 0 }}
                      animate={reduce ? {} : { width: `${w}%` }}
                      transition={{ duration: 0.9, delay: 1.7 + i * 0.12, ease: [0.19, 1, 0.22, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* top campaign */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dashed border-black/[0.12] bg-[#FAFAF8] px-3 py-2"
            data-testid="hero-top-campaign"
          >
            <span className="flex items-center gap-2 text-[11px] font-medium text-ink">
              <Trophy className="h-3.5 w-3.5 text-accent" /> Top campaign · Summer Sale (Search)
            </span>
            <span className="rounded-full bg-accent-tint px-2.5 py-0.5 text-[10.5px] font-semibold text-accent">412 conversions</span>
          </motion.div>

          {/* delivery info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border border-black/[0.07] px-3 py-2 text-[11px] text-black/55"
          >
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-black/35" /> Period · Jun 1 – Jun 30
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock className="h-3.5 w-3.5 text-black/35" /> Next report · Jul 1
            </span>
            <span className="ml-auto flex items-center gap-1.5 font-medium text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Auto-delivery on
            </span>
          </motion.div>

          {/* footer */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-dashed border-black/[0.12] px-3 py-2.5"
          >
            <span className="flex items-center gap-2 text-[11px] font-medium text-black/55">
              <Plus className="h-3.5 w-3.5 text-accent" /> White-label: branded for Northbeam Media
            </span>
            <span className="rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold text-white">Export report</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Floating AI insight stream — typewriter cycling through analysis notes */
const AI_INSIGHTS = [
  "Drafting June performance summary…",
  "Spend pacing 12% above plan — flagged.",
  "Meta ROAS improving 3 weeks in a row.",
  "GA4 conversions +14.9% vs May.",
];

function AiInsightStream() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const full = AI_INSIGHTS[idx];
    if (chars < full.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 32);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setChars(0);
      setIdx((i) => (i + 1) % AI_INSIGHTS.length);
    }, 2200);
    return () => clearTimeout(t);
  }, [chars, idx, reduce]);

  const text = reduce ? AI_INSIGHTS[idx] : AI_INSIGHTS[idx].slice(0, chars);

  return (
    <motion.div
      animate={reduce ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay: 0.9, ease: "easeInOut" }}
      className="pointer-events-none absolute right-6 top-[42%] z-20 hidden w-64 rounded-xl bg-white p-3.5 text-left shadow-[0_24px_50px_-16px_rgba(0,0,0,0.45)] xl:block"
      data-testid="hero-ai-insight"
    >
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
        <Sparkles className="h-3 w-3" /> Fluxvex AI insight
      </span>
      <p className="mt-1.5 min-h-[32px] text-[12px] leading-snug text-ink">
        {text}
        <motion.span
          animate={reduce ? {} : { opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] bg-accent"
          aria-hidden="true"
        />
      </p>
      <span className="mt-1.5 flex items-center gap-1.5 text-[10px] text-black/45">
        <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Analyzing connected accounts
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const { openWaitlist } = useWaitlist();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const float = (d = 0) =>
    reduce
      ? {}
      : { animate: { y: [0, -8, 0] }, transition: { duration: 6, repeat: Infinity, delay: d, ease: "easeInOut" } };

  return (
    <section ref={ref} className="px-2 pt-2 sm:px-2.5" data-testid="hero-section">
      <div className="grain relative overflow-hidden rounded-2xl bg-[#14141C]">
        {/* textured background */}
        <img
          src="/hero-texture.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A16]/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_50%,rgba(5,5,15,0.5)_100%)]" aria-hidden="true" />

        <CornerFastener className="left-3 top-3" />
        <CornerFastener className="right-3 top-3" />
        <CornerFastener className="bottom-3 left-3" />
        <CornerFastener className="bottom-3 right-3" />

        {/* floating decorations */}
        <motion.div
          {...float(0.4)}
          className="pointer-events-none absolute left-8 top-[54%] hidden h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-mint to-[#2BBE5C] shadow-[0_18px_40px_-10px_rgba(0,0,0,0.45)] md:flex"
          aria-hidden="true"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 15c2.5-6 5-6 8 0s5.5 6 8 0" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div
          {...float(1.6)}
          className="pointer-events-none absolute left-8 top-[64%] hidden w-40 rotate-[-8deg] bg-note p-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)] xl:block"
          aria-hidden="true"
        >
          <p className="font-hand text-xl leading-tight text-ink">reports assemble themselves—reporting day, automated.</p>
        </motion.div>

        <motion.div
          {...float(2.4)}
          className="pointer-events-none absolute right-6 top-[63%] hidden w-52 rotate-2 items-center gap-3 rounded-xl bg-white p-3.5 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.45)] md:flex"
          aria-hidden="true"
        >
          <FluxvexMark size={36} />
          <span>
            <span className="block text-[13px] font-semibold text-ink">June report is ready</span>
            <span className="block text-[11px] text-black/50">Branded & client-ready</span>
          </span>
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-mint">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
        </motion.div>

        <AiInsightStream />

        <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-24 text-center sm:px-8 sm:pt-28 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm"
            data-testid="hero-eyebrow"
          >
            Automated client reporting for agencies
            <span className="rounded-full bg-mint px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">Pre-launch</span>
          </motion.p>

          <CinematicText
            as="h1"
            className="mx-auto mt-7 max-w-4xl font-display text-[44px] font-semibold leading-[0.98] tracking-tightest text-white sm:text-6xl lg:text-[72px]"
          >
            {["Client reporting,", "on autopilot."]}
          </CinematicText>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.65] text-white/85 sm:text-lg sm:leading-7"
            data-testid="hero-subcopy"
          >
            Turn Google Ads, Meta Ads, and GA4 data into polished, on-brand client
            reports—without rebuilding spreadsheets and slides every reporting cycle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => openWaitlist("hero")}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 font-display text-sm font-semibold text-ink transition-all hover:gap-3 hover:bg-white/90"
              data-testid="hero-join-waitlist-button"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#workflow"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 font-display text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              data-testid="hero-see-how-it-works-link"
            >
              See how it works
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-4 text-xs text-white/60"
          >
            Get product updates and early-access details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 64, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.75, ease: [0.19, 1, 0.22, 1] }}
            style={{ y: cardY, transformPerspective: 1200 }}
            className="mt-14 sm:mt-16"
          >
            <ReportPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

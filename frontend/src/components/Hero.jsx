import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, CalendarDays, CalendarClock, Lock, Palette, Plus, Check, Trophy, Sparkles } from "lucide-react";
import { useWaitlist } from "@/components/WaitlistContext";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* Live social proof — real signup count from the DB; hidden entirely when zero. */
function SignupPulse() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let alive = true;
    axios
      .get(`${API}/waitlist/count`)
      .then((r) => {
        if (alive && r.data && Number.isFinite(r.data.count)) setCount(r.data.count);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (count <= 0) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.45 }}
      className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur-sm"
      data-testid="hero-social-proof"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
      </span>
      <span>
        <span className="font-display font-semibold text-white">
          <CountUp value={count} delay={1.5} />
        </span>{" "}
        {count === 1 ? "agency is" : "agencies are"} already on the list
      </span>
    </motion.p>
  );
}

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
  { label: "Spend", value: 48210, prefix: "$", decimals: 0, suffix: "", delta: "+8.2%", spark: [14, 12, 15, 13, 17, 16, 19] },
  { label: "Impressions", value: 1.24, prefix: "", decimals: 2, suffix: "M", delta: "+11.6%", spark: [10, 13, 12, 16, 15, 18, 20] },
  { label: "Clicks", value: 34880, prefix: "", decimals: 0, suffix: "", delta: "+6.1%", spark: [12, 11, 14, 15, 14, 17, 18] },
  { label: "Conversions", value: 1204, prefix: "", decimals: 0, suffix: "", delta: "+14.9%", spark: [9, 12, 11, 15, 17, 16, 21] },
];

const CHANNELS = [
  ["Google Ads", "58%", 58, GoogleAdsMark],
  ["Meta Ads", "31%", 31, MetaMark],
  ["GA4 sessions", "11%", 11, GA4Mark],
];

function Spark({ points, delay = 0 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points
    .map((p, i) => `${(i / (points.length - 1)) * 60 + 2},${17 - ((p - min) / (max - min || 1)) * 13}`)
    .join(" ");
  return (
    <svg viewBox="0 0 64 20" className="h-5 w-16 shrink-0" aria-hidden="true">
      <motion.polyline
        points={pts}
        fill="none"
        stroke="#0E8A3E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

function ReportPreview() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-4xl" data-testid="hero-report-preview">
      {/* ambient glow behind the dashboard */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -top-8 bottom-0 rounded-[40px] bg-[radial-gradient(55%_60%_at_50%_30%,rgba(93,99,255,0.4),transparent_72%)] blur-2xl"
      />
      {/* hairline corner ticks — draw on load */}
      <svg
        className="pointer-events-none absolute -inset-2 z-30 h-[calc(100%+16px)] w-[calc(100%+16px)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {[
          "M3 14 V5 Q3 3 5 3 H14",
          "M86 3 H95 Q97 3 97 5 V14",
          "M97 86 V95 Q97 97 95 97 H86",
          "M14 97 H5 Q3 97 3 95 V86",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="rgba(61,67,232,0.6)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 1.2 + i * 0.16 }}
          />
        ))}
      </svg>

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

      <div className="relative overflow-hidden rounded-xl bg-white text-left shadow-[0_40px_90px_-24px_rgba(0,0,0,0.6)] ring-1 ring-black/10">
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
          {/* brand gradient edge */}
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-[#8A5CFF] to-mint" />

          {/* header */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ink to-[#2A2F55] font-display text-sm font-bold text-white shadow-[0_10px_22px_-8px_rgba(16,16,20,0.6)]">N</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">Northbeam Media</p>
              <p className="text-[11px] text-black/45">Agency report · Jun 1 – Jun 30, 2025</p>
            </div>
            <span className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-1 text-[11px] font-medium text-black/60 sm:inline-flex">June 2025 <span className="text-[8px] text-black/35">▾</span></span>
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
                className="group/kpi rounded-xl border border-black/[0.07] bg-gradient-to-b from-white to-[#F8F8F4] p-3.5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_16px_32px_-18px_rgba(61,67,232,0.5)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10.5px] font-medium uppercase tracking-wide text-black/45">{k.label}</p>
                  <Spark points={k.spark} delay={1.6 + i * 0.1} />
                </div>
                <p className="mt-1.5 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  <CountUp value={k.value} decimals={k.decimals} prefix={k.prefix} suffix={k.suffix} delay={1.35 + i * 0.09} />
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[10.5px] font-semibold text-[#0E8A3E]">
                  <span aria-hidden="true">▲</span> {k.delta} <span className="font-normal text-black/35">vs May</span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* chart + channels */}
          <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-5">
            <div className="rounded-xl border border-black/[0.07] p-3.5 sm:col-span-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10.5px] font-medium uppercase tracking-wide text-black/45">Performance trend</p>
                <span className="flex items-center gap-3 text-[10px] font-medium text-black/45" aria-hidden="true">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Conversions</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-black/25" /> Last period</span>
                </span>
              </div>
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
                  d="M0 76 C 40 72, 70 74, 110 66 S 190 58, 230 48 S 275 40, 300 34"
                  fill="none"
                  stroke="#B9BCC9"
                  strokeWidth="1.8"
                  strokeDasharray="4 5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={reduce ? {} : { pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 1.7, ease: "easeInOut" }}
                />
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
            <div className="space-y-2.5 rounded-xl border border-black/[0.07] p-3.5 sm:col-span-2">
              <p className="text-[10.5px] font-medium uppercase tracking-wide text-black/45">Channel mix</p>
              {CHANNELS.map(([label, pct, w, Mark], i) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5 text-[11px] text-black/60">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface ring-1 ring-black/[0.05]"><Mark size={9} /></span>
                    <span>{label}</span>
                    <span className="ml-auto font-semibold text-black/80">{pct}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-[#8A90FF]"
                      initial={reduce ? false : { width: 0 }}
                      animate={reduce ? {} : { width: `${w}%` }}
                      transition={{ duration: 0.9, delay: 1.7 + i * 0.12, ease: [0.19, 1, 0.22, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI summary strip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.15 }}
            className="mt-2.5 flex items-start gap-2.5 rounded-xl border border-accent/20 bg-gradient-to-r from-accent-tint/80 to-accent-tint/30 px-3.5 py-3"
            data-testid="hero-ai-summary"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-white shadow-[0_8px_18px_-6px_rgba(61,67,232,0.7)]">
              <Sparkles className="h-3 w-3" />
            </span>
            <p className="text-[11.5px] leading-relaxed text-ink/80">
              <span className="font-semibold text-accent">Fluxvex AI ·</span> Conversions hit a monthly high while spend
              stayed near plan—Meta ROAS is trending up three weeks in a row.
            </p>
            <span className="ml-auto hidden shrink-0 items-center gap-1 self-start rounded-full border border-accent/25 bg-white/70 px-2 py-0.5 text-[9px] font-semibold text-accent sm:inline-flex">AI-drafted</span>
          </motion.div>

          {/* top campaign + delivery */}
          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1 }}
              className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-black/[0.12] bg-[#FAFAF8] px-3.5 py-2.5"
              data-testid="hero-top-campaign"
            >
              <span className="flex items-center gap-2 text-[11px] font-medium text-ink">
                <Trophy className="h-3.5 w-3.5 text-accent" /> Top campaign · Summer Sale (Search)
              </span>
              <span className="rounded-full bg-accent-tint px-2.5 py-0.5 text-[10.5px] font-semibold text-accent">412 conversions</span>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="flex flex-wrap items-center gap-x-3.5 gap-y-1 rounded-xl border border-black/[0.07] bg-[#FAFAF8] px-3.5 py-2.5 text-[11px] text-black/55"
            >
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-black/35" /> Jun 1 – Jun 30
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-black/35" /> Next · Jul 1
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-medium text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Auto-delivery on
              </span>
            </motion.div>
          </div>

          {/* footer */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed border-black/[0.12] px-3.5 py-2.5"
          >
            <span className="flex items-center gap-2 text-[11px] font-medium text-black/55">
              <Plus className="h-3.5 w-3.5 text-accent" /> White-label: branded for Northbeam Media
            </span>
            <span className="rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-black">Export report</span>
          </motion.div>
        </div>
      </div>

      {/* glass companions anchored to the dashboard */}
      {/* white-label (left margin, xl+) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.35, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="absolute -left-[118px] top-[14%] z-20 hidden xl:block"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -9, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, delay: 1.8, ease: "easeInOut" }}
          className={`relative w-56 rotate-[-1.5deg] ${GLASS_CARD}`}
          data-testid="hero-brand-card"
        >
          <span aria-hidden="true" className={GLASS_EDGE} />
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">
            <Palette className="h-3 w-3 text-accent" /> White-label ready
          </span>
          <span className="mt-2.5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/90 font-display text-[9px] font-bold text-ink">N</span>
            <span className="text-[11.5px] font-semibold text-ink">Northbeam Media</span>
            <span className="ml-auto flex gap-1" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3D43E8]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F5D748]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#0E8A3E]" />
            </span>
          </span>
          <span className="mt-2 block text-[10.5px] leading-snug text-black/50">Logo, palette, and voice applied to every report automatically.</span>
        </motion.div>
      </motion.div>

      {/* delivery (left margin, lower, xl+) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.55, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="absolute -left-[112px] bottom-[12%] z-20 hidden xl:block"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2.6, ease: "easeInOut" }}
          className={`relative w-56 rotate-[1.5deg] ${GLASS_CARD}`}
          data-testid="hero-delivery-card"
        >
          <span aria-hidden="true" className={GLASS_EDGE} />
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">
              <CalendarClock className="h-3 w-3 text-black/35" /> Auto-delivery
            </span>
            <span className="flex items-center gap-1 text-[9px] font-semibold text-[#0E8A3E]">
              <span className="h-1 w-1 rounded-full bg-mint animate-pulse-dot" /> Auto-on
            </span>
          </span>
          <span className="mt-2.5 flex items-center justify-between">
            <span className="text-[11.5px] font-semibold text-ink">Next report · Jul 1</span>
            <span className="rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 text-[9.5px] font-semibold text-[#A3A8FF]">in 3 days</span>
          </span>
          <span className="mt-2 block h-1 overflow-hidden rounded-full bg-black/[0.08]" aria-hidden="true">
            <motion.span
              className="block h-full rounded-full bg-gradient-to-r from-accent to-[#8A90FF]"
              initial={reduce ? false : { width: "10%" }}
              animate={reduce ? {} : { width: "72%" }}
              transition={{ duration: 1.4, delay: 2, ease: [0.19, 1, 0.22, 1] }}
            />
          </span>
        </motion.div>
      </motion.div>

      {/* report-ready toast (bottom-left corner overlap) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.45, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="absolute right-[-168px] bottom-[10%] z-30 hidden xl:block"
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, -9, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, delay: 2.4, ease: "easeInOut" }}
          className={`relative w-56 rotate-2 ${GLASS_CARD}`}
          data-testid="hero-report-toast"
        >
          <span aria-hidden="true" className={GLASS_EDGE} />
          <span className="flex items-center gap-2.5">
            <FluxvexMark size={32} />
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold leading-tight text-ink">June report is ready</span>
              <span className="block text-[10.5px] text-black/50">Branded & client-ready</span>
            </span>
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-mint shadow-[0_6px_14px_-4px_rgba(67,214,117,0.7)]">
              <Check className="h-3 w-3 text-ink" strokeWidth={3} />
            </span>
          </span>
          <span className="mt-2.5 flex gap-1.5">
            <span className="rounded-full border border-mint/40 bg-mint/10 px-2 py-0.5 text-[9.5px] font-semibold text-[#0E8A3E]">Leads +18.5%</span>
            <span className="rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 text-[9.5px] font-semibold text-[#A3A8FF]">ROAS 2.4x</span>
          </span>
          <span className="mt-2 flex items-center gap-1.5 text-[10px] text-black/45">
            <CalendarClock className="h-3 w-3" /> Scheduled send · Jul 1, 9:00
          </span>
        </motion.div>
      </motion.div>

      <AiInsightStream />
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

const GLASS_CARD =
  "rounded-2xl border border-white/50 bg-white/60 p-4 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/40 backdrop-blur-2xl";
const GLASS_EDGE = "absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent";

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
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.25, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="absolute right-[-176px] top-[8%] z-30 hidden xl:block"
      data-testid="hero-ai-insight"
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.6, ease: "easeInOut" }}
        className={`relative w-60 rotate-[-1deg] ${GLASS_CARD}`}
      >
        <span aria-hidden="true" className={GLASS_EDGE} />
        <span className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">
            <Sparkles className="h-3 w-3 text-accent" /> Fluxvex AI insight
          </span>
          <span className="shrink-0 rounded-full border border-accent/25 bg-accent-tint px-2 py-0.5 text-[9px] font-semibold text-accent">Review queue</span>
        </span>
        <p className="mt-2 min-h-[32px] text-[12px] leading-snug text-ink">
          {text}
          <motion.span
            animate={reduce ? {} : { opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] bg-accent"
            aria-hidden="true"
          />
        </p>
        <span className="mt-2.5 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[10px] text-black/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> Analyzing accounts
          </span>
          <span className="rounded-full border border-black/[0.08] bg-surface px-2 py-0.5 text-[9.5px] font-semibold text-ink-soft">Approve to include</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/* GSAP marquee headline — the same continuous motion as the backers band */
function HeadlineMarquee() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduce) return undefined;
    gsap.set(track, { force3D: true });
    const tween = gsap.to(track, { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
    tweenRef.current = tween;
    return () => {
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduce]);

  const phrase = (k) => (
    <span key={k} className="flex shrink-0 items-center font-display text-[44px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-6xl lg:text-7xl">
      <span className="whitespace-nowrap px-4 sm:px-6">Client reporting,</span>
      <FluxvexMark size={36} className="shrink-0 rounded-xl" />
      <span className="whitespace-nowrap px-4 sm:px-6">on autopilot.</span>
      <FluxvexMark size={36} className="shrink-0 rounded-xl" />
    </span>
  );

  return (
    <h1 className="relative overflow-hidden" aria-label="Client reporting, on autopilot" data-testid="hero-headline">
      {reduce ? (
        <span className="block text-center font-display text-[44px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-7xl">
          Client reporting, on autopilot.
        </span>
      ) : (
        <>
          <span className="sr-only">Client reporting, on autopilot.</span>
          <div ref={trackRef} className="flex w-max items-center will-change-transform">
            {[0, 1].map((half) => (
              <div key={half} aria-hidden={half === 1} className="flex shrink-0 items-center">
                {phrase(`${half}-a`)}
                {phrase(`${half}-b`)}
              </div>
            ))}
          </div>
        </>
      )}
    </h1>
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

        <div className="relative mx-auto max-w-5xl px-5 pb-14 pt-24 text-center sm:px-8 sm:pt-28 lg:pb-20">
          <motion.p
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } } }}
            className="group relative mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 overflow-hidden rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:flex-nowrap"
            data-testid="hero-eyebrow"
          >
            {"Automated client reporting for agencies".split(" ").map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 340, damping: 24 } },
                }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.7 }}
              className="relative inline-flex items-center gap-1 overflow-hidden rounded-full bg-mint px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
            >
              <span className="h-1 w-1 rounded-full bg-white animate-pulse-dot" aria-hidden="true" />
              Pre-launch
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ x: ["-160%", "380%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.6 }}
              />
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: ["-140%", "440%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 4.2 }}
            />
          </motion.p>

          <div className="mt-7">
            <HeadlineMarquee />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mx-auto mt-6 max-w-xl font-display text-[17px] font-normal leading-[1.6] tracking-[-0.005em] text-white/85 sm:text-xl sm:leading-[1.6]"
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
            <motion.button
              onClick={() => openWaitlist("hero")}
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-white px-6 font-display text-sm font-semibold text-ink shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]"
              data-testid="hero-join-waitlist-button"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[340%] group-hover:opacity-100" />
              </span>
              <span className="relative">Join the waitlist</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            <motion.a
              href="#workflow"
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-white/35 bg-white/10 px-6 font-display text-sm font-semibold text-white backdrop-blur-sm"
              data-testid="hero-see-how-it-works-link"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[340%] group-hover:opacity-100" />
              </span>
              <span className="relative">See how it works</span>
              <ArrowDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-4 text-xs text-white/60"
          >
            Get product updates and early-access details.
            <span className="mt-1.5 flex items-center justify-center gap-1.5 text-[13px] font-medium text-white/75">
              <Check className="h-3.5 w-3.5 text-mint" strokeWidth={2.6} />
              Free to join — no credit card needed
            </span>
          </motion.p>

          <SignupPulse />

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

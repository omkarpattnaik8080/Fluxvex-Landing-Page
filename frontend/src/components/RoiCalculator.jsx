import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check, Clock3, Copy, Info, Lock } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { useTween } from "@/hooks/useTween";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const fmt = (n) => Math.round(n).toLocaleString("en-US");

/* Labeled field + slim slider with a display-grade value readout */
function FieldSlider({ id, label, value, suffix, min, max, step, set, testid }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="group/field rounded-xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-accent/35 hover:shadow-[0_18px_36px_-24px_rgba(61,67,232,0.45)]">
      <div className="flex items-center justify-between gap-3">
        <label className="text-xs font-medium text-ink-soft" htmlFor={id}>
          {label}
        </label>
        <span className="font-display text-lg font-semibold tracking-tight text-ink" data-testid={`${testid}-value`}>
          {value} <span className="text-xs font-normal text-ink-soft">{suffix}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="range-light mt-3 w-full"
        style={{ background: `linear-gradient(90deg, #3D43E8 ${pct}%, rgba(16,16,20,0.08) ${pct}%)` }}
        data-testid={testid}
      />
    </div>
  );
}

/* Floating tile cluster — the channels feeding the engine (instant SVG, no WebGL) */
function CalculatorArt() {
  const float = (delay) => ({
    animate: { y: [0, -5, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay },
  });
  return (
    <div className="pointer-events-none absolute right-7 top-9 hidden select-none items-center gap-2.5 sm:flex" aria-hidden="true">
      <motion.span {...float(0)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white shadow-[0_14px_28px_-14px_rgba(16,16,20,0.35)]">
        <GoogleAdsMark size={20} />
      </motion.span>
      <motion.span {...float(0.45)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white shadow-[0_14px_28px_-14px_rgba(16,16,20,0.35)]">
        <MetaMark size={20} />
      </motion.span>
      <motion.span {...float(0.9)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white shadow-[0_14px_28px_-14px_rgba(16,16,20,0.35)]">
        <GA4Mark size={20} />
      </motion.span>
      <svg width="26" height="10" viewBox="0 0 26 10" className="text-accent/50" aria-hidden="true">
        <line x1="0" y1="5" x2="26" y2="5" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 4" className="animate-dash-flow" />
      </svg>
      <motion.span {...float(1.3)} className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_18px_36px_-14px_rgba(61,67,232,0.6)] ring-1 ring-accent/30">
        <FluxvexMark size={24} />
        <motion.span
          className="absolute inset-0 rounded-xl border-2 border-accent/40"
          animate={{ scale: [1, 1.28], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.span>
    </div>
  );
}

/* Animated savings ring — the hero output of the whole calculator */
function RingGauge({ pct, saved }) {
  const R = 52;
  const CIRC = 2 * Math.PI * R;
  return (
    <div className="relative h-[150px] w-[150px] shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#43D675" />
            <stop offset="100%" stopColor="#0E8A3E" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(16,16,20,0.07)" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: CIRC * (1 - pct / 100) }}
          transition={{ type: "spring", stiffness: 55, damping: 18 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" data-testid="roi-gauge">
        <motion.span
          key={pct}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0E8A3E]"
        >
          {pct}% less effort
        </motion.span>
        <p className="mt-1.5 font-display text-[26px] font-bold leading-none tracking-tight text-ink" data-testid="roi-saved-output">
          {fmt(saved)}
          <span className="text-sm font-medium text-ink-soft"> h</span>
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft">returned / year</p>
      </div>
    </div>
  );
}

function CardTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-tint">
        <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
      </span>
      <h3 className="text-sm font-semibold text-ink">{children}</h3>
    </div>
  );
}

export default function RoiCalculator() {
  const [clients, setClients] = useState(8);
  const [hours, setHours] = useState(3);
  const [perMonth, setPerMonth] = useState(2);
  const [reduction, setReduction] = useState(40);
  const [copied, setCopied] = useState(false);

  const monthly = clients * hours * perMonth;
  const annual = monthly * 12;
  const saved = Math.round((annual * reduction) / 100);
  const staysManual = annual - saved;
  const workdaysBack = Math.round(saved / 8);

  const monthlyView = useTween(monthly);
  const annualView = useTween(annual);
  const savedView = useTween(saved);
  const staysView = useTween(staysManual);
  const workdaysBackView = useTween(workdaysBack);

  const copyResult = () => {
    const text = `Manual reporting: ${fmt(monthly)} h/month (${fmt(annual)} h a year). With Fluxvex at ${reduction}% less effort: ${fmt(saved)} hours — about ${fmt(workdaysBack)} full workdays — returned every year.`;
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (e) {
        /* noop */
      }
      done();
    }
  };

  return (
    <SectionShell id="calculator">
      <Reveal>
        <div
          className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_60px_120px_-60px_rgba(20,21,122,0.45)]"
          data-testid="roi-calculator"
        >
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-5 py-3 sm:px-8">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-pulse-dot" aria-hidden="true" />
                Live tool
              </span>
              <span className="truncate text-sm font-medium text-ink">Reporting cost calculator</span>
              <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0E8A3E]">Free</span>
            </div>
            <button
              type="button"
              onClick={copyResult}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors duration-150 hover:bg-surface"
              data-testid="roi-copy-result"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#0E8A3E]" strokeWidth={2.4} /> : <Copy className="h-3.5 w-3.5 text-ink-soft" strokeWidth={2} />}
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>

          <div className="grid lg:grid-cols-[1.04fr_1fr]">
            {/* inputs */}
            <div className="relative p-7 sm:p-10">
              <CalculatorArt />

              <h2 className="max-w-xs font-display text-[34px] font-semibold leading-[1.1] tracking-tighter2 text-ink sm:text-4xl">
                Set your reporting
                <br />
                cost with <span className="text-accent-soft">confidence.</span>
              </h2>
              <p className="mt-3 text-sm text-ink-soft">Understand your team’s effort in today’s market.</p>

              <h3 className="mt-10 flex items-center gap-2.5 text-base font-semibold text-ink">
                <span className="h-4 w-1 rounded-full bg-accent" aria-hidden="true" />
                Your reporting workload
              </h3>
              <div className="mt-4 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <FieldSlider
                  id="roi-clients-input"
                  label="Clients reported on"
                  value={clients}
                  suffix={clients === 1 ? "client" : "clients"}
                  min={1}
                  max={50}
                  step={1}
                  set={setClients}
                  testid="roi-clients-input"
                />
                <FieldSlider
                  id="roi-reports-input"
                  label="Reports per client / month"
                  value={perMonth}
                  suffix={perMonth === 1 ? "report" : "reports"}
                  min={1}
                  max={4}
                  step={1}
                  set={setPerMonth}
                  testid="roi-reports-input"
                />
                <div className="sm:col-span-2">
                  <FieldSlider
                    id="roi-hours-input"
                    label="Hours to prepare each client report"
                    value={hours}
                    suffix={hours === 1 ? "hour" : "hours"}
                    min={0.5}
                    max={10}
                    step={0.5}
                    set={setHours}
                    testid="roi-hours-input"
                  />
                </div>
              </div>

              <h3 className="mt-8 flex items-center gap-2.5 text-base font-semibold text-ink">
                <span className="h-4 w-1 rounded-full bg-accent" aria-hidden="true" />
                Your assumption
              </h3>
              <div className="mt-4">
                <FieldSlider
                  id="roi-reduction-input"
                  label="If reporting effort dropped by"
                  value={reduction}
                  suffix="%"
                  min={10}
                  max={60}
                  step={5}
                  set={setReduction}
                  testid="roi-reduction-input"
                />
              </div>

              <div className="mt-8 rounded-xl border border-line bg-surface p-4">
                <p className="flex gap-2 text-xs leading-relaxed text-ink-soft">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                  Estimates scale with your inputs—actual savings depend on your workflow and the features you use. Choosing
                  your own reduction keeps this honest; nothing here is a promised result.
                </p>
              </div>
              <p className="mt-3.5 flex items-center gap-2 text-xs text-ink-soft/75">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                Runs entirely in your browser and stores nothing.
              </p>
            </div>

            {/* outputs */}
            <div className="space-y-4 border-t border-line bg-surface p-5 sm:p-7 lg:border-l lg:border-t-0">
              {/* dark hero card */}
              <div className="relative overflow-hidden rounded-2xl bg-[#13131B] p-6 sm:p-7" data-testid="roi-dark-panel">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(93,99,255,0.30),transparent_70%)] blur-2xl"
                  style={{ animation: "hero-drift 9s ease-in-out infinite alternate" }}
                  aria-hidden="true"
                />
                <motion.svg
                  key={`${monthly}-${reduction}`}
                  viewBox="0 0 200 80"
                  className="pointer-events-none absolute -bottom-1 right-2 w-44 text-white/[0.09]"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M0 70 L30 58 L60 62 L90 40 L120 46 L150 22 L180 28 L200 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                </motion.svg>
                <div className="relative">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                      <Clock3 className="h-4 w-4 text-[#A3A8FF]" strokeWidth={2.1} />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Monthly reporting load</p>
                  </div>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-[52px] font-semibold leading-none tracking-tight text-[#A3A8FF]" data-testid="roi-monthly-output">
                      {fmt(monthlyView)}
                    </span>
                    <span className="font-display text-lg text-white/50">/ month</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55" data-testid="roi-annual-output">
                    Your team’s manual reporting load —<br />
                    <span className="font-semibold text-white/85">{fmt(annualView)} hours</span> every year
                  </p>
                </div>
              </div>

              {/* savings story — ring + manual vs Fluxvex bars */}
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6" data-testid="roi-savings-panel">
                <CardTitle icon={CalendarDays}>Your savings story</CardTitle>
                <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                  <RingGauge pct={reduction} saved={savedView} />
                  <div className="w-full flex-1 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-soft">Today — assembled by hand</span>
                        <span className="font-display font-semibold text-ink" data-testid="roi-manual-bar-value">{fmt(annualView)} h/yr</span>
                      </div>
                      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-black/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#F26D6D] to-[#F5A048]"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-soft">With Fluxvex</span>
                        <span className="font-display font-semibold text-[#0E8A3E]" data-testid="roi-fluxvex-bar-value">{fmt(staysView)} h/yr</span>
                      </div>
                      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-black/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#43D675] to-[#0E8A3E]"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - reduction}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] leading-snug text-ink-soft/80">
                        The hours that remain go to judgment and strategy—not assembly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* workdays equivalence strip */}
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-accent-border bg-accent-tint/50 px-5 py-4" data-testid="roi-workdays-strip">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-accent/20">
                    <CalendarDays className="h-4 w-4 text-accent" strokeWidth={2} />
                  </span>
                  <p className="text-[13px] font-medium leading-snug text-ink">
                    About <span className="font-display font-bold text-accent" data-testid="roi-workdays-output">{fmt(workdaysBackView)} full workdays</span> back in your team’s year.
                  </p>
                </div>
                <span className="hidden rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-soft ring-1 ring-black/[0.06] sm:block">
                  8 h / day
                </span>
              </div>

              {/* comparison bar */}
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-ink">How this compares</h3>
                  <span className="text-xs text-ink-soft">Reporting effort</span>
                </div>
                <div className="relative mt-6" data-testid="roi-compare-bar">
                  <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#F26D6D] via-[#F5D748] to-[#43D675]" />
                  <div
                    className="absolute -top-1 z-10 -translate-x-1/2 transition-[left] duration-300"
                    style={{ left: `${100 - reduction}%` }}
                    data-testid="roi-you-marker"
                  >
                    <span className="flex h-5 items-center rounded-full bg-ink px-2 text-[9px] font-bold tracking-wide text-white shadow-md">
                      YOU
                    </span>
                    <span className="mx-auto block h-1.5 w-0.5 bg-ink" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-ink-soft">
                  <span>100% manual</span>
                  <span>fully automated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

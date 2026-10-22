import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarRange, Check, Clock3, Copy, Info, Lock, Sparkles, Zap } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* Tween a number toward its target whenever the target changes */
function useTween(target) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setVal(target);
      return undefined;
    }
    const start = performance.now();
    const dur = 480;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target]);

  return val;
}

function ReductionDonut({ value }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-24 w-24 shrink-0" data-testid="roi-reduction-donut">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(16,16,20,0.08)" strokeWidth="8" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#3D43E8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center" data-testid="roi-reduction-value">
        <span className="font-display text-xl font-semibold text-ink">{value}%</span>
        <span className="text-[9px] uppercase tracking-[0.14em] text-ink-soft">less effort</span>
      </span>
    </div>
  );
}

function CardLabel({ icon: Icon, children }) {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-tint">
        <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={2.1} />
      </span>
      {children}
    </p>
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
  const saved = Math.round((monthly * 12 * reduction) / 100);
  const workdays = Math.round((annual - saved) / 8);

  const monthlyView = useTween(monthly);
  const annualView = useTween(annual);
  const savedView = useTween(saved);
  const workdaysView = useTween(workdays);

  const copyResult = () => {
    const text = `Manual reporting: ${fmt(monthly)} h/month (${fmt(annual)} h a year) — about ${fmt(workdays)} full workdays. With Fluxvex at ${reduction}% less effort: ${fmt(saved)} hours returned every year.`;
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

  const sliders = [
    { label: "Clients reported on", value: clients, set: setClients, min: 1, max: 50, step: 1, suffix: clients === 1 ? "client" : "clients", testid: "roi-clients-input" },
    { label: "Hours to prepare each client report", value: hours, set: setHours, min: 0.5, max: 10, step: 0.5, suffix: hours === 1 ? "hour" : "hours", testid: "roi-hours-input" },
    { label: "Reports per client per month", value: perMonth, set: setPerMonth, min: 1, max: 4, step: 1, suffix: perMonth === 1 ? "report" : "reports", testid: "roi-reports-input" },
  ];

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
                <Zap className="h-3.5 w-3.5" strokeWidth={2.2} />
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
            {/* inputs — light panel */}
            <div className="relative p-7 sm:p-10">
              <div className="pointer-events-none absolute right-6 top-6 hidden items-start gap-2 sm:flex" aria-hidden="true">
                <span className="flex h-11 w-11 -rotate-6 items-center justify-center rounded-xl border border-line bg-white shadow-sm">
                  <GoogleAdsMark size={20} />
                </span>
                <span className="flex h-11 w-11 translate-y-1 rotate-[4deg] items-center justify-center rounded-xl border border-line bg-white shadow-sm">
                  <MetaMark size={20} />
                </span>
                <span className="flex h-11 w-11 -rotate-3 items-center justify-center rounded-xl border border-line bg-white shadow-sm">
                  <GA4Mark size={20} />
                </span>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent" data-testid="roi-eyebrow">
                The math, your inputs
              </p>
              <h2 className="mt-4 max-w-sm font-display text-3xl font-semibold leading-[1.06] tracking-tighter2 text-ink sm:text-4xl">
                See your reporting cost with <span className="text-accent">confidence.</span>
              </h2>
              <p className="mt-3 max-w-sm text-[15px] leading-[1.7] text-ink-soft">
                Understand what manual reporting takes from your team—and what you get back.
              </p>

              <div className="mt-10">
                <p className="text-sm font-semibold text-ink">Your reporting workload</p>
                <div className="mt-6 space-y-8">
                  {sliders.map((s) => {
                    const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
                    return (
                      <div key={s.label}>
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-sm font-medium text-ink" htmlFor={s.testid}>
                            {s.label}
                          </label>
                          <span className="rounded-lg border border-line bg-surface px-3 py-1.5 font-display text-sm font-semibold text-ink" data-testid={`${s.testid}-value`}>
                            {s.value} <span className="font-normal text-ink-soft">{s.suffix}</span>
                          </span>
                        </div>
                        <input
                          id={s.testid}
                          type="range"
                          min={s.min}
                          max={s.max}
                          step={s.step}
                          value={s.value}
                          onChange={(e) => s.set(Number(e.target.value))}
                          className="range-light mt-4 w-full"
                          style={{ background: `linear-gradient(90deg, #3D43E8 ${pct}%, rgba(16,16,20,0.08) ${pct}%)` }}
                          data-testid={s.testid}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <p className="text-sm font-semibold text-ink">Your assumption</p>
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium text-ink" htmlFor="roi-reduction-input">
                      If reporting effort dropped by
                    </label>
                    <span className="rounded-lg border border-line bg-surface px-3 py-1.5 font-display text-sm font-semibold text-ink">
                      {reduction}%
                    </span>
                  </div>
                  <input
                    id="roi-reduction-input"
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={reduction}
                    onChange={(e) => setReduction(Number(e.target.value))}
                    className="range-light mt-4 w-full"
                    style={{ background: `linear-gradient(90deg, #3D43E8 ${((reduction - 10) / 50) * 100}%, rgba(16,16,20,0.08) ${((reduction - 10) / 50) * 100}%)` }}
                    data-testid="roi-reduction-input"
                  />
                </div>
              </div>

              <div className="mt-10 rounded-xl border border-line bg-surface p-4">
                <p className="flex gap-2 text-xs leading-relaxed text-ink-soft">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                  Estimates scale with your inputs—actual savings depend on your workflow and the features you use. Choosing
                  your own reduction keeps this honest; nothing here is a promised result.
                </p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-ink-soft/75">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                Runs entirely in your browser and stores nothing.
              </p>
            </div>

            {/* outputs — stacked stat cards */}
            <div className="space-y-4 border-t border-line bg-surface p-5 sm:p-7 lg:border-l lg:border-t-0">
              {/* dark hero card */}
              <div className="relative overflow-hidden rounded-2xl bg-[#0B0B14] p-6 sm:p-7" data-testid="roi-dark-panel">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(93,99,255,0.30),transparent_70%)] blur-2xl"
                />
                <svg viewBox="0 0 200 80" className="pointer-events-none absolute -bottom-1 right-2 w-44 text-white/[0.08]" aria-hidden="true">
                  <path d="M0 70 L30 58 L60 62 L90 40 L120 46 L150 22 L180 28 L200 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="relative">
                  <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
                      <Clock3 className="h-3.5 w-3.5 text-[#A3A8FF]" strokeWidth={2.1} />
                    </span>
                    Monthly reporting load
                  </p>
                  <p className="mt-4 flex items-baseline gap-2.5">
                    <span className="font-display text-6xl font-semibold tracking-tight text-white" data-testid="roi-monthly-output">
                      {fmt(monthlyView)}
                    </span>
                    <span className="font-display text-xl text-white/50">h / month</span>
                  </p>
                  <p className="mt-2.5 text-sm text-white/50" data-testid="roi-annual-output">
                    <span className="font-semibold text-[#A3A8FF]">{fmt(annualView)} hours</span> every year, just preparing reports
                  </p>
                </div>
              </div>

              {/* yearly toll */}
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                <CardLabel icon={CalendarRange}>The yearly toll</CardLabel>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-soft">Hours spent every year</dt>
                    <dd className="font-display font-semibold text-[#0E8A3E]">{fmt(annualView)} h</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-ink-soft">Full workdays lost</dt>
                    <dd className="font-display font-semibold text-[#0E8A3E]" data-testid="roi-workdays-output">
                      {fmt(workdaysView)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* with fluxvex */}
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                <CardLabel icon={Sparkles}>With Fluxvex</CardLabel>
                <div className="mt-4 flex items-center gap-5">
                  <ReductionDonut value={reduction} />
                  <dl className="min-w-0 flex-1 space-y-2.5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-soft">Hours returned each year</dt>
                      <dd className="font-display font-semibold text-[#0E8A3E]" data-testid="roi-saved-output">
                        {fmt(savedView)} h
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-soft">Effort left with Fluxvex</dt>
                      <dd className="font-display font-semibold text-ink">{fmt(annual - saved)} h</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* comparison bar */}
              <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <CardLabel icon={Zap}>Where you land</CardLabel>
                  <span className="text-xs font-medium text-ink-soft">Reporting effort</span>
                </div>
                <div className="relative mt-6" data-testid="roi-compare-bar">
                  <div className="h-3 w-full rounded-full bg-gradient-to-r from-[#F26D6D] via-[#F5D748] to-[#43D675]" />
                  <div
                    className="absolute -top-1 z-10 -translate-x-1/2 transition-[left] duration-300"
                    style={{ left: `${100 - reduction}%` }}
                    data-testid="roi-you-marker"
                  >
                    <span className="flex h-5 items-center rounded-full bg-ink px-2 text-[9px] font-bold tracking-wide text-white shadow-md">
                      YOU
                    </span>
                    <span className="mx-auto block h-2 w-0.5 bg-ink" />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-ink-soft">
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

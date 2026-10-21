import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Info, Lock } from "lucide-react";
import CinematicText from "@/components/ui/CinematicText";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

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
    <div className="relative h-20 w-20 shrink-0" data-testid="roi-reduction-donut">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#8A90FF"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-white" data-testid="roi-reduction-value">
        {value}%
      </span>
    </div>
  );
}

export default function RoiCalculator() {
  const [clients, setClients] = useState(8);
  const [hours, setHours] = useState(3);
  const [perMonth, setPerMonth] = useState(2);
  const [reduction, setReduction] = useState(40);

  const monthly = clients * hours * perMonth;
  const annual = monthly * 12;
  const saved = Math.round(monthly * 12 * (reduction / 100));

  const monthlyView = useTween(monthly);
  const annualView = useTween(annual);
  const savedView = useTween(saved);

  const sliders = [
    { label: "Clients reported on", value: clients, set: setClients, min: 1, max: 50, step: 1, suffix: clients === 1 ? "client" : "clients", testid: "roi-clients-input" },
    { label: "Hours to prepare each client report", value: hours, set: setHours, min: 0.5, max: 10, step: 0.5, suffix: hours === 1 ? "hour" : "hours", testid: "roi-hours-input" },
    { label: "Reports per client per month", value: perMonth, set: setPerMonth, min: 1, max: 4, step: 1, suffix: perMonth === 1 ? "report" : "reports", testid: "roi-reports-input" },
  ];

  return (
    <SectionShell id="calculator">
      <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">The math, your inputs</p>
        </Reveal>
        <CinematicText
          as="h2"
          className="mt-4 font-display text-3xl font-semibold leading-[1.04] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
        >
          What is manual reporting costing your team each month?
        </CinematicText>
      </div>

      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-[#0B0B0D] text-white shadow-[0_60px_120px_-45px_rgba(11,11,13,0.65)]" data-testid="roi-calculator">
          {/* glow + grid decorations */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#3D43E8]/30 blur-[90px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#6E74FF]/20 blur-[100px]" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-2">
            {/* inputs */}
            <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Your inputs</p>
              <div className="mt-8 space-y-8">
                {sliders.map((s) => {
                  const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white/85" htmlFor={s.testid}>
                          {s.label}
                        </label>
                        <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-sm font-semibold text-white" data-testid={`${s.testid}-value`}>
                          {s.value} <span className="font-normal text-white/50">{s.suffix}</span>
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
                        className="range-premium mt-4 w-full"
                        style={{ background: `linear-gradient(90deg, #6E74FF ${pct}%, rgba(255,255,255,0.14) ${pct}%)` }}
                        data-testid={s.testid}
                      />
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/40">
                Estimate based on your inputs. Actual time savings depend on your workflow and the product features you use.
              </p>
            </div>

            {/* outputs */}
            <div className="relative p-7 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Your estimate</p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Monthly reporting hours</p>
                  <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-white" data-testid="roi-monthly-output">
                    {fmt(monthlyView)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Annual reporting hours</p>
                  <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-[#A3A7FF]" data-testid="roi-annual-output">
                    {fmt(annualView)}
                  </p>
                </div>
              </div>

              {/* manual vs with-Fluxvex bars */}
              <div className="mt-9 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>Manual reporting, per year</span>
                    <span className="font-semibold text-white/80">{fmt(annual)} h</span>
                  </div>
                  <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      className="h-full rounded-full bg-white/30"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>With Fluxvex, at your {reduction}% reduction</span>
                    <span className="font-semibold text-[#A3A7FF]">{fmt(annual - saved)} h</span>
                  </div>
                  <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#3D43E8] to-[#8A90FF]"
                      initial={false}
                      animate={{ width: `${100 - reduction}%` }}
                      transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    />
                  </div>
                </div>
              </div>

              {/* reduction donut + slider */}
              <div className="mt-9 flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <ReductionDonut value={reduction} />
                <div className="min-w-0 flex-1">
                  <label htmlFor="roi-reduction-input" className="text-sm font-medium text-white/85">
                    Hypothetical: if reporting effort dropped by
                  </label>
                  <input
                    id="roi-reduction-input"
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={reduction}
                    onChange={(e) => setReduction(Number(e.target.value))}
                    className="range-premium mt-3 w-full"
                    style={{ background: `linear-gradient(90deg, #6E74FF ${((reduction - 10) / 50) * 100}%, rgba(255,255,255,0.14) ${((reduction - 10) / 50) * 100}%)` }}
                    data-testid="roi-reduction-input"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-white/60" data-testid="roi-saved-output">
                    Roughly <span className="font-semibold text-white">{fmt(savedView)} hours a year</span> stay with the
                    team—choose your own percentage; nothing here is a promised result.
                  </p>
                </div>
              </div>

              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-white/40">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                This calculator runs entirely in your browser and stores nothing.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

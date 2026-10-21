import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Info, Lock } from "lucide-react";
import CinematicText from "@/components/ui/CinematicText";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { SlowIllustration } from "@/components/hairline/Illustrations";

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
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(16,16,20,0.08)" strokeWidth="9" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#3D43E8"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-ink" data-testid="roi-reduction-value">
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
        <div
          className="fine-grid relative overflow-hidden rounded-2xl border border-line bg-page shadow-[0_50px_120px_-50px_rgba(20,21,122,0.4)]"
          data-testid="roi-calculator"
        >
          {/* decorative hairline clock */}
          <div className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 opacity-50 lg:block" aria-hidden="true">
            <SlowIllustration />
          </div>

          <div className="relative grid lg:grid-cols-2">
            {/* inputs */}
            <div className="border-b border-line p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> Your inputs
              </p>
              <div className="mt-8 space-y-8">
                {sliders.map((s) => {
                  const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm font-medium text-ink" htmlFor={s.testid}>
                          {s.label}
                        </label>
                        <span className="rounded-full border border-accent/20 bg-accent-tint px-3 py-1 text-sm font-semibold text-accent" data-testid={`${s.testid}-value`}>
                          {s.value} <span className="font-normal text-accent/70">{s.suffix}</span>
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
              <p className="mt-8 border-t border-line pt-5 text-xs leading-relaxed text-ink-soft/80">
                Estimate based on your inputs. Actual time savings depend on your workflow and the product features you use.
              </p>
            </div>

            {/* outputs */}
            <div className="relative p-7 sm:p-10">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Your estimate
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Monthly reporting hours</p>
                  <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-ink" data-testid="roi-monthly-output">
                    {fmt(monthlyView)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Annual reporting hours</p>
                  <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-accent" data-testid="roi-annual-output">
                    {fmt(annualView)}
                  </p>
                </div>
              </div>

              {/* manual vs with-Fluxvex bars */}
              <div className="mt-9 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-soft">
                    <span>Manual reporting, per year</span>
                    <span className="font-semibold text-ink">{fmt(annual)} h</span>
                  </div>
                  <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-ink/25"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-soft">
                    <span>With Fluxvex, at your {reduction}% reduction</span>
                    <span className="font-semibold text-accent">{fmt(annual - saved)} h</span>
                  </div>
                  <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-[#8A90FF]"
                      initial={false}
                      animate={{ width: `${100 - reduction}%` }}
                      transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    />
                  </div>
                </div>
              </div>

              {/* reduction donut + slider */}
              <div className="mt-9 flex items-start gap-5 rounded-2xl border border-accent-border bg-accent-tint/40 p-5">
                <ReductionDonut value={reduction} />
                <div className="min-w-0 flex-1">
                  <label htmlFor="roi-reduction-input" className="text-sm font-medium text-ink">
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
                    className="range-light mt-3 w-full"
                    style={{ background: `linear-gradient(90deg, #3D43E8 ${((reduction - 10) / 50) * 100}%, rgba(16,16,20,0.08) ${((reduction - 10) / 50) * 100}%)` }}
                    data-testid="roi-reduction-input"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft" data-testid="roi-saved-output">
                    Roughly <span className="font-semibold text-accent">{fmt(savedView)} hours a year</span> stay with the
                    team—choose your own percentage; nothing here is a promised result.
                  </p>
                </div>
              </div>

              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink-soft/80">
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

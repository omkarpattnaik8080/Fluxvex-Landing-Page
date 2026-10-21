import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck } from "lucide-react";
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
    <div className="relative h-24 w-24 shrink-0" data-testid="roi-reduction-donut">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#A3A8FF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center" data-testid="roi-reduction-value">
        <span className="font-display text-xl font-semibold text-white">{value}%</span>
        <span className="text-[9px] uppercase tracking-[0.14em] text-white/45">less effort</span>
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
  const saved = Math.round((monthly * 12 * reduction) / 100);
  const workdays = Math.round((annual - saved) / 8);

  const monthlyView = useTween(monthly);
  const annualView = useTween(annual);
  const savedView = useTween(saved);
  const workdaysView = useTween(workdays);

  const sliders = [
    { label: "Clients reported on", value: clients, set: setClients, min: 1, max: 50, step: 1, suffix: clients === 1 ? "client" : "clients", testid: "roi-clients-input" },
    { label: "Hours to prepare each client report", value: hours, set: setHours, min: 0.5, max: 10, step: 0.5, suffix: hours === 1 ? "hour" : "hours", testid: "roi-hours-input" },
    { label: "Reports per client per month", value: perMonth, set: setPerMonth, min: 1, max: 4, step: 1, suffix: perMonth === 1 ? "report" : "reports", testid: "roi-reports-input" },
  ];

  return (
    <SectionShell id="calculator">
      <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
        <Reveal>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
            data-testid="roi-eyebrow"
          >
            {"The math, your inputs".split(" ").map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 24 } },
                }}
              >
                {w}
                {i < 3 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </motion.p>
        </Reveal>
        <CinematicText
          as="h2"
          className="mt-4 font-display text-3xl font-semibold leading-[1.04] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
        >
          What is manual reporting costing your team each month?
        </CinematicText>
        <Reveal y={12} delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-ink-soft">
            Move the sliders. Watch the numbers answer—then decide whether those hours should stay yours.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl border border-line bg-page shadow-[0_50px_120px_-50px_rgba(20,21,122,0.4)]"
          data-testid="roi-calculator"
        >
          <div className="grid lg:grid-cols-[1fr_1.15fr]">
            {/* inputs — light panel */}
            <div className="border-b border-line p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" /> Your inputs
              </p>
              <div className="mt-9 space-y-9">
                {sliders.map((s) => {
                  const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm font-medium text-ink" htmlFor={s.testid}>
                          {s.label}
                        </label>
                        <span className="rounded-full border border-accent/25 bg-accent-tint px-3.5 py-1.5 font-display text-sm font-semibold text-accent" data-testid={`${s.testid}-value`}>
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
              <p className="mt-9 border-t border-line pt-5 text-xs leading-relaxed text-ink-soft/80">
                Estimate based on your inputs. Actual time savings depend on your workflow and the product features
                you use.
              </p>
            </div>

            {/* outputs — dark premium panel */}
            <div className="relative overflow-hidden bg-[#0B0B14] p-7 sm:p-10" data-testid="roi-dark-panel">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(93,99,255,0.28),transparent_70%)] blur-2xl"
              />
              <div className="relative">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A3A8FF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Your estimate
                </p>

                <div className="mt-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Hours your team spends on reporting</p>
                  <p className="mt-2 flex items-baseline gap-3">
                    <span className="font-display text-6xl font-semibold tracking-tight text-white" data-testid="roi-monthly-output">
                      {fmt(monthlyView)}
                    </span>
                    <span className="font-display text-xl text-white/50">h / month</span>
                  </p>
                  <p className="mt-1.5 text-sm text-white/45" data-testid="roi-annual-output">
                    <span className="font-semibold text-[#A3A8FF]">{fmt(annualView)} hours</span> every year
                  </p>
                </div>

                {/* manual vs with-Fluxvex bars */}
                <div className="mt-8 space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/55">
                      <span>Manual reporting, per year</span>
                      <span className="font-semibold text-white/90">{fmt(annual)} h</span>
                    </div>
                    <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full bg-white/25"
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
                      <span className="font-semibold text-[#A3A8FF]">{fmt(annual - saved)} h</span>
                    </div>
                    <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#5D63FF] to-[#A3A8FF]"
                        initial={false}
                        animate={{ width: `${100 - reduction}%` }}
                        transition={{ type: "spring", stiffness: 90, damping: 20 }}
                      />
                    </div>
                  </div>
                </div>

                {/* reduction donut + slider */}
                <div className="mt-8 flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <ReductionDonut value={reduction} />
                  <div className="min-w-0 flex-1">
                    <label htmlFor="roi-reduction-input" className="text-sm font-medium text-white/90">
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
                      className="range-dark mt-3 w-full"
                      style={{ background: `linear-gradient(90deg, #A3A8FF ${((reduction - 10) / 50) * 100}%, rgba(255,255,255,0.12) ${((reduction - 10) / 50) * 100}%)` }}
                      data-testid="roi-reduction-input"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-white/55" data-testid="roi-saved-output">
                      Roughly <span className="font-semibold text-[#A3A8FF]">{fmt(savedView)} hours a year</span> stay with
                      the team—choose your own percentage; nothing here is a promised result.
                    </p>
                  </div>
                </div>

                <p className="mt-6 flex items-center gap-2 rounded-xl border border-[#A3A8FF]/25 bg-[#5D63FF]/10 px-4 py-3 font-display text-sm font-semibold text-white" data-testid="roi-workdays-output">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#A3A8FF]" />
                  {`That's ${fmt(workdaysView)} full workdays back, every year`}
                </p>

                <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-white/40">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  This calculator runs entirely in your browser and stores nothing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

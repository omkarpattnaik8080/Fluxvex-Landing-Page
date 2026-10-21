import { useState } from "react";
import { Info } from "lucide-react";
import CinematicText from "@/components/ui/CinematicText";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function RoiCalculator() {
  const [clients, setClients] = useState(8);
  const [hours, setHours] = useState(3);
  const [perMonth, setPerMonth] = useState(2);
  const [reduction, setReduction] = useState(40);

  const monthly = clients * hours * perMonth;
  const annual = monthly * 12;
  const saved = Math.round(monthly * 12 * (reduction / 100));

  const sliders = [
    {
      label: "Clients reported on",
      value: clients,
      set: setClients,
      min: 1,
      max: 50,
      step: 1,
      suffix: clients === 1 ? "client" : "clients",
      testid: "roi-clients-input",
    },
    {
      label: "Hours to prepare each client report",
      value: hours,
      set: setHours,
      min: 0.5,
      max: 10,
      step: 0.5,
      suffix: hours === 1 ? "hour" : "hours",
      testid: "roi-hours-input",
    },
    {
      label: "Reports per client per month",
      value: perMonth,
      set: setPerMonth,
      min: 1,
      max: 4,
      step: 1,
      suffix: perMonth === 1 ? "report" : "reports",
      testid: "roi-reports-input",
    },
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
        <div className="grid overflow-hidden rounded-xl border border-line bg-page lg:grid-cols-2" data-testid="roi-calculator">
          {/* inputs */}
          <div className="space-y-8 border-b border-line p-7 sm:p-10 lg:border-b-0 lg:border-r">
            {sliders.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-ink" htmlFor={s.testid}>
                    {s.label}
                  </label>
                  <span className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-ink" data-testid={`${s.testid}-value`}>
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
                  className="mt-3 w-full accent-[#3D43E8]"
                  data-testid={s.testid}
                />
              </div>
            ))}
            <p className="border-t border-hairline pt-5 text-xs leading-relaxed text-ink-soft/80">
              Estimate based on your inputs. Actual time savings depend on your workflow and the product features you use.
            </p>
          </div>

          {/* outputs */}
          <div className="flex flex-col justify-between bg-accent-tint p-7 sm:p-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Monthly reporting hours</p>
                <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-ink" data-testid="roi-monthly-output">
                  {fmt(monthly)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Annual reporting hours</p>
                <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-accent" data-testid="roi-annual-output">
                  {fmt(annual)}
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-accent/25 bg-page p-6">
              <div className="flex items-center justify-between">
                <label htmlFor="roi-reduction-input" className="text-sm font-medium text-ink">
                  Hypothetical: if reporting effort dropped by
                </label>
                <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-white" data-testid="roi-reduction-value">
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
                className="mt-4 w-full accent-[#3D43E8]"
                data-testid="roi-reduction-input"
              />
              <p className="mt-4 text-sm leading-relaxed text-ink-soft" data-testid="roi-saved-output">
                At that rate, roughly <span className="font-semibold text-ink">{fmt(saved)} hours a year</span> stay
                with the team—choose your own percentage; nothing here is a promised result.
              </p>
            </div>

            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink-soft/80">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              This calculator runs entirely in your browser and stores nothing.
            </p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

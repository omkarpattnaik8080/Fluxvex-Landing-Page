import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check, Copy } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { useTween } from "@/hooks/useTween";
import { useWaitlist } from "@/components/WaitlistContext";

const fmt = (n) => Math.round(n).toLocaleString("en-US");

/* Field: bordered box with a display-grade value + gradient slider + ticks */
function FieldSlider({ id, label, value, unit, min, max, step, set, ticks, testid }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mt-6 first:mt-0">
      <p className="text-[15px] font-semibold text-ink">{label}</p>
      <div className="mt-2.5 rounded-2xl border border-black/[0.12] px-5 pb-5 pt-4 transition-[border-color,box-shadow] duration-300 focus-within:border-[#0F2E33]/50 hover:border-[#0F2E33]/40 hover:shadow-[0_20px_40px_-26px_rgba(15,46,51,0.45)]">
        <p className="font-display text-[28px] font-semibold leading-none tracking-tight text-ink" data-testid={`${testid}-value`}>
          {value}
          <span className="ml-1.5 text-lg font-medium text-black/35">{unit}</span>
        </p>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="ref-slider mt-4 w-full"
          style={{
            background: `linear-gradient(90deg, #BFE0D6 0%, #F2997E ${pct}%, #E9E7E1 ${pct}%)`,
          }}
          data-testid={testid}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] font-medium text-black/35">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* The dark-band illustration — coral bars, one mint hero bar, tooltip + cursor */
function BandBars() {
  const bars = [
    { h: 34, mint: false },
    { h: 52, mint: false },
    { h: 96, mint: true },
    { h: 42, mint: false },
    { h: 30, mint: false },
    { h: 46, mint: false },
  ];
  return (
    <div className="relative w-fit">
      {/* tooltip card */}
      <motion.div
        className="absolute -top-12 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="relative rounded-xl bg-white px-3.5 py-2 shadow-[0_18px_36px_-14px_rgba(0,0,0,0.5)]">
          <span className="absolute left-2 top-1.5 h-2 w-4 rounded-sm bg-[#F2997E]" aria-hidden="true" />
          <p className="text-right font-display text-xl font-bold leading-none text-ink">
            40<span className="text-[11px]">%</span>
          </p>
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" aria-hidden="true" />
        </div>
      </motion.div>
      {/* bars */}
      <div className="flex h-28 items-end gap-2.5" aria-hidden="true">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className={`w-7 rounded-t-lg ${b.mint ? "bg-gradient-to-t from-[#2FA36B] to-[#43D675] shadow-[0_10px_26px_-8px_rgba(67,214,117,0.65)]" : "bg-gradient-to-t from-[#E98A70] to-[#F5AE97]"}`}
            style={{ height: `${b.h}%`, transformOrigin: "bottom" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.09, ease: [0.25, 1, 0.5, 1] }}
          />
        ))}
        {/* cursor */}
        <motion.svg
          viewBox="0 0 24 24"
          className="h-7 w-7 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
          animate={{ x: [0, 6, -4, 0], y: [0, -8, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <path d="M5 3 L19 12 L12.5 13.5 L9.5 20 Z" fill="#FFFFFF" stroke="#0F2E33" strokeWidth="1.4" strokeLinejoin="round" />
        </motion.svg>
      </div>
      <p className="mt-3 text-[12.5px] font-medium text-white/70">40% less effort — the assumption most teams make</p>
    </div>
  );
}

export default function RoiCalculator() {
  const { openWaitlist } = useWaitlist();
  const [clients, setClients] = useState(8);
  const [hours, setHours] = useState(3);
  const [perMonth, setPerMonth] = useState(2);
  const [reduction, setReduction] = useState(40);
  const [mode, setMode] = useState("monthly");
  const [copied, setCopied] = useState(false);

  const monthly = clients * hours * perMonth;
  const annual = monthly * 12;
  const saved = Math.round((annual * reduction) / 100);
  const workdaysBack = Math.round(saved / 8);

  const monthlyView = useTween(monthly);
  const annualView = useTween(annual);
  const savedView = useTween(saved);
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
          className="overflow-hidden rounded-[28px] shadow-[0_70px_140px_-70px_rgba(15,46,51,0.65)]"
          data-testid="roi-calculator"
        >
          {/* ── dark band ─────────────────────────────────────────────── */}
          <div className="relative bg-[#0F2E33] px-7 pb-20 pt-11 sm:px-10 lg:px-14" data-testid="roi-dark-panel">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.14),transparent_70%)] blur-3xl" aria-hidden="true" />
            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-[34px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[42px] lg:text-[46px]">
                  See your reporting load.
                  <br />
                  and shrink it
                </h2>
                {/* skeleton lines + cursor */}
                <div className="relative mt-9 max-w-sm space-y-3.5" aria-hidden="true">
                  <div className="relative h-4 rounded-full bg-white/[0.08]">
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="absolute -top-4 right-10 h-7 w-7 drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
                      animate={{ x: [0, 10, -6, 0], y: [0, -6, 4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M5 3 L19 12 L12.5 13.5 L9.5 20 Z" fill="#FFFFFF" stroke="#0F2E33" strokeWidth="1.4" strokeLinejoin="round" />
                    </motion.svg>
                  </div>
                  <div className="h-4 w-2/3 rounded-full bg-white/[0.08]" />
                </div>
              </div>
              <div className="flex lg:justify-end">
                <BandBars />
              </div>
            </div>
          </div>

          {/* ── white calculator (overlaps the dark band) ─────────────── */}
          <div className="relative -mt-10 rounded-t-[28px] bg-white px-7 pb-9 pt-11 sm:px-10 lg:px-14">
            {/* avatars trio straddling the seam */}
            <div className="absolute -top-8 right-8 flex -space-x-3 sm:right-12 lg:right-14" aria-hidden="true">
              {[
                { init: "NM", bg: "#F2997E" },
                { init: "KA", bg: "#43D675" },
                { init: "+9", bg: "#7B5CFF" },
              ].map((a) => (
                <span
                  key={a.init}
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display text-[13px] font-bold text-white ring-4 ring-white"
                  style={{ backgroundColor: a.bg }}
                >
                  {a.init}
                </span>
              ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
              {/* left — sliders */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-[26px] font-semibold tracking-tight text-[#0E8A3E]">
                    Reporting Calculator
                  </h3>
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

                <FieldSlider
                  id="roi-clients-input"
                  label="Choose your reporting workload"
                  value={clients}
                  unit={clients === 1 ? "client" : "clients"}
                  min={1}
                  max={50}
                  step={1}
                  set={setClients}
                  ticks={["1", "50"]}
                  testid="roi-clients-input"
                />
                <FieldSlider
                  id="roi-hours-input"
                  label="How much time each report takes"
                  value={hours}
                  unit={hours === 1 ? "hour" : "hours"}
                  min={0.5}
                  max={10}
                  step={0.5}
                  set={setHours}
                  ticks={["0.5", "5", "10"]}
                  testid="roi-hours-input"
                />
                <FieldSlider
                  id="roi-reports-input"
                  label="How many reports per client"
                  value={perMonth}
                  unit={perMonth === 1 ? "report" : "reports"}
                  min={1}
                  max={4}
                  step={1}
                  set={setPerMonth}
                  ticks={["1", "2", "3", "4"]}
                  testid="roi-reports-input"
                />
                <FieldSlider
                  id="roi-reduction-input"
                  label="How much effort you expect to drop"
                  value={reduction}
                  unit="%"
                  min={10}
                  max={60}
                  step={5}
                  set={setReduction}
                  ticks={["10%", "30%", "60%"]}
                  testid="roi-reduction-input"
                />
              </div>

              {/* right — total */}
              <div className="flex flex-col lg:items-end lg:text-right">
                <p className="text-[15px] font-semibold text-ink">Total hours</p>
                {/* period toggle */}
                <div className="mt-3 flex self-start rounded-full border-2 border-black/[0.12] p-1 lg:self-end" data-testid="roi-period-toggle">
                  {[
                    { key: "monthly", label: "Monthly" },
                    { key: "yearly", label: "Yearly" },
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setMode(m.key)}
                      className={`rounded-full px-4 py-1 text-[12px] font-bold transition-colors duration-150 ${
                        mode === m.key ? "bg-[#BFE0D6] text-[#0F2E33]" : "text-ink-soft hover:text-ink"
                      }`}
                      data-testid={`roi-toggle-${m.key}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* big number */}
                <p className="mt-8 font-display text-[84px] font-bold leading-none tracking-tight text-ink sm:text-[104px]">
                  {mode === "monthly" ? (
                    <span data-testid="roi-monthly-output">
                      {fmt(monthlyView)}
                      <span className="text-3xl font-semibold text-black/35"> h</span>
                    </span>
                  ) : (
                    <span data-testid="roi-annual-output">
                      {fmt(annualView)}
                      <span className="text-3xl font-semibold text-black/35"> h</span>
                    </span>
                  )}
                </p>

                {/* handwritten annotation + drawn arrow */}
                <div className="relative mt-2 self-start lg:self-end">
                  <svg viewBox="0 0 90 46" className="absolute -left-24 -top-6 hidden h-12 w-24 sm:block" aria-hidden="true">
                    <path
                      d="M84 8 C 62 34, 34 40, 8 30"
                      fill="none"
                      stroke="#0F2E33"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path d="M14 24 L7 30 L16 33" fill="none" stroke="#0F2E33" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p
                    className="-rotate-6 text-[17px] leading-tight text-[#0F2E33]"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    hours your team spends
                    <br />
                    assembling reports
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-10 flex items-center gap-4 self-start lg:flex-col lg:items-end lg:gap-5">
                  <button
                    type="button"
                    onClick={() => openWaitlist("roi-calculator")}
                    className="inline-flex h-12 items-center rounded-full bg-gradient-to-r from-[#F2997E] to-[#F6C39B] px-7 font-display text-[15px] font-semibold text-[#0F2E33] shadow-[0_18px_36px_-14px_rgba(242,153,126,0.7)] transition-transform duration-200 hover:scale-[1.03]"
                    data-testid="roi-cta-button"
                  >
                    Join the waitlist
                  </button>
                  <p className="text-[11px] leading-snug text-black/40">
                    Runs entirely in your browser.
                    <br className="hidden lg:block" /> Nothing is stored or sent.
                  </p>
                </div>
              </div>
            </div>

            {/* savings strip — the outputs, kept slim under the reference card */}
            <div className="mt-10 rounded-2xl bg-[#F2F7F5] p-5 sm:p-6">
              <div className="grid items-center gap-5 sm:grid-cols-[auto_auto_1fr]">
                <div className="flex items-center gap-3" data-testid="roi-savings-panel">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/[0.06]">
                    <CalendarDays className="h-4 w-4 text-[#0E8A3E]" strokeWidth={2} />
                  </span>
                  <p className="text-[13.5px] font-medium leading-snug text-ink">
                    <span className="font-display font-bold text-[#0E8A3E]" data-testid="roi-saved-output">
                      {fmt(savedView)} h
                    </span>{" "}
                    returned / year
                  </p>
                </div>
                <p className="text-[13.5px] font-medium leading-snug text-ink">
                  ≈{" "}
                  <span className="font-display font-bold text-[#0E8A3E]" data-testid="roi-workdays-output">
                    {fmt(workdaysBackView)} workdays
                  </span>{" "}
                  back in your team's year
                </p>
                {/* comparison bar with YOU marker */}
                <div>
                  <div className="relative" data-testid="roi-compare-bar">
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
                  <div className="mt-2 flex justify-between text-[10.5px] font-medium text-black/40">
                    <span>100% manual</span>
                    <span>fully automated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

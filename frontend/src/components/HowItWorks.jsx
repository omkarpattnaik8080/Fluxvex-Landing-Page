import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const STEPS = [
  {
    title: "Connect supported platforms",
    desc: "Authorize the integrations the product supports.",
    testid: "workflow-step-1",
  },
  {
    title: "Choose the client and period",
    desc: "Keep the scope of the report clear.",
    testid: "workflow-step-2",
  },
  {
    title: "Generate and review",
    desc: "Create the report using defined metrics and a consistent structure.",
    testid: "workflow-step-3",
  },
  {
    title: "Brand and deliver",
    desc: "Apply the agency’s presentation style and export or schedule delivery as supported.",
    testid: "workflow-step-4",
  },
];

function StepVisual({ step }) {
  const variants = {
    0: (
      <div className="space-y-2.5">
        {[
          { mark: <GoogleAdsMark size={15} />, name: "Google Ads" },
          { mark: <MetaMark size={15} />, name: "Meta Ads" },
          { mark: <GA4Mark size={15} />, name: "Google Analytics 4" },
        ].map((p, i) => (
          <div key={p.name} className="flex items-center justify-between rounded-lg border border-hairline bg-elevated px-4 py-3">
            <span className="flex items-center gap-2.5 text-sm font-medium text-white/85">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-ink">{p.mark}</span>
              {p.name}
            </span>
            {i < 2 ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#4ADE80]">
                <Check className="h-3.5 w-3.5" /> Authorized
              </span>
            ) : (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-soft">Authorize</span>
            )}
          </div>
        ))}
        <p className="pt-1 text-[11px] text-white/35">OAuth connections with least-privilege scopes, where supported.</p>
      </div>
    ),
    1: (
      <div className="space-y-3">
        <div className="rounded-lg border border-hairline bg-elevated p-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">Client</p>
          <div className="mt-2 space-y-2">
            {["Northbeam Media", "Halcyon Dental", "Vela Studio"].map((c, i) => (
              <div key={c} className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${i === 0 ? "border border-accent/40 bg-accent/10 text-white" : "border border-hairline text-white/55"}`}>
                {c} {i === 0 && <Check className="h-4 w-4 text-accent" />}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-hairline bg-elevated p-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">Reporting period</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["May 2025", "June 2025", "Q2 2025"].map((p, i) => (
              <span key={p} className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${i === 1 ? "bg-accent text-white" : "border border-hairline text-white/55"}`}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="rounded-lg border border-hairline bg-elevated p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Building report…</p>
          <span className="text-[11px] text-accent-soft">3 of 3 sections</span>
        </div>
        <div className="mt-3 space-y-2">
          {["Spend & pacing", "Channel results", "Written summary"].map((s, i) => (
            <div key={s} className="flex items-center justify-between rounded-md border border-hairline px-3 py-2.5">
              <span className="text-[13px] text-white/70">{s}</span>
              <Check className="h-4 w-4 text-[#4ADE80]" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div initial={{ width: "12%" }} animate={{ width: "100%" }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full rounded-full bg-accent" />
        </div>
      </div>
    ),
    3: (
      <div className="rounded-lg border border-hairline bg-elevated p-4">
        <div className="rounded-lg border border-line bg-ink p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-xs font-bold text-white">N</span>
            <div>
              <p className="text-sm font-semibold text-white">Northbeam Media — June 2025</p>
              <p className="text-[11px] text-white/45">Agency-branded · client-ready</p>
            </div>
          </div>
          <svg viewBox="0 0 300 56" className="mt-3 w-full" aria-hidden="true">
            <path d="M0 46 30 40 60 43 90 30 120 34 150 20 180 24 210 14 240 18 270 8 300 10" fill="none" stroke="#0099FF" strokeWidth="2.2" />
          </svg>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-full bg-accent py-2 text-center text-xs font-semibold text-white">Export PDF</span>
          <span className="flex-1 rounded-full border border-hairline py-2 text-center text-xs font-semibold text-white/70">Schedule send</span>
        </div>
        <p className="pt-2 text-[11px] text-white/35">Scheduling appears as supported at launch.</p>
      </div>
    ),
  };
  return variants[step];
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <SectionShell id="workflow">
      <SectionHeader
        overline="How it works"
        title="From connected data to a report your client is ready to read."
        copy="Four steps, the same every cycle. Select a step to see what the workflow is doing."
      />
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14" data-testid="how-it-works">
          <div className="flex flex-col">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              return (
                <button
                  key={step.title}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group relative border-t border-line py-6 text-left last:border-b ${isActive ? "" : "opacity-60 hover:opacity-100"}`}
                  data-testid={step.testid}
                >
                  {isActive && (
                    <motion.span layoutId="step-indicator" className="absolute left-0 top-0 h-full w-0.5 bg-accent" aria-hidden="true" />
                  )}
                  <div className="flex items-start gap-5 pl-6">
                    <span className={`font-display text-sm font-semibold ${isActive ? "text-accent" : "text-white/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between text-[17px] font-semibold text-white">
                        {step.title}
                        <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? "translate-x-0.5 text-accent" : "text-white/30"}`} />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/55">{step.desc}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="fine-grid relative overflow-hidden rounded-xl border border-line bg-[#070707] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <StepVisual step={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

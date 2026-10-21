import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Plug, FolderOpen, Sparkles, Send } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { useWaitlist } from "@/components/WaitlistContext";

const STEPS = [
  { icon: Plug, tab: "Connect", title: "Connect supported platforms", desc: "Authorize the integrations the product supports.", testid: "workflow-step-1" },
  { icon: FolderOpen, tab: "Choose", title: "Choose the client and period", desc: "Keep the scope of the report clear.", testid: "workflow-step-2" },
  { icon: Sparkles, tab: "Generate", title: "Generate and review", desc: "Create the report using defined metrics and a consistent structure.", testid: "workflow-step-3" },
  { icon: Send, tab: "Deliver", title: "Brand and deliver", desc: "Apply the agency’s presentation style and export or schedule delivery as supported.", testid: "workflow-step-4" },
];

function FloatCard({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border border-black/[0.05] bg-white p-3.5 shadow-[0_20px_45px_-18px_rgba(16,16,20,0.25)] ${className}`}>
      {children}
      <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ink text-white">
        <span className="text-sm leading-none">+</span>
      </span>
    </div>
  );
}

function StepVisual({ step }) {
  const variants = {
    0: (
      <div className="space-y-3">
        {[
          { mark: <GoogleAdsMark size={16} />, name: "Google Ads", sub: "Campaign performance", done: true },
          { mark: <MetaMark size={16} />, name: "Meta Ads", sub: "Delivery results", done: true },
          { mark: <GA4Mark size={16} />, name: "Google Analytics 4", sub: "Engagement & conversions", done: false },
        ].map((p) => (
          <FloatCard key={p.name}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface ring-1 ring-black/5">{p.mark}</span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">{p.name}</span>
              <span className="block text-[11px] text-ink-soft">{p.sub}</span>
            </span>
            {p.done ? (
              <span className="ml-auto mr-10 flex items-center gap-1 text-[11px] font-semibold text-[#0E8A3E]">
                <Check className="h-3.5 w-3.5" /> Authorized
              </span>
            ) : (
              <span className="ml-auto mr-10 rounded-full border border-accent-border bg-accent-tint px-3 py-1 text-[11px] font-semibold text-accent">Authorize</span>
            )}
          </FloatCard>
        ))}
      </div>
    ),
    1: (
      <div className="space-y-3">
        <FloatCard>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-[11px] font-bold text-white">N</span>
          <span>
            <span className="block text-[13px] font-semibold text-ink">Northbeam Media</span>
            <span className="block text-[11px] text-ink-soft">Client · selected</span>
          </span>
        </FloatCard>
        <div className="flex gap-2.5">
          {["May 2025", "June 2025", "Q2 2025"].map((p, i) => (
            <span
              key={p}
              className={`rounded-full px-4 py-2 text-[12px] font-medium shadow-sm ${
                i === 1 ? "bg-accent text-white shadow-[0_14px_30px_-10px_rgba(61,67,232,0.5)]" : "border border-black/[0.06] bg-white text-ink-soft"
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3">
        {["Spend & pacing", "Channel results", "Written summary"].map((s, i) => (
          <FloatCard key={s} className={i === 1 ? "ml-6" : i === 2 ? "ml-12" : ""}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-tint">
              <Check className="h-4 w-4 text-accent" />
            </span>
            <span className="text-[13px] font-semibold text-ink">{s}</span>
          </FloatCard>
        ))}
        <div className="ml-12 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
          <motion.div initial={{ width: "12%" }} animate={{ width: "100%" }} transition={{ duration: 1.4, ease: "easeOut" }} className="h-full rounded-full bg-accent" />
        </div>
      </div>
    ),
    3: (
      <div className="space-y-3">
        <FloatCard>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-[11px] font-bold text-white">N</span>
          <span>
            <span className="block text-[13px] font-semibold text-ink">Northbeam Media — June 2025</span>
            <span className="block text-[11px] text-ink-soft">Agency-branded · client-ready</span>
          </span>
        </FloatCard>
        <div className="ml-6 flex gap-2.5">
          <span className="rounded-full bg-accent px-5 py-2 text-[12px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(61,67,232,0.5)]">Export PDF</span>
          <span className="rounded-full border border-black/[0.08] bg-white px-5 py-2 text-[12px] font-semibold text-ink-soft">Schedule send</span>
        </div>
        <p className="ml-6 text-[11px] text-ink-soft/70">Scheduling appears as supported at launch.</p>
      </div>
    ),
  };
  return variants[step];
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const { openWaitlist } = useWaitlist();

  return (
    <SectionShell id="workflow" className="!px-0 !py-0">
      <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-20 text-center lg:px-8 lg:pb-20 lg:pt-28">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">How it works</p>
        </Reveal>
        <CinematicText
          as="h2"
          className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.06] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
        >
          From connected data to a report your client is ready to read.
        </CinematicText>
        <Reveal y={16} delay={0.15}>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.7] text-ink-soft">
            Four steps, the same every cycle. Select a step to see what the workflow is doing.
          </p>
        </Reveal>
      </div>

      {/* tab strip */}
      <Reveal>
        <div className="border-y border-line bg-page" data-testid="workflow-tabs">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 sm:grid-cols-4">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              return (
                <button
                  key={step.tab}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`relative flex items-center gap-2.5 border-line px-5 py-4 text-left text-[14px] font-medium transition-colors sm:justify-center sm:text-[15px] ${
                    i % 2 === 1 ? "border-l" : ""
                  } ${i < 2 ? "border-b sm:border-b-0" : ""} ${i > 0 ? "sm:border-l" : ""} ${
                    isActive ? "text-ink" : "text-ink-soft/70 hover:text-ink"
                  }`}
                  data-testid={step.testid}
                >
                  <step.icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-ink-soft/60"}`} strokeWidth={1.8} />
                  {step.tab}
                  {isActive && <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* step content */}
      <div className="border-b border-line bg-page">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2" data-testid="how-it-works">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Step {String(active + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 max-w-sm font-display text-2xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-3xl">
                  {STEPS[active].title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">{STEPS[active].desc}</p>
                <button
                  onClick={() => openWaitlist("workflow")}
                  className="mt-8 inline-flex h-10 items-center rounded-full border border-black/10 bg-page px-5 text-sm font-medium text-ink shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
                  data-testid="workflow-cta-button"
                >
                  Join the waitlist
                </button>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center gap-2" aria-hidden="true">
              {STEPS.map((_, i) => (
                <span key={i} className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-accent" : "w-3 bg-black/15"}`} />
              ))}
            </div>
          </div>

          <div className="fine-grid relative overflow-hidden border-t border-line bg-[#F7F6F2] px-6 py-12 sm:px-12 lg:border-l lg:border-t-0 lg:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`v-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mx-auto max-w-sm"
              >
                <StepVisual step={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";

const PLANS = [
  {
    name: "Starter",
    tag: "For focused portfolios",
    mask: { usd: "$••", inr: "₹ •,•••" },
    bullets: [
      "For agencies managing up to 5 clients",
      "Core reporting workflow for the initial supported integrations",
      "Consistent report structure",
      "Agency branding, if included in the launch scope",
    ],
    cta: "Get Starter updates",
    interest: "Starter",
    testid: "plan-card-starter",
  },
  {
    name: "Growth",
    tag: "For scaling agencies",
    mask: { usd: "$•••", inr: "₹ ••,•••" },
    bullets: [
      "For agencies managing more than 5 clients",
      "Designed for a larger client portfolio",
      "Team and workflow capabilities only if confirmed for launch",
    ],
    cta: "Join the Growth waitlist",
    interest: "Growth",
    testid: "plan-card-growth",
  },
];

export function PlanCard({ plan, currency = "usd", highlighted = false, source = "home-pricing" }) {
  const { openWaitlist } = useWaitlist();
  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-7 sm:p-9 ${
        highlighted ? "border-accent/50 bg-accent-tint shadow-[0_30px_60px_-30px_rgba(61,67,232,0.4)]" : "border-line bg-page"
      }`}
      data-testid={plan.testid}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{plan.name}</h3>
        <span className="shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium text-ink-soft">
          {plan.tag}
        </span>
      </div>

      {/* locked price — blurred with a peek-on-hover curiosity effect */}
      <div
        className="group/price relative mt-6 w-fit cursor-pointer overflow-hidden rounded-lg px-1 py-0.5"
        data-testid={`${plan.testid}-price`}
        title="Pricing announced before launch"
      >
        <motion.span
          key={currency}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-flex items-center"
        >
          <span
            aria-hidden="true"
            className="inline-block font-display text-4xl font-semibold tracking-tight text-ink/85 blur-[7px] transition-all duration-300 select-none group-hover/price:blur-[3px]"
          >
            {plan.mask[currency]}
          </span>
          <span className="ml-1 text-sm font-medium text-ink-soft">/mo</span>
        </motion.span>
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ x: ["-140%", "360%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
          aria-hidden="true"
        />
        <span className="absolute left-1/2 top-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white shadow-[0_10px_20px_-6px_rgba(16,16,20,0.6)]">
          <Lock className="h-3 w-3" />
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Countdown />
        <p className="text-xs text-ink-soft">Launch pricing announced soon—waitlist members see it first.</p>
      </div>

      <ul className="mt-7 flex-1 space-y-3 border-t border-hairline pt-7">
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {b}
          </li>
        ))}
      </ul>
      <TapCTA
        onClick={() => openWaitlist(source)}
        className={`mt-8 h-11 w-full rounded-full font-display text-sm font-semibold transition-colors ${
          highlighted
            ? "bg-accent text-white hover:bg-accent-strong"
            : "border border-black/10 bg-page text-ink hover:border-accent/40 hover:text-accent"
        }`}
        testid={`${plan.testid}-cta`}
      >
        {plan.cta}
      </TapCTA>
    </div>
  );
}

export default function PricingPreview() {
  const [currency, setCurrency] = useState("usd");
  return (
    <SectionShell id="pricing">
      <SectionHeader
        overline="Pricing"
        title="Straightforward plans. Pricing landing soon."
        copy="Two plans shaped around your client portfolio. Pricing stays under wraps until launch—waitlist members see it first. Preview the plans in USD or INR."
      />
      <div className="flex justify-center">
        <CurrencyToggle value={currency} onChange={setCurrency} />
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">
            <PlanCard plan={p} currency={currency} highlighted={i === 1} source={`home-pricing-${p.name.toLowerCase()}`} />
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-ink-soft/80" data-testid="home-pricing-indicative-note">
        Final pricing and billing terms will be announced before launch—waitlist members see it first.
      </p>
      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-line bg-page px-6 py-5">
          <p className="text-sm text-ink-soft">Plan details, comparison table, and pricing FAQs.</p>
          <Link to="/pricing" className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong" data-testid="pricing-details-link">
            View the pricing page
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </Reveal>
    </SectionShell>
  );
}

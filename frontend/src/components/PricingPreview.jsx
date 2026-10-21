import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useWaitlist } from "@/components/WaitlistContext";

const PLANS = [
  {
    name: "Starter",
    tag: "For focused portfolios",
    prices: { usd: "$49", inr: "₹3,999" },
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
    prices: { usd: "$149", inr: "₹11,999" },
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
      <p className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink" data-testid={`${plan.testid}-price`}>
        <motion.span
          key={currency}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="inline-block"
        >
          {plan.prices[currency]}
        </motion.span>
        <span className="ml-1 text-sm font-medium text-ink-soft">/mo</span>
      </p>
      <p className="mt-1 text-xs text-ink-soft">Indicative launch pricing—final pricing announced before launch.</p>
      <ul className="mt-7 flex-1 space-y-3 border-t border-hairline pt-7">
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {b}
          </li>
        ))}
      </ul>
      <button
        onClick={() => openWaitlist(source)}
        className={`mt-8 h-11 w-full rounded-full font-display text-sm font-semibold transition-colors ${
          highlighted
            ? "bg-accent text-white hover:bg-accent-strong"
            : "border border-black/10 bg-page text-ink hover:border-accent/40 hover:text-accent"
        }`}
        data-testid={`${plan.testid}-cta`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function PricingPreview() {
  const [currency, setCurrency] = useState("usd");
  return (
    <SectionShell id="pricing">
      <SectionHeader
        overline="Pricing"
        title="Straightforward plans. Indicative launch pricing."
        copy="Two plans shaped around your client portfolio. Indicative launch pricing is shown below in USD and INR—final pricing will be announced before launch. Join the waitlist to get the announcement."
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
        Indicative launch pricing in the selected currency—final pricing and billing terms will be announced before launch.
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

import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { useWaitlist } from "@/components/WaitlistContext";

const PLANS = [
  {
    name: "Starter",
    tag: "For focused portfolios",
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

export function PlanCard({ plan, highlighted = false, source = "home-pricing" }) {
  const { openWaitlist } = useWaitlist();
  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-7 sm:p-9 ${
        highlighted ? "border-accent/50 bg-accent-tint shadow-[0_30px_60px_-30px_rgba(61,67,232,0.4)]" : "border-line bg-page"
      }`}
      data-testid={plan.testid}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{plan.name}</h3>
        <span className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium text-ink-soft">
          {plan.tag}
        </span>
      </div>
      <p className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">
        Coming soon
      </p>
      <p className="mt-1 text-xs text-ink-soft">Pricing will be announced before launch.</p>
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
  return (
    <SectionShell id="pricing">
      <SectionHeader
        overline="Pricing"
        title="Straightforward plans. Pricing coming soon."
        copy="We’re shaping plans around the number of client accounts and the reporting workflow your agency needs. Join the waitlist to get pricing and launch updates."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">
            <PlanCard plan={p} highlighted={i === 1} source={`home-pricing-${p.name.toLowerCase()}`} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-8 flex items-center justify-between rounded-xl border border-line bg-page px-6 py-5">
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

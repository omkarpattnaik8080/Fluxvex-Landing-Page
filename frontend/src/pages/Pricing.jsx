import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Lock, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";
import Countdown from "@/components/Countdown";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

const TABLE_ROWS = [
  ["Client limit", "Up to 5 clients", "More than 5 clients"],
  ["Available integrations", "Google Ads, Meta Ads, and GA4 (initial focus)", "Google Ads, Meta Ads, and GA4 (initial focus)"],
  ["Report generation", "To be announced", "To be announced"],
  ["Branding and report customization", "To be announced", "To be announced"],
  ["Scheduling", "To be announced", "To be announced"],
  ["Team seats and access controls", "To be announced", "To be announced"],
  ["Support tier", "To be announced", "To be announced"],
];

const COMPARISON_ROWS = (currency) => [
  ["Launch price (per month)", currency === "usd" ? "$ •• — locked" : "₹ •,••• — locked", currency === "usd" ? "$ ••• — locked" : "₹ ••,••• — locked"],
  ...TABLE_ROWS,
];

const PRICING_FAQS = [
  ["When will pricing be announced?", "Pricing is still under wraps—it appears as a locked preview today. Final pricing will be announced before launch, and waitlist members see it first."],
  ["Why is the price hidden?", "We’re finalizing plan limits, billing currencies, and taxes before publishing numbers. The locked preview shows the shape of each plan; the numbers land with the launch announcement."],
  ["Will early-access users receive launch updates?", "Yes. Waitlist members receive meaningful launch and early-access updates by email."],
  ["What counts as a client?", "We’re finalizing whether a client means one connected brand or one reporting workspace. The definition will be published with pricing."],
  ["Can I move from Starter to Growth?", "Yes—the plan structure is designed around client count, so you move when your portfolio does. Details will be announced with pricing."],
  ["Will I need a card to join the waitlist?", "No. The waitlist only asks for a work email and optional details—there is no payment step."],
];

/* Big locked price — blurred mask with a peek-on-hover curiosity effect */
function LockedPrice({ mask, currency, testid }) {
  return (
    <div className="group/price relative mt-7 w-fit cursor-pointer" data-testid={testid} title="Pricing announced before launch">
      <motion.span
        key={currency}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-baseline gap-1.5"
      >
        <span
          aria-hidden="true"
          className="inline-block font-display text-5xl font-semibold tracking-tighter2 text-ink/85 blur-[7px] select-none transition-all duration-300 group-hover/price:blur-[3px] sm:text-[44px]"
        >
          {mask[currency]}
        </span>
        <span className="text-sm font-medium text-ink-soft">/Month</span>
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
  );
}

function PagePlanCard({ plan, currency, highlighted = false, source }) {
  const { openWaitlist } = useWaitlist();
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-7 sm:p-9 ${
        highlighted ? "bg-white shadow-[0_30px_60px_-30px_rgba(16,16,20,0.25)]" : ""
      }`}
      data-testid={plan.testid}
    >
      {highlighted && (
        <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-white">
          <Sparkles className="h-3 w-3 text-[#F5D748]" strokeWidth={2.2} />
          Most Popular
        </span>
      )}

      {highlighted ? (
        <span
          className="h-12 w-12 rounded-full bg-[conic-gradient(from_200deg,#FF8AF0,#FFD86B,#7BEBFF,#8A7BFF,#FF8AF0)]"
          aria-hidden="true"
        />
      ) : (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink">
          <Lock className="h-5 w-5 text-white" strokeWidth={2.1} />
        </span>
      )}

      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">{plan.name}</h3>
      <p className="mt-1 text-xs text-ink-soft">{plan.tag}</p>

      <LockedPrice mask={plan.mask} currency={currency} testid={`${plan.testid}-price`} />

      <p className="mt-6 text-xs font-bold text-ink">{plan.includedLabel}</p>
      <ul className="mt-3.5 flex-1 space-y-2.5">
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/75">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/50" strokeWidth={2.4} />
            {b}
          </li>
        ))}
      </ul>

      <TapCTA
        onClick={() => openWaitlist(source, { interest: plan.interest })}
        className="mt-8 h-11 w-full rounded-full bg-ink font-display text-sm font-semibold text-white transition-colors hover:bg-black/80"
        testid={`${plan.testid}-cta`}
      >
        {plan.cta}
      </TapCTA>
    </div>
  );
}

export default function Pricing() {
  const { openWaitlist } = useWaitlist();
  const [currency, setCurrency] = useState("usd");
  return (
    <>
      <Seo
        title="Pricing — Two Plans for Agency Reporting | Fluxvex"
        description="Starter and Growth plans for agency reporting, previewable in USD and INR. Fluxvex pricing is not disclosed yet—join the waitlist to see it first."
        path="/pricing"
      />
      <Navbar />
      <main className="pt-[76px]">
        <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft">
                Our
                <span className="h-1 w-1 rounded-full bg-ink/40" aria-hidden="true" />
                Pricing
              </p>
            </Reveal>
            <CinematicText
              as="h1"
              className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl lg:text-[56px]"
            >
              Built for agencies at every stage.
            </CinematicText>
            <Reveal y={16} delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-ink-soft sm:text-base">
                Whether you’re starting small or scaling fast, there’s a reporting plan that fits. Pricing stays locked
                until launch—waitlist members see it first.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.25}>
              <div className="mt-8 flex justify-center">
                <CurrencyToggle value={currency} onChange={setCurrency} />
              </div>
            </Reveal>
          </div>

          {/* plan group inside a soft gray tray */}
          <div className="mx-auto mt-12 max-w-4xl rounded-[20px] border border-line bg-surface p-2.5 sm:p-3" data-testid="pricing-plan-tray">
            <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">
              <Reveal className="h-full">
                <PagePlanCard
                  currency={currency}
                  plan={{
                    name: "Starter",
                    tag: "For agencies beginning their reporting journey",
                    includedLabel: "What’s included:",
                    mask: { usd: "$••", inr: "₹ •,•••" },
                    bullets: [
                      "For agencies managing up to 5 clients",
                      "Core reporting workflow for the initial supported integrations",
                      "Consistent report structure",
                      "Agency branding, if included in the launch scope",
                    ],
                    cta: "Get Starter updates",
                    interest: "Starter",
                    testid: "pricing-page-card-starter",
                  }}
                  source="pricing-page-starter"
                />
              </Reveal>
              <Reveal delay={0.1} className="h-full">
                <PagePlanCard
                  highlighted
                  currency={currency}
                  plan={{
                    name: "Growth",
                    tag: "For scaling agencies",
                    includedLabel: "Everything in Starter, plus:",
                    mask: { usd: "$•••", inr: "₹ ••,•••" },
                    bullets: [
                      "For agencies managing more than 5 clients",
                      "Designed for a larger client portfolio",
                      "Team and workflow capabilities only if confirmed for launch",
                    ],
                    cta: "Join the Growth waitlist",
                    interest: "Growth",
                    testid: "pricing-page-card-growth",
                  }}
                  source="pricing-page-growth"
                />
              </Reveal>
            </div>
          </div>

          <p
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs leading-relaxed text-ink-soft/80"
            data-testid="pricing-price-note"
          >
            <Countdown />
            <span>
              <Lock className="mr-1 inline h-3 w-3 align-[-2px]" />
              Final pricing and billing terms will be announced before launch—waitlist members see it first.
            </span>
          </p>

          {/* comparison */}
          <Reveal>
            <div className="mx-auto mt-16 max-w-4xl">
              <CinematicText as="h2" className="font-display text-2xl font-semibold tracking-tight text-ink">
                How the plans compare
              </CinematicText>
              <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-page" data-testid="pricing-comparison-table">
                <table className="w-full min-w-[640px] text-left">
                  <thead>
                    <tr className="border-b border-line bg-elevated">
                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Decision</th>
                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Starter</th>
                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS(currency).map(([row, s, g], i) => (
                      <tr key={row} className={`border-b border-hairline last:border-b-0 ${i % 2 ? "bg-surface/60" : ""}`}>
                        <td className="px-5 py-4 text-sm font-medium text-ink">{row}</td>
                        <td className="px-5 py-4 text-sm text-ink-soft">{s}</td>
                        <td className="px-5 py-4 text-sm text-ink-soft">{g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-soft/80">
                Rows marked “To be announced” are undecided product decisions—we won’t guess them on a marketing page.
              </p>
            </div>
          </Reveal>

          {/* pricing faqs */}
          <Reveal>
            <div className="mx-auto mt-16 max-w-3xl">
              <CinematicText as="h2" className="font-display text-2xl font-semibold tracking-tight text-ink">
                Pricing questions
              </CinematicText>
              <div className="mt-6 space-y-4">
                {PRICING_FAQS.map(([q, a]) => (
                  <div key={q} className="rounded-xl border border-line bg-page p-5" data-testid={`pricing-faq-${q.length}`}>
                    <p className="text-[15px] font-semibold text-ink">{q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* iridescent “not sure” cta */}
          <Reveal>
            <div className="relative mt-16 overflow-hidden rounded-2xl px-6 py-12 text-center sm:py-14" data-testid="pricing-unsure-card">
              <div
                className="absolute inset-0 bg-[linear-gradient(115deg,#FFD9EC_0%,#FFF3C4_28%,#D9F6FF_55%,#E3DBFF_78%,#FFD9EC_100%)]"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute -left-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#FF9AD5] opacity-40 blur-3xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#8AB8FF] opacity-40 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="mx-auto flex w-fit items-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                    <FluxvexMark size={26} />
                  </span>
                  <span className="z-10 -ml-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink shadow-md">
                    <MessageCircle className="h-3.5 w-3.5 text-white" strokeWidth={2.1} />
                  </span>
                </div>
                <CinematicText as="h2" className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Not sure which plan is right for you?
                </CinematicText>
                <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-ink/70">
                  Join the waitlist and pick your plan interest—we’ll email the announcement the moment pricing lands.
                </p>
                <TapCTA
                  onClick={() => openWaitlist("pricing-page-cta")}
                  className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-black/80"
                  testid="pricing-page-cta-button"
                >
                  Get pricing updates
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </TapCTA>
                <p className="mt-4 text-xs text-ink/70">
                  Questions first? <Link to="/contact" className="font-semibold text-ink underline-offset-4 hover:underline">Contact the team</Link>.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

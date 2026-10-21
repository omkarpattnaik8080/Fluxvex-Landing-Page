import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import { PlanCard } from "@/components/PricingPreview";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useWaitlist } from "@/components/WaitlistContext";

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
  ["Indicative price (per month)", currency === "usd" ? "$49" : "₹3,999", currency === "usd" ? "$149" : "₹11,999"],
  ...TABLE_ROWS,
];

const PRICING_FAQS = [
  ["When will pricing be announced?", "Indicative pricing in USD and INR is shown above as a guide—final pricing will be announced before launch. Join the waitlist and you’ll get the announcement by email."],
  ["Why do USD and INR prices differ?", "The INR amounts are rounded conversions of the USD guide amounts for readability. The final announcement will confirm exact billing currencies, taxes, and terms."],
  ["Will early-access users receive launch updates?", "Yes. Waitlist members receive meaningful launch and early-access updates by email."],
  ["What counts as a client?", "We’re finalizing whether a client means one connected brand or one reporting workspace. The definition will be published with pricing."],
  ["Can I move from Starter to Growth?", "Yes—the plan structure is designed around client count, so you move when your portfolio does. Details will be announced with pricing."],
  ["Will I need a card to join the waitlist?", "No. The waitlist only asks for a work email and optional details—there is no payment step."],
];

export default function Pricing() {
  const { openWaitlist } = useWaitlist();
  const [currency, setCurrency] = useState("usd");
  return (
    <>
      <Seo
        title="Pricing — Two Plans for Agency Reporting | Fluxvex"
        description="Starter and Growth plans with indicative launch pricing in USD and INR. Fluxvex final pricing will be announced before launch—join the waitlist for updates."
        path="/pricing"
      />
      <Navbar />
      <main className="pt-[76px]">
        <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Pricing</p>
            </Reveal>
            <CinematicText
              as="h1"
              className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl lg:text-6xl"
            >
              Simple pricing for agency reporting.
            </CinematicText>
            <Reveal y={16} delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-ink-soft sm:text-base">
                Two plans are taking shape around your client portfolio. Indicative launch pricing is shown below—final
                pricing will be announced before launch.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.25}>
              <div className="mt-8 flex justify-center">
                <CurrencyToggle value={currency} onChange={setCurrency} />
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <PlanCard
                currency={currency}
                plan={{
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
                  testid: "pricing-page-card-starter",
                }}
                source="pricing-page-starter"
              />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <PlanCard
                currency={currency}
                plan={{
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
                  testid: "pricing-page-card-growth",
                }}
                highlighted
                source="pricing-page-growth"
              />
            </Reveal>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink-soft/80" data-testid="pricing-indicative-note">
            Indicative launch pricing in the selected currency—final pricing and billing terms will be announced before
            launch.
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

          {/* cta */}
          <Reveal>
            <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-accent-border bg-accent-tint p-8 text-center sm:p-12">
              <CinematicText as="h2" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Get pricing updates
              </CinematicText>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                Join the waitlist and pick your plan interest—we’ll email the announcement the moment it’s ready.
              </p>
              <button
                onClick={() => openWaitlist("pricing-page-cta")}
                className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-accent-strong"
                data-testid="pricing-page-cta-button"
              >
                Get pricing updates
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-xs text-ink-soft">
                Questions first? <Link to="/contact" className="text-accent underline-offset-4 hover:underline">Contact the team</Link>.
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

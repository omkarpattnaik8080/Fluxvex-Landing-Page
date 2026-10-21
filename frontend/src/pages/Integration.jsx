import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import NotFound from "@/pages/NotFound";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark, LinkedInMark, TikTokMark } from "@/components/brand/IntegrationMarks";
import { INTEGRATIONS, getIntegration } from "@/data/integrations";
import { useWaitlist } from "@/components/WaitlistContext";

const MARKS = { googleAds: GoogleAdsMark, meta: MetaMark, ga4: GA4Mark, linkedin: LinkedInMark, tiktok: TikTokMark };
const STEP_ICONS = { link: "M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5", wand: "M15 4V2m0 20v-2m5-15h2M2 9h2m13.5-4.5L19 3M4.5 19.5 3 21m14.5-2.5L19 20M4.5 4.5 3 3m9 6-6 6", clock: "M12 7.5V12l3 2M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z", campaign: "M3 11h4l10-6v14l-10-6H3v8", target: "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 12m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0M12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0", clicks: "M9 3v4a2 2 0 0 1-2 2H3m18 10v-4a2 2 0 0 0-2-2h-4M3 9v6a3 3 0 0 0 3 3h2m13-9V9a3 3 0 0 0-3-3h-2", globe: "M12 3a9 9 0 1 0 9 9M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z", gauge: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm4.5-7.5L14 10M12 21a9 9 0 1 1 9-9" };

function StepIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={STEP_ICONS[name]} />
    </svg>
  );
}

function Diagram({ config }) {
  const Mark = MARKS[config.mark];
  return (
    <IsoPlane w={360} h={210} scale="scale-[0.72] sm:scale-90 lg:scale-105" className="mx-auto h-full">
      <IsoTile x={12} y={78} w={60} h={60} active>
        <Mark size={28} />
      </IsoTile>
      <IsoWire from={[74, 108]} to={[142, 108]} delay={0} />
      <IsoTile x={142} y={84} w={54} h={54} active>
        <FluxvexMark size={26} className="rounded-lg" />
      </IsoTile>
      <IsoWire from={[198, 108]} to={[246, 108]} delay={0.7} />
      <IsoTile x={246} y={80} w={48} h={56} float={false}>
        <span className="flex h-10 w-9 flex-col gap-[3px] p-1" aria-hidden="true">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-ink font-display text-[7px] font-bold text-white">N</span>
          <span className="mt-1 h-[3px] w-full rounded bg-accent/50" />
          <span className="h-[2px] w-4/5 rounded bg-black/15" />
          <span className="h-[2px] w-3/5 rounded bg-black/10" />
        </span>
      </IsoTile>
      <IsoBillboard x={16} y={164}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">{config.diagramLabels[0]}</span>
      </IsoBillboard>
      <IsoBillboard x={142} y={30}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-[#0E8A3E]">{config.diagramLabels[1]}</span>
      </IsoBillboard>
      <IsoBillboard x={244} y={158}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">{config.diagramLabels[2]}</span>
      </IsoBillboard>
    </IsoPlane>
  );
}

export default function Integration() {
  const { slug } = useParams();
  const config = getIntegration(slug);
  const { openWaitlist } = useWaitlist();

  if (!config) return <NotFound />;

  const Mark = MARKS[config.mark];
  const others = INTEGRATIONS.filter((i) => i.slug !== config.slug);

  return (
    <>
      <Seo title={config.metaTitle} description={config.description} path={`/integrations/${config.slug}`} />
      <Navbar />
      <main className="pt-[76px]" data-testid="integration-page">
        {/* hero */}
        <div className="border-b border-line bg-page">
          <div className="mx-auto max-w-[1100px] px-5 py-14 lg:px-8 lg:py-20">
            <Reveal y={12}>
              <Link
                to="/#integrations"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
                data-testid="integration-back-link"
              >
                <ArrowLeft className="h-4 w-4" /> All integrations
              </Link>
            </Reveal>
            <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <Reveal>
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-[0_20px_40px_-18px_rgba(16,16,20,0.35)]">
                    <Mark size={30} />
                  </span>
                </Reveal>
                <Reveal y={14} delay={0.05}>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Integration</p>
                </Reveal>
                <CinematicText
                  as="h1"
                  className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl"
                >
                  {config.name} + Fluxvex
                </CinematicText>
                <Reveal y={14} delay={0.1}>
                  <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-ink-soft">{config.tagline}</p>
                </Reveal>
                <Reveal y={14} delay={0.15}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openWaitlist(`integration-${config.slug}`)}
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                      data-testid="integration-cta-button"
                    >
                      Join the waitlist
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <Link
                      to="/#workflow"
                      className="inline-flex h-11 items-center rounded-full border border-black/10 bg-surface px-6 font-display text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
                      data-testid="integration-workflow-link"
                    >
                      See the workflow
                    </Link>
                  </div>
                </Reveal>
                <Reveal y={12} delay={0.2}>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {config.heroChips.map((chip) => (
                      <span key={chip} className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-ink-soft">
                        <Check className="h-3 w-3 text-[#0E8A3E]" strokeWidth={2.5} />
                        {chip}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.1}>
                <div data-testid="integration-diagram">
                  <Diagram config={config} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* what it pulls in */}
        <div className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8 lg:py-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              What Fluxvex pulls from {config.name}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {config.stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="h-full">
                <div
                  className="group flex h-full items-start gap-4 rounded-xl border border-line bg-page p-6 transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/25 hover:shadow-[0_28px_56px_-28px_rgba(61,67,232,0.35)]"
                  data-testid={`integration-stat-${i + 1}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <StepIcon name={s.icon} />
                  </span>
                  <p className="pt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* how connection works */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              How the connection works
            </h2>
          </Reveal>
          <div className="mt-8 space-y-4">
            {config.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="flex items-center gap-6 rounded-xl border border-line bg-page p-6" data-testid={`integration-step-${i + 1}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint font-display text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.desc}</p>
                  </div>
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink-soft sm:flex">
                    <StepIcon name={s.icon} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* faq */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Questions about {config.name}
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {config.faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06}>
                <details className="group rounded-xl border border-line bg-page px-6 py-5 open:shadow-[0_20px_40px_-24px_rgba(16,16,20,0.25)]" data-testid={`integration-faq-${i + 1}`}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* cross-links */}
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Also explore</span>
              {others.map((o) => {
                const OtherMark = MARKS[o.mark];
                return (
                  <Link
                    key={o.slug}
                    to={`/integrations/${o.slug}`}
                    className="flex items-center gap-2 rounded-full border border-line bg-page px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent"
                    data-testid={`integration-crosslink-${o.slug}`}
                  >
                    <OtherMark size={16} />
                    {o.name}
                  </Link>
                );
              })}
            </div>
          </Reveal>

          {/* CTA band */}
          <Reveal>
            <div className="mt-14 rounded-2xl border border-accent-border bg-accent-tint p-8 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">See it with your own data</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                Connect {config.name} once at launch—every report after that builds itself.
              </p>
              <button
                onClick={() => openWaitlist(`integration-${config.slug}`)}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                data-testid="integration-bottom-cta-button"
              >
                Join the waitlist
              </button>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

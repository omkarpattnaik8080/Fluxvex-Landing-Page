import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
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
import { INTEGRATIONS, getIntegration, PERMISSIONS } from "@/data/integrations";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";

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

/* Sample report mock — what the integration's data looks like inside a Fluxvex report */
function SampleReport({ config }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-40px_rgba(16,16,20,0.4)] ring-1 ring-black/[0.08]" data-testid="integration-sample-report">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent via-[#8A5CFF] to-mint" />
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-3.5 sm:px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ink to-[#2A2F55] font-display text-[13px] font-bold text-white">N</span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">{config.sample.title}</p>
          <p className="text-[10.5px] text-black/45">Northbeam Media · June 2025 · Sample data</p>
        </div>
        <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-semibold text-[#0E8A3E] sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse-dot" /> Report section
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="overflow-hidden rounded-xl border border-black/[0.06]">
          {config.sample.rows.map(([metric, value, delta, good], i) => (
            <motion.div
              key={metric}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease: [0.25, 1, 0.5, 1] }}
              className={`flex items-center gap-3 px-4 py-3 text-sm ${i % 2 ? "bg-[#FAFAF7]" : "bg-white"}`}
            >
              <span className="min-w-0 flex-1 truncate font-medium text-ink/80">{metric}</span>
              <span className="font-display font-semibold text-ink">{value}</span>
              <span className={`w-28 text-right text-xs font-medium ${good ? "text-[#0E8A3E]" : "text-black/45"}`}>{delta}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="mt-4 flex items-start gap-3 rounded-xl border border-accent/20 bg-gradient-to-r from-accent-tint/80 to-transparent px-4 py-3"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-white shadow-[0_8px_18px_-6px_rgba(61,67,232,0.7)]">
            <Sparkles className="h-3 w-3" />
          </span>
          <p className="text-[12px] leading-relaxed text-ink/80">
            <span className="font-semibold text-accent">AI-drafted summary ·</span> {config.sample.ai}
          </p>
        </motion.div>
        <p className="mt-3.5 flex items-center gap-1.5 text-[10.5px] text-black/40">
          <Lock className="h-3 w-3" /> Illustrative sample—real values come from your connected accounts.
        </p>
      </div>
    </div>
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
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-[0_20px_40px_-18px_rgba(16,16,20,0.35)]">
                    <Mark size={30} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink ring-2 ring-page" title="Supported at launch">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                  </span>
                </Reveal>
                <Reveal y={14} delay={0.05}>
                  <p className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Integration
                    <span className="flex items-center gap-1.5 rounded-full border-mint/40 bg-mint/10 px-2.5 py-0.5 text-[9px] tracking-[0.14em] text-[#0E8A3E] normal-case">
                      <span className="h-1 w-1 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> Supported at launch
                    </span>
                  </p>
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
                    <TapCTA
                      onClick={() => openWaitlist(`integration-${config.slug}`)}
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                      testid="integration-cta-button"
                    >
                      Join the waitlist
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </TapCTA>
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

        <div className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8 lg:py-20">
          {/* sample report */}
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Where {config.name} shows up in the report
                </h2>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                  Headline numbers first, AI-drafted context underneath, detail in the appendix—every cycle.
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-ink-soft">
                <TrendingUp className="h-3.5 w-3.5 text-[#0E8A3E]" /> Sample section
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <SampleReport config={config} />
            </div>
          </Reveal>

          {/* what it pulls in */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
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

          {/* how connection works — vertical timeline */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              How the connection works
            </h2>
          </Reveal>
          <div className="relative mt-8 space-y-4 before:absolute before:bottom-6 before:left-[31px] before:top-6 before:hidden before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-line before:to-accent/30 sm:before:block" aria-hidden="true">
            {config.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative flex items-center gap-6 rounded-xl border border-line bg-page p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/35 hover:shadow-[0_24px_48px_-28px_rgba(61,67,232,0.4)]" data-testid={`integration-step-${i + 1}`}>
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white ring-4 ring-page">
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

          {/* permissions & scope */}
          <Reveal>
            <div className="mt-16 overflow-hidden rounded-2xl border border-line" data-testid="integration-permissions">
              <div className="flex items-center gap-3 border-b border-line bg-surface px-6 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-semibold tracking-tight text-ink">Permissions &amp; scope</h2>
                <span className="ml-auto rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0E8A3E]">
                  Read-only
                </span>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {PERMISSIONS.map((p, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-xl bg-surface/70 p-4 text-[13px] leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E8A3E]" strokeWidth={2.4} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

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
            <div className="mt-14">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Also explore</span>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {others.map((o) => {
                  const OtherMark = MARKS[o.mark];
                  return (
                    <Link
                      key={o.slug}
                      to={`/integrations/${o.slug}`}
                      className="group flex items-center gap-3.5 rounded-xl border border-line bg-page p-4 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_24px_48px_-28px_rgba(61,67,232,0.4)]"
                      data-testid={`integration-crosslink-${o.slug}`}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface">
                        <OtherMark size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink">{o.name}</span>
                        <span className="block truncate text-xs text-ink-soft">{o.tagline}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-black/30 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* CTA band — dark premium */}
          <Reveal>
            <div className="relative mt-14 overflow-hidden rounded-[24px] bg-[#0B0B14] px-8 py-12 text-center sm:py-14" data-testid="integration-cta-band">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(93,99,255,0.4),transparent_70%)] blur-3xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.3),transparent_70%)] blur-3xl" aria-hidden="true" />
              <div className="fine-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <span className="mx-auto flex w-fit items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]">
                    <Mark size={20} />
                  </span>
                  <FluxvexMark size={10} className="hidden text-white/40 sm:block" aria-hidden="true" />
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]">
                    <FluxvexMark size={20} />
                  </span>
                </span>
                <h2 className="mx-auto mt-6 max-w-md font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  See it with your own data
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
                  Connect {config.name} once at launch—every report after that builds itself.
                </p>
                <TapCTA
                  onClick={() => openWaitlist(`integration-${config.slug}`)}
                  className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 font-display text-sm font-semibold text-ink transition-colors hover:bg-white/90"
                  testid="integration-bottom-cta-button"
                >
                  Join the waitlist
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </TapCTA>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

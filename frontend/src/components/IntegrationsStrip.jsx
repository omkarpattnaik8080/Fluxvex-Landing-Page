import { motion } from "framer-motion";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import CinematicText from "@/components/ui/CinematicText";
import { useWaitlist } from "@/components/WaitlistContext";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const slugOf = (name) => name.toLowerCase().replace(/\s+/g, "-");

function LivePill() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[#0E8A3E]/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#0E8A3E]" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] shadow-[0_0_0_3px_rgba(67,214,117,0.18)] animate-pulse-dot" /> LIVE
    </span>
  );
}

/* viz panels — floating white chips on the soft tinted zone */
function MiniBars({ delay = 0 }) {
  const bars = [46, 70, 54, 88, 62, 100];
  return (
    <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={`w-2.5 rounded-t-sm ${i === bars.length - 1 ? "bg-gradient-to-t from-mint/25 to-[#0E8A3E]" : "bg-gradient-to-t from-accent/15 to-accent/60"}`}
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.25, 1, 0.5, 1] }}
        />
      ))}
      <span className="ml-2 flex items-center gap-1.5 self-start rounded-md bg-[#0E8A3E]/10 px-2 py-1 text-[10px] font-bold text-[#0E8A3E]">
        <span className="h-1 w-1 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> CONV +11.4%
      </span>
    </div>
  );
}

function MiniSpark({ delay = 0 }) {
  return (
    <div className="flex h-12 items-end gap-3" aria-hidden="true">
      <svg viewBox="0 0 120 44" className="h-full w-28">
        <motion.path
          d="M2 34 C 20 30, 30 36, 46 26 S 78 12, 96 14 S 114 8, 118 6"
          fill="none"
          stroke="#0E8A3E"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
        <motion.circle
          cx="118"
          cy="6"
          r="3"
          fill="#0E8A3E"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 1.1, type: "spring", stiffness: 300 }}
        />
      </svg>
      <span className="flex items-center gap-1.5 self-start rounded-md bg-[#0E8A3E]/10 px-2 py-1 text-[10px] font-bold text-[#0E8A3E]">
        <span className="h-1 w-1 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> ROAS 2.1x
      </span>
    </div>
  );
}

function MiniDonut({ delay = 0 }) {
  const R = 15.5;
  const CIRC = 2 * Math.PI * R;
  const segs = [
    { p: 0.44, c: "#3D43E8" },
    { p: 0.33, c: "#7B5CFF" },
    { p: 0.23, c: "#0E8A3E" },
  ];
  let acc = 0;
  return (
    <div className="flex h-12 items-center gap-3" aria-hidden="true" data-testid="ga4-donut-viz">
      <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
        <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(16,16,20,0.07)" strokeWidth="5" />
        {segs.map((s, i) => {
          const off = acc;
          acc += s.p;
          return (
            <motion.circle
              key={i}
              cx="20"
              cy="20"
              r={R}
              fill="none"
              stroke={s.c}
              strokeWidth="5"
              strokeDasharray={`${s.p * CIRC} ${CIRC}`}
              strokeDashoffset={-off * CIRC}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: delay + i * 0.16 }}
            />
          );
        })}
      </svg>
      <span className="flex items-center gap-1.5 rounded-md bg-[#0E8A3E]/10 px-2 py-1 text-[10px] font-bold text-[#0E8A3E]">
        <span className="h-1 w-1 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> SESSIONS +18.2%
      </span>
    </div>
  );
}

/* The flow rail — channels → Fluxvex AI → branded report */
function RailPacket({ delay = 0 }) {
  return (
    <motion.span
      className="absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(61,67,232,0.35)]"
      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    />
  );
}

function SyncRail() {
  return (
    <Reveal delay={0.1}>
      <div
        className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_18px_40px_-28px_rgba(16,16,20,0.35)]"
        data-testid="integrations-sync-rail"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">The flow</span>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {[<GoogleAdsMark size={14} key="g" />, <MetaMark size={14} key="m" />, <GA4Mark size={14} key="a" />].map((m, i) => (
              <motion.span
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-white shadow-sm"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              >
                {m}
              </motion.span>
            ))}
          </span>
          <span className="text-[12px] font-medium text-ink-soft">Your channels</span>
          <span className="relative hidden h-px min-w-[56px] flex-1 border-t border-dashed border-accent/40 sm:block" aria-hidden="true">
            <RailPacket delay={0} />
          </span>
          <span className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 shadow-[0_12px_26px_-10px_rgba(61,67,232,0.55)]">
            <FluxvexMark size={15} />
            <span className="text-[12px] font-semibold text-white">Fluxvex AI</span>
          </span>
          <span className="relative hidden h-px min-w-[56px] flex-1 border-t border-dashed border-accent/40 sm:block" aria-hidden="true">
            <RailPacket delay={0.9} />
          </span>
          <span className="flex items-center gap-2 rounded-full bg-ink px-3 py-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <rect x="5" y="3" width="14" height="18" rx="2" stroke="#FFFFFF" strokeWidth="1.8" />
              <path d="M9 8h6M9 12h6M9 16h4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] font-semibold text-white">Branded report</span>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function BentoCard({ item, i, viz = null, className = "" }) {
  const hrefSlug = item.href ? item.href.split("/").pop() : slugOf(item.name);
  const cardCls = `group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_40px_80px_-40px_rgba(61,67,232,0.45)]`;
  return (
    <Reveal delay={i * 0.07} className={`h-full ${className}`}>
      <TapCTA to={item.href} className={cardCls} testid={`integration-card-${hrefSlug}`}>
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface shadow-[0_10px_24px_-12px_rgba(16,16,20,0.35)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
            {item.mark}
          </span>
          <LivePill />
        </div>
        <div className="relative">
          <p className="text-base font-semibold text-ink">{item.name}</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{item.desc}</p>
        </div>
        {viz}
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Integration details
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </TapCTA>
    </Reveal>
  );
}

export default function IntegrationsStrip() {
  const { openWaitlist } = useWaitlist();
  return (
    <section id="integrations" className="bg-page" data-testid="section-integrations">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        {/* centered header */}
        <Reveal className="flex flex-col items-center text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#0E8A3E]/25 bg-[#EAF6E9] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E8A3E]"
            data-testid="integrations-qualifier"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" aria-hidden="true" />
            Initial integration focus
          </span>
          <CinematicText
            as="h2"
            className="mt-5 max-w-2xl font-display text-[32px] font-bold leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-[44px]"
          >
            Connect once. Report from everywhere.
          </CinematicText>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-ink-soft">
            The channels your reports depend on, wired into one governed pipeline — no exports, no stale
            screenshots, no rebuilds.
          </p>
        </Reveal>

        <SyncRail />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <BentoCard
            i={0}
            className="sm:col-span-2 lg:col-span-3"
            viz={
              <div className="rounded-xl border border-line bg-surface/80 px-4 pb-3.5 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Conversions this month</p>
                <div className="mt-2.5">
                  <MiniBars delay={0.3} />
                </div>
              </div>
            }
            item={{
              mark: <GoogleAdsMark size={24} />,
              name: "Google Ads",
              href: "/integrations/google-ads",
              desc: "Campaign performance data from the channels you manage.",
            }}
          />
          <BentoCard
            i={1}
            className="sm:col-span-2 lg:col-span-3"
            viz={
              <div className="rounded-xl border border-line bg-surface/80 px-4 pb-3.5 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Efficiency trend</p>
                <div className="mt-2.5">
                  <MiniSpark delay={0.4} />
                </div>
              </div>
            }
            item={{
              mark: <MetaMark size={24} />,
              name: "Meta Ads",
              href: "/integrations/meta-ads",
              desc: "Delivery and creative results across Meta placements.",
            }}
          />
          <BentoCard
            i={2}
            className="lg:col-span-2"
            viz={
              <div className="rounded-xl border border-line bg-surface/80 px-4 pb-3.5 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Session mix</p>
                <div className="mt-2.5">
                  <MiniDonut delay={0.35} />
                </div>
              </div>
            }
            item={{
              mark: <GA4Mark size={24} />,
              name: "Google Analytics 4",
              href: "/integrations/ga4",
              desc: "Site engagement and conversion context for the story.",
            }}
          />

          {/* pipeline card — both upcoming channels in one place */}
          <Reveal delay={0.2} className="h-full lg:col-span-2">
            <div
              className="flex h-full flex-col gap-3.5 rounded-2xl border border-dashed border-black/20 bg-surface/80 p-6"
              data-testid="integrations-pipeline"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-black/25 bg-page opacity-80">
                  <ThumbsUp className="h-5 w-5 text-[#0E8A3E]/70" strokeWidth={1.8} />
                </span>
                <span className="rounded-full border border-dashed border-black/25 bg-page px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/50">
                  Coming soon
                </span>
              </div>
              <div>
                <p className="text-base font-semibold text-ink">In the pipeline</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
                  B2B and short-form video reporting, voted in by the community.
                </p>
              </div>
              <div className="mt-auto space-y-3.5 pt-1">
                {[
                  { name: "LinkedIn Ads", pct: 68, testid: "soon-progress-linkedin-ads" },
                  { name: "TikTok Ads", pct: 41, testid: "soon-progress-tiktok-ads" },
                ].map((c) => (
                  <div key={c.name} data-testid={c.testid}>
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40">
                      <span>{c.name}</span>
                      <span className="text-black/60">{c.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                      <motion.div
                        className="h-full rounded-full bg-[repeating-linear-gradient(45deg,#3D43E8_0_5px,#7B7FFF_5px_10px)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* dark-green CTA card */}
          <Reveal delay={0.25} className="h-full lg:col-span-2">
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-[radial-gradient(120%_160%_at_85%_0%,#1E7A3C_0%,#0C2E1B_70%)] p-6">
              <span
                className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.35),transparent_70%)] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">Your vote decides</p>
                <p className="mt-2.5 font-display text-xl font-semibold leading-snug tracking-tight text-white">
                  Tell us which channel your agency needs next.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openWaitlist("integrations-more")}
                className="group relative inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-[13px] font-semibold text-ink transition-colors hover:bg-mint/90"
                data-testid="integrations-more-cta"
              >
                Request a channel
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

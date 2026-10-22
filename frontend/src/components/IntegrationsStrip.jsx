import { motion } from "framer-motion";
import { ArrowRight, Plus, ThumbsUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import CinematicText from "@/components/ui/CinematicText";
import { useWaitlist } from "@/components/WaitlistContext";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark, LinkedInMark, TikTokMark } from "@/components/brand/IntegrationMarks";

const slugOf = (name) => name.toLowerCase().replace(/\s+/g, "-");

function LivePill() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[#0E8A3E]/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#0E8A3E]" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] shadow-[0_0_0_3px_rgba(67,214,117,0.18)] animate-pulse-dot" /> LIVE
    </span>
  );
}

/* Floating white viz panel — the reference's floating "Growth" chip anatomy */
function VizPanel({ label, children }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/[0.06] bg-white/90 px-4 pb-3.5 pt-3 shadow-[0_18px_36px_-20px_rgba(16,16,20,0.3)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">{label}</p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

/* Mini equalizer for the Google Ads card */
function MiniBars({ delay = 0 }) {
  const bars = [46, 70, 54, 88, 62, 100];
  return (
    <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={`w-2.5 rounded-t-sm ${i === bars.length - 1 ? "bg-gradient-to-t from-mint/30 to-[#0E8A3E]" : "bg-gradient-to-t from-accent/15 to-accent/60"}`}
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

/* Mini sparkline for the Meta Ads card */
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

/* Donut for the GA4 card */
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

/* Build progress for the coming-soon cards */
function SoonProgress({ pct, label, delay = 0, testid }) {
  return (
    <div aria-hidden="true" data-testid={testid}>
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-black/40">
        <span>{label}</span>
        <span className="text-black/60">{pct}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
        <motion.div
          className="h-full rounded-full bg-[repeating-linear-gradient(45deg,#3D43E8_0_5px,#7B7FFF_5px_10px)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>
    </div>
  );
}

/* The flow card — soft wash strip: channels → Fluxvex AI → branded report */
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
        className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-line bg-[linear-gradient(120deg,#EEF0FF_0%,#FDFDFA_50%,#EAF6E9_100%)] px-5 py-4"
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

function BentoCard({ item, soon = false, i, viz = null, progress = null, className = "" }) {
  const hrefSlug = item.href ? item.href.split("/").pop() : slugOf(item.name);
  const testid = `integration-card-${hrefSlug}`;
  const cardCls = `group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${
    soon
      ? "border-dashed border-black/20 bg-surface/80"
      : "border-line hover:border-accent/40 hover:shadow-[0_40px_80px_-40px_rgba(61,67,232,0.45)]"
  }`;

  const body = (
    <>
      <div className="relative flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-white transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${
            soon ? "border-dashed border-black/20 opacity-80" : "border-line shadow-[0_10px_24px_-12px_rgba(16,16,20,0.35)]"
          }`}
        >
          {item.mark}
        </span>
        {soon ? (
          <span
            className="rounded-full border border-dashed border-black/25 bg-page px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/50"
            data-testid={`integration-soon-${slugOf(item.name)}`}
          >
            Coming soon
          </span>
        ) : (
          <LivePill />
        )}
      </div>
      <div className="relative">
        <p className="text-base font-semibold text-ink">{item.name}</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{item.desc}</p>
      </div>
      {viz}
      {progress}
      {soon ? (
        <span className="mt-auto flex items-center gap-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">
          <ThumbsUp className="h-3 w-3 text-[#0E8A3E]/70" /> Top community request
        </span>
      ) : (
        <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          Integration details
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  return (
    <Reveal delay={i * 0.07} className={`h-full ${className}`}>
      {soon ? (
        <div className={cardCls} data-testid={testid}>
          {body}
        </div>
      ) : (
        <TapCTA to={item.href} className={cardCls} testid={testid}>
          {body}
        </TapCTA>
      )}
    </Reveal>
  );
}

export default function IntegrationsStrip() {
  const { openWaitlist } = useWaitlist();
  return (
    <section id="integrations" className="bg-page" data-testid="section-integrations">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        {/* centered header — reference style */}
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
            className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-[1.06] tracking-tighter2 text-ink sm:text-4xl"
          >
            One reporting workflow. The channels your clients already use.
          </CinematicText>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-ink-soft">
            Connect each channel once—every report pulls from the same governed pipeline. No exports, no stale
            screenshots, no rebuilds.
          </p>
          {/* live status chips — folded into the header */}
          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5"
            data-testid="integrations-status"
          >
            <span className="flex -space-x-1.5" aria-hidden="true">
              {[<GoogleAdsMark size={13} key="g" />, <MetaMark size={13} key="m" />, <GA4Mark size={13} key="a" />].map((m, i) => (
                <span key={i} className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white shadow-sm">
                  {m}
                </span>
              ))}
            </span>
            <span className="rounded-full border border-line bg-white px-3 py-1 text-[11.5px] font-semibold text-ink shadow-sm">
              3 of 5 channels live at launch
            </span>
            <LivePill />
          </div>
        </Reveal>

        {/* the flow — channels into AI into branded report */}
        <SyncRail />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <BentoCard
            i={0}
            className="sm:col-span-2 lg:col-span-3 border-line bg-[linear-gradient(150deg,#EEF0FF_0%,#FBFBFF_48%,#EAF6E9_100%)]"
            viz={
              <VizPanel label="Conversions this month">
                <MiniBars delay={0.3} />
              </VizPanel>
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
            className="sm:col-span-2 lg:col-span-3 border-line bg-[linear-gradient(150deg,#F3F1FF_0%,#FBFAFF_50%,#EEF0FF_100%)]"
            viz={
              <VizPanel label="Efficiency trend">
                <MiniSpark delay={0.4} />
              </VizPanel>
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
            className="lg:col-span-2 border-line bg-[linear-gradient(150deg,#EAF6E9_0%,#F7FBF5_55%,#FDFDF8_100%)]"
            viz={
              <VizPanel label="Session mix">
                <MiniDonut delay={0.35} />
              </VizPanel>
            }
            item={{
              mark: <GA4Mark size={24} />,
              name: "Google Analytics 4",
              href: "/integrations/ga4",
              desc: "Site engagement and conversion context for the story.",
            }}
          />
          <BentoCard
            i={3}
            soon
            className="lg:col-span-2"
            progress={<SoonProgress pct={68} label="In build" delay={0.35} testid="soon-progress-linkedin-ads" />}
            item={{ mark: <LinkedInMark size={24} />, name: "LinkedIn Ads", desc: "B2B campaign reporting for a post-launch release." }}
          />
          <BentoCard
            i={4}
            soon
            className="lg:col-span-2"
            progress={<SoonProgress pct={41} label="In build" delay={0.45} testid="soon-progress-tiktok-ads" />}
            item={{ mark: <TikTokMark size={24} />, name: "TikTok Ads", desc: "Short-form video results, after the initial launch." }}
          />
          {/* the anchor card — deep green, like the reference's evidence card */}
          <Reveal delay={0.3} className="h-full sm:col-span-2 lg:col-span-6">
            <div
              className="group relative flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl bg-[radial-gradient(120%_160%_at_85%_0%,#1E7A3C_0%,#0C2E1B_70%)] p-6 sm:flex-row sm:items-center sm:p-7"
            >
              <span
                className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.35),transparent_70%)] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-mint">
                  <Plus className="h-5 w-5" />
                </span>
                <p className="max-w-xl text-[14.5px] leading-relaxed text-white/85">
                  More channels land after launch—LinkedIn Ads and TikTok Ads are in the pipeline.{" "}
                  <span className="font-semibold text-mint">Tell us which one your agency needs next.</span>
                </p>
              </div>
              <TapCTA
                onClick={() => openWaitlist("integrations-more")}
                className="relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-5 font-display text-[13px] font-semibold text-ink transition-colors hover:bg-mint/90"
                testid="integrations-more-cta"
              >
                Request a channel
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </TapCTA>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

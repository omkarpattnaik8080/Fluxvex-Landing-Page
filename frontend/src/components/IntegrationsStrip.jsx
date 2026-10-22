import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import CinematicText from "@/components/ui/CinematicText";
import { useWaitlist } from "@/components/WaitlistContext";
import { GoogleAdsMark, MetaMark, GA4Mark, LinkedInMark, TikTokMark } from "@/components/brand/IntegrationMarks";

const slugOf = (name) => name.toLowerCase().replace(/\s+/g, "-");

function LiveDot() {
  return <span className="mt-1.5 h-2 w-2 rounded-full bg-mint shadow-[0_0_0_3px_rgba(67,214,117,0.18)] animate-pulse-dot" aria-hidden="true" />;
}

/* Mini equalizer for the Google Ads card */
function MiniBars({ delay = 0 }) {
  const bars = [46, 70, 54, 88, 62, 100];
  return (
    <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={`w-2.5 rounded-t-sm ${i === bars.length - 1 ? "bg-gradient-to-t from-mint/25 to-mint/80" : "bg-gradient-to-t from-accent/15 to-accent/45"}`}
          style={{ height: `${h}%`, transformOrigin: "bottom" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.25, 1, 0.5, 1] }}
        />
      ))}
      <span className="ml-2 flex items-center gap-1.5 self-start rounded-md bg-mint/10 px-2 py-1 text-[10px] font-bold text-[#0E8A3E]">
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
      <span className="flex items-center gap-1.5 self-start rounded-md bg-mint/10 px-2 py-1 text-[10px] font-bold text-[#0E8A3E]">
        <span className="h-1 w-1 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> ROAS 2.1x
      </span>
    </div>
  );
}

function BentoCard({ item, soon = false, i, viz = null, className = "" }) {
  const hrefSlug = item.href ? item.href.split("/").pop() : slugOf(item.name);
  const testid = `integration-card-${hrefSlug}`;
  const cardCls = `group relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${
    soon
      ? "border-dashed border-black/20 bg-page/70"
      : "border-line bg-white shadow-[0_30px_60px_-40px_rgba(16,16,20,0.4)] hover:border-accent/40 hover:shadow-[0_44px_84px_-44px_rgba(61,67,232,0.55)]"
  }`;

  const body = (
    <>
      <div className="flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-surface transition-transform duration-300 group-hover:scale-105 ${
            soon ? "border-dashed border-black/25 opacity-80" : "border-line shadow-[0_10px_24px_-12px_rgba(16,16,20,0.35)]"
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
          <LiveDot />
        )}
      </div>
      <div>
        <p className="text-base font-semibold text-ink">{item.name}</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{item.desc}</p>
      </div>
      {viz}
      {soon ? (
        <span className="mt-auto pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">In the pipeline</span>
      ) : (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
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
        <Reveal>
          <CinematicText
            as="h2"
            className="max-w-2xl font-display text-2xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-3xl"
          >
            One reporting workflow. The channels your clients already use.
          </CinematicText>
          <span
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-accent"
            data-testid="integrations-qualifier"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            Initial integration focus
          </span>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <BentoCard
            i={0}
            className="sm:col-span-2 lg:col-span-3"
            viz={<MiniBars delay={0.3} />}
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
            viz={<MiniSpark delay={0.4} />}
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
            item={{ mark: <LinkedInMark size={24} />, name: "LinkedIn Ads", desc: "B2B campaign reporting for a post-launch release." }}
          />
          <BentoCard
            i={4}
            soon
            className="lg:col-span-2"
            item={{ mark: <TikTokMark size={24} />, name: "TikTok Ads", desc: "Short-form video results, after the initial launch." }}
          />
          <Reveal delay={0.3} className="h-full sm:col-span-2 lg:col-span-6">
            <div className="group flex flex-col items-start justify-between gap-5 rounded-2xl border border-dashed border-black/20 bg-gradient-to-r from-surface/70 via-page to-accent-tint/40 p-6 transition-[border-color] duration-300 hover:border-accent/40 sm:flex-row sm:items-center sm:p-7">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-black/25 bg-page text-accent">
                  <Plus className="h-5 w-5" />
                </span>
                <p className="max-w-xl text-[14px] leading-relaxed text-ink-soft">
                  More channels land after launch—LinkedIn Ads and TikTok Ads are in the pipeline. Tell us which one
                  your agency needs next.
                </p>
              </div>
              <TapCTA
                onClick={() => openWaitlist("integrations-more")}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-ink px-5 font-display text-[13px] font-semibold text-white transition-colors hover:bg-black/80"
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

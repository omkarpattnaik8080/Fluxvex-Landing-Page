import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Lock, Wrench } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import CinematicText from "@/components/ui/CinematicText";
import { useWaitlist } from "@/components/WaitlistContext";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const slugOf = (name) => name.toLowerCase().replace(/\s+/g, "-");

/* Mini report mockup for the tall card's visual zone */
function ReportMock() {
  return (
    <div className="relative flex h-full items-center justify-center py-2" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, y: 26, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="w-52 rounded-xl bg-white p-4 shadow-[0_30px_60px_-24px_rgba(16,16,20,0.35)]"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink">
            <FluxvexMark size={13} />
          </span>
          <span className="rounded-full bg-[#0E8A3E]/10 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wide text-[#0E8A3E]">
            June · client-ready
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          <span className="block h-1.5 w-4/5 rounded bg-black/10" />
          <span className="block h-1.5 w-3/5 rounded bg-black/[0.07]" />
        </div>
        <div className="mt-3.5 flex items-end gap-1.5" aria-hidden="true">
          {[42, 66, 50, 82, 60, 96].map((h, i) => (
            <motion.span
              key={i}
              className={`w-2.5 rounded-t-sm ${i === 5 ? "bg-[#0E8A3E]" : "bg-accent/45"}`}
              style={{ height: `${h * 0.42}px`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.07, ease: [0.25, 1, 0.5, 1] }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F4F7F6] px-2.5 py-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-black/40">Spend</span>
          <span className="text-[10.5px] font-bold text-ink">$48,210</span>
        </div>
      </motion.div>
      {/* floating source chips */}
      <motion.span
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
        className="absolute right-4 top-6 flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-ink shadow-[0_14px_28px_-14px_rgba(16,16,20,0.4)]"
      >
        <GoogleAdsMark size={13} /> Google Ads
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="absolute bottom-6 left-4 flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-bold text-ink shadow-[0_14px_28px_-14px_rgba(16,16,20,0.4)]"
      >
        <MetaMark size={13} /> Meta Ads
      </motion.span>
    </div>
  );
}

/* channel chip — links into the integration detail pages */
function ChannelChip({ href, mark, name, i }) {
  return (
    <Reveal delay={0.15 + i * 0.08}>
      <TapCTA
        to={href}
        className="group flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(16,16,20,0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-18px_rgba(16,16,20,0.5)]"
        testid={`integration-card-${slugOf(name)}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white">
          {mark}
        </span>
        <span className="text-[13px] font-semibold text-ink">{name}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-black/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </TapCTA>
    </Reveal>
  );
}

export default function IntegrationsStrip() {
  const { openWaitlist } = useWaitlist();
  return (
    <section id="integrations" className="bg-[#F1F4F3]" data-testid="section-integrations">
      <div className="mx-auto max-w-[1100px] px-5 py-16 lg:py-20">
        {/* centered heading — reference language */}
        <Reveal className="flex flex-col items-center text-center">
          <CinematicText
            as="h2"
            className="max-w-xl font-display text-[32px] font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[42px]"
          >
            Initial integration focus
          </CinematicText>
          <p className="mt-3.5 max-w-xl text-[14px] leading-[1.7] text-black/55" data-testid="integrations-qualifier">
            We connect the channels your reports depend on, so every client deck moves forward with confidence —
            deeply, not as afterthoughts.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* left tall card — report visual + status panel */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-30px_rgba(16,16,20,0.3)] lg:row-span-2">
            <div className="relative flex-1 bg-[linear-gradient(160deg,#FFD9C9_0%,#FEEFE4_55%,#FFF7F0_100%)] px-6 pt-10">
              <ReportMock />
            </div>
            <div className="p-6 sm:p-7" data-testid="integrations-status">
              <p className="font-display text-[22px] font-bold tracking-tight text-ink">
                3 of 5 channels live
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-black/55">
                Google Ads, Meta Ads and GA4 connect at launch. LinkedIn Ads and TikTok Ads are in the pipeline and
                land right after.
              </p>
            </div>
          </div>

          {/* middle — the count card (periwinkle) */}
          <div
            className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#D9E4F5_0%,#C6D6F0_100%)] p-7"
            data-testid="integrations-live-count"
          >
            <p className="font-display text-[64px] font-bold leading-none text-white drop-shadow-[0_10px_24px_rgba(61,67,232,0.25)]">
              3
            </p>
            <p className="mt-3 text-[14px] font-semibold leading-snug text-[#1E2A5E]">
              channels live at launch — reporting from day one
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[#1E2A5E]/60">
              One governed pipeline behind all of them, so numbers always agree.
            </p>
          </div>

          {/* right — oauth card (white) */}
          <div className="rounded-2xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(16,16,20,0.3)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/10">
              <Lock className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
            </span>
            <p className="mt-4 font-display text-[19px] font-bold tracking-tight text-ink">OAuth secured</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-black/55">
              Least-privilege, read-only scopes wherever the platform supports them.
            </p>
            <TapCTA
              to="/security"
              className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:text-accent"
              testid="integrations-security-link"
            >
              Read more <ArrowRight className="h-3.5 w-3.5" />
            </TapCTA>
          </div>

          {/* wide — the pipeline card with channel chips on a gradient strip */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(16,16,20,0.3)] lg:col-span-2">
            <p className="font-display text-[19px] font-bold tracking-tight text-ink">One governed pipeline</p>
            <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-black/55">
              Every report pulls from the same governed pipeline — no exports, no stale screenshots, no rebuilds.
              Definitions stay consistent across every client.
            </p>
            {/* colorful blur strip + channel chips */}
            <div className="relative mt-6 rounded-xl p-4">
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(110deg,rgba(61,67,232,0.16),rgba(123,92,255,0.14)_45%,rgba(67,214,117,0.2))] blur-md" aria-hidden="true" />
              <div className="relative flex flex-wrap gap-3">
                <ChannelChip i={0} href="/integrations/google-ads" mark={<GoogleAdsMark size={17} />} name="Google Ads" />
                <ChannelChip i={1} href="/integrations/meta-ads" mark={<MetaMark size={17} />} name="Meta Ads" />
                <ChannelChip i={2} href="/integrations/ga4" mark={<GA4Mark size={17} />} name="GA4" />
              </div>
            </div>
          </div>

          {/* build progress card (mint) */}
          <div className="flex flex-col rounded-2xl bg-[linear-gradient(160deg,#E4F5EA_0%,#F2FAF4_100%)] p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <Wrench className="h-5 w-5 text-[#0E8A3E]" strokeWidth={2} />
            </span>
            <p className="mt-4 font-display text-[44px] font-bold leading-none tracking-tight text-ink">68%</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-black/55">
              of the LinkedIn Ads connector is already built. TikTok Ads follows at 41%.
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/[0.08]" data-testid="soon-progress-linkedin-ads" aria-hidden="true">
              <motion.div
                className="h-full rounded-full bg-[repeating-linear-gradient(45deg,#0E8A3E_0_5px,#2FA36B_5px_10px)]"
                initial={{ width: 0 }}
                whileInView={{ width: "68%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
            <button
              type="button"
              onClick={() => openWaitlist("integrations-more")}
              className="group mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-black/85"
              data-testid="integrations-more-cta"
            >
              Request a channel
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

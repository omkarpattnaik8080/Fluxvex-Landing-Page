import { motion } from "framer-motion";
import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

/* Card A — hours tracking with floating pill + accent bars (reference "Track Clicks & Revenue") */
function TrackCard() {
  const bars = [38, 62, 48, 84, 58, 74];
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_18px_44px_-30px_rgba(16,16,20,0.35)]">
      <div className="relative flex-1 rounded-xl bg-[#F4F7F6] px-5 pb-4 pt-5">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -top-3 left-5 z-10 rounded-lg bg-white px-3 py-1.5 shadow-[0_14px_28px_-12px_rgba(16,16,20,0.4)]"
        >
          <span className="block font-display text-[15px] font-bold leading-none text-ink" data-testid="integrations-status">
            3 of 5
          </span>
          <span className="mt-0.5 block text-[9px] font-medium text-black/45">channels live for you</span>
        </motion.span>
        <div className="mt-4 flex h-20 items-end gap-2" aria-hidden="true">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-5 rounded-t-md bg-gradient-to-t from-[#8FD0EA] to-[#BFE3F2]"
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: [0.25, 1, 0.5, 1] }}
            />
          ))}
        </div>
      </div>
      <h3 className="mt-5 font-display text-[19px] font-bold tracking-tight text-ink">Track Hours &amp; Output</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-black/55">
        Built-in hour tracking shows you exactly what reporting really costs your team.
      </p>
    </div>
  );
}

/* Card B — gradient brand card (reference "Watermark-Free Every Time") */
function BrandCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-[linear-gradient(150deg,#7FE8C8_0%,#A8E8A0_55%,#E8F59A_100%)] p-6">
      <div className="flex flex-1 items-center justify-center py-8" aria-hidden="true">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm"
        >
          <FluxvexMark size={52} />
        </motion.span>
      </div>
      <h3 className="font-display text-[19px] font-bold tracking-tight text-ink">White-Label, Every Time</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-black/55">
        Keep every client report on your brand — clean and professional across every deck.
      </p>
    </div>
  );
}

/* Card C — tall human card (reference "Auto-Detects New TikToks") */
function HumanCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-[0_18px_44px_-30px_rgba(16,16,20,0.35)]">
      <div className="relative flex-1 overflow-hidden rounded-xl" aria-hidden="true">
        <img
          src="/team-portrait.jpg"
          alt="Agency team member smiling"
          className="h-full min-h-[300px] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 260, damping: 18 }}
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 shadow-lg"
        >
          <Heart className="h-3.5 w-3.5 fill-[#E8506E] text-[#E8506E]" />
          <span className="text-[10.5px] font-bold text-ink">128</span>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 260, damping: 18 }}
          className="absolute bottom-14 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-lg"
        >
          <MessageCircle className="h-4 w-4 text-ink" />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full bg-[#B9F27C]/95 px-4 py-2 shadow-lg"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink">
            <FluxvexMark size={10} />
          </span>
          <span className="text-[11.5px] font-bold text-[#0C2E1B]">New report delivered</span>
        </motion.span>
      </div>
      <div className="px-2 pb-1 pt-5">
        <h3 className="font-display text-[19px] font-bold tracking-tight text-ink">Live Channel Sync</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-black/55">
          No downloads, no uploads — the moment a channel updates, your report gets to work.
        </p>
      </div>
    </div>
  );
}

/* Card D — wide pipeline card (reference "Smart affiliate link management") */
function PipelineCard() {
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0_18px_44px_-30px_rgba(16,16,20,0.35)] sm:flex-row sm:items-center">
      <div className="max-w-xs">
        <h3 className="font-display text-[19px] font-bold leading-snug tracking-tight text-ink">
          One governed pipeline for every client
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-black/55">
          Turn scattered channel data into consistent, instant client reports with auto-linked metric definitions.
        </p>
        <TapLink />
      </div>
      {/* floating report thumbnails + pills */}
      <div className="relative flex flex-1 items-center justify-center py-2" aria-hidden="true">
        <div className="relative h-36 w-40">
          {[
            { cls: "left-0 top-2 rotate-[-8deg]", grad: "from-[#D9E4F5] to-[#B9CCEC]", z: "z-10" },
            { cls: "left-14 top-0 rotate-[2deg]", grad: "from-[#E8D9F5] to-[#CDB9EC]", z: "z-20" },
            { cls: "left-28 top-6 rotate-[9deg]", grad: "from-[#D9F5E4] to-[#B9ECC9]", z: "z-30" },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className={`absolute ${t.cls} ${t.z} h-32 w-24 rounded-lg bg-gradient-to-b ${t.grad} p-2 shadow-[0_18px_36px_-16px_rgba(16,16,20,0.45)]`}
            >
              <span className="block h-1.5 w-3/4 rounded bg-black/15" />
              <span className="mt-1 block h-1.5 w-1/2 rounded bg-black/10" />
              <span className="mt-3 block h-10 rounded-md bg-white/70" />
              <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-black/10" />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {["Open report", "Share link"].map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.14 }}
              className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11.5px] font-semibold text-ink shadow-[0_12px_26px_-12px_rgba(16,16,20,0.45)] ring-1 ring-black/[0.06]"
            >
              <ArrowUpRight className="h-3 w-3 text-accent" /> {p}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TapLink() {
  return (
    <a
      href="#integrations"
      onClick={(e) => e.preventDefault()}
      className="mt-4 inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold text-ink underline-offset-4 hover:underline"
    >
      See the pipeline <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

export default function IntegrationsStrip() {
  return (
    <section id="integrations" className="bg-[#F1F2F1]" data-testid="section-integrations">
      <div className="mx-auto max-w-[1100px] px-5 py-16 lg:py-24">
        {/* centered heading — reference language */}
        <Reveal className="flex flex-col items-center text-center">
          <CinematicText
            as="h2"
            className="max-w-xl font-display text-[32px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[40px]"
          >
            No more struggle of stitching client reports
          </CinematicText>
          <p className="mt-4 max-w-lg text-[13.5px] leading-[1.7] text-black/55" data-testid="integrations-qualifier">
            The only reporting workflow designed with agencies to automate data collection and keep every client
            number consistent, everywhere.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="h-full">
            <TrackCard />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <BrandCard />
          </Reveal>
          <Reveal delay={0.16} className="h-full lg:row-span-2">
            <HumanCard />
          </Reveal>
          <Reveal delay={0.12} className="h-full md:col-span-2 lg:col-span-2">
            <PipelineCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

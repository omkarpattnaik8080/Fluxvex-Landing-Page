import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link2, Share2, BadgePercent, ArrowRight, Check, Bell, Wallet } from "lucide-react";
import { IsoTile, IsoWire, IsoBillboard, PLANE } from "@/components/iso/IsoKit";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import CrossFade3D from "@/components/three/CrossFade3D";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

const STEPS = [
  {
    icon: Link2,
    title: "Get your referral link",
    desc: "Join the partner waitlist. When the program opens, your personal referral link and earnings dashboard go live.",
  },
  {
    icon: Share2,
    title: "Share it with agencies",
    desc: "Pass your link to agencies still assembling client reports in spreadsheets and slide decks.",
  },
  {
    icon: BadgePercent,
    title: "Earn up to 20%",
    desc: "You earn up to 20% of every subscription payment from the agencies you refer—tracked from your dashboard.",
  },
];

/* Dotted connector removed — packets now run along the card's shared line */

function EarningsCard() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [pct, setPct] = useState(reduce ? 20 : 0);
  const C = 2 * Math.PI * 52;

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setPct(20);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const dur = 1200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.round(20 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-line bg-[linear-gradient(165deg,#EAF6E9_0%,#F7FBF5_55%,#FDFDFA_100%)] p-8 text-center"
      data-testid="affiliate-earnings-card"
    >
      <div className="relative flex h-52 w-52 items-center justify-center">
        {/* slowly rotating dashed halo */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="97" fill="none" stroke="rgba(16,16,20,0.16)" strokeWidth="1" strokeDasharray="2 7" />
        </motion.svg>
        <svg viewBox="0 0 160 160" className="h-44 w-44 -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id="earnGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#43D675" />
              <stop offset="100%" stopColor="#3D43E8" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="64" fill="none" stroke="#E9E7E1" strokeWidth="12" />
          <motion.circle
            cx="80"
            cy="80"
            r="64"
            fill="none"
            stroke="url(#earnGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={reduce ? false : { strokeDashoffset: C }}
            animate={reduce || !inView ? {} : { strokeDashoffset: C * 0.8 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          />
        </svg>
        <span className="absolute flex flex-col items-center">
          <span className="font-display text-5xl font-bold tracking-tight text-ink">
            {pct}
            <span className="text-2xl">%</span>
          </span>
          <span className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" aria-hidden="true" /> recurring
          </span>
        </span>
      </div>
      <p className="max-w-[250px] text-[14px] leading-relaxed text-ink-soft">
        of every subscription payment from the agencies you refer — paid monthly, tracked automatically.
      </p>
      <span className="rounded-full bg-[#0E8A3E]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#0E8A3E]">
        Earnings dashboard at launch
      </span>
    </div>
  );
}

/* Floating referral notifications — the reference's collaborate-card anatomy */
function ReferralFeed() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-2xl border border-line bg-[linear-gradient(160deg,#F3F1FF_0%,#FBFAFF_55%,#FDFDFA_100%)] p-7" data-testid="referral-feed" aria-hidden="true">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">Your dashboard, later</p>
      <motion.div
        initial={reduce ? false : { y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
        className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white p-3.5 shadow-[0_18px_36px_-20px_rgba(16,16,20,0.3)]"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent-tint font-display text-[11px] font-bold text-accent">
          NM
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0E8A3E] text-[8px] font-bold text-white">1</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-semibold leading-snug text-ink">Northbeam Media joined via your link</p>
          <p className="text-[11px] text-ink-soft">Today · 9:41</p>
        </div>
        <Check className="h-4 w-4 shrink-0 text-[#0E8A3E]" strokeWidth={2.6} />
      </motion.div>
      <motion.div
        initial={reduce ? false : { y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="ml-6 flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white p-3.5 shadow-[0_18px_36px_-20px_rgba(16,16,20,0.3)]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E8A3E]/10">
          <Bell className="h-4 w-4 text-[#0E8A3E]" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-semibold leading-snug text-ink">
            Subscription paid — <span className="text-[#0E8A3E]">your 20% is tracking</span>
          </p>
          <p className="text-[11px] text-ink-soft">June cycle · automatic</p>
        </div>
        <motion.span
          className="h-2 w-2 shrink-0 rounded-full bg-[#0E8A3E]"
          animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

/* Static SVG base beneath the 3D money-flow scene */
function AffiliateSceneLegacy() {
  return (
    <div className="scale-[0.8] sm:scale-100" aria-hidden="true">
      <div className="relative h-[210px] w-[320px]" style={{ transform: PLANE, transformStyle: "preserve-3d" }}>
        <IsoWire from={[50, 100]} to={[92, 100]} delay={0} />
        <IsoWire from={[150, 100]} to={[192, 100]} delay={0.3} />
        <IsoTile x={18} y={82} w={36} h={36}>
          <Link2 className="h-4 w-4 text-accent" strokeWidth={1.8} />
        </IsoTile>
        <IsoTile x={92} y={78} w={44} h={44}>
          <FluxvexMark size={22} />
        </IsoTile>
        <IsoTile x={192} y={82} w={36} h={36}>
          <Wallet className="h-4 w-4 text-[#0E8A3E]" strokeWidth={1.8} />
        </IsoTile>
        <IsoBillboard x={240} y={40}>
          <span className="whitespace-nowrap rounded-full bg-[#0E8A3E] px-2.5 py-1 text-[10px] font-semibold text-white">+20% · yours to keep</span>
        </IsoBillboard>
        <IsoBillboard x={20} y={130}>
          <span className="whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-semibold text-ink-soft">Your referral link</span>
        </IsoBillboard>
      </div>
    </div>
  );
}

export default function Affiliate() {
  return (
    <SectionShell id="partners">
      <SectionHeader
        overline="Affiliate partner program"
        title="Grow alongside us. Earn up to 20%."
        copy="Fluxvex is being built with agencies, for agencies. Our partner program shares the upside: refer agencies to Fluxvex and earn up to 20% of every subscription payment they make."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* A — the partner flow (wide, soft wash) */}
        <Reveal className="h-full lg:col-span-2">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-[linear-gradient(140deg,#EEF0FF_0%,#FBFBFF_48%,#EAF6E9_100%)] p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">The partner flow</p>
              <span className="rounded-full border border-[#0E8A3E]/25 bg-[#EAF6E9] px-2.5 py-1 text-[10px] font-bold text-[#0E8A3E]">
                UP TO 20% RECURRING
              </span>
            </div>
            <div className="relative mt-9 flex-1">
              {/* connecting line with traveling packets — runs behind the chips */}
              <div
                className="absolute left-[16.6%] right-[16.6%] top-7 hidden h-0 border-t-2 border-dashed border-accent/30 sm:block"
                aria-hidden="true"
              >
                <motion.span
                  className="absolute -top-[4px] h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(61,67,232,0.4)]"
                  animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute -top-[4px] h-2 w-2 rounded-full bg-[#0E8A3E] shadow-[0_0_10px_2px_rgba(67,214,117,0.4)]"
                  animate={{ left: ["100%", "0%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                />
              </div>
              <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-5">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col items-start text-left sm:items-center sm:text-center"
                    data-testid={`affiliate-step-${i + 1}`}
                  >
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white text-accent shadow-[0_16px_30px_-14px_rgba(16,16,20,0.35)]">
                      <s.icon className="h-6 w-6" strokeWidth={1.8} />
                      <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink font-display text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="mt-4 font-display text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-1.5 max-w-[240px] text-[12.5px] leading-relaxed text-ink-soft">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* B — earnings ring (soft mint) */}
        <Reveal delay={0.1} className="h-full">
          <EarningsCard />
        </Reveal>

        {/* the money flow, in 3D — link → engine → straight to your account */}
        <Reveal delay={0.05} className="h-full lg:col-span-2">
          <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-line bg-[linear-gradient(140deg,#EEF0FF_0%,#FDFDF8_50%,#EAF6E9_100%)] p-7 sm:p-8">
            <div className="fine-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" /> How the money flows
              </span>
              <span className="rounded-full border border-[#0E8A3E]/25 bg-[#EAF6E9] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0E8A3E]">
                No T&amp;C applied
              </span>
            </div>
            <CrossFade3D
              scene="affiliate"
              legacy={<AffiliateSceneLegacy />}
              testid="affiliate-flow-3d"
              className="relative min-h-[230px] flex-1"
            />            <p className="relative max-w-md text-center text-[12.5px] leading-relaxed text-ink-soft">
              Your link feeds the engine — up to <span className="font-semibold text-ink">20% of every subscription payment</span>{" "}
              lands straight in your account. No T&amp;C applied, yours to keep.
            </p>
          </div>
        </Reveal>

        {/* C — referral feed (soft violet) */}
        <Reveal delay={0.1} className="h-full">
          <ReferralFeed />
        </Reveal>

        {/* D — CTA anchor card (deep green, like the reference) */}
        <Reveal delay={0.12} className="h-full lg:col-span-3">
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-[radial-gradient(120%_160%_at_85%_0%,#1E7A3C_0%,#0C2E1B_70%)] p-7 sm:p-8">
            <span
              className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.35),transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="fine-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">Partner program</p>
              <h3 className="mt-2.5 max-w-md font-display text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
                Refer agencies. Share the upside.
              </h3>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/65">
                Join the partner waitlist now—early partners get the program’s best tier when it opens.
              </p>
            </div>
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <TapCTA
                to="/partners"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 font-display text-sm font-semibold text-ink transition-colors hover:bg-mint/90"
                testid="affiliate-cta-button"
              >
                Join the partner waitlist
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </TapCTA>
              <Link
                to="/contact"
                className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-mint hover:underline"
                data-testid="affiliate-contact-link"
              >
                Questions about the program? Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

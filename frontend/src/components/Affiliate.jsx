import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link2, Share2, BadgePercent, ArrowRight, Check, Bell } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";

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

/* Dotted connector with a traveling packet */
function FlowWire({ delay = 0 }) {
  return (
    <span className="relative mx-1 hidden h-px min-w-[48px] flex-1 border-t border-dashed border-accent/35 lg:block" aria-hidden="true">
      <motion.span
        className="absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(61,67,232,0.3)]"
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </span>
  );
}

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
      className="flex h-full flex-col items-center justify-center gap-6 rounded-2xl border border-line bg-[linear-gradient(160deg,#EAF6E9_0%,#F7FBF5_55%,#FDFDFA_100%)] p-8 text-center"
      data-testid="affiliate-earnings-card"
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#E9E7E1" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#0E8A3E"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={reduce ? false : { strokeDashoffset: C }}
            animate={reduce || !inView ? {} : { strokeDashoffset: C * 0.8 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />
        </svg>
        <span className="absolute flex flex-col items-center">
          <span className="font-display text-3xl font-semibold tracking-tight text-ink">
            {pct}
            <span className="text-xl">%</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">of subscription</span>
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-ink-soft">
        That is what you earn on every subscription payment from an agency you refer.
      </p>
      <p className="text-xs text-black/45">Full program terms are announced at launch.</p>
    </div>
  );
}

/* Floating referral notifications — the reference's collaborate-card anatomy */
function ReferralFeed() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-2xl border border-line bg-[linear-gradient(160deg,#F3F1FF_0%,#FBFAFF_55%,#FDFDFA_100%)] p-7" aria-hidden="true">
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

export default function Affiliate() {
  const { openWaitlist } = useWaitlist();
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
            <div className="mt-7 flex flex-1 flex-col gap-6 lg:flex-row lg:items-start">
              {STEPS.map((s, i) => (
                <div key={s.title} className="flex flex-1 items-start gap-4 lg:flex-col lg:gap-4" data-testid={`affiliate-step-${i + 1}`}>
                  {i > 0 && <FlowWire delay={i * 0.7} />}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.15, type: "spring", stiffness: 280, damping: 20 }}
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-accent shadow-[0_14px_28px_-14px_rgba(16,16,20,0.35)]"
                  >
                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink font-display text-[9px] font-bold text-white">
                      {i + 1}
                    </span>
                  </motion.span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* B — earnings ring (soft mint) */}
        <Reveal delay={0.1} className="h-full">
          <EarningsCard />
        </Reveal>

        {/* C — referral feed (soft violet) */}
        <Reveal delay={0.05} className="h-full">
          <ReferralFeed />
        </Reveal>

        {/* D — CTA anchor card (deep green, like the reference) */}
        <Reveal delay={0.12} className="h-full lg:col-span-2">
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
                onClick={() => openWaitlist("affiliate")}
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

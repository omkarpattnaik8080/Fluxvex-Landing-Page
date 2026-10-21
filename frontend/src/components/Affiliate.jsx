import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link2, Share2, BadgePercent, ArrowRight } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { useWaitlist } from "@/components/WaitlistContext";

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
      className="mx-auto flex h-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-line bg-page p-8 text-center shadow-[0_36px_80px_-40px_rgba(16,16,20,0.35)]"
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
            stroke="#3D43E8"
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

export default function Affiliate() {
  const { openWaitlist } = useWaitlist();
  return (
    <SectionShell id="partners">
      <SectionHeader
        overline="Affiliate partner program"
        title="Grow alongside us. Earn up to 20%."
        copy="Fluxvex is being built with agencies, for agencies. Our partner program shares the upside: refer agencies to Fluxvex and earn up to 20% of every subscription payment they make."
      />
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div
                className="group flex items-center gap-6 rounded-xl border border-line bg-page p-6 transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/30 hover:shadow-[0_32px_64px_-28px_rgba(61,67,232,0.35)]"
                data-testid={`affiliate-step-${i + 1}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <s.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
              <button
                onClick={() => openWaitlist("affiliate")}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-black/80"
                data-testid="affiliate-cta-button"
              >
                Join the partner waitlist
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                to="/contact"
                className="text-sm font-medium text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
                data-testid="affiliate-contact-link"
              >
                Questions about the program? Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="h-full">
          <EarningsCard />
        </Reveal>
      </div>
    </SectionShell>
  );
}

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { useWaitlist } from "@/components/WaitlistContext";

function Fastener({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#23279E] shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.35)] ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-white/70" />
    </span>
  );
}

export default function FinalCta() {
  const { openWaitlist } = useWaitlist();
  const reduce = useReducedMotion();
  return (
    <section className="border-t border-line bg-elevated px-2 py-14 sm:px-2.5 sm:py-20" data-testid="section-final-cta">
      <div className="grain relative overflow-hidden rounded-2xl bg-accent px-6 py-20 text-center sm:py-28">
        <motion.div
          className="pixel-blocks absolute inset-0"
          animate={reduce ? {} : { y: [0, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_0%,transparent_55%,rgba(20,21,90,0.5)_100%)]" aria-hidden="true" />
        <Fastener className="left-3 top-3" />
        <Fastener className="right-3 top-3" />
        <Fastener className="bottom-3 left-3" />
        <Fastener className="bottom-3 right-3" />

        <div className="relative mx-auto max-w-3xl">
          <Reveal y={16}>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm">
              <FluxvexMark size={24} tone="white" />
            </span>
          </Reveal>
          <Reveal y={16} delay={0.08}>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">Start today</p>
          </Reveal>
          <CinematicText
            as="h2"
            className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.0] tracking-tightest text-white sm:text-5xl lg:text-[56px]"
          >
            Make client reporting the easiest part of your agency.
          </CinematicText>
          <Reveal y={16} delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.7] text-white/85 sm:text-base">
              Get launch updates and early-access details for Fluxvex.
            </p>
          </Reveal>
          <Reveal y={16} delay={0.28}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => openWaitlist("final-cta")}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 font-display text-sm font-semibold text-ink transition-all hover:gap-3"
                data-testid="final-cta-join-waitlist-button"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/pricing"
                className="inline-flex h-12 items-center rounded-full border border-white/40 bg-white/10 px-7 font-display text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                data-testid="final-cta-explore-pricing-link"
              >
                Explore pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

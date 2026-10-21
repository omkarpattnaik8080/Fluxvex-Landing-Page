import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Link2, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { useWaitlist } from "@/components/WaitlistContext";

const ACCORDION = [
  { icon: Link2, title: "Seamless integrations", desc: "Connect reporting sources without workflow interruptions." },
  { icon: ShieldCheck, title: "Privacy-first architecture", desc: "Access is authorized with least-privilege scopes where supported, kept separated per client, and revocable at any time." },
  { icon: SlidersHorizontal, title: "Advanced filters", desc: "Scope every report by client, channel, and reporting period." },
];

const STATS = [
  { value: 3, label: "Reporting sources connected", suffix: "" },
  { value: 4, label: "Steps in the reporting workflow", suffix: "" },
  { value: 2, label: "Plans at launch", suffix: "" },
  { value: 1, label: "Workflow to learn", suffix: "" },
];

function CountUp({ value }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const start = performance.now();
    const dur = 900;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);

  return <span ref={ref}>{n}</span>;
}

function CloudVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col items-center"
      data-testid="platform-cloud-visual"
    >
      <div className="bob-slow relative flex h-40 w-72 items-center justify-center sm:w-80" aria-hidden="true">
        {/* cloud puffs */}
        <div className="absolute left-10 top-0 h-24 w-24 rounded-full bg-white shadow-[0_30px_60px_-20px_rgba(16,16,20,0.25),inset_0_-10px_24px_rgba(16,16,20,0.05)]" />
        <div className="absolute right-10 top-3 h-20 w-24 rounded-full bg-white shadow-[0_30px_60px_-20px_rgba(16,16,20,0.25),inset_0_-10px_24px_rgba(16,16,20,0.05)]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 rounded-[40px] bg-white shadow-[0_40px_70px_-24px_rgba(16,16,20,0.3),inset_0_-14px_28px_rgba(16,16,20,0.06)]" />
        {/* integration icons */}
        <div className="relative flex items-center gap-2.5" data-testid="platform-cloud-icons">
          {[
            <GoogleAdsMark size={17} key="g" />,
            <MetaMark size={17} key="m" />,
            <FluxvexMark size={17} key="f" className="rounded-md" />,
            <GA4Mark size={17} key="a" />,
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" key="p" aria-hidden="true">
              <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="#101014" strokeWidth="1.8" />
              <path d="M9 13h6M9 17h4" stroke="#101014" strokeWidth="1.8" strokeLinecap="round" />
            </svg>,
          ].map((mark, i) => (
            <span
              key={i}
              className={`flex h-11 w-11 items-center justify-center rounded-full shadow-[0_14px_30px_-10px_rgba(16,16,20,0.3)] ring-1 ring-black/5 transition-transform hover:-translate-y-1 ${
                i === 2 ? "bg-accent-tint ring-accent/25" : "bg-[#FAFAF7]"
              }`}
            >
              {mark}
            </span>
          ))}
        </div>
      </div>
      <div className="h-12 w-px border-l border-dashed border-black/25" aria-hidden="true" />
      <div className="relative rounded-2xl bg-white p-2.5 shadow-[0_24px_50px_-18px_rgba(16,16,20,0.4)] ring-1 ring-accent/25" data-testid="platform-cloud-badge">
        <span className="absolute inset-0 rounded-2xl bg-accent/25 blur-lg" aria-hidden="true" />
        <FluxvexMark size={40} className="relative rounded-xl" />
      </div>
    </motion.div>
  );
}

export default function Platform() {
  const [open, setOpen] = useState(0);
  const { openWaitlist } = useWaitlist();

  return (
    <section id="platform" data-testid="section-platform">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid overflow-hidden rounded-xl border border-line bg-page lg:grid-cols-2">
          {/* left content */}
          <div className="border-line p-8 sm:p-12 max-lg:border-b lg:border-r">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Platform</p>
            </Reveal>
            <CinematicText
              as="h2"
              className="mt-4 max-w-sm font-display text-3xl font-semibold leading-[1.05] tracking-tighter2 text-ink sm:text-4xl lg:text-[42px]"
            >
              Unify your entire reporting stack
            </CinematicText>
            <Reveal y={14} delay={0.12}>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-ink-soft">
                Connect reporting sources and manage every client report across one workflow.
              </p>
              <button
                onClick={() => openWaitlist("platform")}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-medium text-white transition-all hover:gap-3"
                data-testid="platform-cta-button"
              >
                Join the waitlist
                <ChevronRight className="h-4 w-4" />
              </button>
            </Reveal>

            <div className="mt-10 border-t border-line" data-testid="platform-accordion">
              {ACCORDION.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.title} className="border-b border-line">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-3 py-4 text-left"
                      data-testid={`platform-accordion-${i + 1}`}
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${isOpen ? "text-accent" : "text-ink-soft"}`} strokeWidth={1.8} />
                      <span className="flex-1 text-[15px] font-medium text-ink">{item.title}</span>
                      <ChevronDown className={`h-4 w-4 text-black/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 pl-7 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* right cloud visual */}
          <div className="fine-grid relative flex items-center justify-center bg-[#F7F6F2] p-10 min-h-[400px] sm:p-14">
            <CloudVisual />
          </div>
        </div>

        {/* verified-facts stats band */}
        <Reveal>
          <div className="mt-6">
            <div className="hatch-band rounded-t-lg border border-b-0 border-line" aria-hidden="true" />
            <div className="grid grid-cols-2 border border-line bg-page lg:grid-cols-4" data-testid="platform-stats">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-6 py-8 sm:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${i < 2 ? "max-lg:border-b max-lg:border-line" : ""} ${i > 1 ? "lg:border-l lg:border-line" : ""} ${i === 2 ? "max-lg:border-l-0" : ""}`}
                  data-testid={`platform-stat-${i + 1}`}
                >
                  <p className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-[40px]">
                    <CountUp value={s.value} />
                    {s.suffix}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="hatch-band rounded-b-lg border border-t-0 border-line" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

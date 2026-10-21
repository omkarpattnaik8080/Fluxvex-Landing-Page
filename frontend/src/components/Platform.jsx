import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronRight, Link2, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { HubIllustration, PadlockIllustration, RiffleIllustration } from "@/components/hairline/Illustrations";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";

const ACCORDION = [
  { icon: Link2, title: "Seamless integrations", desc: "Connect reporting sources without workflow interruptions.", mini: "integrations" },
  { icon: ShieldCheck, title: "Privacy-first architecture", desc: "Access is authorized with least-privilege scopes where supported, kept separated per client, and revocable at any time.", mini: "privacy" },
  { icon: SlidersHorizontal, title: "Advanced filters", desc: "Scope every report by client, channel, and reporting period.", mini: "filters" },
];

/* Mini hairline illustrations shown when an accordion row expands */
function MiniVisual({ kind }) {
  const map = { integrations: HubIllustration, privacy: PadlockIllustration, filters: RiffleIllustration };
  const Art = map[kind] || HubIllustration;
  return (
    <div className="h-12 w-12" aria-hidden="true">
      <Art />
    </div>
  );
}

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
  const LABELS = ["Google Ads", "Meta Ads", "Google Analytics 4"];
  const marks = [<GoogleAdsMark size={16} key="g" />, <MetaMark size={16} key="m" />, <GA4Mark size={16} key="a" />];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      data-testid="platform-cloud-visual"
    >
      <IsoPlane w={280} h={240} scale="scale-[0.8] sm:scale-95" className="py-8">
        <div data-testid="platform-cloud-icons" className="contents">
          {marks.map((mark, i) => (
            <IsoTile key={i} x={8} y={28 + i * 64} w={48} h={48}>
              <span className="group relative flex h-full w-full items-center justify-center">
                {mark}
                <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {LABELS[i]}
                </span>
              </span>
            </IsoTile>
          ))}
        </div>
        <IsoWire from={[58, 52]} to={[116, 118]} delay={0} />
        <IsoWire from={[58, 120]} to={[116, 120]} delay={0.35} />
        <IsoWire from={[58, 188]} to={[116, 122]} delay={0.7} />
        <IsoTile x={116} y={94} w={52} h={52} active testid="platform-cloud-badge">
          <FluxvexMark size={26} className="rounded-xl" />
        </IsoTile>
        <IsoWire from={[170, 120]} to={[212, 120]} delay={1} />
        <IsoTile x={212} y={94} w={40} h={52} float={false}>
          <span className="flex h-10 w-8 flex-col gap-[3px] p-1" aria-hidden="true">
            <span className="h-[3px] w-full rounded bg-accent/60" />
            <span className="h-[2px] w-4/5 rounded bg-black/15" />
            <span className="h-[2px] w-3/5 rounded bg-black/10" />
            <span className="mt-auto flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-ink font-display text-[5px] font-bold leading-none text-white" />
              <span className="h-[2px] w-4 rounded bg-black/10" />
            </span>
          </span>
        </IsoTile>
        <IsoBillboard x={186} y={62}>
          <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-[#0E8A3E]">
            <Check className="h-3 w-3" /> Client report ready
          </span>
        </IsoBillboard>
        <IsoBillboard x={236} y={172}>
          <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white">Export PDF</span>
        </IsoBillboard>
      </IsoPlane>
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
              <TapCTA
                onClick={() => openWaitlist("platform")}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-medium text-white transition-colors hover:bg-black/80"
                testid="platform-cta-button"
              >
                Join the waitlist
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </TapCTA>
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
                        <div className="pb-4 pl-7">
                          <MiniVisual kind={item.mini} />
                          <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
                        </div>
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

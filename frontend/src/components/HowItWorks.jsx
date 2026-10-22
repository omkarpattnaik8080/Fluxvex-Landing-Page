import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, Pause, Play, Plug, FolderOpen, Sparkles, Send } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";

const Scene3D = lazy(() => import("@/components/three/Scene3D"));

const AUTO_MS = 3800;

const STEPS = [
  { icon: Plug, tab: "Connect", title: "Connect supported platforms", desc: "Authorize the integrations the product supports.", testid: "workflow-step-1" },
  { icon: FolderOpen, tab: "Choose", title: "Choose the client and period", desc: "Keep the scope of the report clear.", testid: "workflow-step-2" },
  { icon: Sparkles, tab: "Generate", title: "Generate and review", desc: "Create the report using defined metrics and a consistent structure.", testid: "workflow-step-3" },
  { icon: Send, tab: "Deliver", title: "Brand and deliver", desc: "Apply the agency’s presentation style and export or schedule delivery as supported.", testid: "workflow-step-4" },
];

/* ---------- isometric stage ---------- */
const PLANE = "rotateX(55deg) rotateZ(-45deg)";
const BILLBOARD = "rotateZ(45deg) rotateX(-55deg)";

function Tile({ x, y, w = 64, h = 64, dim, active, children, testid }) {
  return (
    <div
      className={`absolute transition-all duration-500 ${dim ? "opacity-25 saturate-0" : "opacity-100"}`}
      style={{ left: x, top: y, width: w, height: h }}
      data-testid={testid}
    >
      <motion.div
        animate={{ scale: active ? 1.07 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className={`relative flex h-full w-full items-center justify-center rounded-2xl bg-white ring-1 ${
          active ? "ring-2 ring-accent/60 shadow-[0_30px_50px_-18px_rgba(61,67,232,0.55)]" : "ring-black/[0.06] shadow-[0_18px_30px_-14px_rgba(16,16,20,0.35)]"
        }`}
      >
        {active && <span className="absolute inset-0 rounded-2xl bg-accent/20 blur-md" aria-hidden="true" />}
        <span className="relative">{children}</span>
      </motion.div>
    </div>
  );
}

function Billboard({ x, y, children }) {
  return (
    <div className="pointer-events-none absolute z-10" style={{ left: x, top: y, transform: BILLBOARD, transformOrigin: "50% 100%" }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ opacity: { duration: 0.3 }, y: { duration: 3.4, repeat: Infinity, ease: "easeInOut" } }}
        className="whitespace-nowrap rounded-xl border border-black/[0.06] bg-white px-3.5 py-2 shadow-[0_24px_45px_-16px_rgba(16,16,20,0.4)]"
      >
        {children}
      </motion.div>
    </div>
  );
}

function Wire({ from, to, active, delay = 0 }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.round(Math.hypot(dx, dy));
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <div className="absolute" style={{ left: from[0], top: from[1], width: len, transform: `rotate(${ang}deg)`, transformOrigin: "0 0" }} aria-hidden="true">
      <div className={`h-0 w-full border-t border-dashed transition-colors duration-500 ${active ? "border-accent/60" : "border-black/15"}`} />
      {active && (
        <motion.span
          className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 10px 2px rgba(61,67,232,0.45)" }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay }}
        />
      )}
    </div>
  );
}

function DocSheet() {
  return (
    <div className="flex h-[72px] w-[52px] flex-col gap-1 rounded-lg bg-white p-1.5 ring-1 ring-black/[0.06]">
      <span className="h-1.5 w-full rounded-sm bg-accent/70" />
      <span className="mt-1 h-1 w-4/5 rounded-sm bg-black/15" />
      <span className="h-1 w-3/5 rounded-sm bg-black/10" />
      <span className="mt-auto flex items-center gap-1">
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-ink font-display text-[6px] font-bold text-white">N</span>
        <span className="h-1 w-6 rounded-sm bg-black/10" />
      </span>
    </div>
  );
}

function IsoStageLegacy({ step }) {
  const sources = [
    { mark: <GoogleAdsMark size={17} />, key: "g" },
    { mark: <MetaMark size={17} />, key: "m" },
    { mark: <GA4Mark size={17} />, key: "a" },
  ];
  const srcPos = [52, 122, 192];
  const engineActive = step === 1 || step === 2 || step === 3;
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative scale-[0.78] sm:scale-95 lg:scale-110"
    >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-80 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/[0.05] blur-2xl" aria-hidden="true" />
        <div className="relative h-[280px] w-[280px]" style={{ transform: PLANE, transformStyle: "preserve-3d" }}>
          {/* wires */}
          <Wire from={[70, 84]} to={[118, 150]} active={step === 0} delay={0} />
          <Wire from={[70, 154]} to={[118, 154]} active={step === 0} delay={0.35} />
          <Wire from={[70, 224]} to={[118, 158]} active={step === 0} delay={0.7} />
          <Wire from={[204, 154]} to={[234, 154]} active={step === 3} />

          {/* source tiles */}
          {srcPos.map((y, i) => (
            <Tile key={sources[i].key} x={6} y={y} dim={step !== 0} active={step === 0}>
              {sources[i].mark}
            </Tile>
          ))}

          {/* engine tile */}
          <Tile x={118} y={116} w={86} h={86} dim={step === 0} active={engineActive}>
            <FluxvexMark size={34} className="rounded-xl" />
          </Tile>

          {/* report tile */}
          <Tile x={234} y={112} w={56} h={88} dim={step !== 3} active={step === 3}>
            <DocSheet />
          </Tile>

          {/* billboards (direct conditional render — entrance handled by motion.div inside) */}
          {step === 0 &&
            srcPos.map((y, i) => (
              <Billboard key={`auth-${i}`} x={80} y={y + 40}>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0E8A3E]">
                  <Check className="h-3 w-3" /> Authorized
                </span>
              </Billboard>
            ))}
          {step === 1 && (
            <Billboard x={104} y={108}>
              <span className="block text-[11px] font-semibold text-ink">Northbeam Media · Client</span>
              <span className="mt-1.5 flex gap-1.5">
                {["May", "June", "Q2"].map((p) => (
                  <span key={p} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${p === "June" ? "bg-accent text-white" : "bg-black/[0.06] text-ink-soft"}`}>{p}</span>
                ))}
              </span>
            </Billboard>
          )}
          {step === 2 && (
            <Billboard x={104} y={108}>
              <span className="block text-[11px] font-semibold text-ink">Fluxvex is assembling…</span>
              <span className="mt-1.5 block h-1 w-36 overflow-hidden rounded-full bg-black/[0.08]">
                <motion.span className="block h-full rounded-full bg-accent" initial={{ width: "10%" }} animate={{ width: "100%" }} transition={{ duration: 1.6, ease: "easeOut" }} />
              </span>
              <span className="mt-1.5 flex items-center gap-1 text-[10px] text-[#0E8A3E]"><Check className="h-2.5 w-2.5" /> Campaign metrics · Channel results · Summary</span>
            </Billboard>
          )}
          {step === 3 && (
            <Billboard x={176} y={104}>
              <span className="flex gap-1.5">
                <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white">Export PDF</span>
                <span className="rounded-full border border-black/[0.08] px-2.5 py-1 text-[10px] font-semibold text-ink-soft">Schedule send</span>
              </span>
            </Billboard>
          )}
        </div>
      </motion.div>
  );
}

/* Interactive Iso3D stage — SVG IsoStage kept as WebGL fallback */
function IsoStage({ step }) {
  return (
    <div className="flex h-[460px] items-center justify-center overflow-hidden" data-testid="workflow-iso-stage">
      <Suspense fallback={<IsoStageLegacy step={step} />}>
        <Scene3D
          scene="workflow"
          props={{ step }}
          testid="workflow-iso-stage-3d"
          fallback={<IsoStageLegacy step={step} />}
          className="h-full w-full"
        />
      </Suspense>
    </div>
  );
}

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduce = useReducedMotion();
  const { openWaitlist } = useWaitlist();

  /* Auto-advance the tour through all four steps while the section is on screen */
  useEffect(() => {
    if (!auto || !inView || reduce) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), AUTO_MS);
    return () => clearInterval(id);
  }, [auto, inView, reduce]);

  const goTo = (i) => {
    setActive(i);
    setAuto(false);
  };

  return (
    <SectionShell id="workflow" className="!px-0 !py-0">
      <div ref={sectionRef}>
      <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-20 text-center lg:px-8 lg:pb-20 lg:pt-28" ref={sectionRef}>
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">How it works</p>
        </Reveal>
        <CinematicText
          as="h2"
          className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.06] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
        >
          From connected data to a report your client is ready to read.
        </CinematicText>
        <Reveal y={16} delay={0.15}>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.7] text-ink-soft">
            Four steps, the same every cycle. The tour plays itself—select a step to take control.
          </p>
        </Reveal>
      </div>

      {/* tab strip */}
      <Reveal>
        <div className="border-y border-line bg-page" data-testid="workflow-tabs">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 sm:grid-cols-4">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              return (
                <button
                  key={step.tab}
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  className={`relative flex items-center gap-2.5 border-line px-5 py-4 text-left text-[14px] font-medium transition-colors sm:justify-center sm:text-[15px] ${
                    i % 2 === 1 ? "border-l" : ""
                  } ${i < 2 ? "border-b sm:border-b-0" : ""} ${i > 0 ? "sm:border-l" : ""} ${
                    isActive ? "text-ink" : "text-ink-soft/70 hover:text-ink"
                  }`}
                  data-testid={step.testid}
                >
                  <step.icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-ink-soft/60"}`} strokeWidth={1.8} />
                  {step.tab}
                  {isActive && <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* step content */}
      <div className="border-b border-line bg-page">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2" data-testid="how-it-works">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Step {String(active + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 max-w-sm font-display text-2xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-3xl">
                  {STEPS[active].title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">{STEPS[active].desc}</p>
                <TapCTA
                  onClick={() => openWaitlist("workflow")}
                  className="mt-8 inline-flex h-10 items-center rounded-full border border-black/10 bg-page px-5 text-sm font-medium text-ink shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
                  testid="workflow-cta-button"
                >
                  Join the waitlist
                  <ChevronRight className="ml-1 h-4 w-4" />
                </TapCTA>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2" aria-hidden="true">
                {STEPS.map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ width: i === active ? 32 : 12, backgroundColor: i === active ? "#3D43E8" : "rgba(16,16,20,0.15)" }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
              <button
                onClick={() => setAuto((a) => !a)}
                className="flex items-center gap-1.5 rounded-full border border-line bg-page px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                data-testid="workflow-autoplay-toggle"
                aria-pressed={auto}
              >
                {auto ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                {auto ? "Auto-playing" : "Play tour"}
              </button>
            </div>
          </div>

          <div className="fine-grid relative overflow-hidden border-t border-line bg-[#F7F6F2] max-lg:border-t lg:border-l lg:border-t-0">
            <IsoStage step={active} />
          </div>
        </div>
      </div>
      </div>
    </SectionShell>
  );
}

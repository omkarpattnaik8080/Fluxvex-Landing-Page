import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plug, Sparkles, CalendarClock, ArrowRight, Zap } from "lucide-react";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import ComplianceBadges from "@/components/ComplianceBadges";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { useWaitlist } from "@/components/WaitlistContext";

const Scene3D = lazy(() => import("@/components/three/Scene3D"));

const PILLARS = [
  {
    icon: Plug,
    title: "Connected by default",
    desc: "Every channel an agency runs—ads, analytics, and beyond—flows into one governed pipeline instead of a folder of logins.",
  },
  {
    icon: Sparkles,
    title: "AI that drafts, humans approve",
    desc: "Fluxvex AI drafts summaries, flags anomalies, and suggests next steps. Your strategists review, refine, and own the story.",
  },
  {
    icon: CalendarClock,
    title: "Delivery on autopilot",
    desc: "Branded reports land with every client on schedule, every cycle—whether it is five clients or five hundred.",
  },
];

/* The agency OS roadmap — reporting today, proposals and invoicing as future plans */
const STAGES = [
  {
    chip: "Building now",
    highlight: true,
    title: "Client reporting",
    desc: "The launch focus. Automated, branded client reports from Google Ads, Meta Ads, and GA4—AI-drafted summaries, approved by your team, delivered on schedule.",
    stats: [
      { label: "Reporting time", value: "−40%" },
      { label: "Hours back / yr", value: "+230" },
      { label: "Workdays", value: "+29" },
    ],
    testid: "vision-roadmap-reporting",
  },
  {
    chip: "Future plan",
    title: "Proposal making",
    desc: "AI-assisted proposals drafted from a prospect's real performance data—scope, deliverables, and pricing suggestions your team refines and sends.",
    stats: [
      { label: "Drafts", value: "AI-assisted" },
      { label: "Scope", value: "Suggested" },
    ],
    testid: "vision-roadmap-proposals",
  },
  {
    chip: "Future plan",
    title: "Invoicing",
    desc: "Invoices generated from delivered work—retainers, reporting cycles, and ad spend—closing the loop from proposal to payment in one system.",
    stats: [
      { label: "Invoices", value: "From reports" },
      { label: "Retainers", value: "Auto" },
    ],
    testid: "vision-roadmap-invoicing",
  },
  {
    chip: "Future plan",
    title: "AI account manager",
    desc: "An AI account manager that runs day-to-day client communication—status updates, answers, and reporting calls—replacing a role most agencies pay lakhs for every year.",
    stats: [
      { label: "Updates", value: "Scheduled" },
      { label: "Answers", value: "AI-drafted" },
    ],
    testid: "vision-roadmap-ai-account-manager",
  },
];

/* Bento card — tinted visual zone with floating stat pills over a signature
   mini-visualization, then title + description (reference-card anatomy). */
function BentoStat({ label, value }) {
  return (
    <span className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[13px] shadow-[0_8px_20px_-10px_rgba(16,16,20,0.3)]">
      <span className="font-medium text-ink">{label}</span>
      <span className="h-3 w-px bg-line" aria-hidden="true" />
      <span className="font-display font-semibold text-[#0E8A3E]">{value}</span>
    </span>
  );
}

function BentoCard({ stage, vizTint, children }) {
  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-48px_rgba(16,16,20,0.4)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_56px_100px_-48px_rgba(16,16,20,0.45)]"
      data-testid={stage.testid}
    >
      <div className={`relative h-[230px] overflow-hidden ${vizTint}`}>
        <div className="absolute inset-x-5 top-5 z-10 flex flex-wrap items-center justify-center gap-2">
          {stage.stats.map((s) => (
            <BentoStat key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        {children}
      </div>
      <div className="flex flex-1 flex-col p-7 pt-6">
        <span
          className={`w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
            stage.highlight ? "border-mint/40 bg-mint/10 text-[#0E8A3E]" : "border-line bg-surface text-ink-soft"
          }`}
        >
          {stage.chip}
        </span>
        <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{stage.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.desc}</p>
      </div>
    </div>
  );
}

/* State-of-the-art AI capabilities — some at launch, some on the roadmap */
const AI_CAPABILITIES = [
  { text: "Drafts client-ready summaries and flags anomalies", plan: false },
  { text: "Answers questions about any reporting period in plain language", plan: false },
  { text: "Drafts proposals scoped from real client performance", plan: true },
  { text: "Turns delivered work into ready-to-send invoices", plan: true },
  { text: "An AI account manager that runs day-to-day client communication—saving what a full-time manager costs", plan: true },
];

function VisionSceneLegacy() {
  return (
    <IsoPlane w={330} h={246} scale="scale-[0.78] sm:scale-100 lg:scale-[1.18]" className="mx-auto h-full">
      <IsoTile x={16} y={18} w={54} h={54}>
        <GoogleAdsMark size={22} />
      </IsoTile>
      <IsoTile x={16} y={98} w={54} h={54}>
        <MetaMark size={22} />
      </IsoTile>
      <IsoTile x={16} y={178} w={54} h={54}>
        <GA4Mark size={22} />
      </IsoTile>
      <IsoWire from={[70, 45]} to={[150, 115]} delay={0} />
      <IsoWire from={[70, 125]} to={[150, 123]} delay={0.35} />
      <IsoWire from={[70, 205]} to={[150, 131]} delay={0.7} />
      <IsoTile x={150} y={97} w={68} h={68} active>
        <FluxvexMark size={30} />
      </IsoTile>
      <IsoWire from={[218, 131]} to={[262, 131]} delay={1} />
      <IsoTile x={262} y={107} w={52} h={52} float={false}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#3D43E8" strokeWidth="1.6" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="#3D43E8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </IsoTile>
      <IsoBillboard x={88} y={226}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">One connected pipeline</span>
      </IsoBillboard>
      <IsoBillboard x={158} y={58}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-[#0E8A3E]">Fluxvex AI · drafting</span>
      </IsoBillboard>
      <IsoBillboard x={226} y={188}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">On schedule</span>
      </IsoBillboard>
    </IsoPlane>
  );
}

export default function Vision() {
  const { openWaitlist } = useWaitlist();
  const reduce = useReducedMotion();
  return (
    <SectionShell id="vision">
      <SectionHeader
        overline="Our vision"
        title="Not just reporting. The operating system for agencies."
        copy="Fluxvex starts with the work agencies feel every month—client reporting. The plan is to expand into the full agency loop, from proposal making to invoicing—all the way to an AI account manager—with state-of-the-art AI at the core of every step."
      />
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="overflow-x-clip" data-testid="vision-scene">
            <Suspense fallback={<VisionSceneLegacy />}>
              <Scene3D
                scene="vision"
                testid="vision-scene-3d"
                fallback={<VisionSceneLegacy />}
                className="mx-auto h-[400px] w-full sm:h-[440px] lg:h-[470px]"
              />
            </Suspense>
          </div>
        </Reveal>
        <div className="space-y-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div
                className="group flex items-start gap-4 rounded-xl border border-line bg-page p-6 transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/30 hover:shadow-[0_32px_64px_-28px_rgba(61,67,232,0.35)]"
                data-testid={`vision-pillar-${i + 1}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <p.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* agency loop — bento grid */}
      <div className="mt-16" data-testid="vision-roadmap">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" aria-hidden="true" />
              The agency loop
            </span>
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tighter2 text-ink sm:text-4xl">
              One system for the whole agency loop
            </h3>
            <p className="max-w-2xl text-[15px] leading-[1.7] text-ink-soft">
              Reporting is where Fluxvex begins. From there, the same connected pipeline and AI core extend to the
              work on either side of it—winning the engagement and getting paid for it.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* 01 — client reporting (hero card, reporting chart) */}
          <Reveal className="h-full lg:col-span-2">
            <BentoCard stage={STAGES[0]} delay={0} vizTint="bg-[radial-gradient(120%_120%_at_50%_0%,#EAF6E9_0%,#F7FBF5_78%)]">
              <div className="absolute inset-x-0 bottom-0 top-[104px] flex items-end justify-center gap-4 px-10 sm:gap-6" aria-hidden="true">
                <span className="absolute inset-x-10 top-[34%] border-t border-dashed border-ink/25">
                  <span className="absolute -top-2.5 left-0 rounded bg-white/85 px-1.5 text-[10px] font-medium text-ink-soft">Avg. cycle</span>
                </span>
                {[38, 56, 44, 60].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-9 rounded-t-md bg-[#E9ECE3] sm:w-11"
                    style={{ height: `${h}%`, transformOrigin: "bottom" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                  />
                ))}
                <motion.span
                  className="relative w-9 rounded-t-md bg-gradient-to-b from-[#C9F2C4] via-[#54C468] to-[#1E7A3C] shadow-[0_18px_36px_-14px_rgba(30,122,60,0.55)] sm:w-11"
                  style={{ height: "88%", transformOrigin: "bottom" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                >
                  <motion.span
                    className="absolute left-1/2 top-[24%] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow-[0_2px_8px_rgba(16,16,20,0.35)]"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.span>
                <motion.span
                  className="w-9 rounded-t-md bg-[#E9ECE3] sm:w-11"
                  style={{ height: "48%", transformOrigin: "bottom" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
            </BentoCard>
          </Reveal>

          {/* 02 — proposal making (drafting doc) */}
          <Reveal delay={0.08} className="h-full">
            <BentoCard stage={STAGES[1]} delay={0} vizTint="bg-[radial-gradient(120%_120%_at_50%_0%,#EFEEFB_0%,#F8F8FD_78%)]">
              <div className="absolute inset-x-0 bottom-0 top-[96px] flex items-end justify-center px-10" aria-hidden="true">
                <motion.div
                  className="h-[92%] w-44 rounded-t-xl bg-white p-4 shadow-[0_28px_56px_-28px_rgba(61,67,232,0.4)]"
                  initial={{ y: 28, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span className="block h-2 w-16 rounded bg-accent/70" />
                  <span className="mt-3.5 block h-1.5 w-full rounded bg-ink/10" />
                  <span className="mt-2 block h-1.5 w-4/5 rounded bg-ink/[0.07]" />
                  <span className="mt-2 block h-1.5 w-3/5 rounded bg-ink/[0.07]" />
                  <motion.span
                    className="mt-5 block h-1.5 rounded bg-accent"
                    initial={{ width: "10%" }}
                    whileInView={{ width: "78%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  />
                </motion.div>
              </div>
            </BentoCard>
          </Reveal>

          {/* 03 — invoicing (auto-drafted invoice) */}
          <Reveal className="h-full">
            <BentoCard stage={STAGES[2]} delay={0} vizTint="bg-[radial-gradient(120%_120%_at_50%_0%,#FBF3E2_0%,#FDFBF4_78%)]">
              <div className="absolute inset-x-0 bottom-0 top-[96px] flex items-end justify-center px-10" aria-hidden="true">
                <motion.div
                  className="h-[92%] w-48 rounded-t-xl bg-white p-4 shadow-[0_28px_56px_-28px_rgba(201,138,20,0.4)]"
                  initial={{ y: 28, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span className="block h-2 w-14 rounded bg-[#C98A14]/70" />
                  <span className="mt-3.5 flex items-center justify-between">
                    <span className="block h-1.5 w-20 rounded bg-ink/10" />
                    <span className="block h-1.5 w-8 rounded bg-ink/[0.16]" />
                  </span>
                  <span className="mt-2 flex items-center justify-between">
                    <span className="block h-1.5 w-16 rounded bg-ink/[0.07]" />
                    <span className="block h-1.5 w-8 rounded bg-ink/[0.16]" />
                  </span>
                  <span className="mt-3 block h-px w-full bg-line" />
                  <span className="mt-3 flex items-center justify-between">
                    <span className="block h-1.5 w-12 rounded bg-ink/10" />
                    <span className="block h-1.5 w-10 rounded bg-[#0E8A3E]/60" />
                  </span>
                  <motion.span
                    className="mt-4 w-fit rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0E8A3E]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  >
                    Auto-drafted
                  </motion.span>
                </motion.div>
              </div>
            </BentoCard>
          </Reveal>

          {/* 04 — AI account manager (chat, hero card) */}
          <Reveal delay={0.08} className="h-full lg:col-span-2">
            <BentoCard stage={STAGES[3]} delay={0} vizTint="bg-[radial-gradient(120%_120%_at_50%_0%,#E9F2FB_0%,#F6FAFD_78%)]">
              <div className="absolute inset-x-0 bottom-0 top-[96px] flex flex-col items-center justify-end gap-2.5 px-8" aria-hidden="true">
                <motion.span
                  className="w-fit rounded-2xl rounded-bl-md bg-ink/[0.06] px-4 py-2 text-xs font-medium text-ink-soft"
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  How did June perform for Northbeam?
                </motion.span>
                <motion.span
                  className="w-fit rounded-2xl rounded-br-md bg-accent px-4 py-2 text-xs font-medium text-white shadow-[0_16px_32px_-16px_rgba(61,67,232,0.6)]"
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
                >
                  On it — June’s client report is drafted and ready for review.
                </motion.span>
                <motion.span
                  className="flex items-center gap-1 rounded-2xl rounded-br-md bg-accent/10 px-3.5 py-2.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18, ease: "easeInOut" }}
                    />
                  ))}
                </motion.span>
              </div>
            </BentoCard>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs leading-relaxed text-ink-soft/70">
            Client reporting ships at launch; proposals and invoicing are future plans on the same AI core—built
            with waitlist feedback shaping the order.
          </p>
        </Reveal>
      </div>

      {/* state-of-the-art AI capabilities */}
      <Reveal>
        <div
          className="fine-grid relative mt-14 overflow-hidden rounded-2xl border border-accent-border bg-accent-tint p-8 sm:p-10"
          data-testid="vision-ai-block"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-sm">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-[0_16px_30px_-10px_rgba(61,67,232,0.6)]">
                <Zap className="h-5 w-5" />
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-xl border-2 border-accent/50"
                    animate={{ scale: [1, 1.3], opacity: [0.9, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                )}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                State-of-the-art AI at the core
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                One AI engine learns your accounts and your voice—drafting the work, flagging what matters, and
                leaving every final call to your team.
              </p>
            </div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid flex-1 gap-3 sm:grid-cols-2"
            >
              {AI_CAPABILITIES.map((c) => (
                <motion.li
                  key={c.text}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
                  }}
                  className="flex items-start gap-2.5 rounded-xl border border-accent/15 bg-page/80 p-4 text-[13.5px] font-medium leading-snug text-ink"
                  data-testid={`vision-ai-capability${c.plan ? "-future" : ""}`}
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {c.text}
                    {c.plan && (
                      <span className="ml-2 inline-block rounded-full border border-accent/30 bg-accent-tint/70 px-2 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.12em] text-accent">
                        Future plan
                      </span>
                    )}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Reveal>

      {/* compliance built in */}
      <Reveal>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-line bg-page p-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Compliance built in from day one
          </p>
          <ComplianceBadges />
          <p className="max-w-xl text-xs leading-relaxed text-black/45">
            As the operating system expands into proposals and invoicing, the same privacy-first architecture—GDPR,
            HIPAA, DPDP, and CCPA aligned—carries across every module.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-line bg-page p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
            We are building toward a launch where an agency connects its accounts once—and never rebuilds a
            client report by hand again. The proposal and invoicing modules follow on the same foundation.
          </p>
          <TapCTA
            onClick={() => openWaitlist("vision")}
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
            testid="vision-cta-button"
          >
            Be part of the vision
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </TapCTA>
        </div>
      </Reveal>
    </SectionShell>
  );
}

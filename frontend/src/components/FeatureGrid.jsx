import { motion } from "framer-motion";
import { Database, Sparkles, Bell, BarChart3, TrendingUp, Users, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

function Cursor() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="absolute -bottom-2.5 -right-2 drop-shadow" aria-hidden="true">
      <path d="M5 3l14 8-6.5 1.5L15 20l-3 1-2.5-7.5L5 17V3z" fill="#101014" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function Bob({ children, delay = 0 }) {
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
      aria-hidden="false"
    >
      {children}
    </motion.span>
  );
}

/* Card 1 — dish of sources, dashed drop, section list (exact reference diagram) */
function VisualInputs() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6" data-testid="feature-visual-inputs">
      {/* dish holding the source icons */}
      <div className="relative flex h-[86px] w-56 items-end justify-center">
        <div className="absolute bottom-0 h-14 w-56 rounded-[50%] bg-white shadow-[inset_0_8px_16px_rgba(16,16,20,0.09),0_26px_45px_-18px_rgba(16,16,20,0.35)]" />
        <div className="relative bottom-3 flex items-end gap-3">
          <Bob>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_12px_24px_-10px_rgba(16,16,20,0.3)] ring-1 ring-black/5">
              <GoogleAdsMark size={16} />
            </span>
          </Bob>
          <Bob delay={0.5}>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_16px_32px_-8px_rgba(61,67,232,0.5)] ring-1 ring-accent/25">
              <span className="absolute inset-0 rounded-2xl bg-accent/25 blur-md" aria-hidden="true" />
              <FluxvexMark size={26} className="relative rounded-lg" />
            </span>
          </Bob>
          <Bob delay={1}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_12px_24px_-10px_rgba(16,16,20,0.3)] ring-1 ring-black/5">
              <MetaMark size={16} />
            </span>
          </Bob>
        </div>
      </div>
      {/* dashed connector with traveling packet */}
      <div className="relative h-9 w-px" aria-hidden="true">
        <div className="absolute inset-0 border-l border-dashed border-black/25" />
        <motion.span
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-accent"
          style={{ boxShadow: "0 0 8px 2px rgba(61,67,232,0.4)" }}
          animate={{ top: ["-4%", "96%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* section list */}
      <div className="w-56 space-y-1.5">
        {[
          { icon: BarChart3, label: "Campaign metrics", count: "12", hot: false },
          { icon: TrendingUp, label: "Channel results", count: "+24", hot: true },
          { icon: Users, label: "Audience insights", count: "8", hot: false },
        ].map((row) => (
          <div
            key={row.label}
            className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium ${
              row.hot ? "border border-accent/30 bg-white text-ink shadow-[0_14px_30px_-14px_rgba(61,67,232,0.45)]" : "text-ink-soft"
            }`}
          >
            <row.icon className={`h-3.5 w-3.5 ${row.hot ? "text-accent" : "text-black/35"}`} strokeWidth={1.9} />
            {row.label}
            <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.hot ? "bg-accent text-white" : "bg-black/[0.06] text-ink-soft"}`}>
              {row.count}
            </span>
            {row.hot && <Cursor />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card 2 — cascading message bubbles (exact reference diagram) */
function VisualSummaries() {
  const bubbles = [
    { mark: <GoogleAdsMark size={14} />, title: "Northbeam Media", text: "June spend synced—$48,210", cls: "" },
    { mark: <MetaMark size={14} />, title: "Meta Ads", text: "ROAS 2.4x this month", cls: "ml-7" },
    { mark: <GA4Mark size={14} />, title: "GA4", text: "Sessions +18% vs May", cls: "ml-12" },
    { mark: <FluxvexMark size={14} className="rounded-md" />, title: "Fluxvex AI", text: "Drafting the client summary…", cls: "ml-4", ai: true },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6" data-testid="feature-visual-summaries">
      {bubbles.map((b, i) => (
        <div
          key={b.title}
          className={`flex w-fit items-center gap-3 rounded-xl border border-black/[0.05] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(16,16,20,0.28)] bob ${b.ai ? "ring-1 ring-accent/25" : ""} ${b.cls}`}
          style={{ animationDelay: `${i * 0.55}s` }}
        >
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-black/5 ${b.ai ? "bg-accent-tint" : "bg-surface"}`}>{b.mark}</span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
              {b.title}
              {b.ai && <Sparkles className="h-3 w-3 text-accent" />}
            </span>
            <span className="block truncate text-[11px] text-ink-soft">{b.text}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* Card 3 — report request card → generating pill → countdown dial (exact reference diagram) */
function VisualDelivery() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 p-6" data-testid="feature-visual-delivery">
      <div className="flex w-60 items-center gap-3 rounded-xl border border-black/[0.05] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(16,16,20,0.28)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink font-display text-[10px] font-bold text-white">N</span>
        <span>
          <span className="block text-[12px] font-semibold text-ink">northbeam.client</span>
          <span className="block text-[11px] text-ink-soft">June 2025 report—due Friday</span>
        </span>
      </div>
      <div className="h-4 w-px border-l border-dashed border-black/25" aria-hidden="true" />
      <div className="relative flex w-64 items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_20px_45px_-16px_rgba(16,16,20,0.3)] ring-1 ring-accent/15">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ animationDuration: "2.4s" }} aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9" stroke="#3D43E8" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="text-[12px] font-medium text-ink">Fluxvex generating fast report…</span>
        <span className="absolute -bottom-2.5 right-3 flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold text-white">
          <Zap className="h-2.5 w-2.5 text-[#F5D748]" /> 3 Integrations
        </span>
      </div>
      <div className="h-4 w-px border-l border-dashed border-black/25" aria-hidden="true" />
      <div className="relative mt-1 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_24px_50px_-18px_rgba(16,16,20,0.35)] ring-1 ring-black/5">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i * 7.5 * Math.PI) / 180;
            const inner = i % 4 === 0 ? 50 : 54;
            return (
              <line
                key={i}
                x1={60 + inner * Math.cos(angle)}
                y1={60 + inner * Math.sin(angle)}
                x2={60 + 57 * Math.cos(angle)}
                y2={60 + 57 * Math.sin(angle)}
                stroke="rgba(16,16,20,0.22)"
                strokeWidth="1.4"
              />
            );
          })}
        </svg>
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_3.2s_linear_infinite]" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="none" stroke="#3D43E8" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="88 264" />
        </svg>
        <span className="font-display text-2xl font-semibold tracking-tight text-ink">00:03</span>
        <span className="absolute bottom-5 text-[9px] font-medium uppercase tracking-wide text-black/40">to delivery</span>
      </div>
    </div>
  );
}

const CARDS = [
  {
    icon: Database,
    category: "Sources",
    title: "Unified data hub",
    desc: "Bring supported advertising and analytics data into one repeatable reporting workflow.",
    visual: <VisualInputs />,
  },
  {
    icon: Sparkles,
    category: "Fluxvex AI",
    title: "AI-written summaries",
    desc: "Fluxvex AI drafts consistent, client-ready summaries from every connected channel.",
    visual: <VisualSummaries />,
  },
  {
    icon: Bell,
    category: "Delivery",
    title: "Quick response delivery",
    desc: "Reduce the recurring setup and formatting work required for every reporting cycle.",
    visual: <VisualDelivery />,
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" data-testid="section-features">
      <div className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-28">
        {/* framed heading row */}
        <Reveal>
          <div className="flex flex-col justify-between gap-8 rounded-t-xl border border-b-0 border-line bg-page px-7 pb-10 pt-12 sm:px-10 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Features</p>
              <CinematicText
                as="h2"
                className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tighter2 text-ink sm:text-5xl lg:text-[54px]"
              >
                {["AI workflow for", "client reporting"]}
              </CinematicText>
            </div>
            <p className="max-w-xs pb-1 text-[15px] leading-[1.7] text-ink-soft">
              Automate data collection, AI summaries, formatting, and delivery across your client accounts.
            </p>
          </div>
        </Reveal>

        {/* card row */}
        <div className="grid overflow-hidden rounded-b-xl border border-line bg-page lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12} className="h-full">
              <div
                className={`flex h-full flex-col border-line transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_32px_64px_-30px_rgba(16,16,20,0.35)] max-lg:border-b lg:[&:not(:last-child)]:border-r ${
                  i === 1 ? "max-lg:bg-[#FBFAF6]" : ""
                }`}
                data-testid={`feature-card-${i + 1}`}
              >
                <div className="hatch-band border-b border-line" aria-hidden="true" />
                <div className="relative h-[320px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#FBFAF6_0%,#F1EFE8_100%)]">
                  {card.visual}
                </div>
                <div className="flex flex-1 flex-col border-t border-line p-7">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    <card.icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                    {card.category}
                  </p>
                  <h3 className="mt-3 text-[19px] font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

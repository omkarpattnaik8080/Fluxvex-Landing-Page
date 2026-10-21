import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Zap, Database, Sparkles, Bell } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";

const SCENE_SCALE = "scale-[0.72] sm:scale-90 lg:scale-105";

function Cursor() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" className="absolute -bottom-2 -right-2 drop-shadow" aria-hidden="true">
      <path d="M5 3l14 8-6.5 1.5L15 20l-3 1-2.5-7.5L5 17V3z" fill="#101014" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

/* Card 1 — sources feed the hub; the report-section list floats beside it */
function VisualInputs() {
  return (
    <div className="h-full" data-testid="feature-visual-inputs">
      <IsoPlane w={340} h={210} scale={SCENE_SCALE} className="h-full">
        <IsoTile x={12} y={20} w={44} h={44}>
          <GoogleAdsMark size={16} />
        </IsoTile>
        <IsoTile x={12} y={82} w={44} h={44}>
          <MetaMark size={16} />
        </IsoTile>
        <IsoTile x={12} y={144} w={44} h={44}>
          <GA4Mark size={16} />
        </IsoTile>
        <IsoWire from={[58, 42]} to={[104, 102]} delay={0} />
        <IsoWire from={[58, 104]} to={[104, 104]} delay={0.3} />
        <IsoWire from={[58, 166]} to={[104, 106]} delay={0.6} />
        <IsoTile x={104} y={82} w={44} h={44} active>
          <FluxvexMark size={22} className="rounded-lg" />
        </IsoTile>
        <IsoBillboard x={154} y={24}>
          <div className="w-44 space-y-1.5 whitespace-normal">
            {[
              { icon: BarChart3, label: "Campaign metrics", count: "12", hot: false },
              { icon: TrendingUp, label: "Channel results", count: "+24", hot: true },
              { icon: Users, label: "Audience insights", count: "8", hot: false },
            ].map((row) => (
              <div
                key={row.label}
                className={`relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10.5px] font-medium ${
                  row.hot ? "border border-accent/30 bg-accent-tint/70 text-ink" : "text-ink-soft"
                }`}
              >
                <row.icon className={`h-3 w-3 shrink-0 ${row.hot ? "text-accent" : "text-black/35"}`} strokeWidth={1.9} />
                {row.label}
                <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${row.hot ? "bg-accent text-white" : "bg-black/[0.06] text-ink-soft"}`}>
                  {row.count}
                </span>
                {row.hot && <Cursor />}
              </div>
            ))}
          </div>
        </IsoBillboard>
      </IsoPlane>
    </div>
  );
}

/* Card 2 — channels stream into Fluxvex AI, which drafts the summary */
function VisualSummaries() {
  return (
    <div className="h-full" data-testid="feature-visual-summaries">
      <IsoPlane w={340} h={210} scale={SCENE_SCALE} className="h-full">
        <IsoTile x={12} y={20} w={44} h={44}>
          <GoogleAdsMark size={16} />
        </IsoTile>
        <IsoTile x={12} y={82} w={44} h={44}>
          <MetaMark size={16} />
        </IsoTile>
        <IsoTile x={12} y={144} w={44} h={44}>
          <GA4Mark size={16} />
        </IsoTile>
        <IsoWire from={[58, 42]} to={[106, 102]} delay={0} />
        <IsoWire from={[58, 104]} to={[106, 104]} delay={0.3} />
        <IsoWire from={[58, 166]} to={[106, 106]} delay={0.6} />
        <IsoTile x={106} y={82} w={46} h={46} active testid="feature-ai-tile">
          <span className="relative">
            <span className="absolute inset-0 rounded-xl bg-accent/25 blur-md" aria-hidden="true" />
            <FluxvexMark size={22} className="relative rounded-lg" />
          </span>
        </IsoTile>
        <IsoBillboard x={158} y={28}>
          <span className="flex items-center gap-2 whitespace-nowrap text-[11px] font-medium text-ink">
            <MetaMark size={13} />
            Meta Ads · ROAS 2.4x
          </span>
        </IsoBillboard>
        <IsoBillboard x={150} y={126}>
          <span className="flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold text-ink">
            <Sparkles className="h-3 w-3 text-accent" />
            AI · drafting summary
            <span className="typing-dot h-1 w-1 rounded-full bg-accent" />
            <span className="typing-dot h-1 w-1 rounded-full bg-accent" style={{ animationDelay: "0.18s" }} />
          </span>
        </IsoBillboard>
      </IsoPlane>
    </div>
  );
}

/* Card 3 — request → AI generation → client-ready in seconds */
function VisualDelivery() {
  return (
    <div className="h-full" data-testid="feature-visual-delivery">
      <IsoPlane w={340} h={210} scale={SCENE_SCALE} className="h-full">
        <IsoTile x={16} y={78} w={44} h={52} float={false}>
          <span className="flex h-10 w-8 flex-col gap-[3px] p-1" aria-hidden="true">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-ink font-display text-[7px] font-bold text-white">N</span>
            <span className="mt-1 h-[3px] w-full rounded bg-accent/50" />
            <span className="h-[2px] w-4/5 rounded bg-black/15" />
            <span className="h-[2px] w-3/5 rounded bg-black/10" />
          </span>
        </IsoTile>
        <IsoWire from={[62, 104]} to={[110, 104]} delay={0} />
        <IsoTile x={110} y={80} w={46} h={46} active>
          <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.8} />
        </IsoTile>
        <IsoWire from={[158, 104]} to={[206, 104]} delay={0.5} />
        <IsoTile x={206} y={78} w={44} h={52} float={false}>
          <span className="flex h-10 w-8 flex-col gap-[3px] p-1" aria-hidden="true">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-accent font-display text-[7px] font-bold text-white">N</span>
            <span className="mt-1 h-[3px] w-full rounded bg-accent/60" />
            <span className="h-[2px] w-4/5 rounded bg-black/15" />
            <span className="h-[2px] w-3/5 rounded bg-black/10" />
          </span>
        </IsoTile>
        <IsoBillboard x={64} y={146}>
          <span className="whitespace-nowrap text-[11px] font-medium text-ink">Generating report…</span>
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold text-white align-middle">
            <Zap className="h-2.5 w-2.5 text-[#F5D748]" /> 3 Integrations
          </span>
        </IsoBillboard>
        <IsoBillboard x={238} y={30}>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(16,16,20,0.12)" strokeWidth="3" />
              <motion.circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="#3D43E8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30 77"
                initial={false}
                animate={{ strokeDashoffset: [30, 0, 30] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
            <span className="font-display text-sm font-semibold text-ink">00:03</span>
          </span>
        </IsoBillboard>
      </IsoPlane>
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
                <div className="relative h-[300px] overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#FBFAF6_0%,#F1EFE8_100%)]">
                  {card.visual}
                </div>
                <div className="flex flex-1 flex-col border-t border-line p-7">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    <card.icon className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                    {card.category}
                  </p>
                  <h3 className="mt-3 font-display text-[19px] font-semibold tracking-tight text-ink">{card.title}</h3>
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

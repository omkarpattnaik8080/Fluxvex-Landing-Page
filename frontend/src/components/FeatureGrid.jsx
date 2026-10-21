import { Database, FileText, Bell } from "lucide-react";
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

function VisualInputs() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="w-64 rounded-xl border border-black/[0.05] bg-white p-3 shadow-[0_20px_45px_-20px_rgba(16,16,20,0.3)]">
        <div className="flex gap-1.5 px-1 pb-2" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        </div>
        <div className="relative mt-1 flex items-center justify-center gap-8 border-b border-hairline pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface ring-1 ring-black/5"><GoogleAdsMark size={15} /></span>
          <span className="relative -mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_14px_30px_-8px_rgba(61,67,232,0.45)] ring-1 ring-accent/20">
            <span className="absolute inset-0 rounded-2xl bg-accent/25 blur-md" aria-hidden="true" />
            <FluxvexMark size={26} className="relative rounded-lg" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface ring-1 ring-black/5"><MetaMark size={15} /></span>
        </div>
        <p className="px-2 pt-3 text-[10px] font-medium uppercase tracking-wide text-black/40">Report sections</p>
        <div className="mt-2 space-y-1.5">
          {[
            ["Campaign metrics", "12", false],
            ["Client summary", "+24", true],
            ["GA4 sessions", "8", false],
          ].map(([label, count, hot]) => (
            <div
              key={label}
              className={`relative flex items-center justify-between rounded-lg px-3 py-2 text-[12px] font-medium ${
                hot ? "border border-accent/30 bg-accent-tint text-ink" : "border border-hairline bg-page text-ink-soft"
              }`}
            >
              {label}
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${hot ? "bg-accent text-white" : "bg-surface text-ink-soft ring-1 ring-black/5"}`}>
                {count}
              </span>
              {hot && <Cursor />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualReports() {
  const rows = [
    { mark: <MetaMark size={14} />, title: "Northbeam Media", sub: "June report is ready", cls: "" },
    { mark: <GA4Mark size={14} />, title: "Q2 review", sub: "Drafting summary…", cls: "ml-8" },
    { mark: <GoogleAdsMark size={14} />, title: "Weekly snapshot", sub: "Delivered Monday", cls: "ml-4" },
    { mark: <FluxvexMark size={14} className="rounded-md" />, title: "Branded export", sub: "Client-ready PDF", cls: "ml-12" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-6">
      {rows.map((r, i) => (
        <div
          key={r.title}
          className={`flex items-center gap-3 rounded-xl border border-black/[0.05] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(16,16,20,0.28)] bob ${r.cls}`}
          style={{ animationDelay: `${i * 0.55}s` }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-black/5">{r.mark}</span>
          <span className="min-w-0">
            <span className="block truncate text-[12px] font-semibold text-ink">{r.title}</span>
            <span className="block truncate text-[11px] text-ink-soft">{r.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function VisualDelivery() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div className="flex w-60 items-center gap-3 rounded-xl border border-black/[0.05] bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(16,16,20,0.28)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink font-display text-[10px] font-bold text-white">N</span>
        <span>
          <span className="block text-[12px] font-semibold text-ink">northbeam.client</span>
          <span className="block text-[11px] text-ink-soft">June 2025 report</span>
        </span>
      </div>
      <div className="flex w-64 items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_20px_45px_-16px_rgba(16,16,20,0.3)] ring-1 ring-accent/15">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin" style={{ animationDuration: "2.4s" }} aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9" stroke="#3D43E8" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="text-[12px] font-medium text-ink">Fluxvex generating report…</span>
      </div>
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
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full motion-safe:animate-[spin_3.2s_linear_infinite]"
          aria-hidden="true"
        >
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
    title: "Unified inputs",
    desc: "Bring supported advertising and analytics data into one repeatable reporting workflow.",
    visual: <VisualInputs />,
  },
  {
    icon: FileText,
    category: "Reporting",
    title: "White-label reports",
    desc: "Make the report feel like an extension of your agency, not a disconnected tool.",
    visual: <VisualReports />,
  },
  {
    icon: Bell,
    category: "Delivery",
    title: "Repeatable delivery",
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
              Automate data collection, formatting, and delivery across your client accounts.
            </p>
          </div>
        </Reveal>

        {/* card row */}
        <div className="grid overflow-hidden rounded-b-xl border border-line bg-page lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12} className="h-full">
              <div
                className={`flex h-full flex-col border-line max-lg:border-b lg:[&:not(:last-child)]:border-r ${
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

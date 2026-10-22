import { motion } from "framer-motion";
import { Check, FileText, Route, Palette } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

function PressTile({ children, className = "" }) {
  return (
    <div
      className={`relative flex h-28 items-center justify-center overflow-hidden rounded-lg border border-black/[0.05] bg-[#F3F2EE] shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] ${className}`}
      aria-hidden="true"
    >
      <span
        className="absolute right-0 top-0 h-5 w-5 bg-[#E7E5DE]"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      <span
        className="absolute right-0 top-0 h-5 w-5 bg-[#F3F2EE]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, calc(100% - 5px) calc(100% - 5px), 5px 5px)" }}
      />
      {children}
    </div>
  );
}

/* --- self-running promise visuals --- */

/* 1 — traceability: a metric piped straight back to its source */
function TraceViz() {
  return (
    <div className="relative flex w-full items-center justify-between px-2" aria-hidden="true">
      <span className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#0E8A3E] shadow-sm ring-1 ring-black/[0.06]">
        <span className="h-1 w-1 rounded-full bg-[#0E8A3E] animate-pulse-dot" /> ROAS 2.1x
      </span>
      <span className="relative mx-2 h-px flex-1 border-t border-dashed border-accent/45">
        <motion.span
          className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(61,67,232,0.4)]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <motion.span
        className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-semibold text-ink shadow-sm"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.75, 1] }}
      >
        <GoogleDot /> Google Ads
      </motion.span>
    </div>
  );
}

const GoogleDot = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
    <circle cx="12" cy="12" r="8" fill="none" stroke="#3D43E8" strokeWidth="2.4" />
  </svg>
);

/* 2 — schedule: reporting cycles tick by, delivery stamps itself */
function ScheduleViz() {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-2" aria-hidden="true">
      <div className="flex items-center gap-3">
        {["May", "Jun", "Jul", "Aug"].map((m, i) => (
          <motion.span
            key={m}
            className="flex h-7 w-9 items-center justify-center rounded-md text-[10px] font-bold text-ink"
            initial={false}
            animate={{ backgroundColor: ["rgba(16,16,20,0.05)", "#3D43E8", "rgba(16,16,20,0.05)"], color: ["#101014", "#FFFFFF", "#101014"] }}
            transition={{ duration: 3.2, times: [0, 0.18, 0.4], delay: i * 0.8, repeat: Infinity, repeatDelay: 1.6 }}
          >
            {m}
          </motion.span>
        ))}
      </div>
      <motion.span
        className="flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold text-[#0E8A3E]"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Check className="h-3 w-3" strokeWidth={3} /> Delivered on schedule
      </motion.span>
    </div>
  );
}

/* 3 — white-label: the brand layer paints itself onto the report */
function BrandViz() {
  return (
    <div className="flex w-full items-center justify-center px-2" aria-hidden="true">
      <div className="w-40 rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-black/[0.07]">
        <motion.span
          className="block h-2 rounded-sm"
          animate={{ backgroundColor: ["#3D43E8", "#7B5CFF", "#10B981", "#3D43E8"] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="mt-1.5 block h-1 w-4/5 rounded bg-black/10" />
        <span className="mt-1 block h-1 w-3/5 rounded bg-black/[0.07]" />
        <motion.span
          className="mt-2 flex w-fit items-center gap-1 rounded bg-[#F3F2EE] px-1.5 py-0.5"
          initial={{ x: -6, opacity: 0.4 }}
          animate={{ x: [0, 0, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FluxvexMark size={9} />
          <span className="text-[8px] font-bold text-ink">Your logo here</span>
        </motion.span>
      </div>
    </div>
  );
}

const PROMISES = [
  {
    icon: Route,
    title: "Numbers you can trace",
    desc: "Every figure in a report links back to its source platform—nothing appears from nowhere, and anyone can verify the chain in seconds.",
    viz: <TraceViz />,
    testid: "promise-card-trace",
  },
  {
    icon: FileText,
    title: "Delivered on schedule",
    desc: "Reports go out on the cycle you set—monthly, weekly, per client. The rhythm holds whether your team is heads-down or on holiday.",
    viz: <ScheduleViz />,
    testid: "promise-card-schedule",
  },
  {
    icon: Palette,
    title: "Your brand, front and center",
    desc: "Your logo, your colors, your voice. Fluxvex stays invisible—clients see your agency’s work, not our tooling.",
    viz: <BrandViz />,
    testid: "promise-card-brand",
  },
];

const COMMITMENTS = [
  "Every number sourced",
  "Reviewed by your team",
  "On schedule, every cycle",
  "Your brand, not ours",
  "No lock-in — export anytime",
  "Your data stays yours",
];

function CommitmentsTicker() {
  return (
    <div className="relative overflow-hidden border-t border-line py-3.5" data-testid="promise-ticker" aria-label="Fluxvex commitments">
      <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FDFDFA] to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FDFDFA] to-transparent" aria-hidden="true" />
      <div
        className="flex w-max items-center will-change-transform animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: "30s" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {COMMITMENTS.map((c, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-7 text-[12.5px] font-semibold tracking-tight text-ink-soft">{c}</span>
                <FluxvexMark size={13} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="bg-page px-5 pb-4 pt-2 sm:px-2.5" data-testid="section-promise">
      <Reveal>
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-xl border border-accent-border bg-[#FDFDFA]">
          <div className="grid lg:grid-cols-2">
            {/* quote */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Our promise</p>
              <blockquote className="mt-6">
                <CinematicText
                  as="p"
                  className="font-display text-xl font-medium leading-[1.45] tracking-tight text-ink sm:text-2xl"
                >
                  {[
                    "Reporting shouldn’t be the heaviest lift of the month.",
                    "Fluxvex assembles the numbers and the structure—",
                    "your team keeps the judgment calls.",
                  ]}
                </CinematicText>
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-tint">
                  <FluxvexMark size={20} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">The Fluxvex team</p>
                  <p className="text-xs text-ink-soft">Building the reporting workflow</p>
                </div>
              </div>
            </div>

            {/* pressed tile grid */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <PressTile key={i}>
                    {i === 4 ? (
                      <span className="flex items-center gap-2">
                        <FluxvexMark size={22} />
                        <span className="font-display text-xl font-semibold tracking-tight text-ink">Fluxvex</span>
                      </span>
                    ) : null}
                  </PressTile>
                ))}
              </div>
            </div>
          </div>

          {/* promise cards — each visual runs itself */}
          <div className="border-t border-line p-4 sm:p-6 lg:p-8">
            <div className="grid gap-3.5 md:grid-cols-3">
              {PROMISES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  className="group rounded-xl border border-line bg-white p-5 transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_32px_64px_-32px_rgba(61,67,232,0.4)]"
                  data-testid={p.testid}
                >
                  <div className="flex h-[88px] items-center overflow-hidden rounded-lg border border-hairline bg-surface/80">
                    {p.viz}
                  </div>
                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <p.icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <h4 className="text-[14.5px] font-semibold text-ink">{p.title}</h4>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* automated commitments ticker */}
          <CommitmentsTicker />
        </div>
      </Reveal>
    </section>
  );
}

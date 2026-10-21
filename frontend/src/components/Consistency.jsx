import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { IsoPlane, IsoTile, IsoWire, IsoBillboard } from "@/components/iso/IsoKit";
import { SectionShell } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";

/* Row 1 — aligned report tiles, verified */
function VisualStandard() {
  return (
    <IsoPlane w={150} h={124} scale="scale-90" className="h-full">
      {[0, 1, 2].map((i) => (
        <IsoTile key={i} x={34 + i * 5} y={10 + i * 32} w={62} h={28} float={false}>
          <span className="flex w-12 flex-col gap-[3px]" aria-hidden="true">
            <span className="h-[3px] w-full rounded bg-accent/50" />
            <span className="h-[2px] w-4/5 rounded bg-black/15" />
            <span className="h-[2px] w-3/5 rounded bg-black/10" />
          </span>
        </IsoTile>
      ))}
      <IsoBillboard x={112} y={22}>
        <span className="flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold text-[#0E8A3E]">
          <Check className="h-2.5 w-2.5" /> Aligned
        </span>
      </IsoBillboard>
    </IsoPlane>
  );
}

/* Row 2 — one report wearing the agency brand */
function VisualBrand() {
  return (
    <IsoPlane w={150} h={124} scale="scale-90" className="h-full">
      <IsoTile x={28} y={30} w={62} h={62} active>
        <span className="flex flex-col items-center gap-1" aria-hidden="true">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-accent font-display text-[8px] font-bold text-white">N</span>
          <span className="h-[3px] w-8 rounded bg-accent/50" />
          <span className="h-[2px] w-6 rounded bg-black/15" />
        </span>
      </IsoTile>
      <IsoBillboard x={108} y={40}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">Agency-branded</span>
      </IsoBillboard>
      <IsoBillboard x={120} y={110}>
        <span className="whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-white">Client-ready</span>
      </IsoBillboard>
    </IsoPlane>
  );
}

/* Row 3 — time shifts from prep to strategy */
function VisualStrategy() {
  return (
    <IsoPlane w={150} h={124} scale="scale-90" className="h-full">
      <IsoTile x={14} y={40} w={48} h={48} float={false}>
        <span className="flex flex-col gap-[3px] p-1.5" aria-hidden="true">
          <span className="h-[3px] w-full rounded bg-black/20" />
          <span className="h-[2px] w-4/5 rounded bg-black/12" />
          <span className="h-[2px] w-3/5 rounded bg-black/10" />
          <span className="h-[2px] w-2/3 rounded bg-black/10" />
        </span>
      </IsoTile>
      <IsoWire from={[64, 64]} to={[92, 64]} delay={0.2} />
      <IsoTile x={92} y={40} w={48} h={48} active>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="#3D43E8" strokeWidth="1.6" />
          <path d="M12 7.5V12l3 2" stroke="#3D43E8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </IsoTile>
      <IsoBillboard x={104} y={118}>
        <span className="whitespace-nowrap text-[10px] font-semibold text-ink">Strategy time</span>
      </IsoBillboard>
    </IsoPlane>
  );
}

const ROWS = [
  {
    num: "01",
    title: "A consistent reporting standard",
    desc: "Every account and reporting period follows the same clear structure.",
    visual: <VisualStandard />,
  },
  {
    num: "02",
    title: "A client-ready presentation",
    desc: "Reports reflect the agency’s brand, not a disconnected tool.",
    visual: <VisualBrand />,
  },
  {
    num: "03",
    title: "More room for analysis and client strategy",
    desc: "Instead of repeated report preparation, capacity shifts to the work that earns the retainer.",
    visual: <VisualStrategy />,
  },
];

export default function Consistency() {
  return (
    <SectionShell id="operations">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Made for agency operations</p>
          </Reveal>
          <CinematicText
            as="h2"
            className="mt-4 font-display text-3xl font-semibold leading-[1.04] tracking-tighter2 text-ink sm:text-4xl lg:text-[44px]"
          >
            Every client gets a clearer story, not just another spreadsheet.
          </CinematicText>
          <Reveal y={14} delay={0.15}>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-ink-soft">
              The same standard applies to every client, every month—so quality stops depending on who built the deck.
            </p>
          </Reveal>
        </div>
        <div className="space-y-4">
          {ROWS.map((row, i) => (
            <Reveal key={row.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group flex items-center gap-6 rounded-xl border border-line bg-page p-6 shadow-[0_18px_40px_-26px_rgba(16,16,20,0.3)] transition-[box-shadow,background-color] duration-300 hover:bg-accent-tint/30 hover:shadow-[0_32px_64px_-28px_rgba(61,67,232,0.4)] sm:gap-8 sm:p-7"
                data-testid={`operations-row-${row.num}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint font-display text-sm font-bold text-accent">
                  {row.num}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{row.title}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-soft">{row.desc}</p>
                </div>
                <div className="hidden h-28 w-44 shrink-0 md:block" aria-hidden="true">
                  {row.visual}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

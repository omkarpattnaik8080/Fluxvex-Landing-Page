import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, KeyRound, Lock, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";
import ComplianceBadges from "@/components/ComplianceBadges";

/* Reference-faithful security stage — lavender container, wired hub, tinted mini-UI cards.
   Animated: wires draw on view, packets travel into the core, core pulses, cards stagger. */

const WIRES = [
  "M220 75 H296 Q304 75 304 83 V102 Q304 110 312 110 H354",
  "M220 165 H296 Q304 165 304 157 V138 Q304 130 312 130 H354",
  "M660 75 H584 Q576 75 576 83 V102 Q576 110 568 110 H526",
  "M660 165 H584 Q576 165 576 157 V138 Q576 130 568 130 H526",
];
const DROP = "M440 157 V296";

const SOURCES = {
  left: [
    { name: "Google Ads", dot: "#F4B400", top: 53 },
    { name: "Meta Ads", dot: "#0866FF", top: 143 },
  ],
  right: [
    { name: "GA4", dot: "#E37400", top: 53 },
    { name: "TikTok Ads", dot: "#17171C", top: 143 },
  ],
};

function SourcePill({ name, dot, className = "", style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.35, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ y: -3 }}
      style={style}
      className={`flex h-11 items-center gap-2.5 rounded-xl bg-white px-4 shadow-[0_18px_36px_-20px_rgba(23,23,28,0.45)] ${className}`}
    >
      <span className="h-2.5 w-2.5 rounded-[4px]" style={{ backgroundColor: dot }} aria-hidden="true" />
      <span className="text-[13px] font-semibold text-[#17171C]">{name}</span>
    </motion.div>
  );
}

function WirePacket({ d, dur = 2.4, begin = 0, color = "#3D43E8" }) {
  return (
    <circle r="3.4" fill={color} opacity="0">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  );
}

function HubDiagram() {
  return (
    <>
      {/* desktop — fixed 880×300 stage, wires draw on view, packets loop into the core */}
      <div className="relative mx-auto hidden h-[300px] w-full max-w-[880px] lg:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 880 300" preserveAspectRatio="none" fill="none">
          <g stroke="#C6C6D2" strokeWidth="1.5">
            {WIRES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.25, 1, 0.5, 1] }}
              />
            ))}
            <motion.path
              d={DROP}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.25, 1, 0.5, 1] }}
            />
          </g>
          <motion.g
            fill="#A9A9B8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <circle cx="220" cy="75" r="3.5" />
            <circle cx="220" cy="165" r="3.5" />
            <circle cx="660" cy="75" r="3.5" />
            <circle cx="660" cy="165" r="3.5" />
            <path d="M435 288 L445 288 L440 296 Z" />
          </motion.g>
          {WIRES.map((d, i) => (
            <WirePacket key={d} d={d} begin={i * 0.55} color={i < 2 ? "#3D43E8" : "#0E8A3E"} />
          ))}
          <WirePacket d={DROP} dur={2} begin={1.2} color="#0E8A3E" />
        </svg>
        {SOURCES.left.map((s) => (
          <SourcePill key={s.name} name={s.name} dot={s.dot} className="absolute left-0 w-[25%]" style={{ top: s.top }} />
        ))}
        {SOURCES.right.map((s) => (
          <SourcePill key={s.name} name={s.name} dot={s.dot} className="absolute right-0 w-[25%]" style={{ top: s.top }} />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
          whileInView={{ opacity: 1, scale: 1, x: "-50%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55, type: "spring", stiffness: 200, damping: 16 }}
          className="absolute left-1/2 top-[89px] w-[20.5%]"
        >
          <motion.span
            className="absolute -inset-3 rounded-full border-2 border-[#131318]/20"
            animate={{ scale: [1, 1.3], opacity: [0.55, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="relative flex h-[62px] items-center justify-center gap-2.5 rounded-full bg-[#131318] shadow-[0_28px_60px_-20px_rgba(19,19,24,0.65)]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FluxvexMark size={26} />
            <span className="font-display text-[17px] font-semibold tracking-tight text-white">Fluxvex</span>
          </motion.div>
        </motion.div>
      </div>
      {/* mobile — stacked flow */}
      <div className="flex flex-col items-center gap-3 lg:hidden" aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-3">
          {SOURCES.left.map((s) => (
            <SourcePill key={s.name} name={s.name} dot={s.dot} className="w-auto" />
          ))}
        </div>
        <ArrowDown className="h-4 w-4 text-[#9B9BAA]" />
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-[52px] items-center gap-2.5 rounded-full bg-[#131318] pl-4 pr-6 shadow-[0_28px_60px_-20px_rgba(19,19,24,0.65)]"
        >
          <FluxvexMark size={24} />
          <span className="font-display text-[16px] font-semibold tracking-tight text-white">Fluxvex</span>
        </motion.div>
        <ArrowDown className="h-4 w-4 text-[#9B9BAA]" />
        <div className="flex flex-wrap justify-center gap-3">
          {SOURCES.right.map((s) => (
            <SourcePill key={s.name} name={s.name} dot={s.dot} className="w-auto" />
          ))}
        </div>
      </div>
    </>
  );
}

/* Tinted card shell — checker texture, inline status chip, hover lift */
function TintedCard({ wash, icon: Icon, title, desc, chip, children, testid }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-6 ring-1 ring-white/90 shadow-[0_30px_60px_-34px_rgba(23,23,28,0.45)] ${wash}`}
      data-testid={testid}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 shadow-sm">
              <Icon className="h-4 w-4 text-[#17171C]" strokeWidth={2} />
            </span>
            <h3 className="font-display text-[15.5px] font-bold tracking-tight text-[#17171C]">{title}</h3>
          </div>
          {chip && (
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.5, type: "spring", stiffness: 240, damping: 16 }}
              className="relative z-10 flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-[0_14px_28px_-12px_rgba(23,23,28,0.45)]"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E]"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              {chip}
            </motion.span>
          )}
        </div>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#57575F]">{desc}</p>
        {children}
      </div>
    </motion.div>
  );
}

function ScopeCard() {
  const rows = [
    { label: "Read campaign metrics", ok: true },
    { label: "Edit account settings", ok: false },
    { label: "Manage billing", ok: false },
  ];
  return (
    <TintedCard
      wash="bg-[linear-gradient(165deg,#EDE5F8_0%,#F5F0FB_100%)]"
      icon={KeyRound}
      title="Least-privilege access"
      desc="Connections are authorized through OAuth and request only the scopes they need—nothing broader."
      chip="read-only"
      testid="security-tinted-scope"
    >
      <div className="relative mt-auto rounded-xl bg-white p-4 pt-3.5 shadow-[0_20px_44px_-24px_rgba(23,23,28,0.5)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">Connection scopes</p>
        <div className="mt-3 space-y-2.5">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.14, ease: [0.25, 1, 0.5, 1] }}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-[12px] font-semibold text-[#17171C]">{r.label}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide ${
                  r.ok ? "bg-[#EAF6E9] text-[#0E8A3E]" : "bg-black/[0.06] text-black/40"
                }`}
              >
                {r.ok ? "Allowed" : "Blocked"}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </TintedCard>
  );
}

function EncryptionCard() {
  const bars = [
    { label: "In transit · TLS 1.3", tone: "from-[#7EA6F7] to-[#A9C4FB]", shimmer: false },
    { label: "At rest · AES-256", tone: "from-[#5FD39A] to-[#8FE7BC]", shimmer: true },
    { label: "Token vault sealing", tone: "from-[#F0B37E] to-[#F7D0A6]", shimmer: false },
  ];
  return (
    <TintedCard
      wash="bg-[linear-gradient(165deg,#E6EFFA_0%,#F0F6FD_100%)]"
      icon={Lock}
      title="Encrypted in transit & at rest"
      desc="TLS on every hop, AES-256 at rest. Tokens live sealed in a vault and never surface in reports."
      chip="encrypted"
      testid="security-tinted-encryption"
    >
      <div className="relative mt-auto rounded-xl bg-white p-4 shadow-[0_20px_44px_-24px_rgba(23,23,28,0.5)]">
        <p className="text-right font-display text-[34px] font-bold leading-none tracking-tight text-[#17171C]">
          256<span className="text-[13px] font-semibold text-black/35">-bit</span>
        </p>
        <div className="mt-3 space-y-3">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#17171C]">
                <span>{b.label}</span>
                <ShieldCheck className="h-3.5 w-3.5 text-[#0E8A3E]" strokeWidth={2.2} />
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                <motion.div
                  className={`relative h-full rounded-full bg-gradient-to-r ${b.tone}`}
                  style={{ transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                >
                  {b.shimmer && (
                    <motion.span
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      animate={{ x: ["-120%", "320%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TintedCard>
  );
}

function ControlCard() {
  return (
    <TintedCard
      wash="bg-[linear-gradient(165deg,#FAECDA_0%,#FDF7EE_100%)]"
      icon={Users}
      title="You stay in control"
      desc="Agency and client data stay isolated, retention windows are defined, and disconnect ends the tokens."
      chip="revocable"
      testid="security-tinted-control"
    >
      <div className="relative mt-auto rounded-xl bg-white p-4 shadow-[0_20px_44px_-24px_rgba(23,23,28,0.5)]">
        <p className="text-[12.5px] font-bold text-[#17171C]">Hello, Bright Loop Media!</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {[
            { k: "Retention", v: "90", u: "days" },
            { k: "Disconnect", v: "1", u: "click" },
          ].map((s) => (
            <div key={s.k} className="rounded-lg bg-[#FAF7F2] px-3 py-2.5">
              <p className="text-[9.5px] font-semibold uppercase tracking-wide text-black/40">{s.k}</p>
              <p className="mt-0.5 font-display text-[19px] font-bold leading-none text-[#17171C]">
                {s.v}
                <span className="ml-1 text-[10px] font-semibold text-black/40">{s.u}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-black/[0.06] pt-2.5">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-black/40">Latest activity</p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <p className="truncate text-[11.5px] font-semibold text-[#17171C]">Report exported · read-only scope</p>
            <span className="shrink-0 rounded-full bg-black/[0.06] px-2 py-0.5 text-[9px] font-bold text-black/45">Today</span>
          </div>
        </div>
      </div>
    </TintedCard>
  );
}

export default function SecuritySection() {
  return (
    <SectionShell id="security">
      {/* reference-faithful lavender stage */}
      <Reveal>
        <div
          className="overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,#ECEBF3_0%,#F3F2F8_55%,#EEEDF4_100%)] px-5 pb-12 pt-12 shadow-[0_70px_130px_-70px_rgba(23,23,28,0.4)] sm:px-10 lg:px-14 lg:pb-14 lg:pt-16"
          data-testid="security-stage"
        >
          <span
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),transparent_75%)]"
            aria-hidden="true"
          />
          <Reveal className="relative flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#4B4B55] shadow-[0_10px_24px_-14px_rgba(23,23,28,0.4)]">
              <Sparkles className="h-3 w-3 text-[#17171C]" strokeWidth={2.2} aria-hidden="true" />
              Security &amp; privacy
            </span>
          </Reveal>
          <CinematicText
            as="h2"
            className="relative mx-auto mt-6 max-w-2xl text-center font-display text-[30px] font-bold leading-[1.07] tracking-tight text-[#17171C] sm:text-[40px]"
          >
            Privacy-minded by design. Transparent about our controls.
          </CinematicText>
          <Reveal y={16} delay={0.1}>
            <p className="relative mx-auto mt-5 max-w-xl text-center text-[13.5px] leading-[1.7] text-[#6E6E7A]">
              Fluxvex is pre-launch. Here is exactly what we are building toward with connected account data—stated
              plainly, without unearned badges.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mt-7 flex justify-center">
              <ComplianceBadges />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-12">
            <HubDiagram />
          </Reveal>

          <div className="relative mt-6 grid gap-5 md:grid-cols-3">
            <Reveal delay={0.05} className="h-full">
              <ScopeCard />
            </Reveal>
            <Reveal delay={0.12} className="h-full">
              <EncryptionCard />
            </Reveal>
            <Reveal delay={0.19} className="h-full">
              <ControlCard />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <TapCTA
                to="/security"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#131318] px-6 text-sm font-semibold text-white shadow-[0_18px_36px_-14px_rgba(19,19,24,0.55)] transition-colors hover:bg-[#26262e]"
                testid="security-approach-link"
              >
                Read our full security approach
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </TapCTA>
              <Link
                to="/privacy-policy"
                className="text-[12.5px] font-semibold text-[#6E6E7A] underline decoration-[#C6C6D2] underline-offset-4 transition-colors hover:text-[#17171C]"
                data-testid="security-policy-link"
              >
                Privacy policy · draft live
              </Link>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </SectionShell>
  );
}

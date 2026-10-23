import { motion } from "framer-motion";
import { ArrowDown, Check, KeyRound, Lock, ShieldCheck, Siren, Sparkles, Users, CalendarClock, Server } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import ComplianceBadges from "@/components/ComplianceBadges";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

const CONTROLS = [
  { icon: KeyRound, wash: "bg-[linear-gradient(150deg,#EEF0FF_0%,#FBFBFF_100%)]", title: "OAuth-based connections", desc: "Least-privilege scopes, requested only where the platform supports them." },
  { icon: Lock, wash: "bg-[linear-gradient(150deg,#EAF6E9_0%,#F7FBF5_100%)]", title: "Encryption in transit and at rest", desc: "Planned against the actual infrastructure before launch." },
  { icon: Users, wash: "bg-[linear-gradient(150deg,#F3F1FF_0%,#FBFAFF_100%)]", title: "Role-based access and data isolation", desc: "Client/agency separation enforced by the product’s access-control design." },
  { icon: Server, wash: "bg-[linear-gradient(150deg,#FDF8EC_0%,#FDFDF8_100%)]", title: "Secret storage and token revocation", desc: "Connection tokens stored securely and revocable on disconnect." },
  { icon: CalendarClock, wash: "bg-[linear-gradient(150deg,#EAF6E9_0%,#FDFDF8_100%)]", title: "Retention and deletion rules", desc: "Defined retention windows and a deletion request route." },
  { icon: Siren, wash: "bg-[linear-gradient(150deg,#EEF0FF_0%,#FDFDFA_100%)]", title: "Incident response", desc: "Documented procedures, including breach notification steps." },
];

/* ── hub-and-spoke diagram — reference style: source pills wired into the Fluxvex core ── */
function SourcePill({ name, dot, className = "" }) {
  return (
    <div
      className={`flex h-11 w-[220px] items-center gap-2.5 rounded-xl bg-white px-4 shadow-[0_18px_36px_-20px_rgba(23,23,28,0.45)] ${className}`}
    >
      <span className="h-2.5 w-2.5 rounded-[4px]" style={{ backgroundColor: dot }} aria-hidden="true" />
      <span className="text-[13px] font-semibold text-[#17171C]">{name}</span>
    </div>
  );
}

function HubDiagram() {
  return (
    <>
      {/* desktop — precise wire routing on a fixed 880×300 stage */}
      <div className="relative mx-auto hidden h-[300px] w-full max-w-[880px] lg:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 880 300" fill="none" aria-hidden="true">
          <g stroke="#C6C6D2" strokeWidth="1.5">
            <path d="M220 75 H296 Q304 75 304 83 V102 Q304 110 312 110 H348" />
            <path d="M220 165 H296 Q304 165 304 157 V138 Q304 130 312 130 H348" />
            <path d="M660 75 H584 Q576 75 576 83 V102 Q576 110 568 110 H532" />
            <path d="M660 165 H584 Q576 165 576 157 V138 Q576 130 568 130 H532" />
            <path d="M440 157 V290" />
          </g>
          <g fill="#A9A9B8">
            <circle cx="220" cy="75" r="3.5" />
            <circle cx="220" cy="165" r="3.5" />
            <circle cx="660" cy="75" r="3.5" />
            <circle cx="660" cy="165" r="3.5" />
            <path d="M435 288 L445 288 L440 296 Z" />
          </g>
        </svg>
        <SourcePill name="Google Ads" dot="#F4B400" className="absolute left-0 top-[53px]" />
        <SourcePill name="Meta Ads" dot="#0866FF" className="absolute left-0 top-[143px]" />
        <SourcePill name="GA4" dot="#E37400" className="absolute right-0 top-[53px]" />
        <SourcePill name="TikTok Ads" dot="#17171C" className="absolute right-0 top-[143px]" />
        <div className="absolute left-1/2 top-[95px] flex h-[60px] -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#131318] pl-4 pr-6 shadow-[0_28px_60px_-20px_rgba(19,19,24,0.65)]">
          <FluxvexMark size={26} />
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">Fluxvex</span>
        </div>
      </div>
      {/* mobile — stacked flow */}
      <div className="flex flex-col items-center gap-3 lg:hidden" aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-3">
          <SourcePill name="Google Ads" dot="#F4B400" className="w-auto" />
          <SourcePill name="Meta Ads" dot="#0866FF" className="w-auto" />
        </div>
        <ArrowDown className="h-4 w-4 text-[#9B9BAA]" />
        <div className="flex h-[52px] items-center gap-2.5 rounded-full bg-[#131318] pl-4 pr-6 shadow-[0_28px_60px_-20px_rgba(19,19,24,0.65)]">
          <FluxvexMark size={24} />
          <span className="font-display text-[16px] font-semibold tracking-tight text-white">Fluxvex</span>
        </div>
        <ArrowDown className="h-4 w-4 text-[#9B9BAA]" />
        <div className="flex flex-wrap justify-center gap-3">
          <SourcePill name="GA4" dot="#E37400" className="w-auto" />
          <SourcePill name="TikTok Ads" dot="#17171C" className="w-auto" />
        </div>
      </div>
    </>
  );
}

/* ── shared tinted-card shell with soft checker texture, reference anatomy ── */
function TintedCard({ wash, icon: Icon, title, desc, chip, children, testid }) {
  return (
    <div className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-6 ${wash}`} data-testid={testid}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent_1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 shadow-sm">
              <Icon className="h-4 w-4 text-[#17171C]" strokeWidth={2} />
            </span>
            <h3 className="font-display text-[15.5px] font-bold tracking-tight text-[#17171C]">{title}</h3>
          </div>
          {chip ? (
            <motion.span
              initial={{ opacity: 0, y: -8, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 240, damping: 16 }}
              className="relative z-10 flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-[0_14px_28px_-12px_rgba(23,23,28,0.45)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E]" aria-hidden="true" />
              {chip}
            </motion.span>
          ) : null}
        </div>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#57575F]">{desc}</p>
        {children}
      </div>
    </div>
  );
}

/* Card 1 — least-privilege access with scope list + floating read-only chip */
function ScopeCard() {
  const rows = [
    { label: "Read campaign metrics", ok: true },
    { label: "Edit account settings", ok: false },
    { label: "Manage billing", ok: false },
  ];
  return (
    <TintedCard
      wash="bg-[linear-gradient(165deg,#F1ECF9_0%,#F7F4FC_100%)]"
      icon={KeyRound}
      title="Least-privilege access"
      desc="Connections are authorized through OAuth and request only the scopes they need—nothing broader."
      chip="read-only"
      testid="security-tinted-scope"
    >
      <div className="relative mt-5 rounded-xl bg-white p-4 shadow-[0_20px_44px_-24px_rgba(23,23,28,0.5)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">Connection scopes</p>
        <div className="mt-3 space-y-2.5">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: [0.25, 1, 0.5, 1] }}
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

/* Card 2 — encryption posture with big figure + status bars */
function EncryptionCard() {
  const bars = [
    { label: "In transit · TLS 1.3", w: "100%", tone: "from-[#7EA6F7] to-[#A9C4FB]" },
    { label: "At rest · AES-256", w: "100%", tone: "from-[#5FD39A] to-[#8FE7BC]" },
    { label: "Token vault sealing", w: "86%", tone: "from-[#F0B37E] to-[#F7D0A6]" },
  ];
  return (
    <TintedCard
      wash="bg-[linear-gradient(165deg,#EAF1FA_0%,#F4F8FD_100%)]"
      icon={Lock}
      title="Encrypted in transit & at rest"
      desc="TLS on every hop, AES-256 at rest. Tokens live sealed in a vault and never surface in reports."
      chip="encrypted"
      testid="security-tinted-encryption"
    >
      <div className="relative mt-5 rounded-xl bg-white p-4 shadow-[0_20px_44px_-24px_rgba(23,23,28,0.5)]">
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
              <div className="mt-1.5 h-2 rounded-full bg-black/[0.06]">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${b.tone}`}
                  style={{ transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TintedCard>
  );
}

/* Card 3 — client-facing control panel with retention stats + activity row */
function ControlCard() {
  return (
    <TintedCard
      wash="bg-[linear-gradient(165deg,#FAF0E4_0%,#FDF8F0_100%)]"
      icon={Users}
      title="You stay in control"
      desc="Agency and client data stay isolated, retention windows are defined, and disconnect ends the tokens."
      chip="revocable"
      testid="security-tinted-control"
    >
      <div className="relative mt-5 rounded-xl bg-white p-4 shadow-[0_20px_44px_-24px_rgba(23,23,28,0.5)]">
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

export default function Security() {
  return (
    <>
      <Seo
        title="Security & Privacy — Our Approach | Fluxvex"
        description="What account data Fluxvex plans to access, how access is protected, and the current status of our security and privacy controls—stated plainly, without unearned badges."
        path="/security"
      />
      <Navbar />
      <main className="pt-[76px]">
        <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-10 sm:px-6 lg:pt-14">
          {/* ── reference container — lavender-grey stage with everything centered ── */}
          <div className="overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,#ECEBF3_0%,#F3F2F8_55%,#EEEDF4_100%)] px-5 pb-12 pt-12 shadow-[0_70px_130px_-70px_rgba(23,23,28,0.4)] sm:px-10 lg:px-14 lg:pb-16 lg:pt-16">
            <Reveal className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#4B4B55] shadow-[0_10px_24px_-14px_rgba(23,23,28,0.4)]">
                <Sparkles className="h-3 w-3 text-[#17171C]" strokeWidth={2.2} aria-hidden="true" />
                Security &amp; privacy
              </span>
            </Reveal>
            <CinematicText
              as="h1"
              className="mx-auto mt-6 max-w-2xl text-center font-display text-[32px] font-bold leading-[1.07] tracking-tight text-[#17171C] sm:text-[42px]"
            >
              Privacy-minded by design. Transparent about our controls.
            </CinematicText>
            <Reveal y={16} delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-center text-[13.5px] leading-[1.7] text-[#6E6E7A]">
                Fluxvex is pre-launch. This page states what the product is being built to do with connected account
                data and which controls are planned or in progress—stated plainly, without unearned badges.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex justify-center">
                <ComplianceBadges />
              </div>
            </Reveal>

            {/* hub-and-spoke — sources wired into the Fluxvex core */}
            <Reveal delay={0.1} className="mt-12">
              <HubDiagram />
            </Reveal>

            {/* three tinted feature cards with embedded mini-UIs */}
            <div className="mt-10 grid gap-5 md:grid-cols-3">
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
          </div>

          {/* what we access — plain-language copy under the stage */}
          <Reveal>
            <div className="mx-auto mt-14 max-w-3xl text-center" data-testid="security-page-access">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">What we access, and why</h2>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-ink-soft">
                To build reports, Fluxvex requests access to advertising and analytics data for the accounts you
                connect—campaign settings, performance metrics, and reporting metadata—through OAuth with
                least-privilege scopes wherever the platform supports them.
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.75] text-ink-soft">
                Access is used to generate the reports you configure and for nothing else. You authorize the
                connection, and you can disconnect it at any time.
              </p>
            </div>
          </Reveal>

          {/* control set — soft tinted bento cards */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink">Control set in progress</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROLS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="h-full">
                <div
                  className={`group flex h-full flex-col gap-3.5 rounded-2xl border border-line p-6 transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_32px_64px_-32px_rgba(61,67,232,0.4)] ${c.wash}`}
                  data-testid={`security-page-control-${i + 1}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-accent shadow-[0_10px_22px_-12px_rgba(16,16,20,0.35)] transition-transform duration-300 group-hover:scale-110">
                      <c.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="rounded-full border border-dashed border-black/20 bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/50">
                      Planned
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold leading-snug text-ink">{c.title}</p>
                  <p className="text-[13px] leading-relaxed text-ink-soft">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the data promise — deep green anchor card, like the reference */}
          <Reveal>
            <div
              className="relative mt-6 overflow-hidden rounded-2xl bg-[radial-gradient(120%_160%_at_85%_0%,#1E7A3C_0%,#0C2E1B_70%)] p-8 sm:p-10"
              data-testid="security-page-promise"
            >
              <span
                className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(67,214,117,0.35),transparent_70%)] blur-2xl"
                aria-hidden="true"
              />
              <div className="fine-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
              <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-lg">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mint">The data promise</p>
                  <h2 className="mt-2.5 font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-[28px]">
                    Access is used to generate the reports you configure—
                    <span className="text-mint">and for nothing else.</span>
                  </h2>
                </div>
                <div className="flex flex-col gap-3" aria-hidden="true">
                  {["Campaign settings, metrics, reporting metadata", "No selling of data, ever", "Disconnect ends the tokens"].map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.14, ease: [0.25, 1, 0.5, 1] }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-[12.5px] font-medium text-white/90"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-mint" strokeWidth={3} />
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* regulation language — clean text block, wording unchanged */}
          <Reveal>
            <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight text-ink">Regulation and assurance language</h2>
            <div className="mt-6 space-y-5 rounded-2xl border border-line bg-surface/70 p-7 sm:p-9 text-[15px] leading-[1.75] text-ink-soft">
              <p>
                <span className="font-semibold text-ink">GDPR:</span> we describe the privacy processes and
                contractual terms that support applicable obligations—roles, purposes, rights requests, retention,
                and processor arrangements—so our GDPR alignment is built into workflows, not just claimed.
              </p>
              <p>
                <span className="font-semibold text-ink">HIPAA:</span> Fluxvex handles marketing performance data,
                not protected health information. Where agencies operate in regulated spaces, we apply
                HIPAA-aligned safeguards—access control, encryption, and subprocessor agreements where required.
              </p>
              <p>
                <span className="font-semibold text-ink">CCPA/CPRA:</span> we explain applicable consumer rights
                and request channels, and provide opt-out controls where relevant to our processing and legal
                obligations.
              </p>
              <p>
                <span className="font-semibold text-ink">India DPDP:</span> we map the product’s notice, consent
                and lawful-processing basis, rights handling, retention, processor contracts, and grievance process
                to the current Act and Rules as they commence.
              </p>
              <p>
                <span className="font-semibold text-ink">ISO/IEC 27001 and SOC 2:</span> we say “controls mapped
                to” or “working toward alignment with” only while that work is real, and “certified” or “audited”
                only after it is complete and documented. Today, it has not been.
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal>
            <div className="mt-12 rounded-2xl border border-accent-border bg-accent-tint p-8 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">A question about your data?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                Privacy questions, deletion requests, and disconnect help all start with a message.
              </p>
              <TapCTA
                to="/contact"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                testid="security-page-contact-link"
              >
                Contact the team
              </TapCTA>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

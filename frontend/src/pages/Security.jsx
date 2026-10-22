import { motion } from "framer-motion";
import { CalendarClock, Check, KeyRound, Lock, Server, ShieldCheck, Siren, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import ComplianceBadges from "@/components/ComplianceBadges";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";
import TapCTA from "@/components/ui/TapCTA";

const CONTROLS = [
  { icon: KeyRound, wash: "bg-[linear-gradient(150deg,#EEF0FF_0%,#FBFBFF_100%)]", title: "OAuth-based connections", desc: "Least-privilege scopes, requested only where the platform supports them." },
  { icon: Lock, wash: "bg-[linear-gradient(150deg,#EAF6E9_0%,#F7FBF5_100%)]", title: "Encryption in transit and at rest", desc: "Planned against the actual infrastructure before launch." },
  { icon: Users, wash: "bg-[linear-gradient(150deg,#F3F1FF_0%,#FBFAFF_100%)]", title: "Role-based access and data isolation", desc: "Client/agency separation enforced by the product’s access-control design." },
  { icon: Server, wash: "bg-[linear-gradient(150deg,#FDF8EC_0%,#FDFDF8_100%)]", title: "Secret storage and token revocation", desc: "Connection tokens stored securely and revocable on disconnect." },
  { icon: CalendarClock, wash: "bg-[linear-gradient(150deg,#EAF6E9_0%,#FDFDF8_100%)]", title: "Retention and deletion rules", desc: "Defined retention windows and a deletion request route." },
  { icon: Siren, wash: "bg-[linear-gradient(150deg,#EEF0FF_0%,#FDFDFA_100%)]", title: "Incident response", desc: "Documented procedures, including breach notification steps." },
];

/* Floating OAuth flow — chips connected by dotted wires, reference-card anatomy */
function AccessFlowVisual() {
  const chips = [
    { icon: KeyRound, label: "OAuth · read-only", note: "You authorize" },
    { icon: Lock, label: "Least-privilege scopes", note: "Where supported" },
    { icon: ShieldCheck, label: "Reports you configure", note: "Nothing else" },
  ];
  return (
    <div
      className="relative flex h-full flex-col justify-center gap-5 overflow-hidden rounded-2xl border border-line bg-[linear-gradient(160deg,#EAF6E9_0%,#F7FBF5_50%,#FDFDFA_100%)] p-7"
      aria-hidden="true"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">How access works</p>
      <div className="flex flex-col gap-3">
        {chips.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.16, ease: [0.25, 1, 0.5, 1] }}
            className={`flex items-center gap-3.5 rounded-xl border border-black/[0.06] bg-white p-3.5 shadow-[0_18px_36px_-20px_rgba(16,16,20,0.3)] ${i === 1 ? "ml-6" : i === 2 ? "ml-12" : ""}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent">
              <c.icon className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold leading-snug text-ink">{c.label}</p>
              <p className="text-[11px] text-ink-soft">{c.note}</p>
            </div>
            {i === 2 && <Check className="h-4 w-4 shrink-0 text-[#0E8A3E]" strokeWidth={2.6} />}
          </motion.div>
        ))}
      </div>
      <p className="text-[11.5px] leading-relaxed text-black/45">
        Disconnect at any time—the connection and its tokens end with it.
      </p>
    </div>
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
        {/* centered hero — reference style */}
        <div className="mx-auto max-w-[1100px] px-5 pb-4 pt-16 text-center lg:pt-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0E8A3E]/25 bg-[#EAF6E9] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E8A3E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A3E] animate-pulse-dot" aria-hidden="true" />
              Security &amp; privacy
            </span>
          </Reveal>
          <CinematicText
            as="h1"
            className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-tightest text-ink sm:text-5xl"
          >
            Privacy-minded by design. Transparent about our controls.
          </CinematicText>
          <Reveal y={16} delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.75] text-ink-soft">
              Fluxvex is pre-launch. This page states what the product is being built to do with connected account
              data and which controls are planned or in progress. We do not claim independent certification or audit
              status unless it has been completed and documented.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <ComplianceBadges />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[1100px] px-5 pb-24">
          {/* what we access — text + floating flow visual */}
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-line bg-[linear-gradient(150deg,#EEF0FF_0%,#FBFBFF_55%,#FDFDFA_100%)] p-7 sm:p-9" data-testid="security-page-access">
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
            <Reveal delay={0.1} className="h-full">
              <AccessFlowVisual />
            </Reveal>
          </div>

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

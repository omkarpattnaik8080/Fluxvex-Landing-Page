import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { PadlockIllustration } from "@/components/hairline/Illustrations";
import { ArrowRight, KeyRound, Lock, Users, Vault, Trash2, Siren, ListChecks, FileText, ShieldCheck } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";
import ComplianceBadges from "@/components/ComplianceBadges";

const CONTROLS = [
  { icon: KeyRound, text: "OAuth-based connections and least-privilege scopes, where supported" },
  { icon: Lock, text: "Encryption in transit and at rest" },
  { icon: Users, text: "Role-based access controls and client/agency data isolation" },
  { icon: Vault, text: "Secure secret storage and token revocation handling" },
  { icon: Trash2, text: "Retention and deletion rules" },
  { icon: Siren, text: "Incident response and breach notification procedures" },
  { icon: ListChecks, text: "A list of subprocessors and relevant data locations" },
  { icon: FileText, text: "A published privacy policy and contact route", chip: "Draft live", to: "/privacy-policy" },
];

/* Vault illustration — shield core with connected sources on orbit */
function OrbitShield() {
  const reduce = useReducedMotion();
  const orbit = [<GoogleAdsMark size={13} key="g" />, <MetaMark size={13} key="m" />, <GA4Mark size={13} key="a" />];
  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center" aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-dashed border-accent/40 motion-safe:animate-[spin_18s_linear_infinite]" />
      <span className="absolute inset-3 rounded-full border border-dashed border-accent/25 motion-safe:animate-[spin_24s_linear_infinite_reverse]" />
      {orbit.map((mark, i) => {
        const angle = ((i / 3) * 360 - 90) * (Math.PI / 180);
        const x = 56 + 52 * Math.cos(angle) - 12;
        const y = 56 + 52 * Math.sin(angle) - 12;
        return (
          <motion.span
            key={i}
            className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_-6px_rgba(16,16,20,0.3)] ring-1 ring-black/[0.06]"
            style={{ left: x, top: y }}
            animate={reduce ? {} : { y: [0, -3, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {mark}
          </motion.span>
        );
      })}
      <motion.span
        className="absolute h-12 w-12 rounded-full bg-accent/15"
        animate={reduce ? {} : { scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative h-16 w-16">
        <PadlockIllustration />
      </div>
    </div>
  );
}

export default function SecuritySection() {
  return (
    <SectionShell id="security">
      <SectionHeader
        overline="Security & privacy"
        title="Client reporting data deserves a clear, responsible approach."
        copy="Fluxvex will explain what account data it accesses, why it needs it, how access is protected, how long data is retained, and how customers can request help with privacy questions."
      />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="text-sm leading-relaxed text-ink-soft">
              Fluxvex is pre-launch. Below is the control set we are building toward—each will carry its real
              status as it ships. Nothing on this page claims an audit or certification that has not happened.
            </p>
            <ComplianceBadges className="mt-6" delay={0.1} />
            <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {CONTROLS.map((c, i) => (
                <div
                  key={c.text}
                  className="bg-page p-5 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-accent-tint/40 hover:shadow-[0_20px_40px_-22px_rgba(61,67,232,0.4)]"
                  data-testid={`security-control-${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <c.icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        c.chip ? "border-mint/40 bg-mint/10 text-[#0E8A3E]" : "border-line bg-surface text-black/50"
                      }`}
                    >
                      {c.chip || "Planned"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {c.to ? (
                      <Link to={c.to} className="underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent" data-testid="security-policy-link">
                        {c.text}
                      </Link>
                    ) : (
                      c.text
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-accent-border bg-accent-tint p-7 shadow-[0_36px_80px_-40px_rgba(61,67,232,0.45)] sm:p-8">
            <div>
              <OrbitShield />
              <p className="mt-5 font-display text-xl font-medium leading-relaxed tracking-tight text-ink">
                “We are building Fluxvex with privacy and security as product requirements. We do not claim
                independent certification or audit status unless it has been completed and documented.”
              </p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-ink-soft">
                Our controls are designed around GDPR, HIPAA, India’s DPDP, and CCPA/CPRA requirements—see how
                on our security page.
              </p>
              <Link
                to="/security"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-page px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent"
                data-testid="security-approach-link"
              >
                Read our security approach
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

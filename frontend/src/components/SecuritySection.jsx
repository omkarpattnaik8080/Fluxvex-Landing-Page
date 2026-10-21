import { Link } from "react-router-dom";
import { ArrowRight, KeyRound, Lock, Users, Vault, Trash2, Siren, ListChecks, FileText } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/SectionShell";
import { Reveal } from "@/components/Reveal";

const CONTROLS = [
  { icon: KeyRound, text: "OAuth-based connections and least-privilege scopes, where supported" },
  { icon: Lock, text: "Encryption in transit and at rest" },
  { icon: Users, text: "Role-based access controls and client/agency data isolation" },
  { icon: Vault, text: "Secure secret storage and token revocation handling" },
  { icon: Trash2, text: "Retention and deletion rules" },
  { icon: Siren, text: "Incident response and breach notification procedures" },
  { icon: ListChecks, text: "A list of subprocessors and relevant data locations" },
  { icon: FileText, text: "A published privacy policy and contact route" },
];

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
            <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {CONTROLS.map((c, i) => (
                <div key={c.text} className="bg-page p-5" data-testid={`security-control-${i + 1}`}>
                  <div className="flex items-start justify-between gap-3">
                    <c.icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
                    <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/50">
                      Planned
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-accent-border bg-accent-tint p-7 sm:p-8">
            <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-ink">
              “We are building Fluxvex with privacy and security as product requirements. We do not claim
              independent certification or audit status unless it has been completed and documented.”
            </p>
            <div>
              <p className="text-sm leading-relaxed text-ink-soft">
                Regulation-specific posture—GDPR, CCPA/CPRA, and India’s DPDP—is described on our security page
                as processes, not badges.
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

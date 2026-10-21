import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import ComplianceBadges from "@/components/ComplianceBadges";
import CinematicText from "@/components/ui/CinematicText";
import { Reveal } from "@/components/Reveal";

const CONTROLS = [
  ["OAuth-based connections", "Least-privilege scopes, requested only where the platform supports them."],
  ["Encryption in transit and at rest", "Planned against the actual infrastructure before launch."],
  ["Role-based access and data isolation", "Client/agency separation enforced by the product’s access-control design."],
  ["Secret storage and token revocation", "Connection tokens stored securely and revocable on disconnect."],
  ["Retention and deletion rules", "Defined retention windows and a deletion request route."],
  ["Incident response", "Documented procedures, including breach notification steps."],
];

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
        <div className="mx-auto max-w-[860px] px-5 py-16 lg:px-8 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Security & privacy</p>
          <CinematicText
            as="h1"
            className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-5xl"
          >
            Privacy-minded by design. Transparent about our controls.
          </CinematicText>
          <Reveal y={16} delay={0.1}>
            <p className="mt-6 text-[15px] leading-[1.75] text-ink-soft">
              Fluxvex is pre-launch. This page states what the product is being built to do with connected account
              data and which controls are planned or in progress. We do not claim independent certification or audit
              status unless it has been completed and documented.
            </p>
          </Reveal>

          <ComplianceBadges className="mt-8" delay={0.15} />

          <Reveal>
            <h2 className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink">What we access, and why</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-ink-soft">
              To build reports, Fluxvex requests access to advertising and analytics data for the accounts you
              connect—campaign settings, performance metrics, and reporting metadata—through OAuth with
              least-privilege scopes wherever the platform supports them. Access is used to generate the reports you
              configure and for nothing else. You authorize the connection, and you can disconnect it at any time.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink">Control set in progress</h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {CONTROLS.map(([title, desc], i) => (
                <div key={title} className="bg-page p-5" data-testid={`security-page-control-${i + 1}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/50">
                      Planned
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink">Regulation and assurance language</h2>
            <div className="mt-6 space-y-5 text-[15px] leading-[1.75] text-ink-soft">
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

          <Reveal>
            <div className="mt-14 rounded-2xl border border-accent-border bg-accent-tint p-8 text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">A question about your data?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                Privacy questions, deletion requests, and disconnect help all start with a message.
              </p>
              <Link to="/contact" className="mt-6 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-strong" data-testid="security-page-contact-link">
                Contact the team
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

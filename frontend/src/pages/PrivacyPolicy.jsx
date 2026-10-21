import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";
import LegalDoc from "@/components/legal/LegalDoc";
import { PRIVACY_MD } from "@/legal/privacyDoc";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy — Fluxvex"
        description="How Fluxvex collects, uses, discloses, retains, and protects personal information across the website, waitlist, contact channels, and the reporting service."
        path="/privacy-policy"
        noindex
      />
      <Navbar />
      <main className="pt-[76px]">
        <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
          <div className="rounded-xl border border-dashed border-accent/40 bg-accent-tint/60 px-5 py-4" data-testid="legal-draft-notice">
            <p className="text-sm font-semibold text-ink">Draft pending final legal review.</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
              Highlighted fields are completed before final publication, following our legal publication checklist.
            </p>
          </div>
          <article className="mt-10" data-testid="legal-doc-privacy">
            <LegalDoc markdown={PRIVACY_MD} />
          </article>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

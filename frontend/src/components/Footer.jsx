import { Link } from "react-router-dom";
import { FluxvexLogo, FluxvexMark } from "@/components/brand/FluxvexLogo";
import { useWaitlist } from "@/components/WaitlistContext";

const PRODUCT_LINKS = [
  ["Features", "/#features"],
  ["Workflow", "/#workflow"],
  ["Integrations", "/#integrations"],
  ["Security", "/security"],
];

const PAGE_LINKS = [
  ["Home", "/"],
  ["Pricing", "/pricing"],
  ["FAQ", "/#faq"],
  ["Contact", "/contact"],
];

export default function Footer() {
  const { openWaitlist } = useWaitlist();

  const openCookiePrefs = () => window.dispatchEvent(new CustomEvent("open-cookie-preferences"));

  return (
    <footer className="border-t border-accent/50 bg-surface" data-testid="site-footer">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid divide-line lg:grid-cols-4 lg:divide-y-0">
          {/* brand */}
          <div className="py-12 lg:pr-10">
            <FluxvexLogo tone="white" size={24} />
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-white/50">
              Automated client reporting for marketing agencies.
            </p>
            <button
              onClick={() => openWaitlist("footer")}
              className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/85"
              data-testid="footer-join-waitlist-button"
            >
              Join waitlist
            </button>
          </div>

          {/* product */}
          <div className="border-t border-hairline py-12 lg:border-t-0 lg:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Product</p>
            <ul className="mt-5 space-y-3">
              {PRODUCT_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-white/65 transition-colors hover:text-white" data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* all pages */}
          <div className="border-t border-hairline py-12 lg:border-t-0 lg:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">All pages</p>
            <ul className="mt-5 space-y-3">
              {PAGE_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-white/65 transition-colors hover:text-white" data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* follow */}
          <div className="border-t border-hairline py-12 lg:border-t-0 lg:pl-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Follow Fluxvex</p>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              We’re pre-launch—launch updates go through the waitlist. Social channels will be listed here once they exist.
            </p>
          </div>
        </div>

        {/* utility row */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">© 2026 Fluxvex. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={openCookiePrefs} className="text-xs text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline" data-testid="footer-cookie-preferences-button">
              Cookie preferences
            </button>
            <span className="text-xs text-white/30">Privacy Policy & Terms — published at launch</span>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="relative overflow-hidden border-t border-hairline" aria-hidden="true">
        <div className="pixel-blocks absolute inset-0 opacity-60" />
        <p className="footer-wordmark mx-auto -mb-[0.22em] mt-6 select-none text-center text-[16.5vw]">
          FLUXVEX
        </p>
      </div>
    </footer>
  );
}

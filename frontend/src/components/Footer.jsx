import { Link } from "react-router-dom";
import { Github, Linkedin, MapPin, Youtube } from "lucide-react";
import { FluxvexLogo, FluxvexMark } from "@/components/brand/FluxvexLogo";
import { useWaitlist } from "@/components/WaitlistContext";
import TapCTA from "@/components/ui/TapCTA";

const PRODUCT_LINKS = [
  ["Features", "/#features"],
  ["Workflow", "/#workflow"],
  ["Integrations", "/#integrations"],
  ["Security", "/security"],
];

const PAGE_LINKS = [
  ["Home", "/"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Careers", "/careers"],
  ["Partner program", "/partners"],
  ["FAQ", "/#faq"],
  ["Contact", "/contact"],
];

export default function Footer() {
  const { openWaitlist } = useWaitlist();

  const openCookiePrefs = () => window.dispatchEvent(new CustomEvent("open-cookie-preferences"));

  return (
    <footer className="border-t border-accent/60 bg-footerdark" data-testid="site-footer">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid lg:grid-cols-4">
          {/* brand */}
          <div className="py-12 lg:pr-10">
            <FluxvexLogo tone="white" size={24} />
            <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-white/50">
              Automated client reporting for marketing agencies.
            </p>
            <TapCTA
              onClick={() => openWaitlist("footer")}
              className="mt-6 rounded-full bg-white px-5 py-2 font-display text-sm font-semibold text-ink transition-colors hover:bg-white/85"
              testid="footer-join-waitlist-button"
            >
              Join waitlist
            </TapCTA>
          </div>

          {/* product */}
          <div className="border-t border-white/[0.08] py-12 lg:border-l lg:border-t-0 lg:px-10">
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
          <div className="border-t border-white/[0.08] py-12 lg:border-l lg:border-t-0 lg:px-10">
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
          <div className="border-t border-white/[0.08] py-12 lg:border-l lg:border-t-0 lg:pl-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Follow Fluxvex</p>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Follow along for build updates and launch news.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/fluxvex/", label: "Fluxvex on LinkedIn", testid: "footer-social-linkedin" },
                { icon: Github, href: "https://github.com/fluxvex", label: "Fluxvex on GitHub", testid: "footer-social-github" },
                { icon: Youtube, href: "https://www.youtube.com/@FluxvexHQ", label: "Fluxvex on YouTube", testid: "footer-social-youtube" },
              ].map((s) => (
                <a
                  key={s.testid}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
                  data-testid={s.testid}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Office</p>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-white/65" data-testid="footer-office-address">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                <span>
                  House No. 288, Arunodaya,
                  <br />
                  HSR Layout Sector-1, Bengaluru
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* utility row */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">© 2026 Fluxvex. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button onClick={openCookiePrefs} className="text-xs text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline" data-testid="footer-cookie-preferences-button">
              Cookie preferences
            </button>
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/30">
              <Link to="/privacy-policy" className="transition-colors hover:text-white/70" data-testid="footer-privacy-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white/70" data-testid="footer-terms-link">
                Terms of Service
              </Link>
              <span>— draft pending final legal review</span>
            </span>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="relative overflow-hidden border-t border-white/[0.08]" aria-hidden="true">
        <div className="pixel-blocks absolute inset-0 opacity-40" />
        <p className="footer-wordmark mx-auto -mb-[0.22em] mt-6 select-none text-center text-[16.5vw]">
          FLUXVEX
        </p>
      </div>
    </footer>
  );
}

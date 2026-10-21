import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { FluxvexLogo } from "@/components/brand/FluxvexLogo";
import { useWaitlist } from "@/components/WaitlistContext";

const SECTIONS = [
  { icon: "workflow", title: "Reporting Workflow", desc: "From connected data to client-ready reports", href: "/#workflow" },
  { icon: "features", title: "Features", desc: "Reporting, branding, and delivery", href: "/#features" },
  { icon: "integrations", title: "Integrations", desc: "Google Ads, Meta Ads, and GA4", href: "/#integrations" },
  { icon: "why", title: "Why Fluxvex", desc: "A workflow, not just a prompt", href: "/#why" },
  { icon: "security", title: "Security & Privacy", desc: "Data handling and safeguards", href: "/security" },
  { icon: "pricing", title: "Pricing", desc: "Two plans, prices coming soon", href: "/pricing" },
];

const ALL_PAGES = [
  { title: "Home", desc: "The full product story", href: "/" },
  { title: "Product", desc: "Inside the report experience", href: "/#product" },
  { title: "Workflow", desc: "How the reporting flow runs", href: "/#workflow" },
  { title: "Integrations", desc: "Initial channel focus", href: "/#integrations" },
  { title: "Security", desc: "Data handling and safeguards", href: "/security" },
  { title: "Pricing", desc: "Two plans, coming soon", href: "/pricing" },
  { title: "FAQ", desc: "Straight answers", href: "/#faq" },
  { title: "Contact", desc: "Talk to the team", href: "/contact" },
];

function SectionIcon({ name, className = "h-4 w-4" }) {
  const common = { className, strokeWidth: 1.8 };
  switch (name) {
    case "workflow":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path d="M4 7h6M4 17h10M18 7h2M4 7l4 10" stroke="currentColor" strokeLinecap="round" />
          <circle cx="18" cy="7" r="2.5" stroke="currentColor" />
        </svg>
      );
    case "features":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" />
          <rect x="13" y="13" width="7" height="7" rx="3.5" stroke="currentColor" />
        </svg>
      );
    case "integrations":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path d="M9 3v4a2 2 0 0 1-2 2H3M15 21v-4a2 2 0 0 1 2-2h4M3 9v6a3 3 0 0 0 3 3h2M21 15V9a3 3 0 0 0-3-3h-2" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "why":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" stroke="currentColor" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" />
        </svg>
      );
    case "security":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path d="M12 3 5 6v6c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="m9.5 12 2 2 3.5-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" />
          <path d="M4 10h16M8 15h4" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function MegaPanel({ items, columns = 2, onSelect }) {
  return (
    <div
      className={`grid w-[640px] rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] ${
        columns === 2 ? "grid-cols-2" : "grid-cols-2"
      }`}
      data-testid="mega-menu"
    >
      {items.map((item, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const lastRow = Math.floor((items.length - 1) / columns) === row;
        return (
          <Link
            key={item.title}
            to={item.href}
            onClick={onSelect}
            className={`group flex items-center gap-3.5 px-4 py-4 transition-colors hover:bg-paper ${
              col === 0 && columns > 1 ? "border-r border-black/[0.06]" : ""
            } ${!lastRow ? "border-b border-black/[0.06]" : ""}`}
            data-testid={`mega-item-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-paper text-black/70">
              <SectionIcon name={item.icon} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold leading-tight text-black">
                {item.title}
              </span>
              <span className="mt-0.5 block truncate text-[13px] leading-tight text-black/50">
                {item.desc}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-black/30 transition-transform group-hover:translate-x-0.5" />
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null); // 'sections' | 'pages' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { openWaitlist } = useWaitlist();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return location.pathname === "/" && !location.hash;
    return location.pathname.startsWith(href);
  };

  const navLink = (label, href, testid) => (
    <Link
      to={href}
      className={`nav-underline text-[15px] font-medium transition-colors ${
        isActive(href) ? "text-accent" : "text-black/70 hover:text-black"
      }`}
      data-active={isActive(href)}
      data-testid={testid}
    >
      {label}
    </Link>
  );

  const dropdownBtn = (label, key, testid) => (
    <button
      onClick={() => setOpenMenu(openMenu === key ? null : key)}
      onMouseEnter={() => setOpenMenu(key)}
      aria-expanded={openMenu === key}
      className={`flex items-center gap-1 text-[15px] font-medium transition-colors ${
        openMenu === key ? "text-black" : "text-black/70 hover:text-black"
      }`}
      data-testid={testid}
    >
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 text-black/40 transition-transform duration-200 ${
          openMenu === key ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 bg-paper transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.10),0_8px_24px_-16px_rgba(0,0,0,0.25)]" : "shadow-[0_1px_0_rgba(0,0,0,0.07)]"
      }`}
      data-testid="site-navbar"
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 lg:px-8">
        <Link to="/" aria-label="Fluxvex home" data-testid="nav-logo-link">
          <FluxvexLogo tone="ink" size={24} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLink("Home", "/", "nav-link-home")}
          {navLink("Pricing", "/pricing", "nav-link-pricing")}
          {navLink("About", "/#why", "nav-link-about")}
          {navLink("Resources", "/#faq", "nav-link-resources")}
          {dropdownBtn("Sections", "sections", "nav-toggle-sections")}
          {dropdownBtn("All Pages", "pages", "nav-toggle-pages")}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            onClick={() => openWaitlist("navbar")}
            className="rounded-full border border-black/15 bg-white/60 px-4.5 px-5 py-2 text-sm font-medium text-black transition-colors hover:border-black/30 hover:bg-white"
            data-testid="nav-join-waitlist-button"
          >
            Join Waitlist
          </button>
          <Link
            to="/contact"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80"
            data-testid="nav-contact-link"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => openWaitlist("navbar-mobile")}
            className="rounded-full border border-black/15 bg-white/60 px-4 py-2 text-sm font-medium text-black"
            data-testid="nav-join-waitlist-mobile-button"
          >
            Join Waitlist
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-black"
            data-testid="nav-mobile-toggle"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop dropdown panels */}
      {openMenu && (
        <div
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 px-4 pt-3 hidden lg:block"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {openMenu === "sections" ? (
            <MegaPanel items={SECTIONS} columns={2} onSelect={() => setOpenMenu(null)} />
          ) : (
            <div className="grid w-[560px] grid-cols-2 rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)]" data-testid="pages-menu">
              {ALL_PAGES.map((item, i) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setOpenMenu(null)}
                  className={`group flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-paper ${
                    i % 2 === 0 ? "border-r border-black/[0.06]" : ""
                  } ${i < ALL_PAGES.length - 2 ? "border-b border-black/[0.06]" : ""}`}
                  data-testid={`pages-item-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <span>
                    <span className="block text-[14px] font-semibold text-black">{item.title}</span>
                    <span className="mt-0.5 block text-[12.5px] text-black/50">{item.desc}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-black/30 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-black/[0.07] bg-paper px-5 pb-6 pt-2 lg:hidden" data-testid="mobile-menu">
          <div className="flex flex-col divide-y divide-black/[0.06]">
            {[
              { label: "Home", href: "/" },
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/#why" },
              { label: "Resources", href: "/#faq" },
            ].map((l) => (
              <Link key={l.label} to={l.href} className="py-3.5 text-[16px] font-medium text-black/80" data-testid={`mobile-link-${l.label.toLowerCase()}`}>
                {l.label}
              </Link>
            ))}
            {["sections", "pages"].map((key) => {
              const items = key === "sections" ? SECTIONS : ALL_PAGES;
              const label = key === "sections" ? "Sections" : "All Pages";
              return (
                <div key={key} className="py-1">
                  <button
                    onClick={() => setMobileGroup(mobileGroup === key ? null : key)}
                    aria-expanded={mobileGroup === key}
                    className="flex w-full items-center justify-between py-2.5 text-[16px] font-medium text-black/80"
                    data-testid={`mobile-toggle-${key}`}
                  >
                    {label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileGroup === key ? "rotate-180" : ""}`} />
                  </button>
                  {mobileGroup === key && (
                    <div className="flex flex-col pb-2">
                      {items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] text-black/70 hover:bg-black/[0.04]"
                        >
                          <span>
                            {item.title}
                            <span className="mt-0.5 block text-xs text-black/45">{item.desc}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-black/30" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              to="/contact"
              className="mt-4 rounded-full bg-black py-3 text-center text-sm font-semibold text-white"
              data-testid="mobile-contact-link"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

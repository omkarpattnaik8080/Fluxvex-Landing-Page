import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { FluxvexLogo } from "@/components/brand/FluxvexLogo";
import { useWaitlist } from "@/components/WaitlistContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/#why" },
  { label: "Resources", href: "/#faq" },
];

const MENU_GROUPS = [
  {
    heading: "Workflow",
    items: [
      { icon: "workflow", title: "Reporting Workflow", desc: "From connected data to client-ready reports", href: "/#workflow" },
      { icon: "features", title: "Features", desc: "Reporting, branding, and delivery", href: "/#features" },
      { icon: "integrations", title: "Integrations", desc: "Google Ads, Meta Ads, GA4 · more soon", href: "/#integrations" },
      { icon: "product", title: "Inside the product", desc: "A sample report, end to end", href: "/#product" },
    ],
  },
  {
    heading: "Trust",
    items: [
      { icon: "why", title: "Why Fluxvex", desc: "A workflow, not just a prompt", href: "/#why" },
      { icon: "security", title: "Security & Privacy", desc: "Data handling and safeguards", href: "/security" },
      { icon: "ops", title: "Agency operations", desc: "Consistency across every account", href: "/#operations" },
    ],
  },
  {
    heading: "Decide",
    items: [
      { icon: "calculator", title: "ROI calculator", desc: "Estimate your reporting hours", href: "/#calculator" },
      { icon: "faq", title: "FAQ", desc: "Straight answers", href: "/#faq" },
      { icon: "pricing", title: "Pricing", desc: "Two plans, prices coming soon", href: "/pricing" },
    ],
  },
];

const ALL_PAGES = [
  { title: "Home", desc: "The full product story", href: "/" },
  { title: "Product", desc: "Inside the report experience", href: "/#product" },
  { title: "Workflow", desc: "How the reporting flow runs", href: "/#workflow" },
  { title: "Features", desc: "What the workflow automates", href: "/#features" },
  { title: "Integrations", desc: "Initial channel focus", href: "/#integrations" },
  { title: "Security", desc: "Data handling and safeguards", href: "/security" },
  { title: "Pricing", desc: "Two plans, coming soon", href: "/pricing" },
  { title: "Contact", desc: "Talk to the team", href: "/contact" },
];

function SectionIcon({ name, className = "h-[18px] w-[18px]" }) {
  const common = { className, strokeWidth: 1.8, fill: "none" };
  switch (name) {
    case "workflow":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 7h6M4 17h10M18 7h2M4 7l4 10" stroke="currentColor" strokeLinecap="round" />
          <circle cx="18" cy="7" r="2.5" stroke="currentColor" />
        </svg>
      );
    case "features":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" />
          <rect x="13" y="13" width="7" height="7" rx="3.5" stroke="currentColor" />
        </svg>
      );
    case "integrations":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M9 3v4a2 2 0 0 1-2 2H3M15 21v-4a2 2 0 0 1 2-2h4M3 9v6a3 3 0 0 0 3 3h2M21 15V9a3 3 0 0 0-3-3h-2" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "product":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" />
          <path d="M3 9h18M7 13h6" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "why":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" stroke="currentColor" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" />
        </svg>
      );
    case "security":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3 5 6v6c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z" stroke="currentColor" strokeLinejoin="round" />
          <path d="m9.5 12 2 2 3.5-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "ops":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 5h16M4 12h16M4 19h10" stroke="currentColor" strokeLinecap="round" />
          <circle cx="18" cy="19" r="2" stroke="currentColor" />
        </svg>
      );
    case "calculator":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" />
          <path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "faq":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" />
          <path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.6-2.4 2-2.4 3.3M12 16.8h.01" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "pricing":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" />
          <path d="M4 10h16M8 15h4" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function MenuPanel({ onClose }) {
  return (
    <div
      className="menu-pop absolute inset-x-0 top-[calc(100%+10px)] hidden rounded-3xl border border-black/[0.06] bg-white p-4 shadow-[0_40px_90px_-24px_rgba(16,16,20,0.3)] lg:block"
      data-testid="mega-menu"
    >
      <div className="grid grid-cols-3 gap-1">
        {MENU_GROUPS.map((group) => (
          <div key={group.heading} className="px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40">{group.heading}</p>
            <div className="mt-3 space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={onClose}
                  className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F5F4F0]"
                  data-testid={`mega-item-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.07] bg-[#F5F4F0] text-black/70 transition-colors group-hover:border-accent/30 group-hover:text-accent">
                    <SectionIcon name={item.icon} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block font-display text-[14.5px] font-semibold leading-tight text-ink">{item.title}</span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-black/50">{item.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PagesPanel({ onClose }) {
  return (
    <div
      className="menu-pop absolute inset-x-0 top-[calc(100%+10px)] hidden rounded-3xl border border-black/[0.06] bg-white p-4 shadow-[0_40px_90px_-24px_rgba(16,16,20,0.3)] lg:block"
      data-testid="pages-menu"
    >
      <div className="grid grid-cols-3 gap-1">
        {ALL_PAGES.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            onClick={onClose}
            className="group flex items-start gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-[#F5F4F0]"
            data-testid={`pages-item-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          >
            <span className="min-w-0">
              <span className="block font-display text-[14.5px] font-semibold text-ink">{item.title}</span>
              <span className="mt-0.5 block text-[12.5px] text-black/50">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>
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
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
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

  const pillLink = (item) => (
    <Link
      key={item.label}
      to={item.href}
      className={`rounded-full px-3 py-1.5 font-display text-[15px] font-medium tracking-[-0.01em] transition-colors ${
        isActive(item.href) ? "bg-black/[0.07] text-ink" : "text-black/65 hover:bg-black/[0.05] hover:text-ink"
      }`}
      data-active={isActive(item.href)}
      data-testid={`nav-link-${item.label.toLowerCase()}`}
    >
      {item.label}
    </Link>
  );

  const pillDropdown = (label, key, testid) => (
    <button
      onClick={() => setOpenMenu(openMenu === key ? null : key)}
      onMouseEnter={() => setOpenMenu(key)}
      aria-expanded={openMenu === key}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-display text-[15px] font-medium tracking-[-0.01em] transition-colors ${
        openMenu === key ? "bg-black/[0.07] text-ink" : "text-black/65 hover:bg-black/[0.05] hover:text-ink"
      }`}
      data-testid={testid}
    >
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 text-black/40 transition-transform duration-200 ${openMenu === key ? "rotate-180" : ""}`}
      />
    </button>
  );

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4" data-testid="site-navbar">
      <div className="relative mx-auto max-w-[1340px]">
        <div
          className={`flex h-14 items-center justify-between gap-3 rounded-full bg-[#ECEBE7]/90 pl-5 pr-2 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? "shadow-[0_20px_45px_-18px_rgba(16,16,20,0.35)]" : "shadow-[0_12px_35px_-18px_rgba(16,16,20,0.25)]"
          } ring-1 ring-black/[0.05]`}
        >
          <Link to="/" aria-label="Fluxvex home" data-testid="nav-logo-link" className="shrink-0">
            <FluxvexLogo tone="ink" size={26} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {NAV_LINKS.map(pillLink)}
            {pillDropdown("Sections", "sections", "nav-toggle-sections")}
            {pillDropdown("All Pages", "pages", "nav-toggle-pages")}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              to="/contact"
              className="rounded-full bg-white px-4.5 px-5 py-2.5 font-display text-sm font-medium text-ink shadow-sm transition-colors hover:bg-white/80"
              data-testid="nav-contact-link"
            >
              Contact Us
            </Link>
            <button
              onClick={() => openWaitlist("navbar")}
              className="rounded-full bg-ink px-5 py-2.5 font-display text-sm font-medium text-white transition-colors hover:bg-black/80"
              data-testid="nav-join-waitlist-button"
            >
              Join the Waitlist
            </button>
          </div>

          {/* Mobile */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button
              onClick={() => openWaitlist("navbar-mobile")}
              className="rounded-full bg-white px-4 py-2 font-display text-sm font-medium text-ink shadow-sm"
              data-testid="nav-join-waitlist-mobile-button"
            >
              Join Waitlist
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${mobileOpen ? "bg-ink text-white" : "bg-white text-ink shadow-sm"}`}
              data-testid="nav-mobile-toggle"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop dropdown panels */}
        {openMenu && (
          <div className="hidden lg:block" onMouseLeave={() => setOpenMenu(null)}>
            {openMenu === "sections" ? (
              <MenuPanel onClose={() => setOpenMenu(null)} />
            ) : (
              <PagesPanel onClose={() => setOpenMenu(null)} />
            )}
          </div>
        )}

        {/* Mobile sheet */}
        {mobileOpen && (
          <div
            className="menu-pop absolute inset-x-0 top-[calc(100%+10px)] rounded-3xl border border-black/[0.06] bg-white p-4 shadow-[0_40px_90px_-24px_rgba(16,16,20,0.3)] lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link key={l.label} to={l.href} className="rounded-xl px-3 py-3 font-display text-[16px] font-medium text-ink hover:bg-[#F5F4F0]" data-testid={`mobile-link-${l.label.toLowerCase()}`}>
                  {l.label}
                </Link>
              ))}
              {[
                { key: "sections", label: "Sections", items: MENU_GROUPS.flatMap((g) => g.items) },
                { key: "pages", label: "All Pages", items: ALL_PAGES },
              ].map((group) => (
                <div key={group.key} className="border-t border-hairline pt-1">
                  <button
                    onClick={() => setMobileGroup(mobileGroup === group.key ? null : group.key)}
                    aria-expanded={mobileGroup === group.key}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-display text-[16px] font-medium text-ink"
                    data-testid={`mobile-toggle-${group.key}`}
                  >
                    {group.label}
                    <ChevronDown className={`h-4 w-4 text-black/40 transition-transform ${mobileGroup === group.key ? "rotate-180" : ""}`} />
                  </button>
                  {mobileGroup === group.key && (
                    <div className="flex flex-col pb-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] text-black/70 hover:bg-[#F5F4F0]"
                        >
                          {item.icon && (
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.07] bg-[#F5F4F0] text-black/70">
                              <SectionIcon name={item.icon} className="h-4 w-4" />
                            </span>
                          )}
                          <span>
                            {item.title}
                            {item.desc && <span className="mt-0.5 block text-xs text-black/45">{item.desc}</span>}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="mt-3 rounded-full bg-ink py-3 text-center font-display text-sm font-semibold text-white"
                data-testid="mobile-contact-link"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

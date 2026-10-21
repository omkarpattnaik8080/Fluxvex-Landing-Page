# Fluxvex — PRD

## Original problem statement
"Build a landing page: completely following the design.md" — design.md specifies a conversion-focused, SEO-ready website for **Fluxvex**, an automated client-reporting platform for digital marketing agencies. Framer Dark palette (#000 bg, #0099FF accent), Botwise-screenshot-matched navbar/mega-menu/typography/CTA-panel/footer, strict truthfulness rules (no fabricated metrics, testimonials, certifications), CinematicText animated headings, ROI calculator, waitlist conversion flow.

## Architecture
- **Frontend**: React 19 (CRA + craco), Tailwind, framer-motion, lenis smooth scroll, custom `CinematicText` component (in-view, once-only, grapheme-accurate masked line reveal; reduced-motion + no-JS safe), reusable `SectionShell`/`Reveal` primitives.
- **Backend**: FastAPI (`/api/waitlist`, `/api/contact`) with email validation, honeypot, in-memory IP rate limit (10/min), upsert dedupe on email; MongoDB persistence; optional Google Sheets sync via `GOOGLE_SHEETS_WEBAPP_URL` env (Apps Script webhook) — off by default per user choice.
- **SEO**: static head (title/description/OG/Twitter/robots), Organization + WebSite + FAQPage JSON-LD (mirrors on-page FAQ exactly, no fabricated facts), robots.txt + llms.txt in public/, per-route titles via `Seo.jsx`. Canonical/og:url/sitemap omitted — no confirmed production domain (per SEO skill guardrails).

## User personas
- Agency owner/account manager drowning in monthly client reporting (primary audience: US/UK/CA/AU agencies).
- Ops lead evaluating a repeatable reporting workflow vs. general AI assistants.

## Core requirements (static)
Truthful copy only; Framer Dark tokens; screenshot-matched nav with Sections mega-menu (2×3) + All Pages dropdown; blue hero with report-preview mockup (sample data labeled); integration strip (Google Ads/Meta Ads/GA4 only); problem comparison; 4 outcome cards; 3 feature cards; product showcase; ChatGPT comparison table; 4-step how-it-works; client-side ROI calculator; security section (Planned chips only); Starter/Growth pricing ("Coming soon"); 11-question FAQ; final blue CTA panel; dark footer with giant outlined wordmark; cookie banner + preference center; waitlist dialog form.

## Implemented (2026-10-21)
- Home landing page with all 15 design.md sections + marquee band; Navbar (sticky, mega-menu, mobile drawer); Hero with masked line reveal, 3D settle, parallax, animated connection lines; CinematicText on all major headings.
- /pricing (plan cards, comparison table, 5 pricing FAQs, CTA), /contact (inquiry form), /security (controls + regulation language), 404.
- Waitlist + contact forms → MongoDB (verified: valid, duplicate-upsert, invalid 400, honeypot skip).
- Cookie consent (banner + preference center, localStorage), cookie-preferences reopen from footer.
- SEO: head meta, JSON-LD (Org/WebSite/FAQPage), robots.txt, llms.txt, per-route titles, favicon.svg (original Fluxvex mark).

## Prioritized backlog
- P0: Google Sheets sync activation (needs GOOGLE_SHEETS_WEBAPP_URL from user's Apps Script deployment).
- P1: /integrations, /resources resource pages when content is ready; Privacy Policy + Terms pages (legal review); production domain → canonical/sitemap/og:image.
- P2: Auth (AuthForm + real signup) when accounts exist; product screenshots from the real app; consent-backed analytics events.

## Next tasks
1. Connect Google Sheets (user provides Apps Script /exec URL; set GOOGLE_SHEETS_WEBAPP_URL).
2. Add real social profiles to footer "Follow Fluxvex" when they exist.
3. Publish Privacy Policy / Terms after legal review and link them in the footer utility row.

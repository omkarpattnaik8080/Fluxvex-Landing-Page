# Fluxvex — PRD

## Original problem statement
"Build a landing page: completely following the design.md" — Fluxvex, an automated client-reporting platform for digital marketing agencies. Iterated over multiple feedback rounds: (1) light Botwise-style theme per user screenshots, (2) uploaded hero texture image + official Fluxvex icon as logo/favicon, (3) exact-reference sections (features trio, problem diagram, platform + stats), (4) floating pill navbar per Movoice reference, ultra-premium motion illustrations, uniform typography.

## Architecture
- **Frontend**: React 19 (CRA + craco), Tailwind tokens (royal blue #3D43E8 accent, white bg, #F4F2ED warm neutrals, dark #0B0B0D footer), Inter Tight (display/nav/buttons) + Inter (body) + Caveat (sticky note only), framer-motion + lenis + custom `CinematicText` (in-view, once, grapheme-accurate masked line reveal; reduced-motion/no-JS safe).
- **Navbar**: fixed floating pill (rounded-full, warm gray, backdrop blur) over the hero; Sections mega-menu in 3 grouped columns (Workflow/Trust/Decide) with icon tiles; All Pages directory panel; mobile white sheet with accordions; Escape/outside-click close.
- **Backend**: FastAPI `/api/waitlist` + `/api/contact` — email validation, honeypot, IP rate limit, upsert dedupe, MongoDB persistence; optional Google Sheets sync via `GOOGLE_SHEETS_WEBAPP_URL` env (off per user choice).
- **SEO**: static head (title/desc/OG/Twitter/robots), Organization + WebSite + FAQPage JSON-LD mirroring on-page FAQ, robots.txt, llms.txt, per-route titles via `Seo.jsx`, favicon = official Fluxvex icon PNG. Canonical/sitemap/og:image intentionally omitted until a production domain is confirmed.

## Sections (home, in order)
Hero (texture bg, masked-reveal H1, white report dashboard with integration chips + KPI/chart entrance animations, sticky note/orb/toast decorations) → marquee → integrations strip (Google Ads/Meta Ads/GA4, "Initial integration focus") → promise panel (quote + pressed-tile grid) → problem (blue-framed heading, PROBLEM/SOLUTION diagram, avatars, draw-on-scroll red/blue charts, tooltip chips, 3 pain points) → outcome 4 cards → features trio (framed heading, hatch bands, cream 3D-style visuals: source selector w/ cursor, floating report cards, delivery dial with rotating arc + spinner pill) → showcase (sample report browser mockup, spotlight hover) → platform (content + accordion + integration cloud + verified-facts stats band with count-up: 3 sources / 4 steps / 2 plans / 1 workflow) → AI comparison table → how it works (tab strip + step visuals) → ROI calculator (client-side) → operations rows → security (Planned chips only) → pricing preview → FAQ (11) → final CTA panel → dark footer (giant outlined wordmark).

## Pages
/ , /pricing (plan cards + comparison table + 5 FAQs + CTA), /contact (inquiry form), /security (controls + regulation posture), 404.

## Truthfulness rules honored
No fabricated metrics/testimonials/logos/certs; stats band uses verified facts only; sample report labeled "Illustrative data"; compliance stated as process, no badges.

## Implemented (2026-10-21)
All of the above, verified via backend curl suite (valid/duplicate/invalid/honeypot/contact/429-able) and multi-viewport screenshot passes (desktop 1440, mobile 390: home full scroll, mega menu, pages menu, mobile sheet, sticky nav, pricing/contact/security pages). No horizontal overflow anywhere.

## Backlog
- P0: Google Sheets sync activation (user provides Apps Script /exec URL → set GOOGLE_SHEETS_WEBAPP_URL).
- P1: og:image share card; canonical/sitemap once production domain confirmed; Privacy Policy + Terms pages after legal review; /integrations detail pages with animated diagrams.
- P2: consent-gated analytics events; real product screenshots replacing illustrated mockups at launch.

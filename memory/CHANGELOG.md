# Fluxvex — Changelog

## 2026-10-21 (session 5)
- Social channels added: footer LinkedIn/GitHub/YouTube buttons (user-provided URLs), JSON-LD sameAs + llms.txt social line.
- Hero final audit: new isometric mini-flow illustration (3 source tiles → dashed wires with traveling packets → glowing Fluxvex hub, xl+), "Free to join — no credit card needed" trust line under CTAs.
- Verified: hero at 1440/390 no overflow, social hrefs correct, marquee moving, zero console errors.

## 2026-10-21 (session 4)
- Legal published as drafts: /privacy-policy + /terms (user-provided docs, mini markdown renderer, draft banner, fill-in chips for unresolved fields, noindex until finalized, footer + cookie-banner + security-section links).
- Hero: H1 → GSAP marquee ("Client reporting, on autopilot." with FluxvexMark separators, aria-label + sr-only, reduced-motion static); subheading → Inter Tight; dashboard gained a Fluxvex AI summary strip; new floating "12 client reports" stat card; AI insight card now visible from lg.
- AiComparison: rebuilt as isometric mini-scenes (manual dashed loop with orbiting packet + question billboard VS 4-tile pipeline with packets + Client-ready billboards), equal heights, premium table retained.
- Section order optimized for conversion; GSAP 3.15 installed (band + headline marquee, core only); zero console errors verified at 1440/1024/390 (test iterations 3–4: 100% pass).

## 2026-10-21 (session 3)
- Fixed blocking waitlist bug: missing `import axios` in WaitlistContext.jsx — submissions now complete e2e with UPI-style success animation + Mongo persistence (verified by testing agent, iteration 1 & 2).
- Pricing: INR/USD toggle first shipped with indicative prices, then converted per user to LOCKED pricing — blurred masked glyphs ($••, $•••, ₹ •,•••, ₹ ••,•••) with lock chip, shimmer, hover-peek; comparison table "Launch price (per month)" locked strings follow currency; pricing FAQs rewritten ("waitlist members see it first"); JSON-LD FAQ, home FAQ, llms.txt, meta description all synced; zero real price numbers in any surface.
- SEO completed on production domain https://www.fluxvex.com: per-route canonical + og:url (Seo.jsx path prop), canonical/og:url/og:image(1200x630)/twitter:card=summary_large_image in static head, JSON-LD Organization/WebSite url fields, sitemap.xml (4 routes), robots.txt Sitemap line, og-image.jpg generated from brand design, 404 noindex. Verify after Deploy with the crawling toggle ON.
- New: BackersBand marquee above footer (Product Hunt, StartupBase, Meta Tech Partner, AWS Startups, Microsoft Azure Startups, Sarvam) with drawn brand marks.
- Footer: office address added (House No. 288, Arunodaya, HSR Layout Sector-1, Bengaluru).
- Platform cloud: floating icons with hover name chips, traveling data packet, pulse rings, periodic "Client report ready" toast.
- Features section: exact reference diagrams (dish+icons+cursor list, AI bubble cascade, generating pill + 3-Integrations chip + 00:03 dial) with Fluxvex AI content (SOURCES / FLUXVEX AI / DELIVERY).
- Workflow: rebuilt as persistent isometric 3D stage with traveling pulses and per-step floating billboards (Authorized / client+period / assembling progress / Export+Schedule).
- ROI calculator: premium dark redesign — custom gradient sliders, tweened numbers, manual-vs-Fluxvex bars, reduction donut.
- All section headings animated via CinematicText/SectionHeader (promise quote included); section order fixed (HowItWorks moved after Outcome).
- A11y/minor: Navbar key prop fixed; DialogDescription on waitlist + cookie dialogs.

## 2026-10-21 (session 2 — prior fork summary)
- Light theme migration, routing, floating pill navbar, animated hero dashboard, all major sections, waitlist/contact backends, base SEO (head, JSON-LD, robots, llms.txt), lenis, UPI-style success animation.

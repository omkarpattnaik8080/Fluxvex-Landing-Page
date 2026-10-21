# Fluxvex — Changelog

## 2026-10-21 (session 8 — careers culture + test job cleanup)
- Removed leftover TEST job postings ("TEST QA Audit Final 1792625788", "TEST Audit 1792625832") from the `job_postings` collection — public /api/careers/jobs returns only the 3 real roles.
- Culture section rebuilt per user's culture brief: new header ("Our culture — Ownership-first. Rest built-in."), 6 cards (3×2 grid) leading with Ownership not oversight / Hit the target, then rest (weekly targets: done = rest, no performative overtime) / Work–life balance for real; added "What is the culture like at Fluxvex?" FAQ synced 1:1 with FAQPage JSON-LD (AEO/GEO).
- Icons: Target, CalendarCheck, Sunset added (Rocket dropped with "Ship weekly" card).
- Verified: jobs API clean, TEST job absent from page DOM, culture heading renders, zero overflow at 1440/390.

## 2026-10-21 (session 7)
- One 3D isometric language everywhere: shared kit (components/iso/IsoKit.jsx) now drives HowItWorks, AiComparison (Claude + ChatGPT copy), FeatureGrid (3 iso scenes), Platform (iso scene replacing cloud), Consistency (iso diagrams per row).
- Hero decluttered: orb, sticky note, stat chip removed; kept marquee headline + subcopy + CTAs + trust line + dashboard (corner ticks, AI summary) + AI insight/toast/iso flow.
- Marquee strip below hero: GSAP marquee ("Client reporting, on autopilot" solid + Google Ads/Meta/GA4 outline + FluxvexMark separators, hover-slow).
- Showcase: functional period tabs (May/June/Q2 2025) swap KPIs, trend chart, channel bars, URL slug, and re-type the AI summary; export button shows honest sample note.
- Calculator: complete light redesign (accent sliders, big Inter Tight numbers, comparison bars, donut) — same math + testids.
- Test iteration 5: 100% pass (backend 13/13, frontend 1440/390 zero errors).

## 2026-10-21 (session 6)
- Common illustration language adopted: hairline kit (Hub/Cabinet/Riffle/Slow/Padlock) built and applied to platform accordion, security vault, and operations rows; hero dashboard got draw-on hairline corner ticks; isometric scenes remain the flagship diagrams.
- Hero final audit passed: marquee, trust line, iso flow, AI insight, corner ticks — no overflow, zero console errors at 1440/390.

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

## 2026-10-21 (session 3 — final polish batch, test iteration 6: 100% pass)
- Fixed Google Ads logo to official 2018 geometry (official SVG paths, viewBox 0 -13 256 256 — was rendering like an X).
- Fixed navbar dropdown lag/flicker: panels always mounted with opacity/transform/visibility transitions, 160 ms hover close-grace on the whole navbar container, menu-pop keyframes no longer translate -50%.
- Hero: removed the floating isometric diagram (only report toast + AI insight remain); CTAs rebuilt as spring-animated motion buttons with shine sweep + arrow micro-motion.
- Consistency section: step headings now use Inter Tight (font-display) for uniform typography.
- NEW ComplianceBadges (GDPR / HIPAA / DPDP / CCPA) on the home security section and /security page (+ HIPAA paragraph, copy aligned).
- NEW Vision section (3D iso scene + 3 pillars + CTA) after the promise panel.
- NEW Affiliate Partner Program section (3 steps + animated 20% donut) after FAQ.
- NEW Blog: /blog index (12 posts, featured card) + /blog/:slug full article pages; authors omkar, sakti, sneha, ankit, sourced from data/blog (posts1/posts2); topics include agency analytics vs Fluxvex, best alternative, Swaydo alternative, AI in digital marketing; BlogPosting JSON-LD, per-route Seo, related posts, waitlist CTA; Blog in desktop nav, All Pages panel, mobile menu, footer; sitemap.xml now 17 URLs; llms.txt updated.
- Mobile 390px overflow from Vision billboards fixed (billboards repositioned inside the 330px plane).

## 2026-10-21 (session 4 — careers, AEO/GEO, performance, calculator 10/10, scroll-spy; tests iteration 8-9: 100%)
- NEW /careers page: hero "Don't send a cover letter. Send us a text.", 4 culture cards, 3 SaaS sales internship roles per user spec (India Bengaluru remote+hybrid up to ₹6 LPA; US remote above-market; UK remote above-market — all 4-month unpaid, guaranteed PPO conversion chances), UNIQUE chat-style "Text Fluxvex" application form (asks why join + where they can contribute) → new POST /api/careers endpoint (validation, honeypot, rate limit, career_applications collection, optional Sheets sync), JobPosting + FAQPage JSON-LD; wired into All Pages panel, footer, sitemap (21 URLs), llms.txt.
- Vision section upgraded to the full agency OS story: 4-stage roadmap (Client reporting "Building now" → Proposal making → Invoicing → AI account manager, all future plans labeled), animated progress line + pulse connectors, State-of-the-art AI band (5 capabilities incl. AI account manager), compliance band.
- Shared TapCTA (spring hover/press) converted into EVERY CTA across Navbar, Footer, FinalCta, HowItWorks, Platform, PricingPreview, Affiliate, Vision, Integration, BlogPost, Security, SecuritySection, WaitlistContext modal.
- Performance: route-level React.lazy code splitting (blog corpus out of main bundle) + Suspense PageLoader; assets already lean.
- ROI calculator redesigned 10/10: light inputs panel + dark premium estimate panel, tweened numbers, comparison bars, dark donut + range-dark slider, "43 full workdays back" callout.
- Navbar scroll-sync: IntersectionObserver scroll-spy (About/#why, Resources/#faq, Home at top).
- Waitlist modal: plan interest now preselects (Starter/Growth) via openWaitlist(from, {interest}).
- ComplianceBadges redesigned as proper certification-seal SVG icons: GDPR EU-stars seal, HIPAA medical shield, DPDP tricolor+chakra seal, CCPA gold rosette.
- Section order audit (UX conversion principles): verdict KEEP — current sequence already follows promise→proof→problem→solution→value→trust→pricing→objections→CTA.

## 2026-10-21 (session 5 — AiComparison table → versus cards)
- Rebuilt the comparison table in "Why a prompt isn't a reporting system" as 6 versus-cards: per-need icons, muted "A prompt by itself" cell vs accent-tinted "The Fluxvex workflow" cell with SVG drawn-circle check animation, column headers with pulse dot, hover lift + glow, mobile stacking with inline labels. Kept testids (comparison-need-1..6, ai-comparison-table). Verified: 6 cards render, no overflow.

## 2026-10-21 (session 6 — 100% CTA coverage + premium hero eyebrow)
- Hero eyebrow "Automated client reporting for agencies" rebuilt premium: glass pill, word-by-word spring entrance, mint "Pre-launch" chip that pops in with a pulsing dot + recurring shine sweep, periodic sheen across the whole pill.
- Final CTA sweep completed: CookieConsent (accept/reject/customize/save), Showcase "Export branded PDF", IntegrationsStrip live cards, NotFound "Back to the homepage", Pricing page "Get pricing updates" — all now TapCTA spring-animated. CurrencyToggle already animates (layoutId spring pill). Every interactive CTA site-wide is now motion-animated.
- Fixed compile regressions (duplicate Reveal import in IntegrationsStrip, duplicate ScrollManager import in App.js). Verified: clean compile, hero renders, no overflow.

## 2026-10-21 (session 7 — careers page 2.0, SEO/AEO/GEO)
- Careers page rebuilt: floating hero badges (PPO up to ₹6 LPA / US·UK·India remote / founding-team replies), GSAP roles ticker, NEW "How hiring works" 3-step animated timeline (draw-line + pulsing step dots), answer-first hero paragraph (liftable by answer engines), 5 FAQs (added "Which markets can I apply for?" + "Who can apply?") matched 1:1 to FAQPage JSON-LD, JobPosting JSON-LD ×3 (INTERN, TELECOMMUTE, directApply) retained.
- SEO/AEO/GEO: keyword-rich honest copy (SaaS sales internship, guaranteed PPO, ₹6 LPA, markets), per-route title/canonical/og, sitemap 21 URLs + llms.txt already include /careers.
- Verified: clean compile, 3 roles/3 steps/5 FAQs render, GSAP ticker runs, no overflow at 1440 or 390.

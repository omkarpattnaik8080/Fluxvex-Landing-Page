# Fluxvex — Changelog

## 2026-10-21 (session 11 — Inside-Fluxvex band restructure)
- Band restructured to premium two-column layout: LEFT = eyebrow + new heading "One report, three working layers." + subcopy + color-dot layer index (blue/violet/green) + hover-hint chip; RIGHT = enlarged 3D scene (250/300px mobile, lg:min-h-[400px]).
- LayersScene: camera targets [0, 0.82, 0] (stack centered), world w 10 (bigger slabs), labels/chips are screen-space tags (depthTest false, renderOrder 10) that never hide behind slabs; chips = white-on-color pills (green "Your logo · your voice", violet "Drafts · flags anomalies", blue "3 sources · one schema") spread diagonally.
- Cam component now takes a lookAt target prop.
- Verified (iteration 13: 100%): backend 19/19, no clipping on hover, chips readable, 0 overflow, no ghosting, other pages clean.

## 2026-10-21 (session 10 — brighter Iso3D + no play button + premium Inside-Fluxvex band)
- Scene enrichment: colored base plates per element (sky/blue/amber sources, violet AI, mint delivery), volumetric light beams, floating KPI chips (2.4x ROAS, +38% conversions, +24% channel results, 5→500 clients — honest copy), particle bursts (on step change / click / 3.2s pipeline cycle), orbiting octahedron satellites, brighter palette (amber/violet/sky/mint). PromptScene intentionally stays gray = contrast vs colorful pipeline.
- HowItWorks: Auto-playing/Play tour toggle REMOVED — tour auto-plays on scroll into view; tabs + dots remain.
- "Inside Fluxvex" band redesigned premium: gradient top bar (accent→violet→emerald), "Three layers, one frame" header + subcopy + "Hover to fan the layers" chip, taller scene (230/260px), colored slab headers, diagonal chips per layer, satellites; fan pivots at the middle layer (1.48×) so nothing clips; pulsing-dot Suspense placeholder while the lazy 3D chunk loads (~6s cold throttled mobile in dev, faster in prod build).
- Verified (iteration 12: 100%): backend 19/19; 1 canvas, 10 scene testids, no play button, no clipping on hover, 0 overflow 1440/390, no ghosting, other pages clean.

## 2026-10-21 (session 9 — Three.js Iso3D illustrations)
- Interactive 3D for every requested section illustration via three.js + @react-three/fiber + @react-three/drei (installed with --ignore-engines; camera-controls wants Node 22 but works): HowItWorks stage, AiComparison ×2 (prompt loop VS pipeline), FeatureGrid ×3 islands, Platform orbit, Vision ecosystem, NEW Showcase "exploded layers" band (Connected data → Fluxvex AI → Branded delivery, fans apart on hover).
- Architecture: ONE shared WebGL context on Home (drei View portals + View.Port; SceneCanvas fixed z-35 pointer-events-none, mounted lazily in Home.jsx only — other routes render 0 canvases). Scenes lazy-chunked (Scene3D + scenes + kit3d). FullClear at useFrame priority 0 clears the fixed canvas each frame — fixes drei View stale-pixel ghosting at old scroll positions.
- Iso3D kit (components/three/kit3d.jsx): flat-vector isometric language preserved — cream grid ground, white tiles + hairline Edges, dashed accent wires + glowing packets, camera-facing canvas-texture billboards, pulse rings, SVG-data-URL textures with xmlns injection, Fluxvex PNG icon via rounded-clip canvas texture (useImgTexture).
- Interactivity (DOM-driven input refs, raycast-free): cursor tilt, drag-to-rotate (pointer capture + touch-action pan-y so mobile scroll survives), hover speeds packets/starts orbit boost, click = pulse burst; reduced-motion = static scenes.
- HowItWorks: 3D stage is step-driven (Authorized → client/period → assembling bar → Export/Schedule billboards); SVG IsoKit compositions retained as Suspense/WebGL fallbacks in all six sections.
- Verified (iteration 11: 100%): backend 19/19; 1 canvas on Home, 10 scene testids, drag/pulse/hover/tabs OK, zero ghosting, 0px overflow at 1440 + 390 (fixed iter-10's 6px mobile overflow), /careers /pricing /blog /admin untouched, admin login OK.

## 2026-10-21 (session 8b — careers hero UI fix)
- Fixed careers hero stats grid not centering under the centered heading (missing `mx-auto` — grid hugged the left edge, first card clipped at narrow viewports). Verified centered at 1083/1440/390 (grid center == viewport center, zero overflow).
- Careers H1 now wraps at the sentence: `text-balance` + non-breaking space in "cover&nbsp;letter" → desktop breaks as "Don't send a cover letter." / "Send us a text." (no mid-compound split, no orphan "a text." line); mobile breaks into 3 semantic lines.

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

## 2026-10-22 — Session 10: calculator + pricing redesign, distinct feature diagrams
- RoiCalculator: fmhy-style card (Live-tool toolbar + Copy result w/ clipboard fallback, in-card heading, workload/assumption sliders, dark hero load card, yearly-toll + With-Fluxvex-donut + Where-you-land YOU-bar cards). All roi-* testids preserved.
- Pricing page: centered hero, USD/INR toggle, gray tray w/ transparent Starter + white Most-Popular Growth (conic blob, ✦ badge), LockedPrice blur+lock+shimmer, black pill CTAs → waitlist preselect, iridescent "Not sure" CTA card. Pricing remains locked/coming-soon.
- kit3d: useTextTexture drop-shadow support; Chip enlarged (34/20 bold, opaque) + Billboard shadows — fixes ghosted-look overlays.
- scenes.jsx: FeatureSourcesScene → radial convergence (triangle sources, pulse rings, beam, chip "3 → 1 sources · one schema"); FeatureAiScene → drafting composition (DraftDoc with violet ink bars typing on a June-summary doc, beam, satellites, separated tags); PlatformScene chips restored in clear space; world sizes tightened (platform 10.4w, features 8.8w).
- Tests: iteration 15 — backend 19/19, frontend 9/9 ACs, 0 console errors.

## 2026-10-22 (session 10b — reference-exact calculator + site-wide perf)
- RoiCalculator rebuilt to DIRECT reference match: toolbar (Live tool pill / title / FREE / Copy result), left form (two-line heading with lavender "confidence.", floating brand marks, bold sections, labeled bordered fields each with slim slider), right results (dark hero "48 / month" lavender + chart watermark, "Reporting math" 3 green columns, "Effort projection" + "Workdays" row cards, "How this compares" YOU-bar). Donut removed.
- Perf: Lenis now driven by gsap.ticker (single rAF, lagSmoothing(0)) — scroll + GSAP marquees update in one frame; WebGL dpr [1,1.75]→[1,1.5]; useTextTexture module-level GPU-texture cache (identical specs share one texture; drafting-dots anim creates 3 textures total); MongoDB hot-path indexes added at startup (waitlist/contact_messages/career_applications: email+created_at; job_postings: slug+active; users: email).
- Full-site test iteration 16: 10 routes render clean, calculator math exact (settled values), Lenis smooth-ease verified, marquees animating, currency masks swap, waitlist preselect + submit, contact + careers forms, admin auth regression OK, no overflow 1440/390, zero page errors, backend 19/19 pytest.

## 2026-10-22 (session 11 — Outcome 3D + premium roadmap + seamless-UX pass)
- Outcome section: 4 flat SVG diagrams → live Three.js scenes (outcomePull radial + "3 → 1" chip; outcomeConsistent 3 aligned slabs + sweeping mint QA bar; outcomeBrand branded doc float + "Client-ready"; outcomeSchedule calendar + pulsing date ring + "Cadence locked"). SVG fallbacks kept; zones bottom-aligned via flex-1 min-h-180.
- Vision roadmap: complete redesign → premium dark launch-sequence panel (glass cards, glowing connector + traveling dot, BUILDING NOW/FUTURE PLAN chips, hover lift+glow, honesty footnote).
- Seamless-UX pass (from user Next.js reference, adapted to CRA): Reveal premium bezier [0.25,1,0.5,1] + viewport margin + will-change; SectionShell content-visibility:auto render bypass; html bg already flash-free; fonts already display=swap.
- CRASH FIX (iteration 17 finding): WebGL-unavailable crashed whole site via unconditional shared <Canvas>. Now SceneCanvas detectWebGL() short-circuit + per-view SceneBoundary error boundary → SVG fallback per scene. Self-tested both paths (getContext nulled → SVGs, no crash; normal → 13 scenes render).
- Tests: iteration 17 backend 19/19; frontend all checks pass post-fix (3D scenes live, scan bar animates, zones aligned, roadmap panel + hover, no stuck reveals, anchors within tolerance, calculator + pricing regressions clean, 0 pageerrors, no overflow 1440/390).

## 2026-10-22 (session 12 — agency-loop bento grid)
- Vision roadmap: dark launch-sequence panel replaced with a premium BENTO GRID matching the user reference anatomy — tinted visual zones (mint/violet/amber/sky) with floating white stat pills (label | green value), signature animated mini-viz per card (ghost bars + green gradient highlight + white dot + dashed Avg.-cycle line; drafting doc; auto-drafted invoice; AI chat bubbles + typing dots), BUILDING NOW/FUTURE PLAN chips, title + desc below. Layout: lg 2+1 / 1+2 spans; scroll-in animations on premium bezier; hover lift + shadow.
- Honesty kept: future-plan pills use process words (AI-assisted / Suggested / Auto) — no fabricated metrics; hero card stats tie to calculator defaults (−40
## 2026-10-22 (session 12 — agency-loop bento grid)
- Vision roadmap: dark launch-sequence panel replaced with a premium BENTO GRID matching the user reference anatomy — tinted visual zones (mint/violet/amber/sky) with floating white stat pills (label | green value), signature animated mini-viz per card (ghost bars + green gradient highlight + white dot + dashed Avg.-cycle line; drafting doc; auto-drafted invoice; AI chat bubbles + typing dots), BUILDING NOW/FUTURE PLAN chips, title + desc below. Layout: lg 2+1 / 1+2 spans; scroll-in animations on premium bezier; hover lift + shadow.
- Honesty kept: future-plan pills use process words (AI-assisted / Suggested / Auto) — no fabricated metrics; hero card stats tie to calculator defaults (-40% / +230 h / +29 workdays).
- Verified desktop 1440 + mobile 390 (renders, no overflow, animations fire). Testids preserved.

## 2026-10-22 (sessions 13-14 — zero-friction forms, premium dashboards, integrations bento)
- WAITLIST MODAL: email-first rebuild (single required field + live validity check + inline error), trust row, optional disclosure (auto-expands on pricing preselect), Done button on success; SuccessBurst extracted to shared component.
- CONTACT PAGE: what-to-expect list + quick-answer chips; icon fields with focus rings; per-field validation; success echoes name/email + reset flow. Label-import crash caught and fixed.
- Vision: bento cards got loop animations (drafting line, stamp pulse, AI bubble float, bar shimmer); AI-core block redesigned as a dark premium band (ping tile, terminal line with blinking caret, 5 glass capability cards).
- Loading speed: three.js chunk warmed on requestIdleCallback in App.js, .iso3d-host crossfade on mount, Showcase branded "Warming up the scene" fallback.
- Calculator: accent ticks on section headings, pulse dot in Live-tool pill, drifting hero glow (hero-drift).
- HERO SAMPLE REPORT: KPI tiles with animated sparklines + vs-May deltas, dashed Last-period comparison line + legend, channel-mark mix, AI-drafted chip, merged bottom zone.
- INTEGRATION DETAIL PAGES: status chip + check badge, per-integration sample-report section (metric rows + AI summary + honesty note), timeline steps, Permissions & scope (read-only OAuth), FAQ accordions, cross-link cards, dark CTA band; bad slug → 404.
- HOME INTEGRATIONS: rebuilt as animated bento grid (wide Google/Meta cards with live mini-viz + data chips, GA4, dashed LinkedIn/TikTok coming-soon, wide Request-a-channel card → waitlist).
- Tests: iterations 18/19/20 — backend 19/19 each; frontend 100% (cross-link 390px overflow found in 19, fixed + re-verified in 20; zero outstanding issues).

## 2026-10-22 (session 15 — Waitlist Pulse + sheets status)
- Waitlist Pulse: new public GET /api/waitlist/count (60s TTL cache, instant invalidation on signup); hero shows live "N agencies are already on the list" pill (self-hiding at 0); waitlist success shows "You're #N on the list." — verified live 15→#16.
- Google Sheets sync confirmed already wired in backend (GOOGLE_SHEETS_WEBAPP_URL env; waitlist/contact/careers forward; "not_configured" until user pastes their Apps Script Web App URL — no keys needed).
- Pruned all QA-generated waitlist rows → public count starts at an honest 0; pulse hides until real signups.

## 2026-10-22 (session 16 — six-section premium polish pass)
- INTEGRATIONS STRIP ("Initial integration focus"): split header + live Pipeline Status module ("3 of 5 channels live", animated 5-segment bar); SyncRail (channels → Fluxvex AI → Branded report) with traveling packets; GA4 card got session-share donut viz; LinkedIn/TikTok coming-soon cards got IN BUILD progress bars (68%/41%) + "Top community request"; hover glow + logo micro-interactions. New testids: integrations-status, integrations-sync-rail, ga4-donut-viz, soon-progress-linkedin-ads, soon-progress-tiktok-ads.
- HOW-IT-WORKS LOAD FIX: IsoStage now layer-based — crisp SVG stage is the permanent base, WebGL scene cross-fades in over it via new Scene3D onReady callback (double-rAF after first painted frame). No blank beat, no hard swap; SVG stays if WebGL missing. Prewarm at idle already existed in App.js.
- ROI CALCULATOR: redesigned around a "savings story" — animated SVG ring gauge (reduction % ring, saved hours center), manual-vs-Fluxvex comparison bars, workdays equivalence strip, keep dark hero card (sparkline now redraws on input change) + gradient compare bar with YOU marker; sliders restyled as bordered field cards with display-grade values; floating tile illustration cluster (G/M/GA4 → dashed → Fluxvex) — pure SVG, zero WebGL weight. useTween extracted to shared hook src/hooks/useTween.js.
- OUR PROMISE: expanded — quote + pressed tiles kept; added 3 self-animating promise cards (trace: ROAS pill → packet → Google Ads chip; schedule: May-Aug cycle fill + delivered stamp; brand: color-cycling sheet + logo chip) + automated commitments ticker (CSS marquee, edge fades, hover pause).
- AGENCY LOOP (Vision): auto-cycling stage highlight every 2.6s (accent ring on active card + loop progress segments under header + orbiting-packet chip); BentoStat values count up on first view; AI chat card cycles 2 Q&A pairs every 5.2s; index badges 01-04 on viz zones.
- SAMPLE REPORT (Showcase): KPI data restructured to typed values + formatters; numbers count up on first view and tween between periods; trend chart draws itself (pathLength + glow under-stroke) on every period switch; channel bars colored per layer (accent/violet/mint); AI insights panel shimmers while typing + sparkles pulse.
- Tests: iteration 21 — backend 19/19, frontend 100% (math verified at defaults + after reduction=60, KPI tween lands on exact period values, no overflow 1440/390, 0 console errors); QA waitlist row pruned, pulse stays honest at 0.

## 2026-10-22 (session 17 — dark premium bento pass, user reference image)
- User provided a dark premium bento reference ("Inspiring benefits awaits you" — dark cards, glowing mini-visuals) and asked to fix the "Initial integration focus" strip + the "The workflow needs / A prompt by itself" table to that standard.
- INTEGRATIONS STRIP: full-bleed dark band (#0B0B14 + ambient indigo/violet glows + fine-grid); dark glass cards with LIVE pills; nested viz panels ("Conversions this month" equalizer, "Efficiency trend" sparkline, "Session mix" donut) glowing on dark; IN BUILD bars on coming-soon cards; dark SyncRail with #A3A8FF packets; white primary CTA.
- AI COMPARISON ("Why a prompt isn't a reporting system"): full dark band; dark-framed 3D prompt-loop vs pipeline cards (white iso tiles pop on dark; legacy SVG fallbacks recolored for dark); new animated "6 for 6" score strip (staggered spring checks); 3-column table replaced with 6 dark verdict cards (need title + dim "A prompt by itself" verdict + accent-glow "The Fluxvex workflow" verdict with drawn check #8A8FFF), staggered entrance + hover glow; DrawnCheck gained a color prop.
- All testids preserved (integrations-*, comparison-need-1..6, ai-comparison-*). Tests: iteration 22 — frontend 100%, 0 console errors, no overflow 1440/390, GA4 nav + waitlist modal verified, computed bg #0B0B14 on both bands.

## 2026-10-22 (session 17b — dark tone correction)
- User rejected the blue-tinted #0B0B14 band bg → both dark bands (IntegrationsStrip, AiComparison) switched to the app's previous neutral dark #0B0B0D (footer tone, matches the reference image's flat charcoal); removed the indigo/violet glow orbs; kept subtle white top-light + fine-grid; flattened the wide CTA card gradient to neutral glass. Accent colors kept on interactive elements only. Verified: computed bg rgb(11,11,13), no overflow, renders clean.

## 2026-10-22 (session 17c — AiComparison reverted to light)
- User asked to keep the "The workflow needs / A prompt by itself" section as it was earlier, no dark bg → AiComparison.jsx fully restored to the original light version (SectionShell + SectionHeader, light prompt/workflow 3D cards, 3-column versus table with DrawnCheck in accent, light closing line). Dark integrations strip stays. Verified via screenshots: light bg, no overflow, all rows render.

## 2026-10-22 (session 18 — soft-premium pass, user reference image v2)
- User provided a second reference (soft pastel gradient bento cards, floating white mini-dashboard chips, centered mint-pill header, one deep-green anchor card) and asked to fix: Affiliate section, "Initial integration focus" (looked AI-generated), the AI core block, and the Security & privacy page.
- INTEGRATIONS STRIP: dark band → light centered header (mint pill + CinematicText heading + status chips row "3 of 5 channels live" + LIVE pill); soft-gradient bento cards (accent-tint/violet/mint washes) with floating white viz panels (Conversions equalizer / Efficiency spark / Session-mix donut); deep-green "Request a channel" anchor card with white CTA. All testids kept.
- AI CORE (Vision): dark #0B0B14 panel → soft lavender→mint gradient panel; white glass capability cards with accent icon chips (fill on hover); terminal line as white chip with accent caret; ping tile kept.
- AFFILIATE: rebuilt as bento — wide partner-flow card (3 numbered floating step chips + dotted connectors + traveling packets, testids affiliate-step-1..3), soft-mint earnings-ring card (stroke now green #0E8A3E), "Your dashboard, later" referral-feed notification card (staggered slide-ins), deep-green CTA anchor card with white button + contact link.
- SECURITY PAGE: centered hero (mint pill + badges + title); "What we access, and why" wash card + new "HOW ACCESS WORKS" floating-chip OAuth visual (new testid security-page-access); 6 soft tinted control cards with icons + PLANNED pills (security-page-control-1..6 kept); deep-green "THE DATA PROMISE" anchor card with check chips (new testid security-page-promise); regulation text block kept word-for-word; accent CTA.
- Tests: iteration 23 — frontend 100% (0 console errors, no overflow 1440/390, waitlist modals + GA4 nav verified, all testids preserved). Note for testers: navigate to /security directly — page_url + '/security' yields '//security' → 404 (script bug, not app bug).

## 2026-10-22 (session 19 — affiliate 3D + top-SaaS polish + no-flash load fix)
- AFFILIATE 3D: new Iso3D "affiliate" scene (scenes.jsx) — referral-link tile → Fluxvex engine → wallet tile, gold coins flying in (FlyingCoin arcs), payment-received Burst every 3.2s, "Straight to your account / No T&C · yours to keep" billboards + 20% chip; mounted as a wide soft-wash card ("HOW THE MONEY FLOWS" + "NO T&C APPLIED" pills) with SVG base (AffiliateSceneLegacy); CTA card widened to full row.
- INTEGRATIONS STRIP: top-SaaS polish — display heading scaled to 34/42/48px, status merged into one sleek pill (marks + "3 of 5 channels live at launch" + LIVE), card padding p-7, SoonSkeleton dimmed previews on coming-soon cards, deep-green anchor card gained display heading + queue chips ("LinkedIn Ads — 68% built").
- NO-FLASH LOAD FIX: root cause = three.js chunk pre-warmed on idle (requestIdleCallback, 2s timeout) → SVG showed, 3D swapped in late. Fix: App.js prewarms immediately (double-rAF on mount); ALL 8 Scene3D sections now render through shared CrossFade3D wrapper (components/three/CrossFade3D.jsx) — SVG composition is the permanent base layer, WebGL cross-fades over it after first painted frame (Scene3D onReady); no hard swap ever; SVG stays if WebGL missing/error. Sections migrated: HowItWorks, AiComparison (prompt+pipeline), Showcase (new LayersLegacy base), Vision, Outcome x4, FeatureGrid x3, Platform. Fixed missing FluxvexMark import in Affiliate.jsx (crashed bundle → caught in smoke test); repositioned 20% chip clear of the link billboard; added referral-feed testid.
- Tests: iteration 24 — frontend 100% (0 console errors, no overflow 1440/390, fresh-load check passed: illustration visible immediately, no blank/swap; waitlist modals + nav verified).

# Fluxvex — Roadmap

## P0 (next)
- Deploy the site; turn ON "Enable Search Engine Crawling and Optimisation"; verify canonical/sitemap/og + Googlebot & AI-crawler UAs on the live domain (preview-only until then).
- Submit sitemap in Google Search Console once live.

## P1
- Google Sheets sync for waitlist/contact: user provides Apps Script /exec URL → set GOOGLE_SHEETS_WEBAPP_URL env (backend support already built).
- Rate limiting via X-Forwarded-For behind the Kubernetes ingress (current in-memory bucket keys on a shared IP).
- Switch server.py email fields to Pydantic EmailStr.

## P2
- Privacy Policy + Terms pages after legal review (bracketed placeholders in privacyDoc.js / termsDoc.js).
- Consent-gated analytics events (respect the cookie banner choices).
- Replace illustrated mockups with real product screenshots at launch.
- Re-scrape social share cards after deploy (WhatsApp/FB cache OG aggressively).

## Done 2026-10-21 (session 3)
- Google Ads logo fix, navbar dropdown perf fix, hero declutter + animated CTAs, Consistency fonts, Vision section, Affiliate program section, Blog (index + 12 articles + SEO + sitemap), GDPR/HIPAA/DPDP/CCPA badges.

## Done 2026-10-22 (sessions 4-15)
- Outcome 3D scenes, agency-loop bento grid, zero-friction waitlist/contact forms, integration detail pages, Waitlist Pulse live counter, GSAP+Lenis unified ticker, MongoDB hot-path indexes.

## Done 2026-10-22 (session 16)
- Six-section premium polish: integrations strip (status module + sync rail + donut + build progress), how-it-works crossfade load fix (Scene3D onReady), calculator savings-ring redesign (+ shared useTween hook), promise cards + commitments ticker, agency-loop auto-cycling highlight + count-up stats + cycling AI chat, sample-report count-up KPIs + self-drawing trend chart. Iteration 21: backend 19/19, frontend 100%.

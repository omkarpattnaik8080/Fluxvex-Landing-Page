# Fluxvex — Roadmap

## P0 (next)
- Deploy the site; turn ON "Enable Search Engine Crawling and Optimisation"; verify canonical/sitemap/og + Googlebot & AI-crawler UAs on the live domain (preview-only until then).
- Submit sitemap in Google Search Console once live.

## P1
- Google Sheets sync for waitlist/contact: user provides Apps Script /exec URL → set GOOGLE_SHEETS_WEBAPP_URL env (backend support already built).
- Rate limiting via X-Forwarded-For behind the Kubernetes ingress (current in-memory bucket keys on a shared IP).
- Switch server.py email fields to Pydantic EmailStr.

## P2
- Privacy Policy + Terms pages after legal review.
- /integrations detail pages (Google Ads, Meta Ads, GA4 — later LinkedIn/TikTok "coming soon") with animated diagrams.
- Consent-gated analytics events (respect the cookie banner choices).
- Replace illustrated mockups with real product screenshots at launch.
- Re-scrape social share cards after deploy (WhatsApp/FB cache OG aggressively).

## Done 2026-10-21 (session 3)
- Google Ads logo fix, navbar dropdown perf fix, hero declutter + animated CTAs, Consistency fonts, Vision section, Affiliate program section, Blog (index + 12 articles + SEO + sitemap), GDPR/HIPAA/DPDP/CCPA badges.

## Added P2
- Launch countdown timer beside the locked prices (curiosity hook).
- Affiliate program page (/partners) if the section outgrows the homepage block.

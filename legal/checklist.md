# Fluxvex Legal Publication Checklist

Use this internal checklist with `fluxvex-privacy-policy.md` and `fluxvex-terms-and-conditions.md`. **Do not publish the policies with unresolved bracketed text.**

## Business identity and contacts
- [ ] Confirm the full legal entity that owns and operates Fluxvex (not just the brand name).
- [ ] Confirm registered address, country of incorporation, and the correct contracting entity on invoices.
- [ ] Create and test `privacy@fluxvex.com`, `legal@fluxvex.com`, and `security@fluxvex.com` or substitute real monitored aliases.
- [ ] Identify any required privacy/grievance contact or DPO and publish the correct details.
- [ ] Set the policy effective dates only when the final text is approved and live.

## Data flow and vendors
- [ ] Map every data category from collection to storage, use, disclosure, and deletion.
- [ ] List actual hosting, database, authentication, email, payment, support, analytics, error monitoring, and AI subprocessors.
- [ ] Record which countries/regions each provider uses and identify any transfer mechanism required for cross-border data.
- [ ] Confirm whether report files are stored, where they are stored, and whether public/shareable report links exist.
- [ ] Confirm handling and expiration of OAuth access tokens, refresh tokens, logs, caches, reports, exports, and backups.
- [ ] Make sure the production app's data deletion process matches policy language.

## Integrations and AI
- [ ] Confirm the exact Google Ads / GA4 / Meta Ads API scopes requested by the released product.
- [ ] Confirm the OAuth consent screen names the real operator, the data accessed, and the purpose.
- [ ] Review Google's API Services User Data Policy and Limited Use requirements before public OAuth release.
- [ ] Decide whether launch has AI features. If yes, identify provider(s), prompts/context sent, whether the feature is optional, provider retention, model-training behavior, and any customer controls.
- [ ] Never send Google API data to AI providers unless the use is disclosed, permitted by provider policy, and properly authorized.
- [ ] Confirm customer instructions, agency responsibility for client permissions, and incident-assistance duties in a DPA.

## Cookies, tracking, and marketing
- [ ] Scan the deployed website for cookies, local storage, analytics tags, embedded media, session-replay tools, pixels, and retargeting.
- [ ] Make the cookie banner match the actual tools. Implement accept, reject, granular settings, persistent preferences, and a visible route to reopen preferences where required.
- [ ] Confirm whether the no-sale/no-sharing statement is accurate under applicable California definitions and the site's actual tags.
- [ ] Ensure marketing signup consent and unsubscribe behavior satisfy applicable laws in the target market.

## Security and compliance claims
- [ ] Document actual security controls and ensure the security section describes only implemented, evidenced practices.
- [ ] Do not state ISO/IEC 27001 certification, SOC 2 completion, “GDPR certified,” “CCPA certified,” or “DPDP compliant” without substantiation and proper scope.
- [ ] Confirm incident-response, breach assessment, notification, and customer communication procedures.
- [ ] Review requirements and phased commencement under India's DPDP Act/Rules as of launch; maintain an implementation plan for obligations not yet applicable.
- [ ] Have qualified counsel review GDPR/UK GDPR, California and other applicable US state laws, Australian Privacy Act/APPs, PIPEDA and applicable provincial laws, Singapore PDPA, Indian DPDP Act/Rules, and cross-border transfer practices.

## Commercial terms
- [ ] Confirm waitlist signup remains free and does not initiate billing.
- [ ] Review governing law/venue, liability cap for unpaid accounts, carve-outs, indemnity, and consumer protection language with counsel.
- [ ] Before charging customers, publish clear prices, billing periods, plan limits, renewals, taxes, cancellation, and refunds.
- [ ] Decide support hours and any service levels before mentioning them publicly.
- [ ] Confirm account close, customer export, return/deletion of Customer Data, and backup expiry work as stated.

## Recommended site routes
- `/privacy-policy`
- `/terms`
- `/cookie-policy` (once the actual cookie inventory is known)
- `/dpa` (after a reviewed Data Processing Addendum is ready)
- `/subprocessors` (or the equivalent section within the Privacy Policy)

/* Config for the /integrations/:slug detail pages */
export const INTEGRATIONS = [
  {
    slug: "google-ads",
    name: "Google Ads",
    mark: "googleAds",
    metaTitle: "Google Ads Integration — Client Reports on Autopilot | Fluxvex",
    description:
      "Connect Google Ads to Fluxvex and turn campaigns, ad groups, and search-term data into branded client reports—AI-drafted, approved by you, delivered on schedule.",
    tagline: "Every campaign, ad group, and search term—flowing into your client's report automatically.",
    heroChips: ["Campaigns & ad groups", "Conversions & CPA", "Search terms"],
    stats: [
      { icon: "campaign", text: "Campaign, ad group, and keyword performance with period-over-period deltas" },
      { icon: "target", text: "Conversions, cost per result, and ROAS—headline numbers first" },
      { icon: "clicks", text: "Search-term insights in the appendix, where the detail-minded stakeholder lives" },
      { icon: "globe", text: "Geo and device splits that explain why a number moved, not just that it moved" },
    ],
    diagramLabels: ["Google Ads data", "AI drafts the summary", "Branded report out"],
    steps: [
      { icon: "link", title: "Connect via Google OAuth", desc: "Authorize read-only reporting scopes for the accounts you manage. Minutes, not an implementation project." },
      { icon: "wand", title: "Fluxvex builds the report", desc: "Your structure, your brand—with an AI-drafted summary and anomaly flags your team reviews before sending." },
      { icon: "clock", title: "Delivered every cycle", desc: "Branded reports land on schedule—alongside Meta Ads and GA4 data in the same document." },
    ],
    faqs: [
      ["What access does Fluxvex need to Google Ads?", "Read-only reporting scopes via OAuth—enough to pull campaign performance, never enough to change budgets, bids, or campaigns."],
      ["Can I combine Google Ads with other channels?", "Yes. Google Ads, Meta Ads, and GA4 feed the same branded report, so your client gets one story instead of three exports."],
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    mark: "meta",
    metaTitle: "Meta Ads Integration — One Branded Client Report | Fluxvex",
    description:
      "Connect Meta Ads to Fluxvex and turn placement and creative results into one branded client report—AI-drafted summaries, approved by your team, delivered on schedule.",
    tagline: "Delivery and creative results across Meta placements—in one branded report instead of five screenshots.",
    heroChips: ["Results & cost per result", "ROAS & spend pacing", "Creative breakdowns"],
    stats: [
      { icon: "target", text: "Results, cost per result, and ROAS trended against the previous period" },
      { icon: "campaign", text: "Spend pacing against plan—clients forgive misses, not surprises" },
      { icon: "clicks", text: "Placement and creative breakdowns that explain what changed" },
      { icon: "gauge", text: "Frequency and audience-quality notes only when they explain a move" },
    ],
    diagramLabels: ["Meta Ads data", "AI drafts the summary", "Branded report out"],
    steps: [
      { icon: "link", title: "Connect via Meta OAuth", desc: "Authorize read-only access to the ad accounts you manage. Disconnect anytime, no strings." },
      { icon: "wand", title: "Fluxvex builds the report", desc: "Fixed structure applied to every account—results, spend, changes, next steps—in your brand." },
      { icon: "clock", title: "Delivered every cycle", desc: "Meta performance lands in the same branded report as Google Ads and GA4. One story." },
    ],
    faqs: [
      ["What access does Fluxvex need to Meta Ads?", "Read-only reporting access via OAuth. Fluxvex can read performance data—it cannot edit campaigns, budgets, or creatives."],
      ["Will clients see Meta's branding anywhere?", "No. Reports carry your agency's brand end to end—the tool stays invisible."],
    ],
  },
  {
    slug: "ga4",
    name: "Google Analytics 4",
    mark: "ga4",
    metaTitle: "GA4 Integration — Agency Client Reports | Fluxvex",
    description:
      "Connect GA4 to Fluxvex and translate acquisition, engagement, and conversion data into plain-language client reports—branded, AI-drafted, delivered on schedule.",
    tagline: "The on-site story behind the ad performance—translated into your client's language.",
    heroChips: ["Acquisition & channels", "Engagement & landing pages", "Key events & conversions"],
    stats: [
      { icon: "globe", text: "Acquisition by channel first, source detail in the appendix where it belongs" },
      { icon: "clicks", text: "Engagement and landing pages that show whether traffic was worth its cost" },
      { icon: "target", text: "Key events mapped to the client's business, trended versus last period" },
      { icon: "gauge", text: "Audience quality—new versus returning, and the segments that convert" },
    ],
    diagramLabels: ["GA4 data", "AI drafts the summary", "Branded report out"],
    steps: [
      { icon: "link", title: "Connect the GA4 property", desc: "Authorize read-only access to the properties you manage. The translation layer does the rest." },
      { icon: "wand", title: "Fluxvex translates it", desc: "GA4 vocabulary becomes client sentences—AI-drafted summaries your strategists review and approve." },
      { icon: "clock", title: "Delivered every cycle", desc: "The on-site story arrives in the same branded report as your ad channels. One narrative." },
    ],
    faqs: [
      ["Do clients need to understand GA4 to read the report?", "No. The report speaks the client's language—customers, cost, growth—with GA4 detail preserved in the appendix."],
      ["Which GA4 metrics make it into the report?", "The four that matter: acquisition, engagement, conversions/key events, and audience quality. Everything else stays in GA4."],
    ],
  },
];

export const getIntegration = (slug) => INTEGRATIONS.find((i) => i.slug === slug);

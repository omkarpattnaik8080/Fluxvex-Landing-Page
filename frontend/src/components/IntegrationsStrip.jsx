import { Reveal } from "@/components/Reveal";
import CinematicText from "@/components/ui/CinematicText";
import { GoogleAdsMark, MetaMark, GA4Mark, LinkedInMark, TikTokMark } from "@/components/brand/IntegrationMarks";

const LIVE = [
  {
    mark: <GoogleAdsMark size={22} />,
    name: "Google Ads",
    desc: "Campaign performance data from the channels you manage.",
    soon: false,
  },
  {
    mark: <MetaMark size={22} />,
    name: "Meta Ads",
    desc: "Delivery and creative results across Meta placements.",
    soon: false,
  },
  {
    mark: <GA4Mark size={22} />,
    name: "Google Analytics 4",
    desc: "Site engagement and conversion context for the story.",
    soon: false,
  },
];

const SOON = [
  {
    mark: <LinkedInMark size={22} />,
    name: "LinkedIn Ads",
    desc: "B2B campaign reporting for a post-launch release.",
  },
  {
    mark: <TikTokMark size={22} />,
    name: "TikTok Ads",
    desc: "Short-form video results, after the initial launch.",
  },
];

function Card({ item, soon = false, i }) {
  return (
    <Reveal delay={i * 0.08} className="bg-page h-full">
      <div
        className={`flex h-full flex-col gap-3 p-6 ${soon ? "opacity-80" : ""}`}
        data-testid={`integration-card-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-start justify-between">
          <span className={`flex h-11 w-11 items-center justify-center rounded-lg border bg-surface ${soon ? "border-dashed border-black/20" : "border-line"}`}>
            {item.mark}
          </span>
          {soon ? (
            <span className="rounded-full border border-dashed border-black/25 bg-page px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/50" data-testid={`integration-soon-${item.name.toLowerCase().replace(/\s+/g, "-")}`}>
              Coming soon
            </span>
          ) : (
            <span className="mt-1 h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="text-[15px] font-semibold text-ink">{item.name}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{item.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function IntegrationsStrip() {
  return (
    <section id="integrations" className="bg-page" data-testid="section-integrations">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <CinematicText
              as="h2"
              className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-3xl"
            >
              One reporting workflow. The channels your clients already use.
            </CinematicText>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-accent" data-testid="integrations-qualifier">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              Initial integration focus
            </span>
          </Reveal>
          <div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {LIVE.map((item, i) => (
                <Card key={item.name} item={item} i={i} />
              ))}
            </div>
            <div className="mt-3 grid gap-px overflow-hidden rounded-xl border border-dashed border-black/20 bg-line sm:grid-cols-3">
              {SOON.map((item, i) => (
                <Card key={item.name} item={item} soon i={i} />
              ))}
              <Reveal delay={0.2} className="bg-page h-full">
                <div className="flex h-full flex-col justify-center p-6">
                  <p className="text-[13px] leading-relaxed text-ink-soft">
                    More channels land after launch. Join the waitlist and tell us which one your agency needs next.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";
import { GoogleAdsMark, MetaMark, GA4Mark } from "@/components/brand/IntegrationMarks";

const ITEMS = [
  {
    mark: <GoogleAdsMark size={22} />,
    name: "Google Ads",
    desc: "Campaign performance data from the channels you manage.",
  },
  {
    mark: <MetaMark size={22} />,
    name: "Meta Ads",
    desc: "Delivery and creative results across Meta placements.",
  },
  {
    mark: <GA4Mark size={22} />,
    name: "Google Analytics 4",
    desc: "Site engagement and conversion context for the story.",
  },
];

export default function IntegrationsStrip() {
  return (
    <section id="integrations" className="border-t border-hairline" data-testid="section-integrations">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-white sm:text-3xl">
              One reporting workflow. The channels your clients already use.
            </h2>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft" data-testid="integrations-qualifier">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              Initial integration focus
            </span>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {ITEMS.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1} className="bg-surface">
                <div className="flex h-full flex-col gap-3 p-6" data-testid={`integration-card-${item.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-elevated">
                    {item.mark}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/50">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

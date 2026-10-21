import { FluxvexMark } from "@/components/brand/FluxvexLogo";

const ITEMS = ["Client reporting, on autopilot", "Google Ads", "Meta Ads", "GA4"];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-hairline bg-ink py-6 sm:py-8" data-testid="marquee-band" aria-label="Fluxvex promise and initial integrations">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {ITEMS.map((t, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
                    i === 0 ? "text-white" : "text-outline"
                  }`}
                >
                  {t}
                </span>
                <FluxvexMark size={18} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

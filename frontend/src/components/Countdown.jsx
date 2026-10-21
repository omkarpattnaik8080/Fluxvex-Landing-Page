import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

/* Launch moment for the countdown beside the locked prices */
const LAUNCH_AT = new Date("2026-12-15T09:00:00Z");

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown({ className = "" }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, LAUNCH_AT.getTime() - now);
  const cells = [
    [Math.floor(diff / 86400000), "days", "d", false],
    [Math.floor((diff % 86400000) / 3600000), "hours", "h", true],
    [Math.floor((diff % 3600000) / 60000), "mins", "m", true],
    [Math.floor((diff % 60000) / 1000), "secs", "s", true],
  ];

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-tint/60 px-4 py-2 ${className}`}
      data-testid="countdown-timer"
      title="Countdown to launch pricing"
    >
      <Timer className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">Pricing unlocks in</span>
      <span className="flex items-center font-display text-sm font-semibold tabular-nums text-ink">
        {cells.map(([v, key, suffix, isPadded], i) => (
          <span key={key} className="flex items-center">
            <span data-testid={`countdown-${key}`} className="text-ink">
              {isPadded ? pad(v) : v}
            </span>
            <span className="text-black/40">{suffix}</span>
            {i < cells.length - 1 && <span className="mx-1 text-black/25">:</span>}
          </span>
        ))}
      </span>
    </span>
  );
}

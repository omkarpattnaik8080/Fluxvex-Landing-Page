import { motion } from "framer-motion";

const OPTIONS = [
  { key: "usd", label: "$ USD" },
  { key: "inr", label: "₹ INR" },
];

export function CurrencyToggle({ value, onChange }) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-surface p-1 shadow-[0_2px_10px_-4px_rgba(16,16,20,0.12)]"
      role="tablist"
      aria-label="Pricing currency"
      data-testid="currency-toggle"
    >
      {OPTIONS.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.key)}
            className="relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
            data-testid={`currency-toggle-${o.key}`}
          >
            {active && (
              <motion.span
                layoutId="currency-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span className={`relative transition-colors ${active ? "text-white" : "text-ink-soft hover:text-ink"}`}>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CurrencyToggle;

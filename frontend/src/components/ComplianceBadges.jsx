import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BADGES = [
  { key: "gdpr", label: "GDPR" },
  { key: "hipaa", label: "HIPAA" },
  { key: "dpdp", label: "DPDP" },
  { key: "ccpa", label: "CCPA" },
];

export default function ComplianceBadges({ className = "", delay = 0 }) {
  return (
    <Reveal y={14} delay={delay} className={className}>
      <ul className="flex flex-wrap items-center gap-2.5">
        {BADGES.map((b) => (
          <li
            key={b.key}
            className="flex items-center gap-1.5 rounded-full border border-mint/35 bg-mint/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E8A3E]"
            data-testid={`compliance-badge-${b.key}`}
          >
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
            {b.label} compliant
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

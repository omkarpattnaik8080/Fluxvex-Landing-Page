import { Reveal } from "@/components/Reveal";

/* Distinct certification-seal icons per regulation */
function SealGDPR() {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 drop-shadow-sm" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#123CA6" />
      <circle cx="18" cy="18" r="13.6" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      {[...Array(12)].map((_, i) => (
        <path
          key={i}
          d="M0 -2.1 L0.62 -0.62 2.1 0 0.62 0.62 0 2.1 -0.62 0.62 -2.1 0 -0.62 -0.62 Z"
          fill="#FFD617"
          transform={`translate(${18 + 13.6 * Math.cos((i * 30 - 90) * (Math.PI / 180))} ${18 + 13.6 * Math.sin((i * 30 - 90) * (Math.PI / 180))})`}
        />
      ))}
      <text x="18" y="21.4" textAnchor="middle" fontSize="8.4" fontWeight="800" fill="#FFFFFF" letterSpacing="0.4">
        GDPR
      </text>
    </svg>
  );
}

function SealHIPAA() {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 drop-shadow-sm" aria-hidden="true">
      <path d="M18 1.6 L32.6 6.8 V17 C32.6 25.4 26.6 30.9 18 34.4 C9.4 30.9 3.4 25.4 3.4 17 V6.8 Z" fill="#1E3A8A" />
      <path
        d="M18 4.6 L30 8.9 V17 C30 24 25 28.7 18 31.8 C11 28.7 6 24 6 17 V8.9 Z"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      <path d="M16.8 9.2h2.4v2.6h2.6v2.4h-2.6v2.6h-2.4v-2.6h-2.6v-2.4h2.6Z" fill="#FFFFFF" opacity="0.92" />
      <text x="18" y="22.8" textAnchor="middle" fontSize="7.6" fontWeight="800" fill="#FFFFFF" letterSpacing="0.3">
        HIPAA
      </text>
    </svg>
  );
}

function SealDPDP() {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 drop-shadow-sm" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#FFFFFF" stroke="rgba(16,16,20,0.12)" strokeWidth="0.8" />
      <path d="M2.4 18 a15.6 15.6 0 0 1 31.2 0 Z" fill="#F59B2E" />
      <path d="M33.6 18 a15.6 15.6 0 0 1 -31.2 0 Z" fill="#1E9E4B" />
      <circle cx="18" cy="18" r="10.4" fill="#FFFFFF" />
      <circle cx="18" cy="12.4" r="1.9" fill="none" stroke="#1B2A6B" strokeWidth="0.9" />
      <path d="M18 10.9 v3 M16.5 12.4 h3 M17 11.4 l2 2 M19 11.4 l-2 2" stroke="#1B2A6B" strokeWidth="0.5" />
      <text x="18" y="22.6" textAnchor="middle" fontSize="7.2" fontWeight="800" fill="#1B2A6B" letterSpacing="0.3">
        DPDP
      </text>
    </svg>
  );
}

function SealCCPA() {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 drop-shadow-sm" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#C9962E" />
      {[...Array(16)].map((_, i) => (
        <circle
          key={i}
          cx={18 + 17 * Math.cos(i * 22.5 * (Math.PI / 180))}
          cy={18 + 17 * Math.sin(i * 22.5 * (Math.PI / 180))}
          r="1.5"
          fill="#C9962E"
        />
      ))}
      <circle cx="18" cy="18" r="12.8" fill="#243B8B" />
      <path
        d="M18 8.2 L19.06 10.78 21.85 10.92 19.68 12.68 20.43 15.38 18 13.83 15.57 15.38 16.32 12.68 14.15 10.92 16.94 10.78 Z"
        fill="#F5D748"
      />
      <text x="18" y="23.8" textAnchor="middle" fontSize="7.4" fontWeight="800" fill="#F5D748" letterSpacing="0.3">
        CCPA
      </text>
    </svg>
  );
}

const BADGES = [
  { key: "gdpr", label: "GDPR", Seal: SealGDPR },
  { key: "hipaa", label: "HIPAA", Seal: SealHIPAA },
  { key: "dpdp", label: "DPDP", Seal: SealDPDP },
  { key: "ccpa", label: "CCPA", Seal: SealCCPA },
];

export default function ComplianceBadges({ className = "", delay = 0 }) {
  return (
    <Reveal y={14} delay={delay} className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {BADGES.map(({ key, label, Seal }) => (
          <li
            key={key}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-2 pr-4 shadow-[0_10px_24px_-14px_rgba(16,16,20,0.35)]"
            data-testid={`compliance-badge-${key}`}
            title={`${label} compliance badge`}
          >
            <Seal />
            <span className="flex flex-col leading-none">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink">{label}</span>
              <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#0E8A3E]">Compliant</span>
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

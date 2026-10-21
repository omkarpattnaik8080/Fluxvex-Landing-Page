export function GoogleAdsMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="11.2" y="1.6" width="7.6" height="20.5" rx="3.8" transform="rotate(30 15 12)" fill="#F9AB00" />
      <rect x="9.2" y="1.6" width="7.6" height="20.5" rx="3.8" transform="rotate(-30 13 12)" fill="#4285F4" />
      <circle cx="7.2" cy="21.4" r="4.1" fill="#34A853" />
    </svg>
  );
}

export function MetaMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M3.5 15.8C3.5 11 6 8.2 8.6 8.2c1.9 0 3.3 1.2 5.4 4.8 2.1-3.6 3.5-4.8 5.4-4.8 2.6 0 5.1 2.8 5.1 7.6"
        stroke="#0866FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3.5 15.8c0 3 1.6 4.6 3.3 4.6 1.9 0 3.2-1.4 7.2-7.4"
        stroke="#0866FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M24.5 15.8c0 3-1.6 4.6-3.3 4.6-1.9 0-3.2-1.4-7.2-7.4"
        stroke="#0866FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GA4Mark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="16" width="5.4" height="8" rx="2" fill="#F9AB00" />
      <rect x="11.3" y="10" width="5.4" height="14" rx="2" fill="#F29900" />
      <rect x="18.6" y="4" width="5.4" height="20" rx="2" fill="#E8710A" />
    </svg>
  );
}

export default { GoogleAdsMark, MetaMark, GA4Mark };

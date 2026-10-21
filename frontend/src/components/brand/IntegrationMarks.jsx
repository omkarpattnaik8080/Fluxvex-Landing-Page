export function GoogleAdsMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 -13 256 256" fill="none" aria-hidden="true">
      <path
        d="M5.888 166.405103 L90.88 20.9 C101.676138 27.2558621 156.115862 57.3844138 164.908138 63.1135172 L79.9161379 208.627448 C70.6206897 220.906621 -5.888 185.040138 5.888 166.396276 L5.888 166.405103 Z"
        fill="#FBBC04"
      />
      <path
        d="M250.084224 166.401789 L165.092224 20.9055131 C153.210293 1.13172 127.619121 -6.05393517 106.600638 5.62496138 C85.582155 17.3038579 79.182155 42.4624786 91.0640861 63.1190303 L176.056086 208.632961 C187.938017 228.397927 213.52919 235.583582 234.547672 223.904686 C254.648086 212.225789 261.966155 186.175582 250.084224 166.419444 L250.084224 166.401789 Z"
        fill="#4285F4"
      />
      <ellipse fill="#34A853" cx="42.6637241" cy="187.924414" rx="42.6637241" ry="41.6044138" />
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

export function LinkedInMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#0A66C2" />
      <path
        d="M8.2 11.2h3v9h-3v-9Zm1.5-4.7a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM13.4 11.2h2.9v1.3c.4-.75 1.4-1.55 2.9-1.55 3.1 0 3.7 2 3.7 4.7v4.55h-3v-4.05c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.25v4.1h-2.9v-9Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function TikTokMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#111111" />
      <path
        d="M17.9 7h-2.6v10.4a2.2 2.2 0 1 1-2.2-2.2c.2 0 .5 0 .7.1v-2.7a4.9 4.9 0 1 0 4.2 4.85V12a5.6 5.6 0 0 0 3.2 1v-2.6A3.3 3.3 0 0 1 17.9 7Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default { GoogleAdsMark, MetaMark, GA4Mark, LinkedInMark, TikTokMark };

/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#000000',
        surface: '#0B0B0B',
        elevated: '#111111',
        line: '#374151',
        hairline: '#1F2937',
        paper: '#F4F2ED',
        paperline: '#E2DFD6',
        accent: { DEFAULT: '#0099FF', soft: '#66C2FF', strong: '#1AABFF', deep: '#001A2B' },
      },
      letterSpacing: {
        tightest: '-0.055em',
        tighter2: '-0.045em',
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
        lg: '8px',
        md: '6px',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'dash-flow': { to: { strokeDashoffset: '-28' } },
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 48s linear infinite',
        'dash-flow': 'dash-flow 1.4s linear infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};

import { useEffect, useRef } from "react";
import gsap from "gsap";

function ProductHuntMark() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DA552F] text-[13px] font-bold leading-none text-white" aria-hidden="true">
      P
    </span>
  );
}

function StartupBaseMark() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0B0B0D] text-[12px] font-bold leading-none text-white" aria-hidden="true">
      S
    </span>
  );
}

function AwsMark() {
  return (
    <span className="flex h-6 flex-col items-center justify-center leading-none" aria-hidden="true">
      <span className="text-[13px] font-extrabold tracking-tighter text-[#232F3E]">aws</span>
      <svg width="26" height="6" viewBox="0 0 26 6" fill="none">
        <path d="M1 1.5c7 4.5 17 4.5 24-1" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 .6l3.4.9-2.3 2.6" fill="none" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function MicrosoftMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
      <rect width="8" height="8" fill="#F25022" />
      <rect x="10" width="8" height="8" fill="#7FBA00" />
      <rect y="10" width="8" height="8" fill="#00A4EF" />
      <rect x="10" y="10" width="8" height="8" fill="#FFB900" />
    </svg>
  );
}

function SarvamMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="12" cy="7" rx="2.6" ry="5" transform={`rotate(${a} 12 12)`} stroke="#3D43E8" strokeWidth="1.6" />
      ))}
    </svg>
  );
}

const BACKERS = [
  { name: "Product Hunt", mark: <ProductHuntMark /> },
  { name: "StartupBase", mark: <StartupBaseMark /> },
  { name: "AWS Startups", mark: <AwsMark /> },
  { name: "Microsoft Azure Startups", mark: <MicrosoftMark /> },
  { name: "Sarvam", mark: <SarvamMark /> },
];

export default function BackersBand() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.set(track, { force3D: true });
    const tween = gsap.to(track, { xPercent: -50, duration: 32, ease: "none", repeat: -1 });
    tweenRef.current = tween;
    return () => {
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  const slow = () => tweenRef.current && gsap.to(tweenRef.current, { timeScale: 0.18, duration: 0.5, overwrite: true });
  const resume = () => tweenRef.current && gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, overwrite: true });

  return (
    <section
      className="border-y border-line bg-page"
      data-testid="backers-band"
      aria-label="Programs and platforms Fluxvex is part of"
      onMouseEnter={slow}
      onMouseLeave={resume}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 lg:w-48">
          Backed by industry leaders
        </p>
        <div className="relative flex-1 overflow-hidden">
          <div ref={trackRef} className="flex w-max items-center will-change-transform">
            {[0, 1].map((dup) => (
              <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
                {BACKERS.map((b) => (
                  <span key={`${dup}-${b.name}`} className="flex items-center gap-2.5 px-7" data-testid={`backer-${b.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    {b.mark}
                    <span className="whitespace-nowrap text-[15px] font-semibold text-ink/75">{b.name}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-page to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-page to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

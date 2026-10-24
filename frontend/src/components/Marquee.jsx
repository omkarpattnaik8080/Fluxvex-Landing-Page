import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FluxvexMark } from "@/components/brand/FluxvexLogo";

const ITEMS = ["Client reporting, on autopilot", "Google Ads", "Meta Ads", "GA4"];

export default function Marquee() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.set(track, { force3D: true });
    const tween = gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
    tweenRef.current = tween;
    /* An infinite transform tween repaints this band on every single frame of
       the page's life. Off screen it buys nothing and costs a frame slice, so
       it only runs while the band is actually in view. */
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tween.play() : tween.pause()));
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => {
      io.disconnect();
      tween.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  const slow = () => tweenRef.current && gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.5, overwrite: true });
  const resume = () => tweenRef.current && gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, overwrite: true });

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden border-b border-line bg-page py-6 sm:py-8"
      data-testid="marquee-band"
      aria-label="Fluxvex promise and initial integrations"
      onMouseEnter={slow}
      onMouseLeave={resume}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {ITEMS.map((t, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
                    i === 0 ? "text-ink" : "text-outline"
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

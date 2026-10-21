import { Link } from "react-router-dom";
import { FluxvexLogo } from "@/components/brand/FluxvexLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6 pt-20 text-center" data-testid="not-found-page">
      <FluxvexLogo tone="ink" size={24} />
      <p className="mt-10 font-display text-7xl font-semibold tracking-tightest text-black/10">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">This page doesn’t exist.</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
        The link may be outdated. The full product story lives on the homepage.
      </p>
      <Link to="/" className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong" data-testid="not-found-home-link">
        Back to the homepage
      </Link>
    </div>
  );
}

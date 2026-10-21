import { FluxvexLogo } from "@/components/brand/FluxvexLogo";
import Seo from "@/components/Seo";
import TapCTA from "@/components/ui/TapCTA";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6 pt-20 text-center" data-testid="not-found-page">
      <Seo title="Page not found — Fluxvex" description="The page you are looking for doesn’t exist. Head back to the Fluxvex homepage." path="/404" noindex />
      <FluxvexLogo tone="ink" size={24} />
      <p className="mt-10 font-display text-7xl font-semibold tracking-tightest text-black/10">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">This page doesn’t exist.</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
        The link may be outdated. The full product story lives on the homepage.
      </p>
      <TapCTA
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
        testid="not-found-home-link"
      >
        Back to the homepage
      </TapCTA>
    </div>
  );
}

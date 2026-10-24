import { Component, lazy, Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { WaitlistProvider } from "@/components/WaitlistContext";
import { emitPostScrollFrame } from "@/components/three/frameBus";
import Home from "@/pages/Home";

/* Route-level code splitting — keeps the landing page bundle lean */
const Pricing = lazy(() => import("@/pages/Pricing"));
const Contact = lazy(() => import("@/pages/Contact"));
const Security = lazy(() => import("@/pages/Security"));
const Partners = lazy(() => import("@/pages/Partners"));
const Team = lazy(() => import("@/pages/Team"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Integration = lazy(() => import("@/pages/Integration"));
const Careers = lazy(() => import("@/pages/Careers"));
const AdminJobs = lazy(() => import("@/pages/AdminJobs"));

const PageLoader = () => (
  <div className="flex min-h-[70vh] items-center justify-center bg-page" aria-label="Loading page">
    <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-accent border-t-transparent" />
  </div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
          <div>
            <p className="font-display text-2xl font-semibold text-white">Something went wrong.</p>
            <p className="mt-2 text-sm text-white/50">Please refresh the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* Pre-warm the 3D scene chunk immediately — starting the download with the
     first frame (instead of on idle) means illustrations are already mounted,
     or fade in within a beat, long before the user reaches any 3D section.
     webpackPrefetch additionally hints the browser to fetch during idle time. */
  useEffect(() => {
    const warm = () => {
      import(/* webpackPrefetch: true */ "@/components/three/Scene3D").catch(() => {});
      import(/* webpackPrefetch: true */ "@/components/three/SceneCanvas").catch(() => {});
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(warm));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    /* lerp 0.11 took ~25 frames to settle, which reads as the page "sliding"
       after the user has stopped — the most common complaint about smooth
       scroll. 0.16 keeps the glide but responds immediately. */
    const lenis = new Lenis({ lerp: 0.16, smoothWheel: true, wheelMultiplier: 1 });
    /* One rAF for everything: GSAP ticker drives Lenis so scroll + marquees
       update in the same frame — no competing loops, no mid-frame jank. */
    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const path = href.slice(0, hashIndex);
      if (path && path !== "/" && path !== "") return;
      const id = href.slice(hashIndex + 1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      gsap.ticker.remove(rafFn);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  /* Added to the ticker AFTER the Lenis callback above, so it fires once this
     frame's scroll position is already written to the DOM. The 3D canvas
     renders from here instead of its own rAF — drawing before the scroll was
     applied left every illustration a frame behind the card it sits in, which
     looked like the illustrations sliding out of place while scrolling.
     Runs with reduced motion too (where Lenis is skipped). */
  useEffect(() => {
    const tick = (time) => emitPostScrollFrame(time);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, []);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollManager />
        <WaitlistProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/security" element={<Security />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/team" element={<Team />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/integrations/:slug" element={<Integration />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </WaitlistProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

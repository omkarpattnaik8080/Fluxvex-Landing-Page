import { Component, lazy, Suspense, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { WaitlistProvider } from "@/components/WaitlistContext";
import Home from "@/pages/Home";

/* Route-level code splitting — keeps the landing page bundle lean */
const Pricing = lazy(() => import("@/pages/Pricing"));
const Contact = lazy(() => import("@/pages/Contact"));
const Security = lazy(() => import("@/pages/Security"));
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
     or fade in within a beat, long before the user reaches any 3D section. */
  useEffect(() => {
    const warm = () => {
      import("@/components/three/Scene3D").catch(() => {});
      import("@/components/three/SceneCanvas").catch(() => {});
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(warm));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
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

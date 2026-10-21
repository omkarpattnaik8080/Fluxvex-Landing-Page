import { Component, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { WaitlistProvider } from "@/components/WaitlistContext";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Security from "@/pages/Security";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

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

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
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
      cancelAnimationFrame(raf);
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WaitlistProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

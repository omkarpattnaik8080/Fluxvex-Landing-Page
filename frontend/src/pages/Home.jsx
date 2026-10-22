import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import IntegrationsStrip from "@/components/IntegrationsStrip";
import Testimonial from "@/components/Testimonial";
import Problem from "@/components/Problem";
import Outcome from "@/components/Outcome";
import HowItWorks from "@/components/HowItWorks";
import FeatureGrid from "@/components/FeatureGrid";
import Showcase from "@/components/Showcase";
import Platform from "@/components/Platform";
import AiComparison from "@/components/AiComparison";
import RoiCalculator from "@/components/RoiCalculator";
import Consistency from "@/components/Consistency";
import SecuritySection from "@/components/SecuritySection";
import PricingPreview from "@/components/PricingPreview";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import BackersBand from "@/components/BackersBand";
import Vision from "@/components/Vision";
import Affiliate from "@/components/Affiliate";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";

/* Shared WebGL layer for the Iso3D scenes — lazy so three.js stays out of the main bundle */
const SceneCanvas = lazy(() => import("@/components/three/SceneCanvas"));

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Suspense fallback={null}>
        <SceneCanvas />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <IntegrationsStrip />
        <Problem />
        <Outcome />
        <HowItWorks />
        <Showcase />
        <Platform />
        <FeatureGrid />
        <AiComparison />
        <Consistency />
        <RoiCalculator />
        <Testimonial />
        <Vision />
        <SecuritySection />
        <PricingPreview />
        <Faq />
        <Affiliate />
        <FinalCta />
        <BackersBand />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

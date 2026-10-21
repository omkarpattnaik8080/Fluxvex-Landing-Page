import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import IntegrationsStrip from "@/components/IntegrationsStrip";
import Testimonial from "@/components/Testimonial";
import Problem from "@/components/Problem";
import Outcome from "@/components/Outcome";
import FeatureGrid from "@/components/FeatureGrid";
import Showcase from "@/components/Showcase";
import Platform from "@/components/Platform";
import AiComparison from "@/components/AiComparison";
import HowItWorks from "@/components/HowItWorks";
import RoiCalculator from "@/components/RoiCalculator";
import Consistency from "@/components/Consistency";
import SecuritySection from "@/components/SecuritySection";
import PricingPreview from "@/components/PricingPreview";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Seo from "@/components/Seo";

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <IntegrationsStrip />
        <Testimonial />
        <Problem />
        <Outcome />
        <FeatureGrid />
        <Showcase />
        <Platform />
        <AiComparison />
        <HowItWorks />
        <RoiCalculator />
        <Consistency />
        <SecuritySection />
        <PricingPreview />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

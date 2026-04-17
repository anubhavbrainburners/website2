import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./sections/HeroSection";
import GrowthSection from "./sections/GrowthSection";
import ServiceSection from "./sections/ServiceSection";
import TestimonialSection from "./sections/TestimonialSection";
import BuyNowButton from "./components/portfolio-select/BuyNowButton";

export default function HomePage() {
  return (
    <div className="page-canvas">
      <Navbar />
      <main className="relative z-10 mb-16 space-y-10 md:mt-10 md:space-y-36">
        <HeroSection />
        <GrowthSection />
        <ServiceSection />
        <TestimonialSection />
      </main>
      <Footer />
      <BuyNowButton />
    </div>
  );
}

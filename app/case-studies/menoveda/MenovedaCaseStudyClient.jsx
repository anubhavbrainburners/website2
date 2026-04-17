"use client";

;
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "../../components/Footer";
import GrowthStrategySection from "./components/GrowthStrategySection";
import HeroOverviewSection from "./components/HeroOverviewSection";
import PerformanceResultsSection from "./components/PerformanceResultsSection";
import { SectionDivider } from "./components/shared";

export default function MenovedaCaseStudyClient() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 78, damping: 28, mass: 1.1 });
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 420);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#f9fcf4_0%,#eef4e8_42%,#e6efe0_100%)] text-[#1f352b]">
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#3f765b] via-[#87ae98] to-[#e2d4b7]"
        style={{ scaleX: progress }}
      />

      <main className="relative overflow-hidden px-4 pb-28 pt-6 md:px-6 md:pb-36">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-70"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 34, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(42rem 350rem at 10% 10%, rgba(132,178,154,0.18), transparent 72%), radial-gradient(34rem 28rem at 86% 12%, rgba(224,204,168,0.18), transparent 74%), radial-gradient(34rem 32rem at 50% 78%, rgba(111,149,129,0.1), transparent 72%)",
            backgroundSize: "180% 180%"
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(12,26,19,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(12,26,19,0.35) 1px, transparent 1px)",
            backgroundSize: "4px 4px"
          }}
        />
        <motion.div
          className="pointer-events-none absolute -left-24 top-16 h-[26rem] w-[26rem] rounded-full bg-[#9ebca2]/35 blur-3xl"
          style={{ y: bgShift, scale: bgScale }}
        />
        <motion.div
          className="pointer-events-none absolute -right-24 top-28 h-[30rem] w-[30rem] rounded-full bg-[#ddc9a8]/28 blur-3xl"
          style={{ y: bgShift, scale: bgScale }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px]">
          <Navbar/>
          <HeroOverviewSection />
          <SectionDivider />
          <GrowthStrategySection />
          <SectionDivider />
          <PerformanceResultsSection />
          <div className="pt-20">
          <Footer />
          </div>
        </div>
      </main>
      

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            type="button"
            aria-label="Scroll to top"
            onClick={scrollToTop}
            className="fixed bottom-6 right-5 z-50 rounded-full border border-[#2f5a48]/25 bg-[#1f4536] p-3 text-[#f5f7ed] shadow-[0_14px_32px_rgba(20,38,30,0.34)] backdrop-blur-sm transition-colors hover:bg-[#18392d] md:bottom-8 md:right-8"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 18V6" />
              <path d="M6.75 11.25 12 6l5.25 5.25" />
            </svg>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

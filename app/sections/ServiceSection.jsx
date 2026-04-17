"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import FeatureCard from "../components/FeatureCard";
import Button from "../components/Button";
import { staggerWrap } from "../animations/variants";

const services = [
  {
    tag: "STRATEGY FIRST",
    title: "Founder-Led Website Planning",
    description:
      "We map your pages, user flow, and offers before design  so the site sells, not just looks good.",
    image: "/services/image-1.png",
  },
  {
    tag: "DESIGN THAT CAPTURES",
    title: "UI Built to Hold Attention",
    description:
      "Layouts structured to guide visitors step-by-step toward action, not confusion.",
    image: "/services/image-2.png",
  },
  {
    tag: "PROVEN STRUCTURES",
    title: "You choose, We implement.",
    description:
      "Conversion frameworks tested across industries  adapted to your business.",
    image: "/services/image-3.png",
  },
  {
    tag: "COPY THAT CONVERTS",
    title: "Words engineered to sell",
    description:
      "Headlines, sections, and CTAs written using buyer psychology and decision triggers.",
    image: "/services/image-4.png",
  },
  {
    tag: "VISUALS THAT BUILD TRUST",
    title: "Premium, Modern Presentation",
    description:
      "Clean visuals, spacing, and hierarchy that position you as the obvious choice.",
    image: "/services/image-5.png",
  },
  {
    tag: "OPTIMIZED, NOT JUST BUILT",
    title: "Designed around real behaviour",
    description:
      "Every section placed based on how users scan, read, and decide online.",
    image: "/services/image-6.png",
  },
];

export default function ServiceSection() {
  const reelsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: reelsRef,
    offset: ["start 92%", "end 12%"],
  });

  const leftY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -260]), {
    stiffness: 60,
    damping: 35,
    mass: 0.8,
    restDelta: 0.5,
  });

  const middleY = useSpring(useTransform(scrollYProgress, [0, 1], [60, -150]), {
    stiffness: 55,
    damping: 38,
    mass: 0.85,
    restDelta: 0.5,
  });

  const rightY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -320]), {
    stiffness: 60,
    damping: 35,
    mass: 0.8,
    restDelta: 0.5,
  });

  const yByIndex = [leftY, middleY, rightY];

  return (
    <section
      id="service"
      className="relative space-y-16 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1600px] md:space-y-24"
    >
      <div className="space-y-10">
        <div className="mx-auto mt-24 max-w-md space-y-5 text-center md:max-w-screen-md md:space-y-8">
          <AnimatedSection>
            <p className="text-sm-semibold from-secondary via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent md:text-xl">
              WE BUILD
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.16}>
            <h2 className="text-h1 text-[#f5f5f5] md:text-display">
              High Converting{" "}
              <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
                Websites
              </span>{" "}
              for you.
            </h2>
          </AnimatedSection>
        </div>

        <div className="h-24 md:h-36" />
        <div
          ref={reelsRef}
          className="flex justify-center gap-0 pb-8 md:gap-16 md:pb-12"
        >
          {["/reels/reel-1.mp4", "/reels/reel-2.mp4", "/reels/reel-3.mp4"].map(
            (video, index) => (
              <motion.div
                key={video}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.12,
                  delay: index * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${index === 1 ? "z-10" : "z-0"}`}
                style={{ y: yByIndex[index] }}
              >
                <div
                  className={`relative flex aspect-[3/5] w-32 items-center justify-center overflow-hidden rounded-lg shadow-lg md:w-60 ${
                    index === 0
                      ? "-rotate-3"
                      : index === 1
                        ? "rotate-[4deg]"
                        : "-rotate-2"
                  }`}
                >
                  <video
                    src={video}
                    autoPlay
                    playsInline
                    loop
                    muted
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            ),
          )}
        </div>

        <div className="flex justify-center pb-6 md:pb-8 mt-20">
          <a href="/portfolio">
            <Button variant="secondary" className="h-12 px-10 text-base">
              Our Work
            </Button>
          </a>
        </div>
      </div>

      <motion.div
        variants={staggerWrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="space-y-10 px-6 md:px-10"
      >
        {services.map((service) => (
          <FeatureCard key={service.title} item={service} />
        ))}
      </motion.div>

      <div className="relative !mt-8 pt-20 pb-10 md:pb-14">
        <div className="bg-accent/50 absolute bottom-40 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl" />
        <AnimatedSection className="mx-auto max-w-md space-y-6 px-6 text-center md:max-w-screen-md md:py-20">
          <p className="mx-auto max-w-[92vw] text-xl md:max-w-xl">
            Master the exact systems elite creators use to scale fast and
            monetize their brands without chasing trends.
          </p>
          <a
            href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-6">Get in touch now</Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

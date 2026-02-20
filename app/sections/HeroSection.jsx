"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import Button from "../components/Button";

export default function HeroSection() {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start 92%", "end 10%"],
  });

  const zoomRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  const zoom = useSpring(zoomRaw, { stiffness: 110, damping: 24, mass: 0.25 });

  return (
    <section className="relative mx-auto max-w-screen-md px-6 text-center lg:px-0">
      <div className="glow-left" />
      <div className="glow-right" />

      <div className="pt-2 md:pt-0">
        <AnimatedSection>
          <h1 className="text-h1  text-[#f5f5f5] md:text-display mx-auto max-w-md tracking-tight md:max-w-none">
            We build websites that turn visitors into clients on{" "}
            <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
              autopilot.
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <p className="mx-auto mt-8 max-w-[92vw] text-xl md:mt-10 md:max-w-xl md:text-lg">
            Our team designs conversion-focused websites that capture attention,
            build trust, and generate enquiries without constant marketing
            effort.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <a
            href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-12 h-12 md:h-14">Book a Strategy Call</Button>
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-12 flex justify-center gap-4">
            <div className="flex">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="-ml-2 size-6 overflow-hidden rounded-full"
                >
                  <Image
                    src={`/people${item}.png`}
                    alt="Profile Picture"
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm tracking-wider">
              <span className="text-primary mr-2 font-semibold">350+</span>
              Websites Build
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="pt-14 md:pt-20">
          <motion.div
            ref={videoRef}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            initial={{ scale: 0.84 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex aspect-video w-full items-center justify-center"
            style={{ scale: zoom }}
          >
            <div className="anidiv" aria-hidden="true" />
            <div className="relative z-10 h-[calc(100%-4px)] w-[calc(100%-4px)] overflow-hidden rounded-lg">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/KiBzKcbaM_Q?autoplay=1&mute=0&playsinline=1&loop=1&playlist=KiBzKcbaM_Q&rel=0"
                title="Hero Video"
                allow="autoplay; encrypted-media; picture-in-picture; web-share; "
                allowFullScreen
              />
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

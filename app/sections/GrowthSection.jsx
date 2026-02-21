"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

export default function GrowthSection() {
  return (
    <section className="relative space-y-10 overflow-hidden px-0 py-40 md:py-64 lg:px-0">
      <div className="mx-auto mt-32 max-w-md space-y-5 text-center md:max-w-screen-md md:space-y-8">
        <AnimatedSection>
          <p className="text-sm-semibold from-secondary via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent md:text-xl">
            350+ Websites Build
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h2 className="text-h1 text-[#f5f5f5] md:text-display">
            Websites built to drive real{" "}
            <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
              results.
            </span>
          </h2>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.3} className="space-y-12 text-center">
        <p className="mx-auto max-w-[92vw] text-center text-xl md:max-w-2xl">
          We take{" "}
          <span className="text-foreground font-semibold">
            limited projects each month{" "}
          </span>{" "}
          to keep builds fast and focused. If we’re booked, you roll into the
          next intake. Secure your slot.
          <br />
          <span className="text-foreground font-semibold">
            Book Your Build Now!
          </span>
        </p>
      </AnimatedSection>

      <div className="absolute left-0 right-0 top-1/2 -z-20 mx-auto aspect-square max-w-screen-2xl -translate-y-1/2 sm:-translate-y-[20%] md:-translate-y-1/4">
        <motion.div
          initial={{ opacity: 0, rotate: 30 }}
          whileInView={{ opacity: 1, rotate: 40 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-background absolute inset-0 h-[60vh] w-full translate-y-1/3 scale-[1.8] rounded-full blur-3xl md:h-[130rem] md:translate-y-[20%] md:scale-125" />
          <Image
            alt="Earth"
            width={1980}
            height={1980}
            src="/earth.png"
            className="relative -z-10 h-full w-full scale-[1.6] object-cover opacity-60 sepia-[60%] md:scale-125"
          />
          <div className="bg-primary/60 absolute inset-0 left-1/2 -z-10 h-[60vh] w-3/4 -translate-x-1/2 translate-y-1/2 scale-[1.8] rounded-full blur-3xl md:h-[100rem] md:translate-y-[15%] md:scale-125" />
        </motion.div>
      </div>
    </section>
  );
}

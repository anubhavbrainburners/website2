"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArtifactFrame,
  Counter,
  ParallaxWrap,
  Reveal,
  SectionIntro,
  StaggerGroup,
  StaggerItem,
} from "./shared";

export default function GrowthStrategySection() {
  return (
    <>
      <section className="py-10">
        <div className="grid gap-8 rounded-[1.8rem] border border-[#d2e1d1] bg-white/60 p-6 shadow-[0_24px_68px_rgba(34,55,43,0.12)] backdrop-blur-xl md:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <StaggerGroup delayChildren={0.08}>
            <StaggerItem>
              <SectionIntro
                label="The Problem"
                title="Strong product trust, weak conversion progression."
                description="Traffic was being generated, but the digital journey was not consistently converting interest into purchases. The gap was not product quality. It was the way trust, clarity, and value were communicated at critical decision points."
              />
            </StaggerItem>
            <StaggerItem>
              <div className="mt-7 grid gap-2 text-sm text-[#2f5041] md:grid-cols-2">
                <p>- Unclear conversion journey</p>
                <p>- Weak visual persuasion</p>
                <p>- Messaging not aligned with buyer psychology</p>
                <p>- Drop-offs across critical decision stages</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-9 grid gap-4 md:grid-cols-3">
                <Counter label="Landing Page Exit" value={55} />
                <Counter label="Product Page Bounce" value={30} />
                <Counter label="Checkout Abandonment" value={28} />
              </div>
            </StaggerItem>
            <img
              src="/case-studies/menoveda/menoveda.png"
              alt=""
              className="pt-4 md:pt-10 md:pl-12"
            />
          </StaggerGroup>

          <ParallaxWrap from={16} to={-16}>
            <ArtifactFrame className="rounded-2xl">
              <div className="aspect-[5/8] w-full overflow-hidden rounded-xl bg-[#f5f8f0]">
                <Image
                  src="/case-studies/menoveda/page-06-img-08.png"
                  alt="Menoveda section screenshot with best sellers and experts"
                  width={2560}
                  height={4096}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="h-full w-full object-contain transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
              </div>
            </ArtifactFrame>
          </ParallaxWrap>
        </div>
      </section>

      <section className="py-10">
        <div className="rounded-[1.8rem] bg-[#122019] p-7 text-[#f4f5ec] shadow-[0_34px_76px_rgba(10,16,12,0.45)] md:p-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9fc3af]">
              The Strategy
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              One ecosystem: strategy, design, development, and marketing.
            </h2>
          </Reveal>

          <StaggerGroup
            className="mt-8 grid gap-2 md:grid-cols-2"
            delayChildren={0.1}
          >
            {[
              [
                "Conversion Experience Transformation",
                "Reframed narrative hierarchy and trust architecture for clarity in a sensitive wellness category.",
              ],
              [
                "Performance Optimization",
                "Reduced friction from browsing to checkout with faster rendering and cleaner interaction flow.",
              ],
              [
                "Marketing Efficiency",
                "Aligned campaign intent with landing-stage persuasion to improve lead and purchase quality.",
              ],
              [
                "Brand Trust Elevation",
                "Strengthened credibility through structured proof, specialist framing, and value communication.",
              ],
            ].map(([title, text]) => (
              <StaggerItem key={title} >
                <motion.article
                  className="rounded-3xl border border-white/15 bg-white/[0.05] p-6 mb-1"
                  whileHover={{
                    y: -2.5,
                    scale: 1.008,
                    boxShadow: "0 16px 32px rgba(0,0,0,0.2)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 24,
                    mass: 0.8,
                  }}
                >
                  <h3 className="text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d2dfcc]">
                    {text}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-10">
        <div className="rounded-[1.8rem] border border-[#d4e2d2] bg-[#f8fbf3]/75 p-6 shadow-[0_20px_56px_rgba(42,67,52,0.1)] backdrop-blur-md md:p-10">
          <Reveal className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5a7c6d]">
              The Solution
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#183227] md:text-5xl">
              Built on Shopify for scalable growth.
            </h2>
          </Reveal>

          <ParallaxWrap
            from={10}
            to={-10}
            className="mt-10 grid gap-4 md:grid-cols-2"
          >
            <ArtifactFrame className="rounded-2xl">
              <div className="aspect-[2878/3008] w-full overflow-hidden rounded-xl bg-[#f5f8f0]">
                <Image
                  src="/case-studies/menoveda/page-06-img-03.png"
                  alt="Menoveda Shopify implementation screenshot"
                  width={2878}
                  height={3008}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="h-full w-full rounded-xl object-contain transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
              </div>
            </ArtifactFrame>
            <ArtifactFrame className="rounded-2xl">
              <div className="aspect-[2878/3082] w-full overflow-hidden rounded-xl bg-[#f5f8f0]">
                <Image
                  src="/case-studies/menoveda/page-06-img-02.png"
                  alt="Menoveda products listing screenshot"
                  width={2878}
                  height={3082}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="h-full w-full rounded-xl object-contain transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
              </div>
            </ArtifactFrame>
          </ParallaxWrap>

          <Reveal className="mt-8">
            <div className="grid gap-[0.375rem] text-sm text-[#355648] md:grid-cols-2">
              {[
                "Custom UI/UX with conversion-driven interface patterns",
                "Shopify theme customization for scalable content modules",
                "Marketing integrations for tracking and audience optimization",
                "Analytics setup for campaign-level performance measurement",
                "Speed and asset optimization for stable page interactions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#d7e4d4] bg-white/80 p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#c6d8c3]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="rounded-[1.8rem] bg-[#15231c] p-7 text-[#f4f5ec] shadow-[0_32px_76px_rgba(10,17,12,0.45)] md:p-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9fc2af]">
              Before vs After
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              PPC optimization impact on acquisition quality.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              {
                title: "Before",
                tone: "text-[#f1b6ad]",
                points: [
                  "High cost per acquisition",
                  "Inconsistent conversion rates",
                  "Weak audience targeting",
                  "Traffic without proportional revenue",
                  "Limited creative performance insights",
                  "Low Revenue growth",
                ],
                image: "/case-studies/menoveda/page-07-img-01.png",
                alt: "PPC performance before optimization screenshot",
              },
              {
                title: "After",
                tone: "text-[#bce3ce]",
                points: [
                  "Reduced cost per acquisition",
                  "Improved conversion rates",
                  "Refined audience segmentation",
                  "Higher purchase intent traffic",
                  "Creatives optimized for engagement and clicks",
                  "Measurable revenue growth",
                ],
                image: "/case-studies/menoveda/page-08-img-01.png",
                alt: "PPC performance after optimization screenshot",
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.08}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3
                    className={`text-sm font-semibold uppercase tracking-[0.16em] ${item.tone}`}
                  >
                    {item.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-[#d8ddd9]">
                    {item.points.map((point) => (
                      <li key={point}>- {point}</li>
                    ))}
                  </ul>
                  <div className="mt-5 aspect-[16/7] w-full overflow-hidden rounded-[4px]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={1077}
                      height={379}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="h-full w-full object-cover transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

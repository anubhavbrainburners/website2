"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArtifactFrame,
  ParallaxWrap,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "./shared";

const industryTags = [
  "Ayurvedic Wellness",
  "Menopause Care",
  "D2C Ecommerce",
  "Shopify",
];
const projectMeta = [
  ["Industry", "Ayurvedic Wellness"],
  ["Timeline", "12 Weeks"],
  ["Role", "Strategy, UX, Shopify Build"],
];

export default function HeroOverviewSection() {
  return (
    <section className="relative pb-10 pt-10 md:pt-2">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] rounded-[2rem] opacity-75"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(133,177,155,0.22) 0%, rgba(242,233,214,0.24) 48%, rgba(121,163,143,0.18) 100%)",
          backgroundSize: "180% 180%",
        }}
      />
      

      <div className="relative grid items-center gap-12 lg:gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <StaggerGroup className="relative" delayChildren={0.12}>
          <StaggerItem>
            <p className="text-xs uppercase tracking-[0.22em] text-[#557767] pl-4 md:pl-6 md:mt-6">
              Case Study
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-6 max-w-[12ch] text-[3.5rem] pl-3 font-semibold leading-[0.94] tracking-[-0.04em] text-[#173328] md:text-8xl md:pl-5">
              Menoveda Growth Transformation
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-[42rem] text-[18px] leading-[1.9] text-[#3d5e50] pl-3 md:pl-5">
              Repositioned Menoveda&apos;s digital experience into a
              conversion-first growth engine, unlocking stronger purchase
              intent, cleaner acquisition economics, and sustained scalability.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 grid gap-[0.375rem] sm:grid-cols-3 md:pl-5">
              {projectMeta.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#d4e2d3] bg-white/68 px-4 py-4 backdrop-blur-md"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5b7c6b]">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#264538]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 flex flex-wrap gap-2 md:pl-5">
              {industryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#cedfcd] bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[#355548] backdrop-blur-md transition-all duration-300 ease-out hover:bg-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 flex flex-wrap gap-3 md:pl-5">
              <a
                href="https://menoveda.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#1f4536] px-7 py-3 
text-sm font-medium uppercase tracking-[0.12em] 
text-[#f5f7ed]
transition-all duration-300 ease-out
hover:bg-[#18392d] hover:-translate-y-0.5 hover:shadow-lg "
              >
                View Live Project
              </a>
              <a
                href="#results"
                className="rounded-full border border-[#365a49]/20 
bg-white/65 px-7 py-3 
text-sm font-medium uppercase tracking-[0.12em] 
text-[#284739] backdrop-blur-md
transition-all duration-300 ease-out
hover:bg-white hover:border-[#365a49]/40 
hover:shadow-lg hover:-translate-y-0.5"
              >
                See Results
              </a>
            </div>
          </StaggerItem>
          <StaggerItem className="flex w-full justify-end">
            <a
              href="#results"
              className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#5d7f70] md:mr-5 md:inline-flex"
            >
              <span>Scroll</span>
              <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-[#6c8d7d]/50">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#0a331c]"
                  animate={{ y: [0, 15, 0], opacity: [0.65, 1, 0.65] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </a>
          </StaggerItem>
        </StaggerGroup>
        <ParallaxWrap from={8} to={-8} className="transform-gpu">
          <Reveal>
            <ArtifactFrame className="rounded-[1.75rem]">
              <div className="aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#fbfdf8,#edf4e7)]">
                <Image
                  src="/case-studies/menoveda/page-01-img-02.png"
                  alt="Menoveda storefront hero section screenshot"
                  width={2878}
                  height={2254}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="h-full w-full object-cover scale-[1.04] transform-gpu will-change-transform transition-transform duration-500 ease-out hover:scale-[1.07]"
                />
              </div>
            </ArtifactFrame>
          </Reveal>
        </ParallaxWrap>
      </div>

      <Reveal className="mt-4 rounded-[1.6rem] border border-[#d2e1d1] bg-white/55 p-7 shadow-[0_20px_58px_rgba(34,54,43,0.1)] backdrop-blur-xl md:p-10 text-center flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#507160]">
          Brand Context
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#1d392d] md:text-4xl">
          India&apos;s first dedicated menopause-only wellness brand
        </h2>

        <p className="mt-6 text-[19px] leading-[1.9] text-[#406152] max-w-4xl">
          Menoveda delivers safe, plant-based Ayurvedic supplements for women
          navigating menopausal transition and related hormonal, dermal,
          emotional, and physical changes. The product line is clinically
          tested, hormone-free, gluten-free, and cruelty-free.
        </p>
      </Reveal>
    </section>
  );
}

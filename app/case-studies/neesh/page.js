"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Fonts ─────────────────────────────────────────────────────────────────────
const displayFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});
const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

// ─── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  ["Overview", "overview"],
  ["Challenge", "challenge"],
  ["Approach", "approach"],
  ["Solutions", "solutions"],
  ["Results", "results"],
  ["Performance", "performance"],
  ["Takeaways", "takeaways"],
];

const PERF_STATS = [
  { label: "Performance Score", before: "51", after: "94" },
  { label: "LCP", before: "3.3s", after: "1.2s" },
  { label: "CLS", before: "1.431", after: "0.002" },
  { label: "FCP", before: "0.6s", after: "0.4s" },
];

const APPROACH_STEPS = [
  { n: "01", title: "Discovery & Research", desc: "Deep audit of existing flows, heatmaps, and competitor benchmarking." },
  { n: "02", title: "Strategic UX & Design", desc: "Wireframes, prototypes, and a luxury-informed visual system." },
  { n: "03", title: "E-commerce Implementation", desc: "Shopify theme customisation and component architecture." },
  { n: "04", title: "Performance Optimization", desc: "Script refinement, asset pipeline, and rendering improvements." },
  { n: "05", title: "Conversion Marketing", desc: "PPC alignment, retargeting, and ROAS-focused campaign structure." },
];

const SOLUTIONS = [
  {
    roman: "I",
    title: "Conversion Experience Transformation",
    body: "Homepage narrative restructured around storytelling, exclusivity, and credibility cues. PDP clarity and checkout simplification cut purchase friction at every critical drop-off point.",
  },
  {
    roman: "II",
    title: "Performance & Speed Optimization",
    body: "Script refinement, asset compression, lazy loading, and rendering improvements raised responsiveness and eliminated drop-off caused by slow load times.",
  },
  {
    roman: "III",
    title: "Marketing Efficiency & Sales Growth",
    body: "Audience segmentation and retargeting aligned to campaign intent — improving ROAS quality and enabling sustainable purchase volume at scale.",
  },
  {
    roman: "IV",
    title: "Brand Perception & Trust Elevation",
    body: "Visual hierarchy, cleaner product communication, and strategic placement of social proof improved decision confidence and shortened consideration cycles.",
  },
];

const TAKEAWAYS = [
  "UX as a conversion amplifier",
  "Performance optimization as a revenue enabler",
  "Paid media as a scalable acquisition engine",
  "Brand positioning as a trust multiplier",
  "Strategy as the foundation of sustainable D2C growth",
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function fadeUp(rm, delay = 0) {
  return {
    hidden: { opacity: 0, y: rm ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: rm ? 0.15 : 0.6, delay: rm ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

function staggerChildren(rm, stagger = 0.07) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: rm ? 0 : stagger } },
  };
}

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const ids = NAV_LINKS.map(([, id]) => id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.2, 0.5] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);
  const elRef = useRef(null);
  const started = useRef(false);
  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) { setVal(target); return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * numeric * 10) / 10);
      if (p < 1) requestAnimationFrame(tick);
      else setVal(numeric);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);
  return [val, elRef];
}

// ─── Magnetic button hook ───────────────────────────────────────────────────────
function useMagnet(strength = 0.32) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  }, [strength]);
  const onMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);
  return { ref, pos, onMouseMove, onMouseLeave };
}

// ─── Shared primitives ─────────────────────────────────────────────────────────

function SectionLabel({ text, light = false }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {/* Line draws in on viewport entry */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.7 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="block w-7 h-px bg-[#C9A05A] origin-left"
      />
      <motion.span
        initial={{ opacity: 0, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          "text-[10px] font-semibold tracking-[0.26em] uppercase font-[family-name:var(--font-body)]",
          light ? "text-[#C9A05A]" : "text-[#A07830]"
        )}
      >
        {text}
      </motion.span>
    </div>
  );
}

function SectionCard({ id, children, className = "" }) {
  const rm = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: rm ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        "relative overflow-hidden rounded-3xl border border-[#E8DFCC] bg-[#FFFDF9]",
        "p-6 sm:p-8 md:p-12 shadow-[0_8px_32px_rgba(30,20,5,0.05),0_2px_6px_rgba(30,20,5,0.04)]",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

// StatPill with shimmer sweep on hover
function StatPill({ label, before, after }) {
  const numeric = parseFloat(String(after).replace(/[^0-9.]/g, ""));
  const suffix = String(after).replace(/[0-9.]/g, "");
  const [val, ref] = useCountUp(numeric);
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -3, borderColor: "rgba(201,160,90,0.5)", boxShadow: "0 12px 28px rgba(30,20,5,0.1)" }}
      transition={{ duration: 0.22 }}
      className="relative flex flex-col gap-2 rounded-xl border border-[#E8DFCC] bg-[#FFFDF9] p-3 sm:p-4 overflow-hidden cursor-default"
    >
      {/* Gold shimmer sweep */}
      <AnimatePresence>
        {hov && (
          <motion.div
            key="shimmer"
            initial={{ x: "-110%", opacity: 0.7 }}
            animate={{ x: "210%", opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.52, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 w-1/3 skew-x-[-16deg] bg-gradient-to-r from-transparent via-[#C9A05A]/18 to-transparent"
          />
        )}
      </AnimatePresence>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A07830] font-[family-name:var(--font-body)]">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium text-[#9A8060] line-through font-[family-name:var(--font-body)]">{before}</span>
        <motion.span
          animate={{ x: hov ? [0, 3, 0] : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#C9A05A] font-semibold text-sm"
        >→</motion.span>
        <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1A1510] leading-none">
          {val}{suffix}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Sections ──────────────────────────────────────────────────────────────────

function HeroSection({ rm, active }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Parallax orbs on scroll
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, rm ? 0 : -50]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, rm ? 0 : -30]);
  // Subtle mockup float on scroll
  const mockY = useTransform(scrollYProgress, [0, 1], [0, rm ? 0 : 22]);

  // Magnetic CTA refs
  const magDark = useMagnet();
  const magLight = useMagnet();

  return (
    <SectionCard className="border-[#D9C9A8] bg-gradient-to-br from-[#FFFDF9] to-[#FDF6E8] !p-0 overflow-hidden">
      {/* Parallax ambient orbs */}
      <motion.div style={{ y: orb1Y }} aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#C9A05A]/18 blur-3xl" />
      <motion.div style={{ y: orb2Y }} aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#C9A05A]/10 blur-3xl" />

      {/* ── 3-column grid: text | mockup | nav ── */}
      <div ref={heroRef} className="relative flex flex-col xl:flex-row xl:items-stretch min-h-[520px]">

        {/* ── Col 1: Text ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerChildren(rm)}
          className="flex flex-col justify-center gap-0 px-6 py-10 sm:px-10 sm:py-12 xl:w-[38%] xl:border-r xl:border-[#EDE5D4] xl:py-14 xl:px-12"
        >
          {/* Badge */}
          <motion.div variants={fadeUp(rm, 0)}>
            <motion.span
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center rounded-full border border-[#D9C9A8] bg-[#C9A05A]/10 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#A07830] font-[family-name:var(--font-body)] cursor-default"
            >
              Luxury D2C · Shopify · CRO
            </motion.span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp(rm, 0.07)}
            className="font-[family-name:var(--font-display)] mt-5 text-[clamp(4.5rem,10vw,7rem)] md:text-[clamp(3.2rem,6vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.03em] text-[#18130D]"
          >
            Neesh
            <br />
            <em className="italic text-[#C9A05A]">Perfumes</em>
          </motion.h1>

          {/* Thin gold rule — draws in */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: rm ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-100 bg-gradient-to-r from-[#C9A05A] to-transparent origin-left"
          />

          {/* Description */}
          <motion.p
            variants={fadeUp(rm, 0.14)}
            className="mt-5 font-[family-name:var(--font-body)] text-[14px] sm:text-[15px] leading-[1.8] text-[#5A4E38] font-light max-w-[340px]"
          >
            A conversion-focused redesign, performance transformation, and paid media alignment for a premium fragrance house.
          </motion.p>

          {/* Meta chips — pop in with stagger */}
          <motion.div variants={fadeUp(rm, 0.18)} className="mt-6 flex flex-wrap gap-2">
            {["Shopify", "CRO", "PageSpeed", "PPC"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: rm ? 0 : 0.2 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, borderColor: "rgba(201,160,90,0.65)" }}
                className="rounded-full border border-[#E0D4B8] bg-white/60 px-3 py-1 text-[11px] font-medium text-[#6B5830] font-[family-name:var(--font-body)] cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs — magnetic */}
          <motion.div variants={fadeUp(rm, 0.22)} className="mt-8 flex flex-wrap gap-3">
            <motion.a
              ref={magDark.ref}
              href="#"
              animate={{ x: magDark.pos.x, y: magDark.pos.y }}
              onMouseMove={magDark.onMouseMove}
              onMouseLeave={magDark.onMouseLeave}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="inline-flex items-center rounded-full bg-[#1A1510] px-6 py-3 text-[13px] font-semibold tracking-[0.03em] text-[#F5EDD8] font-[family-name:var(--font-body)] hover:bg-[#2E2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
            >
              View Live Site
            </motion.a>
            <motion.a
              ref={magLight.ref}
              href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ x: magLight.pos.x, y: magLight.pos.y }}
              onMouseMove={magLight.onMouseMove}
              onMouseLeave={magLight.onMouseLeave}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(30,20,5,0.12)" }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="inline-flex items-center rounded-full border border-[#D9C9A8] bg-white/70 px-6 py-3 text-[13px] font-semibold tracking-[0.03em] text-[#2A2010] font-[family-name:var(--font-body)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
            >
              Free Audit →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Col 2: Browser Mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: rm ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: rm ? 0.2 : 0.75, delay: rm ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center bg-[#F0EBE0] px-5 py-8 sm:px-6 xl:flex-1 xl:border-r xl:border-[#EDE5D4] xl:px-10 xl:py-10"
        >
          {/* Subtle grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "linear-gradient(#C9A05A 1px, transparent 1px), linear-gradient(90deg, #C9A05A 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Parallax + hover lift on mockup */}
          <motion.div style={{ y: mockY }} className="relative w-full max-w-[540px] sm:max-w-[580px]">
            {/* Floating label above */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: rm ? 0 : 0.28 }}
              className="mb-3 flex items-center gap-2"
            >
              <span className="block h-px w-4 bg-[#C9A05A]/60" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A07830]/70 font-[family-name:var(--font-body)]">Live preview</span>
            </motion.div>

            {/* Browser shell — lifts on hover */}
            <motion.div
              whileHover={rm ? undefined : { y: -6, boxShadow: "0 32px 72px rgba(30,20,5,0.22), 0 8px 20px rgba(30,20,5,0.12)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-[#D8CCBA] shadow-[0_20px_56px_rgba(30,20,5,0.18),0_4px_12px_rgba(30,20,5,0.1)]"
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-3 border-b border-[#DDD0BC] bg-[#EDE5D8] px-4 py-2.5">
                <div className="flex gap-1.5 shrink-0">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex flex-1 items-center gap-2 rounded-md bg-white/60 px-3 py-1">
                  <span className="text-[#A09070] text-[10px]">🔒</span>
                  <span className="font-[family-name:var(--font-body)] text-[11px] text-[#7A6A50]">neesh-perfumes.com</span>
                </div>
              </div>
              {/* Screenshot — responsive height */}
              <div className="relative h-[260px] sm:h-[340px] xl:h-[400px] overflow-hidden">
                <Image
                  src="/case-studies/neesh/hero.jpg"
                  alt="Neesh Perfumes website screenshot"
                  fill
                  priority
                  sizes="(max-width:640px) 95vw, (max-width:1200px) 90vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Floating badge below image */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: rm ? 0 : 0.48 }}
              className="mt-4 flex items-center justify-end gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 6px 18px rgba(30,20,5,0.1)" }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 rounded-full border border-[#D9C9A8] bg-white/80 px-3.5 py-1.5 shadow-sm cursor-default"
              >
                {/* Pulsing green dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27AE60] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#27AE60]" />
                </span>
                <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold text-[#2A2010]">PageSpeed 94 / 100</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Col 3: Navigation panel ── */}
        <motion.div
          initial={{ opacity: 0, x: rm ? 0 : 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: rm ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between px-6 py-8 sm:px-8 sm:py-10 xl:w-[220px] xl:shrink-0 xl:py-14 xl:px-8"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-5 xl:mb-6">
              <span className="block w-4 h-px bg-[#C9A05A]/70" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A07830] font-[family-name:var(--font-body)]">
                On this page
              </p>
            </div>
            {/* On mobile: horizontal wrapping pills; on xl: vertical list */}
            <nav className="flex flex-row flex-wrap gap-1.5 xl:flex-col xl:gap-0.5">
              {NAV_LINKS.map(([label, id]) => (
                <motion.button
                  key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={cx(
                    "flex items-center gap-2 xl:gap-2.5 rounded-lg px-2.5 xl:px-2 py-1.5 xl:py-2 text-[12px] xl:text-[13px] text-left transition-all duration-200 font-[family-name:var(--font-body)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A] border-none bg-transparent cursor-pointer w-auto xl:w-full",
                    active === id
                      ? "font-semibold text-[#C9A05A]"
                      : "font-normal text-[#6B5E48] hover:text-[#C9A05A]"
                  )}
                >
                  <motion.span
                    animate={{
                      scale: active === id ? 1.35 : 1,
                      backgroundColor: active === id ? "#C9A05A" : "#D4C3A0",
                    }}
                    transition={{ duration: 0.25 }}
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  {label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 xl:mt-8 border-t border-[#EDE5D4] pt-5 xl:pt-6">
            <p className="mb-3 font-[family-name:var(--font-body)] text-[11px] leading-relaxed text-[#7A6A50]">
              Ready to grow your brand?
            </p>
            <motion.a
              href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex w-full items-center justify-center rounded-full bg-[#1A1510] px-4 py-2.5 text-[12px] font-semibold tracking-[0.04em] text-[#F5EDD8] font-[family-name:var(--font-body)] hover:bg-[#2E2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
            >
              Book Free Audit →
            </motion.a>
          </div>
        </motion.div>

      </div>
    </SectionCard>
  );
}

function SnapshotSection({ rm }) {
  return (
    <SectionCard>
      <SectionLabel text="Project Snapshot" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        At a Glance
      </h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerChildren(rm)}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 mb-6"
      >
        {[
          { k: "Client", v: "Neesh Perfumes" },
          { k: "Category", v: "Luxury Fragrance D2C" },
          { k: "Platform", v: "Shopify" },
          { k: "Services", v: "UX/UI · Performance · CRO · PPC" },
        ].map(({ k, v }) => (
          <motion.div
            key={k}
            variants={fadeUp(rm)}
            whileHover={rm ? undefined : { y: -4, borderColor: "rgba(201,160,90,0.45)", boxShadow: "0 14px 26px rgba(30,20,5,0.09)" }}
            transition={{ duration: 0.22 }}
            className="rounded-xl border border-[#E8DFCC] bg-[#FFFDF9] p-5 cursor-default"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A07830] font-[family-name:var(--font-body)]">{k}</p>
            <p className="text-[14px] font-medium leading-snug text-[#221A0E] font-[family-name:var(--font-body)]">{v}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="rounded-2xl border border-[#D9C9A8] bg-gradient-to-br from-[#C9A05A]/[0.06] to-transparent p-5 sm:p-7">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A07830] font-[family-name:var(--font-body)]">
            Impact Metrics
          </span>
          <span className="rounded-full bg-[#C9A05A]/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-[#A07830] font-[family-name:var(--font-body)]">
            Before → After
          </span>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren(rm, 0.05)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {PERF_STATS.map((s) => (
            <StatPill key={s.label} {...s} />
          ))}
          <StatPill label="CPP Range" before="$38–50" after="$22" />
          <StatPill label="Monthly Purchases" before="Low" after="148" />
        </motion.div>
      </div>
    </SectionCard>
  );
}

function OverviewSection({ rm }) {
  return (
    <SectionCard id="overview">
      <SectionLabel text="Overview" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        The Brand
      </h2>
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp(rm)}
        className="max-w-3xl font-[family-name:var(--font-body)] text-[15px] sm:text-[17px] leading-[1.85] text-[#3A3020]"
      >
        Neesh Perfumes is a premium fragrance house rooted in craftsmanship and storytelling. The objective was to
        transform its website into a high-performing luxury commerce engine — where brand narrative, buying confidence,
        and performance efficiency converge to drive measurably stronger conversion outcomes.
      </motion.p>

      <motion.blockquote
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp(rm, 0.08)}
        whileHover={{ borderColor: "rgba(201,160,90,0.8)", backgroundColor: "rgba(201,160,90,0.08)" }}
        transition={{ duration: 0.3 }}
        className="relative mt-10 rounded-r-xl border-l-[3px] border-[#C9A05A] bg-[#C9A05A]/5 px-6 sm:px-8 py-6"
      >
        {/* Opening curly quote — top left */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-0 font-[family-name:var(--font-display)] text-6xl leading-none text-[#C9A05A]/25 select-none"
        >
          &#8220;
        </span>
        <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-medium italic leading-relaxed text-[#2A2010] md:text-2xl">
          Where luxury meets identity — every pixel in service of the scent.
        </p>
        {/* Closing curly quote — bottom right */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 bottom-0 font-[family-name:var(--font-display)] text-6xl leading-none text-[#C9A05A]/25 select-none"
        >
          &#8221;
        </span>
      </motion.blockquote>
    </SectionCard>
  );
}

function ChallengeSection({ rm }) {
  const challenges = [
    { stage: "Landing Page", pct: 54, issue: "Exit rate before meaningful exploration began" },
    { stage: "Product Pages", pct: 42, issue: "Bounce during the critical consideration phase" },
    { stage: "Checkout", pct: 31, issue: "Abandonment before purchase completion" },
  ];

  return (
    <SectionCard id="challenge">
      <SectionLabel text="Challenge" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        The Revenue Leaks
      </h2>
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp(rm)}
        className="mb-8 max-w-3xl font-[family-name:var(--font-body)] text-[15px] sm:text-[17px] leading-[1.85] text-[#3A3020]"
      >
        Luxury fragrance buying is deeply experience-driven. Users require trust, sensory storytelling, and low-friction
        decision paths. The existing journey created drop-off at every critical junction.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren(rm)}
        className="flex flex-col gap-4"
      >
        {challenges.map(({ stage, pct, issue }, i) => (
          <motion.div
            key={stage}
            variants={fadeUp(rm)}
            whileHover={rm ? undefined : { x: 5, borderColor: "rgba(201,160,90,0.45)", boxShadow: "0 8px 22px rgba(30,20,5,0.07)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-[#E8DFCC] bg-[#FFFDF9] px-5 sm:px-6 py-5 cursor-default"
          >
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A07830] font-[family-name:var(--font-body)]">
                {stage}
              </p>
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: rm ? 0 : 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#C9A05A]"
              >
                {pct}%
              </motion.span>
            </div>
            <p className="mb-3 font-[family-name:var(--font-body)] text-[14px] text-[#2A2010]">{issue}</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#C9A05A]/15">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: rm ? 0 : 0.2 + i * 0.08 }}
                className="h-full rounded-full bg-gradient-to-r from-[#C9A05A] to-[#E8B060]"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionCard>
  );
}

function ApproachSection({ rm }) {
  return (
    <SectionCard id="approach">
      <SectionLabel text="Approach" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        Five-Phase Execution
      </h2>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerChildren(rm)}
      >
        {APPROACH_STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            variants={fadeUp(rm, i * 0.05)}
            whileHover={rm ? undefined : { x: 6, backgroundColor: "rgba(201,160,90,0.07)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-start gap-5 sm:gap-6 rounded-xl px-4 sm:px-5 py-5 border-b border-[#EDE5D4] last:border-none cursor-default"
          >
            <motion.span
              whileHover={{ opacity: 0.9, scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#C9A05A] opacity-60 leading-none w-10 shrink-0"
            >
              {step.n}
            </motion.span>
            <div className="flex-1 min-w-0">
              <p className="font-[family-name:var(--font-body)] text-[14px] sm:text-[15px] font-semibold text-[#1A1510] mb-1">{step.title}</p>
              <p className="font-[family-name:var(--font-body)] text-sm text-[#5A4E3A] leading-relaxed">{step.desc}</p>
            </div>
            {/* Arrow reveals on hover — desktop only */}
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="shrink-0 text-[#C9A05A] text-sm font-semibold self-center hidden xl:block opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              →
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </SectionCard>
  );
}

function SolutionsSection({ rm }) {
  return (
    <SectionCard id="solutions">
      <SectionLabel text="Solutions" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        What We Delivered
      </h2>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerChildren(rm)}
        className="grid gap-4 sm:grid-cols-2"
      >
        {SOLUTIONS.map((s, i) => (
          <motion.article
            key={s.roman}
            variants={fadeUp(rm, i * 0.06)}
            whileHover={rm ? undefined : { y: -6, boxShadow: "0 20px 40px rgba(30,20,5,0.11)", borderColor: "rgba(201,160,90,0.4)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-3 rounded-2xl border border-[#E8DFCC] bg-[#FFFDF9] p-6 sm:p-7 shadow-[0_4px_16px_rgba(30,20,5,0.04)] overflow-hidden cursor-default"
          >
            {/* Corner glow on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#C9A05A]/12 blur-xl"
            />
            <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#C9A05A] opacity-50 leading-none">{s.roman}</span>
            <h3 className="font-[family-name:var(--font-body)] text-[14px] sm:text-base font-semibold text-[#1A1510] leading-snug">{s.title}</h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-[#4A3E2A] leading-relaxed">{s.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionCard>
  );
}

function ResultsSection({ rm }) {
  return (
    <SectionCard id="results">
      <SectionLabel text="Results" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        PPC Transformation
      </h2>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerChildren(rm)}
        className="grid gap-5 lg:grid-cols-2"
      >
        {/* Before */}
        <motion.article
          variants={fadeUp(rm)}
          whileHover={rm ? undefined : { y: -4, boxShadow: "0 16px 32px rgba(30,20,5,0.08)" }}
          transition={{ duration: 0.24 }}
          className="flex flex-col gap-4 rounded-2xl border border-[#E8D0CC] bg-[#FFFAFA] p-5 sm:p-6 overflow-hidden cursor-default"
        >
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#A03020] font-[family-name:var(--font-body)]">
            Before PPC Optimization
          </p>
          <div className="overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)]">
            <Image src="/case-studies/neesh/ppc-before.jpg" alt="PPC before" width={1536} height={702} sizes="(max-width:1024px) 100vw, 44vw" className="w-full h-auto block" />
          </div>
          <ul className="flex flex-col gap-2">
            {["CPP: $38–$50 range", "Low purchase volume", "Weak ROAS under pressure"].map((item) => (
              <li key={item} className="flex items-center gap-3 font-[family-name:var(--font-body)] text-sm text-[#2A2010]">
                <span className="text-xs font-bold text-[#C03020]">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.article>

        {/* After */}
        <motion.article
          variants={fadeUp(rm, 0.07)}
          whileHover={rm ? undefined : { y: -4, boxShadow: "0 16px 32px rgba(30,20,5,0.08)", borderColor: "rgba(201,160,90,0.5)" }}
          transition={{ duration: 0.24 }}
          className="flex flex-col gap-4 rounded-2xl border border-[#D9C9A8] bg-gradient-to-br from-[#FFFDF9] to-[#FDF6E4] p-5 sm:p-6 overflow-hidden cursor-default"
        >
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#A07830] font-[family-name:var(--font-body)]">
            After PPC Optimization
          </p>
          <div className="overflow-hidden rounded-xl border border-[#E8DFCC]">
            <Image src="/case-studies/neesh/ppc-after.jpg" alt="PPC after" width={1536} height={702} sizes="(max-width:1024px) 100vw, 44vw" className="w-full h-auto block" />
          </div>
          <ul className="flex flex-col gap-2">
            {["CPP improved to $22–$26", "117–148 purchases per campaign", "Scalable, profitable ROAS structure"].map((item) => (
              <li key={item} className="flex items-center gap-3 font-[family-name:var(--font-body)] text-sm text-[#2A2010]">
                <span className="text-xs font-bold text-[#27AE60]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </motion.div>
    </SectionCard>
  );
}

function PerformanceSection({ rm }) {
  return (
    <SectionCard id="performance">
      <SectionLabel text="Performance" />
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D] mb-6">
        PageSpeed Transformation
      </h2>

      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center mb-8">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: rm ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={rm ? undefined : { y: -4, boxShadow: "0 14px 28px rgba(30,20,5,0.08)" }}
          className="flex-1 overflow-hidden rounded-2xl border border-[#E8DFCC] bg-[#FFFDF9] p-5 sm:p-6 cursor-default"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A07830] font-[family-name:var(--font-body)]">
            Before Optimization
          </p>
          <Image src="/case-studies/neesh/pagespeed-before.jpg" alt="PageSpeed before" width={2000} height={1476} sizes="(max-width:1024px) 100vw, 44vw" className="mb-4 w-full rounded-xl border border-[#E8DFCC]" />
          <div className="flex items-baseline gap-1.5">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: rm ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-display)] text-5xl font-bold leading-none text-[#E8543A]"
            >
              51
            </motion.span>
            <span className="font-[family-name:var(--font-body)] text-sm text-[#8A7060]">/ 100</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: rm ? 0 : 0.3 }}
          className="shrink-0 text-3xl font-light text-[#C9A05A] text-center"
        >
          →
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: rm ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: rm ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={rm ? undefined : { y: -4, boxShadow: "0 14px 28px rgba(30,20,5,0.08)", borderColor: "rgba(201,160,90,0.5)" }}
          className="flex-1 overflow-hidden rounded-2xl border border-[#D9C9A8] bg-gradient-to-br from-[#FFFDF9] to-[#FDF6E4] p-5 sm:p-6 cursor-default"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A07830] font-[family-name:var(--font-body)]">
            After Optimization
          </p>
          <Image src="/case-studies/neesh/pagespeed-after.jpg" alt="PageSpeed after" width={2000} height={1476} sizes="(max-width:1024px) 100vw, 44vw" className="mb-4 w-full rounded-xl border border-[#D9C9A8]" />
          <div className="flex items-baseline gap-1.5">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: rm ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-display)] text-5xl font-bold leading-none text-[#27AE60]"
            >
              94
            </motion.span>
            <span className="font-[family-name:var(--font-body)] text-sm text-[#8A7060]">/ 100</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren(rm, 0.05)}
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {PERF_STATS.map((s) => (
          <StatPill key={s.label} {...s} />
        ))}
      </motion.div>
    </SectionCard>
  );
}

function TakeawaysSection({ rm }) {
  return (
    <SectionCard
      id="takeaways"
      className="border-[#C9A05A]/20 bg-gradient-to-br from-[#1A1510] to-[#231C12] shadow-[0_8px_40px_rgba(30,20,5,0.18)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#C9A05A]/10 blur-3xl"
      />
      <SectionLabel text="Takeaways" light />
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#F5EDD8] mb-6"
      >
        Premium brands deserve
        <br />
        <em className="italic text-[#C9A05A]">premium digital performance.</em>
      </motion.h2>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerChildren(rm, 0.08)}
        className="mt-2"
      >
        {TAKEAWAYS.map((item, i) => (
          <motion.li
            key={item}
            variants={fadeUp(rm, i * 0.04)}
            whileHover={rm ? undefined : { x: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-4 sm:gap-5 border-b border-[#C9A05A]/12 py-4 last:border-none cursor-default"
          >
            <motion.span
              whileHover={{ opacity: 0.9, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="font-[family-name:var(--font-display)] text-xl font-semibold leading-none text-[#C9A05A] opacity-50 w-8 shrink-0"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <span className="font-[family-name:var(--font-body)] text-[14px] sm:text-[16px] text-[#F5EDD8]/90 group-hover:text-[#F5EDD8] transition-colors duration-200">
              {item}
            </span>
            {/* Arrow on hover — desktop */}
            <span className="ml-auto text-[#C9A05A]/50 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
              →
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </SectionCard>
  );
}

function CTASection({ rm }) {
  const magAudit = useMagnet();
  const magPortfolio = useMagnet();

  return (
    <SectionCard className="border-[#D9C9A8] bg-gradient-to-br from-[#FDF6E4] to-[#FFF9EF] text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#C9A05A]/15 blur-3xl"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren(rm)}
        className="relative flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp(rm)}
          className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#A07830] font-[family-name:var(--font-body)]"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px w-6 bg-[#C9A05A]/70 origin-right"
          />
          Ready to Grow?
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px w-6 bg-[#C9A05A]/70 origin-left"
          />
        </motion.p>

        <motion.h2
          variants={fadeUp(rm, 0.06)}
          className="font-[family-name:var(--font-display)] max-w-lg text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#18130D]"
        >
          Let's build something{" "}
          <em className="italic text-[#C9A05A]">impactful</em>
        </motion.h2>

        <motion.p
          variants={fadeUp(rm, 0.1)}
          className="mt-5 max-w-md font-[family-name:var(--font-body)] text-[14px] sm:text-[16px] leading-relaxed text-[#5A4E3A]"
        >
          If you're running a premium brand and leaving conversion potential on the table — let's talk.
        </motion.p>

        <motion.div variants={fadeUp(rm, 0.15)} className="mt-9 flex flex-wrap justify-center gap-3">
          <motion.a
            ref={magAudit.ref}
            href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ x: magAudit.pos.x, y: magAudit.pos.y }}
            onMouseMove={magAudit.onMouseMove}
            onMouseLeave={magAudit.onMouseLeave}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="inline-flex items-center rounded-full bg-[#1A1510] px-8 py-3.5 text-sm font-semibold tracking-[0.03em] text-[#F5EDD8] font-[family-name:var(--font-body)] hover:bg-[#2E2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
          >
            Book a Free Audit
          </motion.a>
          <motion.div
            ref={magPortfolio.ref}
            animate={{ x: magPortfolio.pos.x, y: magPortfolio.pos.y }}
            onMouseMove={magPortfolio.onMouseMove}
            onMouseLeave={magPortfolio.onMouseLeave}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-full border border-[#D9C9A8] bg-transparent px-8 py-3.5 text-sm font-semibold tracking-[0.03em] text-[#2A2010] font-[family-name:var(--font-body)] transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
            >
              View More Case Studies
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionCard>
  );
}

// ─── Layout shells ─────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ boxShadow: scrolled ? "0 4px 20px rgba(30,20,5,0.08)" : "0 0 0 rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 border-b border-[#E8DFCC] bg-[#F5EFE3]/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 sm:h-16 max-w-[1800px] items-center justify-between px-4 sm:px-5 md:h-[68px] xl:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-[#D9C9A8] bg-[#FFFDF9]/90 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-[13px] font-medium text-[#3A3020] font-[family-name:var(--font-body)] shadow-[0_4px_14px_rgba(30,20,5,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,20,5,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
        >
          <span className="text-[11px]">◂</span>
          <span className="hidden sm:inline">Portfolio</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <span className="font-[family-name:var(--font-body)] text-[12px] sm:text-[16px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#3A3020]">
          Website With Robin
        </span>
        <a
          href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-[#1A1510] px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-[12px] font-semibold tracking-[0.04em] text-[#F5EDD8] font-[family-name:var(--font-body)] transition duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A]"
        >
          <span className="hidden sm:inline">Book Audit</span>
          <span className="sm:hidden">Audit</span>
        </a>
      </div>
    </motion.header>
  );
}

function Sidebar({ active }) {
  return (
    <aside className="hidden xl:block w-[200px] self-start xl:sticky xl:top-24">
      <div className="rounded-2xl border border-[#E8DFCC] bg-[#FFFDF9]/90 p-6 shadow-[0_12px_28px_rgba(30,20,5,0.05)] backdrop-blur-sm">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A07830] font-[family-name:var(--font-body)]">
          Navigation
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV_LINKS.map(([label, id]) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={cx(
                "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] text-left transition duration-200 font-[family-name:var(--font-body)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A] border-none bg-transparent cursor-pointer",
                active === id
                  ? "font-semibold text-[#C9A05A]"
                  : "font-normal text-[#6B5E48] hover:text-[#C9A05A]"
              )}
            >
              <span
                className={cx(
                  "h-1.5 w-1.5 shrink-0 rounded-full transition duration-200",
                  active === id ? "bg-[#C9A05A] scale-125" : "bg-[#D4C3A0]"
                )}
              />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function MobileBottomBar() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-[#E8DFCC] bg-[#F5EFE3]/95 p-3 backdrop-blur-xl xl:hidden"
    >
      <a
        href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 rounded-full bg-[#1A1510] py-3 text-center text-[13px] font-semibold tracking-[0.03em] text-[#F5EDD8] font-[family-name:var(--font-body)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A] active:scale-95 transition-transform"
      >
        Book Audit
      </a>
      <Link
        href="/portfolio"
        className="flex-1 rounded-full border border-[#D9C9A8] bg-white py-3 text-center text-[13px] font-semibold text-[#2A2010] font-[family-name:var(--font-body)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A05A] active:scale-95 transition-transform"
      >
        Portfolio
      </Link>
    </motion.div>
  );
}

// ─── Page root ─────────────────────────────────────────────────────────────────
export default function NeeshCaseStudyPage() {
  const rm = useReducedMotion();
  const active = useActiveSection();

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} relative min-h-screen overflow-x-hidden bg-[#F5EFE3] text-[#1A1510]`}>
      <Head>
        <title>Neesh Perfumes Case Study | Website With Robin</title>
        <meta name="description" content="Neesh Perfumes: luxury commerce redesign, Shopify optimisation, CRO strategy, PageSpeed uplift, and PPC gains." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Neesh Perfumes – Luxury Commerce & Growth Case Study" />
        <meta property="og:image" content="/case-studies/neesh/hero.jpg" />
      </Head>

      {/* Fixed ambient glows */}
      <div aria-hidden="true" className="pointer-events-none fixed -left-[10vw] -top-[10vh] z-0 h-[50vh] w-[50vw] rounded-full bg-[#C9A05A]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none fixed -right-[12vw] bottom-[8vh] z-0 h-[40vh] w-[40vw] rounded-full bg-[#A96428]/6 blur-3xl" />

      <Navbar />

      {/* Full-width main — nav lives inside HeroSection */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-3 sm:px-4 pb-28 sm:pb-32 pt-6 sm:pt-10 md:px-8 xl:px-12 xl:pt-12">
        <main className="flex flex-col gap-4 sm:gap-5 min-w-0">
          <HeroSection rm={rm} active={active} />
          <SnapshotSection rm={rm} />
          <OverviewSection rm={rm} />
          <ChallengeSection rm={rm} />
          <ApproachSection rm={rm} />
          <SolutionsSection rm={rm} />
          <ResultsSection rm={rm} />
          <PerformanceSection rm={rm} />
          <TakeawaysSection rm={rm} />
          <CTASection rm={rm} />
        </main>
      </div>

      <MobileBottomBar />
    </div>
  );
}

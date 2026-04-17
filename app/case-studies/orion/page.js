"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import Image from "next/image";

const pageFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-orion",
});

/* ─── Design tokens ───────────────────────────────────────────────── */
const C = {
  orange:     "#FF6B35",
  orangeDim:  "#FF8C5A",
  red:        "#D63B2F",
  green:      "#1A9E3F",
  greenLight: "#22C55E",
  bg:         "#F5F4F1",        // warm off-white page
  surface:    "#FFFFFF",        // card white
  surface2:   "#F9F8F6",        // slightly warm card
  border:     "#E5E2DC",        // warm light border
  borderMid:  "#D4D0C8",
  text:       "#1A1A1A",
  textMid:    "#555555",
  textMuted:  "#888888",
  lineOrange: "#FF6B35",
};

/* ─── Animation helpers ───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

/* ─── Static data ─────────────────────────────────────────────────── */
const SCOPE = [
  "UX & Conversion Strategy",
  "Shopify Development",
  "Website Performance Optimization",
  "Conversion Optimization",
  "PPC Campaign Optimization",
];
const RESULTS = [
  { label: "Website Performance Score", before: "49",     after: "94"      },
  { label: "Cost Per Acquisition",       before: "$42–$50", after: "$22–$25" },
  { label: "Landing Page Exit Rate",     before: "62%",    after: "32%"     },
];
const CHALLENGES = [
  { title: "Unclear Conversion Journey",      desc: "Visitors struggled to move from product exploration to inquiries or purchases" },
  { title: "Weak Product Presentation",       desc: "Products and categories were not visually prioritized." },
  { title: "Slow Website Performance",        desc: "A PageSpeed score of 49 affected user experience and engagement." },
  { title: "Inefficient PPC Campaign Structure", desc: "Advertising spend generated traffic but did not maximize conversion potential." },
];
const FUNNEL = [
  { stage: "Visitor Landing", stat: "62% exit rate",      sub: "Users leaving before exploring products" },
  { stage: "Product Page",    stat: "35% bounce rate",    sub: "Product discovery unclear" },
  { stage: "Add to Cart",     stat: "Drop-off",           sub: "Users not reaching checkout" },
  { stage: "Checkout Stage",  stat: "26% abandonment",    sub: "Purchase friction" },
];
const STRATEGY = [
  { icon: "◎", title: "Conversion-Focused UX Redesign",       items: ["Simplified website architecture","Improved product discovery flow","Clearer navigation structure","Optimized call-to-action placement"] },
  { icon: "⬡", title: "Shopify Development & Optimization",    items: ["Scalable Shopify architecture","Custom layout development","Optimized components for performance","Consistent experience across devices"] },
  { icon: "◈", title: "Website Performance Optimization",      items: ["Script optimization","Image compression","Faster loading speeds","Asset delivery improvements"] },
  { icon: "◇", title: "PPC Campaign Optimization",             items: ["Better audience targeting","Improved creative testing","Smarter budget allocation","Campaign restructuring to improve targeting"] },
];
const BEFORE_AD = [["61 Purchases","$46.20","$2,818.20"],["49 Purchases","$42.30","$2,072.70"],["73 Purchases","$50.10","$3,657.30"]];
const AFTER_AD  = [["122 Purchases","$24.00","$2,928.00"],["105 Purchases","$22.30","$2,341.50"],["137 Purchases","$25.40","$3,479.80"]];
const ENGAGEMENT = [
  { label: "Landing Page Exit",     before: "62%", after: "32%", beforeN: 62, afterN: 32 },
  { label: "Product Bounce",        before: "35%", after: "22%", beforeN: 35, afterN: 22 },
  { label: "Checkout Abandonment",  before: "26%", after: "14%", beforeN: 26, afterN: 14 },
];

const NAV = [
  { label: "Cover",        num: "01" },
  { label: "Screenshots",  num: "02" },
  { label: "Overview",     num: "03" },
  { label: "Challenges",   num: "04" },
  { label: "Strategy",     num: "05" },
  { label: "Ad Results",   num: "06" },
  { label: "Web Speed",    num: "07" },
  { label: "Engagement",   num: "08" },
  { label: "Before",       num: "09" },
  { label: "After",        num: "10" },
  { label: "Impact",       num: "11" },
];

/* ─── Primitives ──────────────────────────────────────────────────── */

/** Clean light photo placeholder */
const PhotoSlot = ({ label = "", className = "", style = {} }) => (
  <div
    className={`relative overflow-hidden rounded-2xl flex flex-col items-center justify-center gap-2 ${className}`}
    style={{ background: "#ECEAE5", border: `1.5px dashed ${C.borderMid}`, ...style }}
  >
    <svg className="w-7 h-7" style={{ color: "#BDBAB2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    {label && <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "#BDBAB2" }}>{label}</p>}
  </div>
);

const OrangeLine = () => <div className="w-full h-[10px]" style={{ background: C.orange }} />;

const Tag = () => (
  <span className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: C.orange }}>
    #TheBrainBurners
  </span>
);

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: C.textMuted }}>{children}</p>
);

const OrangeHeading = ({ children, className = "" }) => (
  <h2
    className={`font-bold leading-[1.1] tracking-[-0.015em] mb-5 ${className}`}
    style={{ color: C.orange, textDecoration: "underline", textUnderlineOffset: 7 }}
  >
    {children}
  </h2>
);

const SliderNav = ({ active, onNav, total }) => {
  const trackRef = useRef(null);
  const activeRef = useRef(null);
  const progress = ((active + 1) / total) * 100;

  useEffect(() => {
    const pill = activeRef.current;
    const track = trackRef.current;
    if (!pill || !track) return;
    track.scrollTo({
      left: pill.offsetLeft - track.clientWidth / 2 + pill.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "#fff", boxShadow: "0 1px 0 #e8e8e8" }}
    >
      <div className="relative h-[3px] w-full bg-[#f0f0f0]">
        <div
          className="absolute inset-y-0 left-0 transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: `${progress}%`, background: C.orange }}
        />
      </div>

      <div className="flex items-center h-[52px] px-4 sm:px-6 gap-2">
        <div className="shrink-0 flex items-center gap-2 pr-4 border-r border-gray-100">
          <div className="w-5 h-5 rounded-sm" style={{ background: C.orange }} />
          <span className="hidden sm:block font-black text-[13px] text-gray-900 tracking-tight whitespace-nowrap">
            ORION BLINDS
          </span>
          <span className="text-gray-400 text-xs hidden sm:block">Case Study</span>
        </div>

        <button
          onClick={() => active > 0 && onNav(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition hover:bg-gray-100 active:scale-95 disabled:opacity-20"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3.5L6 8l4 4.5" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className="flex-1 flex items-center gap-1.5 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {NAV.map((item, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button
                key={item.label}
                ref={isActive ? activeRef : null}
                onClick={() => onNav(i)}
                className="shrink-0 flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11.5px] font-semibold whitespace-nowrap transition-all duration-200"
                style={
                  isActive
                    ? { background: C.orange, color: "#fff" }
                    : isDone
                    ? { background: "#FEF0EA", color: C.orange }
                    : { background: "#f3f3f3", color: "#777" }
                }
              >
                <span
                  className="w-[18px] h-[18px] rounded-full shrink-0 flex items-center justify-center text-[9px] font-black"
                  style={
                    isActive
                      ? { background: "rgba(255,255,255,0.28)", color: "#fff" }
                      : isDone
                      ? { background: C.orange, color: "#fff" }
                      : { background: "#e3e3e3", color: "#999" }
                  }
                >
                  {isDone ? (
                    <svg
                      viewBox="0 0 10 10"
                      className="w-2.5 h-2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 5.2l2 2 4-4" />
                    </svg>
                  ) : (
                    item.num
                  )}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => active < total - 1 && onNav(active + 1)}
          disabled={active === total - 1}
          aria-label="Next"
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition hover:bg-gray-100 active:scale-95 disabled:opacity-20"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3.5L10 8l-4 4.5" />
          </svg>
        </button>

        <div className="shrink-0 hidden sm:flex items-baseline gap-0.5 pl-3 border-l border-gray-100 text-[12px] tabular-nums">
          <span className="font-black" style={{ color: C.orange }}>
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="text-gray-300 mx-0.5 font-normal">/</span>
          <span className="text-gray-400 font-semibold">{String(total).padStart(2, "0")}</span>
        </div>
      </div>
    </nav>
  );
};

/** Animated count-up */
const CountUp = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = target / 60;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [started, target]);
  return <span ref={ref}>{val}{suffix}</span>;
};

/** Radial progress ring */
const PerfRing = ({ score, strokeColor, trackColor }) => {
  const r = 42, circ = 2 * Math.PI * r, offset = circ * (1 - score / 100);
  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90">
        <circle cx="55" cy="55" r={r} strokeWidth="8" stroke={trackColor} fill="none" />
        <motion.circle cx="55" cy="55" r={r} strokeWidth="8" fill="none" strokeLinecap="round"
          stroke={strokeColor}
          style={{ strokeDasharray: circ, strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-[2rem] font-black" style={{ color: C.text }}>{score}</p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   1 · HERO
═══════════════════════════════════════════════════════════════════ */
function HeroSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={0} style={{ background: "#DDE6E5" }}>
      {/* eyebrow */}
      <div className="flex items-center justify-center gap-3 pt-10 pb-6">
        <div className="h-px w-8" style={{ background: "#BBC9C8" }} />
        <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#7A9A97" }}>Case Study</p>
        <div className="h-px w-8" style={{ background: "#BBC9C8" }} />
      </div>

      <motion.div {...fadeUp()} className="text-center px-8 pb-10">
        <div className="inline-flex items-center justify-center gap-3 flex-wrap">
          <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-black tracking-[-0.03em] leading-none" style={{ color: C.text }}>
            Built On Shopify
          </h1>
          <svg viewBox="0 0 50 57" className="w-12 h-12 shrink-0 mb-1" fill="none">
            <rect width="50" height="57" rx="8" fill="#96BF48" />
            <path d="M34 13.5c-.2 0-3.4-.3-3.4-.3s-2.3-2.2-2.5-2.4c-.2-.2-.6-.1-.8-.1L25 11.9s-.8-2.4-2.7-3.4c-2.6-1.4-5.1.2-5.7 2.1l-4.3 1.3s-1.4.4-1.4 1.6L9 43l18.5 4 10-2.4L34 13.5z" fill="white"/>
            <path d="M30.6 13.2s-2.3-2.2-2.5-2.4c-.1-.1-.2-.1-.3-.1v32.6l10-2.4-3.7-25.4s-3.3-.3-3.5-.3z" fill="#5A8E1A"/>
            <path d="M22.6 20.3l-1.2 3.6s-1.1-.6-2.4-.5c-1.9.1-1.9 1.3-1.9 1.6.1 1.7 4.5 2.1 4.8 6 .2 3.1-1.6 5.2-4.2 5.4-3.1.2-4.7-1.6-4.7-1.6l.6-2.8s1.6 1.2 2.9 1.2c.9 0 1.2-.7 1.2-1.2-.1-2.2-3.7-2.1-3.9-5.6-.2-3 1.8-6 6-6.3 1.6-.1 2.8.2 2.8.2z" fill="#96BF48"/>
          </svg>
        </div>
        <p className="mt-3 text-base font-medium" style={{ color: "#6A8E8C" }}>Orion Blinds — Premium E-Commerce Transformation</p>
      </motion.div>

      {/* Laptop frame */}
      <motion.div {...fadeIn(0.15)} className="px-8 pb-0">
        <div className="mx-auto max-w-5xl">
          <img src="/case-studies/orion/macbook.png" alt="" />
        </div>
      </motion.div>

      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2 · SHOWCASE
═══════════════════════════════════════════════════════════════════ */
function ShowcaseSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={1} >
      <div className="w-full">
        <img src="/case-studies/orion/portfolio.png" alt="" className="block w-full h-[600px] object-cover" />
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3 · OVERVIEW
═══════════════════════════════════════════════════════════════════ */
function OverviewSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={2} style={{ background: C.surface }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div {...fadeUp()} className="lg:col-span-7">
            <div className="flex items-start justify-between mb-2">
              <SectionLabel>Overview</SectionLabel>
              <Tag />
            </div>
            <OrangeHeading className="text-[clamp(2rem,4.5vw,3.4rem)] max-w-3xl">
              Transforming Orion Blinds Into a High-Performance E-Commerce Experience
            </OrangeHeading>

            <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: C.textMuted }}>Client</p>
            <p className="text-xl font-bold mb-5" style={{ color: C.text }}>Orion Blinds — Premium Custom Window Coverings</p>
            <p className="text-[1.1rem] leading-[1.75] max-w-3xl mb-8" style={{ color: C.textMid }}>
              Orion Blinds provides high-quality blinds and shades designed for light control, privacy, and modern interiors.
              With decades of experience and trusted suppliers, the company delivers reliable window covering solutions.
              However, despite strong products and steady traffic from ads and referrals, the website was not converting visitors effectively.
            </p>

            <div className="border-l-[3px] pl-5" style={{ borderColor: C.orange }}>
              <p className="text-lg font-bold mb-1" style={{ color: C.text }}>The Objective Was Clear :</p>
              <p className="text-[1.05rem] leading-relaxed max-w-2xl" style={{ color: C.textMid }}>
                Transform the website into a fast, conversion-focused digital platform that supports scalable growth.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-5 pt-16 space-y-5">
            {/* Scope */}
            <motion.article {...fadeUp(0.1)} className="rounded-3xl p-8"
              style={{ background: "#111", border: "1px solid #222" }}>
              <p className="text-[1rem] font-bold uppercase text-white/40 mb-5">Project Scope</p>
              <ul className="space-y-3">
                {SCOPE.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-white/85 text-[0.95rem]">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: "#1e1e1e", color: C.orange, border: "1px solid #333" }}>
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Key Results */}
            <motion.article {...fadeUp(0.2)} className="rounded-3xl p-8"
              style={{ background: "#111", border: "1px solid #222" }}>
              <p className="text-[1rem] font-bold tracking-[0.22em] uppercase text-white/40 mb-5">Key Results</p>
              <div className="space-y-5">
                {RESULTS.map(({ label, before, after }) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <p className="text-white/50 text-sm flex-1 leading-snug">{label}</p>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xl font-black" style={{ color: "#E05252" }}>{before}</span>
                      <span className="text-white/20 text-sm">→</span>
                      <span className="text-xl font-black" style={{ color: C.greenLight }}>{after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4 · CHALLENGES
═══════════════════════════════════════════════════════════════════ */
function ChallengesSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={3} style={{ background: C.bg }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16">
        <motion.div {...fadeUp()}>
          <div className="flex justify-end mb-6"><Tag /></div>
          <OrangeHeading className="text-[clamp(2rem,4.5vw,3.4rem)]">Key Challenges</OrangeHeading>
          <div className="w-14 h-0.5 mb-10" style={{ background: C.orange }} />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {CHALLENGES.map(({ title, desc }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.07)}
              className="rounded-2xl p-6"
              style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black shrink-0 leading-none mt-0.5" style={{ color: C.orange }}>
                  0{i + 1}
                </span>
                <div>
                  <p className="font-bold text-base mb-1.5" style={{ color: C.text }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: C.textMid }}>{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)}>
          <h3 className="font-bold text-xl mb-8" style={{ color: C.text, textDecoration: "underline", textUnderlineOffset: 5, textDecorationColor: C.borderMid }}>
            Where the Conversion Journey Was Breaking :
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {FUNNEL.map(({ stage, stat, sub }, i) => (
              <div key={stage} className="rounded-2xl p-5"
                style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                <div className="w-7 h-7 rounded-lg mb-4 flex items-center justify-center text-xs font-bold"
                  style={{ background: C.bg, color: C.orange, border: `1px solid ${C.border}` }}>
                  {i + 1}
                </div>
                <PhotoSlot label="" className="w-full h-16 mb-4" />
                <p className="font-bold text-sm mb-1" style={{ color: C.text }}>{stage}</p>
                <p className="font-black text-sm" style={{ color: i === 0 || i === 3 ? C.orange : C.textMuted }}>{stat}</p>
                <p className="text-xs mt-1 leading-snug" style={{ color: C.textMuted }}>{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5 · STRATEGY
═══════════════════════════════════════════════════════════════════ */
function StrategySection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={4} style={{ background: C.surface }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16">
        <motion.div {...fadeUp()}>
          <OrangeHeading className="text-[clamp(2rem,4.5vw,3.4rem)]">The Strategy</OrangeHeading>
          <div className="w-14 h-0.5 mb-6" style={{ background: C.orange }} />
          <p className="text-[1.1rem] leading-relaxed max-w-3xl mb-2" style={{ color: C.textMid }}>
            To solve the conversion challenges, we implemented a focused optimization strategy combining UX
            improvements, performance upgrades, and marketing efficiency.
          </p>
          <p className="text-[1.1rem] leading-relaxed max-w-3xl mb-12" style={{ color: C.textMid }}>
            The goal was not just a redesign, but building a conversion-focused digital experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {STRATEGY.map(({ icon, title, items }, i) => (
            <motion.article key={title} {...fadeUp(i * 0.09)}
              className="rounded-2xl p-7"
              style={{ background: C.surface2, border: `1px solid ${C.border}` }}>
              <div className="flex items-start gap-3 mb-5">
                <span className="text-xl mt-0.5 shrink-0" style={{ color: C.orange }}>{icon}</span>
                <h3 className="font-bold text-base leading-snug" style={{ color: C.text, textDecoration: "underline", textUnderlineOffset: 4, textDecorationColor: C.borderMid }}>
                  {title}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: C.textMid }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: C.orange }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6 · PERFORMANCE TRANSFORMATION
═══════════════════════════════════════════════════════════════════ */
function PerfTransformSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={5} style={{ background: C.bg }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16">
        <motion.div {...fadeUp()}>
          <div className="flex justify-end mb-6"><Tag /></div>
          <OrangeHeading className="text-[clamp(2rem,4.5vw,3.4rem)]">Performance Transformation</OrangeHeading>
          <div className="w-14 h-0.5 mb-6" style={{ background: C.orange }} />
          <p className="text-[1.1rem] leading-relaxed max-w-3xl mb-12" style={{ color: C.textMid }}>
            The combination of UX improvements, technical optimization, and campaign restructuring produced measurable
            performance improvements across the website and marketing channels.
          </p>
          <p className="font-bold text-xl mb-7" style={{ color: C.text }}>Advertising Efficiency</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[
            { label: "Before", color: C.red,   cpa: "CPA Between $42–$50",  rows: BEFORE_AD, imgLabel: "Before — Ad Campaign Results" },
            { label: "After",  color: C.green,  cpa: "CPA Reduced To $22–$25", rows: AFTER_AD, imgLabel: "After — Ad Campaign Results" },
          ].map(({ label, color, cpa, rows, imgLabel }, idx) => (
            <motion.article key={label} {...fadeUp(idx * 0.1)}
              className="rounded-2xl p-6"
              style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <p className="text-3xl font-black mb-5" style={{ color }}>{label}</p>
              <PhotoSlot label={imgLabel} className="w-full h-44 mb-5" />
              <table className="w-full text-sm mb-5">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Results","Cost / result","Amount spent"].map(h => (
                      <th key={h} className="pb-2 text-left text-xs font-semibold" style={{ color: C.textMuted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.bg}` }}>
                      {row.map((cell, j) => (
                        <td key={j} className="py-2 text-xs" style={{ color: C.textMid }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="font-black text-lg" style={{ color }}>{cpa}</p>
            </motion.article>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)}>
          <PhotoSlot label="Performance Transformation Visual" className="w-full h-56" />
        </motion.div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   7 · WEBSITE PERFORMANCE
═══════════════════════════════════════════════════════════════════ */
function WebPerfSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={6} style={{ background: C.surface }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16">
        <motion.div {...fadeUp()}>
          <div className="flex justify-end mb-6"><Tag /></div>
          <OrangeHeading className="text-[clamp(1.8rem,4vw,3.2rem)]">
            Website Performance
            <span className="block text-[0.65em] font-semibold mt-1" style={{ color: C.textMuted }}>
              Google PageSpeed Insights Impact
            </span>
          </OrangeHeading>
          <div className="w-14 h-0.5 mb-12" style={{ background: C.orange }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Before", color: C.red, ringStroke: C.red, ringTrack: "#F5DCDC",
              score: 49,
              scores: [{l:"Performance",v:"49",c:C.red},{l:"Accessibility",v:"80",c:"#F97316"},{l:"Best Practices",v:"92",c:C.green},{l:"SEO",v:"92",c:C.green}],
              metrics: ["Performance Score: 49","Total Blocking Time: 1260 ms","Largest Contentful Paint: 3.9 s"],
              imgLabel: "PageSpeed Before Screenshot",
            },
            {
              label: "After", color: C.green, ringStroke: C.green, ringTrack: "#D4F4DF",
              score: 94,
              scores: [{l:"Performance",v:"94",c:C.green},{l:"Accessibility",v:"92",c:C.green},{l:"Best Practices",v:"100",c:C.green},{l:"SEO",v:"100",c:C.green}],
              metrics: ["Performance Score: 94","Total Blocking Time: 190 ms","Largest Contentful Paint: 1.2s"],
              imgLabel: "PageSpeed After Screenshot",
            },
          ].map(({ label, color, ringStroke, ringTrack, score, scores, metrics, imgLabel }, idx) => (
            <motion.article key={label} {...fadeUp(idx * 0.1)}
              className="rounded-2xl p-7"
              style={{ background: C.surface2, border: `1px solid ${C.border}` }}>
              <p className="text-4xl font-black mb-6" style={{ color }}>{label}</p>

              {/* Ring + score bubbles */}
              <div className="flex items-center gap-5 mb-6">
                <PerfRing score={score} strokeColor={ringStroke} trackColor={ringTrack} />
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {scores.map(({ l, v, c }) => (
                    <div key={l} className="flex flex-col items-center rounded-xl px-2 py-2"
                      style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                      <span className="text-base font-black" style={{ color: c }}>{v}</span>
                      <span className="text-[9px] font-medium text-center leading-tight mt-0.5" style={{ color: C.textMuted }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              <PhotoSlot label={imgLabel} className="w-full h-40 mb-6" />

              <ul className="space-y-2">
                {metrics.map(m => (
                  <li key={m} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   8 · ENGAGEMENT
═══════════════════════════════════════════════════════════════════ */
function EngagementSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={7} style={{ background: C.bg }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16">
        <motion.div {...fadeUp()}>
          <div className="flex justify-end mb-6"><Tag /></div>
          <OrangeHeading className="text-[clamp(2rem,4.5vw,3.4rem)]">Engagement Metrics</OrangeHeading>
          <div className="w-14 h-0.5 mb-6" style={{ background: C.orange }} />
          <p className="text-[1.1rem] leading-relaxed max-w-3xl mb-2" style={{ color: C.textMid }}>
            After implementing UX improvements, performance optimization, and campaign restructuring, the website
            began delivering significantly stronger engagement across the user journey.
          </p>
          <p className="text-[1.1rem] leading-relaxed max-w-3xl mb-12" style={{ color: C.textMid }}>
            Visitors were able to navigate products faster, interact with pages more smoothly, and complete
            purchases with fewer friction points.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <motion.div {...fadeUp(0.05)} className="rounded-2xl p-6"
            style={{ background: "#FEF5F5", border: `1px solid #F5DCDC` }}>
            <p className="font-black text-lg mb-4" style={{ color: C.red }}>Before Optimization</p>
            <ul className="space-y-2.5">
              {["Landing Page Exit: 62%","Product Page Bounce: 35%","Checkout Abandonment: 26%"].map(t => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: C.red }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.red }} />{t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="rounded-2xl p-6"
            style={{ background: "#F2FBF5", border: `1px solid #C8EDD6` }}>
            <p className="font-black text-lg mb-4" style={{ color: C.green }}>After Optimization</p>
            <ul className="space-y-2.5">
              {["Product Page Bounce: 22%","Checkout Abandonment: 14%","Landing Page Exit: 32%"].map(t => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: C.green }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.green }} />{t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Big metric cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {ENGAGEMENT.map(({ label, beforeN, afterN }, i) => (
            <motion.article key={label} {...fadeUp(i * 0.08)}
              className="rounded-2xl overflow-hidden"
              style={{ background: C.surface, border: `1px solid ${C.border}` }}>
              <div className="px-6 pt-5 pb-3">
                <p className="font-bold text-base" style={{ color: C.text }}>{label}</p>
              </div>
              <div className="grid grid-cols-[1fr_20px_1fr]">
                <div className="px-5 pb-6 flex flex-col items-center" style={{ background: "#FEF5F5" }}>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#C08080" }}>Before</p>
                  <p className="text-[2.8rem] font-black leading-none" style={{ color: C.red }}>
                    <CountUp target={beforeN} suffix="%" />
                  </p>
                </div>
                <div className="flex items-center justify-center text-sm" style={{ color: C.orange }}>→</div>
                <div className="px-5 pb-6 flex flex-col items-center" style={{ background: "#F2FBF5" }}>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#5A9970" }}>After</p>
                  <p className="text-[2.8rem] font-black leading-none" style={{ color: C.green }}>
                    <CountUp target={afterN} suffix="%" />
                  </p>
                </div>
              </div>
              {/* gradient bar */}
              <div className="h-1.5 w-full" style={{ background: C.border }}>
                <motion.div className="h-full" style={{ background: `linear-gradient(90deg, ${C.red}, ${C.green})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   9 · BEFORE / AFTER DESIGN
═══════════════════════════════════════════════════════════════════ */
function BeforeAfterSection({ beforeRef, afterRef }) {
  return (
    <section ref={beforeRef} data-nav-index={8} style={{ background: C.surface }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16 space-y-16">
        <motion.div {...fadeUp()}>
          <h3 className="text-[clamp(1.9rem,3.5vw,3rem)] font-black uppercase tracking-[0.06em] text-center mb-3"
            style={{ color: C.red, textDecoration: "underline", textUnderlineOffset: 8 }}>
            Before Design (Key Issues)
          </h3>
          <p className="text-center text-xs font-bold tracking-[0.14em] uppercase mb-8" style={{ color: C.textMuted }}>
            Weak Visual Hierarchy · Poor Product Discovery · Cluttered Layout · Unclear Conversion Path
          </p>
          <PhotoSlot label="Before Design Screenshots" className="w-full h-[460px]" />
        </motion.div>

        <motion.div ref={afterRef} data-nav-index={9} {...fadeUp(0.1)}>
          <h3 className="text-[clamp(1.9rem,3.5vw,3rem)] font-black uppercase tracking-[0.06em] text-center mb-3"
            style={{ color: C.green, textDecoration: "underline", textUnderlineOffset: 8 }}>
            After Design (Key Improvements)
          </h3>
          <p className="text-center text-xs font-bold tracking-[0.14em] uppercase mb-8" style={{ color: C.textMuted }}>
            Clear Visual Hierarchy · Improved Product Discovery · Structured Layout · Conversion-Focused Flow
          </p>
          <PhotoSlot label="After Design Screenshots" className="w-full h-[460px]" />
        </motion.div>
      </div>
      <OrangeLine />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   10 · BUSINESS IMPACT
═══════════════════════════════════════════════════════════════════ */
function BusinessImpactSection({ sectionRef }) {
  return (
    <section ref={sectionRef} data-nav-index={10} style={{ background: C.bg }}>
      <div className="px-6 sm:px-10 lg:px-16 py-16 pb-20">
        <motion.div {...fadeUp()}>
          <div className="flex justify-end mb-6"><Tag /></div>
          <OrangeHeading className="text-[clamp(2rem,4.5vw,3.4rem)]">Business Impact</OrangeHeading>
          <div className="w-14 h-0.5 mb-10" style={{ background: C.orange }} />
        </motion.div>

        <motion.ul {...fadeUp(0.05)} className="space-y-4 mb-14 max-w-3xl">
          {[
            "The Orion Blinds project demonstrates how performance optimization, UX design, and marketing strategy must work together to unlock digital growth.",
            "By improving speed, usability, and campaign efficiency, the website evolved from a basic informational platform into a high-performance commerce experience.",
          ].map(t => (
            <li key={t} className="flex gap-3 text-[1.1rem] leading-relaxed" style={{ color: C.textMid }}>
              <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: C.orange }} />{t}
            </li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp(0.1)}>
          <h3 className="font-bold mb-5 text-[clamp(1.9rem,4vw,3.2rem)]"
            style={{ color: C.orange, textDecoration: "underline", textUnderlineOffset: 6 }}>
            Strategic Impact
          </h3>
          <ul className="space-y-3 mb-14 max-w-3xl">
            {[
              "Faster website performance improved visitor engagement.",
              "Clearer product discovery increased exploration of product categories.",
              "Improved conversion pathways reduced friction in the buying journey.",
              "More efficient advertising campaigns significantly lowered acquisition costs.",
              "Together, these changes created a stronger digital foundation capable of supporting long-term business growth.",
            ].map(t => (
              <li key={t} className="flex gap-3 text-[1.1rem] leading-relaxed" style={{ color: C.textMid }}>
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: C.orange }} />{t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Testimonial */}
        <motion.blockquote {...fadeUp(0.15)} className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          style={{ background: "#FDE8D6", border: `1px solid #F5CDAA` }}>
          <div className="absolute top-4 left-7 text-[7rem] leading-none font-serif select-none"
            style={{ color: "#F5C9A8", opacity: 0.6 }}>"</div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5" style={{ color: C.orange }}>
              Client Feedback
            </p>
            <p className="text-[1.2rem] font-semibold leading-[1.65] mb-6" style={{ color: "#2A1A0A" }}>
              Our website performance and customer engagement improved dramatically after the optimization work.
              The site is significantly faster, the product experience is clearer, and our advertising campaigns
              are delivering far better results. The improvements made a real difference in how customers interact
              with our brand online.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5" style={{ background: C.orange }} />
              <p className="font-bold text-sm" style={{ color: "#6A3A1A" }}>Orion Blinds Team</p>
            </div>
          </div>
        </motion.blockquote>

        <motion.div {...fadeUp(0.2)}
          className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${C.border}` }}>
          <p className="text-sm font-semibold" style={{ color: C.textMuted }}>Case Study by Website With Robin</p>
          <a href="" className="text-sm font-bold underline underline-offset-4" style={{ color: C.orange }}>
            ← Back to Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════ */
export default function OrionCaseStudyPage() {
  const mainRef = useRef(null);
  const sectionRefs = useRef(Array.from({ length: NAV.length }, () => null));
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const updateActiveFromScroll = () => {
      const marker = root.scrollTop + 96; // accounts for fixed navbar height + breathing room
      let nextActive = 0;

      sectionRefs.current.forEach((el, index) => {
        if (!el) return;
        const top =
          el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
        if (top <= marker) nextActive = index;
      });

      setActive(nextActive);
    };

    updateActiveFromScroll();
    root.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);

    return () => {
      root.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, []);

  const onNav = (index) => {
    const root = mainRef.current;
    const el = sectionRefs.current[index];
    if (!root || !el) return;

    const targetTop =
      el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 60;
    root.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <main
      ref={mainRef}
      className={`${pageFont.variable} h-screen overflow-x-clip overflow-y-auto font-[family-name:var(--font-orion)]`}
      style={{ background: C.bg, color: C.text }}
    >
      <SliderNav active={active} onNav={onNav} total={NAV.length} />
      <div className="mx-auto w-full max-w-none pt-[55px]">
        <HeroSection sectionRef={(el) => { sectionRefs.current[0] = el; }} />
        <ShowcaseSection sectionRef={(el) => { sectionRefs.current[1] = el; }} />
        <OverviewSection sectionRef={(el) => { sectionRefs.current[2] = el; }} />
        <ChallengesSection sectionRef={(el) => { sectionRefs.current[3] = el; }} />
        <StrategySection sectionRef={(el) => { sectionRefs.current[4] = el; }} />
        <PerfTransformSection sectionRef={(el) => { sectionRefs.current[5] = el; }} />
        <WebPerfSection sectionRef={(el) => { sectionRefs.current[6] = el; }} />
        <EngagementSection sectionRef={(el) => { sectionRefs.current[7] = el; }} />
        <BeforeAfterSection
          beforeRef={(el) => { sectionRefs.current[8] = el; }}
          afterRef={(el) => { sectionRefs.current[9] = el; }}
        />
        <BusinessImpactSection sectionRef={(el) => { sectionRefs.current[10] = el; }} />
      </div>
    </main>
  );
}

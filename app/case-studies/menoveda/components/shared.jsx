"use client";

import { animate, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const expoEase = [0.16, 1, 0.3, 1];

export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 68,
        damping: 22,
        mass: 0.95,
        delay
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className = "", delayChildren = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.11,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 76, damping: 22, mass: 0.92 }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxWrap({ children, className = "", from = 18, to = -18 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const ySmooth = useSpring(y, { stiffness: 62, damping: 24, mass: 1.05 });
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.02, 1]);
  const scaleSmooth = useSpring(scaleRange, { stiffness: 70, damping: 24, mass: 1 });

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu will-change-transform ${className}`}
      style={{ y: ySmooth, scale: scaleSmooth }}
    >
      {children}
    </motion.div>
  );
}

export function SectionIntro({ label, title, description, className = "" }) {
  return (
    <Reveal className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5a7c6d]">{label}</p>
      <h2 className="mt-4 max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#183227] md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-6 max-w-[42rem] text-[17px] leading-[1.9] text-[#3f6253]">{description}</p> : null}
    </Reveal>
  );
}

export function SectionDivider() {
  return (
    <div className="relative my-0 h-10 w-full">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#6f9382]/35 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#a8c1b245_0%,#a8c1b200_68%)] blur-xl" />
    </div>
  );
}

export function ArtifactFrame({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.7 }}
      className={`transform-gpu rounded-[1.5rem] border border-[#d6e3d4] bg-white/78 p-2 shadow-[0_24px_60px_rgba(30,49,40,0.13)] backdrop-blur-xl will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ label, value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest))
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl border border-[#d4e6d8] bg-white/70 p-6 backdrop-blur-sm"
      whileHover={{
        y: -3,
        scale: 1.015,
        boxShadow: "0 18px 36px rgba(31,59,48,0.16)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.75 }}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-[#4e6d5f]">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-[#1f3b30] md:text-5xl">{count}%</p>
    </motion.div>
  );
}

export function ScoreRing({ label, score }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const endOffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      className="rounded-3xl border border-[#d5e4d6] bg-white/75 p-6 text-center shadow-[0_16px_42px_rgba(33,53,42,0.12)]"
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 24px 54px rgba(33,53,42,0.18)",
      }}
      transition={{ type: "spring", stiffness: 210, damping: 22, mass: 0.75 }}
    >
      <div className="relative mx-auto h-28 w-28">
        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#dde9dd" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#2f624f"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: endOffset }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.3, ease: expoEase }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-xl font-semibold text-[#1f3b30]">{score}</div>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#476658]">{label}</p>
    </motion.div>
  );
}

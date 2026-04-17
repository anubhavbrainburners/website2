"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Single selectable demo card with stacked preview images and hover transitions.
 */
export default function SelectDemoCard({
  item,
  onHoverBackgroundChange,
  onHoverAccentChange,
  isMobileActive
}) {
  const ref = useRef(null);
  const revealInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (revealInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      });
    }
  }, [controls, revealInView]);

  const handleMouseEnter = () => {
    onHoverBackgroundChange?.(item.backgroundColorHover ?? "#000000");
    onHoverAccentChange?.(item.accentColorHover ?? "#ffffff");
  };

  const handleMouseLeave = () => {
    onHoverBackgroundChange?.("#000000");
    onHoverAccentChange?.("#ffffff");
  };

  return (
    <motion.article
      ref={ref}
      data-demo-id={item.id}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      className="text-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`demo-hover relative ${isMobileActive ? "is-mobile-active" : ""}`}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
        >
          <Image
            src={item.img1}
            alt={`${item.title} primary preview`}
            width={900}
            height={1280}
            className="img-1 relative z-[3] mx-auto w-[60%] shadow-soft"
            loading="eager"
          />
          <Image
            src={item.img2}
            alt={`${item.title} secondary preview`}
            width={900}
            height={1280}
            className="img-2 absolute"
            loading="eager"
          />
          <Image
            src={item.img3}
            alt={`${item.title} tertiary preview`}
            width={900}
            height={1280}
            className="img-3 absolute"
            loading="eager"
          />
        </a>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="demo-title shuffle mt-3 inline-block"
        >
          {item.title}
        </a>
      </div>
    </motion.article>
  );
}

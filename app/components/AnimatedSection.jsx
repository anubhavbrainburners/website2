"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useIntersection from "../animations/useIntersection";

export default function AnimatedSection({
  children,
  className = "",
  y = 24,
  delay = 0,
  once = true,
  threshold = 0.2
}) {
  const [ref, isIntersecting] = useIntersection({ threshold });
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : isMobile ? 8 : y }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : once ? {} : { opacity: 0, y }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : isMobile ? 0.55 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}

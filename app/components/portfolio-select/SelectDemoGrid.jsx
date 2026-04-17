"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SelectDemoCard from "./SelectDemoCard";

/**
 * Demo selector grid matching the reference two-column responsive layout.
 */
export default function SelectDemoGrid({
  demos,
  onHoverBackgroundChange,
  onHoverAccentChange
}) {
  const [activeMobileId, setActiveMobileId] = useState(null);
  const demoById = useMemo(
    () => Object.fromEntries(demos.map((item) => [item.id, item])),
    [demos]
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

    const updateCenterActiveCard = () => {
      if (!isMobile()) {
        setActiveMobileId(null);
        onHoverBackgroundChange?.("#000000");
        onHoverAccentChange?.("#ffffff");
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      const cards = Array.from(document.querySelectorAll("[data-demo-id]"));
      let closestId = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = card.getAttribute("data-demo-id");
        }
      });

      setActiveMobileId(closestId);
      onHoverBackgroundChange?.(
        closestId ? demoById[closestId]?.backgroundColorHover ?? "#000000" : "#000000"
      );
      onHoverAccentChange?.(
        closestId ? demoById[closestId]?.accentColorHover ?? "#ffffff" : "#ffffff"
      );
    };

    const onScroll = () => window.requestAnimationFrame(updateCenterActiveCard);

    updateCenterActiveCard();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateCenterActiveCard);
    window.addEventListener("orientationchange", updateCenterActiveCard);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateCenterActiveCard);
      window.removeEventListener("orientationchange", updateCenterActiveCard);
    };
  }, [demoById, onHoverBackgroundChange, onHoverAccentChange]);

  return (
    <motion.section
      className="section-anim min-h-screen pb-32 pt-12 md:pb-28 md:pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto w-full max-w-[1160px] px-4 md:px-6">
        <div className="grid gap-x-10 gap-y-28 md:grid-cols-2 md:gap-y-20">
          {demos.map((item) => (
            <SelectDemoCard
              key={item.id}
              item={item}
              onHoverBackgroundChange={onHoverBackgroundChange}
              onHoverAccentChange={onHoverAccentChange}
              isMobileActive={activeMobileId === item.id}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

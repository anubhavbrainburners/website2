"use client";

import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-12 py-3 md:py-4 text-sm md:text-lg transition-all duration-500 will-change-transform";

  const variantClass =
    variant === "secondary"
      ? "border border-primary text-primary secondary-btn-animation"
      : "bg-[linear-gradient(75deg,var(--tw-gradient-stops))] from-primary via-secondary to-primary bg-[length:200%_100%] text-[#110d0b] font-semibold hover:bg-right";

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.55 }}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}



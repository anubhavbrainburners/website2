"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({ open, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-4 top-20 z-50 rounded-2xl border border-border bg-card/95 p-6 backdrop-blur"
        >
          <div className="space-y-4 text-sm">
            <Link href="#service" onClick={onClose} className="block">
              Service
            </Link>
            <Link href="#proof" onClick={onClose} className="block">
              Results
            </Link>
            <a
              href="https://www.instagram.com/websitewithrobin?igsh=bnJha25rb3poOHlx&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="block w-full rounded-full border border-primary px-5 py-3 text-center text-primary"
            >
              Our Work
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-0 z-40 bg-transparent">
      <div className="relative mx-auto mt-0 flex max-w-[1280px] items-center justify-between px-6 pt-10 pb-20 md:mx-16 md:py-2 lg:mx-28">
        <Image
          src="/img2.png"
          alt="Logo"
          width={350}
          height={150}
          className="absolute left-1/2 ml-2 w-72 -translate-x-1/2 md:static md:ml-0 md:left-auto md:w-74 md:translate-x-0"
          priority
        />

        <div className="hidden md:block">
          <Link
            href="/portfolio"
            className="secondary-btn-animation inline-flex h-12 items-center justify-center rounded-full border border-primary px-10 text-base text-primary"
          >
            Our Work
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="relative size-10 rounded-full border border-border md:hidden"
          onClick={() => setOpen((state) => !state)}
        >
          <motion.span
            animate={{
              rotate: open ? 45 : 0,
              y: open ? 0 : -6,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
              mass: 0.6,
            }}
            className="absolute left-2 right-2 top-1/2 h-[1.5px] -translate-y-1/2 bg-foreground"
          />

          <motion.span
            animate={{
              rotate: open ? -45 : 0,
              y: open ? 0 : 6,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
              mass: 0.6,
            }}
            className="absolute left-2 right-2 top-1/2 h-[1.5px] -translate-y-1/2 bg-foreground"
          />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

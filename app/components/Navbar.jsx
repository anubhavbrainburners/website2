"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-transparent">
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
          <a
            href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="h-12 px-10 text-base">
              Get In Touch
            </Button>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="relative size-10 rounded-full border border-border md:hidden"
          onClick={() => setOpen((state) => !state)}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 5 : -4 }}
            className="absolute left-2 right-2 top-1/2 h-[1.5px] bg-foreground"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? 5 : 4 }}
            className="absolute left-2 right-2 top-1/2 h-[1.5px] bg-foreground"
          />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

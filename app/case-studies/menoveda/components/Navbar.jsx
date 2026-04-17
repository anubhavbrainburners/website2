"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const accentColor = "#234537";

  return (
    <header className="pointer-events-none relative z-[10020] bg-transparent">
      <div className="relative mx-auto flex h-20 w-full max-w-[1160px] items-center px-4 md:h-24 md:px-6">
        <Link
          href="/portfolio"
          aria-label="Back to portfolio"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:bg-black/10 md:h-14 md:w-14"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 md:h-6 md:w-6"
            aria-hidden="true"
          >
            <path d="M19 12H6" />
            <path d="M12 18l-6-6 6-6" />
          </svg>
        </Link>

        <Link
          href="/"
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2"
          aria-label="Website With Robin home"
        >
          <Image
            src="/img2.png"
            alt="Website With Robin"
            width={220}
            height={70}
            className="h-auto w-50 md:w-60"
            priority
          />
        </Link>

        <div className="h-11 w-11 md:h-14 md:w-14" aria-hidden="true" />
      </div>
    </header>
  );
}

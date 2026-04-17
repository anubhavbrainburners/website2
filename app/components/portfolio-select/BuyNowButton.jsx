"use client";

import Image from "next/image";

/**
 * Fixed "Buy on Envato" action shown in the same position and style as reference.
 */
export default function BuyNowButton() {
  return (
    <div id="buy-now" className="show-on-scroll show">
      <a
        className="btn-buy"
        href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/favicon.png"
          alt="Favicon"
          width={25}
          height={25}
          className="inline h-[18px] w-[18px] align-middle md:h-[25px] md:w-[25px]"
        />
        Get In Touch
      </a>
    </div>
  );
}

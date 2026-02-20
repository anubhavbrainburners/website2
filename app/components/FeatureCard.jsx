"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeatureCard({ item }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
        }
      }}
      className="from-accent mx-auto flex max-w-4xl flex-col justify-center gap-5 rounded-xl border border-border bg-gradient-to-r p-6 md:p-8 md:flex-row"
    >
      <div className="shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          width={135}
          height={135}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex-1 space-y-4 md:space-y-6">
        <div className="space-y-2">
          <p className="text-primary font-semibold uppercase tracking-widest">{item.tag}</p>
          <h3 className="text-[#f5f5f5] text-lg md:text-xl">{item.title}</h3>
        </div>
        <p>{item.description}</p>
      </div>
    </motion.article>
  );
}




import { DM_Sans } from "next/font/google";
import MenovedaCaseStudyClient from "./MenovedaCaseStudyClient";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Menoveda Case Study | Website With Robin",
  description:
    "Menoveda case study: conversion strategy, Shopify development, performance optimization, and PPC scaling."
};

export default function MenovedaCaseStudyPage() {
  return (
    <div className={dmSans.className}>
      <MenovedaCaseStudyClient />
    </div>
  );
}

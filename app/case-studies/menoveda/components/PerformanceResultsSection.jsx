"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArtifactFrame,
  Reveal,
  ScoreRing,
  SectionIntro,
  StaggerGroup,
  StaggerItem,
} from "./shared";

export default function PerformanceResultsSection() {
  return (
    <>
      <section id="results" className="py-10 ">
        <div className="rounded-[1.8rem] border border-[#d4e2d2] bg-white/75 p-7 shadow-[0_24px_64px_rgba(38,62,48,0.11)] backdrop-blur-xl md:p-10">
          <SectionIntro
            label="Results & Metrics"
            title="From Friction to Fluid Experience"
            description="The combined impact of conversion-focused UX, performance-first development, and precision marketing execution produced better conversion quality, reduced acquisition inefficiency, and stronger customer trust."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ArtifactFrame className="rounded-3xl border border-[#eadfca] bg-[#faf5e8]/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7d6d53]">
                Before Optimization
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#5d594f]">
                <li>- Slow page load times</li>
                <li>- Poor mobile performance score</li>
                <li>- Heavy scripts and unoptimized assets</li>
                <li>- Layout shifts impacting usability</li>
                <li>- Higher bounce probability</li>
                <li>- Average user Experience</li>
              </ul>
              <div className="mt-4 rounded-xl border border-[#e2d7c1] bg-white p-2">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#faf6ed]">
                  <Image
                    src="/case-studies/menoveda/page-09-img-01.png"
                    alt="PageSpeed before optimization screenshot"
                    width={1539}
                    height={1196}
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="h-full w-full rounded-lg object-contain transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>
              </div>
            </ArtifactFrame>
            <ArtifactFrame className="rounded-3xl border border-[#d0e1c8] bg-[#edf6e6]/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#406654]">
                After Optimization
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#3b5b4d]">
                <li>- Faster page load speed</li>
                <li>- Improved mobile and desktop scores</li>
                <li>- Optimized images and assets</li>
                <li>- Reduced unused scripts</li>
                <li>- Stable layout and smoother interactions</li>
                <li>- Enhanced user experience</li>
              </ul>
              <div className="mt-4 rounded-xl border border-[#ccdfc3] bg-white p-2">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#f1f8ea]">
                  <Image
                    src="/case-studies/menoveda/page-11-img-01.png"
                    alt="PageSpeed after optimization screenshot"
                    width={1828}
                    height={1371}
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="h-full w-full rounded-lg object-contain transform-gpu transition-transform duration-500 ease-out hover:scale-[1.03]"
                  />
                </div>
              </div>
            </ArtifactFrame>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScoreRing label="Performance" score={94} />
            <ScoreRing label="Accessibility" score={92} />
            <ScoreRing label="Best Practices" score={100} />
            <ScoreRing label="SEO" score={92} />
          </div>

          <StaggerGroup
            className="mt-8 grid gap-3 md:grid-cols-2"
            delayChildren={0.08}
          >
            {[
              "Improved conversion flow and decision clarity",
              "Reduced acquisition cost",
              "Increased revenue efficiency",
              "Elevated brand trust in a sensitive wellness category",
            ].map((item) => (
              <StaggerItem key={item}>
                <div
                  className="
          rounded-2xl bg-white/80 p-5 text-sm text-[#2f4f40]
          shadow-[0_10px_24px_rgba(38,60,48,0.08)]
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:shadow-[0_20px_40px_rgba(38,60,48,0.12)]
          hover:bg-white
        "
                >
                  {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="pt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#101a15] p-8 text-center text-[#f5f6ed] shadow-[0_30px_72px_rgba(8,13,11,0.5)] md:p-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#86a997]">
              Key Takeaway
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
              Building Growth, Not Just Pages
            </h2>
            <div className="mx-auto mt-7 grid max-w-3xl gap-2 text-sm text-[#c7d7cc] md:grid-cols-2">
              <p>- Design as a revenue driver</p>
              <p>- Development as a performance enabler</p>
              <p>- Marketing as a scaling catalyst</p>
              <p>- Strategy as the unifying force</p>
            </div>
            <a
              href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-[#5f9a7b] px-8 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#f8f9ef] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#4e8269] hover:shadow-[0_14px_30px_rgba(95,154,123,0.35)]"
            >
              Start a Project
            </a>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#8aa998]">
              <Link
                href="/portfolio"
                className="transition hover:text-[#d7e4db]"
              >
                Back to Portfolio
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

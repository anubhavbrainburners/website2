"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import Button from "../components/Button";

const rowOne = [
  [
    "Nandini Sharma",
    `"Earlier people visited our site and left. After the rebuild, enquiries started coming daily. The website finally sells for us."`,
  ],
  [
    "Priyanshu Kumar",
    `"I stopped chasing DMs. Clients now book directly from the website, exactly what I wanted."`,
  ],
  [
    "Anshul Singla",
    `"My old site was just a brochure. This one actually filters serious buyers. Saved me hours every week."`,
  ],
  [
    "Manpreet Kaur",
    `"We didn’t change ads or budget, Just the website. Appointments increased within 2 weeks."`,
  ],
  [
    "Vanshveer Puri",
    `"Conversion rate almost doubled. Same traffic, more revenue. That says everything."`,
  ],
];

const rowTwo = [
  [
    "Jashan Singh",
    `"I look 10x more premium now. People trust me before even talking."`,
  ],
  [
    "Aahaan Sharma",
    `"Clients already understand our process before the call. Calls became closing calls."`,
  ],
  [
    "Chirag Thakur",
    `"Leads come during the night now. Waking up to new signups feels unreal."`,
  ],
  [
    "Bhanu Pratap",
    `"The messaging clarity changed everything. Users finally understood what we do."`,
  ],
  [
    "Avneet Gujaral",
    `"Best part is fewer inquiries, but higher quality clients. Exactly what we needed.”`,
  ],
];

function MarqueeRow({ list, duration = "50s" }) {
  const data = [...list, ...list];

  return (
    <div
      style={{ "--duration": duration }}
      className="animate-marque flex min-w-max will-change-transform"
    >
      {data.map(([name, text], index) => (
        <div
          key={`${name}-${index}`}
          className="w-80 shrink-0 flex-grow pl-4 md:w-[24rem]"
        >
          <div className="bg-background h-full space-y-2 rounded-lg border border-border p-6">
            <div className="text-xs">{name}</div>
            <p className="text-xs">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section id="proof" className="relative space-y-28 overflow-hidden pb-16">
      <div className="absolute inset-0 -z-10 flex h-[60vh] w-full -translate-y-1/4 justify-between overflow-hidden md:h-[150rem]">
        <div className="bg-accent h-[30rem] w-[40rem] -translate-x-full translate-y-1/3 rounded-[50%] blur-3xl md:h-[65rem]" />
        <div className="bg-accent relative right-0 h-[30rem] w-[40rem] translate-x-full translate-y-full rounded-[50%] blur-3xl md:h-[65rem] md:translate-y-1/2" />
      </div>

      <main className="mx-auto max-w-screen-md space-y-20 overflow-x-hidden">
        <AnimatedSection className="mx-auto mt-0 max-w-md space-y-5 text-center md:mt-2 md:max-w-screen-sm md:space-y-8">
          <p className="text-sm-semibold from-secondary via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent md:text-xl">
            RESULTS, NOT JUST DESIGNS
          </p>
          <h2 className="text-h1 text-[#f5f5f5] md:text-display">
            Businesses That Choose to{" "}
            <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
              Grow.
            </span>
          </h2>
        </AnimatedSection>

        <div
          style={{
            mask: "linear-gradient(90deg,transparent,white 40%,white 60%,transparent)",
          }}
          className="relative space-y-4 overflow-hidden"
        >
          <MarqueeRow list={rowOne} duration="50s" />
          <MarqueeRow list={rowTwo} duration="35s" />
        </div>
      </main>

      <div className="relative overflow-hidden py-8">
        <div className="bg-accent/50 absolute bottom-28 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl" />
        <AnimatedSection className="mx-auto max-w-md space-y-6 px-6 py-20 text-center md:max-w-4xl">
          <h2 className="text-h1 text-[#f5f5f5] md:text-display">
            Built for Businesses. Trusted for{" "}
            <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
              Results.
            </span>
          </h2>
          <p className="mx-auto max-w-[92vw] text-xl md:max-w-xl">
            Whether you need a new website or want to improve your current one,
            we analyze, fix, and structure it to generate more enquiries and
            better clients.
          </p>
          <a
            href="https://cal.com/robin-thebrainburners.io/audit-with-robin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-6">Book Your Strategy Call</Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

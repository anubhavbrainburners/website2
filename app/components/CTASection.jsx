import AnimatedSection from "./AnimatedSection";
import Button from "./Button";

export default function CTASection({ title, description, buttonText }) {
  return (
    <section className="relative overflow-hidden py-8">
      <div className="bg-accent/50 absolute bottom-28 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl" />
      <AnimatedSection className="mx-auto max-w-md space-y-6 px-6 py-20 text-center md:max-w-4xl">
        <h2 className="text-h1 text-[#f5f5f5] md:text-display">{title}</h2>
        <p className="mx-auto max-w-[92vw] text-xl md:max-w-xl">{description}</p>
        <Button className="mt-6">{buttonText}</Button>
      </AnimatedSection>
    </section>
  );
}




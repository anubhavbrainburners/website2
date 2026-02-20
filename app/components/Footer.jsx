import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-screen-sm space-y-12 px-6 pb-20 text-center">
      <div>
        <Image
          className="mx-auto"
          src="/img2.png"
          alt="Logo"
          width={225}
          height={60}
        />
      </div>
      <div className="space-y-6 text-xs">
        <p className="mx-auto max-w-[92vw] text-xl md:max-w-none">
          Your website isn’t finished at launch. We optimize it until it
          performs.
        </p>
        <a
          className="mx-auto block w-fit hover:underline"
          href="mailto:robin@thebrainburners.io"
        >
          robin@thebrainburners.io
        </a>
        <p>Copyright &copy; 2026 - All rights reserved</p>
      </div>
    </footer>
  );
}

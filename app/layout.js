import "./globals.css";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Domicon",
  description:
    "Master the exact systems elite creators use to scale fast and monetize their brands without chasing trends.",
  openGraph: {
    title: "Domicon",
    description:
      "Master the exact systems elite creators use to scale fast and monetize their brands without chasing trends.",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Domicon",
    description:
      "Master the exact systems elite creators use to scale fast and monetize their brands without chasing trends.",
    images: ["/twitter-image.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden text-xs antialiased md:text-body">{children}</body>
    </html>
  );
}

import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/favicon.png",
  },

  title: "Website With Robin",
  description:
    "We build high-converting websites that generate enquiries and sales. Strategy, design, and copy engineered to turn traffic into clients",
  
  }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} overflow-x-hidden text-xs antialiased md:text-body`}>
        {children}
      </body>
    </html>
  );
}

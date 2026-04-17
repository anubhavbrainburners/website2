import { DM_Sans } from "next/font/google";
import PortfolioSelectPageClient from "../components/portfolio-select/PortfolioSelectPageClient";
import demos from "../data/portfolioSelectDemos.json";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: "Portfolio | Website With Robin",
  description: "Exact clone of Nathan demo selector page layout."
};

export default function PortfolioPage() {
  return (
    <div className={dmSans.className}>
      <PortfolioSelectPageClient demos={demos} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import SelectDemoGrid from "./SelectDemoGrid";
import BuyNowButton from "./BuyNowButton";
import PortfolioNavbar from "./PortfolioNavbar";
import Footer from "../Footer";

/**
 * Client composition with short preloader then full demo selector content.
 */
export default function PortfolioSelectPageClient({ demos }) {
  const [loading, setLoading] = useState(true);
  const [hoverBackground, setHoverBackground] = useState("#000000");
  const [hoverAccent, setHoverAccent] = useState("#ffffff");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="nathan-select-page dark-scheme"
      style={{
        backgroundColor: hoverBackground,
        "--portfolio-accent-color": hoverAccent
      }}
    >
      {loading ? <div id="de-loader" /> : null}
      <PortfolioNavbar accentColor={hoverAccent} />
      <div className="portfolio-heading-wrap">
        <h1 className="portfolio-main-heading">PORTFOLIO</h1>
      </div>
      <div id="wrapper">
        <div id="content" className="no-bottom no-top">
          <SelectDemoGrid
            demos={demos}
            onHoverBackgroundChange={setHoverBackground}
            onHoverAccentChange={setHoverAccent}
          />
        </div>
      </div>
      <Footer />
      <BuyNowButton />
    </div>
  );
}

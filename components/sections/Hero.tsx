"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The content sheet below slides up over this pinned hero.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh]">
      <div className="sticky top-[72px] h-[calc(100svh-72px)] w-full overflow-hidden bg-[#0d1220]">
        {/* Full-bleed reel of companies I'm rooting for */}
        <HeroVideo />

        {/* White wash so the headline always reads: top on phones, left on desktop */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[62%] bg-gradient-to-b from-white via-white/90 to-transparent md:inset-y-0 md:right-auto md:h-full md:w-[62%] md:bg-gradient-to-r md:from-white md:via-white/85" />

        <motion.div
          className="pointer-events-none relative z-10 h-full w-full px-6 md:px-12 lg:px-10 pt-[7vh] md:pt-[11vh]"
          style={{ y: textY }}
        >
          <div className="pointer-events-auto max-w-[600px]">
            <h1 className="hero-rise text-[38px] sm:text-[48px] md:text-[60px] lg:text-[68px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C1D20]">
              Investing in the businesses and industries defining the next decade.
            </h1>

            <p className="hero-rise mt-7 max-w-[460px] text-[16px] md:text-[18px] leading-[1.6] text-[#33363c]" style={{ animationDelay: "0.1s" }}>
              Deep dives into the companies of the future, focusing on what matters most.
            </p>

            <a
              href="#insights"
              className="hero-rise group mt-9 inline-flex items-center gap-10 border-b border-[#1C1D20]/40 pb-2 text-[14px] font-normal text-[#1C1D20] transition-colors hover:border-[#3847FF] hover:text-[#3847FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3847FF]"
              style={{ animationDelay: "0.25s" }}
            >
              Read the latest insights
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

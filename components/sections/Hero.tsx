"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale the mountain slightly but anchor the scale to the bottom
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  // Start the mountain 15% lower than the container, and move it up to create a parallax reveal
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-5%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh]">
      {/* Sticky container stays pinned to the viewport for the duration of the 150vh scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#eff3f6]">
        
        {/* Soft yellow glow at the bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom,rgba(255,225,120,0.4)_0%,transparent_70%)] pointer-events-none" />

        {/* Animated Background Image */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-end justify-end origin-bottom"
          style={{ scale, y }}
        >
          {/* Mountain image starting from bottom right */}
          <img 
            src="/mountain.webp" 
            alt="Mountain View" 
            className="w-full h-full object-cover object-[center_bottom] md:object-[right_bottom] opacity-90"
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-[12vh] px-6 md:px-12 lg:px-24">
          <div className="max-w-[1000px] w-full mx-auto flex flex-col items-center gap-6 text-center">
            
            <h1 
              className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold leading-[1.05] tracking-tighter text-[#1C1D20] mb-2" 
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Investing in the <br className="hidden md:block"/> Businesses and Industries <br className="hidden md:block"/> <span className="text-[var(--color-tribe-blue)]">Defining the Next Decade</span>
            </h1>
            
            <p 
              className="text-[15px] md:text-[18px] font-medium text-[#444] leading-[1.6] max-w-[600px]" 
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Deep dives into the companies of the future, focusing on what matters most.
            </p>
            
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STORIES, Logo } from "./CompanyStories";

/**
 * Cover: a full-bleed video with the headline over it, as before.
 * The video now steps through the companies one by one, Stripe-style:
 * each clip comes with a story card (what they do + three facts), and a
 * logo bar along the bottom shows where you are and lets you jump.
 */
const DWELL = 7000;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const [paused, setPaused] = useState(false);
  const s = STORIES[i];

  // The content sheet below slides up over this pinned cover.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  const go = (n: number) => {
    setFade(true);
    window.setTimeout(() => {
      setI(n);
      setFade(false);
    }, 220);
  };
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  });

  // Play this company's shot, then move on to the next company.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const [a, b] = s.clip;
    const start = () => {
      v.currentTime = a;
      if (!paused) v.play().catch(() => {});
    };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });
    v.playbackRate = 0.7;
    // Hold each company for DWELL ms; replay its shot if it is shorter than that.
    let done = false;
    let raf = 0;
    let elapsed = 0;
    let rewinding = false;
    let last = performance.now();
    const tick = (now: number) => {
      if (!v.paused) elapsed += now - last;
      last = now;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, elapsed / DWELL)})`;
      if (!done && elapsed >= DWELL) {
        done = true;
        goRef.current((i + 1) % STORIES.length);
      } else if (!done && !rewinding && v.currentTime >= b - 0.3) {
        // Soft dip, then replay the shot.
        rewinding = true;
        v.style.opacity = "0.15";
        window.setTimeout(() => {
          v.currentTime = a;
          v.style.opacity = "";
          rewinding = false;
        }, 260);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // Pause button, and stop while scrolled away.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let onScreen = true;
    const sync = () => (paused || !onScreen ? v.pause() : v.play().catch(() => {}));
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [paused]);

  return (
    <section ref={containerRef} id="companies" className="relative w-full h-[150vh]">
      <div className="sticky top-[72px] h-[calc(100svh-72px)] min-h-[600px] w-full overflow-hidden bg-[#0d1220]">
        {/* Full-bleed company shot */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[250ms] ${fade ? "opacity-0" : "opacity-100"}`}
          src="/hero-reel.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* White wash so the headline always reads: top on phones, left on desktop */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[46%] bg-gradient-to-b from-white via-white/85 to-transparent md:inset-y-0 md:right-auto md:h-full md:w-[46%] md:bg-gradient-to-r md:from-white md:via-white/75" />

        <motion.div className="pointer-events-none relative z-10 h-full w-full px-6 md:px-12 lg:px-10 pt-[6vh] md:pt-[9vh]" style={{ y: textY }}>
          <div className="pointer-events-auto max-w-[600px]">
            <h1 className="hero-rise text-[36px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C1D20]">
              Investing in the businesses and industries defining the next decade.
            </h1>
            <p className="hero-rise mt-6 max-w-[460px] text-[16px] md:text-[18px] leading-[1.6] text-[#33363c]" style={{ animationDelay: "0.1s" }}>
              Deep dives into the companies of the future, focusing on what matters most.
            </p>
            <a
              href="#insights"
              className="hero-rise group mt-8 inline-flex items-center gap-10 border-b border-[#1C1D20]/40 pb-2 text-[14px] font-normal text-[#1C1D20] transition-colors hover:border-[#3847FF] hover:text-[#3847FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3847FF]"
              style={{ animationDelay: "0.25s" }}
            >
              Read the latest insights
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Story card for the company on screen */}
        <div className="absolute inset-x-4 bottom-[84px] z-20 md:inset-x-auto md:right-10 md:bottom-[108px] md:w-[400px] lg:right-12">
          <div
            role="tabpanel"
            aria-live="polite"
            aria-label={s.name}
            className={`rounded-[12px] bg-white/95 p-4 shadow-[0_20px_60px_-20px_rgba(13,18,32,0.45)] backdrop-blur-md transition-all duration-200 md:p-5 ${fade ? "translate-y-2 opacity-0" : "opacity-100"}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-7 origin-left scale-[0.72] items-center">
                <Logo s={s} />
              </div>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1C1D20] px-3 py-1.5 text-[11.5px] text-white transition-colors hover:bg-[#3847FF]"
              >
                Visit {s.name.split(" ")[0]}
                <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              </a>
            </div>
            <p className="mt-3 text-[15px] leading-[1.35] text-[#1C1D20] md:text-[16px]">{s.headline}</p>
            <dl className="mt-3 grid grid-cols-3 gap-3 border-t border-[#e6e8eb] pt-3 md:gap-4">
              {s.stats.map((x) => (
                <div key={x.label}>
                  <dt className="text-[15px] leading-tight text-[#1C1D20] md:text-[17px]">{x.value}</dt>
                  <dd className="mt-1 text-[11px] leading-[1.35] text-[#6b6e74] md:text-[11.5px]">{x.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[9.5px] leading-snug text-[#9a9da3] md:text-[10px]">Illustrative footage of each sector. Not affiliations or investment recommendations.</p>
          </div>
        </div>

        {/* Logo bar: where you are, and a way to jump */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/40 bg-white/90 backdrop-blur-md">
          <div className="flex items-stretch">
            <div role="tablist" aria-label="Companies I'm rooting for" className="flex flex-1 overflow-x-auto areas-rail">
              {STORIES.map((x, n) => (
                <button
                  key={x.name}
                  role="tab"
                  aria-selected={n === i}
                  aria-label={x.name}
                  onClick={() => n !== i && go(n)}
                  className={`relative flex h-[72px] min-w-[132px] flex-1 items-center justify-center px-4 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#3847FF] md:h-[88px] ${
                    n === i ? "opacity-100" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-[#1C1D20]/10" />
                  {n === i && <span ref={barRef} className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[#3847FF]" style={{ transform: "scaleX(0)" }} />}
                  <span className="scale-[0.9] md:scale-100">
                    <Logo s={x} />
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play video" : "Pause video"}
              className="hidden w-[72px] shrink-0 items-center justify-center border-l border-[#1C1D20]/10 text-[#1C1D20] hover:text-[#3847FF] md:flex"
            >
              {paused ? (
                <svg width="11" height="13" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z" fill="currentColor" /></svg>
              ) : (
                <svg width="11" height="13" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0h3v12H0zM7 0h3v12H7z" fill="currentColor" /></svg>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

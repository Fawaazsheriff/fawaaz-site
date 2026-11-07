"use client";

import { useEffect, useRef, useState } from "react";

/**
 * a16z-style background reel: one pre-edited, muted, looping video file.
 * It starts on the first frame the browser receives and loops seamlessly
 * (the last half-second crossfades back into the opening shot).
 *
 * Footage is licensed stock from Pexels, cut to show each sector at work.
 * The line-up below names the Indian companies I'm rooting for in each one.
 */
type Segment = { sector: string; company: string; from: number };

// Start of each shot in hero-reel.mp4 (seconds, mid-crossfade).
const SEGMENTS: Segment[] = [
  { sector: "Space", company: "Skyroot Aerospace", from: 0 },
  { sector: "AI", company: "Sarvam", from: 3.25 },
  { sector: "Defence", company: "ideaForge", from: 6.75 },
  { sector: "Semiconductors", company: "Mindgrove", from: 10.25 },
  { sector: "Software", company: "Rocketlane", from: 13.75 },
  { sector: "Financial services", company: "Navi", from: 17.25 },
  { sector: "Propulsion", company: "Bellatrix Aerospace", from: 19.85 },
  { sector: "Aerospace", company: "JEH Aerospace", from: 23.35 },
];
const LOOP_BACK = 26.85; // the closing crossfade returns to the opening shot

const segmentAt = (t: number) => {
  if (t >= LOOP_BACK) return 0;
  let i = 0;
  for (let k = 0; k < SEGMENTS.length; k++) if (t >= SEGMENTS[k].from) i = k;
  return i;
};

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Keep the line-up in step with the shot on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const tick = () => {
      setIndex(segmentAt(v.currentTime));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Respect reduced motion and the pause button, and stop while scrolled away.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let onScreen = true;
    const sync = () => {
      if (reduced || paused || !onScreen) v.pause();
      else v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [paused, reduced]);

  const jump = (i: number) => {
    const v = videoRef.current;
    if (v) v.currentTime = SEGMENTS[i].from + 0.3;
    setIndex(i);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d1220]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-reel.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Soft shade at the foot so the line-up reads over bright footage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      <div className="absolute bottom-0 right-0 z-20 w-full px-6 pb-14 md:w-[56%] md:px-12 md:pb-16 lg:px-10">
        <div className="flex flex-col gap-3 md:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/80">Indian companies I&apos;m rooting for</p>
          <div className="flex items-end gap-3">
            <ol className="flex flex-wrap gap-1.5 md:justify-end">
              {SEGMENTS.map((s, i) => (
                <li key={s.company}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === index}
                    className={`rounded-full border px-3 py-1.5 text-left text-[12px] backdrop-blur-md transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      i === index ? "border-white bg-white text-[#1C1D20]" : "border-white/35 bg-black/20 text-white hover:bg-white/20"
                    }`}
                  >
                    <span className="font-medium">{s.company}</span>
                    <span className={`ml-1.5 font-mono text-[10px] ${i === index ? "text-[#3847FF]" : "text-white/70"}`}>{s.sector}</span>
                  </button>
                </li>
              ))}
            </ol>
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play background video" : "Pause background video"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-md hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {paused ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z" fill="currentColor" /></svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0h3v12H0zM7 0h3v12H7z" fill="currentColor" /></svg>
                )}
              </button>
            )}
          </div>
        </div>
        <p className="mt-3 text-[10px] text-white/55 md:text-right">
          Illustrative footage of each sector (Pexels), not footage of the companies named. Not affiliations or investment recommendations.
        </p>
      </div>
    </div>
  );
}

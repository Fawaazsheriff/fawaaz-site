"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * a16z-style background reel: official clips from Indian companies I'm rooting for,
 * played muted through YouTube's own embedded player (nothing is re-hosted).
 */
type Clip = { company: string; sector: string; id: string; start: number };

const CLIPS: Clip[] = [
  { company: "Skyroot Aerospace", sector: "Space", id: "twS9Y5tYVxw", start: 6 },
  { company: "Sarvam", sector: "AI", id: "aLBQZcu7swY", start: 30 },
  { company: "ideaForge", sector: "Defence", id: "DlTu8qv6-jo", start: 15 },
  { company: "Rocketlane", sector: "Software", id: "vlPyiTwd2io", start: 20 },
  { company: "Bellatrix Aerospace", sector: "Propulsion", id: "wB6HA7pdEb8", start: 10 },
  { company: "JEH Aerospace", sector: "Aerospace", id: "ZYyVTaY-Kiw", start: 20 },
];

const SEGMENT_MS = 9000;

const embedSrc = (c: Clip) =>
  `https://www.youtube-nocookie.com/embed/${c.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${c.id}` +
  `&start=${c.start}&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&fs=0&enablejsapi=1`;

const poster = (c: Clip) => `https://i.ytimg.com/vi/${c.id}/hqdefault.jpg`;

function command(frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) {
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
}

export function HeroVideo() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState<Record<number, boolean>>({});
  const frames = useRef<Record<number, HTMLIFrameElement | null>>({});
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Stop the reel while the hero is scrolled out of view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !paused && !reduced && visible;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % CLIPS.length), SEGMENT_MS);
    return () => window.clearTimeout(t);
  }, [index, running]);

  // When a clip comes forward, rewind it to its chosen moment; pause or resume with the reel.
  useEffect(() => {
    const f = frames.current[index];
    if (running) {
      command(f, "seekTo", [CLIPS[index].start, true]);
      command(f, "playVideo");
    } else {
      command(f, "pauseVideo");
    }
  }, [index, running]);

  const next = (index + 1) % CLIPS.length;
  const mounted = reduced ? [] : [index, next];

  const go = useCallback((i: number) => setIndex(i), []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#0d1220]">
      {/* Poster of the current clip shows instantly while the player loads */}
      {CLIPS.map((c, i) => (
        <img
          key={c.id}
          src={poster(c)}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-110 object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {mounted.map((i) => {
        const c = CLIPS[i];
        const show = i === index && ready[i];
        return (
          <div
            key={c.id}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0"}`}
          >
            {/* Oversized and centred so the 16:9 frame covers any viewport and YouTube's chrome is cropped */}
            <iframe
              ref={(el) => {
                frames.current[i] = el;
              }}
              src={embedSrc(c)}
              title={`${c.company} video`}
              tabIndex={-1}
              allow="autoplay; encrypted-media; picture-in-picture"
              onLoad={() => window.setTimeout(() => setReady((r) => ({ ...r, [i]: true })), 1200)}
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-[115%] w-[115vw] min-w-[205%] -translate-x-1/2 -translate-y-1/2 border-0 md:min-w-[177.78vh] md:w-[118vw] md:min-h-[118%]"
            />
          </div>
        );
      })}

      {/* Caption: who's on screen, and the rest of the line-up */}
      <div className="absolute bottom-0 right-0 z-20 w-full px-6 pb-14 md:w-[52%] md:px-12 md:pb-16 lg:px-10">
        <div className="flex flex-col gap-3 md:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/80">Indian companies I&apos;m rooting for</p>
          <div className="flex items-end gap-3">
            <ol className="flex flex-wrap gap-1.5 md:justify-end">
              {CLIPS.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === index}
                    className={`relative overflow-hidden rounded-full border px-3 py-1.5 text-left text-[12px] backdrop-blur-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      i === index ? "border-white bg-white text-[#1C1D20]" : "border-white/35 bg-black/20 text-white hover:bg-white/20"
                    }`}
                  >
                    <span className="font-medium">{c.company}</span>
                    <span className={`ml-1.5 font-mono text-[10px] ${i === index ? "text-[#3847FF]" : "text-white/70"}`}>{c.sector}</span>
                    {i === index && running && (
                      <span
                        key={`p-${index}`}
                        aria-hidden="true"
                        className="hero-reel-progress absolute bottom-0 left-0 h-[2px] bg-[#3847FF]"
                        style={{ animationDuration: `${SEGMENT_MS}ms` }}
                      />
                    )}
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
          Clips play from public YouTube videos:{" "}
          <a
            href={`https://www.youtube.com/watch?v=${CLIPS[index].id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/40 underline-offset-2 hover:text-white"
          >
            watch the {CLIPS[index].company} video
          </a>
          . Not affiliations or investment recommendations.
        </p>
      </div>
    </div>
  );
}

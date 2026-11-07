"use client";

import { useEffect, useRef, useState } from "react";

const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=2000&auto=format&fit=crop`;

const SLIDES = [
  { label: "AI & Machine Learning", image: img("photo-1749997087618-305670af5811"), alt: "A silver humanoid robot in a bright white corridor", pos: "50% 40%" },
  { label: "Deep Tech & Space", image: img("photo-1605813640975-0ef0ad36826a"), alt: "A white rocket against a pale sky", pos: "50% 50%" },
  { label: "Aerospace & Defence", image: img("photo-1599403868569-30dae419c0a7"), alt: "A grey drone on a white background", pos: "50% 50%" },
  { label: "Semiconductors", image: img("photo-1717962688747-7e13dfa31538"), alt: "Silicon wafers on a light background", pos: "50% 50%", tone: "saturate(0.25) hue-rotate(175deg) brightness(1.12) contrast(0.95)" },
  { label: "Software & Internet", image: img("photo-1597673030062-0a0f1a801a31"), alt: "A laptop on a white desk", pos: "50% 55%" },
];

const HOLD_MS = 5200;

/** Wide, light photo strip that crossfades through the focus areas. */
export function FocusReel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState<boolean[]>(() => SLIDES.map(() => false));
  const markLoaded = (n: number) => setLoaded((l) => (l[n] ? l : l.map((v, k) => (k === n ? true : v))));
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => {
      mq.removeEventListener?.("change", set);
      io.disconnect();
    };
  }, []);

  const running = !paused && !reduced && visible;

  // Advance only when the next photo has finished loading, so caption and image stay in sync.
  const nextReady = loaded[(i + 1) % SLIDES.length];
  useEffect(() => {
    if (!running || !nextReady) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [i, running, nextReady]);

  return (
    <section ref={ref} aria-label="Areas of focus" className="relative -mt-[40px] w-full overflow-hidden bg-white">
      <div className="relative h-[52vh] min-h-[340px] w-full md:h-[68vh] md:min-h-[480px]">
        {SLIDES.map((s, n) => (
          <img
            key={s.label}
            src={s.image}
            alt={n === i ? s.alt : ""}
            aria-hidden={n !== i}
            loading="eager"
            decoding="async"
            fetchPriority={n === 0 ? "high" : "low"}
            ref={(el) => {
              if (el?.complete && el.naturalWidth > 0) markLoaded(n);
            }}
            onLoad={() => markLoaded(n)}
            className={`reel-img absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              n === i ? "opacity-100" : "opacity-0"
            } ${n === i && running ? "is-zooming" : ""}`}
            style={{ objectPosition: s.pos, filter: "tone" in s ? s.tone : undefined }}
          />
        ))}

        {/* Keep it light: soft white wash top and bottom so the strip melts into the page */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/70 to-transparent" />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-12 md:pb-10">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div aria-live="polite">
              <span className="font-mono text-[12px] text-[#5a5d63]">
                {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <p key={i} className="reel-caption mt-1 text-[28px] md:text-[44px] font-medium leading-[1.05] tracking-[-0.04em] text-[#1C1D20]">
                {SLIDES[i].label}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <ol className="flex gap-1.5">
                {SLIDES.map((s, n) => (
                  <li key={s.label}>
                    <button
                      type="button"
                      onClick={() => loaded[n] && setI(n)}
                      aria-label={`Show ${s.label}`}
                      aria-current={n === i}
                      className="group block py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
                    >
                      <span className="relative block h-[3px] w-8 overflow-hidden rounded-full bg-[#1C1D20]/15 md:w-12">
                        <span
                          key={`${n}-${i}-${running}`}
                          className={`absolute inset-y-0 left-0 rounded-full bg-[#3847FF] ${
                            n < i ? "w-full" : n === i ? (running ? "reel-progress" : "w-full") : "w-0"
                          }`}
                          style={n === i && running ? { animationDuration: `${HOLD_MS}ms` } : undefined}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? "Play" : "Pause"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1D20]/20 bg-white/80 text-[#1C1D20] backdrop-blur transition-colors hover:bg-[#1C1D20] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
              >
                <span aria-hidden="true" className="text-[11px]">{paused ? "▶" : "❚❚"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal, snap-scrolling row with previous / next buttons. */
export function AreasRail({ header, children }: { header: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#cfd3d8] bg-white text-[#1C1D20] transition-colors hover:bg-[#1C1D20] hover:text-white disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]";

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        {header}
        <div className="flex items-center gap-2">
          <button type="button" className={btn} onClick={() => step(-1)} disabled={atStart} aria-label="Previous focus areas">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className={btn} onClick={() => step(1)} disabled={atEnd} aria-label="Next focus areas">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <ol
        ref={ref}
        className="areas-rail -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 md:-mx-8 md:scroll-px-8 md:px-8"
      >
        {children}
      </ol>
    </>
  );
}

"use client";

import { useCallback, useState } from "react";
import { SECTORS, SectorDots } from "./SectorDots";

/** The sectors I watch, drawn in a dot field that flows from one to the next. */
export function SectorPulse() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const next = useCallback(() => setIndex((i) => (i + 1) % SECTORS.length), []);
  const s = SECTORS[index];

  return (
    <section aria-label="Sectors I'm watching" className="w-full px-6 md:px-12 pb-20 md:pb-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 border-t border-[#dfe3e7] pt-14 md:grid-cols-[1fr_1.05fr] md:gap-16 md:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 text-[13px] text-[#5a5d63]">
            <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-[1px] bg-[#3847FF]" />
            Sectors I&apos;m watching
          </p>
          <h2 className="mt-5 text-[34px] font-medium leading-[1.05] tracking-[-0.045em] text-[#1C1D20] md:text-[52px]">
            The industries building
            <br />
            India&apos;s next decade.
          </h2>

          <div className="mt-8 h-[76px]" aria-live="polite">
            <p key={s.name} className="sector-swap text-[40px] font-medium leading-none tracking-[-0.04em] text-[#3847FF] md:text-[56px]">
              {s.name}
            </p>
            <p key={s.company} className="sector-swap mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[#5a5d63]">
              Rooting for {s.company}
            </p>
          </div>

          <ol className="mt-8 flex flex-wrap gap-x-4 gap-y-2" aria-label="Sectors">
            {SECTORS.map((x, i) => (
              <li key={x.name}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(i);
                    setPlaying(false);
                  }}
                  aria-current={i === index}
                  className={`text-[14px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF] ${
                    i === index ? "text-[#1C1D20]" : "text-[#a2a5ab] hover:text-[#1C1D20]"
                  }`}
                >
                  {x.name}
                </button>
              </li>
            ))}
            {!playing && (
              <li>
                <button type="button" onClick={() => setPlaying(true)} className="text-[14px] text-[#3847FF] hover:underline">
                  Play ▸
                </button>
              </li>
            )}
          </ol>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <SectorDots index={index} onAdvance={next} playing={playing} />
        </div>
      </div>
    </section>
  );
}

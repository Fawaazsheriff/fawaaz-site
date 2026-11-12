"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stripe-style customer stories: pick a company, see one line on what it does,
 * a video panel and three facts. Footage is the sector shot from hero-reel.mp4.
 */
export type Story = {
  name: string;
  logo?: string;
  logoH: number;
  url: string;
  headline: string;
  clip: [number, number]; // seconds within hero-reel.mp4
  stats: { value: string; label: string }[];
};

export const STORIES: Story[] = [
  {
    name: "Skyroot Aerospace",
    logo: "/logo-skyroot.svg",
    logoH: 30,
    url: "https://www.skyroot.in",
    headline: "Skyroot put India's first private rocket into orbit.",
    clip: [0.05, 3.0],
    stats: [
      { value: "2022", label: "Vikram-S, first private Indian rocket to space" },
      { value: "July 2026", label: "Vikram-1 reaches orbit" },
      { value: "2018", label: "founded in Hyderabad" },
    ],
  },
  {
    name: "Sarvam",
    logo: "/logo-sarvam.svg",
    logoH: 20,
    url: "https://www.sarvam.ai",
    headline: "Sarvam is building India's own AI models.",
    clip: [3.5, 6.5],
    stats: [
      { value: "22", label: "Indian languages" },
      { value: "105B", label: "parameters in Sarvam-105B" },
      { value: "IndiaAI Mission", label: "selected to build India's sovereign LLM" },
    ],
  },
  {
    name: "ideaForge",
    logoH: 22,
    url: "https://ideaforgetech.com",
    headline: "ideaForge builds India's homegrown drones for defence and security.",
    clip: [7.0, 10.0],
    stats: [
      { value: "2007", label: "founded" },
      { value: "2023", label: "listed on NSE and BSE" },
      { value: "SWITCH, Q, NETRA", label: "drone families" },
    ],
  },
  {
    name: "Mindgrove",
    logo: "/logo-mindgrove.svg",
    logoH: 26,
    url: "https://www.mindgrovetech.in",
    headline: "Mindgrove designed India's first commercial high-performance microcontroller.",
    clip: [10.5, 13.5],
    stats: [
      { value: "700 MHz", label: "Secure IoT chip, RISC-V" },
      { value: "28 nm", label: "process" },
      { value: "~30%", label: "cheaper than comparable chips" },
    ],
  },
  {
    name: "Rocketlane",
    logo: "/logo-rocketlane.svg",
    logoH: 20,
    url: "https://www.rocketlane.com",
    headline: "Rocketlane runs client delivery for software companies, now with AI agents.",
    clip: [14.0, 17.0],
    stats: [
      { value: "$105M", label: "raised in total" },
      { value: "$60M", label: "2026 round led by Insight Partners" },
      { value: "Nitro", label: "AI agents used by teams at Notion and Glean" },
    ],
  },
  {
    name: "Navi",
    logo: "/logo-navi.svg",
    logoH: 26,
    url: "https://navi.com",
    headline: "Navi is one of India's fastest-growing UPI apps.",
    clip: [17.5, 19.6],
    stats: [
      { value: "1.08 bn", label: "UPI payments in August 2026" },
      { value: "4.4%", label: "share of UPI volume" },
      { value: "₹52,513 Cr", label: "moved in that month" },
    ],
  },
  {
    name: "Bellatrix Aerospace",
    logo: "/logo-bellatrix.png",
    logoH: 36,
    url: "https://bellatrix.aero",
    headline: "Bellatrix builds the engines that move satellites in orbit.",
    clip: [20.1, 23.1],
    stats: [
      { value: "2021", label: "India's first private Hall-effect thruster" },
      { value: "2024", label: "green thruster fired in space" },
      { value: "2015", label: "founded in Bengaluru" },
    ],
  },
  {
    name: "JEH Aerospace",
    logo: "/logo-jeh.png",
    logoH: 34,
    url: "https://www.jeh.aero",
    headline: "JEH machines flight-critical parts for global aircraft engines.",
    clip: [23.6, 26.6],
    stats: [
      { value: "100,000+", label: "flight-critical parts delivered" },
      { value: "15 days", label: "to a new part, down from 15 weeks" },
      { value: "$100M", label: "order book" },
    ],
  },
];

export function Logo({ s, className = "" }: { s: Story; className?: string }) {
  if (!s.logo)
    return (
      <span className={`whitespace-nowrap leading-none text-black ${className}`} style={{ fontSize: s.logoH }}>
        <span className="font-bold">idea</span>Forge
      </span>
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={s.logo} alt="" style={{ height: s.logoH }} className={`w-auto max-w-none [filter:brightness(0)] ${className}`} />;
}

export function CompanyStories({ inHero = false }: { inHero?: boolean }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const s = STORIES[i];

  // Loop the company's sector shot inside the shared reel, with a soft dip at each loop.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const [a, b] = s.clip;
    v.playbackRate = 0.75;
    const start = () => {
      v.currentTime = a;
      v.play().catch(() => {});
    };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });
    let dipping = false;
    const onTime = () => {
      if (!dipping && v.currentTime >= b - 0.25) {
        dipping = true;
        setFade(true);
        window.setTimeout(() => {
          v.currentTime = a;
          setFade(false);
          dipping = false;
        }, 250);
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [s]);

  // Only play while on screen.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const pick = (n: number) => {
    if (n === i) return;
    setFade(true);
    window.setTimeout(() => {
      setI(n);
      setFade(false);
    }, 200);
  };

  return (
    <section id="companies" aria-label="Companies I'm rooting for" className={`w-full px-4 md:px-8 scroll-mt-24 ${inHero ? "" : "pb-20 md:pb-28"}`}>
      <div className={`mx-auto max-w-[1280px] ${inHero ? "pt-10 md:pt-10" : "border-t border-[#dfe3e7] pt-14 md:pt-16"}`}>
        <p className="text-[13px] text-[#5a5d63]">Companies I&apos;m rooting for</p>

        {/* Logo tabs */}
        <div className="-mx-4 mt-6 overflow-x-auto px-4 md:mx-0 md:px-0 areas-rail">
          <div role="tablist" aria-label="Companies" className="flex min-w-max items-stretch border-b border-[#dfe3e7]">
            {STORIES.map((x, n) => (
              <button
                key={x.name}
                role="tab"
                aria-selected={n === i}
                aria-label={x.name}
                onClick={() => pick(n)}
                className={`relative flex h-16 items-center px-5 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#3847FF] md:px-7 ${
                  n === i ? "opacity-100" : "opacity-35 hover:opacity-70"
                }`}
              >
                <Logo s={x} />
                <span className={`absolute inset-x-3 -bottom-px h-[2px] transition-colors ${n === i ? "bg-[#1a1a1a]" : "bg-transparent"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Story card */}
        <div role="tabpanel" aria-label={s.name} className={`mt-8 transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-[22px] leading-[1.25] tracking-[-0.015em] text-[#1a1a1a] md:text-[30px]">{s.headline}</h3>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-[8px] border border-[#dfe3e7] bg-white px-4 py-2.5 text-[15px] text-[#3847FF] transition-colors hover:border-[#3847FF] md:self-auto"
            >
              Visit {s.name.split(" ")[0]}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </a>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[12px] bg-[#0d1220] md:aspect-[21/9]">
            <video
              ref={video}
              src="/hero-reel.mp4"
              poster="/hero-poster.jpg"
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <dl className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-8">
            {s.stats.map((x) => (
              <div key={x.label} className="text-[17px] leading-[1.4]">
                <dt className="sr-only">{x.label}</dt>
                <dd>
                  <span className="text-[#1a1a1a]">{x.value}</span> <span className="text-[#767676]">{x.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[12px] text-[#a2a5ab]">Illustrative footage of each sector. Not affiliations or investment recommendations.</p>
        </div>
      </div>
    </section>
  );
}

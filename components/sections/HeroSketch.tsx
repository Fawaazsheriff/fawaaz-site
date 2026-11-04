"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hand-drawn "graphite study" hero scene.
 * Objects map to the areas of focus: fintech (chart), TMT (globe + satellite),
 * energy (turbines), AI (chip), robotics (arm, drone).
 * Load: every line pencils itself in once. After that: slow ambient loops (SMIL),
 * paused when off-screen, when the visitor asks, or when reduced motion is set.
 */

const INK = "#3d3f45";

// Candlestick data (y = close, lower y = higher price on screen)
const CANDLES = [
  { o: 274, c: 266 },
  { o: 266, c: 270 },
  { o: 270, c: 254 },
  { o: 254, c: 258 },
  { o: 258, c: 240 },
  { o: 240, c: 230 },
  { o: 230, c: 236 },
  { o: 236, c: 212 },
];

function Turbine({ x, y, h, dur, delay }: { x: number; y: number; h: number; dur: number; delay: number }) {
  const hubY = y - h;
  const blade = h * 0.48;
  return (
    <g className="sk-draw" style={{ ["--d" as string]: `${delay}s` }}>
      <path pathLength={1} d={`M${x - 3},${y} L${x - 1},${hubY} L${x + 1},${hubY} L${x + 3},${y}`} />
      <g>
        <animateTransform attributeName="transform" type="rotate" from={`0 ${x} ${hubY}`} to={`360 ${x} ${hubY}`} dur={`${dur}s`} repeatCount="indefinite" />
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            pathLength={1}
            transform={`rotate(${a} ${x} ${hubY})`}
            d={`M${x},${hubY} C${x + 4},${hubY - blade * 0.35} ${x + 3},${hubY - blade * 0.8} ${x},${hubY - blade} C${x - 2},${hubY - blade * 0.7} ${x - 2},${hubY - blade * 0.3} ${x},${hubY}`}
          />
        ))}
      </g>
      <circle pathLength={1} cx={x} cy={hubY} r={2.6} fill="#f1f2f0" />
    </g>
  );
}

export function HeroSketch() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Respect reduced motion + pause when the hero leaves the viewport.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const apply = () => {
      const stop = mq.matches || userPaused || !visible;
      try {
        if (stop) svg.pauseAnimations();
        else svg.unpauseAnimations();
      } catch {
        /* older browsers */
      }
      setPaused(mq.matches || userPaused);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      apply();
    });
    io.observe(svg);
    mq.addEventListener?.("change", apply);
    apply();
    return () => {
      io.disconnect();
      mq.removeEventListener?.("change", apply);
    };
  }, [userPaused]);

  const orbit = "M1010,214 a175,46 0 1,0 350,0 a175,46 0 1,0 -350,0";

  return (
    <>
      <svg
        ref={svgRef}
        className={`hero-sketch absolute inset-0 h-full w-full ${paused ? "is-paused" : ""}`}
        viewBox="0 0 1440 880"
        preserveAspectRatio="xMaxYMax slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(42)">
            <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.7" opacity="0.55" />
          </pattern>
          <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3847FF" stopOpacity="0.38" />
            <stop offset="1" stopColor="#3847FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mtnFadeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.28" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="mtnFade">
            <rect x="300" y="380" width="1140" height="500" fill="url(#mtnFadeGrad)" />
          </mask>
        </defs>

        {/* Graphite mountain study */}
        <image
          className="sk-fade"
          href="/mountain-sketch.webp"
          x="300"
          y="402"
          width="1140"
          height="477"
          preserveAspectRatio="xMaxYMax meet"
          mask="url(#mtnFade)"
          opacity="0.92"
        />

        <g fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" filter="url(#pencil)">
          {/* Drafting marks */}
          <g className="sk-draw" style={{ ["--d" as string]: "0s" }} opacity="0.35" strokeWidth="0.8">
            <path pathLength={1} d="M640,96 L640,840" strokeDasharray="2 7" />
            <path pathLength={1} d="M600,560 L1440,560" strokeDasharray="2 7" />
            <path pathLength={1} d="M1360,70 l12,0 M1366,64 l0,12" />
            <path pathLength={1} d="M720,92 l10,0 M725,87 l0,10" />
          </g>

          {/* ── Fintech: candlestick chart that draws itself ── */}
          <g className="sk-draw" style={{ ["--d" as string]: "0.2s" }}>
            <path pathLength={1} d="M672,130 L672,300 L940,300" />
            {[160, 200, 240, 280].map((y) => (
              <path key={y} pathLength={1} d={`M676,${y} L936,${y}`} opacity="0.25" strokeWidth="0.8" />
            ))}
            {CANDLES.map((k, i) => {
              const x = 694 + i * 30;
              const top = Math.min(k.o, k.c);
              const h = Math.max(4, Math.abs(k.o - k.c));
              const down = k.c > k.o;
              return (
                <g key={i}>
                  <path pathLength={1} d={`M${x},${top - 9} L${x},${top + h + 9}`} />
                  <rect pathLength={1} x={x - 6} y={top} width={12} height={h} fill={down ? "url(#hatch)" : "#f1f2f0"} />
                </g>
              );
            })}
          </g>
          <g className="sk-draw sk-slow" style={{ ["--d" as string]: "1.1s" }} stroke="#3847FF" strokeWidth="1.4">
            <path pathLength={1} d="M694,272 C730,266 740,262 754,256 S800,246 814,240 S860,224 874,226 S905,214 904,212" />
          </g>
          <circle cx="904" cy="212" r="3.2" fill="#3847FF" stroke="none" className="sk-fade" style={{ ["--d" as string]: "2.6s" }}>
            <animate attributeName="r" values="3.2;7;3.2" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
          </circle>

          {/* ── TMT: globe ── */}
          <g transform="rotate(-16 1185 205)">
            <g className="sk-draw" style={{ ["--d" as string]: "0.5s" }}>
              <circle pathLength={1} cx="1185" cy="205" r="92" fill="#f1f2f0" />
              <path pathLength={1} d="M1185,205 m0,-92 a92,92 0 0,1 0,184 a72,92 0 0,0 0,-184" fill="url(#hatch)" opacity="0.6" stroke="none" />
              <path pathLength={1} d="M1185,108 L1185,302" opacity="0.3" strokeWidth="0.8" />
              {[-50, 0, 50].map((dy) => {
                const w = Math.sqrt(92 * 92 - dy * dy);
                return <ellipse key={dy} pathLength={1} cx="1185" cy={205 + dy} rx={w} ry={w * 0.12} opacity="0.4" strokeWidth="0.8" />;
              })}
            </g>
            {/* Meridians: widths oscillate to suggest rotation */}
            <g opacity="0.4" strokeWidth="0.8" className="sk-fade" style={{ ["--d" as string]: "1.4s" }}>
              {[0, 5.3, 10.6].map((off) => (
                <ellipse key={off} cx="1185" cy="205" rx="92" ry="92">
                  <animate
                    attributeName="rx"
                    values="0;92;0"
                    keyTimes="0;0.5;1"
                    calcMode="spline"
                    keySplines="0.37 0 0.63 1;0.37 0 0.63 1"
                    dur="16s"
                    begin={`-${off}s`}
                    repeatCount="indefinite"
                  />
                </ellipse>
              ))}
            </g>
          </g>

          {/* Orbit + satellite with scan beam */}
          <path d={orbit} opacity="0.3" strokeDasharray="3 8" strokeWidth="0.9" className="sk-fade" style={{ ["--d" as string]: "1.2s" }} />
          <g className="sk-fade" style={{ ["--d" as string]: "1.6s" }}>
            <animateMotion dur="26s" repeatCount="indefinite" path={orbit} />
            <polygon points="0,9 -34,170 34,170" fill="url(#beam)" stroke="none">
              <animate attributeName="opacity" values="0.55;1;0.55" dur="3.2s" repeatCount="indefinite" />
            </polygon>
            <rect x="-9" y="-8" width="18" height="16" fill="#f1f2f0" />
            <rect x="-44" y="-6" width="30" height="12" fill="url(#hatch)" />
            <rect x="14" y="-6" width="30" height="12" fill="url(#hatch)" />
            <path d="M-14,0 L-9,0 M9,0 L14,0 M-34,-6 L-34,6 M-24,-6 L-24,6 M24,-6 L24,6 M34,-6 L34,6 M0,-8 L0,-15" />
            <circle cx="0" cy="-16" r="2" />
          </g>

          {/* ── Drone ── */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 70 14; -20 6; 0 0" dur="24s" repeatCount="indefinite" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -9; 0 0" dur="4s" repeatCount="indefinite" additive="sum" />
              <g className="sk-draw" style={{ ["--d" as string]: "0.9s" }}>
                <rect pathLength={1} x="884" y="404" width="34" height="13" rx="4" fill="#f1f2f0" />
                <path pathLength={1} d="M884,408 L862,396 M918,408 L940,396 M886,415 L870,424 M916,415 L932,424" />
                <circle pathLength={1} cx="901" cy="421" r="3.5" />
              </g>
              {[
                [862, 394],
                [940, 394],
              ].map(([cx, cy], i) => (
                <ellipse key={i} cx={cx} cy={cy} rx="17" ry="3" className="sk-fade" style={{ ["--d" as string]: "1.5s" }}>
                  <animate attributeName="rx" values="17;7;17" dur="0.22s" repeatCount="indefinite" />
                </ellipse>
              ))}
            </g>
          </g>

          {/* ── Energy: turbines on the ridge ── */}
          <Turbine x={1262} y={628} h={96} dur={9} delay={1.0} />
          <Turbine x={1318} y={610} h={118} dur={7} delay={1.15} />
          <Turbine x={1386} y={596} h={104} dur={8} delay={1.3} />

          {/* ── Robotics: articulated arm (lifted into the first viewport) ── */}
          <g transform="translate(0,-96)">
          <g className="sk-draw" style={{ ["--d" as string]: "0.7s" }}>
            <path pathLength={1} d="M722,812 L798,812 L788,786 L732,786 Z" fill="url(#hatch)" />
            <circle pathLength={1} cx="760" cy="778" r="9" fill="#f1f2f0" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-8 760 778; 9 760 778; -8 760 778" dur="9s" repeatCount="indefinite" />
            <g className="sk-draw" style={{ ["--d" as string]: "0.85s" }}>
              <path pathLength={1} d="M754,774 L780,700 L792,704 L766,780" fill="#f1f2f0" />
              <circle pathLength={1} cx="786" cy="700" r="7" fill="#f1f2f0" />
            </g>
            <g>
              <animateTransform attributeName="transform" type="rotate" values="14 786 700; -18 786 700; 14 786 700" dur="9s" repeatCount="indefinite" />
              <g className="sk-draw" style={{ ["--d" as string]: "1s" }}>
                <path pathLength={1} d="M790,694 L852,676 L855,688 L792,706" fill="url(#hatch)" />
                <circle pathLength={1} cx="856" cy="682" r="5" fill="#f1f2f0" />
                <path pathLength={1} d="M860,676 L874,668 L880,674 M860,688 L874,696 L880,690" />
              </g>
            </g>
          </g>
          </g>

          {/* ── AI: chip with data flowing through traces (lifted) ── */}
          <g transform="translate(0,-92)">
          <g className="sk-draw" style={{ ["--d" as string]: "1.2s" }}>
            <path pathLength={1} d="M1060,734 L1136,772 L1060,810 L984,772 Z" fill="#f1f2f0" />
            <path pathLength={1} d="M1060,750 L1104,772 L1060,794 L1016,772 Z" fill="url(#hatch)" />
            <path pathLength={1} d="M984,772 L984,780 L1060,818 L1136,780 L1136,772" />
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} pathLength={1} d={`M${996 + i * 13},${766 + i * 6.5} l-12,6`} opacity="0.7" />
            ))}
          </g>
          <g stroke="#3847FF" strokeWidth="1.1" opacity="0.75" className="sk-fade" style={{ ["--d" as string]: "2.2s" }}>
            {["M1136,772 L1196,742 L1236,742", "M1110,792 L1170,822 L1214,822", "M1012,758 L960,732 L928,732"].map((d) => (
              <path key={d} d={d} strokeDasharray="5 9">
                <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.6s" repeatCount="indefinite" />
              </path>
            ))}
          </g>
          </g>

          {/* Space dust */}
          <g className="sk-fade" style={{ ["--d" as string]: "1.8s" }} opacity="0.5" strokeWidth="0.9">
            <path d="M1010,92 l6,0 M1013,89 l0,6" />
            <path d="M1418,300 l6,0 M1421,297 l0,6" />
            <path d="M980,330 l5,0 M982.5,327.5 l0,5" />
            <circle cx="1310" cy="120" r="1" fill={INK} />
            <circle cx="1100" cy="360" r="1" fill={INK} />
          </g>
        </g>
      </svg>

      <button
        type="button"
        onClick={() => setUserPaused((p) => !p)}
        className="absolute bottom-6 left-6 lg:left-10 z-20 flex items-center gap-2 rounded-full border border-[#c9ccd1] bg-[#f1f2f0]/80 px-4 py-2 text-[12px] font-medium text-[#3d3f45] backdrop-blur transition-colors hover:border-[#3d3f45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
        aria-pressed={userPaused}
      >
        <span aria-hidden="true" className="inline-block w-2 text-center">{userPaused ? "▶" : "❚❚"}</span>
        {userPaused ? "Play motion" : "Pause motion"}
      </button>
    </>
  );
}

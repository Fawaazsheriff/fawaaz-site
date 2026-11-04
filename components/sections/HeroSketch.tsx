"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hand-drawn "graphite study" hero landscape.
 * Objects map to the focus areas: AI (chip), software (code window),
 * aerospace & defence (rocket, jet, radar, satellite, drone), TMT (globe).
 * Load: every line pencils itself in once. After that: slow ambient loops (SMIL),
 * paused when off-screen, when the visitor asks, or when reduced motion is set.
 */

const INK = "#3d3f45";
const PAPER = "#f1f2f0";

// Deterministic pine forest along the foreground
function makeTrees() {
  let seed = 11;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const trees: { x: number; h: number; w: number }[] = [];
  let x = 520;
  while (x < 1450) {
    const h = 26 + rand() * 46 * Math.min(1, (x - 480) / 420);
    trees.push({ x, h, w: h * (0.32 + rand() * 0.08) });
    x += 10 + rand() * 16;
  }
  return trees;
}
const TREES = makeTrees();

// Code window lines: [indent, length]
const CODE = [
  [0, 120],
  [16, 150],
  [32, 96],
  [32, 168],
  [16, 70],
  [0, 40],
  [0, 132],
];

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
  const jetPath = "M560,92 C820,70 1060,60 1480,38";

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
          <pattern id="hatchFine" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={INK} strokeWidth="0.5" opacity="0.4" />
          </pattern>
          <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3847FF" stopOpacity="0.38" />
            <stop offset="1" stopColor="#3847FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb347" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#ff7a45" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff7a45" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={PAPER} stopOpacity="0" />
            <stop offset="0.7" stopColor={PAPER} stopOpacity="0.75" />
            <stop offset="1" stopColor={PAPER} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="mtnFadeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="mtnFade">
            <rect x="160" y="300" width="1280" height="580" fill="url(#mtnFadeGrad)" />
          </mask>
        </defs>

        {/* ── Landscape ── */}
        <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round" filter="url(#pencil)">
          {/* Far ranges, drawn as pencil contours behind the study */}
          <g className="sk-draw" style={{ ["--d" as string]: "0.1s" }} opacity="0.24" strokeWidth="0.9">
            <path pathLength={1} d="M560,522 C600,506 626,488 652,492 C676,496 690,478 716,466 C744,452 760,470 790,462 C822,452 842,428 872,426 C900,424 914,444 944,438 C976,430 992,408 1022,404 C1050,400 1066,424 1096,418 C1128,410 1146,392 1180,394 C1212,396 1226,412 1256,402 C1290,390 1312,380 1344,386 C1376,392 1400,404 1440,398" />
            <path pathLength={1} d="M600,552 C660,540 700,526 750,530 C800,534 830,512 880,510 C930,508 960,524 1010,518 C1060,512 1090,496 1140,498 C1190,500 1220,514 1270,506 C1320,498 1370,488 1440,494" opacity="0.6" />
            <path pathLength={1} d="M840,470 l-6,10 M846,472 l-6,10 M1150,406 l-6,10 M1156,408 l-6,10 M1162,410 l-6,10 M960,442 l-5,9" opacity="0.7" />
          </g>
        </g>

        <image
          className="sk-fade"
          href="/mountain-sketch.webp"
          x="160"
          y="352"
          width="1280"
          height="536"
          preserveAspectRatio="xMaxYMax meet"
          mask="url(#mtnFade)"
          opacity="0.95"
        />
        {/* Valley mist */}
        <rect x="160" y="660" width="1280" height="240" fill="url(#mist)" className="sk-fade" style={{ ["--d" as string]: "0.6s" }} />

        <g fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" filter="url(#pencil)">
          {/* Drafting marks */}
          <g className="sk-draw" style={{ ["--d" as string]: "0s" }} opacity="0.35" strokeWidth="0.8">
            <path pathLength={1} d="M640,96 L640,840" strokeDasharray="2 7" />
            <path pathLength={1} d="M1360,70 l12,0 M1366,64 l0,12" />
            <path pathLength={1} d="M720,92 l10,0 M725,87 l0,10" />
          </g>

          {/* ── Software: code window that types itself ── */}
          <g className="sk-draw" style={{ ["--d" as string]: "0.25s" }}>
            <rect pathLength={1} x="672" y="128" width="268" height="176" rx="8" fill={PAPER} />
            <path pathLength={1} d="M672,154 L940,154" opacity="0.6" />
            <circle pathLength={1} cx="688" cy="141" r="3.5" />
            <circle pathLength={1} cx="702" cy="141" r="3.5" />
            <circle pathLength={1} cx="716" cy="141" r="3.5" />
          </g>
          <g strokeWidth="1.6" opacity="0.75">
            {CODE.map(([indent, len], i) => (
              <path
                key={i}
                d={`M${690 + indent},${176 + i * 17} l${len},0`}
                strokeDasharray={`${len} ${len}`}
                strokeDashoffset={len}
                stroke={i === 3 ? "#3847FF" : INK}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${len};0;0;${len}`}
                  keyTimes="0;0.35;0.9;1"
                  dur="9s"
                  begin={`${0.9 + i * 0.35}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </g>
          <rect x="826" y="276" width="7" height="12" fill={INK} stroke="none" className="sk-fade" style={{ ["--d" as string]: "1.2s" }}>
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1s" repeatCount="indefinite" />
          </rect>

          {/* ── Globe ── */}
          <g transform="rotate(-16 1185 205)">
            <g className="sk-draw" style={{ ["--d" as string]: "0.5s" }}>
              <circle pathLength={1} cx="1185" cy="205" r="92" fill={PAPER} />
              <path pathLength={1} d="M1185,205 m0,-92 a92,92 0 0,1 0,184 a72,92 0 0,0 0,-184" fill="url(#hatch)" opacity="0.6" stroke="none" />
              <path pathLength={1} d="M1185,108 L1185,302" opacity="0.3" strokeWidth="0.8" />
              {[-50, 0, 50].map((dy) => {
                const w = Math.sqrt(92 * 92 - dy * dy);
                return <ellipse key={dy} pathLength={1} cx="1185" cy={205 + dy} rx={w} ry={w * 0.12} opacity="0.4" strokeWidth="0.8" />;
              })}
            </g>
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

          {/* ── Satellite on orbit, scanning the ground ── */}
          <path d={orbit} opacity="0.3" strokeDasharray="3 8" strokeWidth="0.9" className="sk-fade" style={{ ["--d" as string]: "1.2s" }} />
          <g className="sk-fade" style={{ ["--d" as string]: "1.6s" }}>
            <animateMotion dur="26s" repeatCount="indefinite" path={orbit} />
            <polygon points="0,9 -34,170 34,170" fill="url(#beam)" stroke="none">
              <animate attributeName="opacity" values="0.55;1;0.55" dur="3.2s" repeatCount="indefinite" />
            </polygon>
            <rect x="-9" y="-8" width="18" height="16" fill={PAPER} />
            <rect x="-44" y="-6" width="30" height="12" fill="url(#hatch)" />
            <rect x="14" y="-6" width="30" height="12" fill="url(#hatch)" />
            <path d="M-14,0 L-9,0 M9,0 L14,0 M-34,-6 L-34,6 M-24,-6 L-24,6 M24,-6 L24,6 M34,-6 L34,6 M0,-8 L0,-15" />
            <circle cx="0" cy="-16" r="2" />
          </g>

          {/* ── Jet crossing the sky with a contrail ── */}
          <path d={jetPath} opacity="0.28" strokeDasharray="1 6" strokeWidth="1" className="sk-fade" style={{ ["--d" as string]: "2s" }} />
          <g className="sk-fade" style={{ ["--d" as string]: "2s" }}>
            <animateMotion dur="30s" repeatCount="indefinite" path={jetPath} rotate="auto" />
            <path d="M14,0 L-2,-2 L-10,-13 L-14,-13 L-8,-2 L-16,-1 L-20,-6 L-23,-6 L-21,0 L-23,6 L-20,6 L-16,1 L-8,2 L-14,13 L-10,13 L-2,2 Z" fill={PAPER} />
          </g>

          {/* ── Rocket on a slow climb ── */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 6; 0 -10; 0 6" dur="7s" repeatCount="indefinite" />
            <polygon points="1316,474 1344,474 1330,560" fill="url(#flame)" stroke="none" className="sk-fade" style={{ ["--d" as string]: "2.2s" }}>
              <animate attributeName="points" values="1316,474 1344,474 1330,560;1314,474 1346,474 1330,586;1316,474 1344,474 1330,560" dur="0.5s" repeatCount="indefinite" />
            </polygon>
            <g className="sk-draw" style={{ ["--d" as string]: "0.8s" }}>
              <path pathLength={1} d="M1330,318 C1346,336 1350,360 1350,388 L1350,462 L1310,462 L1310,388 C1310,360 1314,336 1330,318 Z" fill={PAPER} />
              <path pathLength={1} d="M1316,350 L1344,350" opacity="0.6" />
              <path pathLength={1} d="M1310,436 L1350,436" opacity="0.6" />
              <rect pathLength={1} x="1316" y="436" width="34" height="26" fill="url(#hatchFine)" stroke="none" />
              <circle pathLength={1} cx="1330" cy="378" r="9" fill={PAPER} />
              <circle pathLength={1} cx="1330" cy="378" r="5" fill="url(#hatch)" />
              <path pathLength={1} d="M1310,424 L1292,456 L1292,474 L1310,462" fill="url(#hatch)" />
              <path pathLength={1} d="M1350,424 L1368,456 L1368,474 L1350,462" fill="url(#hatch)" />
              <path pathLength={1} d="M1318,462 L1320,474 L1340,474 L1342,462" />
            </g>
          </g>

          {/* ── Drone ── */}
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 0; 60 12; -20 6; 0 0" dur="24s" repeatCount="indefinite" />
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -9; 0 0" dur="4s" repeatCount="indefinite" additive="sum" />
              <g className="sk-draw" style={{ ["--d" as string]: "0.9s" }}>
                <rect pathLength={1} x="884" y="404" width="34" height="13" rx="4" fill={PAPER} />
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

          {/* ── Defence: radar dish on the ridge ── */}
          <g className="sk-draw" style={{ ["--d" as string]: "1.1s" }}>
            <path pathLength={1} d="M1226,664 L1242,622 L1258,664 M1232,650 L1252,650" />
            <path pathLength={1} d="M1212,600 C1214,632 1248,652 1276,640 Z" fill={PAPER} transform="rotate(-24 1244 622)" />
            <path pathLength={1} d="M1212,600 C1222,618 1246,632 1276,640" fill="url(#hatchFine)" stroke="none" transform="rotate(-24 1244 622)" />
            <path pathLength={1} d="M1242,622 L1222,598" />
            <circle pathLength={1} cx="1221" cy="597" r="3" />
          </g>
          {/* Signal pulses leaving the dish feed */}
          <g transform="translate(1221,597)" stroke="#3847FF" strokeWidth="1.1" className="sk-fade" style={{ ["--d" as string]: "2.4s" }}>
            {[0, 1, 2].map((i) => (
              <path key={i} d="M-13.2,-4.8 A14,14 0 0,1 -4.8,-13.2" opacity="0" vectorEffect="non-scaling-stroke">
                <animateTransform attributeName="transform" type="scale" values="1;3.2" dur="2.7s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.85;0" dur="2.7s" begin={`${i * 0.9}s`} repeatCount="indefinite" />
              </path>
            ))}
          </g>

          {/* ── AI: chip with data flowing through traces ── */}
          <g transform="translate(-40,-100)">
            <g className="sk-draw" style={{ ["--d" as string]: "1.2s" }}>
              <path pathLength={1} d="M1060,734 L1136,772 L1060,810 L984,772 Z" fill={PAPER} />
              <path pathLength={1} d="M1060,750 L1104,772 L1060,794 L1016,772 Z" fill="url(#hatch)" />
              <path pathLength={1} d="M984,772 L984,780 L1060,818 L1136,780 L1136,772" />
              {[0, 1, 2, 3, 4].map((i) => (
                <path key={i} pathLength={1} d={`M${996 + i * 13},${766 + i * 6.5} l-12,6`} opacity="0.7" />
              ))}
            </g>
            <g stroke="#3847FF" strokeWidth="1.1" opacity="0.75" className="sk-fade" style={{ ["--d" as string]: "2.2s" }}>
              {["M1110,792 L1170,822 L1214,822", "M1012,758 L960,732 L928,732", "M1012,786 L962,812 L920,812"].map((d) => (
                <path key={d} d={d} strokeDasharray="5 9">
                  <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="1.6s" repeatCount="indefinite" />
                </path>
              ))}
            </g>
          </g>

          {/* ── Foreground pine forest ── */}
          <g className="sk-draw" style={{ ["--d" as string]: "0.4s" }} strokeWidth="1">
            {TREES.map((t, i) => {
              const base = 884;
              const top = base - t.h;
              const tiers = 3;
              let d = `M${t.x},${top}`;
              for (let k = 1; k <= tiers; k++) {
                const y = top + (t.h * 0.82 * k) / tiers;
                const w = (t.w * k) / tiers;
                d += ` L${t.x + w},${y} L${t.x + w * 0.35},${y - 2}`;
              }
              d += ` L${t.x - (t.w * 0.35)},${top + t.h * 0.82 - 2}`;
              for (let k = tiers; k >= 1; k--) {
                const y = top + (t.h * 0.82 * k) / tiers;
                const w = (t.w * k) / tiers;
                d += ` L${t.x - w},${y}`;
                if (k > 1) d += ` L${t.x - w * 0.35},${y - (t.h * 0.82) / tiers + 2}`;
              }
              d += " Z";
              return (
                <g key={i}>
                  <path pathLength={1} d={d} fill={i % 3 === 0 ? "url(#hatch)" : PAPER} />
                  <path pathLength={1} d={`M${t.x},${top + t.h * 0.82} L${t.x},${base}`} />
                </g>
              );
            })}
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

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stripe-style dot field that flows from one sector's shape to the next:
 * a rocket, a neural chip, a drone, a processor, code, the rupee, a flame, an aircraft.
 * Shapes are traced from Lucide icon outlines (ISC licence) and sampled into dots.
 */
export type Sector = { name: string; company: string; path: string };

export const SECTORS: Sector[] = [
  {
    name: "Space",
    company: "Skyroot Aerospace",
    path: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5 M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09 M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",
  },
  {
    name: "AI",
    company: "Sarvam",
    path: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z M9 13a4.5 4.5 0 0 0 3-4 M6.003 5.125A3 3 0 0 0 6.401 6.5 M3.477 10.896a4 4 0 0 1 .585-.396 M6 18a4 4 0 0 1-1.967-.516 M12 13h4 M12 18h6a2 2 0 0 1 2 2v1 M12 8h8 M16 8V5a2 2 0 0 1 2-2 M15.5 13a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0 M17.5 3a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0 M19.5 21a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0 M19.5 8a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0",
  },
  {
    name: "Defence",
    company: "ideaForge",
    path: "M10 10 7 7 M10 14 7 17 M14 10 17 7 M14 14 17 17 M14.205 4.139a4 4 0 1 1 5.439 5.863 M19.637 14a4 4 0 1 1-5.432 5.868 M4.367 10a4 4 0 1 1 5.438-5.862 M9.795 19.862a4 4 0 1 1-5.429-5.873 M10 8h4v8h-4Z",
  },
  {
    name: "Semiconductors",
    company: "Mindgrove",
    path: "M12 20v2 M12 2v2 M17 20v2 M17 2v2 M2 12h2 M2 17h2 M2 7h2 M20 12h2 M20 17h2 M20 7h2 M7 20v2 M7 2v2 M4 4h16v16h-16Z M8 8h8v8h-8Z",
  },
  { name: "Software", company: "Rocketlane", path: "M18 16 22 12 18 8 M6 8 2 12 6 16 M14.5 4 9.5 20" },
  { name: "Financial services", company: "Navi", path: "M6 3h12 M6 8h12 M6 13 14.5 21 M6 13h3 M9 13c6.667 0 6.667-10 0-10" },
  {
    name: "Propulsion",
    company: "Bellatrix Aerospace",
    path: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
  },
  {
    name: "Aerospace",
    company: "JEH Aerospace",
    path: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  },
];

const N = 1300; // dots in the swarm
const HOLD_MS = 2600;
const BLUE = [56, 71, 255];
const GREY = [162, 165, 171];

/** Sample an icon outline into N points in a unit square. */
function sample(path: string): Float32Array {
  const S = 240;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  const pad = 18;
  const k = (S - pad * 2) / 24;
  g.translate(pad, pad);
  g.scale(k, k);
  g.lineWidth = 2.1;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.strokeStyle = "#000";
  g.stroke(new Path2D(path));
  const data = g.getImageData(0, 0, S, S).data;
  const pts: number[] = [];
  const step = 3;
  for (let y = 0; y < S; y += step)
    for (let x = 0; x < S; x += step) if (data[(y * S + x) * 4 + 3] > 128) pts.push(x / S, y / S);
  const n = pts.length / 2;
  const out = new Float32Array(N * 2);
  // Fill N slots: shuffle the samples, repeating with a whisper of jitter when there are fewer than N.
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (let i = 0; i < N; i++) {
    const s = order[i % n];
    const jit = i >= n ? 0.004 : 0;
    out[i * 2] = pts[s * 2] + (Math.random() - 0.5) * jit;
    out[i * 2 + 1] = pts[s * 2 + 1] + (Math.random() - 0.5) * jit;
  }
  return out;
}

export function SectorDots({ index, onAdvance, playing }: { index: number; onAdvance: () => void; playing: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const shapes = useRef<Float32Array[] | null>(null);
  const state = useRef<{ pos: Float32Array; vel: Float32Array; tgt: Float32Array; speed: Float32Array; tint: Float32Array } | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const advance = useRef(onAdvance);
  useEffect(() => {
    advance.current = onAdvance;
  }, [onAdvance]);

  // Build shapes once, start the swarm scattered so it gathers into the first shape.
  useEffect(() => {
    shapes.current = SECTORS.map((s) => sample(s.path));
    const pos = new Float32Array(N * 2);
    for (let i = 0; i < N * 2; i++) pos[i] = 0.5 + (Math.random() - 0.5) * 0.9;
    const speed = new Float32Array(N);
    const tint = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      speed[i] = 0.035 + Math.random() * 0.05;
      tint[i] = Math.random();
    }
    state.current = { pos, vel: new Float32Array(N * 2), tgt: shapes.current[0].slice(), speed, tint };
  }, []);

  // New sector: hand each dot a fresh target in the next shape.
  useEffect(() => {
    if (!shapes.current || !state.current) return;
    const next = shapes.current[index];
    state.current.tgt = next.slice();
    if (reduced) state.current.pos = next.slice();
  }, [index, reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Timer that moves to the next sector.
  useEffect(() => {
    if (!visible || !playing || reduced) return;
    const t = window.setTimeout(() => advance.current(), HOLD_MS + 900);
    return () => window.clearTimeout(t);
  }, [index, visible, playing, reduced]);

  // Render loop.
  useEffect(() => {
    const cv = ref.current;
    const st = state.current;
    if (!cv || !st || !visible) return;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const t0 = performance.now();

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      const size = Math.min(w, h);
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;

      // Faint background lattice.
      ctx.fillStyle = "rgba(28,29,32,0.07)";
      const gap = size / 34;
      for (let y = oy + gap / 2; y < oy + size; y += gap)
        for (let x = ox + gap / 2; x < ox + size; x += gap) ctx.fillRect(x - 0.6, y - 0.6, 1.2, 1.2);

      const { pos, vel, tgt, speed, tint } = st;
      for (let i = 0; i < N; i++) {
        const ix = i * 2;
        // Spring toward the target with a little drift so the shape breathes.
        const drift = 0.0025;
        const tx = tgt[ix] + Math.sin(t * 1.3 + i) * drift;
        const ty = tgt[ix + 1] + Math.cos(t * 1.1 + i * 1.7) * drift;
        vel[ix] = (vel[ix] + (tx - pos[ix]) * speed[i]) * 0.82;
        vel[ix + 1] = (vel[ix + 1] + (ty - pos[ix + 1]) * speed[i]) * 0.82;
        pos[ix] += vel[ix];
        pos[ix + 1] += vel[ix + 1];

        const moving = Math.min(1, Math.hypot(vel[ix], vel[ix + 1]) * 160);
        const c = tint[i] < 0.78 ? BLUE : GREY;
        const a = 0.55 + 0.45 * (1 - moving);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
        const d = 1.9 + moving * 0.8;
        ctx.fillRect(ox + pos[ix] * size - d / 2, oy + pos[ix + 1] * size - d / 2, d, d);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return <canvas ref={ref} className="block h-full w-full" aria-hidden="true" />;
}

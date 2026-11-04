// Builds public/mountain-sketch.webp (the hero's graphite study) from public/mountain.webp.
// Runs before every build. If anything fails, it copies the original photo so the site still builds.
import { copyFileSync, existsSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/mountain.webp";
const OUT = "public/mountain-sketch.webp";

async function main() {
  const { width: w, height: h } = await sharp(SRC).metadata();

  const rgba = await sharp(SRC).ensureAlpha().raw().toBuffer();
  const gray = await sharp(SRC).flatten({ background: "#ffffff" }).grayscale().extractChannel(0).raw().toBuffer();
  const invBlur = await sharp(gray, { raw: { width: w, height: h, channels: 1 } }).negate().blur(6).extractChannel(0).raw().toBuffer();
  const edges = await sharp(gray, { raw: { width: w, height: h, channels: 1 } })
    .blur(1.2)
    .convolve({ width: 3, height: 3, kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1] })
    .extractChannel(0)
    .raw()
    .toBuffer();
  const alphaRaw = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) alphaRaw[i] = rgba[i * 4 + 3];
  const alpha = await sharp(alphaRaw, { raw: { width: w, height: h, channels: 1 } }).blur(1.5).extractChannel(0).raw().toBuffer();

  // Tone stretch from the visible mountain only
  const vals = [];
  for (let i = 0; i < w * h; i += 7) if (rgba[i * 4 + 3] > 128) vals.push(gray[i]);
  vals.sort((a, b) => a - b);
  const lo = vals[Math.floor(vals.length * 0.03)];
  const hi = vals[Math.floor(vals.length * 0.97)];

  // Seeded noise (paper grain)
  let seed = 3;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

  const paper = [244, 242, 237];
  const lead = [58, 60, 66];
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const g = gray[i];
      const dodge = Math.min(255, (g * 255) / (255 - invBlur[i] + 1));
      const t = Math.min(1, Math.max(0, (g - lo) / (hi - lo)));
      const tone = Math.pow(t, 1.6) * 255;
      const dark = 1 - tone / 255;
      const hatch = (x + y) % 7 < 1.2 ? 1 : 0;
      const e = Math.min(255, edges[i] * 4);
      let v = 255 - (1 - dodge / 255) * 255 * 0.9 - dark * 120 - hatch * dark * 90 - e * 0.35 + gauss() * 6;
      v = Math.min(255, Math.max(0, v)) / 255;
      out[i * 4] = lead[0] + (paper[0] - lead[0]) * v;
      out[i * 4 + 1] = lead[1] + (paper[1] - lead[1]) * v;
      out[i * 4 + 2] = lead[2] + (paper[2] - lead[2]) * v;
      out[i * 4 + 3] = alpha[i];
    }
  }
  await sharp(out, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 72 }).toFile(OUT);
  console.log(`make-sketch: wrote ${OUT} (${w}x${h})`);
}

main().catch((err) => {
  console.warn("make-sketch: falling back to the original photo:", err?.message || err);
  if (existsSync(SRC)) copyFileSync(SRC, OUT);
});

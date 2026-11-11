const KEEP: Record<string, string> = { ai: "AI", tmt: "TMT", saas: "SaaS", b2b: "B2B", nbfc: "NBFC", nbfcs: "NBFCs", upi: "UPI", ipo: "IPO", ev: "EV", d2c: "D2C", api: "API" };

/** Sentence case for labels stored in capitals ("VERTICAL SAAS" -> "Vertical SaaS"). */
export function sentenceCase(text?: string | null): string {
  if (!text) return "";
  const words = text.toLowerCase().split(/(\s+|&|\/|-)/);
  const out = words.map((w) => KEEP[w] ?? w).join("");
  return out.charAt(0).toUpperCase() + out.slice(1);
}

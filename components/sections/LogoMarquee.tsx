/**
 * Stripe-style logo strip: the Indian companies I'm rooting for, drifting
 * slowly from right to left in one muted tone.
 */
type Logo = { name: string; src?: string; h: number };

const LOGOS: Logo[] = [
  { name: "Skyroot Aerospace", src: "/logo-skyroot.svg", h: 42 },
  { name: "Sarvam", src: "/logo-sarvam.svg", h: 24 },
  { name: "ideaForge", h: 26 },
  { name: "Mindgrove", src: "/logo-mindgrove.svg", h: 30 },
  { name: "Rocketlane", src: "/logo-rocketlane.svg", h: 24 },
  { name: "Navi", src: "/logo-navi.svg", h: 30 },
  { name: "Bellatrix Aerospace", src: "/logo-bellatrix.png", h: 46 },
  { name: "JEH Aerospace", src: "/logo-jeh.png", h: 44 },
];

function Mark({ logo }: { logo: Logo }) {
  if (!logo.src) {
    // ideaForge's own site sets its name as type: bold "idea", regular "Forge".
    return (
      <span className="whitespace-nowrap text-[26px] leading-none tracking-[-0.01em] text-black" aria-label={logo.name}>
        <span className="font-normal">idea</span>Forge
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo.src} alt={logo.name} style={{ height: logo.h }} className="w-auto max-w-none [filter:brightness(0)]" loading="eager" draggable={false} />
  );
}

export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul className="logo-marquee-row flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24" aria-hidden={hidden || undefined}>
      {LOGOS.map((l) => (
        <li key={l.name} className="flex h-12 items-center opacity-[0.55] transition-opacity duration-300 hover:opacity-90">
          <Mark logo={l} />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Indian companies I'm rooting for" className="w-full pt-14 md:pt-16">
      <p className="mb-8 text-center text-[13px] text-[#5a5d63]">Indian companies I&apos;m rooting for</p>
      <div className="logo-marquee relative overflow-hidden">
        <div className="logo-marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

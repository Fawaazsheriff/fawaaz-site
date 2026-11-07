import { Landmark, LineChart, Hammer } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const PILLARS = [
  { icon: Landmark, label: "Capital raising\nand advisory" },
  { icon: LineChart, label: "Research on listed\nnew-age tech" },
  { icon: Hammer, label: "Building a\nproptech company" },
];

export function WhoIAm() {
  return (
    <section id="who-i-am" className="w-full px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-28 scroll-mt-24">
      <div className="mx-auto max-w-[1000px] text-center">
        <p className="inline-flex items-center gap-2 text-[13px] text-[#5a5d63]">
          <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-[1px] bg-[#1C1D20]" />
          Who I am
        </p>

        <h2 className="mt-6 text-[28px] sm:text-[36px] md:text-[44px] font-medium leading-[1.15] tracking-[-0.035em] text-[#1C1D20]">
          I help technology and fintech companies raise capital and tell their story to investors.{" "}
          <span className="text-[#a2a5ab]">
            Alongside, I build PropertyAutomate and publish the RainGauge Index on India&apos;s listed new-age tech.
          </span>
        </h2>

        <ul className="mx-auto mt-14 grid max-w-[640px] grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3 text-center">
              <Icon aria-hidden="true" strokeWidth={1.25} className="h-7 w-7 text-[#1C1D20]" />
              <span className="whitespace-pre-line text-[14px] md:text-[16px] leading-[1.3] text-[#1C1D20]">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1000px] grid-cols-1 gap-3 md:grid-cols-2">
        {/* Left: place */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-[#dfe3e7]">
          <img src={img("photo-1570168007204-dfb528c6958f")} alt="The Gateway of India, Mumbai, at dusk" className="h-full w-full object-cover" />
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[12px] text-[#1C1D20] backdrop-blur">Mumbai</span>
          <a
            href="#insights"
            className="group absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-full bg-white px-6 py-4 font-mono text-[13px] text-[#1C1D20] transition-colors hover:bg-[#1C1D20] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
          >
            Read the latest insights
            <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-[1px] bg-current transition-transform group-hover:scale-125" />
          </a>
        </div>

        {/* Right: story */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-[#1C1D20]">
          <img src={img("photo-1454165804606-c3d57bc86b40")} alt="" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 max-w-[40ch] text-[15px] leading-[1.6] text-white">
            My work has included a $500M raise for an Indian tech and AI business. This site is where research on the
            next decade&apos;s businesses meets conversations with the founders building them.
          </p>
        </div>
      </div>
    </section>
  );
}

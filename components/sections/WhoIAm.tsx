import { Landmark, LineChart, Hammer } from "lucide-react";

const PILLARS = [
  { icon: Landmark, label: "Capital raising\nand advisory" },
  { icon: LineChart, label: "Research on listed\nnew-age tech" },
  { icon: Hammer, label: "Building a\nproptech company" },
];

export function WhoIAm() {
  return (
    <section id="who-i-am" className="w-full px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-20 scroll-mt-24">
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

    </section>
  );
}

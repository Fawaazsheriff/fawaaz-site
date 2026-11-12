import { CompanyStories } from "./CompanyStories";

/**
 * Cover: the headline, then Stripe-style company stories
 * (logo tabs, one line, a video box and three facts) in place of a full-bleed reel.
 */
export function Hero() {
  return (
    <section className="relative w-full bg-white pb-[72px] md:pb-[88px]">
      <div className="px-4 pt-[6vh] md:px-8 md:pt-[7vh]">
        <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[860px]">
          <h1 className="hero-rise text-[38px] sm:text-[48px] md:text-[52px] lg:text-[58px] font-normal leading-[1.02] tracking-[-0.02em] text-[#1C1D20]">
            Investing in the businesses and industries defining the next decade.
          </h1>

          <p className="hero-rise mt-5 max-w-[460px] text-[16px] md:text-[18px] leading-[1.6] text-[#33363c]" style={{ animationDelay: "0.1s" }}>
            Deep dives into the companies of the future, focusing on what matters most.
          </p>

          <a
            href="#insights"
            className="hero-rise group mt-7 inline-flex items-center gap-10 border-b border-[#1C1D20]/40 pb-2 text-[14px] font-normal text-[#1C1D20] transition-colors hover:border-[#3847FF] hover:text-[#3847FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3847FF]"
            style={{ animationDelay: "0.25s" }}
          >
            Read the latest insights
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
        </div>
      </div>

      <div className="hero-rise" style={{ animationDelay: "0.35s" }}>
        <CompanyStories inHero />
      </div>
    </section>
  );
}

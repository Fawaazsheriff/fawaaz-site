export function WhoIAm() {
  return (
    <section id="who-i-am" className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-20 border-b border-[#e8ecef] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto bg-white rounded-[32px] p-10 md:p-16 lg:p-20 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <h2 className="md:col-span-4 text-[36px] md:text-[48px] font-medium text-[#1C1D20] leading-[1] tracking-[-0.04em]">
          Who I am
        </h2>

        <div className="md:col-span-8 max-w-[62ch] space-y-6 text-[17px] md:text-[18px] leading-[1.7] text-[#444]">
          <p>
            Most people who know me professionally know me as an investment banker. I spend my days at The Rainmaker
            Group in Mumbai, working with technology and fintech companies on how they raise capital, find the right
            partners and tell their story to investors. That work has included a $500M raise for an Indian tech and AI
            business.
          </p>
          <p>
            The other half of me is a builder and a researcher. I run PropertyAutomate, a proptech platform serving the
            GCC and India, and I publish the RainGauge Index, a quarterly read on India&apos;s listed new-age technology
            companies. This site is where the two meet: research on the businesses I think will define the next decade,
            and conversations with the founders building them.
          </p>
        </div>
      </div>
    </section>
  );
}

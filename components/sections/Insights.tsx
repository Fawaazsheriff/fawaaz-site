import React from 'react';

const featuredInsight = {
    date: "October 2025",
    title: "Public Markets\nUpdate",
    bottomText: "Public Markets Update Deck and Replay",
    headshots: [
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
    ]
};

const insightsList = [
    {
        title: "Investing in innovation through public and private markets with responsible risk management",
        linkText: "Visit CoatueCTEK.com",
        isDarkPlaceholder: true,
        placeholderText: "CTEK Coatue Innovative Strategies Fund"
    },
    {
        title: "Our Partnership with Anthropic: Enterprise Intelligence has Liftoff",
        authors: "Thomas Laffont, Lucas Swisher, Jade Lai, Abhi Srinivas",
        linkText: "Learn more",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=180",
    },
    {
        title: "Sourcery Interview at Upfront Summit",
        authors: "Featuring Coatue's Thomas Laffont",
        linkText: "Learn more",
        imageSrc: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=300&h=180",
    }
];

export function Insights() {
    return (
        <section className="w-full relative flex flex-col lg:flex-row bg-white overflow-hidden border-t border-[#efefef]">

            {/* ─── LEFT: Dark Featured Panel Container ─── */}
            <div className="w-full lg:w-1/2 shrink-0 bg-white flex items-center justify-center p-8 lg:p-[40px] border-r border-[#efefef]">
                <div className="w-full max-w-[560px] aspect-square bg-[#171a24] text-white flex flex-col justify-between">
                    {/* Top content */}
                    <div className="p-8 lg:p-[48px]">
                        <p className="text-[#8a8fa8] text-[18px] lg:text-[20px] font-normal tracking-wide mb-[16px]">
                            {featuredInsight.date}
                        </p>
                        <h2 className="text-[38px] lg:text-[52px] leading-[1.05] font-light tracking-[-0.03em] whitespace-pre-line mb-[48px]">
                            {featuredInsight.title}
                        </h2>

                        {/* Headshots row */}
                        <div className="flex flex-wrap gap-[16px]">
                            {featuredInsight.headshots.map((src, idx) => (
                                <div key={idx} className="w-[70px] h-[80px] lg:w-[100px] lg:h-[110px] rounded-[8px] overflow-hidden bg-gray-800 shadow-sm">
                                    <img src={src} alt="Presenter" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom link */}
                    <div className="px-8 lg:px-[48px] pb-8 lg:pb-[48px]">
                        <span className="text-[17px] lg:text-[19px] font-bold tracking-[0.02em] hover:text-[#c0c0c0] transition-colors cursor-pointer">
                            {featuredInsight.bottomText}
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT: Insight List ─── */}
            <div className="flex-1 w-full lg:w-1/2 bg-white flex flex-col divide-y divide-[#efefef]">
                {insightsList.map((item, idx) => (
                    <a
                        href="#"
                        key={idx}
                        className="group flex flex-col sm:flex-row gap-6 lg:gap-10 px-6 lg:px-[48px] py-[32px] hover:bg-[#fafafa] transition-colors"
                    >
                        {/* Thumbnail */}
                        <div className="w-full sm:w-[240px] shrink-0 aspect-[16/9] bg-[#1a1f2e] overflow-hidden relative flex items-center justify-center rounded-[2px]">
                            {item.isDarkPlaceholder ? (
                                <div className="text-center px-4 flex flex-col items-center justify-center w-full h-full bg-[#1e2332]">
                                    <div className="text-white font-light tracking-wide leading-[1.3] text-center">
                                        <span className="font-normal text-[22px] block mb-1">CTEK</span>
                                        <span className="text-[10px] uppercase tracking-wider block leading-tight text-[#c0c0c0]">
                                            Coatue Innovative<br />Strategies Fund
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                item.imageSrc && (
                                    <img
                                        src={item.imageSrc}
                                        alt=""
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                                    />
                                )
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <h3 className="text-[18px] lg:text-[20px] text-[#111] leading-[1.35] mb-4 font-normal tracking-[-0.01em] group-hover:text-[var(--color-tribe-blue)] transition-colors">
                                    {item.title}
                                </h3>
                                {item.authors && (
                                    <p className="text-[13px] text-[#222] flex items-start gap-[8px]">
                                        <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-[#111] inline-block shrink-0" />
                                        <span className="leading-[1.4]">{item.authors}</span>
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 inline-flex items-center gap-3 text-[12px] font-mono text-[#555] group-hover:text-[#111] transition-colors">
                                <div className="relative w-[36px] h-[1px] bg-[#999] group-hover:bg-[#111] transition-colors">
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-[#999] group-hover:border-[#111] rotate-45 transform translate-x-[1px]" />
                                </div>
                                <span className="uppercase tracking-widest text-[11px]">{item.linkText}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

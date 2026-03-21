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
        title: "Uncapped Podcast",
        authors: "Featuring Coatue's Thomas Laffont",
        linkText: "Learn more",
        imageSrc: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=300&h=180",
    }
];

export function Insights() {
    return (
        <section className="w-full relative flex flex-col lg:flex-row bg-white overflow-hidden">

            {/* ─── LEFT: Dark Featured Panel ─── */}
            <div className="w-full lg:w-[300px] shrink-0 bg-[#171a24] text-white flex flex-col justify-between min-h-[380px] lg:min-h-[500px] border-r border-[#2a2e3a]">
                {/* Top content */}
                <div className="p-8 lg:p-[40px]">
                    <p className="text-[#8a8fa8] text-[14px] lg:text-[16px] tracking-tight mb-2 font-light">
                        {featuredInsight.date}
                    </p>
                    <h2 className="text-[28px] lg:text-[34px] leading-[1.15] font-light tracking-[-0.02em] whitespace-pre-line mb-8">
                        {featuredInsight.title}
                    </h2>

                    {/* Headshots row */}
                    <div className="flex flex-wrap gap-3">
                        {featuredInsight.headshots.map((src, idx) => (
                            <div key={idx} className="w-[58px] h-[68px] lg:w-[65px] lg:h-[75px] rounded-[5px] overflow-hidden bg-gray-800 shadow-md">
                                <img src={src} alt="Presenter" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom link */}
                <div className="px-8 lg:px-[40px] pb-8 lg:pb-10 border-t border-[#2a2e3a] pt-5">
                    <a href="#" className="text-[13px] lg:text-[14px] font-medium tracking-wide underline underline-offset-2 hover:text-[#a0a0a0] transition-colors">
                        {featuredInsight.bottomText}
                    </a>
                </div>
            </div>

            {/* ─── RIGHT: Insight List ─── */}
            <div className="flex-1 w-full bg-white flex flex-col divide-y divide-[#efefef]">
                {insightsList.map((item, idx) => (
                    <a
                        href="#"
                        key={idx}
                        className="group flex flex-col sm:flex-row gap-5 lg:gap-8 px-6 lg:px-[40px] py-8 hover:bg-[#fafafa] transition-colors"
                    >
                        {/* Thumbnail */}
                        <div className="w-full sm:w-[180px] md:w-[200px] shrink-0 h-[120px] bg-[#1a1f2e] overflow-hidden relative flex items-center justify-center">
                            {item.isDarkPlaceholder ? (
                                <div className="text-center px-4 flex flex-col items-center justify-center">
                                    <div className="text-white font-light tracking-wide leading-[1.3] text-center">
                                        <span className="font-medium text-[18px] block mb-1">CTEK</span>
                                        <span className="text-[10px] uppercase tracking-wider block leading-tight">
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
                        <div className="flex-1 flex flex-col justify-between py-0 sm:py-1">
                            <div>
                                <h3 className="text-[16px] lg:text-[17px] text-[#111] leading-[1.4] mb-3 font-normal tracking-[-0.01em] group-hover:text-[var(--color-tribe-blue)] transition-colors">
                                    {item.title}
                                </h3>
                                {item.authors && (
                                    <p className="text-[12px] text-[#555] flex items-start gap-2">
                                        <span className="mt-[5px] w-[5px] h-[5px] rounded-full bg-[#555] inline-block shrink-0" />
                                        <span className="leading-[1.4]">{item.authors}</span>
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 inline-flex items-center gap-3 text-[12px] font-mono text-[#555] group-hover:text-[#111] transition-colors">
                                <div className="relative w-[40px] h-[1px] bg-[#999] group-hover:bg-[#111] transition-colors">
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-[#999] group-hover:border-[#111] rotate-45 transform translate-x-[1px]" />
                                </div>
                                {item.linkText}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

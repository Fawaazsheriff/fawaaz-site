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
    },
    {
        title: "Our Partnership with Anthropic: Enterprise Intelligence has Liftoff",
        authors: "Thomas Laffont, Lucas Swisher, Jade Lai, Abhi Srinivas",
        linkText: "Learn more",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=500",
    },
    {
        title: "Sourcery Interview at Upfront Summit",
        authors: "Featuring Coatue's Thomas Laffont",
        linkText: "Learn more",
        imageSrc: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800&h=500",
    }
];

// Exact SVG arrow from the original Coatue website
const ArrowSVG = () => (
    <svg
        className="relative top-[1px] mr-[18px] h-auto w-[46px] shrink-0 transition-transform duration-200 ease-in-out group-hover:translate-x-[4px]"
        width="48"
        height="13"
        viewBox="0 0 48 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M0 6.5H47M47 6.5L41.5 1M47 6.5L41.5 12" stroke="currentColor" />
    </svg>
);

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
            {/*
                On lg: the section row height is set by the left panel (aspect-square card).
                The ul fills that full height (h-full via stretch), each li gets flex-1
                so all 3 items share the height equally. py-0 at lg removes padding bloat.
            */}
            <ul className="flex flex-col flex-1 w-full lg:w-1/2 bg-white">
                {insightsList.map((item, idx) => (
                    <li
                        key={idx}
                        className={[
                            // spacing & border
                            "relative flex-1",
                            "border-t border-[#e0e0e0]",
                            idx === insightsList.length - 1 ? "border-b border-[#e0e0e0]" : "",
                            // padding: generous on mobile/tablet, NONE on lg (height is fixed by flex-1)
                            "pt-[32px] pb-[40px] md:py-[24px] lg:py-0",
                            "px-6 lg:px-[48px]",
                            // center content vertically at lg
                            "flex items-center",
                        ].join(" ")}
                    >
                        <a
                            href="#"
                            className="no-underline group w-full"
                            title={item.title}
                        >
                            {/* 10-col grid: image 5 cols, content 5 cols — only at md+ */}
                            <article className="md:grid md:grid-cols-10 md:gap-x-[16px]">

                                {/* ── Thumbnail — 4 of 10 cols (smaller) ── */}
                                <div className="
                                    relative overflow-hidden bg-[#e8e8e8]
                                    aspect-[334/206]
                                    md:col-span-4 md:mr-[10px] md:aspect-[318/192]
                                ">
                                    {item.isDarkPlaceholder ? (
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-[#1e2332] text-white">
                                            <span className="font-normal text-[18px] tracking-[0.1em]">CTEK</span>
                                            <span className="text-[9px] uppercase tracking-wider leading-tight text-[#aaaaaa] text-center mt-[6px]">
                                                Coatue Innovative<br />Strategies Fund
                                            </span>
                                        </div>
                                    ) : (
                                        item.imageSrc && (
                                            <img
                                                src={item.imageSrc}
                                                alt=""
                                                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            />
                                        )
                                    )}
                                </div>

                                {/* ── Content — 6 of 10 cols, arrow pushed to bottom ── */}
                                <div className="
                                    mt-[20px]
                                    md:col-span-6 md:col-start-5 md:ml-[10px] md:mt-0 md:flex
                                ">
                                    <div className="flex w-full flex-col justify-between gap-[8px] md:max-w-[538px]">

                                        {/* Top group: title + author */}
                                        <div className="flex flex-col gap-[8px]">
                                            {/* Title — underlines on hover with medium speed */}
                                            <h3 className="
                                                text-[18px] leading-[1.3]
                                                md:text-[20px] md:leading-[1.2]
                                                lg:text-[15px] xl:text-[18px]
                                                font-normal text-[#111]
                                                underline-offset-[3px] decoration-[#111] decoration-[1.5px]
                                                transition-all duration-300
                                                group-hover:underline
                                            ">
                                                {item.title}
                                            </h3>

                                            {/* Author */}
                                            {item.authors && (
                                                <address className="
                                                    not-italic
                                                    text-[14px] leading-[1.2] lg:text-[12px] xl:text-[14px]
                                                    text-[#333]
                                                    before:relative before:-top-[1px] before:mr-[10px]
                                                    before:inline-block before:h-[7px] before:w-[7px]
                                                    before:rounded-full before:bg-[#111] before:align-middle
                                                    before:content-['']
                                                ">
                                                    {item.authors}
                                                </address>
                                            )}
                                        </div>

                                        {/* Arrow + link text — sits at the bottom via justify-between */}
                                        <div className="
                                            flex items-center font-mono
                                            text-[12px] lg:text-[10px] xl:text-[12px]
                                            text-[#111]
                                        ">
                                            <ArrowSVG />
                                            <span className="tracking-wide">{item.linkText}</span>
                                        </div>

                                    </div>
                                </div>

                            </article>
                        </a>
                    </li>
                ))}
            </ul>

        </section>
    );
}

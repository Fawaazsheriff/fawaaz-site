import React from "react";
import { ArrowUpRight } from "lucide-react";

const companies = [
    { name: "SHIPROCKET", country: "IND", desc: "First mile logistics and shipping for e-commerce\nin India", link: "https://www.shiprocket.in/" },
    { name: "KRAKEN", country: "USA", desc: "Cryptocurrency exchange", link: "https://www.kraken.com/" },
    { name: "APOLLO.IO", country: "USA", desc: "Data-first sales platform", link: "https://www.apollo.io/" },
    { name: "SPACEX", country: "USA", desc: "Launch services with reusable rockets providing\nreliable access to space", link: "https://www.spacex.com/" },
    { name: "XAI", country: "USA", desc: "Developer of an artificial intelligence platform\ndesigned to accelerate human scientific\ndiscovery", link: "https://x.ai/" },
    { name: "OPENAI", country: "USA", desc: "Developer of an AI-based platform designed to\ncreate an artificial general intelligence that\nbenefits all users", link: "https://openai.com/" }
];

export function Portfolio() {
    return (
        <section className="w-full relative flex flex-col lg:flex-row border-y border-grid bg-white">
            {/* Left Sidebar Content (Desktop) */}
            <div className="hidden lg:block w-[300px] shrink-0 border-r border-grid pt-[64px] px-10">
                <p className="text-[20px] leading-[1.3] text-[#222] font-light tracking-[-0.01em]">
                    Research-driven insights on long-term growth, structural change, and enduring businesses.
                </p>
            </div>

            {/* Mobile Sidebar Content */}
            <div className="lg:hidden w-full p-8 border-b border-grid">
                <p className="text-[20px] leading-[1.3] text-[#222] font-light tracking-[-0.01em]">
                    Research-driven insights on long-term growth, structural change, and enduring businesses.
                </p>
            </div>

            {/* Companies List */}
            <div className="flex-1 flex flex-col">
                {companies.map((company) => (
                    <a
                        href={company.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={company.name}
                        className="group flex flex-col md:flex-row md:items-center w-full min-h-[105px] border-b border-grid py-6 px-8 lg:px-[40px] hover:bg-[var(--color-tribe-blue)] cursor-pointer"
                    >
                        {/* Company Name Box */}
                        <div className="w-full md:w-[320px] shrink-0 mb-4 md:mb-0">
                            <div className="border border-[var(--color-tribe-blue)] text-[var(--color-tribe-blue)] group-hover:border-[#ffffff] group-hover:text-[#ffffff] text-[12px] font-semibold tracking-[0.06em] px-3 py-[7px] inline-block uppercase">
                                {"//"} {company.name}
                            </div>
                        </div>

                        {/* Country */}
                        <div className="w-full md:w-[180px] shrink-0 mb-3 md:mb-0 text-left">
                            <span className="text-[var(--color-tribe-blue)] group-hover:text-[#ffffff] text-[13px] font-semibold tracking-[0.18em]">
                                {company.country}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="flex-1 text-left">
                            <p className="text-[15px] text-black/60 group-hover:text-[#ffffff] group-hover:!text-[#ffffff] font-light leading-[1.6] max-w-[340px] whitespace-pre-line">
                                {company.desc}
                            </p>
                        </div>
                    </a>
                ))}

                {/* See More Row */}
                <div className="flex w-full items-center justify-center min-h-[140px] py-6 px-8 lg:px-[40px]">
                    <button className="bg-[var(--color-tribe-blue)] text-white text-[11px] font-semibold tracking-[0.18em] px-[32px] py-[16px] flex items-center justify-center gap-[6px] hover:opacity-90 transition-opacity">
                        SEE MORE <ArrowUpRight className="w-[14px] h-[14px] ml-1 stroke-[2.5]" />
                    </button>
                </div>
            </div>
        </section>
    );
}

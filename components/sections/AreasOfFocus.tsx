import React from 'react';

export function AreasOfFocus() {
    const itemsLeft = [
        "AI & Machine Learning",
        "Software & Internet",
        "Robotics"
    ];

    const itemsRight = [
        "Tech, Media, Telecom",
        "Energy & Climate Tech",
        "Financial Services & Fintech"
    ];

    return (
        <section className="w-full relative flex flex-col lg:flex-row border-b border-grid bg-white">
            {/* Left Sidebar (Formerly Empty) */}
            <div className="hidden lg:block w-[300px] shrink-0 border-r border-grid bg-white px-8 lg:px-[40px] pt-[64px]">
                <p className="text-[20px] text-[#444] leading-[1.4] tracking-[-0.01em] pr-2">
                    Research-driven insights on long-term growth, structural change, and enduring businesses.
                </p>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full bg-white px-8 lg:px-[40px] pt-[64px] pb-[80px]">
                {/* Header Row */}
                <div className="w-full pb-6 border-b border-[#cfcfcf]">
                    <span className="font-mono text-[14px] lg:text-[15px] text-[#555] tracking-wide">
                        Areas of Focus
                    </span>
                </div>

                {/* Grid Content */}
                <div className="flex flex-col md:flex-row w-full gap-x-12 lg:gap-x-20 pt-6">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col">
                        {itemsLeft.map((item, idx) => (
                            <div key={idx} className="w-full py-[28px] border-b border-[#efefef]">
                                <span className="text-[17px] text-[#444] tracking-[-0.01em]">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col">
                        {itemsRight.map((item, idx) => (
                            <div key={idx} className="w-full py-[28px] border-b border-[#efefef]">
                                <span className="text-[17px] text-[#444] tracking-[-0.01em]">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

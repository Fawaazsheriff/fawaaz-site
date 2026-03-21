"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function TopBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-[#ff4d4f] text-white w-full py-2 px-4 flex items-center justify-center relative z-[100] text-[13px] md:text-[14px]">
            <p className="font-medium tracking-wide">
                Fundraise Announcement: Congrats to Emergent for raising $70M from Khosla Ventures and SoftBank!
            </p>
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                aria-label="Close banner"
            >
                <X className="w-4 h-4 cursor-pointer" />
            </button>
        </div>
    );
}

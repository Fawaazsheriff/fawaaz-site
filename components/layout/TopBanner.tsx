"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Empty = no banner. Set the text from the admin panel to show one.
const DEFAULT_BANNER_TEXT = "";

export function TopBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [bannerText, setBannerText] = useState<string>(DEFAULT_BANNER_TEXT);

    useEffect(() => {
        const fetchBannerText = async () => {
            try {
                const res = await fetch("/api/site-settings", { cache: "no-store" });
                if (!res.ok) return;

                const data = await res.json();
                const topBannerText = data?.settings?.topBannerText;
                if (typeof topBannerText === "string") {
                    setBannerText(topBannerText);
                }
            } catch {
                // Keep fallback text when request fails.
            }
        };

        fetchBannerText();
    }, []);

    if (!isVisible || !bannerText.trim()) return null;

    return (
        <div className="bg-[#ff4d4f] text-white w-full py-2 px-4 flex items-center justify-center relative z-100 text-[13px] md:text-[14px]">
            <p className="font-medium tracking-wide">
                {bannerText}
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

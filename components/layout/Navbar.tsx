"use client";

import { useState } from "react";
import Link from "next/link";
import { DigitalButton } from "@/components/ui/DigitalButton";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: "HOME", href: "/" },
        { name: "INSIGHTS", href: "/insights" },
        { name: "VIDEOS", href: "/videos" },
        { name: "COMPANIES", href: "/company" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="w-full flex h-[72px] items-stretch border-b border-grid justify-between lg:justify-start relative z-50 bg-white">

                {/* Logo Section */}
                <div className="flex items-center justify-center px-6 lg:px-10 lg:border-r border-grid shrink-0 w-auto lg:w-[300px]">
                    <Link href="/" className="font-[family-name:var(--font-serif)] font-bold text-[22px] tracking-normal uppercase">
                        Fawaz
                    </Link>
                </div>

                {/* Links Section (Desktop) */}
                <nav className="hidden lg:flex flex-1 items-center justify-evenly px-6">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-medium tracking-[1.8px] text-[var(--color-tribe-gray)] hover:text-black transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>



                {/* Mobile Menu Toggle */}
                <div
                    className="flex items-center justify-center lg:hidden px-6 border-l border-grid cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 flex flex-col border-b border-grid h-[calc(100vh-72px)] overflow-y-auto">
                    <nav className="flex flex-col w-full">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-6 px-8 border-b border-grid text-[14px] font-bold tracking-[2px] text-black uppercase hover:bg-gray-50 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

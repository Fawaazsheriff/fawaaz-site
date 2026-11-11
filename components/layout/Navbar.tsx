"use client";

import { useState } from "react";
import Link from "next/link";
import { DigitalButton } from "@/components/ui/DigitalButton";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: "Home", href: "/" },
        { name: "Insights", href: "/insights" },
        { name: "Videos", href: "/videos" },
        { name: "Companies", href: "/company" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="w-full flex h-[72px] items-center justify-between relative z-50 bg-white px-6 md:px-12 lg:px-10">

                {/* Logo Section */}
                <div className="flex items-center shrink-0">
                    <Link href="/" className="text-[18px] font-medium tracking-[-0.01em] text-[#1a1a1a]">
                        Fawaaz Sheriff
                    </Link>
                </div>

                {/* Links Section (Desktop) */}
                <nav className="hidden lg:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[16px] text-[#1a1a1a] transition-colors hover:text-[#767676]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>



                {/* Mobile Menu Toggle */}
                <div
                    className="flex items-center justify-center lg:hidden -mr-2 p-2 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 flex flex-col pt-4 h-[calc(100vh-72px)] overflow-y-auto">
                    <nav className="flex flex-col w-full">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-5 px-6 text-[28px] tracking-[-0.02em] text-[#1a1a1a] hover:text-[#767676] transition-colors"
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

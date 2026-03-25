"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

// Mock Data
const FEATURED_EPISODE = {
    id: "featured-1",
    title: "ANTHROPIC VS THE PENTAGON: WHO WINS | OPENAI'S $110BN MEGA ROUND | CURSOR HITS $2BN IN ARR",
    date: "Mar 5, 2026",
    tag: "20VC",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=3149&auto=format&fit=crop", // Placeholder
};

const PAST_EPISODES = [
    {
        id: "ep-1",
        title: "Monday.com CEO on Is SaaS Dead: Will Everything Be Vibe Coded | Will Systems of Record Become Valueless Databases in an Agentic World",
        date: "Mar 2, 2026",
        tag: "20VC",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3174&auto=format&fit=crop", // Placeholder
    },
    {
        id: "ep-2",
        title: "Why Cursor is Dead? An AI Tsunami is Coming & You Need to Prepare",
        date: "Feb 28, 2026",
        tag: "20VC",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop", // Placeholder
    },
    {
        id: "ep-3",
        title: "Anthropic Wipes Billions Off Markets | Citrini Research Breakdown: Agents, Ghost GDP, Consumer Spend | Figma Earnings Beat",
        date: "Feb 26, 2026",
        tag: "20VC",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop", // Placeholder
    },
    {
        id: "ep-4",
        title: "Inside Coatue's $70BN Machine: Why Price Matters Least | Why Mega Markets are the Most Important | How Mega Funds Work",
        date: "Feb 23, 2026",
        tag: "20VC",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3174&auto=format&fit=crop", // Placeholder
    },
    {
        id: "ep-5",
        title: "Codex vs Claude Code vs Cursor: Who Wins, Who Loses | Will All Coding Be Automated - Do We Need PMs | The Real Bull Case for Devin",
        date: "Feb 21, 2026",
        tag: "20Product",
        imageUrl: "https://images.unsplash.com/photo-1566492031525-337190ca6469?q=80&w=3264&auto=format&fit=crop", // Placeholder
    },
    {
        id: "ep-6",
        title: "Anthropic Raises $30BN at $380BN Valuation | Thrive Raises New $10BN Fund | OpenAI Buys OpenClaw | Stripe Raises at $250BN",
        date: "Feb 19, 2026",
        tag: "20VC",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3174&auto=format&fit=crop", // Placeholder
    }
];

// Custom Hover Overlay Component
const VideoHoverOverlay = () => (
    <div className="absolute inset-0 bg-[#171a24]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[18px]">
        <div className="bg-white text-black rounded-full px-6 py-3 flex items-center gap-2 font-bold transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Episode
            <div className="bg-black text-white rounded-full p-[2px]">
                <ArrowRight size={14} strokeWidth={3} />
            </div>
        </div>
    </div>
);

// Helper for Social Icons
const SocialIcons = () => (
    <div className="flex gap-2 isolate relative z-10 w-fit">
        <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            {/* Mock Spotify */}
            <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.422c-.18.293-.56.38-.853.197-2.338-1.428-5.28-1.75-8.748-.96-.33.076-.66-.134-.736-.464-.075-.33.135-.66.464-.736 3.82-.87 7.07-.488 9.673 1.107.293.18.384.56.2.856zm1.2-3.21c-.226.368-.707.49-1.075.264-2.68-1.646-6.8-2.128-9.982-1.164-.413.125-.845-.11-.97-.523-.125-.414.11-.845.524-.97 3.65-1.11 8.214-.575 11.237 1.282.37.227.492.707.266 1.075zm.116-3.328c-3.21-1.905-8.504-2.08-11.58-.115-.472.292-1.096.14-1.39-.333-.292-.472-.14-1.097.332-1.39 3.52-2.25 9.38-2.05 13.132.175.454.27.603.856.333 1.31-.27.455-.856.604-1.31.333z" /></svg>
        </div>
        <div className="w-5 h-5 rounded-full bg-[#B253F6] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            {/* Mock Apple Podcasts */}
            <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path d="M13.828 7.373c-1.303-.574-3.08-.266-4.043.682-1.427 1.4-1.284 3.91.312 5.176l.128.1a.575.575 0 010 .96l-7.382 5.86c-.463.367-.184 1.12.4.11l15.688-26.6c.49-.838-1.32-1.41-1.97-.24l-3.228 5.672c.045-.045.09-.09.13-.135 1.706-1.673 1.534-4.67-.373-6.185-.187-.15-.386-.28-.592-.395l5-8.7c.39-.51-.18-1.04-.63-.5l-8.48 9.92a6.83 6.83 0 00-.73-5.22c-1.4-2.58-4.78-3.04-6.85-1.17l-.14.12.16-.14z" fillRule="evenodd" clipRule="evenodd" /></svg>
        </div>
        <div className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            {/* Mock YouTube */}
            <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path d="M21.582 6.186a2.684 2.684 0 00-1.884-1.895C17.985 3.8 12.002 3.8 12.002 3.8s-5.983 0-7.696.491A2.685 2.685 0 002.422 6.186C1.94 7.91 1.94 11.53 1.94 11.53s0 3.62.482 5.344a2.685 2.685 0 001.884 1.895c1.713.491 7.696.491 7.696.491s5.983 0 7.696-.491a2.684 2.684 0 001.884-1.895c.482-1.724.482-5.344.482-5.344s0-3.62-.482-5.344zM9.99 15.01V8.04l6.304 3.484-6.304 3.486z" /></svg>
        </div>
    </div>
);

// Fallback Image component for missing/broken URLs
const ThumbnailImage = ({ src, alt, priority = false }: { src?: string, alt: string, priority?: boolean }) => {
    // A dark, elegant abstract gradient from Unsplash as the fallback
    const fallbackSrc = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
            onError={() => setImgSrc(fallbackSrc)}
        />
    );
};

export default function VideosPage() {
    return (
        <div className="min-h-screen flex flex-col w-full bg-white relative font-sans">
            <Navbar />

            <main className="flex-1 w-full pt-[64px] md:pt-[80px] pb-28">

                {/* 1. FEATURED EPISODE SECTION */}
                <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 mb-10 md:mb-16">
                    <h1 className="text-center font-mono text-[14px] lg:text-[15px] text-[#555] tracking-widest mb-6 md:mb-10 uppercase">
                        FEATURED EPISODE
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                        {/* Featured Image */}
                        <a href={`/videos/${FEATURED_EPISODE.id}`} className="group relative block w-full aspect-[16/10] md:aspect-[3/2] rounded-[18px] overflow-hidden bg-gray-100 lg:max-w-[520px] lg:justify-self-end">
                            <ThumbnailImage
                                src={FEATURED_EPISODE.imageUrl}
                                alt={FEATURED_EPISODE.title}
                                priority
                            />
                            <VideoHoverOverlay />
                        </a>

                        {/* Featured Details */}
                        <div className="flex flex-col justify-center lg:pt-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="font-mono text-[11px] text-[#555] uppercase tracking-widest">
                                    {FEATURED_EPISODE.tag}
                                </span>
                                <span className="text-[#8a8fa8] font-light text-[13px]">
                                    {FEATURED_EPISODE.date}
                                </span>
                            </div>

                            <a href={`/videos/${FEATURED_EPISODE.id}`} className="group/title block">
                                <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-light leading-[1.1] tracking-[-0.02em] mb-6 text-[#111] group-hover/title:opacity-70 transition-opacity">
                                    {FEATURED_EPISODE.title}
                                </h2>
                            </a>

                            <div className="flex items-center justify-between mt-1">
                                <a href={`/videos/${FEATURED_EPISODE.id}`} className="font-mono text-[11px] text-[#555] uppercase tracking-widest flex items-center gap-2 hover:text-[#111] transition-colors">
                                    View Episode <ArrowRight size={16} />
                                </a>
                                <SocialIcons />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. FILTER & SEARCH BAR */}
                <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 mb-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto w-full md:w-auto scroller-hide pb-2 md:pb-0 min-w-max">
                        </div>
                        <div className="relative w-full md:w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Find articles..."
                                className="w-full border border-gray-300 rounded-[6px] py-[8px] pl-10 pr-4 text-[14px] outline-none focus:border-black transition-colors"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. EPISODES GRID SECTION */}
                <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                        {PAST_EPISODES.map((ep) => (
                            <div key={ep.id} className="flex flex-col w-full">
                                {/* Thumbnail */}
                                <a href={`/videos/${ep.id}`} className="group relative block w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-gray-100 mb-4 isolate">
                                    <ThumbnailImage
                                        src={ep.imageUrl}
                                        alt={ep.title}
                                    />
                                    <VideoHoverOverlay />
                                </a>

                                {/* Meta details */}
                                <div className="flex items-center justify-between mb-4 w-full">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[11px] text-[#555] uppercase tracking-widest">
                                            {ep.tag}
                                        </span>
                                        <span className="text-[#8a8fa8] font-light text-[12px] md:text-[13px]">
                                            {ep.date}
                                        </span>
                                    </div>
                                    <SocialIcons />
                                </div>

                                {/* Title */}
                                <a href={`/videos/${ep.id}`} className="group/title block">
                                    <h3 className="text-[17px] md:text-[18px] lg:text-[20px] text-[#111] font-normal leading-[1.3] tracking-[-0.01em] group-hover/title:opacity-70 transition-opacity line-clamp-4">
                                        {ep.title}
                                    </h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { sentenceCase } from "@/lib/format";

interface Video {
    _id: string;
    title: string;
    date: string;
    tag: string;
    imageUrl: string;
    youtubeId?: string;
    description?: string;
    featured: boolean;
}

// Custom Hover Overlay Component
const VideoHoverOverlay = () => (
    <div className="absolute inset-0 bg-[#171a24]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[18px]">
        <div className="bg-white text-black rounded-full px-6 py-3 flex items-center gap-2 font-normal transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
    const ITEMS_PER_PAGE = 9;
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await fetch("/api/videos");
            const data = await res.json();
            setVideos(data.videos || []);
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setLoading(false);
        }
    };

    const featuredVideo = videos.find(v => v.featured);
    const regularVideos = videos.filter(v => !v.featured);
    const totalPages = Math.max(1, Math.ceil(regularVideos.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedVideos = regularVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col w-full bg-white relative font-sans">
                <Navbar />
                <main className="flex-1 w-full flex items-center justify-center">
                    <p className="text-gray-500">Loading videos...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full bg-white relative font-sans">
            <Navbar />

            <main className="flex-1 w-full pt-[64px] md:pt-[80px] pb-28">

                {/* 1. FEATURED EPISODE SECTION */}
                {featuredVideo && (
                    <section className="w-full max-w-[1240px] mx-auto px-4 md:px-8 mb-10 md:mb-16">
                        <h1 className="text-center text-[14px] lg:text-[15px] text-[#555] mb-6 md:mb-10 ">
                            FEATURED EPISODE
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                            {/* Featured Image */}
                            <a href={`/videos/${featuredVideo._id}`} className="group relative block w-full aspect-[16/10] md:aspect-[3/2] rounded-[18px] overflow-hidden bg-gray-100 lg:max-w-[520px] lg:justify-self-end">
                                <ThumbnailImage
                                    src={featuredVideo.imageUrl}
                                    alt={featuredVideo.title}
                                    priority
                                />
                                <VideoHoverOverlay />
                            </a>

                            {/* Featured Details */}
                            <div className="flex flex-col justify-center lg:pt-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className=" text-[11px] text-[#555] ">
                                        {sentenceCase(featuredVideo.tag)}
                                    </span>
                                    <span className="text-[#8a8fa8] font-light text-[13px]">
                                        {featuredVideo.date}
                                    </span>
                                </div>

                                <a href={`/videos/${featuredVideo._id}`} className="group/title block">
                                    <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-light leading-[1.1] tracking-[-0.02em] mb-6 text-[#111] group-hover/title:opacity-70 transition-opacity">
                                        {featuredVideo.title}
                                    </h2>
                                </a>

                                <div className="flex items-center justify-between mt-1">
                                    <a href={`/videos/${featuredVideo._id}`} className=" text-[11px] text-[#555] flex items-center gap-2 hover:text-[#111] transition-colors">
                                        View Episode <ArrowRight size={16} />
                                    </a>
                                    <SocialIcons />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

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
                        {paginatedVideos.map((ep) => (
                            <div key={ep._id} className="flex flex-col w-full">
                                {/* Thumbnail */}
                                <a href={`/videos/${ep._id}`} className="group relative block w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-gray-100 mb-4 isolate">
                                    <ThumbnailImage
                                        src={ep.imageUrl}
                                        alt={ep.title}
                                    />
                                    <VideoHoverOverlay />
                                </a>

                                {/* Meta details */}
                                <div className="flex items-center justify-between mb-4 w-full">
                                    <div className="flex items-center gap-3">
                                        <span className=" text-[11px] text-[#555] ">
                                            {sentenceCase(ep.tag)}
                                        </span>
                                        <span className="text-[#8a8fa8] font-light text-[12px] md:text-[13px]">
                                            {ep.date}
                                        </span>
                                    </div>
                                    <SocialIcons />
                                </div>

                                {/* Title */}
                                <a href={`/videos/${ep._id}`} className="group/title block">
                                    <h3 className="text-[17px] md:text-[18px] lg:text-[20px] text-[#111] font-normal leading-[1.3] tracking-[-0.01em] group-hover/title:opacity-70 transition-opacity line-clamp-4">
                                        {ep.title}
                                    </h3>
                                </a>
                            </div>
                        ))}
                    </div>

                    {regularVideos.length === 0 && !featuredVideo && (
                        <div className="text-center py-20 text-gray-500">
                            No videos available yet.
                        </div>
                    )}

                    {regularVideos.length > 0 && (
                        <div className="flex items-center justify-center gap-3 mt-10">
                            <button
                                type="button"
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>

            </main>

            <Footer />
        </div>
    );
}

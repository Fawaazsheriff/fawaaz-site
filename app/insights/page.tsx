import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const insightItems = [
    {
        id: 1,
        date: "12.09.2025",
        title: "BofA's Let's Talk Alts: Investing in Artificial Intelligence",
        featuring: "Featuring Fawaz's Philippe Laffont",
        linkText: "Visit ml.com",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        slug: "venture-capital-restarts",
    },
    {
        id: 2,
        date: "12.07.2025",
        title: "HBS Investment Conference",
        featuring: "Featuring Fawaz's Michael Barton Jr.",
        linkText: "Learn more",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        slug: "ai-native-companies-compounding-growth",
    },
    {
        id: 3,
        date: "11.24.2025",
        title: "Why We're Doubling Down on Revolut",
        featuring: "Brendan O'Boyle, Rohan Bharvani, Lucas Swisher",
        linkText: "Learn more",
        imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop",
        slug: "public-market-signals-2026",
    },
];

export default function InsightsPage() {
    return (
        <div className="min-h-screen flex flex-col w-full bg-[#f9f9f9] relative">
            <Navbar />

            {/* HERO HEADING SECTION */}
            <section className="w-full flex items-center justify-center px-6 sm:px-10 py-12 md:py-16 bg-white">
                <div className="max-w-[860px] w-full text-center">
                    <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-[family-name:var(--font-serif)] font-medium leading-[1.4] text-[#222]">
                        Our insights interpret current market developments across the industries of the future, focusing on what matters for long-term outcomes rather than short-term reactions.
                    </h1>
                </div>
            </section>

            {/* INSIGHTS SECTION */}
            <section className="w-full bg-white">
                <div className="w-full max-w-[1180px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-16">

                    {/* Section Label */}
                    <h2 className="text-[28px] md:text-[34px] font-[family-name:var(--font-serif)] font-light text-[#0F172A] tracking-tight mb-0 pb-3 border-b border-[#1f2937]">
                        Insights
                    </h2>

                    {/* Insight Rows */}
                    <div className="flex flex-col divide-y divide-[#1f2937]">
                        {insightItems.map((item) => (
                            <Link
                                key={item.id}
                                href={`/insights/${item.slug}`}
                                className="group flex flex-col sm:flex-row gap-6 lg:gap-10 py-8 md:py-10"
                            >
                                {/* Left: Image */}
                                <div className="w-full sm:w-[240px] md:w-[260px] shrink-0 aspect-[4/3] overflow-hidden bg-gray-200">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Right: Meta */}
                                <div className="flex flex-col justify-between flex-1 py-0 sm:py-1 sm:pl-6 border-t sm:border-t-0 border-[#1f2937]">
                                    <div>
                                        {/* Date */}
                                        <p className="text-[12px] text-[#1f2937] font-mono tracking-[0.18em] mb-2">{item.date}</p>

                                        {/* Title */}
                                        <h3 className="text-[18px] md:text-[20px] font-medium leading-[1.35] text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors mb-3 tracking-[-0.01em]">
                                            {item.title}
                                        </h3>

                                        {/* Bullet info */}
                                        <p className="flex items-start gap-2 text-[13px] text-[#0F172A] leading-[1.5]">
                                            <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#0F172A] shrink-0 inline-block" />
                                            {item.featuring}
                                        </p>
                                    </div>

                                    {/* Arrow link */}
                                    <div className="mt-6 flex items-center gap-3 text-[13px] font-mono text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                                        <div className="relative w-[40px] h-[1px] bg-[#0F172A] group-hover:bg-[#1E3A8A] transition-colors">
                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-[#0F172A] group-hover:border-[#1E3A8A] rotate-45 transform translate-x-[1px]" />
                                        </div>
                                        {item.linkText}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="flex justify-center pt-10">
                        <button
                            type="button"
                            className="text-[12px] sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-white bg-[#0F172A] px-7 py-3 hover:bg-[#111827] transition-colors"
                        >
                            Load More
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

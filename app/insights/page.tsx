import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";

const ITEMS_PER_PAGE = 6;

export default async function InsightsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const parsedPage = Number(params.page || "1");
    const currentPage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    await connectDB();
    const totalItems = await Insight.countDocuments();
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);

    const insightsData = await Insight.find()
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .lean();
    const insights = JSON.parse(JSON.stringify(insightsData));

    return (
        <div className="min-h-screen flex flex-col w-full bg-[#f9f9f9] relative">
            <Navbar />

            {/* HERO HEADING SECTION */}
            <section className="w-full flex items-center justify-center px-6 sm:px-10 py-12 md:py-16 bg-white">
                <div className="max-w-[860px] w-full text-center">
                    <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-[family-name:var(--font-serif)] font-normal leading-[1.4] text-[#222]">
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
                        {insights.map((item: any) => (
                            <Link
                                key={item._id}
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
                                        <p className="text-[12px] text-[#1f2937] mb-2">{item.publishDate}</p>

                                        {/* Title */}
                                        <h3 className="text-[18px] md:text-[20px] font-normal leading-[1.35] text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors mb-3 tracking-[-0.01em]">
                                            {item.title}
                                        </h3>

                                        {/* Bullet info */}
                                        <p className="flex items-start gap-2 text-[13px] text-[#0F172A] leading-[1.5]">
                                            <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#0F172A] shrink-0 inline-block" />
                                            {item.authors.map((a: any) => a.name).join(", ")}
                                        </p>
                                    </div>

                                    {/* Arrow link */}
                                    <div className="mt-6 flex items-center gap-3 text-[13px] text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">
                                        <div className="relative w-[40px] h-[1px] bg-[#0F172A] group-hover:bg-[#1E3A8A] transition-colors">
                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border-r border-t border-[#0F172A] group-hover:border-[#1E3A8A] rotate-45 transform translate-x-[1px]" />
                                        </div>
                                        Learn more
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {insights.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                No insights yet. Add insights from admin dashboard.
                            </div>
                        )}
                    </div>

                    {totalItems > 0 && (
                        <div className="flex justify-center items-center gap-3 pt-10">
                            <Link
                                href={`/insights?page=${Math.max(1, safePage - 1)}`}
                                aria-disabled={safePage === 1}
                                className={`text-[12px] sm:text-[13px] font-normal px-5 py-3 border border-[#0F172A] transition-colors ${
 safePage === 1
 ? "pointer-events-none opacity-40"
                                        : "hover:bg-[#0F172A] hover:text-white"
                                }`}
                            >
                                Previous
                            </Link>
                            <span className="text-[12px] sm:text-[13px] text-[#0F172A]">
                                Page {safePage} of {totalPages}
                            </span>
                            <Link
                                href={`/insights?page=${Math.min(totalPages, safePage + 1)}`}
                                aria-disabled={safePage === totalPages}
                                className={`text-[12px] sm:text-[13px] font-normal px-5 py-3 border border-[#0F172A] transition-colors ${
 safePage === totalPages
 ? "pointer-events-none opacity-40"
                                        : "hover:bg-[#0F172A] hover:text-white"
                                }`}
                            >
                                Next
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

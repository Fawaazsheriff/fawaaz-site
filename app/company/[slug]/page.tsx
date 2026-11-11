import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Link2, Linkedin, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { connectDB } from "@/lib/mongodb";
import Company from "@/lib/models/Company";
import { sentenceCase } from "@/lib/format";

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    await connectDB();
    const companyData = await Company.findOne({ slug }).lean();
    
    if (!companyData) notFound();
    
    const company = JSON.parse(JSON.stringify(companyData));

    return (
        <div className="min-h-screen flex flex-col w-full bg-white font-aspekta">
            <Navbar />

            <main className="flex-1 w-full">

                {/* BACK BUTTON */}
                <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-0">
                    <Link
                        href="/company"
                        className="inline-flex items-center gap-2 text-[13px] text-[#555] hover:text-[#3847FF] transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Back to Companies
                    </Link>
                </div>

                {/* HERO SECTION — Title (left) + Image (right) */}
                <section className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 py-10 md:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        {/* Left: text */}
                        <div className="flex flex-col justify-center">
                            <span className="text-[11px] font-normal text-[#3847FF] mb-4">
                                {sentenceCase(company.tag)}
                            </span>
                            <h1 className="text-[32px] md:text-[42px] font-normal leading-[1.1] tracking-tight text-[#171a24] mb-5">
                                {company.title}
                            </h1>
                            <p className="text-[16px] text-[#555] leading-[1.6] font-light max-w-[90%]">
                                {company.subtitle}
                            </p>
                        </div>

                        {/* Right: image */}
                        <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-sm">
                            <img
                                src={company.imageUrl}
                                alt={company.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* DIVIDER */}
                <div className="w-full border-t border-gray-200" />

                {/* BODY SECTION — Sidebar (left) + Article body (right) */}
                <section className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">

                        {/* LEFT SIDEBAR */}
                        <aside className="flex flex-col gap-8 lg:sticky lg:top-24">

                            {/* Share icons */}
                            <div>
                                <p className="text-[12px] font-normal text-[#111] mb-4">Share</p>
                                <div className="flex items-center gap-4">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors" title="Copy link">
                                        <Link2 className="w-3.5 h-3.5 text-[#555]" />
                                    </button>
                                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors" title="Share on X">
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#555]">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.257 5.626 5.907-5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors" title="Share on LinkedIn">
                                        <Linkedin className="w-3.5 h-3.5 text-[#555]" />
                                    </a>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gray-200" />

                            {/* Company Links */}
                            <div>
                                {company.websiteUrl ? (
                                    <a 
                                        href={company.websiteUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[14px] font-normal text-[#111] hover:text-[#3847FF] transition-colors"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Visit website
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-[14px] text-gray-400">
                                        <Globe className="w-4 h-4" />
                                        No website
                                    </span>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gray-200" />

                            {/* Connect */}
                            {company.partneringSince && (
                                <div>
                                    <p className="text-[14px] font-normal text-[#111] mb-3">Partnering since</p>
                                    <p className="text-[14px] text-[#555]">{company.partneringSince}</p>
                                </div>
                            )}
                        </aside>

                        {/* COMPANY BODY */}
                        <article className="flex flex-col gap-6">
                            <h2 className="text-[24px] font-normal tracking-tight text-[#171a24] mb-2">
                                About {company.title}
                            </h2>
                            {company.body.map((paragraph: string, idx: number) => (
                                <p key={idx} className="text-[16px] text-[#333] leading-[1.8] font-light">
                                    {paragraph}
                                </p>
                            ))}
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

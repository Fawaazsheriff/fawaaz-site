import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Link2, Linkedin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    await connectDB();
    const insightData = await Insight.findOne({ slug }).lean();
    
    if (!insightData) notFound();
    
    const article = JSON.parse(JSON.stringify(insightData));

    return (
        <div className="min-h-screen flex flex-col w-full bg-white">
            <Navbar />

            <main className="flex-1 w-full">

                {/* BACK BUTTON */}
                <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-0">
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 text-[13px] text-[#555] hover:text-black transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>
                </div>

                {/* HERO SECTION — Title (left) + Image (right) */}
                <section className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 py-10 md:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        {/* Left: text */}
                        <div className="flex flex-col justify-center">
                            <span className="text-[11px] font-bold tracking-[0.15em] text-[#3847FF] uppercase mb-4">
                                {article.tag}
                            </span>
                            <h1 className="text-[28px] md:text-[36px] font-light leading-[1.25] tracking-tight text-[#111] mb-5">
                                {article.title}
                            </h1>
                            <p className="text-[16px] text-[#555] leading-[1.7] font-light">
                                {article.subtitle}
                            </p>
                        </div>

                        {/* Right: image */}
                        <div className="w-full aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
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

                            {/* Authors */}
                            <div className="flex flex-col gap-6">
                                {article.authors.map((author: any) => (
                                    <div key={author.name} className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <img
                                                src={author.avatar}
                                                alt={author.name}
                                                className="w-10 h-10 rounded-full object-cover bg-gray-200"
                                            />
                                            <div>
                                                <p className="text-[14px] font-medium text-[#111] leading-tight">{author.name}</p>
                                                <p className="text-[12px] text-[#777] mt-[2px]">{author.role}</p>
                                            </div>
                                        </div>
                                        {/* LinkedIn */}
                                        <a href="#" className="ml-[52px] w-5 h-5 text-[#0077B5] hover:opacity-70 transition-opacity">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gray-200" />

                            {/* Share icons */}
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

                            {/* Divider */}
                            <div className="w-full h-px bg-gray-200" />

                            {/* Newsletter signup */}
                            <div>
                                <p className="text-[14px] font-semibold text-[#111] mb-3">Stay ahead with Fawaaz</p>
                                <form className="flex items-center gap-0 border border-gray-300 rounded-none overflow-hidden hover:border-gray-500 transition-colors">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 text-[13px] px-3 py-2.5 outline-none bg-white text-[#111] placeholder:text-[#aaa]"
                                    />
                                    <button className="shrink-0 bg-[#3847FF] text-white px-3 py-2.5 hover:bg-[#2a36cc] transition-colors">
                                        <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                                    </button>
                                </form>
                                <p className="text-[10px] text-[#999] mt-2 leading-[1.5]">
                                    By subscribing, you agree to receive emails from Fawaaz Sheriff.
                                </p>
                            </div>
                        </aside>

                        {/* ARTICLE BODY */}
                        <article className="flex flex-col gap-5">
                            {article.body.map((paragraph: string, idx: number) => (
                                <p key={idx} className="text-[16px] text-[#333] leading-[1.85] font-light">
                                    {paragraph}
                                </p>
                            ))}

                            {/* Embedded YouTube video */}
                            {article.youtubeId && (
                                <div className="w-full mt-4">
                                    <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${article.youtubeId}`}
                                            title="Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Published date */}
                            <p className="text-[13px] text-[#888] mt-4 font-light">
                                Published: {article.publishDate}
                            </p>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

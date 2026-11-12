import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Link2, Linkedin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { connectDB } from "@/lib/mongodb";
import Video from "@/lib/models/Video";
import { sentenceCase } from "@/lib/format";

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connectDB();
  const video = await Video.findById(id).lean();
  
  if (!video) notFound();

  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <Navbar />

      <main className="flex-1 w-full">
        {/* BACK BUTTON */}
        <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-0">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-[13px] text-[#555] hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Videos
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 py-10 md:py-14">
          <div className="flex flex-col gap-6">
            {/* Meta */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-normal text-[#3847FF] ">
                {sentenceCase(video.tag)}
              </span>
              <span className="text-[#8a8fa8] font-light text-[13px]">
                {video.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-light leading-[1.15] tracking-tight text-[#111]">
              {video.title}
            </h1>

            {/* Description */}
            {video.description && (
              <p className="text-[16px] text-[#555] leading-[1.7] font-light max-w-[800px]">
                {video.description}
              </p>
            )}
          </div>
        </section>

        {/* VIDEO PLAYER */}
        {video.youtubeId && (
          <section className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 pb-12">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </section>
        )}

        {/* DIVIDER */}
        <div className="w-full border-t border-gray-200" />

        {/* SHARE SECTION */}
        <section className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 py-12">
          <div className="flex flex-col gap-6">
            <h3 className="text-[14px] font-normal text-[#111] ">
              Share this video
            </h3>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors" title="Copy link">
                <Link2 className="w-4 h-4 text-[#555]" />
              </button>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors" title="Share on X">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#555]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.257 5.626 5.907-5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 transition-colors" title="Share on LinkedIn">
                <Linkedin className="w-4 h-4 text-[#555]" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

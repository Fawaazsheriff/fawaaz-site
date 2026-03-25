import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AreasOfFocus } from "@/components/sections/AreasOfFocus";
import { Insights } from "@/components/sections/Insights";
// import { Portfolio } from "@/components/sections/Portfolio";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-[#f9f9f9] relative">
      <div className="flex-1 flex flex-col w-full relative bg-white">
        <Navbar />

        <main className="flex-1 w-full relative">
          {/* HERO SECTION — Fully immersive video intro matching together.fund */}
          <section className="relative w-full h-auto min-h-[calc(100vh-72px)] flex flex-col justify-start pt-[15vh] px-6 md:px-12 lg:px-24 border-b border-grid bg-[#fdfbf9] overflow-hidden">
            
            {/* Background Video - No overlays for full clarity */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/into-page.png"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/into-page-vid-mp4.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Content Container (Left-aligned) */}
            <div className="relative z-10 w-full max-w-[1200px] mr-auto flex flex-col gap-[15vh] pb-24">
              
              {/* TOP BLOCK: Hero Line & Subline */}
              <div className="flex flex-col max-w-[800px]">
                {/* Hero Line */}
                <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-normal leading-[1.05] tracking-tight text-[#171a24] mb-6" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  Investing in the <br className="hidden md:block"/> Businesses and <br className="hidden lg:block"/> Industries Defining <br className="hidden md:block"/> the <i className="text-[#e7534b] font-serif pr-2">Next Decade</i>
                </h1>
                
                {/* Subline */}
                <p className="text-[16px] md:text-[20px] font-normal text-[#444] leading-[1.6] max-w-[500px]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  Deep dives into the companies of the future, focusing on what matters most.
                </p>
              </div>

              {/* BOTTOM BLOCK: About Us */}
              <div className="w-full max-w-[900px]">
                 <p className="text-[18px] md:text-[22px] lg:text-[26px] leading-[1.4] font-normal text-[#e7534b] tracking-tight" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                   About us — We focus exclusively on long-term investing in the industries of the future. Our work combines industry research, deep company analysis, and conversations with founders building enduring businesses, supported by ongoing insights and in-depth company research, all grounded in fundamentals and long-term conviction.
                 </p>
              </div>

            </div>
          </section>

          {/* <Portfolio /> */}
          <AreasOfFocus />
          <Insights />
        </main>
      </div>

      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AreasOfFocus } from "@/components/sections/AreasOfFocus";
import { Insights } from "@/components/sections/Insights";
import { Hero } from "@/components/sections/Hero";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-[#f9f9f9] relative">
      {/* Admin Login Button - Fixed Position */}
      <Link
        href="/admin/login"
        className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors shadow-lg"
      >
        Admin
      </Link>

      <div className="flex-1 flex flex-col w-full relative bg-[#fdfbf9]">
        <Navbar />

        <main className="flex-1 w-full relative">
          
          {/* Animated Mountain Hero */}
          <Hero />

          {/* Overlapping Content Area that slides over the mountain image */}
          <div className="relative z-10 w-full bg-[#f4f6f8] rounded-t-[40px] shadow-2xl -mt-[40px] pt-[40px] overflow-hidden">
            
            {/* About Us Section structured as a white card */}
            <section className="w-full px-6 md:px-12 lg:px-24 py-12 md:py-20 border-b border-[#e8ecef]">
              <div className="max-w-[1200px] mx-auto bg-white rounded-[32px] p-10 md:p-16 lg:p-20 shadow-sm flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                <div className="w-full md:w-5/12 shrink-0">
                  <h2 
                    className="text-[32px] md:text-[40px] font-semibold text-[#111] leading-[1.1] tracking-tight"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    About Us
                  </h2>
                </div>
                <div className="w-full md:w-7/12 pt-2">
                  <p 
                    className="text-[17px] md:text-[19px] leading-[1.6] font-normal text-[#444]" 
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    We focus exclusively on long-term investing in the industries of the future. Our work combines industry research, deep company analysis, and conversations with founders building enduring businesses, supported by ongoing insights and in-depth company research, all grounded in fundamentals and long-term conviction.
                  </p>
                </div>
              </div>
            </section>

            <AreasOfFocus />
            <Insights />
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

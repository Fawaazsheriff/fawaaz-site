import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AreasOfFocus } from "@/components/sections/AreasOfFocus";
import { InsightsList } from "@/components/sections/InsightsList";
import { Hero } from "@/components/sections/Hero";
import { WhoIAm } from "@/components/sections/WhoIAm";

// Refresh the homepage every minute so new insights from the admin panel appear without a redeploy.
export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-[#f9f9f9] relative">
      <div className="flex-1 flex flex-col w-full relative bg-[#fdfbf9]">
        <Navbar />

        <main className="flex-1 w-full relative">
          {/* Graphite-study hero */}
          <Hero />

          {/* Content sheet that slides up over the hero */}
          <div className="relative z-10 w-full bg-[#f4f6f8] rounded-t-[40px] shadow-2xl -mt-[40px] pt-[40px] overflow-hidden">
            <WhoIAm />
            <AreasOfFocus />
            <InsightsList />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

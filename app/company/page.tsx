import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function CompanyPage() {
    return (
        <div className="min-h-screen flex flex-col w-full bg-[#fcfbfa] relative font-aspekta">
            <Navbar />

            <main className="flex-1 w-full pt-[120px] md:pt-[160px] pb-32">
                {/* HERO SECTION - EXACT MATCH */}
                <section className="w-full flex flex-col items-center text-center px-6 mb-16 md:mb-24">
                    <div className="max-w-[1000px] flex flex-col items-center">
                        <h1 className="text-[42px] md:text-[64px] font-normal text-[#1a1a1a] tracking-[0.1em] md:tracking-[0.15em] leading-[1.1] mb-6 uppercase" style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 300 }}>
                            OUR COMPANIES
                        </h1>
                        <p className="text-[20px] md:text-[24px] font-light text-[#555] leading-[1.4] max-w-[600px]">
                            Deep dives into the companies of the future, focusing on what matters most.
                        </p>
                    </div>
                </section>

                {/* CONTAINED GRID LAYOUT (FILTER + CARDS) */}
                <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">

                

                    {/* The main Grid of Cards, completely bordered off */}
                    <div className="w-full border border-[#ebe7e0] p-[12px] md:p-[16px] lg:p-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] xl:gap-[20px] w-full">

                            {/* Card 1: Klarna */}
                            <Link href="/company/klarna" className="group block w-full aspect-[4/3] lg:aspect-square relative overflow-hidden bg-[#ff4a9e] transform-gpu hover:shadow-xl transition-all duration-500">
                                <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 ease-out group-hover:scale-105">
                                    <svg viewBox="0 0 200 150" className="w-[50%] h-auto stroke-[#008f51] stroke-[2.5] fill-none" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                        <path d="M20 110L30 50L80 60L80 120Z" />
                                        <path d="M85 60L160 50L150 110L85 120Z" />
                                        <path d="M100 70C90 70 85 80 90 90C95 100 110 80 105 100C100 110 90 100 90 100" />
                                        <line x1="98" y1="65" x2="98" y2="105" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-black flex flex-col justify-end">
                                    <h3 className="text-[36px] md:text-[46px] font-normal tracking-tight mb-2 leading-[1.1]">Klarna</h3>
                                    <p className="text-[16px] md:text-[17px] font-normal leading-[1.4] max-w-[85%] text-black/90">
                                        Klarna is a payment solution simplifying the purchasing process.
                                    </p>
                                </div>
                            </Link>

                            {/* Card 2: NVIDIA */}
                            <Link href="/company/nvidia" className="group block w-full aspect-[4/3] lg:aspect-square relative overflow-hidden bg-[#050505] transform-gpu hover:shadow-xl transition-all duration-500">
                                <div className="absolute inset-x-0 top-[5%] bottom-[30%] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                                    <svg viewBox="0 0 200 250" className="h-full w-auto stroke-[#00c56f] stroke-[1.5] fill-none" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                        <rect x="50" y="20" width="100" height="210" rx="12" />
                                        <line x1="50" y1="40" x2="150" y2="40" />
                                        <line x1="50" y1="180" x2="150" y2="180" />
                                        <circle cx="100" cy="205" r="8" />
                                        <path d="M110 100C130 90 150 110 170 110C180 110 185 120 180 130C160 140 140 130 130 150" />
                                        <path d="M120 110C140 100 160 120 170 130" />
                                        <path d="M90 110C110 120 130 140 140 160" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-white flex flex-col justify-end">
                                    <h3 className="text-[36px] md:text-[46px] font-normal tracking-tight mb-2 leading-[1.1]">NVIDIA</h3>
                                    <p className="text-[16px] md:text-[17px] font-normal leading-[1.4] text-white/90 max-w-[85%]">
                                        NVIDIA is a pioneer in the art and science of visual computing.
                                    </p>
                                </div>
                            </Link>

                            {/* Card 3: Reddit */}
                            <Link href="/company/reddit" className="group block w-full aspect-[4/3] lg:aspect-square relative overflow-hidden bg-[#ff3300] transform-gpu hover:shadow-xl transition-all duration-500">
                                <div className="absolute inset-0 flex items-center justify-center pb-[15%] transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                                    <span className="text-white text-[140px] md:text-[220px] font-bold tracking-tighter leading-none select-none" style={{ fontFamily: 'Georgia, serif' }}>r/</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-black flex flex-col justify-end">
                                    <h3 className="text-[36px] md:text-[46px] font-normal tracking-tight mb-2 leading-[1.1]">reddit</h3>
                                    <p className="text-[16px] md:text-[17px] font-normal leading-[1.4] max-w-[85%] text-black/90">
                                        Reddit is the internet's leading source of interest-based content.
                                    </p>
                                </div>
                            </Link>

                            {/* Card 4: Apple */}
                            <Link href="/company/apple" className="group block w-full aspect-[4/3] lg:aspect-square relative overflow-hidden bg-[#e0e0e0] transform-gpu hover:shadow-xl transition-all duration-500">
                                <div className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.15] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%), url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}>
                                    <svg viewBox="0 0 200 200" className="absolute right-[5%] bottom-[25%] w-[40%] h-auto stroke-white stroke-[1.5] fill-none opacity-90 mix-blend-overlay" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                        <rect x="20" y="20" width="160" height="160" rx="4" />
                                        <rect x="30" y="30" width="140" height="100" />
                                        <line x1="80" y1="160" x2="120" y2="160" strokeWidth="3" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-white flex flex-col justify-end z-10">
                                    <h3 className="text-[36px] md:text-[46px] font-normal tracking-tight mb-2 leading-[1.1]">Apple</h3>
                                    <p className="text-[16px] md:text-[17px] font-normal leading-[1.4] text-white/90 max-w-[85%]">
                                        Apple transforms how humans interact with technologies with products like the iPhone, iPod, iPad, Mac and Watch.
                                    </p>
                                </div>
                            </Link>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

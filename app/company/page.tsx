import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Company from "@/lib/models/Company";

export default async function CompanyPage() {
    await connectDB();
    const companiesData = await Company.find().lean();
    const companies = JSON.parse(JSON.stringify(companiesData));

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

                            {companies.map((company: any, idx: number) => {
                                const bgColors = ["#ff4a9e", "#050505", "#ff3300", "#e0e0e0"];
                                const textColors = ["text-black", "text-white", "text-black", "text-white"];
                                
                                return (
                                    <Link 
                                        key={company._id} 
                                        href={`/company/${company.slug}`} 
                                        className="group block w-full aspect-[4/3] lg:aspect-square relative overflow-hidden transform-gpu hover:shadow-xl transition-all duration-500"
                                        style={{ backgroundColor: bgColors[idx % bgColors.length] }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center p-12">
                                            <img
                                                src={company.imageUrl}
                                                alt={company.title}
                                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                                            />
                                        </div>
                                        <div className={`absolute bottom-0 left-0 w-full p-8 md:p-10 ${textColors[idx % textColors.length]} flex flex-col justify-end`}>
                                            <h3 className="text-[36px] md:text-[46px] font-normal tracking-tight mb-2 leading-[1.1]">
                                                {company.title}
                                            </h3>
                                            <p className="text-[16px] md:text-[17px] font-normal leading-[1.4] max-w-[85%] opacity-90">
                                                {company.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}

                            {companies.length === 0 && (
                                <div className="col-span-full text-center py-20 text-gray-500">
                                    No companies yet. Add companies from admin dashboard.
                                </div>
                            )}

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";
import SiteSettings from "@/lib/models/SiteSettings";

const FALLBACK_CARD_IMAGE =
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=500";
const FALLBACK_HEADSHOT =
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150";

type InsightAuthor = {
    name: string;
    avatar: string;
};

type InsightItem = {
    _id?: string;
    slug: string;
    title: string;
    subtitle?: string;
    publishDate?: string;
    imageUrl?: string;
    authors?: InsightAuthor[];
};

// Exact SVG arrow from the original Coatue website
const ArrowSVG = () => (
    <svg
        className="relative top-[1px] mr-[18px] h-auto w-[46px] shrink-0 transition-transform duration-200 ease-in-out group-hover:translate-x-[4px]"
        width="48"
        height="13"
        viewBox="0 0 48 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M0 6.5H47M47 6.5L41.5 1M47 6.5L41.5 12" stroke="currentColor" />
    </svg>
);

export async function Insights() {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: "main" }).lean();
    const configuredSlugsRaw = Array.isArray(settings?.homeInsightSlugs)
        ? settings.homeInsightSlugs
        : [];

    const cleanedSlugs: string[] = configuredSlugsRaw
        .filter((slug: unknown): slug is string => typeof slug === "string")
        .map((slug: string) => slug.trim())
        .filter(Boolean);

    const uniqueConfiguredSlugs: string[] = Array.from(new Set<string>(cleanedSlugs)).slice(0, 4);

    let orderedConfiguredInsights: any[] = [];
    if (uniqueConfiguredSlugs.length > 0) {
        const configuredInsights = await Insight.find({ slug: { $in: uniqueConfiguredSlugs } }).lean();
        const configuredBySlug = new Map(
            configuredInsights.map((item: any) => [item.slug, item])
        );
        orderedConfiguredInsights = uniqueConfiguredSlugs
            .map((slug: string) => configuredBySlug.get(slug))
            .filter(Boolean);
    }

    const remainingSlots = Math.max(0, 4 - orderedConfiguredInsights.length);
    const fallbackInsights =
        remainingSlots > 0
            ? await Insight.find({
                  slug: {
                      $nin: orderedConfiguredInsights.map((item: any) => item.slug),
                  },
              })
                  .sort({ createdAt: -1 })
                  .limit(remainingSlots)
                  .lean()
            : [];

    const insightsData = [...orderedConfiguredInsights, ...fallbackInsights];
    const insights: InsightItem[] = JSON.parse(JSON.stringify(insightsData));
    const normalizedInsights: InsightItem[] = insights.map((item: InsightItem) => ({
        ...item,
        imageUrl: item.imageUrl || FALLBACK_CARD_IMAGE,
        authors: item.authors || [],
    }));

    const featuredInsight = normalizedInsights[0];
    const insightsList = normalizedInsights.slice(1, 4);

    if (!featuredInsight) {
        return null;
    }

    const featuredHeadshots = (featuredInsight.authors || [])
        .map((author: InsightAuthor) => author.avatar)
        .filter(Boolean)
        .slice(0, 3);
    while (featuredHeadshots.length < 3) {
        featuredHeadshots.push(FALLBACK_HEADSHOT);
    }

    const featuredBottomText = featuredInsight.subtitle || "Read insight";

    return (
        <section className="w-full relative flex flex-col lg:flex-row bg-white overflow-hidden border-t border-[#efefef]">

            {/* ─── LEFT: Dark Featured Panel Container ─── */}
            <div className="w-full lg:w-1/2 shrink-0 bg-white flex items-center justify-center p-8 lg:p-[40px] border-r border-[#efefef]">
                <div className="w-full max-w-[560px] aspect-square bg-[#171a24] text-white flex flex-col justify-between">
                    {/* Top content */}
                    <div className="p-8 lg:p-[48px]">
                        <p className="text-[#8a8fa8] text-[18px] lg:text-[20px] font-normal tracking-wide mb-[16px]">
                            {featuredInsight.publishDate}
                        </p>
                        <h2 className="text-[38px] lg:text-[52px] leading-[1.05] font-light tracking-[-0.03em] whitespace-pre-line mb-[48px]">
                            {featuredInsight.title}
                        </h2>

                        {/* Headshots row */}
                        <div className="flex flex-wrap gap-[16px]">
                            {featuredHeadshots.map((src: string, idx: number) => (
                                <div key={idx} className="w-[70px] h-[80px] lg:w-[100px] lg:h-[110px] rounded-[8px] overflow-hidden bg-gray-800 shadow-sm">
                                    <img src={src} alt="Presenter" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom link */}
                    <div className="px-8 lg:px-[48px] pb-8 lg:pb-[48px]">
                        <Link
                            href={`/insights/${featuredInsight.slug}`}
                            className="text-[17px] lg:text-[19px] font-bold tracking-[0.02em] hover:text-[#c0c0c0] transition-colors"
                        >
                            {featuredBottomText}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT: Insight List ─── */}
            {/*
                On lg: the section row height is set by the left panel (aspect-square card).
                The ul fills that full height (h-full via stretch), each li gets flex-1
                so all 3 items share the height equally. py-0 at lg removes padding bloat.
            */}
            <ul className="flex flex-col flex-1 w-full lg:w-1/2 bg-white">
                {insightsList.map((item: InsightItem, idx: number) => (
                    <li
                        key={item._id || idx}
                        className={[
                            // spacing & border
                            "relative flex-1",
                            "border-t border-[#e0e0e0]",
                            idx === insightsList.length - 1 ? "border-b border-[#e0e0e0]" : "",
                            // padding: generous on mobile/tablet, NONE on lg (height is fixed by flex-1)
                            "pt-[32px] pb-[40px] md:py-[24px] lg:py-0",
                            "px-6 lg:px-[48px]",
                            // center content vertically at lg
                            "flex items-center",
                        ].join(" ")}
                    >
                        <Link
                            href={`/insights/${item.slug}`}
                            className="no-underline group w-full"
                            title={item.title}
                        >
                            {/* 10-col grid: image 5 cols, content 5 cols — only at md+ */}
                            <article className="md:grid md:grid-cols-10 md:gap-x-[16px]">

                                {/* ── Thumbnail — 4 of 10 cols (smaller) ── */}
                                <div className="
                                    relative overflow-hidden bg-[#e8e8e8]
                                    aspect-[334/206]
                                    md:col-span-4 md:mr-[10px] md:aspect-[318/192]
                                ">
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>

                                {/* ── Content — 6 of 10 cols, arrow pushed to bottom ── */}
                                <div className="
                                    mt-[20px]
                                    md:col-span-6 md:col-start-5 md:ml-[10px] md:mt-0 md:flex
                                ">
                                    <div className="flex w-full flex-col justify-between gap-[8px] md:max-w-[538px]">

                                        {/* Top group: title + author */}
                                        <div className="flex flex-col gap-[8px]">
                                            {/* Title — underlines on hover with medium speed */}
                                            <h3 className="
                                                text-[18px] leading-[1.3]
                                                md:text-[20px] md:leading-[1.2]
                                                lg:text-[15px] xl:text-[18px]
                                                font-normal text-[#111]
                                                underline-offset-[3px] decoration-[#111] decoration-[1.5px]
                                                transition-all duration-300
                                                group-hover:underline
                                            ">
                                                {item.title}
                                            </h3>

                                            {/* Author */}
                                            {item.authors && (
                                                <address className="
                                                    not-italic
                                                    text-[14px] leading-[1.2] lg:text-[12px] xl:text-[14px]
                                                    text-[#333]
                                                    before:relative before:-top-[1px] before:mr-[10px]
                                                    before:inline-block before:h-[7px] before:w-[7px]
                                                    before:rounded-full before:bg-[#111] before:align-middle
                                                    before:content-['']
                                                ">
                                                    {(item.authors || []).map((author: InsightAuthor) => author.name).join(", ")}
                                                </address>
                                            )}
                                        </div>

                                        {/* Arrow + link text — sits at the bottom via justify-between */}
                                        <div className="
                                            flex items-center font-mono
                                            text-[12px] lg:text-[10px] xl:text-[12px]
                                            text-[#111]
                                        ">
                                            <ArrowSVG />
                                            <span className="tracking-wide">Learn more</span>
                                        </div>

                                    </div>
                                </div>

                            </article>
                        </Link>
                    </li>
                ))}

                {insightsList.length === 0 && (
                    <li className="px-6 lg:px-[48px] py-10 text-gray-500 border-y border-[#e0e0e0]">
                        Add more insights from admin to populate this section.
                    </li>
                )}
            </ul>

        </section>
    );
}

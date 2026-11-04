import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";
import SiteSettings from "@/lib/models/SiteSettings";

const MAX_ITEMS = 6;

type InsightItem = {
  _id?: string;
  slug: string;
  tag?: string;
  title: string;
  publishDate?: string;
  imageUrl?: string;
  authors?: { name: string }[];
};

// "November 11, 2025" -> "11.11.2025"; leaves anything unparseable as written.
function formatDate(raw?: string) {
  if (!raw) return "";
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return raw;
  const d = new Date(t);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}.${d.getFullYear()}`;
}

const Arrow = () => (
  <svg
    className="relative top-[1px] mr-[18px] h-auto w-[46px] shrink-0 transition-transform duration-200 ease-in-out group-hover:translate-x-[4px]"
    width="48"
    height="13"
    viewBox="0 0 48 13"
    fill="none"
    aria-hidden="true"
  >
    <path d="M0 6.5H47M47 6.5L41.5 1M47 6.5L41.5 12" stroke="currentColor" />
  </svg>
);

async function getInsights(): Promise<InsightItem[]> {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: "main" }).lean<{ homeInsightSlugs?: unknown[] }>();
    const pinned = Array.from(
      new Set(
        (Array.isArray(settings?.homeInsightSlugs) ? settings!.homeInsightSlugs : [])
          .filter((s): s is string => typeof s === "string" && s.trim() !== "")
          .map((s) => s.trim())
      )
    ).slice(0, MAX_ITEMS);

    const pinnedDocs = pinned.length ? await Insight.find({ slug: { $in: pinned } }).lean<InsightItem[]>() : [];
    const bySlug = new Map(pinnedDocs.map((d) => [d.slug, d]));
    const ordered = pinned.map((s) => bySlug.get(s)).filter((d): d is InsightItem => Boolean(d));

    const rest = await Insight.find({ slug: { $nin: ordered.map((d) => d.slug) } })
      .sort({ createdAt: -1 })
      .limit(MAX_ITEMS - ordered.length)
      .lean();

    return JSON.parse(JSON.stringify([...ordered, ...rest]));
  } catch {
    return [];
  }
}

export async function InsightsList() {
  const items = await getInsights();

  return (
    <section id="insights" className="relative w-full bg-white scroll-mt-24">
      {/* Faint column guides, aligned to the content edges */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-[1200px] px-12">
          <div className="grid h-full grid-cols-4 border-r border-grid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-full border-l border-grid" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pt-20 md:pt-28 pb-20 md:pb-28">
        <h2 className="pb-6 text-[32px] md:text-[36px] font-normal tracking-[-0.02em] text-[#1C1D20]">Insights</h2>

        {items.length === 0 ? (
          <div className="border-t border-[#cfcfcf] py-14">
            <p className="max-w-[46ch] text-[18px] leading-[1.6] text-[#444]">
              New research is published here first. The first pieces are being written now.
            </p>
            <a
              href="https://www.linkedin.com/in/fawaazsheriff/"
              className="group mt-8 inline-flex items-center font-mono text-[13px] text-[#1C1D20]"
            >
              <Arrow />
              Follow along on LinkedIn
            </a>
          </div>
        ) : (
          <ul className="border-b border-[#cfcfcf]">
            {items.map((item) => {
              const byline = (item.authors || []).map((a) => a.name).filter(Boolean).join(", ") || item.tag;
              return (
                <li key={item._id || item.slug} className="border-t border-[#cfcfcf]">
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group block py-4 md:py-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
                  >
                    <article className="md:grid md:grid-cols-12 md:gap-x-6 md:min-h-[170px]">
                      <div className="md:col-span-4 lg:col-span-3 relative overflow-hidden aspect-[5/3] bg-[#eceeef]">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="insight-hatch h-full w-full flex items-end p-4">
                            <span className="font-mono text-[12px] text-[#3d3f45]">{item.tag}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 md:mt-0 md:col-start-7 md:col-span-6 flex flex-col justify-between gap-6 py-1">
                        <div className="flex flex-col gap-2">
                          {item.publishDate && (
                            <time className="font-mono text-[14px] md:text-[15px] text-[#1C1D20]">{formatDate(item.publishDate)}</time>
                          )}
                          <h3 className="text-[20px] md:text-[23px] leading-[1.25] font-normal text-[#1C1D20] decoration-[1.5px] underline-offset-[4px] group-hover:underline">
                            {item.title}
                          </h3>
                          {byline && (
                            <p className="flex items-center gap-[10px] text-[13px] md:text-[14px] text-[#333]">
                              <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full bg-[#1C1D20]" />
                              {byline}
                            </p>
                          )}
                        </div>
                        <span className="flex items-center font-mono text-[12px] md:text-[13px] text-[#1C1D20]">
                          <Arrow />
                          Learn more
                        </span>
                      </div>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/insights"
              className="bg-[#1C1D20] px-12 py-3 font-mono text-[13px] text-white transition-colors hover:bg-[#3847FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
            >
              Read more
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

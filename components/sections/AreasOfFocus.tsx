import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";

const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

type Area = {
  title: string;
  description: string;
  topics: string[];
  image: string;
  alt: string;
  tags: string[]; // insight tags that belong to this area
};

const AREAS: Area[] = [
  {
    title: "AI & Machine Learning",
    description: "Models, agents and the infrastructure underneath them, and where value settles as model costs keep falling.",
    topics: ["Enterprise agents", "AI infrastructure", "Applied AI"],
    image: img("photo-1677442136019-21780ecad995"),
    alt: "Abstract 3D render of the letters AI",
    tags: ["ARTIFICIAL INTELLIGENCE", "AI"],
  },
  {
    title: "Software & Internet",
    description: "Software built in India for the world, from vertical SaaS in overlooked industries to developer and infrastructure tools.",
    topics: ["Vertical SaaS", "Developer tools", "Global SaaS"],
    image: img("photo-1555066931-4365d14bab8c"),
    alt: "Code on a laptop screen",
    tags: ["SOFTWARE", "VERTICAL SAAS", "INFRASTRUCTURE SOFTWARE"],
  },
  {
    title: "Aerospace & Defence",
    description: "Space and defence companies moving from procurement programmes to products, and the capital that now backs them.",
    topics: ["Space tech", "Defence tech", "Drones"],
    image: img("photo-1457364887197-9150188c107b"),
    alt: "A rocket's trail across the dusk sky",
    tags: ["AEROSPACE & DEFENCE", "AEROSPACE", "DEFENCE TECH", "SPACE TECH"],
  },
  {
    title: "Financial Services & Fintech",
    description: "Lending, payments and wealth platforms, read through the regulation that shapes who can win.",
    topics: ["Lending & NBFCs", "Payments", "Capital markets"],
    image: img("photo-1559526324-4b87b5e36e44"),
    alt: "A laptop showing financial dashboards",
    tags: ["FINTECH", "CAPITAL MARKETS"],
  },
  {
    title: "Tech, Media & Telecom",
    description: "The networks, chips and platforms that every other technology business is built on.",
    topics: ["Semiconductors", "Connectivity", "Digital media"],
    image: img("photo-1544197150-b99a580bb7a8"),
    alt: "Network cables plugged into a switch",
    tags: ["SEMICONDUCTORS", "TMT", "MEDIA", "TELECOM"],
  },
  {
    title: "Energy & Climate Tech",
    description: "The build-out of clean power, storage and the software that runs a changing grid.",
    topics: ["Renewables", "Energy storage", "Grid software"],
    image: img("photo-1466611653911-95081537e5b7"),
    alt: "Wind turbines at sunset",
    tags: ["ENERGY", "CLIMATE", "ENERGY & CLIMATE TECH"],
  },
];

async function getTagCounts(): Promise<Record<string, number>> {
  try {
    await connectDB();
    const rows = await Insight.aggregate<{ _id: string; n: number }>([{ $group: { _id: "$tag", n: { $sum: 1 } } }]);
    return Object.fromEntries(rows.map((r) => [String(r._id).toUpperCase(), r.n]));
  } catch {
    return {};
  }
}

export async function AreasOfFocus() {
  const counts = await getTagCounts();

  return (
    <section id="areas" className="w-full px-4 md:px-8 pb-24 md:pb-32 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 border-t border-[#dfe3e7] pt-16 md:flex-row md:items-end md:justify-between md:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 text-[13px] text-[#5a5d63]">
              <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-[1px] bg-[#1C1D20]" />
              Areas of focus
            </p>
            <h2 className="mt-5 max-w-[16ch] text-[36px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.045em] text-[#1C1D20]">
              Where I spend my research time
            </h2>
          </div>
          <Link
            href="/insights"
            className="group inline-flex w-fit items-center gap-4 rounded-full bg-[#1C1D20] px-6 py-3 font-mono text-[13px] text-white transition-colors hover:bg-[#3847FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3847FF]"
          >
            All insights
            <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rounded-[1px] bg-current" />
          </Link>
        </div>

        {/* Cards stack on top of each other as you scroll */}
        <ol className="mt-12 flex flex-col gap-4">
          {AREAS.map((a, i) => {
            const n = a.tags.reduce((sum, t) => sum + (counts[t] || 0), 0);
            return (
              <li
                key={a.title}
                className="area-card sticky rounded-[14px] border border-[#e6e9ec] bg-white p-4 md:p-5 shadow-[0_-8px_24px_-18px_rgba(0,0,0,0.25)]"
                style={{ top: `${96 + i * 22}px` }}
              >
                <article className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6 md:min-h-[330px]">
                  {/* Index + insight count */}
                  <div className="flex items-center justify-between md:col-span-2 md:flex-col md:items-start md:justify-between md:py-1">
                    <span className="font-mono text-[13px] text-[#8a8d93]">{String(i + 1).padStart(2, "0")}</span>
                    {n > 0 && (
                      <Link href="/insights" className="group text-right md:text-left">
                        <span className="block text-[32px] md:text-[44px] font-medium leading-none tracking-[-0.04em] text-[#1C1D20]">{n}</span>
                        <span className="mt-1 block font-mono text-[11px] text-[#5a5d63] group-hover:text-[#3847FF]">
                          {n === 1 ? "insight" : "insights"}
                        </span>
                      </Link>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[8px] bg-[#eceeef] aspect-[16/10] md:col-span-5 md:aspect-auto">
                    <img src={a.image} alt={a.alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>

                  {/* Copy */}
                  <div className="relative flex flex-col md:col-span-5 md:py-1">
                    <h3 className="pr-10 text-[24px] md:text-[30px] font-medium leading-[1.1] tracking-[-0.03em] text-[#1C1D20]">{a.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-[#5a5d63]">{a.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2 md:mt-auto">
                      {a.topics.map((t) => (
                        <li key={t} className="rounded-[6px] bg-[#f1f3f5] px-3 py-2 font-mono text-[11px] text-[#1C1D20]">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <svg aria-hidden="true" className="absolute right-0 top-1 h-5 w-5 text-[#8a8d93]" viewBox="0 0 20 20" fill="none">
                      <path d="M5 4v6.5a3 3 0 0 0 3 3h8M16 13.5l-3-3M16 13.5l-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

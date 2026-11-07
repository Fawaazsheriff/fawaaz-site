import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";
import { AreasRail } from "./AreasRail";

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

  const header = (
    <div>
      <p className="inline-flex items-center gap-2 text-[13px] text-[#5a5d63]">
        <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-[1px] bg-[#1C1D20]" />
        Areas of focus
      </p>
      <h2 className="mt-5 text-[32px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.045em] text-[#1C1D20]">
        Where I spend my research time
      </h2>
    </div>
  );

  return (
    <section id="areas" className="w-full overflow-hidden px-4 md:px-8 pb-20 md:pb-28 scroll-mt-24">
      <div className="mx-auto max-w-[1280px] border-t border-[#dfe3e7] pt-14 md:pt-16">
        <AreasRail header={header}>
          {AREAS.map((a, i) => {
            const n = a.tags.reduce((sum, t) => sum + (counts[t] || 0), 0);
            return (
              <li
                key={a.title}
                className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-48px)/3.4)] rounded-[14px] border border-[#e6e9ec] bg-white p-3"
              >
                <article className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#eceeef]">
                    <img src={a.image} alt={a.alt} className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] text-[#1C1D20] backdrop-blur">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                    <h3 className="text-[21px] font-medium leading-[1.15] tracking-[-0.025em] text-[#1C1D20]">{a.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-[#5a5d63]">{a.description}</p>
                    <ul className="mb-5 mt-5 flex flex-wrap gap-1.5">
                      {a.topics.map((t) => (
                        <li key={t} className="rounded-[6px] bg-[#f1f3f5] px-2.5 py-1.5 font-mono text-[11px] text-[#1C1D20]">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/insights"
                      className="group mt-auto flex items-center justify-between border-t border-[#eceef0] pt-4 font-mono text-[12px] text-[#1C1D20] hover:text-[#3847FF]"
                    >
                      {n > 0 ? `${n} ${n === 1 ? "insight" : "insights"}` : "Insights coming soon"}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </AreasRail>
      </div>
    </section>
  );
}

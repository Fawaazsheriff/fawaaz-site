import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL not found in .env');
}

const InsightSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  tag: { type: String, required: true },
  readTime: { type: String, required: true },
  publishDate: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  authors: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true }
  }],
  youtubeId: { type: String },
  body: { type: [String], required: true },
}, { timestamps: true });

const Insight = mongoose.models.Insight || mongoose.model('Insight', InsightSchema);

const seedInsights = [
  {
    slug: "venture-capital-restarts",
    tag: "COMPANY BUILDING",
    readTime: "9 min read",
    publishDate: "November 11, 2025",
    title: "Venture capital restarts: Navigating the funding desert to unlock extreme value",
    subtitle: "How founders and investors are finding new paths through a challenging macro environment.",
    excerpt: "In the current venture capital landscape, a phenomenon known as the \"funding desert\" is reshaping how investors and startups interact.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1600&auto=format&fit=crop",
    authors: [
      { name: "Fawaz Al-Rashid", role: "General Partner", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Ryan Koh", role: "Investor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" },
    ],
    youtubeId: "JcoGh2-qMTQ",
    body: [
      "The venture capital landscape has shifted dramatically over the past three years. Rising interest rates, compressed multiples, and a reset in growth valuations have created what many insiders now call the \"funding desert\" — a period where capital is available but highly selective, and the bar for funding has been raised significantly.",
      "For founders, this environment demands a fundamental rethink of company building. The era of growth-at-all-costs is over. Investors today are rewarding efficiency, unit economics, and paths to profitability. Those who adapted early are not just surviving — they are building durable businesses that will define the next decade.",
      "Our partnership began in 2021 when we led their Series E. When we first met the founders, we were immediately struck by their thoughtful approach to product building, their maniacal emphasis on customer experience, and their relentless focus on the long-term mission.",
    ],
  },
  {
    slug: "ai-native-companies-compounding-growth",
    tag: "DATA SCIENCE",
    readTime: "6 min read",
    publishDate: "October 28, 2025",
    title: "How AI-native companies are rewriting the rules of compounding growth",
    subtitle: "The metrics that once defined success in SaaS no longer adequately capture the dynamics at play in AI-first businesses.",
    excerpt: "The metrics that once defined success in SaaS no longer adequately capture the dynamics at play in AI-first businesses.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    authors: [
      { name: "Priya Mehta", role: "Partner, Data Science", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" },
    ],
    body: [
      "AI-native companies don't just use AI as a feature — they architect their entire value chain around it. This seemingly subtle distinction has profound implications for how these companies grow, retain customers, and defend competitive moats over time.",
      "Traditional SaaS businesses grew by adding seats and modules. Revenue was predictable, linear, and deeply tied to headcount at the customer organization. AI-native businesses are different. Their value compounds with usage, not headcount.",
      "We have developed a new framework for evaluating these businesses. It looks at four dimensions: data moat, inference efficiency, workflow depth, and feedback loop velocity.",
    ],
  },
  {
    slug: "public-market-signals-2026",
    tag: "MARKETS",
    readTime: "12 min read",
    publishDate: "September 15, 2025",
    title: "Public market signals every private investor should be watching in 2026",
    subtitle: "Cross-market intelligence is becoming a key differentiator for private investors.",
    excerpt: "Cross-market intelligence is becoming a key differentiator. Here is our framework for reading the signals that matter most.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600&auto=format&fit=crop",
    authors: [
      { name: "James Walker", role: "General Partner", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" },
      { name: "Sofia Chen", role: "Senior Analyst", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" },
    ],
    body: [
      "Private market investors have historically operated in a data vacuum. Quarterly financials, infrequent board updates, and lagging comparable transactions have been the primary inputs into valuation and portfolio management decisions. Public markets offer something different: real-time signal.",
      "In 2026, we believe the integration of public market intelligence into private investment decision-making is not just an advantage — it is a necessity.",
      "We watch five categories of public signals closely. First, revenue multiples by sector. Second, margin expansion stories. Third, management commentary on demand environments. Fourth, talent flow data. And fifth, M&A activity.",
    ],
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing insights...');
    await Insight.deleteMany({});

    console.log('Inserting seed insights...');
    const result = await Insight.insertMany(seedInsights);
    console.log(`✅ Successfully seeded ${result.length} insights!`);

    result.forEach((insight, idx) => {
      console.log(`${idx + 1}. ${insight.title} (${insight.tag}) - /${insight.slug}`);
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
}

seed();

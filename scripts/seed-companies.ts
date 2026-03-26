import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL not found in .env');
}

const CompanySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  body: { type: [String], required: true },
  websiteUrl: { type: String },
  partneringSince: { type: String },
}, { timestamps: true });

const Company = mongoose.models.Company || mongoose.model('Company', CompanySchema);

const seedCompanies = [
  {
    slug: "klarna",
    tag: "FINTECH",
    title: "Klarna",
    subtitle: "A payment solution simplifying the purchasing process.",
    excerpt: "Klarna is a payment solution simplifying the purchasing process.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
    websiteUrl: "https://www.klarna.com/",
    partneringSince: "2021",
    body: [
      "Klarna makes shopping smooth. And with over 150 million active users globally and 2 million transactions per day, Klarna is meeting the changing demands of consumers by saving them time and money while helping them be informed and in control of their personal finances.",
      "Over 400,000 global retail partners, including H&M, Saks, Sephora, Macys, IKEA, Expedia Group, and Nike have integrated Klarna's innovative technology to deliver a seamless shopping experience online and in-store. With over 5,000 employees, Klarna is active in 45 markets and is one of the most highly-valued private fintechs globally, with a valuation of $45.6 billion.",
    ],
  },
  {
    slug: "nvidia",
    tag: "SEMICONDUCTOR",
    title: "NVIDIA",
    subtitle: "A pioneer in the art and science of visual computing.",
    excerpt: "NVIDIA is a pioneer in the art and science of visual computing.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    websiteUrl: "https://www.nvidia.com/",
    partneringSince: "2019",
    body: [
      "NVIDIA's invention of the GPU in 1999 sparked the growth of the PC gaming market, redefined modern computer graphics and revolutionized parallel computing. More recently, GPU deep learning ignited modern AI — the next era of computing — with the GPU acting as the brain of computers, robots and self-driving cars that can perceive and understand the world.",
      "Today, NVIDIA is increasingly known as the computing company for the age of AI. The company's platforms are enabling breakthroughs in diverse fields ranging from healthcare and transportation to manufacturing and entertainment.",
    ],
  },
  {
    slug: "reddit",
    tag: "SOCIAL MEDIA",
    title: "Reddit",
    subtitle: "The internet's leading source of interest-based content.",
    excerpt: "Reddit is the internet's leading source of interest-based content.",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
    websiteUrl: "https://www.reddit.com/",
    partneringSince: "2020",
    body: [
      "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community! Whether you're into breaking news, sports, TV fan theories, or a never-ending stream of the internet's cutest animals, there's a community on Reddit for you.",
      "With over 100,000 active communities and millions of daily active users, Reddit is the place where people come to connect, discover, and share.",
    ],
  },
  {
    slug: "apple",
    tag: "CONSUMER ELECTRONICS",
    title: "Apple",
    subtitle: "Apple transforms how humans interact with technologies.",
    excerpt: "Apple transforms how humans interact with technologies with products like the iPhone, iPad, Mac and Watch.",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
    websiteUrl: "https://www.apple.com/",
    partneringSince: "2018",
    body: [
      "Apple revolutionized personal technology with the introduction of the Macintosh in 1984. Today, Apple leads the world in innovation with iPhone, iPad, Mac, Apple Watch, and Apple TV. Apple's five software platforms — iOS, iPadOS, macOS, watchOS, and tvOS — provide seamless experiences across all Apple devices and empower people with breakthrough services including the App Store, Apple Music, Apple Pay, and iCloud.",
      "Apple's more than 100,000 employees are dedicated to making the best products on earth, and to leaving the world better than we found it.",
    ],
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing companies...');
    await Company.deleteMany({});

    console.log('Inserting seed companies...');
    const result = await Company.insertMany(seedCompanies);
    console.log(`✅ Successfully seeded ${result.length} companies!`);

    result.forEach((company, idx) => {
      console.log(`${idx + 1}. ${company.title} (${company.tag}) - /${company.slug}`);
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

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.DATABASE_URL!;

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL not found in .env');
}

// Video Schema
const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  tag: { type: String, required: true },
  imageUrl: { type: String },
  youtubeId: { type: String },
  description: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);

const seedVideos = [
  {
    title: "ANTHROPIC VS THE PENTAGON: WHO WINS | OPENAI'S $110BN MEGA ROUND | CURSOR HITS $2BN IN ARR",
    date: "Mar 5, 2026",
    tag: "20VC",
    youtubeId: "JcoGh2-qMTQ",
    description: "Deep dive into the latest AI developments and funding rounds",
    featured: true,
  },
  {
    title: "Monday.com CEO on Is SaaS Dead: Will Everything Be Vibe Coded | Will Systems of Record Become Valueless Databases in an Agentic World",
    date: "Mar 2, 2026",
    tag: "20VC",
    youtubeId: "dQw4w9WgXcQ",
    description: "Exploring the future of SaaS in an AI-driven world",
    featured: false,
  },
  {
    title: "Why Cursor is Dead? An AI Tsunami is Coming & You Need to Prepare",
    date: "Feb 28, 2026",
    tag: "20VC",
    youtubeId: "9bZkp7q19f0",
    description: "Analysis of AI coding tools and their impact on development",
    featured: false,
  },
  {
    title: "Anthropic Wipes Billions Off Markets | Citrini Research Breakdown: Agents, Ghost GDP, Consumer Spend | Figma Earnings Beat",
    date: "Feb 26, 2026",
    tag: "20VC",
    youtubeId: "3JZ_D3ELwOQ",
    description: "Market analysis and AI company performance review",
    featured: false,
  },
  {
    title: "Inside Coatue's $70BN Machine: Why Price Matters Least | Why Mega Markets are the Most Important | How Mega Funds Work",
    date: "Feb 23, 2026",
    tag: "20VC",
    youtubeId: "kJQP7kiw5Fk",
    description: "Understanding venture capital mega funds and investment strategies",
    featured: false,
  },
  {
    title: "Codex vs Claude Code vs Cursor: Who Wins, Who Loses | Will All Coding Be Automated - Do We Need PMs | The Real Bull Case for Devin",
    date: "Feb 21, 2026",
    tag: "20Product",
    youtubeId: "L_mWt8XRrUU",
    description: "Comparing AI coding assistants and the future of software development",
    featured: false,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Clear existing videos
    console.log('Clearing existing videos...');
    await Video.deleteMany({});

    // Add YouTube thumbnails
    const videosWithThumbnails = seedVideos.map(video => ({
      ...video,
      imageUrl: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    }));

    // Insert seed data
    console.log('Inserting seed videos...');
    const result = await Video.insertMany(videosWithThumbnails);
    console.log(`✅ Successfully seeded ${result.length} videos!`);

    // Display seeded videos
    result.forEach((video, idx) => {
      console.log(`${idx + 1}. ${video.title} (${video.tag}) - Featured: ${video.featured}`);
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

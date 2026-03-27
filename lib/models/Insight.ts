import mongoose, { Schema, Document } from 'mongoose';

export interface IInsight extends Document {
  slug: string;
  tag: string;
  readTime: string;
  publishDate: string;
  title: string;
  subtitle: string;
  excerpt: string;
  imageUrl: string;
  authors: { name: string; role: string; avatar: string }[];
  youtubeId?: string;
  body: string[];
  createdAt: Date;
  updatedAt: Date;
}

const InsightSchema = new Schema<IInsight>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.models.Insight || mongoose.model<IInsight>('Insight', InsightSchema);

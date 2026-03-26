import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  imageUrl: string;
  body: string[];
  websiteUrl?: string;
  partneringSince?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    slug: { type: String, required: true, unique: true },
    tag: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    excerpt: { type: String, required: true },
    imageUrl: { type: String, required: true },
    body: { type: [String], required: true },
    websiteUrl: { type: String },
    partneringSince: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);

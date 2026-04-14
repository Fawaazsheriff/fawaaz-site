import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  key: string;
  topBannerText: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    topBannerText: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  date: string;
  tag: string;
  imageUrl: string;
  youtubeId?: string;
  description?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    tag: { type: String, required: true },
    imageUrl: { type: String, required: false }, // Optional now
    youtubeId: { type: String },
    description: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

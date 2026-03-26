import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Video from '@/lib/models/Video';
import { verifyToken } from '@/lib/auth';
import { getYouTubeThumbnail, extractYouTubeId } from '@/lib/youtube';

// GET all videos
export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json({ videos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

// POST new video (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    // Extract YouTube ID if full URL provided
    if (body.youtubeId) {
      const extractedId = extractYouTubeId(body.youtubeId);
      if (extractedId) {
        body.youtubeId = extractedId;
      }
    }
    
    // If no imageUrl provided but youtubeId exists, use YouTube thumbnail
    if (!body.imageUrl && body.youtubeId) {
      body.imageUrl = getYouTubeThumbnail(body.youtubeId);
    }

    const video = await Video.create(body);
    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}

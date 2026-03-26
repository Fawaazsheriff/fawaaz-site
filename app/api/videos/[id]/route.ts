import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Video from '@/lib/models/Video';
import { verifyToken } from '@/lib/auth';
import { getYouTubeThumbnail, extractYouTubeId } from '@/lib/youtube';

// PUT update video (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
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

    const video = await Video.findByIdAndUpdate(id, body, { new: true });
    
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ video });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
  }
}

// DELETE video (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const video = await Video.findByIdAndDelete(id);
    
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
}

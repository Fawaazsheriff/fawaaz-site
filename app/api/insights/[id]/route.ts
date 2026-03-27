import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Insight from '@/lib/models/Insight';
import { verifyToken } from '@/lib/auth';

// PUT update insight (admin only)
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
    
    const insight = await Insight.findByIdAndUpdate(id, body, { new: true });
    
    if (!insight) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json({ insight });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Insight slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update insight' }, { status: 500 });
  }
}

// DELETE insight (admin only)
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
    const insight = await Insight.findByIdAndDelete(id);
    
    if (!insight) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete insight' }, { status: 500 });
  }
}

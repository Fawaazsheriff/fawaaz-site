import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Insight from '@/lib/models/Insight';
import { verifyToken } from '@/lib/auth';

// GET all insights
export async function GET() {
  try {
    await connectDB();
    const insights = await Insight.find().sort({ createdAt: -1 });
    return NextResponse.json({ insights });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}

// POST new insight (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const insight = await Insight.create(body);
    return NextResponse.json({ insight }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Insight slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create insight' }, { status: 500 });
  }
}

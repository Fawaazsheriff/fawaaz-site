import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Company from '@/lib/models/Company';
import { verifyToken } from '@/lib/auth';

// GET all companies
export async function GET() {
  try {
    await connectDB();
    const companies = await Company.find().sort({ createdAt: -1 });
    return NextResponse.json({ companies });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }
}

// POST new company (admin only)
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

    const company = await Company.create(body);
    return NextResponse.json({ company }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Company slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}

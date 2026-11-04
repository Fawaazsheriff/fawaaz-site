import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import { verifyToken } from '@/lib/auth';

// Empty = no banner. Set the text from the admin panel to show one.
const DEFAULT_BANNER_TEXT = '';

// GET site settings (public)
export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'main' });

    return NextResponse.json({
      settings: {
        topBannerText: settings?.topBannerText ?? DEFAULT_BANNER_TEXT,
        homeInsightSlugs: settings?.homeInsightSlugs ?? [],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

// PUT update site settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    if (typeof body.topBannerText !== 'string') {
      return NextResponse.json({ error: 'topBannerText must be a string' }, { status: 400 });
    }

    if (
      body.homeInsightSlugs !== undefined &&
      (!Array.isArray(body.homeInsightSlugs) || body.homeInsightSlugs.some((slug: unknown) => typeof slug !== 'string'))
    ) {
      return NextResponse.json({ error: 'homeInsightSlugs must be an array of strings' }, { status: 400 });
    }

    const normalizedHomeInsightSlugs = body.homeInsightSlugs
      ? [...new Set(body.homeInsightSlugs.map((slug: string) => slug.trim()).filter(Boolean))].slice(0, 4)
      : [];

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'main' },
      {
        key: 'main',
        topBannerText: body.topBannerText,
        homeInsightSlugs: normalizedHomeInsightSlugs,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      settings: {
        topBannerText: settings.topBannerText,
        homeInsightSlugs: settings.homeInsightSlugs || [],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}

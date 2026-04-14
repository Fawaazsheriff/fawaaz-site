import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import { verifyToken } from '@/lib/auth';

const DEFAULT_BANNER_TEXT =
  'Fundraise Announcement: Congrats to Emergent for raising $70M from Khosla Ventures and SoftBank!';

// GET site settings (public)
export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: 'main' });

    return NextResponse.json({
      settings: {
        topBannerText: settings?.topBannerText ?? DEFAULT_BANNER_TEXT,
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

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'main' },
      {
        key: 'main',
        topBannerText: body.topBannerText,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      settings: {
        topBannerText: settings.topBannerText,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}

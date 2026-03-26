# 🎯 Admin System - Complete Guide

## ✅ Everything is Ready!

Your admin system is fully functional with:
- ✅ Authentication system
- ✅ Video management (CRUD)
- ✅ Company management (CRUD)
- ✅ Database seeded with sample data
- ✅ All TypeScript errors fixed
- ✅ Build passing successfully

## 🚀 Start Using It Now

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Access Admin
**Option A:** Click the "Admin" button (bottom-right corner of homepage)
**Option B:** Go directly to http://localhost:3000/admin/login

### Step 3: Login
- Email: `admin@fawaz.com`
- Password: `admin123`

### Step 4: Manage Content
You'll see two tabs:
- **Videos Tab**: Manage video content
- **Companies Tab**: Manage portfolio companies

## 📹 Managing Videos

### Add a Video
1. Click "Add New Video"
2. Fill in:
   - **Title**: Video title
   - **Date**: e.g., "Mar 5, 2026"
   - **Tag**: e.g., "20VC", "20Product"
   - **YouTube**: Paste FULL URL or just ID
     - ✅ `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
     - ✅ `https://youtu.be/dQw4w9WgXcQ`
     - ✅ `dQw4w9WgXcQ`
   - **Image**: Optional (auto-uses YouTube thumbnail)
   - **Description**: Optional
   - **Featured**: Check to show at top
3. Click "Create Video"

### Edit/Delete
- Click ✏️ icon to edit
- Click 🗑️ icon to delete (confirms first)

### View Public Page
Videos appear at: http://localhost:3000/videos
Click any video to see detail page with YouTube player

## 🏢 Managing Companies

### Add a Company
1. Switch to "Companies" tab
2. Click "Add New Company"
3. Fill in:
   - **Title**: Company name
   - **Slug**: URL-friendly (e.g., "klarna", "nvidia")
   - **Tag**: Category (e.g., "FINTECH", "SEMICONDUCTOR")
   - **Subtitle**: Short description
   - **Excerpt**: Brief summary
   - **Image URL**: Company image
   - **Body**: Multiple paragraphs (click "+ Add Paragraph")
   - **Website**: Optional company URL
   - **Partnering Since**: Optional year
4. Click "Create Company"

### Edit/Delete
- Click ✏️ icon to edit
- Click 🗑️ icon to delete (confirms first)

### View Public Page
Companies appear at: http://localhost:3000/company
Click any company to see detail page

## 🗄️ Database Info

**Already Seeded:**
- 6 Videos (1 featured)
- 4 Companies (Klarna, NVIDIA, Reddit, Apple)

**Re-seed anytime:**
```bash
npm run seed              # Seeds both videos + companies
npm run seed:videos       # Videos only
npm run seed:companies    # Companies only
```

## 🔒 Security Notes

**Current Setup (Development):**
- Email: `admin@fawaz.com`
- Password: `admin123`
- JWT Secret: Set in `.env`

**Before Production:**
1. Change password in `lib/auth.ts`
2. Update `JWT_SECRET` in `.env`
3. Rotate MongoDB credentials
4. Enable HTTPS

## 🎨 Features

### Videos
- YouTube URL/ID auto-extraction
- Auto thumbnail from YouTube
- Custom image override
- Featured video support
- Embedded YouTube player on detail pages

### Companies
- Unique slug validation
- Dynamic body paragraphs
- Optional fields (website, partnering year)
- Rich detail pages

### Admin Dashboard
- Tab-based interface
- Live image previews
- Inline editing
- Confirmation on delete
- Auto-logout after 7 days

## 📱 Public Access

Anyone can view:
- `/` - Homepage
- `/videos` - Video listing
- `/videos/[id]` - Video detail with player
- `/company` - Company listing
- `/company/[slug]` - Company detail
- `/insights` - Insights listing
- `/insights/[slug]` - Insight detail

Only admin can access:
- `/admin/login` - Login page
- `/admin/dashboard` - Management dashboard

## ✨ Everything Works!

All TypeScript errors resolved, build passing, database connected, and ready to use!

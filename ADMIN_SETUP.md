# Admin System - Complete Setup Guide

## 🚀 Quick Start

### 1. Seed Database
```bash
npm run seed
```
This seeds both videos (6) and companies (4) to your MongoDB.

### 2. Start Server
```bash
npm run dev
```

### 3. Login
- URL: http://localhost:3000/admin/login
- Email: `admin@fawaz.com`
- Password: `admin123`

### 4. Access Dashboard
- URL: http://localhost:3000/admin/dashboard

## 🔐 Default Credentials
- **Email**: `admin@fawaz.com`
- **Password**: `admin123`

⚠️ **SECURITY**: Change these in `lib/auth.ts` before production!

## 📍 Access Points

### Admin (Protected)
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`

### Public Pages
- Homepage: `/` (has "Admin" button in bottom-right)
- Videos: `/videos`
- Video Detail: `/videos/[id]`
- Companies: `/company`
- Company Detail: `/company/[slug]`

## ✨ Features

### Videos Management
- ✅ Add/Edit/Delete videos
- ✅ YouTube URL or ID support (auto-extracts ID)
- ✅ Optional custom image (auto-uses YouTube thumbnail if empty)
- ✅ Live thumbnail preview
- ✅ Mark as featured
- ✅ Video detail pages with embedded player

### Companies Management
- ✅ Add/Edit/Delete companies
- ✅ Custom slug for URLs
- ✅ Multiple body paragraphs (add/remove dynamically)
- ✅ Optional website URL
- ✅ Optional "Partnering Since" year
- ✅ Company detail pages

## 📝 Adding Content

### Adding a Video
**Required:**
- Title
- Date (e.g., "Mar 5, 2026")
- Tag (e.g., "20VC", "20Product")
- YouTube URL or ID

**Optional:**
- Custom image URL (uses YouTube thumbnail if empty)
- Description

**YouTube Input Examples:**
- Full URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Short URL: `https://youtu.be/dQw4w9WgXcQ`
- Just ID: `dQw4w9WgXcQ`

### Adding a Company
**Required:**
- Title
- Slug (URL-friendly, e.g., "klarna", "nvidia")
- Tag (e.g., "FINTECH", "SEMICONDUCTOR")
- Subtitle
- Excerpt
- Image URL
- Body paragraphs (at least one)

**Optional:**
- Website URL
- Partnering Since year

## 🗄️ Database Schema

### Videos Collection
```typescript
{
  title: string;
  date: string;
  tag: string;
  imageUrl?: string;  // Auto-generated from YouTube if empty
  youtubeId?: string;
  description?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Companies Collection
```typescript
{
  slug: string;        // Unique, used in URL
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  imageUrl: string;
  body: string[];      // Array of paragraphs
  websiteUrl?: string;
  partneringSince?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Seeding Commands

```bash
# Seed everything (videos + companies)
npm run seed

# Seed only videos
npm run seed:videos

# Seed only companies
npm run seed:companies
```

## 🔒 Security Features
- JWT-based authentication (7-day expiry)
- HTTP-only cookies
- Secure token verification on all admin routes
- Auto-redirect if not authenticated
- CSRF protection via SameSite cookies

## ⚠️ Before Production
1. Change admin password in `lib/auth.ts`
2. Update `JWT_SECRET` in `.env`
3. Rotate MongoDB credentials
4. Enable HTTPS
5. Set `NODE_ENV=production`

## 🎯 API Endpoints

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token

### Videos
- `GET /api/videos` - List all (public)
- `POST /api/videos` - Create (admin)
- `PUT /api/videos/[id]` - Update (admin)
- `DELETE /api/videos/[id]` - Delete (admin)

### Companies
- `GET /api/companies` - List all (public)
- `POST /api/companies` - Create (admin)
- `PUT /api/companies/[id]` - Update (admin)
- `DELETE /api/companies/[id]` - Delete (admin)

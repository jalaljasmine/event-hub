# Contra Freelance Marketplace - Setup Guide

## Project Structure

This is a **Next.js 16** application with the following structure:

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── browse/            # Browse projects page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── dashboard/         # User dashboard (protected)
│   ├── gig/[id]/          # Individual gig detail page
│   ├── layout.tsx         # Root layout with auth provider
│   └── globals.css        # Global styles with Tailwind v4
├── components/            # Reusable React components
│   ├── navbar.tsx         # Navigation bar
│   ├── footer.tsx         # Footer component
│   └── gig-card.tsx       # Gig card component
├── lib/                   # Utility functions and context
│   ├── auth-context.tsx   # Authentication context
│   └── api.ts            # Axios API client
└── public/               # Static assets

```

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

### Authentication
- Client-side auth context with localStorage persistence
- Protected routes (Dashboard requires login)
- Role-based (buyer/seller)
- Mock authentication - connect to your backend API

### Pages
- **Home**: Landing page with search and featured projects
- **Browse**: Browse and search all projects with filtering
- **Login/Register**: User authentication flows
- **Dashboard**: Protected user dashboard showing stats and projects
- **Gig Detail**: Detailed view of individual projects

### Components
- **Navbar**: Responsive navigation with auth state
- **Footer**: Multi-column footer with links
- **GigCard**: Reusable project card component with hover effects

### Styling
- Tailwind CSS v4 with modern design tokens
- Contrast-inspired minimalist aesthetic
- Responsive design (mobile-first)
- No external UI library dependencies

## Integrating Your Backend API

### Update API Client (`lib/api.ts`)
Replace the mock API calls with actual backend endpoints:

```typescript
export async function getGigs() {
  const response = await api.get('/gigs')
  return response.data
}
```

### Update Page Components
Replace mock data with API calls:

```typescript
import { getGigs } from '@/lib/api'

export default async function BrowsePage() {
  const gigs = await getGigs()
  // ...
}
```

### Authentication Flow
Connect to your backend login endpoint:

```typescript
const response = await api.post('/auth/login', {
  email,
  password,
})
const { user, token } = response.data
login(user, token)
```

## Database Integration

When ready to connect a database:

1. Choose a provider (Supabase, Neon, etc.)
2. Create necessary tables (users, gigs, applications, etc.)
3. Update API endpoints to query the database
4. Implement proper authentication (sessions/JWT)

## Deployment

### Deploy to Vercel
```bash
pnpm build
vercel deploy
```

The application is production-ready and optimized for Vercel deployment.

## Next Steps

1. Connect to your backend API
2. Implement real authentication
3. Add database integration
4. Create additional pages as needed
5. Add payment processing (Stripe, etc.)
6. Implement messaging/notifications
7. Add admin dashboard

## Support

For questions about Next.js: https://nextjs.org/docs
For TypeScript help: https://www.typescriptlang.org/docs/
For Tailwind CSS: https://tailwindcss.com/docs

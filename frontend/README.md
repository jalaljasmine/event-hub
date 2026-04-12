# Contra - Freelance Marketplace Frontend

A modern, clean React + Vite application for browsing and managing freelance projects, inspired by Contra's minimalist design.

## Features

- **Browse Projects** - Search and filter through thousands of projects
- **Project Details** - View detailed information about each project
- **User Authentication** - Secure login and registration
- **Dashboard** - Manage profile, gigs, and settings
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Modern UI** - Built with Tailwind CSS for a clean aesthetic

## Tech Stack

- **React 18** - Frontend framework
- **Vite 4** - Build tool
- **React Router 7** - Routing
- **Axios** - HTTP client
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or pnpm package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Create `.env` file (use `.env.example` as template):
```bash
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── GigCard.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Gigs.jsx
│   ├── GigDetail.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── context/
│   └── AuthContext.jsx
├── api/
│   └── axios.js
├── App.jsx
├── main.jsx
└── index.css
```

## API Integration

The app expects a backend API running at `http://localhost:5000` with the following endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - List all gigs with filters
- `GET /api/gigs/:id` - Get gig details
- `GET /api/gigs/my-gigs` - Get user's gigs (protected)
- `POST /api/gigs` - Create new gig (protected, seller only)

## Authentication

The app uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests via the axios interceptor.

## Features

### For Buyers
- Browse and search projects
- View project details
- Contact sellers
- Save favorite projects

### For Sellers
- Create and manage gigs
- View profile and earnings
- Manage settings

## Styling

The app uses Tailwind CSS with a custom color palette:
- Primary: `#111827` (Dark Gray/Black)
- Secondary: `#6b7280` (Medium Gray)
- Accent: `#2563eb` (Blue)
- Border: `#e5e7eb` (Light Gray)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Support

For support, please open an issue or contact the development team.

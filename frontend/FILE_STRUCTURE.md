# Frontend File Structure

This document lists all the frontend files created for the Contra marketplace application.

## Root Level Files

```
.env                          # Environment variables (git ignored)
.gitignore                    # Git ignore rules
index.html                    # HTML entry point
package.json                  # Project dependencies and scripts
postcss.config.js             # PostCSS configuration
tailwind.config.js            # Tailwind CSS configuration
vite.config.js                # Vite build configuration
README.md                     # Project documentation
```

## Source Files (src/)

### Main Files
- `src/main.jsx` - React app entry point
- `src/App.jsx` - Root component with routing
- `src/index.css` - Global styles and Tailwind imports

### Components (`src/components/`)
- `Navbar.jsx` - Navigation header with auth-aware menu
- `Footer.jsx` - Footer with links and branding
- `GigCard.jsx` - Reusable project card component
- `ProtectedRoute.jsx` - Protected route wrapper for authenticated users

### Pages (`src/pages/`)
- `Home.jsx` - Landing page with hero and featured projects
- `Gigs.jsx` - Browse/search page with filters
- `GigDetail.jsx` - Individual project detail page
- `Login.jsx` - User login form
- `Register.jsx` - User registration form
- `Dashboard.jsx` - User dashboard for profile and gigs management

### Context (`src/context/`)
- `AuthContext.jsx` - Global authentication state management

### API (`src/api/`)
- `axios.js` - Configured axios instance with JWT token injection

## File Descriptions

### Configuration Files

**vite.config.js**
- Configures Vite build tool
- Sets up API proxy to http://localhost:5000
- Enables React plugin

**tailwind.config.js**
- Extends Tailwind CSS with custom colors
- Configures content paths for purging

**postcss.config.js**
- Integrates Tailwind CSS and Autoprefixer

**.env**
- Sets VITE_API_URL for API communication
- Git ignored for security

### Component Files

**Navbar.jsx (126 lines)**
- Responsive header with logo
- Desktop and mobile navigation
- Auth-aware menu (login/signup vs logout/dashboard)
- Uses Lucide icons

**Footer.jsx (107 lines)**
- Multi-section footer layout
- Links for clients, creatives, and company
- Dark themed design

**GigCard.jsx (78 lines)**
- Reusable project card component
- Displays project image, title, seller info
- Shows ratings, pricing, and action buttons
- Hover effects and animations

**ProtectedRoute.jsx (21 lines)**
- Wrapper for authenticated routes
- Redirects to login if not authenticated
- Shows loading spinner while checking auth

### Page Files

**Home.jsx (154 lines)**
- Hero section with headline and CTA
- Search bar with search icon
- Category filter chips
- Featured projects grid
- Call-to-action section

**Gigs.jsx (158 lines)**
- Search functionality with query parameter support
- Category dropdown filter
- Sort options (recent, trending, rating, price)
- Pagination controls
- Responsive grid layout

**GigDetail.jsx (197 lines)**
- Full project details view
- Project image gallery area
- Seller information card
- Project stats (rating, completed projects, happy clients)
- What's included list
- Contact seller and save buttons
- Pricing and delivery information

**Login.jsx (95 lines)**
- Email and password input fields
- Form validation and error handling
- Loading state during submission
- Link to registration page
- Uses AuthContext for authentication

**Register.jsx (169 lines)**
- Name, email, password fields
- User type selection (buyer/seller)
- Password confirmation validation
- Form validation and error handling
- Link to login page

**Dashboard.jsx (295 lines)**
- User profile information display
- Tab navigation (gigs, profile, settings)
- My Gigs/Saved Gigs listing
- Profile editing form
- Settings management
- Create new gig modal form
- Role-specific UI for buyers and sellers

### Context & API Files

**AuthContext.jsx (92 lines)**
- Global authentication state management
- User, token, loading states
- Login, register, logout functions
- Token verification on app load
- useAuth hook for consuming auth state

**axios.js (31 lines)**
- Configured axios instance
- Automatic JWT token injection in request headers
- Response interceptor for 401 error handling
- Token refresh redirect

## Installation & Setup

1. Replace your frontend files with these files
2. Run `npm install` to install dependencies
3. Create `.env` file with API URL
4. Run `npm run dev` to start development
5. Backend should be running at http://localhost:5000

## API Endpoints Required

The backend should provide these endpoints:

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/gigs
GET    /api/gigs/:id
GET    /api/gigs/my-gigs
POST   /api/gigs
```

## Development Tips

- Use `npm run dev` for development with hot reload
- Use `npm run build` to create production build
- Check console for axios errors and API responses
- Auth token is stored in localStorage under key `token`
- All API requests automatically include Bearer token in headers

## Styling

All styling is done with Tailwind CSS utility classes. Custom colors are defined in `tailwind.config.js`:
- Primary text: `text-gray-900`
- Secondary text: `text-gray-600`
- Accent button: `bg-black` or `bg-blue-500`
- Borders: `border-gray-200`

## Notes

- The frontend is fully functional and ready to connect to a backend
- All forms include validation and error handling
- Protected routes require authentication
- Responsive design works on all screen sizes
- No hardcoded API URLs - uses environment variables

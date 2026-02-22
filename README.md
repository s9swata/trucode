# TruCode

A LeetCode-inspired code evaluation platform built with the MERN stack (MongoDB, Express, React/Next.js).

## Features

- **Problem Library** - Browse, filter, and solve coding problems
- **Code Execution** - Submit solutions and run code using Judge0 CE
- **User Authentication** - Sign in with Clerk
- **Profile & Stats** - Track your submissions, acceptance rate, and progress
- **Leaderboard** - Compete with other users by earning aura points
- **Analytics** - View detailed statistics about your coding activity

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Clerk (authentication)
- Judge0 CE (code execution)

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Clerk (authentication)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/s9swata/trucode.git
   cd trucode
   ```

2. **Set up the backend**
   ```bash
   cd api
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd client
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Environment Variables

**Backend (`api/.env`)**
```env
DATABASE_URL=mongodb://localhost:27017/trucode
CLERK_JWKS_URI=https://your-clerk-instance.clerk.accounts.dev/.well-known/jwks.json
PORT=3000
```

**Frontend (`client/.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Seed the database** (optional - adds sample problems)
   ```bash
   cd api
   node seed.js
   ```

3. **Start the backend**
   ```bash
   cd api
   npm start
   ```

4. **Start the frontend**
   ```bash
   cd client
   npm run dev
   ```

5. Open http://localhost:3001 in your browser

## Deployment

### Backend (Render/Railway/Heroku)

| Setting | Value |
|---------|-------|
| Root Directory | `api` |
| Build Command | `npm install` |
| Start Command | `node src/index.js` |

Required environment variables:
- `DATABASE_URL` - MongoDB connection string
- `CLERK_JWKS_URI` - Clerk JWKS URL

### Frontend (Vercel/Netlify)

1. Connect your GitHub repository to Vercel
2. Set root directory to `client`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend URL
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key

### Clerk Webhook Setup

After deploying, configure a webhook in Clerk Dashboard:

- **Endpoint URL**: `https://your-backend-url.com/webhook/clerk`
- **Events**: `user.created`, `user.updated`

## Project Structure

```
trucode/
├── api/                    # Express backend
│   ├── src/
│   │   ├── index.js       # Main server file
│   │   ├── utils.js       # Utility functions (Judge0)
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth middleware
│   ├── seed.js           # Database seeder
│   └── package.json
├── client/                # Next.js frontend
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/         # API client, utilities
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/problems` | List all problems |
| GET | `/problems/:slug` | Get problem by slug |
| POST | `/submissions` | Submit code |
| GET | `/users/:username` | Get user profile |
| GET | `/users/leaderboard` | Get leaderboard |
| GET | `/users/:username/analytics` | Get user analytics |
| POST | `/users/sync` | Sync user from Clerk |
| POST | `/webhook/clerk` | Clerk webhook |

## License

MIT

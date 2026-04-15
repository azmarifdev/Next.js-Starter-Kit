# Next.js Starter Kit

![Starter Banner](public/assets/banner.png)

**A complete, production-like Next.js Starter Kit for launching real products in minutes.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-20%2B-339933?logo=node.js&logoColor=white)
![Package Manager](https://img.shields.io/badge/Package_Manager-pnpm-F69220?logo=pnpm&logoColor=white)

## Project Name

**Next.js Starter Kit**

## Tagline

**Authentication, guarded routes, API error handling, polished UI states, and fast onboarding built in.**

## Quick Start

### Prerequisites

- Node.js `>=20 <23`
- pnpm `>=10`

### 1) Install dependencies

```bash
pnpm install
```

### 2) Set up environment files

```bash
pnpm setup
```

This creates `.env` and `.env.local` from `.env.example` if they do not exist.

### 3) (Optional) Seed MongoDB demo data

```bash
pnpm seed
```

If `MONGODB_URI` is not configured, seeding is skipped automatically.

### 4) Start the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Why This Starter Kit Stands Out

- Complete auth flow with login/register/me/logout
- Middleware route protection for `/dashboard`, `/users`, `/projects`, `/tasks`
- Form validation + API error feedback for auth forms
- Global loading, error, and not-found UI (`app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx`)
- Demo mode banner and seeded demo credentials
- Theme toggle (light/dark) with saved preference
- Toast notifications for login, logout, and CRUD interactions
- Search, filter, stats, and empty states on users/projects/tasks pages
- Optional MongoDB persistence with in-memory fallback

## Folder Structure

This starter includes a lightweight UI layer in `src/components/ui/` (`button`, `input`, `card`, `modal`) and a simple toast system (`toast.tsx`, `toaster.tsx`).

```text
.
├── public/
│   └── assets/                # Banner, logo, and screenshot images
├── scripts/
│   ├── setup.mjs              # Creates .env/.env.local from .env.example
│   ├── seed.mjs               # Seeds demo users/projects/tasks in MongoDB
│   └── start.mjs              # Production start wrapper
├── src/
│   ├── app/                   # App Router pages + API routes
│   │   └── api/v1/auth/       # Auth endpoints (login/register/me/logout)
│   ├── components/common/     # Shared UI components (theme, toast, demo banner)
│   ├── components/ui/         # Lightweight UI building blocks
│   ├── lib/                   # Core utilities (auth, env, db, api-error)
│   ├── modules/               # Feature modules (auth, user, project, task, demo)
│   ├── services/              # Shared service helpers (api client)
│   └── styles/                # Global styles
├── middleware.ts              # Route auth guard
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

## Demo Credentials

Use either account to sign in:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `admin123` |
| User | `user@example.com` | `user123` |

Notes:
- These credentials work in demo mode (in-memory users).
- They are also inserted by `pnpm seed` when MongoDB is configured.

## Screenshots

### Dashboard

![Dashboard Screenshot](public/assets/dashboard-screenshot.png)

### Login

![Login Screenshot](public/assets/login-screenshot.png)

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm setup    # Generate local env files from .env.example
pnpm seed     # Seed demo collections (requires MONGODB_URI)
```

## Environment Variables

```env
# App display name shown in navbar and metadata
NEXT_PUBLIC_APP_NAME=Next.js Starter Kit

# Required in production: use a long random value
AUTH_SESSION_SECRET=dev-only-secret

# Optional for persistent storage (leave empty to use in-memory demo mode)
MONGODB_URI=
MONGODB_DB_NAME=nextjs_starter_kit
```

For production, use a strong `AUTH_SESSION_SECRET` and secure MongoDB credentials.

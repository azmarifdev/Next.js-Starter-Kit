# Next.js Starter-Kit

![Starter Banner](public/assets/banner.png)

**Tagline:** A clean, developer-focused and scalable Next.js starter kit for building real products without boilerplate fatigue.

**Description:**
`Next.js Starter-Kit` is a practical foundation for modern web apps.
It includes authentication, guarded routes, API-first structure, and polished UX defaults.
Everything is designed to stay simple, readable, and production-like.

## 🚀 Quick Start

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

## ✨ Features

- Cookie-based auth flow (`login`, `register`, `me`, `logout`)
- Middleware route guard for protected pages
- Consistent API success/error shape via `lib/api-error.ts`
- Lightweight toast notifications for feedback
- Simple UI primitives: `button`, `input`, `card`, `modal`
- Loading, error, not-found, and empty-state UI
- Demo mode credentials and starter seed flow
- Light/dark theme toggle with saved preference

## 🧠 Architecture

- **App Router** for pages and API routes
- **Feature modules** for clean separation (`modules/*`)
- **Shared services/lib** for reusable API and runtime utilities
- **UI primitives** in `components/ui` for consistency without heavy UI libraries
- **Developer-first defaults** with readable file naming and minimal complexity

## 📸 Screenshots

### Dashboard

![Dashboard Screenshot](public/assets/dashboard-screenshot.png)

### Login

![Login Screenshot](public/assets/login-screenshot.png)

## 🔐 Demo Credentials

Use either account to sign in:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `admin123` |
| User | `user@example.com` | `user123` |

## 📦 Folder Structure

```text
.
├── public/
│   └── assets/                # Branding/banner/logo/screenshots
├── scripts/
│   ├── setup.mjs              # Creates env files
│   ├── seed.mjs               # Seeds demo users/data in MongoDB
│   └── start.mjs              # Production start wrapper
├── src/
│   ├── app/                   # Routes + API endpoints
│   ├── components/common/     # Shared UX components (toast, theme, demo banner)
│   ├── components/landing/    # Marketing/home sections
│   ├── components/ui/         # Lightweight UI primitives
│   ├── lib/                   # Core utils (auth, db, env, api-error)
│   ├── modules/               # Feature modules (auth/user/project/task)
│   ├── services/              # Client API helpers
│   └── styles/                # Global design system styles
├── tests/
│   └── e2e/                   # Minimal e2e placeholder structure
├── middleware.ts              # Route protection
└── README.md
```

## 👤 About the Developer

- **Name:** A. Z. M. Arif
- **Website:** [https://azmarif.dev](https://azmarif.dev)
- **Email:** [hello@azmarif.dev](mailto:hello@azmarif.dev)
- **Username:** [@azmarifdev](https://github.com/azmarifdev)

---

### Brand Ecosystem Direction

This repository is intentionally named and structured for future expansion:

- `azmarifdev-starter` (current)
- `azmarifdev-advanced`
- `azmarifdev-saas`

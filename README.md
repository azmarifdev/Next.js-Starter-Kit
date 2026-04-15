# Next.js Minimal Starter Template

A polished, minimal, and demo-ready Next.js starter built for fast onboarding and clear architecture.

## 🚀 Quick Start

```bash
pnpm install
pnpm setup
pnpm dev
```

Open: http://localhost:3000

## 🔐 Demo Credentials

- Email: `admin@example.com`
- Password: `admin123`

- Email: `user@example.com`
- Password: `user123`

## 📦 Features

- Simple authentication flow (login, register, me, logout)
- Protected dashboard experience
- Modular UI features (`user`, `project`, `task`)
- Clean App Router pages and auth API routes
- Optional MongoDB integration for auth storage
- Demo banner and sample credentials for instant testing

## 🧠 Folder Structure

```text
src/
  app/        # routing, pages, and API routes
  modules/    # feature UI and local feature logic
  lib/        # core utilities (env, logger, db, auth)
  services/   # shared client-side helpers
```

## 📸 Screenshots

### Dashboard

![Dashboard Screenshot](public/assets/dashboard-screenshot.png)

### Login

![Login Screenshot](public/assets/login-screenshot.png)

## Public Assets

- `public/assets/logo.png`
- `public/assets/banner.png`

These are used in the marketing page and can be reused in docs or social previews.

## Useful Commands

```bash
pnpm setup   # create .env and .env.local from .env.example
pnpm seed    # seed demo users + sample collections into MongoDB
pnpm build   # production build check
```

## Notes

- Root route (`/`) redirects to `/dashboard` for direct product experience.
- Marketing page is available at `/marketing`.
- Intentionally avoids GraphQL, PostgreSQL, feature flags, and multi-auth complexity.

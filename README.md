# Next.js Starter-Kit

Tagline: Build production-like Next.js apps fast, with clean defaults and zero boilerplate stress.

A clean, minimal, and production-like Next.js starter kit with authentication, protected routes, modular features, and polished default UI.

![Starter Banner](public/assets/banner.png)

## Quick Start

1. Install dependencies

```bash
pnpm install
```

2. Create env files

```bash
pnpm setup
```

3. Start development server

```bash
pnpm dev
```

Open http://localhost:3000

## Demo Credentials

- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `user123`
- In-app demo banner explains where to explore after login.

## Features

- App Router structure with clear route boundaries
- Cookie-based auth (`login`, `register`, `me`, `logout`)
- Middleware guard for protected routes
- Modular feature folders (`auth`, `project`, `task`, `user`)
- Reusable UI primitives in `components/ui` (`button`, `input`, `card`, `dialog`, `toast`, `badge`)
- Shared reusable components in `components/shared`
- Global `Navbar` layout component with auth-aware actions
- Empty states for users, projects, and tasks
- Simple client API abstraction with central error handling
- Light/dark theme toggle

## Screenshots

### Dashboard

![Dashboard](public/assets/dashboard-screenshot.png)

### Login

![Login](public/assets/login-screenshot.png)

## Folder Structure

```text
src/
  app/                # Pages and API routes
  components/
    layout/           # Layout components (navbar)
    shared/           # Reusable app-level pieces
    ui/               # Base UI components
    landing/          # Marketing/home page sections
  modules/            # Feature modules (auth/project/task/user)
  services/           # API client
  lib/                # Auth/env/errors
  styles/             # Global styles
```

## Notes

- This starter kit runs in mock/demo mode by default.
- No real database is required to get started.
- `pnpm seed` is optional and currently a no-op helper.

## Developer Info

- Name: A. Z. M. Arif
- GitHub: https://github.com/azmarifdev
- Website: https://azmarif.dev

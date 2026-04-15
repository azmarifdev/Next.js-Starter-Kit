# Next.js Minimal Starter Template

A polished, beginner-friendly Next.js starter that stays simple while being practical for real-world projects.

## Quick Start

```bash
pnpm install
pnpm setup
pnpm dev
```

Open: http://localhost:3000

## Demo Credentials

- `admin@example.com` / `admin123`
- `user@example.com` / `user123`

## Features

- Clean Next.js App Router structure
- Auth API only (`login`, `register`, `logout`, `me`)
- Optional MongoDB auth-user storage
- Lightweight demo UX banner with default credentials
- Marketing landing page with CTA
- Local demo modules for users, projects, and tasks
- Flat and clear `lib/` utilities

## Folder Structure

```text
src/
  app/
    (marketing)/page.tsx
    api/v1/auth/
    dashboard/
    login/
    register/
    users/
    projects/
    tasks/
  components/common/
    demo-banner.tsx
  i18n/messages/
    en.json
  lib/
    auth.ts
    db.ts
    env.ts
    logger.ts
  modules/
    auth/
    user/
    project/
    task/
  services/
    apiClient.ts
  styles/
    globals.css
```

## Notes

- This template intentionally avoids GraphQL, PostgreSQL, feature flags, and multi-auth complexity.
- Replace local demo data in modules with your own backend when needed.

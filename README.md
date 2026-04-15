# Next.js Minimal Starter Template

A clean and beginner-friendly Next.js starter.

## Features

- Next.js App Router
- Simple custom auth (login/register)
- Simple REST API routes
- Core modules only: auth, user, project, task
- Optional MongoDB connection (simple setup)

## Quick Start

```bash
pnpm install
pnpm setup
pnpm dev
```

Open http://localhost:3000

## How To Run

1. Copy env file:

```bash
pnpm setup
```

2. Start development server:

```bash
pnpm dev
```

3. Optional MongoDB seed:

```bash
MONGODB_URI="your-uri" pnpm seed
```

Default demo login (without MongoDB):

- `admin@example.com` / `admin123`
- `user@example.com` / `user123`

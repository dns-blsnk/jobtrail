# Job Search Tracker

A full-stack monorepo for tracking job applications. Manage your job search across web and mobile with a shared backend and database.

## Structure

```text
apps/
  api/      NestJS REST API
  web/      Next.js web app (FSD)
  mobile/   React Native / Expo app
packages/
  types/    Shared TypeScript types
  config/   Shared configs (ESLint, TS)
  shared/   Shared utilities
```

## Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| API      | NestJS, Prisma 7, PostgreSQL        |
| Auth     | Passport.js (JWT + Local), next-auth v5 |
| Web      | Next.js 15, Zustand, TanStack Query |
| Mobile   | React Native, Expo                  |
| Infra    | Docker, Docker Compose              |
| Tooling  | pnpm workspaces, Turborepo          |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop

### Install

```bash
pnpm install
```

### Run locally

```bash
# All apps
pnpm dev

# Individually
pnpm dev:api
pnpm dev:web
pnpm dev:mobile
```

### Docker (API + PostgreSQL)

```bash
# Start
pnpm docker:up

# Stop
pnpm docker:down
```

Requires a `.env` file at the repo root — see `.env.example`.

## Mobile (Expo)

```bash
pnpm dev:mobile:ios
pnpm dev:mobile:android
pnpm dev:mobile:web
```

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Run all apps in watch mode   |
| `pnpm build`     | Build all apps               |
| `pnpm lint`      | Lint all apps                |
| `pnpm typecheck` | TypeScript check all apps    |
| `pnpm docker:up` | Start full stack via Docker  |

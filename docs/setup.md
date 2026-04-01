# Setup

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop (for containerized services)

## Local Setup

1. Install dependencies from the repo root:

```bash
pnpm install
```

2. Confirm workspace packages are visible:

```bash
pnpm -r --depth -1 list
```

## Workspace Basics

- This repo uses `pnpm-workspace.yaml` with `apps/*` and `packages/*`.
- Turborepo orchestrates tasks from the root (`dev`, `build`, `lint`, `typecheck`).
- App-level scripts are run through workspace filters.

Useful commands:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm --filter @job-search-tracker/api dev
```

## Development Run Model

- `apps/api`: run locally with NestJS watch mode.
- `apps/web`: will run locally with Next.js dev server.
- `apps/mobile`: runs locally with Expo tooling and is not containerized.

## Docker Usage in This Project

Docker is intended for a local production-like stack:
- API
- Web
- PostgreSQL

Planned workflow:
1. Add Dockerfiles under `infra/docker/api` and `infra/docker/web`.
2. Add root Compose config for `api + web + postgres`.
3. Use Docker for backend/web integration runs while keeping mobile local.

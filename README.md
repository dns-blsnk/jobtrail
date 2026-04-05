# Job Search Tracker + AI

Monorepo for a production-oriented job search tracking platform with AI support. The repository is structured to support backend, web, and mobile applications with shared packages and infrastructure configuration in one workspace.

## Monorepo Structure

```text
apps/
  api/      NestJS API
  web/      Next.js app (planned, FSD)
  mobile/   React Native / Expo app (planned, pragmatic FSD)
packages/   Shared packages
infra/      Docker and infrastructure configs
```

## Main Stack

- pnpm workspaces
- Turborepo
- NestJS (`apps/api`)
- Next.js (`apps/web`, planned)
- React Native + Expo (`apps/mobile`, planned)
- Docker + PostgreSQL (`infra`, planned runtime for api/web/db)

## Current Stage

Foundation setup in progress:
- root workspace and Turbo config are present
- `apps/api` is scaffolded and runnable
- `apps/web` and `apps/mobile` are placeholders
- Docker structure is prepared under `infra/docker`

## Docker API Local

Use Docker Compose from repository root:

```bash
# API + Postgres
pnpm docker:up:api

# stop containers
pnpm docker:down
```

Manual equivalent:

```bash
docker compose up --build api postgres
```

Docker Compose uses the `dev` target from `apps/api/Dockerfile`.

To build a production image later:

```bash
docker build -f apps/api/Dockerfile --target prod -t job-search-api:prod .
```

## Next Steps

1. Scaffold `apps/web` with FSD-ready structure.
2. Scaffold `apps/mobile` with pragmatic FSD for mobile.
3. Add Docker Compose for `api + web + postgres`.
4. Introduce database schema and migrations.
5. Add auth flow: registration and login.
6. Add job application tracking domain.

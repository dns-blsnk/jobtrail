FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# Workspace config + .npmrc (needed for node-linker=hoisted)
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./

# Only package.json files first (for install cache layer)
COPY apps/api/package.json apps/api/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --filter @job-search-tracker/api... --frozen-lockfile

# ─── Development ──────────────────────────────────────────────────────────────
FROM base AS dev

COPY apps/api apps/api
COPY packages packages

# Generate Prisma client at build time
RUN cd apps/api && npx prisma generate

ENV NODE_ENV=development
ENV API_PORT=4001

EXPOSE 4001

# Run migrations then start in watch mode
CMD ["sh", "-c", "cd apps/api && npx prisma migrate deploy && cd /app && pnpm --filter @job-search-tracker/api start:dev"]

# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS build

COPY apps/api apps/api
COPY packages packages

RUN cd apps/api && npx prisma generate
RUN pnpm --filter @job-search-tracker/api build

# ─── Production ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS prod

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /app/apps/api/prisma ./apps/api/prisma
COPY --from=build /app/apps/api/prisma.config.ts ./apps/api/prisma.config.ts
COPY --from=build /app/apps/api/package.json ./apps/api/package.json

ENV NODE_ENV=production
ENV API_PORT=4001

EXPOSE 4001

CMD ["sh", "-c", "cd apps/api && npx prisma migrate deploy && node dist/main"]

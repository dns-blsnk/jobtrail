FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --filter @job-search-tracker/api... --frozen-lockfile

FROM base AS dev

COPY apps/api apps/api
COPY packages packages

ENV NODE_ENV=development
ENV API_PORT=4001

EXPOSE 4001

CMD ["pnpm", "--filter", "@job-search-tracker/api", "start:dev"]

FROM base AS build

COPY apps/api apps/api
COPY packages packages

RUN pnpm --filter @job-search-tracker/api build

FROM build AS prod

ENV NODE_ENV=production
ENV API_PORT=4001

EXPOSE 4001

CMD ["pnpm", "--filter", "@job-search-tracker/api", "start:prod"]

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --filter @job-search-tracker/api... --frozen-lockfile

FROM deps AS build

COPY apps/api apps/api
COPY packages packages

RUN pnpm --filter @job-search-tracker/api build
RUN pnpm --filter @job-search-tracker/api --prod deploy /prod/api

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV API_PORT=4001

COPY --from=build /prod/api ./

EXPOSE 4001

CMD ["node", "dist/main.js"]

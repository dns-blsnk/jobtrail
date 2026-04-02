FROM node:20-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages

RUN pnpm install --filter @job-search-tracker/api... --frozen-lockfile

COPY apps/api ./apps/api

RUN pnpm --filter @job-search-tracker/api build

ENV NODE_ENV=production
ENV API_PORT=4001

EXPOSE 4001

CMD ["pnpm", "--filter", "@job-search-tracker/api", "start:prod"]

FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/mobile/package.json apps/mobile/package.json

RUN pnpm install --filter @job-search-tracker/mobile... --frozen-lockfile

COPY apps/mobile ./apps/mobile

ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

CMD ["pnpm", "--filter", "@job-search-tracker/mobile", "dev", "--", "--clear"]

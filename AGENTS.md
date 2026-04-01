# AGENTS

## Project Scope

Monorepo for Job Search Tracker + AI.

## Stack And Structure

- Workspace tooling: pnpm workspaces + Turborepo
- Apps:
  - `apps/api`: NestJS API
  - `apps/web`: Next.js web app (FSD)
  - `apps/mobile`: React Native / Expo app (pragmatic FSD)
- Shared code: `packages/*`
- Infrastructure: `infra/*`
- Docker target runtime: `api + web + postgres`
- Mobile stays in monorepo but runs locally

## Architecture Rules

- Web must use Feature-Sliced Design (FSD).
- Mobile must use pragmatic FSD with the same domain-oriented mindset, adapted for navigation and mobile-specific concerns.
- Keep one straightforward approach.
- Do not propose or implement multiple alternative solutions.
- Avoid unnecessary abstractions and overengineering.

## Implementation Rules

- Keep configs minimal and production-like.
- Do not add comments in code unless necessary.
- Before making changes, explain the step briefly.
- After each step, provide command(s) to verify.
- Prefer small, incremental, verifiable changes.

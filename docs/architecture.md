# Architecture

## Overview

This repository uses a single monorepo for backend, web, mobile, shared code, and infrastructure. The goal is one clean development flow with pnpm workspaces and Turborepo, without splitting architecture decisions across multiple patterns.

## Monorepo Parts

### `apps/api`

NestJS backend API. It will own business logic, integration with the database, authentication, and application-tracking endpoints.

### `apps/web`

Next.js frontend using Feature-Sliced Design (FSD). The web app will follow domain-oriented layers to keep growth manageable as features like auth and tracking are added.

### `apps/mobile`

React Native / Expo app using a pragmatic FSD approach. It follows the same domain-oriented mindset as web, adapted for mobile realities: navigation flow, device APIs, offline/network behavior, and platform-specific UI concerns.

### `packages/*`

Shared packages for cross-app concerns such as types, shared utilities, configuration presets, and reusable domain contracts.

### `infra/*`

Infrastructure code and runtime definitions. This includes Docker files and compose configuration for local containerized services.

## Docker Role

Docker is used to run core backend web stack locally in a production-like way:
- API container
- Web container
- PostgreSQL container

The mobile app remains inside the monorepo for shared code and consistency, but it runs locally through Expo tooling rather than Docker.

## Future Direction

The next architectural layer will introduce:
- database schema and migration flow
- authentication (registration/login)
- job application tracking domain

These capabilities will be implemented with the same monorepo boundaries and shared package strategy.

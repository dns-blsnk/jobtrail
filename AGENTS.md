# Media Frontend — AI Agent Guidelines

**Project:** Next.js application with Feature Sliced Design (FSD) architecture.  
**Objective:** Produce maintainable, high-quality code following strict architectural rules.

See `./README.md` for additional project context.

---

## 🚨 CRITICAL RULES — Non-Negotiable

### Rule 1: NO Barrel Exports (index.ts)

**❌ FORBIDDEN:**

```ts
// ❌ Do NOT import from directories
import { UserProfile } from '@/features/user';

// ❌ Do NOT create index.ts files
// src/features/user/index.ts
export { UserProfile } from './ui/UserProfile';
```

**✅ REQUIRED:**

```ts
// ✅ ALWAYS import directly from file paths
import { useUser } from '@/features/user/hooks/useUser';
import { UserProfile } from '@/features/user/ui/UserProfile';
```

**Why:** Barrel exports break tree-shaking, increase bundle size, and cause circular dependencies.

---

### Rule 2: Strict FSD Architecture

**Project Structure:**

```
src/
├── features/       # Business features (isolated, no cross-imports)
├── entities/       # Domain models
├── shared/         # Reusable utilities, UI primitives
├── widgets/        # Composite UI blocks
└── fsd-app/        # App config (routing, providers, intl)
```

**Import Rules (Hierarchy):**

- `features/` → CAN import from `entities/`, `shared/`
- `features/` → CANNOT import from other `features/`
- `entities/` → CAN import from `shared/`
- `entities/` → CANNOT import from `features/`
- `shared/` → CANNOT import from `features/` or `entities/`

**Why:** FSD prevents spaghetti architecture and enforces scalable boundaries.

---

## Core Principles

1. **Precision:** Follow requirements exactly. No deviations.
2. **Planning:** Write step-by-step plan + pseudocode with explicit file paths before coding.
3. **Quality:** DRY, bug-free, complete implementations. No TODOs or placeholders.
4. **Clarity:** Readable over clever. Optimize only when required.
5. **TypeScript Strict:** Full type coverage. No `any` types.
6. **Honesty:** State uncertainty clearly. Ask for clarification when needed.

---

## Naming Conventions

| Item                 | Convention   | Example                                     |
| -------------------- | ------------ | ------------------------------------------- |
| Components, Types    | `PascalCase` | `UserProfile`, `UserDto`                    |
| Directories, SCSS    | `kebab-case` | `user-profile/`, `user-profile.module.scss` |
| Functions, Variables | `camelCase`  | `fetchUser`, `userData`                     |
| Constants, Env Vars  | `UPPERCASE`  | `API_BASE_URL`, `NEXT_PUBLIC_KEY`           |

---

## Development Workflow

### 1. Plan & Pseudocode

- List ALL modules, components, hooks, APIs with **full file paths**
- Write detailed pseudocode covering logic, state, errors, edge cases
- Example:
  ```
  File: src/features/user/ui/UserProfile.tsx
  File: src/features/user/hooks/useUser.ts
  File: src/features/user/api/userApi.ts
  ```

### 2. Confirm & Implement

- Flag significant trade-offs before proceeding
- Write complete implementations (no TODOs)
- Use TypeScript strict mode

### 3. Verification (MANDATORY)

Run these checks before marking complete:

```bash
# Check 1: No barrel exports exist
grep -r "export.*from" src/**/index.ts
# Expected: Zero results

# Check 2: No directory imports
grep -rE "from ['\"]@/(features|entities|shared)/\w+['\"]" src/
# Expected: Zero results (all imports must include file paths)
```

**Additional Checks:**

- [ ] All imports use full file paths
- [ ] No cross-feature imports
- [ ] TypeScript builds without errors
- [ ] No `console.log` or `any` types remain
- [ ] All text uses translation files (`src/fsd-app/intl`)

---

## TypeScript Standards

**Interfaces:**

```ts
// ✅ Clear, exported interfaces for all public APIs
export interface UserDto {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string | null;
}
```

**Best Practices:**

- Use `strict` mode
- Define interfaces for props, API responses, state
- Use type guards for complex domain types
- Prefer generics for reusable utilities

---

## Component Guidelines

- **Functional components** with explicit props interfaces
- Extract logic to **custom hooks** (`useUserData`, `usePagination`)
- Use `.module.scss` with `kebab-case` filenames
- Keep presentational components pure (no side effects)

**Example:**

```tsx
// src/features/user/ui/UserCard.tsx
interface UserCardProps {
  user: UserDto;
  onSelect: (id: string) => void;
}

export const UserCard = ({ user, onSelect }: UserCardProps) => {
  // Implementation
};
```

---

## State & Data Management

| Scenario        | Tool                     | When to Use                               |
| --------------- | ------------------------ | ----------------------------------------- |
| Component state | `useState`, `useReducer` | Local UI state                            |
| Global state    | **Zustand**              | Cross-cutting shared state (single store) |
| Remote data     | **SWR**                  | All API fetching, caching, mutations      |

**Never:** Create multiple Zustand stores or use for API data.

---

## Error Handling

- Use **Error Boundaries** at top-level UI sections
- Show user-friendly messages with retry actions
- All user-facing text → translation files (`src/fsd-app/intl`)
- Handle loading/empty states gracefully

---

## Common Mistakes (AVOID)

| ❌ Wrong                                   | ✅ Correct                                          |
| ------------------------------------------ | --------------------------------------------------- |
| `export { X } from './ui/X'` in `index.ts` | Direct import: `@/features/user/ui/UserProfile`     |
| `import { User } from '@/features/user'`   | `import { User } from '@/features/user/types/User'` |
| `features/auth` → `features/user`          | Move shared logic to `entities/` or `shared/`       |
| Relative paths: `../../../shared/ui`       | Absolute: `@/shared/ui/Button`                      |
| `any` types                                | Proper TypeScript interfaces                        |

---

## Pre-Code Checklist

Before writing code, confirm:

- [ ] Plan includes all file paths (e.g., `src/features/user/ui/UserProfile.tsx`)
- [ ] No `index.ts` files planned
- [ ] All imports will use full file paths
- [ ] FSD layer boundaries respected (no upward/cross-feature imports)
- [ ] TypeScript interfaces defined for all public APIs

---

## Completion Checklist

Before submitting:

- [ ] Verification grep commands pass (zero violations)
- [ ] All imports are direct file paths
- [ ] FSD structure verified (no boundary violations)
- [ ] TypeScript strict mode passes
- [ ] No TODOs, placeholders, `console.log`, or `any` types
- [ ] Semantic HTML, keyboard navigation, alt text included
- [ ] Tests pass (if applicable)
- [ ] Lint and build pass locally

---

## Enforcement

**Agent Verification Required:**

If any of these fail, implementation is REJECTED:

1. `grep -r "index.ts" src/` → Must return ZERO barrel files
2. All imports must include file names (not just directories)
3. No cross-feature imports (`features/A` → `features/B`)
4. TypeScript compiles with zero errors

**Communication:** Be concise. State uncertainties clearly. Document trade-offs.

---

## Git Conventions
- Create commits after completing each logical unit of work.
- Do not push to the remote repository unless asked.
- Use conventional commit messages (feat:, fix:, refactor:, docs:)
- Keep subject lines under 72 characters
- Always run tests before committing

---

_Last updated: 2026-06-08_

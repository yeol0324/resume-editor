---
name: feature-sliced-design
description: >
  Feature-Sliced Design (FSD) architectural methodology for frontend applications.
  Apply when creating new features, structuring folders, refactoring modules,
  resolving import dependencies, or making architectural decisions.
  Triggers: project structure, file organization, module boundaries, layer/slice/segment decisions.
---

# Feature-Sliced Design (FSD) Architecture Guide

## Overview

FSD organizes frontend code through three hierarchical units: **Layers → Slices → Segments**.

**Core Principles:**

1. Upper layers may import from lower layers only. Reverse imports are prohibited.
2. Slices within the same layer must not import from each other.
3. All cross-slice imports must go through the Public API (`index.ts`).

---

## Layer Hierarchy

```
app → pages → widgets → features → entities → shared
(highest)                                     (lowest)
```

| Layer      | Responsibility                                          |
| ---------- | ------------------------------------------------------- |
| `app`      | App initialization, global providers, routing config    |
| `pages`    | Route-level page components                             |
| `widgets`  | Composite, self-contained UI blocks reused across pages |
| `features` | User-facing business actions                            |
| `entities` | Business domain models and data                         |
| `shared`   | Framework-agnostic utilities, UI kit, config            |

### Allowed Import Matrix

| From       | Allowed to import                          |
| ---------- | ------------------------------------------ |
| `app`      | pages, widgets, features, entities, shared |
| `pages`    | widgets, features, entities, shared        |
| `widgets`  | features, entities, shared                 |
| `features` | entities, shared                           |
| `entities` | shared                                     |
| `shared`   | — (none)                                   |

---

## Import Rules

Use absolute path aliases. Direct internal path imports and relative cross-layer imports are prohibited.

```typescript
// ✅ Correct — absolute path via Public API
import { LoginForm, useAuth } from '@/features/auth';
import { Button } from '@/shared/ui';

// ❌ Violation — internal path import
import { LoginForm } from '@/features/auth/ui/LoginForm';

// ❌ Violation — relative cross-layer import
import { Button } from '../../../shared/ui/Button';
```

**Recommended import order within a file:**

```typescript
// 1. External libraries
// 2. widgets
// 3. features
// 4. entities
// 5. shared
// 6. Local (same slice)
```

**Path alias configuration (`tsconfig.json`):**

```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } } }
```

---

## Public API Pattern

Each slice exposes its interface exclusively through `index.ts`.

```typescript
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { useAuth } from './model/useAuth';
export type { User } from './model/types';
```

Export only what external layers require. Internal files (`api/`, `lib/`) must not be exported unless consumed externally.

---

## Segment Structure

```
features/auth/
├── ui/       # React components
├── api/      # Server communication
├── model/    # State, business logic, types
├── lib/      # Slice-scoped utilities (optional)
├── config/   # Constants (optional)
└── index.ts  # Public API (required)
```

Create segments only when content justifies them. For 1–2 files, a flat slice structure is acceptable.

---

## Decision Guide

When placing code, apply the following logic:

```
No business context, fully reusable?
  → shared

Business domain model (data shape, CRUD)?
  → entities/{domain}

User-facing action with business logic?
  → features/{action}

Composite UI block reused across pages?
  → widgets/{block}

Route-level page component?
  → pages/{route}

App initialization, providers, router?
  → app
```

**Pre-commit checklist for new slices:**

- [ ] `index.ts` (Public API) created
- [ ] No same-layer cross-slice imports
- [ ] No upward layer imports
- [ ] All imports reference Public API paths, not internal paths
- [ ] Segments created only where content exists

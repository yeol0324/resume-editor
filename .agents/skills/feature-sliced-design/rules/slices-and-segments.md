---
title: Slices, Segments, and Public API
impact: HIGH
tags: architecture, slices, segments, public-api, isolation, encapsulation
---

## Slices

Slices are subdirectories within a layer, each scoped to a single business domain.

```
features/
├── auth/
├── cart/
└── checkout/
```

### Isolation Rule

Slices at the same layer level must not import from one another. This ensures each slice can be modified, tested, or removed independently.

**Incorrect:**

```typescript
// ❌ features/auth/model/useAuth.ts
import { addToCart } from '@/features/cart';     // same-layer import

// ❌ entities/order/model/useOrder.ts
import { getUser } from '@/entities/user';        // same-layer import
```

**Correct — compose in an upper layer:**

```typescript
// ✅ pages/checkout/ui/CheckoutPage.tsx
import { LoginForm } from '@/features/auth';
import { CartSummary } from '@/features/cart';
import { PaymentForm } from '@/features/payment';
```

**When shared logic is needed between slices**, extract it to a lower layer:

```typescript
// ✅ shared/lib/validation.ts
export const validateEmail = (email: string): boolean => { ... };

// features/auth/model/useAuth.ts
import { validateEmail } from '@/shared/lib/validation';

// features/user-settings/model/useUserSettings.ts
import { validateEmail } from '@/shared/lib/validation';
```

For minimal, self-contained utilities, duplication across slices is acceptable.

---

## Segments

Segments organize files within a slice by technical purpose.

```
features/auth/
├── ui/
│   └── LoginForm.tsx
├── api/
│   └── authApi.ts
├── model/
│   ├── useAuth.ts
│   └── types.ts
├── lib/
│   └── validation.ts     # optional
├── config/
│   └── authConfig.ts     # optional
└── index.ts
```

### Segment Definitions

**`ui`** — React components and their styles.

```typescript
// features/auth/ui/LoginForm.tsx
export const LoginForm = () => <form>...</form>;
```

**`api`** — Server communication, data fetching.

```typescript
// features/auth/api/authApi.ts
export const loginUser = async (credentials: Credentials) =>
  fetch('/api/login', { method: 'POST', body: JSON.stringify(credentials) });
```

**`model`** — State management, business logic, type definitions.

```typescript
// features/auth/model/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  return { user, login, logout };
};
```

**`lib`** — Utility functions scoped to this slice. _(optional)_

**`config`** — Constants and configuration values. _(optional)_

### Guidelines

- Create a segment only when it contains more than one or two files.
- For small slices, a flat structure within the slice root is acceptable.
- `ui` and `model` are the most commonly required segments.
- Every slice must include `index.ts` regardless of its size.

---

## Public API Pattern

Each slice must expose its interface exclusively through `index.ts`. Consumers must import from this file only — never from internal paths.

### Incorrect

```typescript
// ❌ Importing directly from internal files
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { useAuth } from '@/features/auth/model/useAuth';
```

### Correct

```typescript
// ✅ features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { useAuth } from './model/useAuth';
export type { User } from './model/types';

// ✅ Consumer
import { LoginForm, useAuth, type User } from '@/features/auth';
```

### Guidelines

- Export only what external layers require. Internal implementation details must remain private.
- Use named exports for tree-shaking compatibility.
- Use `export type` for type-only exports.
- Avoid `export *` — wildcard exports obscure the public interface.

**Incorrect — over-exporting:**

```typescript
// ❌ features/auth/index.ts
export * from './ui';     // exposes internal test utilities
export * from './model';  // exposes internal state details
export * from './api';    // exposes internal API functions
```

**References:**

- [FSD Slices](https://feature-sliced.design/docs/reference/slices-segments#slices)
- [FSD Segments](https://feature-sliced.design/docs/reference/slices-segments#segments)
- [FSD Public API](https://feature-sliced.design/docs/reference/public-api)

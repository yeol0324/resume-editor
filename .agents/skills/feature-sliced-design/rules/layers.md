---
title: Layer Structure and Dependency Rules
impact: CRITICAL
tags: architecture, layers, structure, dependencies
---

## Layers

FSD defines six standardized layers, each with a distinct responsibility and a fixed position in the dependency hierarchy.

```
src/
├── app/        # Application initialization
├── pages/      # Route-level page components
├── widgets/    # Composite, self-contained UI blocks
├── features/   # User-facing business actions
├── entities/   # Business domain models
└── shared/     # Framework-agnostic utilities and UI kit
```

### Layer Definitions

**`app`** — Entry point, global configuration, providers, routing setup. Must not contain business logic or domain-specific code.

**`pages`** — Components that map directly to application routes. Composes widgets, features, and entities; does not implement business logic directly.

**`widgets`** — Self-contained, composite UI blocks used across multiple pages (e.g., `Header`, `Sidebar`, `CommentFeed`). Encapsulates layout and interaction logic for a specific UI region.

**`features`** — Units of user-facing functionality with business value (e.g., `AddToCart`, `AuthForm`, `ToggleFavorite`). Each feature represents a single user action or workflow.

**`entities`** — Business domain models. Responsible for data representation and server communication (e.g., `User`, `Product`, `Order`). Contains data fetching, type definitions, and domain-specific UI.

**`shared`** — Reusable code with no dependency on business context. Subfolders: `ui/`, `lib/`, `api/`, `config/`. Must not import from any other layer.

> Not all layers must be present. Omit layers that have no content.

---

## Dependency Rules

Imports must flow in one direction only — from higher layers to lower layers.

```
app → pages → widgets → features → entities → shared
```

### Allowed Import Matrix

| From       | Allowed to import                          |
| ---------- | ------------------------------------------ |
| `app`      | pages, widgets, features, entities, shared |
| `pages`    | widgets, features, entities, shared        |
| `widgets`  | features, entities, shared                 |
| `features` | entities, shared                           |
| `entities` | shared                                     |
| `shared`   | — (none)                                   |

### Incorrect

```typescript
// ❌ Upward dependency — entities importing from features
// entities/user/model/useUser.ts
import { logout } from '@/features/auth';

// ❌ Upward dependency — shared importing from entities
// shared/ui/Button.tsx
import { User } from '@/entities/user';

// ❌ Same-layer cross-slice import
// features/payment/api/paymentApi.ts
import { useCart } from '@/features/cart';
```

### Correct

```typescript
// ✅ features importing from lower layers
// features/auth/model/useAuth.ts
import { User } from '@/entities/user';
import { apiClient } from '@/shared/api';

// ✅ pages composing widgets, features, and entities
// pages/checkout/ui/CheckoutPage.tsx
import { OrderSummary } from '@/widgets/order-summary';
import { LoginForm } from '@/features/auth';
import { Product } from '@/entities/product';
```

### Resolving Cross-Layer Dependencies

When two slices at the same layer require shared logic, extract it to a lower layer rather than importing between them.

```typescript
// ✅ Shared logic extracted to entities
// entities/cart/lib/calculateTotal.ts
export const calculateTotal = (items: CartItem[]) => { ... };

// features/cart/model/useCart.ts
import { calculateTotal } from '@/entities/cart';

// features/checkout/model/useCheckout.ts
import { calculateTotal } from '@/entities/cart';
```

**References:**

- [FSD Layers](https://feature-sliced.design/docs/reference/layers)
- [FSD Import Rules](https://feature-sliced.design/docs/reference/isolation)

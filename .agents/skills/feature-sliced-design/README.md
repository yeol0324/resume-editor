# Feature-Sliced Design (FSD) Architecture

An architectural methodology for structuring frontend applications through standardized layers, business-domain slices, and technical-purpose segments.

## Document Structure

| File                     | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `SKILL.md`               | AI agent reference — rules summary, decision guide, pre-commit checklist |
| `layers.md`              | Layer definitions, responsibilities, and dependency rules                |
| `slices-and-segments.md` | Slice isolation, segment conventions, and Public API pattern             |
| `migration-guide.md`     | Step-by-step guide for migrating existing projects to FSD                |

## Core Concepts

### Three-Level Hierarchy

```
Layer → Slice → Segment
```

- **Layer**: Standardized top-level directory (`app`, `pages`, `widgets`, `features`, `entities`, `shared`)
- **Slice**: Subdirectory within a layer, scoped to a single business domain
- **Segment**: Subdirectory within a slice, organized by technical purpose (`ui`, `api`, `model`, `lib`, `config`)

### Fundamental Rules

1. **Unidirectional dependencies** — Upper layers import from lower layers only.
2. **Slice isolation** — Slices within the same layer must not import from each other.
3. **Public API** — All cross-slice communication goes through `index.ts`.

## References

- [Feature-Sliced Design Official Documentation](https://feature-sliced.design)
- [Layers Reference](https://feature-sliced.design/docs/reference/layers)
- [Slices & Segments Reference](https://feature-sliced.design/docs/reference/slices-segments)
- [Public API Reference](https://feature-sliced.design/docs/reference/public-api)

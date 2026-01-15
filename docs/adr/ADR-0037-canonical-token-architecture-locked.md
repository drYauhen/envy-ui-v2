# ADR-0037: Canonical Token Architecture - Locked

**Status:** Accepted (Implemented)
**Date:** 2026-01-10
**Last Updated:** 2026-01-10
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [Token Architecture](../architecture/ARCH-tokens-003-token-architecture.md) — Canonical architectural rules (normative)
- [Token Usage Rules](../architecture/ARCH-tokens-004-token-usage-rules.md) — Enforceable token usage rules
- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture (superseded)
- [ADR-0023](./ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization (superseded)
- [ADR-0041](./ADR-0041-dtcg-schema-resolution-and-token-architecture.md) — DTCG Schema Resolution

---

## Context

The token system has evolved through multiple iterations and architectural changes. Previous ADRs (0017, 0023) described transitional structures that have been superseded by the current canonical implementation.

The current token architecture has achieved:
- Zero literal leaks outside primitives
- Zero self-alias references
- Clear separation of canon/knowledge/legacy
- Stable Primitives → Raw → Semantics → Themes → Components resolution chain
- Validated referential integrity across all layers

This ADR locks the current canonical architecture to prevent future architectural drift and provide a stable reference for all token-related work.

## Decision

I decided to lock the current token architecture as the canonical implementation. All future changes must either:
1. Extend the canon explicitly (adding new contexts, themes, or token domains)
2. Require a new ADR explaining the architectural change

### Canonical Token Architecture

**Structure:**
```
tokens/
├── primitives/          # Literal values only (source of truth)
│   ├── border.json      # Border widths, styles
│   ├── breakpoints.json # Responsive breakpoints
│   ├── dimension.json   # Spacing, sizing
│   ├── filter.json      # Visual filters
│   ├── layout.json      # Layout primitives
│   ├── neutral.json     # Neutral color scale (OKLCH)
│   ├── opacity.json     # Opacity values
│   ├── shadow.json      # Shadow definitions
│   ├── spacing.json     # Spacing scale
│   ├── transition.json  # Transition definitions
│   ├── typography.json  # Typography primitives
│   └── z-index.json     # Z-index scale
├── contexts/            # Context-specific token layers
│   └── app/             # Application context
│       ├── raw/         # Context-namespaced aliases to primitives
│       │   ├── border.json
│       │   ├── breakpoints.json
│       │   ├── colors.json
│       │   ├── dimension.json
│       │   ├── filter.json
│       │   ├── layout.json
│       │   ├── opacity.json
│       │   ├── shadow.json
│       │   ├── shape.json
│       │   ├── spacing.json
│       │   ├── transition.json
│       │   ├── typography.json
│       │   └── z-index.json
│       ├── semantics/   # Meaning-based aliases to raw
│       │   ├── border.json
│       │   ├── breakpoints.json
│       │   ├── colors/
│       │   ├── dimension.json
│       │   ├── filter.json
│       │   ├── layout/
│       │   ├── opacity.json
│       │   ├── shape.json
│       │   ├── shadow.json
│       │   ├── transition.json
│       │   ├── typography/
│       │   └── z-index.json
│       ├── themes/      # Override-only aliases to semantics
│       │   ├── accessibility.json
│       │   └── default.json
│       └── components.json # Component contracts
├── knowledge/           # Documentation/workflow (excluded from render)
│   ├── components/      # Component contracts/specifications
│   ├── report/          # Reporting/documentation data
│   └── storybook/       # Storybook-specific configurations
└── legacy/              # Quarantined historical artifacts (excluded from render)
    ├── architecture-v1/ # Old flat token structure
    └── themes-v1/       # Old flat theme structure
```

**Token Resolution Chain:**
```
Primitives → Raw → Semantics → Themes → Components
```

### Canonical Rules (Non-Negotiable Invariants)

1. **Literal values live only in `tokens/primitives/**`**
   - No literals in contexts, themes, or components
   - Primitives are the single source of truth

2. **`tokens/contexts/*/raw/**` are alias-only**
   - Must use context namespace: `eui.app.raw.*`
   - Only reference primitives
   - Act as migration buffer for future changes

3. **`tokens/contexts/*/semantics/**` are meaning-based aliases**
   - Only reference raw layer: `{eui.app.raw.*}`
   - Define semantic meaning (background, text, border, focus)
   - Never reference primitives directly

4. **`tokens/contexts/*/themes/**` are override-only**
   - Only reference semantics: `{eui.color.*}`, `{eui.focus.*}`, etc.
   - Never introduce new values or reference primitives
   - Only override what differs from base context

5. **Zero self-alias references**
   - No `x -> {x}` anywhere in canon
   - All references must be meaningful aliases to previous layers

6. **`tokens/knowledge/**` is excluded from render**
   - Contains documentation, contracts, schemas, generation hints
   - Not part of token resolution pipeline

7. **`tokens/legacy/**` is quarantined**
   - Historical artifacts preserved for reference
   - Excluded from all render pipelines

### Directory Classification

| Directory | Purpose | Render Pipeline | Status |
|-----------|---------|-----------------|--------|
| `tokens/primitives/` | Literal source of truth | ✅ Included | Canonical |
| `tokens/contexts/**/raw/` | Context namespaced aliases | ✅ Included | Canonical |
| `tokens/contexts/**/semantics/` | Meaning-based aliases | ✅ Included | Canonical |
| `tokens/contexts/**/themes/` | Override-only aliases | ✅ Included | Canonical |
| `tokens/contexts/**/components.json` | Component contracts | ✅ Included | Canonical |
| `tokens/knowledge/` | Documentation/workflow | ❌ Excluded | Workflow |
| `tokens/legacy/` | Historical quarantine | ❌ Excluded | Legacy |

### Build System Enforcement

**Style Dictionary Configuration:**
```javascript
// Explicit exclusion of non-canonical directories
source: (() => {
  const allJsonFiles = globSync(path.join(repoRoot, 'tokens', '**', '*.json'), {
    ignore: [
      path.join(repoRoot, 'tokens', '**', '*.meta.json'),
      path.join(repoRoot, 'tokens', 'legacy', '**', '*.json'),    // ❌ Excluded
      path.join(repoRoot, 'tokens', 'knowledge', '**', '*.json')  // ❌ Excluded
    ]
  });
  return allJsonFiles;
})()
```

**Validation Rules:**
- No literal values outside `tokens/primitives/**`
- No self-alias references (`x -> {x}`)
- All references follow the resolution chain
- Context raw uses proper namespacing (`eui.app.raw.*`)

## Rationale

### Why Lock the Architecture

The token system has achieved architectural stability after multiple iterations. The current structure provides:

- **Referential Integrity**: Clean dependency chain with no circular references
- **Maintainability**: Clear separation of concerns and responsibilities
- **Scalability**: Easy extension without breaking existing contracts
- **Validation**: Automated enforcement of architectural rules
- **Documentation**: Single source of truth for architectural decisions

### Why This Structure

**Primitives as Source of Truth:**
- Single location for all literal values
- Easy to audit and maintain
- Clear upgrade path for design system changes

**Raw Layer as Migration Buffer:**
- Context-specific namespacing (`eui.app.raw.*`)
- Allows future migration of truth into contexts
- Provides stable interface for semantics

**Semantics as Meaning Layer:**
- Human-readable token names (background, text, focus)
- Stable interface for components and themes
- Clear separation of "what" vs "how"

**Themes as Override Layer:**
- Only override what differs
- No new value introduction
- Composable across contexts

**Knowledge/Legacy Separation:**
- Clear distinction between active canon and supporting materials
- Prevents accidental consumption of non-canonical tokens
- Preserves historical context for future reference

### Alignment with Previous ADRs

This ADR supersedes:
- **ADR-0017**: Described transitional layered architecture
- **ADR-0023**: Described context/theme separation (now implemented)

The canonical architecture implements the intent of these ADRs but with refined structure based on implementation experience.

## Consequences

### Positive

- **Architectural Stability**: Locked canon prevents future drift
- **Developer Clarity**: Single source of truth for architectural decisions
- **Automated Enforcement**: Build system validates canonical rules
- **Future-Proofing**: Clear path for extending without breaking contracts
- **Maintainability**: Clean separation makes changes predictable

### Implementation Requirements

**Immediate:**
- All documentation must reflect the canonical structure
- Build validation enforces canonical rules
- New token work must follow canonical patterns

**Future Extensions:**
- Adding new contexts: Follow `tokens/contexts/{new}/` structure
- Adding new themes: Create `themes/{new}.json` with semantic references only
- Adding new token domains: Add to primitives, then raw, then semantics

### Migration Complete

The transition from previous architectures is complete:
- ✅ All literals moved to primitives
- ✅ All self-aliases eliminated
- ✅ Clean knowledge/legacy separation
- ✅ Build system enforcement in place
- ✅ Documentation aligned with reality

## Status

**Accepted (Implemented)** - Canonical token architecture locked and fully operational.

**Implementation Validation:**
- ✅ Zero literal leaks outside primitives
- ✅ Zero self-alias references
- ✅ Clean directory separation (canon/knowledge/legacy)
- ✅ Build system enforcement
- ✅ All token layers follow resolution chain
- ✅ Context raw uses proper namespacing
- ✅ Themes are override-only
- ✅ Components reference semantic layer

**Documentation Aligned:**
- ✅ ADR-0037 locks current canonical architecture
- ✅ Previous ADRs marked as superseded
- ✅ Architectural documentation updated
- ✅ Developer guides reflect current structure

## References

**Canonical Structure:**
- `tokens/primitives/` - Literal source of truth
- `tokens/contexts/*/raw/` - Context namespaced aliases
- `tokens/contexts/*/semantics/` - Meaning-based aliases
- `tokens/contexts/*/themes/` - Override-only aliases
- `tokens/knowledge/` - Documentation/workflow
- `tokens/legacy/` - Historical quarantine

**Resolution Chain:**
```
Primitives → Raw → Semantics → Themes → Components
```

**Build Enforcement:**
- Style Dictionary excludes knowledge/legacy
- Validation prevents literal leaks and self-aliases
- Context namespacing enforced

This ADR serves as the architectural foundation for all future token system work.

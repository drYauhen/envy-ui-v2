# ADR-0002: Data-Driven Storybook Pipeline via Style Dictionary

**Status:** Accepted  
**Date:** 2025-12-15  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:** [ADR-0001](./ADR-0001-react-aria-headless.md) (Headless / React Aria strategy)

---

## Context

After completing the initial architectural foundation of Envy UI v2 (design tokens, Style Dictionary, and system-level metadata), the next step was integrating Storybook as a visualization and validation tool.

Early iterations revealed several architectural issues:

- Storybook stories encoded token taxonomy (e.g. primitives, brand, semantic)
- Prefixing and naming logic leaked into the rendering layer
- Token grouping logic was duplicated between build tooling and Storybook
- Storybook began to accumulate design-system knowledge instead of acting as a consumer
- Derived build artifacts were mixed with source code during review

These issues made the system harder to evolve and increased the risk of inconsistency as the token system grew.

---

## Decision

I decided to treat **Storybook as a dumb renderer** and move all token knowledge into a **data preparation layer** built with **Style Dictionary**.

I made the following architectural decisions:

1. **Style Dictionary prepares Storybook-ready data**
   - Token filtering (e.g. colors only)
   - Token grouping and taxonomy
   - Display naming
   - CSS variable resolution
   - Stable, opinionated output shape

2. **Storybook consumes generated data only**
   - No token lists defined in stories
   - No grouping or taxonomy logic
   - No prefix or naming computation
   - No assumptions about token structure

3. A dedicated output is generated for Storybook consumption:

This file is treated as a **public data contract**, not an internal build artifact.

4. **system.meta.json** acts as a system-level contract:
- Defines shared metadata (e.g. token prefix)
- Consumed by Style Dictionary and other tooling
- Storybook does not derive or compute system rules itself

5. **Storybook stories are pure renderers**
- They iterate over provided data
- They render tokens visually
- They do not encode system semantics

---

## Consequences

### Positive

- Single source of truth for token structure and semantics
- Storybook scales automatically with token evolution
- No duplication of logic across tooling
- Generated data can be reused by other consumers:
- Documentation
- Automated tests
- Future Figma or code-generation tooling

### Trade-offs

- Requires custom Style Dictionary formats
- Requires stricter separation of concerns
- Slightly higher upfront complexity

These trade-offs are accepted in favor of long-term maintainability and system clarity.

---

## Explicit Rules

- Storybook must not encode token taxonomy, grouping, or naming logic
- All token semantics live in the build pipeline
- Derived artifacts (build outputs, static Storybook builds) are not committed to Git
- Git history and ADRs are used to document architectural evolution

---

## Notes

This decision establishes a repeatable pattern for future system layers
(e.g. spacing, typography, motion) and for additional consumers beyond Storybook.

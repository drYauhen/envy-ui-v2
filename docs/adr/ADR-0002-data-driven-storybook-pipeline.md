# ADR-0002: Data-Driven Storybook Pipeline via Style Dictionary

**Status:** Accepted

**Date:** 2025-12-15

**Last Updated:** 2026-01-08

**Owner:** Eugene Goncharov

**Assistance:** AI-assisted drafting (human-reviewed)

**Related:**

- [ADR-0001](./ADR-0001-react-aria-headless.md) — Headless / React Aria strategy

---

## Context

After completing the initial architectural foundation of Envy UI (design tokens, Style Dictionary, and system-level metadata), the next step was integrating Storybook as a visualization and validation tool.

Early iterations revealed several architectural issues:

- Storybook stories encoded token taxonomy (e.g. primitives, brand, semantic)
- Prefixing and naming logic leaked into the rendering layer
- Token grouping logic was duplicated between build tooling and Storybook
- Storybook began to accumulate design-system knowledge instead of acting as a consumer
- Derived build artifacts were mixed with source code during review

These issues made the system harder to evolve and increased the risk of inconsistency as the token system grew.

---

## Decision

I decided to establish **architectural separation by Storybook section purpose**, with different approaches for different use cases:

### Section-Specific Architecture

**1. Tokens Section (`/Tokens/`): Comprehensive Documentation Layer**
- **Purpose**: Educational token documentation and visualization
- **Approach**: Direct token imports for detailed, structured documentation
- **Rationale**: Need full control over presentation, educational content, and JSON structure display
- **Stories**: Rich, interactive documentation that teaches token relationships

**2. Component Sections (`/HTML + CSS/`, `/TSX (Clean)/`, etc.): Usage Examples**
- **Purpose**: Component testing, examples, and validation
- **Approach**: Generated data consumption ("dumb renderers")
- **Rationale**: Avoid duplication, ensure consistency, automatic updates
- **Stories**: Pure renderers that demonstrate component behavior

### Core Architectural Decisions

1. **Style Dictionary prepares Storybook-ready data**
   - Token filtering (e.g. colors only)
   - Token grouping and taxonomy
   - Display naming
   - CSS variable resolution
   - Stable, opinionated output shape

2. **Purpose-driven data consumption**
   - **Tokens section**: Direct imports (comprehensive docs)
   - **Component sections**: Generated data (consistency)
   - **Future sections**: Generated data (maintainability)

3. **Generated outputs serve as public contracts**
   - `generated/storybook/colors.json` - Available for future component stories
   - Treated as **public data contracts**, not internal artifacts
   - Can be consumed by docs, tests, and other tools

4. **system.meta.json** acts as a system-level contract:
- Defines shared metadata (e.g. token prefix)
- Consumed by Style Dictionary and other tooling
- Storybook does not derive or compute system rules itself

5. **Architectural clarity over universal rules**
- Different sections serve different purposes
- Accept that some sections need direct access for educational value
- Reserve "dumb renderer" approach for sections where it provides clear benefits

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

# ADR-0016: Prefix Unification to eui

**Status:** Accepted (Implemented)

**Date:** 2025-12-19

**Last Updated:** 2026-01-08

**Owner:** Eugene Goncharov

**Assistance:** AI-assisted drafting (human-reviewed)

---

## Context

The system supports a prefixing scheme across CSS variables, data attributes, and contracts. Multiple active prefixes (for example, env2-ui and ui) are now creating unnecessary surface area and friction without clear benefit at the current scale. The token semantic root and emitted prefix also diverged, creating risk for non–Style Dictionary generators and ad hoc tooling. Divergence between System Prefix and token root is unsafe because it splits semantic vs runtime flows and creates hidden coupling.

## Decision

I decided to unify the active prefix usage and token semantic root to a single canonical source prefix: **eui** (Envisio UI). The prefix system remains in place as an abstraction, but it will resolve to a single prefix for now.

## Rationale

- A single prefix improves consistency and reduces cognitive load.
- eui is short, readable, and globally unique for the design system.
- The prefix abstraction remains intact and can be expanded if future complexity justifies it.

## Consequences

- CSS custom properties, data attributes, and related contracts now use the eui prefix.
- Token JSON files now use eui as the semantic root, and emitted artifacts use eui as the prefix.
- Generators and tooling should treat the token root as the source of truth for the prefix.
- If multiple prefixes become necessary later, this ADR can be revised to re-enable them.

## Implementation Notes

This ADR has been **fully implemented** with a unified prefix system that eliminates confusion and establishes consistent naming across the entire design system:

### Current Implementation Status
- ✅ **Single Canonical Source**: `system.meta.json` defines `"prefix": "eui"` as the single source of truth
- ✅ **Token Semantic Root**: All token JSON files use `"eui": {` as the semantic root namespace
- ✅ **CSS Custom Properties**: Generated CSS uses `--eui-*` prefix consistently
- ✅ **Data Attributes**: Components use `data-eui-*` attributes (e.g., `data-eui-intent`, `data-eui-size`)
- ✅ **Class Names**: Components use `eui-*` class names (e.g., `eui-button`)
- ✅ **Contracts**: TypeScript contracts are semantic (no prefix needed)

### Technical Realization
- **Prefix Resolution**: All generators and components read from `system.meta.json` with fallback to `'eui'`
- **Consistency Enforcement**: Single prefix eliminates divergence between semantic and runtime flows
- **Future Expansion Ready**: Prefix abstraction remains intact for potential future multi-prefix scenarios
- **Global Uniqueness**: "eui" is short, readable, and globally unique for the Envisio UI design system

### Architecture Benefits Achieved
- **Cognitive Load Reduction**: Single prefix eliminates mental overhead of multiple naming schemes
- **Consistency Guarantee**: No risk of prefix divergence between token root and emitted artifacts
- **Tool Safety**: Non-Style Dictionary generators can safely rely on the unified prefix
- **Maintenance Simplicity**: Single source of truth for prefix changes

### Prefix Usage Examples
- **CSS Variables**: `--eui-card-variant-elevated-shadow`
- **Data Attributes**: `data-eui-intent="primary"`, `data-eui-hovered=""`
- **Class Names**: `eui-button`, `eui-card`
- **Component Props**: Intent values from contracts (semantic, no prefix)
- **Token Structure**: `"eui": { "color": { "brand": { ... } } }`

### Evolution Path
The unified prefix system provides:
- **Immediate Consistency**: All artifacts use the same "eui" prefix
- **Safe Refactoring**: Prefix changes require only updating `system.meta.json`
- **Scalability**: Future multi-prefix needs can be accommodated if complexity justifies
- **Standards Alignment**: Consistent with modern design system naming conventions

## Status

**Accepted (Implemented)** - Prefix unification to eui fully implemented with consistent usage across CSS variables, data attributes, class names, and token structure. Single source of truth established in system.meta.json.

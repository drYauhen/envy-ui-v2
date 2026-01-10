# Legacy Token Files

This directory contains token files that have been moved out of the active token system during architecture cleanup.

## Purpose

Following the **Token Architecture Cleanup Guidance**, this directory serves as a "quarantine area" for:

- **Workaround files** - Temporary solutions that solved immediate problems but violated architectural principles
- **Duplicate files** - Multiple versions of the same tokens that caused confusion
- **Experimental structures** - Files created during exploration that didn't fit the final architecture

## Current Contents

### `workarounds/`
Contains workaround files created to fix immediate Storybook startup issues:

- `colors/neutral.json` - App context neutral color scales (literal values)
- `colors/accent.json` - App context accent color scales (literal values)
- `colors/brand.json` - App context brand color scales (literal values)

**Why these were moved:**
- Created an unauthorized "Layer 1.5" between primitives and semantics
- Violated the canonical 3-layer architecture (Primitives → Semantics → Components)
- Duplicated color data that should be centralized in global primitives

**Architectural fix:**
- These values should come from global `tokens/foundations/` or `tokens/primitives/`
- Semantic tokens should reference global primitives directly
- No intermediate context-specific color layers

## Usage Guidelines

- **Do not include** legacy files in builds
- **Do not reference** legacy files from active token files
- **Keep for reference** - may contain insights for future architectural decisions
- **Safe to delete** after confirming all dependencies are resolved

## Restoration

If needed, files can be restored to active use, but this should be done deliberately with architectural review.

## Contact

See **Token Architecture Cleanup Guidance** for complete context and procedures.

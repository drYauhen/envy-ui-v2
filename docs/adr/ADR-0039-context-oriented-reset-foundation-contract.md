# ADR-0039: Context-Oriented Reset as Foundation Contract

**Status:** Accepted
**Date:** 2026-01-13
**Last Updated:** 2026-01-13
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0037](ADR-0037-canonical-token-architecture-locked.md) — Canonical Token Architecture (superseded by [ADR-0041](ADR-0041-dtcg-schema-resolution-and-token-architecture.md))
- [ADR-0041](ADR-0041-dtcg-schema-resolution-and-token-architecture.md) — DTCG Schema Resolution and Token Architecture Improvements
- [ADR-0017](ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes
- [ADR-0042](ADR-0042-density-axis-defaulting-and-inheritance.md) — Density Axis (Context x Theme x Density)

---

## Context

The design system currently lacks formalized reset/base styling. While components follow a strict token + contract + generation pipeline, reset behavior remains informal and inconsistent across contexts.

### Current State
- **No canonical reset strategy** - Reset behavior is implicit and scattered
- **Context-specific needs unaddressed** - Application, website, and report contexts have different reset requirements
- **Token separation unclear** - Reset policy vs. token values boundaries undefined
- **Generation gap** - Components use contracts, but reset does not

### Architectural Foundation
The system already implements token-driven component contracts (Badge as reference implementation):
- **Design tokens** provide values (colors, typography, spacing, etc.)
- **Contracts (JSON)** define structure, selectors, invariants, axes, and behavior
- **CSS generation** from tokens + contract

This model works for components and must be extended to foundation-level reset.

## Decision

**Implement reset/base styling as context-owned foundation contracts** following the established token + contract + generation pipeline.

### Key Architectural Decisions

1. **Reset is NOT a component** - Foundation-level artifact, not component-level
2. **Reset is NOT encoded in tokens** - Tokens provide values, reset defines policy
3. **Reset contracts consume tokens** - All values reference design tokens
4. **Context-owned reset strategy** - Each context (app/website/report) has its own reset
5. **Scoped selectors only** - No global unscoped reset on `body` or `*`
6. **Theme-independent** - No theme-specific selectors in canonical reset CSS
7. **Density-independent** - Reset does not encode density; density overrides apply via `data-eui-density`

### Reset Contract Structure

Following Badge component contract pattern, reset contracts include:

- **$schema** reference to foundation contract schema
- **foundation** identifier (not component)
- **selectors** scoped to context root (`[data-eui-context="app"]`)
- **invariants** for architectural constraints
- **axes** for context-specific behavior variations
- **foundationVars** with token references for all values
- **behavior** defining reset rules (normalize, typography baseline, element defaults)

### Context-Specific Reset Philosophies

#### Application Context (Interactive Product UI)
**Purpose:** Dense, interactive product interface

**Reset Philosophy:**
- Neutral baseline optimized for UI density
- No automatic vertical rhythm (handled by layout components)
- Typography baseline for predictable input/button inheritance
- Minimal element defaults to avoid layout interference

**Key Rules:**
- `p, h1–h6, ul, ol, dl` → `margin: 0`
- Typography inheritance for form controls
- Box-sizing, focus behavior normalization

#### Website Context (Template-Driven Content)
**Purpose:** Long-form content with controlled typography

**Reset Philosophy:**
- Readable typography with established vertical rhythm
- Default margins for content flow
- Print-safe color assumptions
- Content-appropriate spacing defaults

**Key Rules:**
- Controlled paragraph margins for reading flow
- Heading hierarchy with appropriate spacing
- Link styling suitable for content navigation
- Image/link behavior for content contexts

#### Report Context (HTML → PDF/Print)
**Purpose:** Print-optimized output with page controls

**Reset Philosophy:**
- Print-safe defaults and page break controls
- Typography units suitable for print (pt/mm)
- Orphan/widow control for PDF generation
- Page margins and @page rule support

**Key Rules:**
- `@page` rules for print margins
- `page-break-*` properties
- `orphans` and `widows` control
- Print-specific font stacks and sizing

### Contract Design Approach

**Option A: Single Contract with Context Axis** (Chosen)

```json
{
  "axes": {
    "context": {
      "type": "enum",
      "values": ["application", "website", "report"]
    }
  }
}
```

**Benefits:**
- Single contract file to maintain
- Context-specific behavior variations in one place
- Easier to ensure consistency across contexts
- Follows component contract pattern (Badge uses multiple axes)

### Token Usage Rules

**All values in reset contracts MUST reference design tokens:**
- Typography: `font-family`, `font-size`, `line-height`, `letter-spacing`
- Spacing: margins, padding values (when used)
- Colors: text colors, link colors, focus colors
- Dimensions: border widths, border radius

**Reset behavior/policy lives in the contract:**
- "p has margin or not" → contract decision
- "h1 has top margin" → contract decision
- "buttons inherit font settings" → contract decision

**No new design decisions in reset** - all visual values come from existing tokens.

## Consequences

### Positive

- **Formalized reset strategy** - Clear, documented approach to base styling
- **Context-appropriate defaults** - Each context gets optimized reset behavior
- **Token-driven values** - All visual decisions traceable to design tokens
- **Generation pipeline consistency** - Reset follows same pattern as components
- **Future-proof** - Easy to add new contexts or modify behavior
- **AI-assisted generation ready** - Structured contracts enable automated CSS generation

### Implementation Requirements

1. **Create foundation contract schema** - Extend component schema for foundation artifacts
2. **Implement reset contracts** - Single contract with context axis defining all reset behavior
3. **Build CSS generation** - Extend generation pipeline to handle foundation contracts
4. **Integrate loading order** - Ensure resets load before components in all contexts
5. **Test context switching** - Verify reset behavior changes appropriately per context

### Trade-offs

- **Contract complexity** - Single contract with context axis vs. separate contracts
- **Generation complexity** - Need foundation contract support in CSS generator
- **Loading order dependency** - Must ensure reset CSS loads before component CSS

### Non-Goals

- **Global reset replacement** - No `body` or `*` unscoped rules
- **Theme-specific reset** - Reset is theme-independent foundation
- **Legacy CSS migration** - Start fresh with contract-driven approach
- **Component reset overrides** - Components remain unchanged

## Implementation Status

- ✅ **ADR documented** - Context-oriented reset strategy defined
- ⏳ **Foundation contract schema** - Extend existing schema for foundation artifacts
- ⏳ **Reset contracts** - Implement context-axis contract with all reset behavior
- ⏳ **CSS generation** - Extend pipeline to generate foundation CSS files
- ⏳ **System integration** - Wire reset loading into context switching

## References

- **Badge Component Contract** - Reference implementation for contract structure
- **Component Contract Schema** - Base schema to extend for foundation contracts
- **Context Definitions** - Application/website/report context specifications
- **Token Architecture** - Design token structure and usage patterns

## Changelog

- 2026-01-13: Initial ADR documenting context-oriented reset foundation contract strategy

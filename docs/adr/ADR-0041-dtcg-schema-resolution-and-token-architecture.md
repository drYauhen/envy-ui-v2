# ADR-0041: DTCG Schema Resolution and Token Architecture Improvements

**Status:** Accepted
**Date:** 2026-01-07
**Last Updated:** 2026-01-07
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0017](ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes
- [ADR-0018](ADR-0018-typography-units-architecture-rem-em-px.md) — Typography Units Architecture
- [ADR-0023](ADR-0023-token-organization-context-and-theme-separation.md) — Token Organization - Context and Theme Separation

---

## Context

The design system encountered two critical issues with the DTCG (Design Tokens Community Group) implementation:

### Issue 1: Broken DTCG Schema References
All token files were referencing a broken external schema URL:
- `https://schemas.s1seven.com/style-dictionary/v3/schema.json` → 404 Not Found
- This caused validation errors and build instability
- Official DTCG specification ([2025](../steps/2025-12-20-step.md).10) is published as Technical Reports, not schema files

### Issue 2: Monolithic Typography Token Organization
Typography semantic tokens were stored in a single monolithic file:
- `tokens/app/semantic/typography/text-styles.json` contained 16+ text styles mixed together
- Poor maintainability and scalability for multi-context systems
- Difficult to manage and override specific typography categories

### Issue 3: Limited Token Viewer Capabilities
Token viewers lacked essential information:
- No resolved values display (only raw references)
- No visual previews for complex token types
- Limited developer experience for understanding token relationships

## Decision

I decided to implement a comprehensive solution addressing all three issues:

### 1. DTCG Schema Resolution Strategy

**Create Local DTCG [2025](../steps/2025-12-20-step.md).10 Schema:**
- Build `schemas/dtcg-2025.10-schema.json` based on official DTCG [2025](../steps/2025-12-20-step.md).10 format module
- Update all 200+ token files to reference the local schema
- Maintain DTCG compliance while eliminating external dependencies

**Benefits:**
- ✅ DTCG format compliance maintained
- ✅ No external dependency failures
- ✅ Local validation with IDE support
- ✅ Future-proof for official schema publication

### 2. Typography Token Logical Separation

**Replace monolithic structure with focused files:**
```
tokens/app/semantic/typography/
├── headings.json     # heading.1-6 (6 tokens)
├── titles.json       # title.lg/md/sm (3 tokens)
├── body.json         # body.* + bodyStrong.* (5 tokens)
├── labels.json       # label.* + caption + overline (4 tokens)
├── code.json         # code.base/small (2 tokens)
```

**Benefits:**
- ✅ **Selective Loading**: Components import only needed categories
- ✅ **Scalability**: Easy to add new categories without clutter
- ✅ **Maintainability**: Smaller, focused files
- ✅ **Context Overrides**: Each context can override specific categories

### 3. Enhanced Token Viewer Capabilities

**Add resolved values column:**
- TokenRefTable now displays "Resolved Value" alongside "Reference"
- Loads metadata from `*.meta.json` files
- Shows actual resolved values (e.g., "0.2857rem" instead of "{eui.dimension.1}")

**Benefits:**
- ✅ **Transparency**: Users see actual resolved values
- ✅ **Debugging**: Easier to understand token relationships
- ✅ **Developer Experience**: Clear understanding of token outputs

## Rationale

### Why Local DTCG Schema (Not Remove Schemas)

**Industry Alignment:**
- DTCG [2025](../steps/2025-12-20-step.md).10 specification defines JSON structure requirements
- Schema validation ensures token format compliance
- IDE support improves developer experience

**Risk Mitigation:**
- Official DTCG schema may be published in future
- Local schema can be updated to match official version
- Maintains validation benefits without external failures

### Why Logical Typography Separation (Not Monolithic)

**Scalability Requirements:**
- Multi-context systems (app/website/report) need selective overrides
- Component libraries may only need specific typography categories
- Future expansion without architectural changes

**Maintenance Benefits:**
- Smaller files are easier to review and modify
- Category-specific changes don't affect unrelated tokens
- Clear ownership and responsibility boundaries

### Why Resolved Values in Viewers (Not Just References)

**Developer Experience:**
- Raw references like `{eui.dimension.1}` are not actionable
- Resolved values like `0.2857rem` show actual outputs
- Essential for understanding token relationships

**Debugging Support:**
- Immediate visibility of token resolution
- Easier troubleshooting of token issues
- Better documentation of token behavior

## Consequences

### Positive

- **Reliability**: No more 404 schema errors
- **Maintainability**: Typography tokens organized logically
- **Developer Experience**: Token viewers show resolved values
- **Scalability**: Architecture supports future growth
- **Standards Compliance**: Maintains DTCG format alignment

### Trade-offs

- **Migration Required**: All token files updated to new schema
- **File Count Increase**: Typography split into 5 focused files
- **Build Process**: Metadata loading adds complexity to viewers

### Implementation Details

**Schema Migration:**
- Created `schemas/dtcg-2025.10-schema.json` based on DTCG [2025](../steps/2025-12-20-step.md).10 format module
- Bulk updated 200+ token files from broken URL to local schema
- Maintained all existing token structures and values

**Typography Refactoring:**
- Extracted styles from `text-styles.json` into logical files
- Preserved all existing token definitions and references
- Maintained backward compatibility in token resolution

**Viewer Enhancement:**
- Extended TokenRefTable with `showResolved` prop and metadata loading
- Added resolved values column to spacing and typography stories
- Integrated with existing metadata system

## Implementation Status

- ✅ **DTCG Schema**: Local schema created and deployed
- ✅ **Typography Structure**: Logical separation implemented
- ✅ **Token Viewers**: Resolved values column added
- ✅ **Build Verification**: All tokens build successfully
- ✅ **Documentation**: ADRs updated to reflect changes

## References

- **DTCG 2025.10 Specification**: https://www.designtokens.org/TR/2025.10/
- **DTCG Format Module**: https://www.designtokens.org/TR/2025.10/format/
- **Style Dictionary DTCG Support**: Native DTCG format implementation

## Changelog

- 2026-01-07: Initial ADR documenting DTCG schema resolution and token architecture improvements

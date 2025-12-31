# Architectural Decision Records (ADR)

This directory contains Architectural Decision Records (ADR) for Envy UI v2. ADRs document significant architectural decisions, their context, rationale, and consequences.

## Quick Start

- **Template:** [`ADR-TEMPLATE.md`](./ADR-TEMPLATE.md)
- **Workflow:** See [ADR Workflow](../workflows/adr-workflow.md) for complete guide

## ADR Principles

ADRs serve as:
- Historical record of architectural thinking
- Context for understanding why approaches were explored
- Reference material for reflection and analysis

ADRs are NOT:
- Current system documentation
- Authoritative description of present architecture
- Executable instructions for implementation

## ADR Status Values

Common status values:
- **Accepted** - Decision has been accepted and implemented
- **Exploratory** - Decision is being explored, not yet finalized
- **Proposed (Exploratory)** - Decision is proposed and in exploratory phase
- **Superseded** - Decision has been superseded by a later ADR

## Quick Checklist for New ADRs

After creating a new ADR, ensure:

1. ✅ File added to `adr-filename-map.ts`
2. ✅ Entry added to `adr-list-data.ts`
3. ✅ Stories generated: `npm run adr:generate`
4. ✅ Validation passed: `npm run adr:validate`
5. ✅ Mermaid diagrams tested (if any)
6. ✅ Links to other ADRs verified

**For detailed checklist and troubleshooting, see:** [`docs/workflows/adr-workflow.md`](../workflows/adr-workflow.md#common-pitfalls-and-validation-checklist)

## Related Files

- **Template:** `docs/adr/ADR-TEMPLATE.md`
- **Workflow:** `docs/workflows/adr-workflow.md` (detailed guide)
- **Storybook Overview:** `stories/docs/overview.stories.tsx`
- **ADR List:** `stories/viewers/docs/adr-list-data.ts`
- **ADR Viewer Component:** `stories/viewers/docs/AdrViewer.tsx`
- **Story Generator:** `scripts/generate-adr-stories.mjs`
- **Validator:** `scripts/validate-adr.mjs`


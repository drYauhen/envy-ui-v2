# Architectural Decision Records (ADR)

This directory contains Architectural Decision Records (ADR) for Envy UI v2. ADRs document significant architectural decisions, their context, rationale, and consequences.

## Quick Start

- **Template:** [`ADR-TEMPLATE.md`](./ADR-TEMPLATE.md)
- **Workflow:** See [ADR Workflow](../workflows/adr-workflow.md) for complete guide
- **Agent Guide:** See [ADR Agent Guide](./AGENT-GUIDE.md) for instructions to prevent broken links
- **General Docs Guide:** See [Documentation Guide](../DOCS-GUIDE.md) for all documentation (not just ADR)

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

1. ✅ Entry added to `adr-list-data.ts` FIRST (single source of truth)
2. ✅ File added to `adr-filename-map.ts`
3. ✅ ADR markdown file created
4. ✅ Stories generated: `npm run adr:generate` (or created manually)
5. ✅ Validation passed: `npm run adr:validate`
6. ✅ Storybook restarted (if new story file created)
7. ✅ Mermaid diagrams tested (if any)
8. ✅ Links to other ADRs verified

**For detailed checklist and troubleshooting, see:** [`docs/workflows/adr-workflow.md`](../workflows/adr-workflow.md#common-pitfalls-and-validation-checklist)

## Single Source of Truth

**⚠️ CRITICAL:** `stories/viewers/docs/adr-list-data.ts` is the **SINGLE SOURCE OF TRUTH** for all ADR metadata.

When creating or modifying ADRs:
1. Update `adr-list-data.ts` FIRST
2. Run `npm run adr:generate` to generate story files
3. Run `npm run adr:validate` to verify consistency

**See:** [`AGENT-GUIDE.md`](./AGENT-GUIDE.md) for complete instructions.

## Related Files

- **Template:** `docs/adr/ADR-TEMPLATE.md`
- **Workflow:** `docs/workflows/adr-workflow.md` (detailed guide)
- **Agent Guide:** `docs/adr/AGENT-GUIDE.md` (instructions for agents)
- **Single Source of Truth:** `stories/viewers/docs/adr-list-data.ts` ⚠️
- **Storybook Overview:** `stories/docs/adr/00-adr-overview.stories.tsx`
- **ADR Viewer Component:** `stories/viewers/docs/AdrViewer.tsx`
- **Story Generator:** `scripts/generate-adr-stories.mjs` (reads from adr-list-data.ts)
- **Validator:** `scripts/validate-adr.mjs` (checks exportName consistency)


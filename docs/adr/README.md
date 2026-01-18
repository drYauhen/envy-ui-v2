# Architectural Decision Records (ADR)

**Document ID:** README
**Status:** Draft
**Date:** 2026-01-15
**Last Updated:** 2026-01-15
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Reference
**Related:**


---

This directory contains Architectural Decision Records (ADR) for Envy UI. ADRs document significant architectural decisions, their context, rationale, and consequences.

**ADR is one section of the broader documentation system.** For general documentation rules (registry, link mapping, mermaid, assets), see [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md).

## Quick Start

- **Template:** [`ADR-TEMPLATE.md`](./ADR-TEMPLATE.md)
- **Workflow:** See [ADR Workflow](../workflows/WORKFLOW-001-adr-workflow.md) for complete guide
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

For the full ADR-specific checklist and troubleshooting, see:
[`docs/workflows/adr-workflow.md`](../workflows/adr-workflow.md#common-pitfalls-and-validation-checklist).

Short version:
1. Update `adr-list-data.ts` and `adr-filename-map.ts`
2. Create the ADR markdown file from the template
3. Run `npm run adr:generate` and `npm run adr:validate`
4. Restart Storybook if a new story file was created

## Single Source of Truth

**⚠️ CRITICAL:** `stories/viewers/docs/adr-list-data.ts` is the **SINGLE SOURCE OF TRUTH** for all ADR metadata.

When creating or modifying ADRs:
1. Update `adr-list-data.ts` FIRST
2. Run `npm run adr:generate` to generate story files
3. Run `npm run adr:validate` to verify consistency

**See:** [`AGENT-GUIDE.md`](./AGENT-GUIDE.md) for complete instructions.

**Docs registry note:** ADR entries are auto-registered from `adr-list-data.ts`. Do not add individual ADRs to `docs-registry.ts` (only ADR guide docs like README/TEMPLATE belong there). See [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md) for non-ADR registry rules.

## Related Files

- **Template:** `docs/adr/ADR-TEMPLATE.md`
- **Workflow:** `docs/workflows/adr-workflow.md` (detailed guide)
- **Agent Guide:** `docs/adr/AGENT-GUIDE.md` (instructions for agents)
- **Single Source of Truth:** `stories/viewers/docs/adr-list-data.ts` ⚠️
- **Storybook Overview:** `stories/docs/adr/00-adr-overview.stories.tsx`
- **ADR Viewer Component:** `stories/viewers/docs/AdrViewer.tsx`
- **Story Generator:** `scripts/generate-adr-stories.mjs` (reads from adr-list-data.ts)
- **Validator:** `scripts/validate-adr.mjs` (checks exportName consistency)

## Mermaid Diagrams (ADR-Specific)

ADRs have stricter diagram rules than general documentation. These rules are required:

- Use vertical orientation: `graph TD` (not `graph LR`)
- Keep diagrams compact and readable at body text size (14px)
- Avoid oversized nodes; keep labels concise
- If a diagram is too narrow or tall, add a max width hint:
  ```
  %% sb: maxWidth=20rem %%
  ```

General Mermaid rules still apply (see [`docs/DOCS-GUIDE.md`](../DOCS-GUIDE.md)).

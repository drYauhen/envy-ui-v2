# Viewers Organization Review

**Date:** 2026-01-04  
**Status:** Draft notes (in progress)

## Scope

Review of `stories/viewers/*` structure and how viewers are organized and reused in Storybook.

## Intent

Keep documentation viewers consistent across sections and avoid duplicating rendering logic, styles, and link handling. Prefer a single DocViewer plus small adapters, with shared list/mermaid helpers.

## Current State (Updated)

- **Unified doc renderer:** `DocViewer` handles markdown, mermaid blocks, and link routing.
- **Thin adapters only:** `AdrViewer` wraps `DocViewer` for ADR metadata; `MarkdownViewer` is now a thin wrapper.
- **Section overview lists:** `DocSectionListViewer` renders registry-driven lists for Docs/Architecture, Docs/Workflows, Docs/Tokens.
- **Centralized link mapping:** `docs-registry.ts` includes `storybookId` so DocViewer can route doc links without a manual map.
- **Shared mermaid renderer:** `MermaidDiagram` lives in `stories/viewers/shared/` with max-width directives supported.

## Proposal (Next)

- Create a shared **viewer config layer** for styles/behaviors to avoid hard-coded inline values.
- Split data-only settings from behavior so viewers can compose overrides cleanly.

Suggested shape:
- `stories/viewers/shared/config/`
  - `viewer-theme.ts` (palette/spacing/typography tokens for viewers)
  - `viewer-layout.ts` (container/card/page layout presets)
  - `markdown-config.ts` (react-markdown components + link handling)
  - `viewer-types.ts` (shared config types)
- Viewers consume presets:
  - `getViewerConfig('docs')`, `getViewerConfig('tokens')`, `getViewerConfig('components')`
  - Each viewer can override pieces without reimplementing core patterns.

Open points to confirm before implementation:
- Should config be data-only (styles/options), or include behavior (link handlers/renderers)?
- Should configs use CSS variables (theme-aware) instead of inline colors?
- Do we want per-viewer presets or fully custom configs per viewer?

## Findings

### Medium

- Doc viewers still use hard-coded light UI styles, so theme/context switches (accessibility, dark, etc.) do not affect docs pages. This reduces the value of theme verification in Storybook.
  - Affected areas include:
    - `stories/viewers/docs/DocViewer.tsx`
    - `stories/viewers/docs/AdrViewer.tsx` (via DocViewer)
    - `stories/viewers/tokens/TokenLayout.tsx`
    - `stories/viewers/components/ButtonStatesViewer.tsx`

### Done

- ADR slug/link logic centralized in `stories/viewers/docs/adr-links.ts`.
- Markdown + ADR doc rendering unified via `DocViewer`.
- Manual doc link mapping removed; `docs-registry.ts` + `storybookId` drives Storybook routing.
- Section overview stories now use registry-driven lists.

### Low

- `MarkdownViewer` is still located under `tokens/`, even though it is now only a thin wrapper. Consider moving or removing it later.

## Thoughts / Suggestions

- Introduce a shared viewer config layer to centralize styles and behaviors.
- Replace hard-coded colors with CSS variables or token-derived values so docs respect theme/context switching.
- Keep DocViewer as the single renderer; keep adapters minimal and section list viewers shared.

## Open Questions

- Should docs pages respect theme/context switching, or keep a fixed "documentation skin"?
- Do we want a shared theme preset for docs (e.g., neutral, high-contrast, or inherits global context)?

# NEXT_STEP.md — UI Design System (Handoff)

**Last updated:** 2025-12-16  
**Purpose:** Start a new chat session with a clean, shared context.

---

## 1. What this repo contains

An in-progress **UI Design System** built around a **data-driven token architecture** (DTCG / Style Dictionary) with Storybook as a consumer/validation surface.

Key baseline:
- Canonical namespace: **`ui`**
- Component axes are separated conceptually: Component / Intent / Context / State / Scheme
- Context-aware projection model is adopted (components are semantic invariants; rendering is a projection)

---

## 2. Source of truth: Decision Records (ADRs)

All architectural decisions are documented in `docs/adr/`.

Current ADR set (ordered):
- ADR-0001 — React Aria as Headless Accessibility Foundation
- ADR-0002 — Data-Driven Storybook Pipeline via Style Dictionary
- ADR-0003 — Data-Driven Figma Variables Pipeline via Adapter JSON
- ADR-0004 — Context-Aware UI Components and Projection Model
- ADR-0005 — Canonical UI Namespace and Button v1 Baseline
- ADR-0006 — Focus Policy Architecture Driven with System Focus
- ADR-0007 — Focus Token Separation and Policy Mapping
- ADR-0008 — TSX Layer (React Aria) Button v1 and Storybook Layering

---

## 3. Current milestone

**Button v1 baseline** (reference component; not final) now has two layers:

### CSS baseline (source of styling truth for v1)
- intents: primary, secondary
- size: md
- shapes: round, circle
- states: hover, active, disabled, focus (pointer vs keyboard focus-visible)
- context: `app` (via wrapper)

### TSX baseline (React Aria headless behavior)
- `Button` implemented in TSX using React Aria hooks, but preserving the CSS contract (`class="ui-button"` + `data-ui-*` axes).
- React 19 compatibility validated via React Aria peer deps.

Notes:
- Figma plugin exists but is intentionally not modified yet.
- No build-time generator is implemented yet.

---

## 4. Work completed in the last session

- Added TSX layer entry point for Button using React Aria (`src/ui/button.tsx`, `src/ui/index.ts`) (ADR-0008).
- Split Storybook stories into explicit layers:
  - `Tokens/...` (token visualization)
  - `CSS/...` (HTML + CSS reference stories)
  - `TSX/React Aria/...` (TSX components backed by React Aria)
- Enforced Storybook sidebar order: `Tokens` → `CSS` → `TSX`.

---

## 5. Next actions (choose one path)

### Path A — Continue Button v1 refinement (CSS baseline)
- Verify token references and runtime CSS variables are consistent.
- Expand state coverage stories and confirm focus policy behavior (derived vs system).
- Optionally add CSS support for `data-ui-hovered|pressed|focus-visible` in addition to pseudo-classes (keep both supported).

### Path B — Continue TSX layer rollout (React Aria)
- Establish per-component TSX file + export pattern under `src/ui/`.
- Add the next low-level component(s) from ADR-0001 (e.g. Checkbox, Switch, TextField).
- Keep Storybook layered: a CSS reference story and a TSX/React Aria story per component.

### Path C — Prepare generator work (next milestone)
- Define runtime alias layer output requirements for components.
- Identify minimum build-time transforms needed (no premature optimization).

### Path D — Start Figma projection experiments (after Button baseline stabilizes)
- Define mapping of Button v1 → Figma nodes/variables.
- Update plugin only after semantic/runtime model is stable.

---

## 6. Open questions / Deferred decisions

- Theme + scheme strategy (dark/light/high-contrast) — deferred
- Policy profiles for different markets/regulations — deferred
- Docs tab layout customization in Storybook — intentionally left as default
- Granular React Aria packages vs meta-packages — deferred until multiple components exist
- Alternative accessibility engines under `TSX/...` — explicitly kept possible by Storybook grouping

---

## 7. Quick “new chat” instructions

When starting a new chat:
1. Upload the repo zip (or point to the repo state)
2. Paste this `NEXT_STEP.md`
3. If needed, upload `docs/adr/`

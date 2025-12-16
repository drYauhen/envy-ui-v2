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

All architectural decisions are documented in `adr/`.

Current ADR set (ordered):
- ADR-0001 — React Aria as Headless Accessibility Foundation
- ADR-0002 — Data-Driven Storybook Pipeline via Style Dictionary
- ADR-0003 — Data-Driven Figma Variables Pipeline via Adapter JSON
- ADR-0004 — Context-Aware UI Components and Projection Model
- ADR-0005 — Canonical UI Namespace and Button v1 Baseline
- ADR-0006 — Focus Policy Architecture Driven with System Focus

---

## 3. Current milestone

**Button v1 baseline** (reference component; not final):
- intents: primary, secondary
- size: md
- shapes: round, circle
- states: hover, active, disabled, focus (pointer vs keyboard focus-visible)
- context: `app` (via wrapper)

Notes:
- Figma plugin exists but is intentionally not modified yet.
- No build-time generator is implemented yet.

---

## 4. Work completed in the last session

- Storybook preview environment improved:
  - Global font normalized to Source Sans Pro in preview
  - Layout decorator added (padding/container) for Canvas
- Focus policy decision formalized:
  - Support both component-derived focus and system focus via system-level policy (ADR-0006)

---

## 5. Next actions (choose one path)

### Path A — Continue Button v1 refinement
- Verify token references and runtime CSS variables are consistent.
- Ensure state styling and focus behavior match ADR intent.
- Expand Storybook stories for state coverage.

### Path B — Prepare generator work (next milestone)
- Define runtime alias layer output requirements for components.
- Identify minimum build-time transforms needed (no premature optimization).

### Path C — Start Figma projection experiments (after Button baseline stabilizes)
- Define mapping of Button v1 → Figma nodes/variables.
- Update plugin only after semantic/runtime model is stable.

---

## 6. Open questions / Deferred decisions

- Theme + scheme strategy (dark/light/high-contrast) — deferred
- Policy profiles for different markets/regulations — deferred
- Docs tab layout customization in Storybook — intentionally left as default

---

## 7. Quick “new chat” instructions

When starting a new chat:
1. Upload the repo zip (or point to the repo state)
2. Paste this `NEXT_STEP.md`
3. If needed, upload `adr/` (or `adr_fixed.zip` if syncing)

# ADR-0013: Current Architectural Intent (Exploratory) — Envy UI v2

**Status:** Proposed (Exploratory)  
**Date:** 2025-12-16  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

---

## 1. Purpose and Scope (Exploratory, not final)

This record captures the **current architectural intent** of Envy UI v2. It is deliberately exploratory and aims to share thinking, assumptions, and open questions. Nothing here should be treated as a final or accepted decision.

Audience and scope notes:
- Envy UI v2 is a **specialized internal UI system**, not a broadly public design system.
- Expected contributors are comfortable with **TypeScript**, **React / React Aria**, and conventional component-based UI development.
- Non-functional goal: avoid shocking new contributors with excessive abstraction; keep entry points familiar.

---

## 2. `system.meta.json` — current stance

- Exists at the repository root and is **not a temporary artifact**.
- Used today as **internal metadata** for pipelines (naming, prefixing, system identification).
- **Not yet a formal public contract**; versioning, schema, and public surface are deferred.
- **Relocation** (root vs. tokens) is intentionally undecided; future ADRs will formalize.

---

## 3. BATN (Behavioral Action Token Node) — architectural probe, not final component

### Terminology Note: BATN

BATN stands for **Behavioral Action Token Node** and represents a pre-component architectural abstraction from which concrete UI components (such as Button implementations) are derived. BATN is intentionally not equivalent to a rendered Button. It captures action semantics, behavioral states, token-driven configuration, and compositional structure. Concrete components (HTML, TSX, TSX + React Aria, etc.) are treated as render targets of a BATN, not as its definition.

- BATN is a **canonical architectural probe**, not a production-final component.
- It exercises the full pipeline end-to-end: tokens → generators → templates → Storybook → runtime bindings.
- BATN is used to validate layering, projection, and token-driven generation limits.
- No commitment that future components must mirror BATN structure; it may evolve or be replaced as learning continues.

---

## 4. Tokens vs. technology-specific templates (fluid boundary)

- The boundary between **token system (JSON / DTCG-like)** and **technology-specific templates** (e.g., React Aria TSX) is **intentionally fluid**.
- Decisions may move **from tokens → templates** or **templates → tokens** as the system matures.
- Rationale: avoid premature simplification, keep graceful exit paths, and maintain visibility of architectural possibilities.
- Templates (e.g., TSX for React Aria) are treated as **declarative extensions** and **familiar entry points**, not merely runtime implementation details.

---

## 5. Bias toward graceful degradation

- The system currently favors **graceful degradation** over early restriction.
- It is acceptable to begin with expressiveness or complexity and later remove what proves unnecessary.
- Progressive enhancement constraints are intentionally not enforced yet.

---

## 6. Storybook's dual role (permitted to grow)

- Storybook may serve **both** verification and documentation roles:
  - **Verification:** validate token projections, visualize states/variants/matrices.
  - **Documentation:** explain usage, show patterns and examples.
- No strict separation or prioritization is enforced at this exploratory stage.

---

## 7. Explicit non-goals

- Do **not** define a final token schema.
- Do **not** declare any architecture as accepted or frozen.
- Do **not** enforce generator-only or token-only extension rules.
- Do **not** freeze component APIs.

---

## 8. Open questions

- When and how to formalize `system.meta.json` (versioning, schema, public surface, location).
- Where the stable boundary between tokens and templates should eventually settle.
- Which parts of BATN should persist versus be redesigned after broader component coverage.
- How Storybook’s verification vs. documentation roles should be balanced long-term.
- If/when additional accessibility engines or template targets should be introduced alongside React Aria.

---

## 9. How to read this ADR

Treat this document as a **snapshot of intent and exploration**, not a commitment. Future ADRs will supersede parts of this ADR as decisions harden. Until then, assume boundaries are fluid by design.

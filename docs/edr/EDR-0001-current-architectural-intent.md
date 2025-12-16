# EDR-0001: Current Architectural Intent (Exploratory) — Envy UI v2

**Status:** Exploratory (not accepted)  
**Date:** 2025-12-16  

---

## 1. Purpose and Scope (Exploratory, not final)

This record captures the **current architectural intent** of Envy UI v2. It is deliberately exploratory and aims to share thinking, assumptions, and open questions. Nothing in this EDR should be treated as a final or accepted decision.

Audience and scope notes:
- Envy UI v2 is a **specialized internal UI system**, not a broadly public design system.
- Expected contributors are comfortable with **TypeScript**, **React / React Aria**, and conventional component-based UI development.
- Non-functional goal: avoid shocking new contributors with excessive abstraction; keep entry points familiar.

---

## 2. ADR cleanup background

Earlier ADRs for the Storybook and Figma pipelines were **duplicated and inconsistently numbered** (ADR-0002/0003 variants). Cleanup to restore a single canonical ADR per pipeline is underway so historical ambiguity is removed. This EDR does not change those decisions; it only notes the temporary inconsistency and ongoing remediation.

---

## 3. `system.meta.json` — current stance

- Exists at the repository root and is **not a temporary artifact**.
- Used today as **internal metadata** for pipelines (naming, prefixing, system identification).
- **Not yet a formal public contract**; versioning, schema, and public surface are deferred.
- **Relocation** (root vs. tokens) is intentionally undecided; future ADRs will formalize.

---

## 4. BATN (Button) — architectural probe, not final component

- BATN is a **canonical architectural probe**, not a production-final component.
- It exercises the full pipeline end-to-end: tokens → generators → templates → Storybook → runtime bindings.
- BATN is used to validate layering, projection, and token-driven generation limits.
- No commitment that future components must mirror BATN structure; it may evolve or be replaced as learning continues.

---

## 5. Tokens vs. technology-specific templates (fluid boundary)

- The boundary between **token system (JSON / DTCG-like)** and **technology-specific templates** (e.g., React Aria TSX) is **intentionally fluid**.
- Decisions may move **from tokens → templates** or **templates → tokens** as the system matures.
- Rationale: avoid premature simplification, keep graceful exit paths, and maintain visibility of architectural possibilities.
- Templates (e.g., TSX for React Aria) are treated as **declarative extensions** and **familiar entry points**, not merely runtime implementation details.

---

## 6. Bias toward graceful degradation

- The system currently favors **graceful degradation** over early restriction.
- It is acceptable to begin with expressiveness or complexity and later remove what proves unnecessary.
- Progressive enhancement constraints are intentionally not enforced yet.

---

## 7. Storybook’s dual role (permitted to grow)

- Storybook may serve **both** verification and documentation roles:
  - **Verification:** validate token projections, visualize states/variants/matrices.
  - **Documentation:** explain usage, show patterns and examples.
- No strict separation or prioritization is enforced at this exploratory stage.

---

## 8. Explicit non-goals (for this EDR)

- Do **not** define a final token schema.
- Do **not** declare any architecture as accepted or frozen.
- Do **not** enforce generator-only or token-only extension rules.
- Do **not** freeze component APIs.

---

## 9. Open questions (intentionally unresolved)

- When and how to formalize `system.meta.json` (versioning, schema, public surface, location).
- Where the stable boundary between tokens and templates should eventually settle.
- Which parts of BATN should persist versus be redesigned after broader component coverage.
- How Storybook’s verification vs. documentation roles should be balanced long-term.
- If/when additional accessibility engines or template targets should be introduced alongside React Aria.

---

## 10. How to read this EDR

Treat this document as a **snapshot of intent and exploration**, not a commitment. Future ADRs will supersede parts of this EDR as decisions harden. Until then, assume boundaries are fluid by design.

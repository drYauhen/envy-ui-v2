# ADR-0045: DTCG Resolver Adoption and Phased Migration

**Status:** Accepted (Implemented)  
**Date:** 2026-04-02  
**Last Updated:** 2026-04-04  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0037](./ADR-0037-canonical-token-architecture-locked.md) - Canonical Token Architecture - Locked  
- [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md) - Canonical Token CSS Output Contract  
- [ADR-0041](./ADR-0041-dtcg-schema-resolution-and-token-architecture.md) - DTCG Schema Resolution and Token Architecture Improvements  
- [WORKFLOW-009](../workflows/WORKFLOW-009-resolver-migration-workflow.md) - Resolver Migration Workflow  

---

## Context

The current token architecture is stable and implemented (Primitives -> Raw -> Semantics -> Themes -> Components), but resolution behavior is split across custom scripts and Style Dictionary behavior.

In particular:
- `scripts/generate-canonical-css.mjs` contains custom recursive resolution logic for aliases and raw token indirection.
- Style Dictionary runs in DTCG mode, but context composition rules are not declared as a first-class resolver document.
- Cross-axis composition (context/theme/density and future axes) is implemented operationally, not yet declared in a dedicated DTCG resolver model.

The DTCG Resolver Module 2025.10 formalizes this layer with explicit constructs such as:
- `sets`
- `modifiers` with `contexts` and optional `default`
- `resolutionOrder`
- deterministic ordering and conflict handling (last declaration wins in ordered merges)

This gives us a standard way to describe composition and resolution without replacing the canonical token architecture itself.

## Decision

I decided to adopt the DTCG Resolver Module as the canonical composition model for Envy UI and migrate in phases.

### 1) Keep the architecture, change the orchestration model

The canonical token chain from ADR-0037 remains unchanged.
Resolver adoption is an orchestration and declaration upgrade, not a structural rewrite.

### 2) Introduce resolver documents as explicit composition contracts

Resolver documents (`*.resolver.json`) will describe:
- which token sets participate in a build,
- which modifiers are available,
- how contexts are selected,
- and the exact `resolutionOrder`.

### 3) Enforce non-breaking rollout

Resolver migration must preserve existing runtime contracts from ADR-0038:
- CSS variable names,
- layer semantics,
- selector behavior,
- and generated artifact paths.

### 4) Use workflow-driven migration governance

Implementation will follow a phased workflow (WORKFLOW-009). If a future phase changes architectural invariants, a dedicated follow-up ADR must be added for that phase.

## Rationale

1. Resolver documents make implicit resolution rules explicit and auditable.
2. The model scales better for multiple orthogonal axes and avoids ad-hoc script branching.
3. Tooling and onboarding improve when set/modifier composition is visible in one place.
4. Phased migration reduces delivery risk and keeps outputs stable while internals evolve.
5. This aligns Envy UI with the published DTCG resolver specification while preserving existing canon.

## Consequences

### Positive

- Resolution behavior becomes declared, reviewable, and testable.
- Multi-context composition gets a standard representation.
- Future context/theme/density expansion is easier to reason about.
- Technical debt in custom resolution code can be reduced over time.

### Trade-offs

- Additional resolver files must be maintained.
- Build scripts and validation logic will need incremental updates.
- During transition, both legacy and resolver paths may coexist temporarily.

### Guardrails

- No big-bang migration.
- No breaking changes to generated CSS/token public contracts without a new ADR.
- Every migration phase requires explicit validation against current outputs.

### Implementation Update (2026-04-03)

- Canonical CSS orchestration is now **Style Dictionary-first** in default flow:
  - `tokens:build:canonical` delegates to SD canonical platforms.
- Legacy canonical parity scripts are removed from active build flow.
- Resolver integrity checks keep phase validation + canonical build + themed snapshot coverage via `resolver:check`.

### Implementation Update (2026-04-04)

- Added formal JSON schema validation for resolver documents (`schemas/dtcg-resolver-2025.10.schema.json`).
- Added `resolver:validate:schema` script and wired it into `resolver:check` for CI guardrail.
- Resolver generation now points to local schema reference for `*.resolver.json`.
- WORKFLOW-009 migration status moved from active rollout to completed maintenance mode.

---

## Notes

Specification reference:
- DTCG Resolver Module 2025.10: https://www.designtokens.org/TR/2025.10/resolver/

Adoption scope note:
- This ADR defines direction and governance.
- Execution details and checklists are captured in WORKFLOW-009.

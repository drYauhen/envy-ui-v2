# ADR-0049: Dependency Upgrade Governance and Traceability

**Document ID:** adr-0049-dependency-upgrade-governance-and-traceability
**Status:** Accepted
**Date:** 2026-04-08
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Process

---
## Context

The project regularly updates third-party packages (for example `react-aria`, `react-stately`, Storybook, and build tooling). Some updates are low-risk, but others change APIs or deprecate behavior and require coordinated code migration.

Without a single governance model, the same upgrade can be analyzed differently across sessions, and the rationale for code changes becomes hard to audit later.

## Decision

I decided to introduce a formal dependency-upgrade governance model with three mandatory artifacts:

1. One architecture-level policy ADR (this document).
2. One operational workflow for execution and verification:
   [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md).
3. One migration log entry per completed third-party dependency upgrade batch in `docs/migrations/`.

The policy defines four rules:

1. Every package upgrade must have an explicit risk classification (`Low`, `Medium`, `High`).
2. Every non-trivial upgrade must document required code changes and verification scope before merge.
3. Every completed upgrade batch must produce a dated migration record.
4. Workflow and migration records are normative for operational history; ADRs stay focused on governance and architectural decisions.

## Rationale

### 1) Separation of concerns

- ADR defines stable governance rules.
- Workflow defines repeatable execution mechanics.
- Migration entries capture time-bound implementation facts.

### 2) Better incident/debug recovery

When regressions appear after dependency updates, we need a fast answer to:
- what changed;
- why it changed;
- how it was validated;
- how risky the change was expected to be.

A migration record makes this searchable without diff-mining old commits.

### 3) AI-first delivery support

This repository is intentionally AI-assisted. Structured upgrade records reduce ambiguity for future agents and improve continuity between sessions.

### 4) Alignment with existing integration strategy

This policy extends [ADR-0030](./ADR-0030-third-party-library-integration-strategy.md) from integration principles to operational governance.

## Consequences

### Positive

- Upgrade decisions become auditable and repeatable.
- Risk and verification expectations are explicit before merge.
- Maintainers can quickly inspect previous upgrade patterns.

### Trade-offs

- Additional documentation overhead for each upgrade batch.
- Slightly slower merge cycle for dependency-only changes.

### Non-Goals

- Forcing one-package-per-commit policy.
- Replacing package manager lockfile review discipline.
- Replacing CI; this policy complements CI.

## Governance Model

### Risk classes

- `Low`: patch/minor update with no required API migration and green baseline checks.
- `Medium`: API shape drift, deprecations, or localized refactors.
- `High`: breaking migration requiring broad refactor, runtime behavior changes, or release coordination.

### Required evidence by class

- `Low`: lockfile diff + build/test baseline.
- `Medium`: affected module list + targeted behavior checks + migration record.
- `High`: staged migration plan + rollback plan + expanded validation and follow-up ticketing.

## Important Steps

1. Keep this ADR as the stable governance policy for dependency upgrades. *(implemented)*
2. Use [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md) for every future dependency upgrade cycle. *(implemented)*
3. Record every completed upgrade batch in `docs/migrations/YYYY-MM-DD-*.md`. *(implemented)*
4. Add optional automation that validates migration record presence for dependency-only PRs. *(future implementation)*

---

## Notes

This ADR is intentionally process-oriented. It does not prescribe specific package versions. Version choice remains contextual and must follow the operational checks in [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md).

## References

### Internal Documents

- [ADR-0030](./ADR-0030-third-party-library-integration-strategy.md) — Third-Party Library Integration Strategy
- [WORKFLOW-004](../workflows/WORKFLOW-004-scripts-reference.md) — Scripts Reference
- [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md) — Dependency Upgrade Workflow
- [Migration 2026-04-08](../migrations/2026-04-08-react-aria-react-stately-upgrade.md) — React Aria and React Stately Upgrade

### External Standards

- Semantic Versioning 2.0.0: <https://semver.org/>
- npm package versioning basics: <https://docs.npmjs.com/about-semantic-versioning>

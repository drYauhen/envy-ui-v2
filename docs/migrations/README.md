# Third-Party Dependency Migration Log

**Document ID:** migration-log-readme
**Status:** Active
**Date:** 2026-04-08
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Migration

---
This directory stores dated implementation logs for third-party dependency upgrades only.
These records capture externally driven package/API changes that affect Envy UI implementation.

## Naming Convention

- `YYYY-MM-DD-<scope>.md`

## Storybook Indexing

- Migration records are indexed with 4-digit sequence numbers in Storybook metadata (`0001`, `0002`, ...).

## Template

- [MIGRATIONS-TEMPLATE](./MIGRATIONS-TEMPLATE.md)

## Required Header Fields in Each Migration Record

- `Document ID`
- `Status`
- `Risk` (`Low | Medium | High`)
- `Date`
- `Last Updated`
- `Owner`
- `Assistance`
- `Category`

## Required Content in Each Migration Record

- upgraded versions or migrated scope;
- changed artifacts (files/modules);
- risk classification;
- validation commands and outcomes;
- follow-up notes.

## Records

- [Migration-0001 — 2026-04-08 React Aria and React Stately Upgrade](./2026-04-08-react-aria-react-stately-upgrade.md)

## Related Governance

- [ADR-0049](../adr/ADR-0049-dependency-upgrade-governance-and-traceability.md)
- [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md)

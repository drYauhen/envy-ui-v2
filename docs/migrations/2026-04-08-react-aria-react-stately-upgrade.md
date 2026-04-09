# Migration: React Aria and React Stately Upgrade

**Document ID:** migration-react-aria-react-stately-upgrade-2026-04-08
**Status:** Completed
**Risk:** Medium
**Date:** 2026-04-08
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Migration

---
## Summary

Completed dependency upgrade:
- `react-aria`: `^3.45.0` → `^3.47.0`
- `react-stately`: `^3.43.0` → `^3.45.0`

This upgrade required targeted TSX migration across interactive primitives and hooks due API/type contract drift.

## Risk Classification

**Class:** Medium

**Why Medium:**
- versions are minor upgrades;
- multiple compile-time breaks appeared in consumer code;
- migration was localized but touched core interaction surfaces (`select`, `menu`, `tooltip`, `button`, hooks).

## Changed Artifacts

### Dependency manifests

- [`package.json`](/package.json)
- [`package-lock.json`](/package-lock.json)

### New file introduced during migration

- [`packages/tsx/button/button.types.ts`](/packages/tsx/button/button.types.ts)

### Major integration surfaces updated

- [`packages/tsx/select/primitives/select-popover.tsx`](/packages/tsx/select/primitives/select-popover.tsx)
- [`packages/tsx/select/primitives/select-trigger.tsx`](/packages/tsx/select/primitives/select-trigger.tsx)
- [`packages/tsx/select/primitives/select-listbox.tsx`](/packages/tsx/select/primitives/select-listbox.tsx)
- [`packages/tsx/menu/menu.tsx`](/packages/tsx/menu/menu.tsx)
- [`packages/tsx/tooltip/tooltip.tsx`](/packages/tsx/tooltip/tooltip.tsx)
- [`src/hooks/useFloatingPosition.ts`](/src/hooks/useFloatingPosition.ts)

## Validation Performed

```bash
npm run build:app
```

**Result:** pass.

## Outcome

- Build restored with upgraded package versions.
- Deprecated/changed package APIs adjusted in affected call sites.
- No rollback required.

## Follow-up

1. Continue upgrades through [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md).
2. Record next dependency batches as separate migration files under `docs/migrations/`.

## References

### Internal Documents

- [ADR-0030](../adr/ADR-0030-third-party-library-integration-strategy.md) — Third-Party Library Integration Strategy
- [ADR-0049](../adr/ADR-0049-dependency-upgrade-governance-and-traceability.md) — Dependency Upgrade Governance and Traceability
- [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md) — Dependency Upgrade Workflow

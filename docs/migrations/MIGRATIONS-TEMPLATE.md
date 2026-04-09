# Migration: <Title>

**Document ID:** migration-<slug>-<YYYY-MM-DD>
**Status:** <Planned | In Progress | Completed | Rolled Back>
**Risk:** <Low | Medium | High>
**Date:** <YYYY-MM-DD>
**Last Updated:** <YYYY-MM-DD>
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Migration

---
## Summary

<What changed and why this migration was needed.>

## Risk Classification

**Class:** <Low | Medium | High>

**Why <Class>:**
- <reason 1>
- <reason 2>

## Changed Artifacts

- [/packages/.../file.tsx](/packages/.../file.tsx) — <what changed>
- [/package.json](/package.json) — <what changed>

Authoring rule for code references:
- Use repo-root absolute paths (leading `/`) for code/config files to ensure Source File Viewer resolves links reliably.

## Validation Performed

```bash
<validation command>
```

**Result:** <pass/fail + short note>

## Outcome

- <key outcome 1>
- <key outcome 2>

## Follow-up

1. <follow-up action>
2. <follow-up action>

## References

### Internal Documents

- [ADR-0049](../adr/ADR-0049-dependency-upgrade-governance-and-traceability.md) — Dependency Upgrade Governance and Traceability
- [WORKFLOW-010](../workflows/WORKFLOW-010-dependency-upgrade-workflow.md) — Dependency Upgrade Workflow

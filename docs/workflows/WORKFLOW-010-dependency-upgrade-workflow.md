# Dependency Upgrade Workflow

**Document ID:** workflow-dependency-upgrade-workflow
**Status:** Active
**Date:** 2026-04-08
**Last Updated:** 2026-04-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Workflow

---
## Overview

### Purpose

Define a repeatable process for upgrading third-party dependencies with explicit risk assessment, migration tracking, and verification evidence.

### Scope

Included:
- third-party runtime and dev dependency updates in `package.json` and lockfiles;
- required code migrations caused by third-party API changes or deprecations;
- documentation updates (ADR/workflow/migration logs).

Not included:
- full product release orchestration;
- dependency security incident response playbooks;
- internal refactors that are not triggered by third-party dependency upgrades.

### Target Audience

- maintainers updating dependencies;
- contributors reviewing dependency-related pull requests;
- AI agents performing maintenance upgrades.

## Prerequisites

### Required Knowledge

- npm dependency and lockfile model.
- Baseline project build/test commands.
- Existing package integration ADRs.

### Required Tools

- Node.js `24.11.1`
- npm
- project scripts from [WORKFLOW-004](./WORKFLOW-004-scripts-reference.md)

### Required Environment

- local dev environment with clean install (`npm install`).

### Required Access

- write access to repository.

## Workflow Steps

### Phase 1: Discovery and Planning

#### Step 1.1: Identify candidate upgrades

**Command/Actions:**
```bash
npm outdated
```

**Expected Output:**
List of packages with current/wanted/latest versions.

**Verification:**
Candidate list recorded in work notes or issue.

#### Step 1.2: Classify risk

Assign risk class per [ADR-0049](../adr/ADR-0049-dependency-upgrade-governance-and-traceability.md):
- `Low`
- `Medium`
- `High`

**Verification:**
Risk class documented before code changes.

### Phase 2: Implementation

#### Step 2.1: Apply version updates

**Command/Actions:**
```bash
npm install <package>@<version>
# repeat for additional packages
```

**Expected Output:**
`package.json` and `package-lock.json` updated.

**Verification:**
`git diff` shows intended package and lockfile changes only.

#### Step 2.2: Implement required code migration

**Actions:**
- resolve compile-time API issues;
- replace deprecated calls/usages;
- align TS types where package contracts changed.

**Verification:**
All changed modules compile locally.

### Phase 3: Validation

#### Step 3.1: Run baseline build checks

**Test Commands:**
```bash
npm run build:app
npm run docs:validate
```

**Success Criteria:**
- build passes;
- documentation links/registry checks pass.

#### Step 3.2: Run targeted checks for touched surfaces

Run project-specific checks relevant to changed modules (examples):
```bash
npm run storybook:build
# or targeted test command when available
```

**Success Criteria:**
No regression on affected package integration surfaces.

### Phase 4: Documentation and Handoff

#### Step 4.1: Create migration record

Create one file:
- `docs/migrations/YYYY-MM-DD-<upgrade-scope>.md`

Required sections:
- header risk field (`**Risk:** <Low | Medium | High>`);
- versions from/to;
- impacted files/modules;
- risk classification;
- validation commands and outcomes;
- residual risks / follow-ups.

#### Step 4.2: Update policy/workflow docs when needed

If process changed:
- update [ADR-0049](../adr/ADR-0049-dependency-upgrade-governance-and-traceability.md) and/or this workflow.

## Validation Checklist

- [ ] Dependency versions intentionally selected and reviewed
- [ ] Risk classification recorded (`Low/Medium/High`)
- [ ] Required code migration completed
- [ ] Baseline validation commands passed
- [ ] Migration log entry created

## Success Metrics

### Quantitative Metrics

- Upgrade PR contains migration record: 100%
- Build pass rate after upgrade: 100%

### Qualitative Metrics

- Reviewers can identify why code changes were needed.
- Future contributors can trace upgrade history without deep git archaeology.

## Troubleshooting

### Common Issues

#### Issue: Upgrade compiles partially but fails across app surfaces

**Symptoms:**
Type errors in dependent components/hooks.

**Root Cause:**
Transitive API drift not visible in initial package update.

**Solution:**
- inspect package release notes/changelog;
- update all call sites for changed API contracts;
- rerun build and targeted checks.

#### Issue: Lockfile diff includes unexpected package churn

**Symptoms:**
Large unrelated lockfile modifications.

**Root Cause:**
Install command updated more dependencies than planned.

**Solution:**
- re-run install with explicit package/version;
- verify intended scope before commit.

## Rollback Procedure

### When to Rollback

- build/test regression cannot be resolved in current cycle;
- runtime behavior risk is high and blocks release readiness.

### Rollback Steps

1. Revert dependency versions to previous known-good values.
2. Revert associated migration code changes.
3. Re-run validation commands.
4. Update migration log with rollback note.

### Validation After Rollback

- baseline build/test commands pass;
- no unresolved references to removed upgrade APIs.

## Related Documentation

### Related ADRs

- [ADR-0030](../adr/ADR-0030-third-party-library-integration-strategy.md) — Third-Party Library Integration Strategy
- [ADR-0049](../adr/ADR-0049-dependency-upgrade-governance-and-traceability.md) — Dependency Upgrade Governance and Traceability

### Related Workflows

- [WORKFLOW-004](./WORKFLOW-004-scripts-reference.md) — Scripts Reference

### Migration Records

- [2026-04-08 React Aria and React Stately Upgrade](../migrations/2026-04-08-react-aria-react-stately-upgrade.md)

## Change History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-04-08 | 1.0 | Initial version | Eugene Goncharov |

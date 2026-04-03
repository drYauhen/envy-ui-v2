# Resolver Migration Workflow

**Document ID:** workflow-resolver-migration-workflow  
**Status:** Active  
**Date:** 2026-04-02  
**Last Updated:** 2026-04-02  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Category:** Workflow

---

This workflow defines how to adopt the DTCG Resolver Module in Envy UI without breaking current token and CSS contracts.

## Purpose

- Introduce resolver documents as explicit composition contracts.
- Replace implicit script-only composition logic over time.
- Preserve current output contracts during migration.

## Scope

Included:
- Resolver document authoring (`*.resolver.json`).
- Phased integration with token build scripts.
- Validation against current generated outputs.

Not included:
- Full token architecture redesign.
- Breaking changes to public CSS variables/selectors.

## Key Resolver Concepts

From DTCG Resolver 2025.10, the operational primitives are:
- `sets`: ordered source groups for token inputs.
- `modifiers`: context-conditional source groups.
- `resolutionOrder`: explicit merge order across sets/modifiers.
- ordered conflict handling: last declaration wins.

## Current System Mapping

Current Envy UI behavior maps naturally to resolver concepts:
- `tokens/primitives/**` and context files are token source sets.
- context/theme/density choices are modifier-like inputs.
- script execution order currently plays the role of `resolutionOrder`.

Migration makes this mapping explicit and machine-readable.

## Migration Phases

### Phase 1: Inventory and Resolver Skeleton

Deliverables:
- Inventory of current source groups per build target.
- Initial resolver file(s) under `tokens/knowledge/resolver/`.
- Declared set/modifier model mirroring current behavior.

Suggested file naming:
- `tokens/knowledge/resolver/app-core.resolver.json`
- `tokens/knowledge/resolver/storybook.resolver.json`

Validation:
- Resolver declaration matches existing effective source order.
- No generated output change.

### Phase 2: Pilot Integration (Read-Only Validation Path)

Deliverables:
- Script path that parses resolver files and computes effective source list.
- Diff check between resolver-derived source order and legacy order.
- Build logs that show active resolver input and selected contexts.

Validation:
- `npm run tokens:build:canonical` produces identical outputs.
- No change in `generated/css/tokens*.css` other than timestamps/comments (if any).

### Phase 3: Controlled Adoption for Generation

Deliverables:
- Resolver-driven source selection enabled for selected target(s) first (recommended: `app`).
- Legacy path retained behind fallback flag during transition.
- Regression checks for context/theme/density permutations in scope.

Validation:
- `npm run tokens:build:canonical` stable.
- `npm run tokens:build` stable for enabled targets.
- Storybook token docs render unchanged behaviorally.

Phase 3 feature flag:
- `CANONICAL_CSS_USE_RESOLVER_APP=true` enables resolver-driven source selection for app context in canonical CSS generation.
- `STYLE_DICTIONARY_USE_RESOLVER_APP=true` enables resolver-driven source selection for `dev-app` Style Dictionary builds.

### Phase 4: Expansion and Enforcement

Deliverables:
- Resolver documents for remaining targets (`website`, `report`, `storybook`).
- Validation script ensuring resolver docs stay aligned with filesystem sources.
- CI check for resolver integrity and deterministic resolution order.

Implemented artifacts:
- `tokens/knowledge/resolver/website-core.resolver.json`
- `tokens/knowledge/resolver/report-core.resolver.json`
- `tokens/knowledge/resolver/storybook.resolver.json`
- `scripts/generate-resolver-phase4.mjs`
- `scripts/validate-resolver-phase4.mjs`

Validation:
- Full target matrix builds successfully.
- Resolver validation enforced in CI.

### Phase 5: Cleanup and Hardening

Deliverables:
- Remove obsolete legacy composition branches.
- Keep fallback only if explicitly justified.
- Update architecture/workflow docs to final state.

Validation:
- No unresolved migration TODOs in scripts.
- Resolver path is the canonical composition path.

## Execution Checklist

1. Update ADRs if any invariant changes are introduced.
2. Add or update resolver documents for the target phase.
3. Run canonical and platform token builds.
4. Verify no unintended output diffs.
5. Update workflow/docs metadata if process changed.

## Commands

```bash
# Generate app resolver skeleton from current canonical files
npm run resolver:generate:app

# Validate app resolver against current canonical files/order
npm run resolver:validate:app

# Print effective source order resolved from app resolver (read-only)
npm run resolver:resolve:app

# Compare resolver-derived order with legacy app order (read-only)
npm run resolver:compare:app

# Build canonical CSS in resolver-driven app mode (feature flag)
npm run tokens:build:canonical:resolver-app

# Build Style Dictionary dev-app target in resolver mode (feature flag)
npm run tokens:build:dev-app:resolver

# Verify canonical CSS parity between legacy and resolver mode
npm run resolver:verify:canonical-parity

# Generate remaining resolver files (website/report/storybook)
npm run resolver:generate:phase4

# Validate all resolver documents and filesystem alignment
npm run resolver:validate:phase4

# CI-ready resolver integrity check (phase 1 + phase 4 validations)
npm run resolver:check

# Rebuild canonical CSS tokens
npm run tokens:build:canonical

# Full token build
npm run tokens:build

# Regenerate documentation metadata and stories
npm run docs:regenerate-all

# Validate ADR formatting and linkage
npm run adr:validate
```

## Success Criteria

- Resolver declarations are present for active targets.
- Build outputs remain contract-compatible.
- Resolution order is explicit and reviewable.
- Migration can proceed incrementally without blocking daily token work.

## Related Documentation

- [ADR-0045](../adr/ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) - Resolver adoption decision and governance
- [ADR-0037](../adr/ADR-0037-canonical-token-architecture-locked.md) - Canonical token architecture
- [ADR-0038](../adr/ADR-0038-canonical-token-css-output-contract.md) - Canonical token CSS output contract
- [ADR-0041](../adr/ADR-0041-dtcg-schema-resolution-and-token-architecture.md) - DTCG schema baseline
- [DTCG Resolver Module 2025.10](https://www.designtokens.org/TR/2025.10/resolver/) - Specification

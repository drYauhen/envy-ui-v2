# Architecture Validation Through Implementation

**Status:** Mandatory
**Date:** 2026-01-09
**Owner:** Eugene Goncharov

---

## Purpose

This document establishes **mandatory practices** for validating architectural decisions through implementation and maintaining synchronization between ADRs (Architecture Decision Records) and production code.

ADRs are not static documents - they must evolve as implementations validate, refine, or challenge the original architectural decisions. This document defines how to bridge the gap between architectural theory and implementation reality.

---

## Core Principle

**Architecture must be validated through implementation, and implementation learnings must flow back into architecture documentation.**

This creates a feedback loop:
```
Architectural Decision → Implementation → Validation → Documentation Update → Refined Architecture
```

---

## Rule 1: Implementation Validation Sections in ADRs

### Requirement

When a significant implementation validates or refines an ADR, the ADR **must** be updated with an **Implementation Validation** section documenting:

1. **What was implemented** (component, feature, or system)
2. **How it validates the ADR** (specific architectural decisions proven correct)
3. **What was learned** (refinements, edge cases, or new requirements discovered)
4. **Concrete examples** (code snippets, before/after comparisons, or specific files)
5. **Date of validation** (to track when implementation occurred)

### Format

```markdown
### Implementation Validation

**[Component/Feature] ([Date])** [validates/refines/extends] this ADR:
- ✅ **[Aspect 1]**: [How implementation proves this works]
- ✅ **[Aspect 2]**: [Specific example or metric]
- ⚠️ **[Challenge Discovered]**: [What didn't work as expected]
- 🔄 **[Refinement Made]**: [How architecture was adjusted]

**Example from [Component]**:
```[language]
[Concrete code example showing the architectural pattern in practice]
```

**Key Lessons**:
1. [Lesson learned from implementation]
2. [Pattern that emerged during work]
```

### Example: Badge Refactor Validation (2026-01-09)

From [ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md):

```markdown
### Implementation Validation

**Badge Refactor (2026-01-09)** serves as validation of this architecture:
- ✅ **Single Source of Truth**: Eliminated 99 lines of hardcoded CSS by relying on token-generated values
- ✅ **Semantic Layer Compliance**: All badge tokens properly reference semantic layer
- ✅ **OKLCH Color Space**: All colors stored and generated in OKLCH format
- ✅ **Theme Overrides**: Accessibility theme uses compound selectors `[data-eui-context="app"][data-eui-theme="accessibility"]`
```

---

## Rule 2: Architectural Rules Extraction

### Requirement

When implementation work reveals **reusable architectural patterns**, those patterns **must** be extracted into standalone architectural rule documents under `docs/architecture/`.

### Criteria for Extraction

Extract a pattern into an architectural rule document when:

1. **Pattern applies system-wide** (not specific to one component)
2. **Pattern is mandatory** (violations would break architectural integrity)
3. **Pattern has concrete enforcement criteria** (can be validated in code review or linting)
4. **Pattern is proven through implementation** (not theoretical)

### Document Structure

```markdown
# [Architectural Rule Name]

**Status:** Mandatory | Recommended | Experimental
**Date:** [Creation date]
**Owner:** [Name]

---

## Purpose
[1-2 paragraphs: Why this rule exists, what problem it solves]

---

## Core Principle
[Single sentence capturing the essence of the rule]

---

## Rule [N]: [Rule Name]

### Requirement
[Specific, actionable requirement that must be followed]

### Rationale
[Why this requirement exists, what it prevents or enables]

### Examples

**❌ Violation:**
```[language]
[Code example that violates the rule]
```

**✅ Correct:**
```[language]
[Code example that follows the rule]
```

### Enforcement
[How this rule is enforced: code review, linting, build-time checks, etc.]

---

## Validation Case Study

**[Component/Feature] ([Date])**:
[How implementation of specific work validated this rule]

---

## Related Documentation
- [Links to relevant ADRs]
- [Links to related architectural rules]
```

### Example: Component CSS Architecture

Created from badge refactor patterns: [Component CSS Architecture](./component-css-architecture.md)

---

## Rule 3: ADR Status Updates

### Requirement

ADR status must accurately reflect implementation reality. Update status when:

1. **Theory → Practice**: ADR moves from "Accepted" to "Accepted (Partially Implemented)" when first implementation validates part of the architecture
2. **Validation Complete**: Status updated to "Accepted (Implemented)" when all aspects validated
3. **Challenges Discovered**: Status updated to "Accepted (Under Review)" if implementation reveals fundamental issues
4. **Superseded**: Status changed to "Superseded by ADR-XXXX" if implementation proves a better approach

### Status Progression

```
Proposed → Accepted → Accepted (Partially Implemented) → Accepted (Implemented)
                ↓                                      ↓
         Rejected/Superseded              Accepted (Under Review)
```

### Example: Focus Policy Architecture

From [ADR-0006](../adr/ADR-0006-focus-policy-architecture.md):

**Before Implementation:**
```markdown
## Status
**Accepted** - Architectural foundation complete with comprehensive token implementation.
```

**After Badge Refactor (2026-01-09):**
```markdown
## Status
**Accepted (Partially Implemented)** - Two-layer focus system (theme-dependent + system override)
fully implemented and validated in badge component. Runtime policy selection mechanism functional
via `data-eui-focus-policy` attribute.
```

---

## Rule 4: Cross-ADR Consistency

### Requirement

When implementation validates one ADR, **check and update related ADRs** to maintain consistency across architectural documentation.

### Process

1. **Identify Related ADRs**: Find all ADRs referenced by the validated ADR
2. **Check for Conflicts**: Verify that validation findings don't contradict related ADRs
3. **Propagate Learnings**: Update related ADRs with relevant validation findings
4. **Add Cross-References**: Ensure all related ADRs link to each other and to architectural rule documents

### Example: Badge Refactor Multi-ADR Update

Badge refactor (2026-01-09) required coordinated updates to:
- [ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) - Layered Token Architecture
- [ADR-0023](../adr/ADR-0023-token-organization-context-and-theme-separation.md) - Token Organization
- [ADR-0024](../adr/ADR-0024-css-layer-strategy-context-priority.md) - CSS Layer Strategy
- [ADR-0006](../adr/ADR-0006-focus-policy-architecture.md) - Focus Policy Architecture

All four ADRs received:
- Implementation Validation sections with badge refactor findings
- Cross-references to new [Component CSS Architecture](./component-css-architecture.md) document
- Updated explicit rules based on implementation learnings
- Status updates reflecting partial/full implementation

---

## Rule 5: Commit Documentation Updates Separately

### Requirement

Documentation updates that reflect on implementation work **should be committed separately** from the implementation work itself.

### Rationale

- **Clear History**: Separates "what we built" from "what we learned"
- **Review Focus**: Allows architectural review separate from code review
- **Rollback Safety**: Can revert documentation updates without reverting implementation
- **Context Preservation**: Commit message can focus entirely on architectural insights

### Commit Message Format

```
docs: [ADR updates | architectural rule | validation findings]

[1-2 sentence summary of what architectural documentation changed]

## [New Documentation | ADR Updates | etc.]
[Detailed list of new or updated documents]

## [Context | Validation | etc.]
[Explanation of what implementation work led to these updates]

**Why This Documentation Matters**:
[Why these updates are important for architectural integrity]
```

### Example: Badge Refactor Documentation Commit

Commit `8ed9b53`:
```
docs: comprehensive ADR updates and component CSS architecture documentation

This commit documents the architectural patterns established during badge component
refactoring work and updates relevant ADRs to reference these patterns.

## New Documentation
- Component CSS Architecture (docs/architecture/component-css-architecture.md)
  [details...]

## ADR Updates
- ADR-0017, ADR-0023, ADR-0024, ADR-0006 updated with Implementation Validation sections

## Context
Badge component refactoring (Phase 1: eliminate hardcoded CSS) revealed critical
architectural patterns that should be documented and enforced system-wide.
```

---

## Rule 6: Architectural Debt Documentation

### Requirement

When implementation reveals **gaps between architectural vision and reality**, document as architectural debt in ADRs.

### Format

Add to ADR's "Implementation Notes" or "Current Status" section:

```markdown
### Architectural Debt

**[Aspect]** ([Discovered: Date]):
- **Gap**: [What the ADR prescribes vs what exists in code]
- **Impact**: [What this gap prevents or complicates]
- **Mitigation**: [Temporary workarounds in place]
- **Resolution Plan**: [How/when gap will be closed]

**Priority**: Critical | High | Medium | Low
```

### Example: Context Directory Structure

From [ADR-0023](../adr/ADR-0023-token-organization-context-and-theme-separation.md):

```markdown
### Current Structure Reality (2026-01-08)

**Mixed Architecture (Transitional State)**:
- ⚠️ Directory structure migration in progress
- ✅ Old structure continues to work during migration
- ⚠️ Context directories (`tokens/app/`, `tokens/website/`) created but incomplete
```

---

## Enforcement

### Code Review Checklist

When reviewing implementation work, verify:

- [ ] Does this implementation validate or challenge any ADRs?
- [ ] If yes, are those ADRs updated with Implementation Validation sections?
- [ ] Are any reusable patterns documented as architectural rules?
- [ ] Are related ADRs checked for consistency?
- [ ] Is ADR status updated to reflect implementation reality?
- [ ] Is architectural debt documented if gaps exist?

### Pull Request Template

Include in PR description:

```markdown
## Architectural Impact

**ADRs Validated**: [List ADR numbers and what was validated]
**ADRs Updated**: [Yes/No - link to documentation PR if separate]
**New Patterns**: [Any reusable patterns that should become architectural rules]
**Architectural Debt**: [Any gaps discovered between ADR and implementation]
```

---

## Validation Case Study: Badge Refactor (2026-01-09)

### Implementation Work

**Phase 1: Eliminate Hardcoded CSS**
- Deleted 99 lines of hardcoded CSS from badge.css
- Fixed accessibility theme token definitions for solid variants
- Rebuilt tokens and verified generated CSS correctness

### Architectural Validation

**What Was Validated**:
1. **Single Source of Truth** (ADR-0017) - Proved that token files can be authoritative source
2. **OKLCH Color Space** (ADR-0014) - Confirmed OKLCH throughout system works correctly
3. **Theme Override Pattern** (ADR-0024) - Validated compound selector approach
4. **Focus Architecture** (ADR-0006) - Proved two-layer focus system is implementable

**What Was Learned**:
1. **Component CSS must never contain hardcoded values** - Extracted to architectural rule
2. **Theme overrides only what differs** - Refined token organization principles
3. **Semantic layer resolution matters** - Fixed CSS generator to prioritize semantic base values
4. **OKLCH benefits are real** - Wider gamut and perceptual uniformity observable in production

### Documentation Updates

**Created**:
- [Component CSS Architecture](./component-css-architecture.md) - 526 lines, 6 mandatory rules

**Updated**:
- ADR-0017 - Added Implementation Validation section, 5 key architectural rules
- ADR-0023 - Added Implementation Validation, 3 new explicit rules
- ADR-0024 - Added Implementation Validation, before/after examples, 2 new explicit rules
- ADR-0006 - Added Two-Layer Focus System validation, detailed implementation examples

**Commits**:
1. Implementation work: `1b736da` - refactor: eliminate hardcoded CSS from badge component
2. Documentation: `8ed9b53` - docs: comprehensive ADR updates and component CSS architecture

### Outcome

- **4 ADRs validated** through real implementation
- **1 new architectural rule document** created
- **11 new explicit rules** added across ADRs
- **Architecture integrity maintained** through feedback loop

---

## Anti-Patterns

### ❌ Anti-Pattern 1: "ADRs as History Only"

**Problem**: Treating ADRs as immutable historical records that never change after acceptance.

**Why It's Wrong**: Architecture evolves. ADRs that don't reflect current reality become misleading documentation.

**Correct Approach**: Update ADRs with Implementation Validation sections as work proceeds.

---

### ❌ Anti-Pattern 2: "Implementation First, Documentation Never"

**Problem**: Building features without ever updating architectural documentation.

**Why It's Wrong**: Creates divergence between architecture and reality. Future developers make decisions based on outdated ADRs.

**Correct Approach**: Budget time for documentation updates as part of implementation work.

---

### ❌ Anti-Pattern 3: "Documentation PRs Block Implementation"

**Problem**: Requiring ADR updates in same PR as implementation, causing review bottlenecks.

**Why It's Wrong**: Mixes code review concerns with architectural review concerns. Slows down delivery.

**Correct Approach**: Separate implementation PR from documentation PR. Link them but review independently.

---

### ❌ Anti-Pattern 4: "Validation Without Evidence"

**Problem**: Adding Implementation Validation sections without concrete examples or metrics.

**Why It's Wrong**: Makes ADRs feel like marketing documents. No way to verify claims.

**Correct Approach**: Always include code snippets, file paths, metrics (like "eliminated 99 lines"), or before/after comparisons.

---

## Related Documentation

- [Component CSS Architecture](./component-css-architecture.md) - Example of architectural rule extracted from implementation
- [ADR-0017](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) - Example of ADR with Implementation Validation section
- [ADR Template](../adr/ADR-TEMPLATE.md) - Standard ADR format

---

## Summary

This architectural rule establishes the **feedback loop between implementation and documentation**:

1. **Validate through implementation** - Build real features to prove architectural decisions
2. **Document learnings** - Update ADRs with Implementation Validation sections
3. **Extract patterns** - Create architectural rule documents for reusable patterns
4. **Maintain consistency** - Update related ADRs to keep architecture coherent
5. **Track reality** - Update ADR status to reflect implementation state
6. **Document debt** - Be honest about gaps between vision and reality

**The goal is living architecture** - documentation that evolves with the system and provides accurate, actionable guidance for current development.

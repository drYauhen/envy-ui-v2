# ADR-0046: AI Agent Readiness Reflection from Milestone-Driven Agent Research

**Document ID:** adr-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research
**Status:** Accepted (Reflective Baseline)
**Date:** 2026-04-04
**Last Updated:** 2026-04-04
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Reflection
**Related:**
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) — DTCG Resolver Adoption and Phased Migration
- [WORKFLOW-005](../workflows/WORKFLOW-005-tokens-workflow.md) — Tokens Workflow
- [WORKFLOW-009](../workflows/WORKFLOW-009-resolver-migration-workflow.md) — Resolver Migration Workflow

---
## Context

I reviewed the research paper "Agentic AI Needs Intermediate-States Supervision" (Google DeepMind, arXiv:2603.19685, 2026-03-25) and used it as an external lens for Envy UI.

The core research claim is that long-horizon agent performance improves significantly when systems provide:
- explicit intermediate goals during execution (subgoals);
- dense intermediate supervision signals (milestones);
- structured failure analysis and iterative policy improvement.

Envy UI is intentionally built as AI-first infrastructure (tokens, contracts, multi-renderer direction, Storybook as executable documentation). This makes the paper directly relevant: it provides a concrete test for whether current architecture supports agent planning, progress tracking, and reliable completion.

This ADR is not a replacement for existing architecture decisions. It is a reflective baseline that evaluates current readiness and defines follow-up direction.

## Decision

I decided to formalize a milestone-oriented AI-agent readiness baseline for Envy UI and use it as a governance layer over ongoing architecture work.

This decision establishes:
1. A grounded assessment of current architecture against milestone-driven agent requirements.
2. A technology-level review (DTCG, resolver, React Aria, token-first contracts, Storybook docs model) from an AI-agent execution perspective.
3. A prioritized gap-closure roadmap focused on agent observability and long-horizon reliability, not only token correctness.

## Rationale

### 1) What already aligns well with the research

#### 1.1 Explicit composition contracts (strong)
- Resolver documents and validation scripts make token composition order explicit and testable.
- This is conceptually aligned with "intermediate state visibility": the build pipeline can explain how a final output is composed.
- Evidence:
  - `tokens/knowledge/resolver/*.resolver.json`
  - `scripts/resolve-resolver-order.mjs`
  - `scripts/validate-resolver-phase4.mjs`
  - [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md)

#### 1.2 Token-first architecture with machine-readable contracts (strong)
- The system models component semantics through contract files and schema.
- This improves agent predictability and reduces hidden conventions.
- Evidence:
  - `tokens/components/*.contract.json`
  - `schemas/component-contract.schema.json`
  - [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md)

#### 1.3 Runtime state surface via stable data attributes (strong)
- Components expose operational state in machine-readable form (`data-eui-*`, `aria-*`).
- This gives agents inspectable checkpoints at runtime.
- Evidence:
  - `src/ui/button.tsx`
  - `src/ui/components/input/input.structure.css`
  - `src/ui/components/card/card.structure.css`
  - [ADR-0035](./ADR-0035-css-naming-conventions-class-names-vs-data-attributes.md)

### 2) Where the system is currently weak vs milestone-driven agent needs

#### 2.1 AI metadata layer from vision is not implemented system-wide (critical gap)
- The intended runtime-queryable registry and story-level `aiMetadata` are not broadly implemented.
- This weakens agent planning and automatic task decomposition.
- Evidence:
  - [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) defines `src/ui/registry.ts` + `aiMetadata` direction.
  - In current implementation, this remains partial/absent at scale.

#### 2.2 Contract completeness is inconsistent (critical gap)
- Schema requires `behavior`, but many component contracts still miss this field.
- Missing behavior semantics reduces agent ability to reason about intermediate interaction states.
- Evidence:
  - `schemas/component-contract.schema.json` requires `behavior`.
  - Current contract corpus has partial completeness.

#### 2.3 Validation focuses on artifact correctness, not long-horizon agent outcomes (major gap)
- Current checks are strong for tokens/CSS parity and resolver integrity.
- There is no equivalent guardrail for trajectory-level outcomes such as:
  - "stuck midway",
  - wrong termination,
  - milestone completion rate across multi-step UI tasks.

### 3) Technology choices under AI-first lens

#### 3.1 DTCG adoption (net positive)
**Strengths**
- Standardized token structure is machine-parseable and interoperable.
- Improves multi-tool compatibility (design, build, automation, agent tooling).
- Reduces custom parser burden for future agent pipelines.

**Trade-offs**
- Standard compliance alone does not provide runtime milestone semantics.
- Additional project-specific conventions are still required for agent behavior modeling.

Conclusion: DTCG is a strategic positive for AI-first direction.

#### 3.2 Resolver-first composition (positive with governance value)
**Strengths**
- Makes composition order explicit and reviewable.
- Improves deterministic reproducibility and debugging by agents.

**Trade-offs**
- Adds maintenance overhead (resolver docs + validation scripts).
- Benefits depend on strict enforcement in CI and docs.

Conclusion: resolver is the right structural move for agent-oriented reliability.

#### 3.3 React Aria usage (positive for interaction semantics)
**Strengths**
- Encodes accessibility and interaction primitives consistently.
- Provides stable behavioral primitives that can be mapped to machine-readable state.

**Trade-offs**
- Hook-level state still needs explicit projection into shared agent-readable contract semantics.

Conclusion: React Aria is a strong base, but projection to unified agent contract language is incomplete.

#### 3.4 Token-first + component contracts (positive, currently under-realized)
**Strengths**
- Correct long-term abstraction for multi-platform generation (HTML/CSS, TSX, Storybook, future Figma automation).

**Trade-offs**
- Incomplete contract fields reduce practical agent value.
- Contract quality is uneven across components.

Conclusion: direction is correct; operational maturity is the current bottleneck.

## Consequences

### Immediate Governance Effect

Architecture evaluation for new work should include two additional checks:
1. Does this change improve milestone-level observability for agents?
2. Does this change reduce long-horizon failure ambiguity (stuck/termination uncertainty)?

### Prioritized Follow-up Roadmap

#### Phase A: Contract completeness hardening
- Enforce required contract fields (`behavior`, stable `axes` semantics, invariants where relevant) for all active components.
- Add strict validator for full contract corpus, not only reference components.

#### Phase B: Agent metadata layer completion
- Implement lightweight runtime/queryable component registry.
- Add standardized `aiMetadata` blocks to component stories and align them with contracts.

#### Phase C: Milestone instrumentation for agent tasks
- Define canonical milestone schema for interactive flows (form, selection, async, submit, error recovery).
- Add machine-readable completion markers and failure markers in representative flows.

#### Phase D: Agent outcome evaluation
- Introduce trajectory-level evaluation harness for long-horizon UI tasks:
  - completion rate,
  - milestone completion rate,
  - stuck-midway rate,
  - wrong-termination rate.

### Strategic Position

Envy UI is architecturally well-positioned for AI-first development because the project already favors explicit contracts, deterministic composition, and machine-readable state.

The main remaining risk is not architecture direction, but execution depth: agent-facing intermediate-state supervision is not yet first-class across the entire library.

---

## Notes

Primary research reference:
- Wang et al., "Agentic AI Needs Intermediate-States Supervision", arXiv:2603.19685, 2026-03-25.
  - Abstract: https://arxiv.org/abs/2603.19685
  - PDF: https://arxiv.org/pdf/2603.19685

Scope note:
- This ADR is a reflective architecture baseline and prioritization document.
- It does not supersede existing ADRs unless explicitly stated in future updates.

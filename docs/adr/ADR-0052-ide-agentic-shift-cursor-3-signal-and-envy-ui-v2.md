# ADR-0052: IDE Agentic Shift (Cursor 3 Signal) and Envy UI v2

**Document ID:** adr-0052-ide-agentic-shift-cursor-3-signal-and-envy-ui-v2
**Status:** Proposed (Reflective Benchmark)
**Date:** 2026-04-15
**Last Updated:** 2026-04-15
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Strategy Reflection
**Related:**
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model
- [ADR-0021](./ADR-0021-web-components-framework-agnostic-layer.md) — Web Components as Framework-Agnostic Implementation Layer
- [ADR-0032](./ADR-0032-token-override-strategy-multi-tenant-generative-ui.md) — Token Override Strategy for Multi-Tenant and Generative UI
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) — DTCG Resolver Adoption and Phased Migration
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection from Milestone-Driven Agent Research
- [ADR-0051](./ADR-0051-fluent-2-reflection-vs-envy-ui-v2.md) — Fluent 2 Reflection vs Envy UI v2

---
## Context

As of **April 2026**, IDE ecosystems are moving from assistant-style interactions to agentic execution loops.  
Signals from Cursor 3, GitHub Copilot coding agent, VS Code agent mode, and JetBrains Junie show a consistent drift: intent as input, tool-driven execution, repository-level context, and iterative refinement through validation.

For Envy UI v2, this drift is relevant at architectural level: how intent, constraints, validation, and generation are modeled as system primitives.

## Decision

I decided to treat the IDE agentic drift as a directional architecture input for Envy UI v2 evolution.

The focus is:
1. extracting durable patterns;
2. mapping them to our token-contract-resolver system;
3. defining practical next layers without over-design.

## IDE Ecosystem Shift (Condensed)

Current IDE evolution indicates a shift from keystroke assistance to task-level execution:

1. From local code edits to intent-based delegation.
2. From prompt responses to tool-using execution loops with validation.
3. From file-level context to repository-level reasoning with persistent rules/instructions.

## Architectural Patterns (Abstracted)

1. **Intent Interface Pattern**  
Structured intent becomes a first-class interface, not an implicit conversation trace.

2. **Execution Loop Pattern**  
Generate -> validate -> refine becomes the normal control flow.

3. **Constraint-Driven Generation Pattern**  
Output quality depends on machine-readable constraints, not only prompt quality.

4. **System-Context Pattern**  
Agents operate on system context (standards, schemas, repository rules), not single files.

5. **Governed Autonomy Pattern**  
Autonomy is bounded by explicit validation and review gates.

## Architectural Meaning for Envy UI v2

| Ecosystem Drift Signal | Envy UI v2 Architectural Meaning | Current Footing |
|---|---|---|
| Intent-first operation | Introduce machine-readable intent contracts for generation tasks | Partial |
| Iterative execution loops | Connect validators into one explicit refinement pipeline | Partial |
| Constraint-driven output | Keep token/contract/resolver as deterministic generation envelope | Exists |
| Repository-level context | Use architecture docs, schemas, and contracts as execution context surface | Exists |
| Evidence-driven acceptance | Add milestone/trace telemetry for intermediate state supervision | Partial |

## Existing Anchors in Envy UI v2

1. **Intent vs implementation separation exists structurally**  
Token -> contract -> projection separates semantic intent from renderer implementation.

2. **Machine-readable constraints exist**  
Component contracts, schemas, and resolver docs provide deterministic boundaries.

3. **Generation-oriented architecture is explicit**  
AI-assisted token-delta and contract-centric direction is already documented.

4. **System-level modeling already exists**  
Architecture already models composition/resolution/projection as a system, not isolated widgets.

## Gaps to Close

1. **Intent is not yet a first-class artifact**  
Intent remains implicit in prompts/ADRs instead of a machine-readable execution contract.

2. **Feedback loop is still fragmented**  
Validators are strong, but orchestration across token/contract/renderer checks is not unified.

3. **Milestone/state observability is insufficient**  
Intermediate execution state and readiness telemetry remain partial (already noted in ADR-0046).

4. **Pattern-level UX constraints are weaker than token constraints**  
Visual/structural constraints are stronger than behavioral/clarity constraints in current machine-readable surfaces.

## Architecture Layers to Add (Pragmatic)

1. **Intent Contract Layer**  
Define structured task intent: scope, constraints, acceptance checks, and affected system surfaces.

2. **Unified Validation Loop Layer**  
Connect existing validators into one explicit generate -> validate -> refine workflow.

3. **Readiness Telemetry Layer**  
Track intermediate milestones and evidence artifacts across execution phases.

4. **Constraint Expansion Layer**  
Extend contracts from visual mapping toward behavioral, cognitive-clarity, and consistency constraints where justified.

## Impact on DTCDG Token Architecture

1. Tokens remain deterministic source-of-truth (no prompt-only runtime policy).
2. Tokens increasingly act as constraints and invariants, not only as visual values.
3. Behavioral/cognitive requirements should be encoded via adjacent contract fields, not ad hoc code-only conventions.
4. Generation should keep producing constrained deltas (overrides/contracts), not free-form renderer patches.

## Trade-offs

### Benefits for Envy UI v2

1. Better scalability of system evolution through explicit intent + constraints.
2. More reliable AI-assisted generation due to deterministic validation gates.
3. Lower architecture drift across renderers and contexts.

### Risks for Envy UI v2

1. Over-abstraction before intent and telemetry are mature.
2. False confidence from automation if feedback signals are weak.
3. Debug complexity if orchestration grows without clear ownership boundaries.
4. Governance erosion if generated outputs bypass token/contract constraints.

## Strategic Takeaways

### Adopt

1. Formalize structured intent as machine-readable input.
2. Integrate validators into a closed, explicit refinement loop.
3. Expand constraint surfaces in contracts where behavior consistency matters.

### Delay

1. Large orchestration surfaces before intent contracts and telemetry are stable.
2. Broad autonomy expansion before milestone telemetry is stable.

### Avoid

1. Treating agent output as authoritative without constraint/validation gates.
2. Letting execution convenience bypass deterministic system constraints.

## Forward Direction

Near-term direction:
1. Move from prompt-centric operation to intent-contract operation.
2. Build one integrated validation-refinement loop from existing checks.
3. Continue evolving tokens/contracts toward policy-capable generation constraints.

---

## Notes

Inference note: this ADR uses IDE ecosystem documentation as evidence of directional drift. Conclusions are architectural interpretation for Envy UI v2.

## References

### Internal Documents

- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model
- [ADR-0021](./ADR-0021-web-components-framework-agnostic-layer.md) — Web Components as Framework-Agnostic Implementation Layer
- [ADR-0032](./ADR-0032-token-override-strategy-multi-tenant-generative-ui.md) — Token Override Strategy for Multi-Tenant and Generative UI
- [ADR-0036](./ADR-0036-ai-first-component-architecture-vision.md) — AI-First Component Architecture Vision
- [ADR-0044](./ADR-0044-component-contract-definition-and-agent-consumption.md) — Component Contract Definition and Agent Consumption
- [ADR-0045](./ADR-0045-dtcg-resolver-adoption-and-phased-migration.md) — DTCG Resolver Adoption and Phased Migration
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection from Milestone-Driven Agent Research
- [ADR-0051](./ADR-0051-fluent-2-reflection-vs-envy-ui-v2.md) — Fluent 2 Reflection vs Envy UI v2

### External Sources

- Cursor Changelog: <https://cursor.com/changelog>
- Cursor 3.0 (new interface and agent workflow): <https://cursor.com/changelog/3-0>
- VS Code Agent Mode (tool-using coding agent loop): <https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode>
- GitHub Copilot Coding Agent (background task execution model): <https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent>
- JetBrains Junie CLI Quickstart (agentic coding workflow): <https://junie.jetbrains.com/docs/junie-cli.html>

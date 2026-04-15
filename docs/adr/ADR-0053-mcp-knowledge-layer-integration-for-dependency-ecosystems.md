# ADR-0053: MCP Knowledge-Layer Integration for Dependency Ecosystems

**Document ID:** adr-0053-mcp-knowledge-layer-integration-for-dependency-ecosystems
**Status:** Accepted (Implementation Started)
**Date:** 2026-04-15
**Last Updated:** 2026-04-15
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Agent Integration
**Related:**
- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection from Milestone-Driven Agent Research
- [ADR-0049](./ADR-0049-dependency-upgrade-governance-and-traceability.md) — Dependency Upgrade Governance and Traceability
- [ADR-0052](./ADR-0052-ide-agentic-shift-cursor-3-signal-and-envy-ui-v2.md) — IDE Agentic Shift (Cursor 3 Signal) and Envy UI v2
- [WORKFLOW-008](../workflows/WORKFLOW-008-mcp-configuration-workflow.md) — MCP Configuration Workflow

---
## Context

AI-facing integration surfaces in major libraries are moving from plain documentation browsing to machine-readable retrieval layers (MCP servers, agent skills, markdown mirrors, llms.txt indexes).

React Aria is a concrete signal for this shift:
- On **December 16, 2025** (`v1.14.0`), React Aria introduced AI-friendly documentation surfaces and MCP server support in the new docs experience.
- In the same release stream, MCP was split into dedicated packages (`@react-aria/mcp`, `@react-spectrum/mcp`).
- On **April 14, 2026** (`v1.17.0`), React Aria released `@react-aria/mcp@1.1.0`, confirming active iteration rather than a one-off experiment.

For Envy UI, this changes how dependency knowledge should be consumed by agents during implementation work and upgrades.

## Decision

I decided to adopt **MCP knowledge-layer integration** as a first-class dependency integration practice.

This decision means:
1. If an ecosystem provides an official MCP server, it is evaluated during dependency upgrade review.
2. Approved MCP integrations are added to shared onboarding template (`.mcp.example.json`) and workflow inventory.
3. Agent workflows should prefer MCP-backed retrieval for that ecosystem before broad web browsing.
4. MCP adoption is treated as architecture+workflow scope, not only tooling convenience.

## Rationale

1. **Accuracy under agentic workflows**
MCP provides structured, tool-level access to dependency knowledge and reduces ambiguity versus ad hoc page search.

2. **Faster implementation loops**
Agent operations (lookup -> apply -> validate) are faster when context access is stable and machine-oriented.

3. **Dependency governance alignment**
MCP availability becomes part of upgrade/governance signals (alongside API changes, deprecations, and migration cost).

4. **Trend consistency with ADR-0052**
This is a direct operationalization of the "system-context" and "constraint-driven generation" patterns.

## Current-State Fit (Envy UI, 2026-04-15)

| Capability | Current State | Target State | Gap |
|---|---|---|---|
| Local MCP convention | Exists (`.mcp.json`, template, workflow) | Stable shared baseline | Low |
| Shared external MCP sources | Figma-focused setup historically | Add ecosystem MCP where valuable | Medium |
| React Aria MCP usage path | Not standardized before this ADR | Baseline template + workflow inventory | Closed in baseline |
| Dependency upgrade checks for MCP | Implicit/manual | Explicit evaluation step in governance workflow | Medium |
| Agent retrieval policy | Mixed sources, not codified by ecosystem | MCP-first when official server exists | Medium |

## Integration Model (For Future Cases)

When a dependency introduces official MCP support:

1. **Detect** during upgrade review.
2. **Evaluate** against practical criteria:
   - official ownership,
   - maintenance activity,
   - relevance to active Envy UI implementation surfaces,
   - setup complexity/security impact.
3. **Adopt baseline** in `.mcp.example.json`.
4. **Document** inventory and local setup in workflow docs.
5. **Validate** via implementation smoke usage in agent tasks.

## Implementation Notes (Initial Rollout)

This ADR uses React Aria as the initial reference ecosystem for rollout, while the adoption pattern is intentionally ecosystem-agnostic:
- Add `react-aria` MCP server to `.mcp.example.json`.
- Update local `.mcp.json` for immediate development usage.
- Update [WORKFLOW-008](../workflows/WORKFLOW-008-mcp-configuration-workflow.md) inventory and adoption rule.

## Consequences

### Benefits

- Better agent retrieval quality for React Aria implementation tasks.
- Lower friction in API discovery and migration work.
- Reusable pattern for future ecosystems (not React Aria-specific).

### Trade-offs

- Additional operational surface to keep updated.
- Requires periodic verification of MCP package/version health.
- Team setup requires Node-based MCP runtime availability.

---

## Notes

Inference note: decision scope uses React Aria as concrete reference case; pattern is intentionally general for future ecosystem integrations.

## References

### Internal Documents

- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection from Milestone-Driven Agent Research
- [ADR-0049](./ADR-0049-dependency-upgrade-governance-and-traceability.md) — Dependency Upgrade Governance and Traceability
- [ADR-0052](./ADR-0052-ide-agentic-shift-cursor-3-signal-and-envy-ui-v2.md) — IDE Agentic Shift (Cursor 3 Signal) and Envy UI v2
- [WORKFLOW-008](../workflows/WORKFLOW-008-mcp-configuration-workflow.md) — MCP Configuration Workflow

### External Sources

- React Aria — Working with AI: <https://react-aria.adobe.com/ai>
- React Aria release v1.14.0 (December 16, 2025): <https://react-aria.adobe.com/releases/v1-14-0>
- React Aria release v1.17.0 (April 14, 2026): <https://react-aria.adobe.com/releases/v1-17-0>
- React Spectrum release v1.3.0 (AI support notes): <https://react-spectrum.adobe.com/releases/v1-3-0>

# ADR-0044: Component Contract Definition and Agent Consumption

**Status:** Accepted  
**Date:** 2026-02-18  
**Last Updated:** 2026-04-15  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model  
- [ADR-0038](./ADR-0038-canonical-token-css-output-contract.md) — Canonical Token CSS Output Contract  
- [ADR-0043](./ADR-0043-dropdown-trigger-gap-and-focus-clearance.md) — Dropdown Trigger Gap and Focus Clearance  
- [ADR-0046](./ADR-0046-ai-agent-readiness-reflection-from-milestone-driven-agent-research.md) — AI Agent Readiness Reflection from Milestone-Driven Agent Research
- [ADR-0052](./ADR-0052-ide-agentic-shift-cursor-3-signal-and-envy-ui-v2.md) — IDE Agentic Shift (Cursor 3 Signal) and Envy UI v2

---

## Context

The system uses token-first architecture, but "component contract" still appears ambiguous in practice. This ambiguity creates inconsistent authoring and weakens agent-assisted generation because key behavior rules are not always discoverable from contract files alone.

Two concrete issues surfaced:
- Missing contracts for active components.
- Interactive overlay rules (for example, trigger-to-dropdown offset) defined in runtime code but not explicitly expressed in contracts.

## Decision

I decided to lock the meaning and required scope of component contracts for Envy UI.

### 1) What a Component Contract Is

A component contract is a **machine-readable technical specification** that defines:
- selector model (`scope`, `root`, `slots`);
- public semantic axes (`size`, `variant`, `state`, etc.);
- declared variable surface (`componentVars`);
- runtime behavior mapping (`behavior`);
- non-negotiable architectural constraints (`invariants`).

Contracts are not implementation code and are not optional notes.

### 2) Required Contract Coverage

Every active interactive component must have a contract file in `tokens/components/*.contract.json`.

### 3) Agent Consumption Rule

When creating or modifying components, agents must read relevant existing contracts first and reuse established patterns before introducing new axes or variables.

### 4) Overlay Offset Rule (Dropdown/Popover/Menu as Representative Cases)

Any component with trigger-attached floating surfaces (dropdown/popover/menu) must expose offset behavior in contract form:
- declare the offset dependency in contract vars;
- map runtime positioning behavior in `behavior.positioning`;
- align with canonical semantic token `eui.overlay.offset.dropdown`.

If a component uses a component-local alias, that alias must resolve to the same semantic token.

### 5) Schema Requirement

Component contracts are standardized by `schemas/component-contract.schema.json`.

### 6) Focus Clearance Rule for Clipping Surfaces

Any component contract that includes a clipping/scrolling surface with focusable descendants must declare `behavior.focusClearance`:
- policy statement for anti-clipping behavior;
- minimum inset/footprint requirement;
- declared variable names used by runtime/CSS for safe inset and scroll padding.

## Rationale

1. Agents need explicit contract data to generate consistent implementations without guessing.
2. Contracts make cross-component behavior auditable and comparable.
3. Declaring runtime mapping in contracts closes the gap between token policy and implementation behavior.
4. Standardized schema reduces drift and improves tooling reliability.

## Consequences

- Contract files become the canonical technical interface for component behavior modeling.
- Missing contract coverage is treated as architecture debt, not as acceptable temporary state.
- Contract-level behavior consistency (for example overlay offsets, focus-clearance, and comparable runtime mappings) is enforceable by reading contracts, not only by inspecting runtime code.
- Future generation and analysis workflows can rely on deterministic contract structure.

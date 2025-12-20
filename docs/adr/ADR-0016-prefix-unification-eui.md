# ADR-0016: Prefix Unification to eui

**Status:** Accepted  
**Date:** 2025-12-19  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  

---

## Context

The system supports a prefixing scheme across CSS variables, data attributes, and contracts. Multiple active prefixes (for example, env2-ui and ui) are now creating unnecessary surface area and friction without clear benefit at the current scale. The token semantic root and emitted prefix also diverged, creating risk for non–Style Dictionary generators and ad hoc tooling. Divergence between System Prefix and token root is unsafe because it splits semantic vs runtime flows and creates hidden coupling.

## Decision

I decided to unify the active prefix usage and token semantic root to a single canonical source prefix: **eui** (Envisio UI). The prefix system remains in place as an abstraction, but it will resolve to a single prefix for now.

## Rationale

- A single prefix improves consistency and reduces cognitive load.
- eui is short, readable, and globally unique for the design system.
- The prefix abstraction remains intact and can be expanded if future complexity justifies it.

## Consequences

- CSS custom properties, data attributes, and related contracts now use the eui prefix.
- Token JSON files now use eui as the semantic root, and emitted artifacts use eui as the prefix.
- Generators and tooling should treat the token root as the source of truth for the prefix.
- If multiple prefixes become necessary later, this ADR can be revised to re-enable them.

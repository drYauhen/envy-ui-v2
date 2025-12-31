# ADR-0003: Data-Driven Figma Variables Pipeline via Adapter JSON

**Status:** Accepted  
**Date:** 2025-12-15  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0001](./ADR-0001-react-aria-headless.md) — Headless / React Aria strategy  
- [ADR-0002](./ADR-0002-data-driven-storybook-pipeline.md) — Data-Driven Storybook Pipeline

---

## Context

After establishing Envy UI v2 as a **token-first system** (JSON tokens, Style Dictionary, system-level metadata) and formalizing Storybook as a pure consumer, the next architectural challenge was integrating **Figma Variables**.

Initial experiments exposed several structural risks:

* Figma Variables are mutable and easily drift from canonical definitions
* Repeated imports created duplicate collections and variables
* Naive import strategies encouraged destructive wipe-and-replace behavior
* Plugin implementations risked encoding token semantics or structure
* Manual edits in Figma could silently diverge from the design system

Without a clear strategy, Figma risked becoming an uncontrolled source of truth rather than a downstream consumer.

---

## Decision

I decided to treat **Figma as a downstream, stateful consumer** of the Envy UI v2 token system, using a **data-driven adapter pipeline**.

I made the following architectural decisions:

1. **JSON tokens remain the sole source of truth**

   * Canonical values live in version-controlled JSON
   * Figma Variables are derived, never authoritative

2. **Style Dictionary prepares a Figma adapter format**

   * Tokens are transformed into a Figma-oriented adapter JSON
   * The adapter defines collections, variable identity, and values
   * The adapter is a stable data contract, not a build artifact

3. **A custom Figma plugin performs idempotent reconciliation**

   * Collections are matched by name and reused if present
   * Variables are matched by identity (collection + path + type)
   * Existing variables are updated in place
   * Missing variables are created
   * No automatic deletion occurs

4. **Pre-import analysis and confirmation are mandatory**

   * The plugin computes how many variables will be created vs updated
   * The user explicitly confirms before changes are applied

5. **Non-destructive behavior is enforced**

   * Variables not present in adapter JSON are untouched
   * Manual or experimental Figma variables are preserved

6. **Figma plugin acts as a transport layer only**

   * No token taxonomy or semantics are encoded in the plugin
   * The plugin consumes adapter JSON without assumptions
   * Only public, documented Figma Plugin APIs are used

---

## Consequences

### Positive

* Repeated imports are safe and deterministic
* Manual experimentation in Figma is reversible
* Token drift can be corrected at any time via re-import
* Figma scales naturally as token layers expand (semantic, modes)
* The architecture mirrors proven declarative systems (Terraform, Kubernetes)

### Trade-offs

* Removed variables are not auto-cleaned
* Bidirectional sync (Figma → JSON) is explicitly out of scope
* Requires discipline to treat JSON as authoritative

These trade-offs are accepted to preserve safety, clarity, and long-term maintainability.

---

## Explicit Rules

* Figma must not be treated as a source of truth
* Figma imports must reconcile, not replace
* The plugin must never encode token taxonomy or naming rules
* Adapter JSON is the only contract between tokens and Figma
* Derived artifacts are not committed to Git
* Architectural changes require new ADRs, not silent refactors

---

## Notes

This decision establishes a repeatable pattern for additional downstream consumers
(e.g. theming tools, design QA, automated audits) and prepares the system for
aliases, modes, and advanced Figma workflows without compromising stability.

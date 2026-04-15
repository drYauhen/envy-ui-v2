# ADR-XXXX: <Title>

**Document ID:** template-adr-xxxx-title
**Status:** <Proposed | Accepted | Superseded>
**Date:** 2026-04-04
**Last Updated:** 2026-04-06
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Template
**Related:**

- [ADR-XXXX](./ADR-XXXX-title.md) — Example of adjacent architectural context
- [WORKFLOW-005](../workflows/WORKFLOW-005-tokens-workflow.md) — Example of operational workflow context

---
## Context

<Problem statement and background.>

## Decision

I decided to <concise statement of the decision>.

### General Rule (Required)

<State architecture-wide rule in component-agnostic form.>

### Representative Examples (Optional)

<If you include component/library examples, explicitly mark them as representative validation cases, not as scope boundaries of the decision.>

## Rationale

<Why this decision was made; key drivers and constraints.>

## Consequences

<Trade-offs, follow-up implications, and next steps.>

---

## Notes

<Optional: Additional context, examples, or references.>

**For Mermaid diagrams:** Use `graph TD` (vertical orientation), keep font sizes at 14px to match document text, and ensure diagrams integrate seamlessly with surrounding content. See `docs/adr/README.md` for detailed diagram guidelines.

## References

### Internal Documents

- [ADR-XXXX](./ADR-XXXX-title.md) — Related ADR Title
- [WORKFLOW-005](../workflows/WORKFLOW-005-tokens-workflow.md) — Related Workflow (example)
- [ARCH-tokens-003](../architecture/ARCH-tokens-003-token-architecture.md) — Related Architecture Rule (example)

### External Standards

- <https://www.w3.org/TR/WCAG22/>
- <https://www.w3.org/WAI/ARIA/apg/>

**Authoring rule:** Keep the full reference list in this final section. In the body text, add inline links at first mention when a specific statement depends on a document or standard.

**`Related` vs `References -> Internal Documents` (required intent):**
- `Related` in the header is a curated architecture-context list for this ADR (documents this decision depends on, extends, constrains, or supersedes).
- `References -> Internal Documents` is the full internal citation list used across the ADR body.
- `Related` should be concise (typically 3-7 items) and must be a subset of `References -> Internal Documents`.

**Internal Documents format rule (required):**
- Each entry must include both link and document title in one line:
  - `- [DOC-ID](./ADR-0049-dependency-upgrade-governance-and-traceability.md) — Human-readable document title`
- Do not use link-only entries (for example, `- [ADR-XXXX](./ADR-XXXX-title.md)` without title text).
- Separator style: use em-dash `—` between link and title.

**Link behavior rule:** Use normal relative markdown links (do not hardcode Storybook URLs). Internal registered `.md` docs open in the current Storybook tab. Code-file links (`.ts/.tsx/.js/.mjs/.css/.json`) open via Source File Viewer in a new tab. External or unregistered links open in a new tab with external-link indicator.

**Generalization rule (required):**
- Architecture decisions must be phrased in system-level terms.
- Component-specific references are allowed only as representative examples.
- If examples are present, explicitly label them as representative/reference (for example: "Button as representative implementation case").

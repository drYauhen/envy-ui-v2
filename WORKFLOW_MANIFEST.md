WORKFLOW_MANIFEST.md — UI Design System Handoff & Decision Workflow

This document defines how architectural intent, decisions, and handoff context are maintained across development sessions, machines, and AI-assisted workflows.

It is intentionally lightweight and delegates detailed structure to canonical templates where applicable.

⸻

1. Decision Records (ADR)

All architectural decisions are captured as Architectural Decision Records (ADR).

Canonical Rules
	•	Single document type: ADR (no EDR or alternative record types)
	•	Canonical folder: docs/adr/
	•	Canonical template: docs/adr/ADR-TEMPLATE.md

The ADR template is the single source of truth for:
	•	required metadata fields
	•	document structure
	•	tone and authorship conventions

This workflow manifest intentionally does not duplicate ADR structure details.

Naming & Numbering
	•	Filename format: ADR-<4 digits>-<kebab-case-title>.md
	•	Numbers are monotonic and never reused
	•	Changed decisions require a new ADR that supersedes the old one

Linking
	•	Always reference ADRs by number (e.g. ADR-0007)
	•	Use relative links inside docs/adr/

⸻

2. NEXT_STEP.md — Session Bootstrap

NEXT_STEP.md is a committed handoff file used to bootstrap a new chat or work session.

Purpose
	•	Define the current baseline
	•	Summarize what changed last
	•	Explicitly state what to work on next

Rules
	•	Updated at the end of a meaningful session
	•	Concise and operational
	•	References ADRs instead of restating decisions

⸻

3. Canonical Inputs for New Sessions

A typical session bootstrap relies on:
	1.	Tokens (tokens/)
	•	Token-first system (DTCG-aligned)
	•	Source of truth for UI semantics and variation axes
	2.	ADR documents (docs/adr/)
	•	Historical record of architectural intent
	•	Directional, not necessarily reflecting latest implementation details
	3.	NEXT_STEP.md
	•	Immediate execution context
	4.	Pipeline & generators (e.g. Style Dictionary configs)
	•	Reference implementations for consistency

⸻

4. Assistant Expectations

When assisting with architecture or implementation, the assistant must:
	•	Treat tokens as the primary semantic source
	•	Follow ADR-TEMPLATE.md when drafting ADRs
	•	Avoid restating template rules inside ADR content
	•	Assume decisions are owner-driven and AI-assisted

⸻

5. Session Bootstrap Protocol

To ensure reliable continuity across chat sessions and machines, this project uses a two-artifact bootstrap protocol.

Canonical Bootstrap Artifacts

Each new session must start with exactly two inputs:
	1.	NEXT_STEP.md
	2.	A Bootstrap ZIP archive (generated at the end of the previous session)

No other files are assumed to be present by default.

Responsibilities

NEXT_STEP.md
	•	Acts as the session controller
	•	Describes current state, recent changes, and immediate goals
	•	Instructs how to unpack and interpret the Bootstrap ZIP
	•	References ADRs for architectural intent

Bootstrap ZIP
	•	Contains the minimal technical context required to continue work
	•	Must not include build artifacts, dependencies, or generated output
	•	Is treated as an implementation snapshot, not a release artifact

Canonical ZIP Contents (Default Case)

A typical Bootstrap ZIP includes:
	•	tokens/ (entire directory; token-first source of truth)
	•	docs/adr/ (ADR history + ADR-TEMPLATE.md)
	•	WORKFLOW_MANIFEST.md
	•	Style Dictionary configs and custom transformers (if relevant)
	•	Reference components (e.g. packages/tsx/button/)
	•	Supporting scripts used in the current workflow

The exact contents may vary for specialized sessions (e.g. Figma-only work), but this default applies to most development phases.

Execution Order

When starting a new session:
	1.	Read NEXT_STEP.md
	2.	Unpack the Bootstrap ZIP
	3.	Review WORKFLOW_MANIFEST.md for workflow rules
	4.	Treat tokens/ as the primary semantic source
	5.	Use ADRs for historical and directional context

⸻

6. Scope & Evolution

This manifest defines workflow, not product architecture.

It should remain:
	•	concise
	•	referential
	•	stable across sessions

Architectural intent always lives in ADRs; implementation details may evolve independently.
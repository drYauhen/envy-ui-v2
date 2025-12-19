1. Decision Records (ADR)

Architectural Decision Records (ADR) capture the history of architectural reasoning and decision-making over time.

They reflect how thinking evolved at specific moments and are not guaranteed to describe the current or final state of the system.
An individual ADR may become partially outdated, fully superseded, or even represent a direction that was later intentionally reversed.

ADR documents therefore serve as:
	•	a historical record of architectural thinking
	•	context for understanding why certain approaches were explored
	•	reference material for reflection and analysis

ADR documents are NOT:
	•	current system documentation
	•	an authoritative description of the present architecture
	•	executable instructions for implementation

Canonical Rules
	•	Single document type: ADR (Architectural Decision Record)
	•	Canonical folder: docs/adr/
	•	Canonical template: docs/adr/ADR-TEMPLATE.md
	•	Any change in architectural direction MUST be captured as a new ADR

Interpretation Rules
	•	ADRs may contradict each other over time.
	•	Newer ADRs do not automatically invalidate older ones.
	•	User instructions always take precedence over ADR content.

Assistant Behavior
	•	The assistant may consult ADRs for background context only.
	•	The assistant MUST NOT treat ADRs as authoritative or up-to-date specifications.
	•	If user intent conflicts with ADR content, the assistant must follow user intent.
	•	If uncertainty remains, the assistant must stop and ask for clarification.


2. LAST_STEP.md — Optional Session Context

LAST_STEP.md is an optional, free-form context file that may be present at the project root.

Its purpose is to capture high-level context at the end of a working session when no ADR is warranted.

Typical content may include:
	•	What was done during the last session
	•	Why the work matters in the broader project context
	•	Loose or tentative intentions for future work

Rules
	•	Optional; absence is acceptable
	•	No fixed template
	•	No required structure
	•	Informational only; never prescriptive
	•	Must not be treated as an instruction set or task list

Agent Guidance
	•	The assistant may read LAST_STEP.md for orientation only.
	•	LAST_STEP.md must not override user instructions or ADRs.
	•	If LAST_STEP.md conflicts with current user intent, it must be ignored.

3. Canonical Inputs for New Sessions

A typical session bootstrap relies on:
	1.	Tokens (tokens/)
	•	Token-first system (DTCG-aligned)
	•	Source of truth for UI semantics and variation axes
	2.	ADR documents (docs/adr/)
	•	Historical record of architectural intent
	•	Directional, not necessarily reflecting latest implementation details
	3.	LAST_STEP.md (optional)
	•	Free-form summary of the last completed session
	•	May describe what was done, why it matters, and any open context
	•	May include tentative intentions, but is not a task list or commitment
	•	Informational only; never authoritative
	4.	Pipeline & generators (e.g. Style Dictionary configs)
	•	Reference implementations for consistency

⸻

4. Project Structure & Generation Model

This project is token-driven and generative by design.

Design tokens form the foundational layer of the system and represent the primary source of UI semantics.
The project is TypeScript-oriented, reflecting the current company stack,
but is intentionally designed to avoid tight coupling to any single technology.

Platform-specific implementations (e.g. CSS, Figma, React) are treated as destinations of the generative pipeline,
not as the core of the system.

This project uses a strict separation between source code, generated artifacts, and build outputs.

Canonical Rules

	•	generated/ is the single canonical location for all pipeline-generated artifacts.
	•	generated artifacts are human-readable and treated as part of the system contract.
	•	Build outputs (dist/, storybook-static/, previews) are technical artifacts and not part of the pipeline contract.

Directory Mirroring Rule

	•	Any top-level module that participates in generation MUST have a mirrored directory inside generated/.
	•	The mirrored directory name MUST exactly match the source module directory name.
	•	This rule is mandatory and non-optional.

Example

	•	Source: figma-plugin/
	•	Generated: generated/figma-plugin/

If a module does not produce generated artifacts, no mirrored directory is created.

⸻

5. Canonical Terminology & Error Handling

This project uses strict canonical terminology for architectural decision records,
while remaining permissive toward explanatory and supportive documentation.

Canonical Rules

	•	Architectural decisions are documented ONLY as ADR (Architectural Decision Records).
	•	EDR, EDR-like, or alternative architectural record types are invalid and must not be created.
	•	This restriction applies only to architectural decision records,
		not to README files or other explanatory documentation.

Documentation Guidance

	•	README.md files and other explanatory documents are allowed and encouraged.
	•	README files are especially appropriate when:
		–	introducing a new directory or module
		–	adding a new conceptual layer (tokens, adapters, generators, etc.)
		–	changing an existing structure in a non-obvious way

	•	Explanatory documentation must reflect the current state of the system.
	•	Outdated, misleading, or abandoned documentation is considered an error
		and should be updated or removed.

Assistant Behavior

	•	The assistant must enforce ADR as the only architectural decision record type.
	•	The assistant must not interpret this restriction as a ban on README or other documentation.
	•	When creating or modifying structure, the assistant is encouraged to add or update README files
		to explain intent and structure in human-readable terms.

⸻

6. Assistant Expectations

When assisting with architecture, structure, or implementation, the assistant must:

	•	Treat this WORKFLOW_MANIFEST.md as the primary operational source of truth.
	•	Follow ADR-TEMPLATE.md exactly when drafting architectural decisions.
	•	Never invent new document types, workflows, or directory conventions.
	•	Respect the Project Structure & Generation Model.
	•	Enforce the Directory Mirroring Rule for generated artifacts.
	•	Assume consistency and discipline are more important than convenience.

⸻

7. Scope & Evolution

This manifest defines operational workflow, structural rules, and canonical conventions.

It is intended to be:
	•	stable
	•	minimal
	•	enforced

Architectural intent lives in ADRs.
Implementation details may evolve.
Structural rules defined here must remain consistent.
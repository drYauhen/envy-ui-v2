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

Clarification

The restriction to ADR applies exclusively to architectural decision records.

Other architectural or system documentation (e.g. rules, invariants, operational architecture,
current system constraints, or explanatory reference material) MAY exist outside `docs/adr/`
as long as it does NOT capture decisions, alternatives, or historical reasoning.

Such documents are explanatory in nature, must not be treated as ADRs,
and must not replace, duplicate, or compete with architectural decision records.

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
All other layers (components, contracts, adapters, platform outputs) are derived from tokens through
explicit generative pipelines.

The project is TypeScript-oriented, reflecting the current company stack,
but is intentionally designed to avoid tight coupling to any single technology or runtime.

Generated Directory Model (Platform-Oriented)

	•	The first-level directories under `generated/` represent PLATFORM / DESTINATION layers
		(e.g. figma, css, js, tsx), not source modules and not artifact types.
	•	A platform directory groups all artifacts consumed by that platform or runtime.
	•	Artifact types (e.g. tokens, adapters, contracts, structures, components) belong INSIDE a platform directory,
		not as first-level directories.
	•	Artifact-type subdirectories are OPTIONAL and must be introduced only when they improve clarity
		or become necessary due to scale.
	•	Flat structures are acceptable when the number of artifacts is small.
	•	Platforms may represent combinations of technologies (e.g. tsx-react-aria).

	•	The directory structure must reflect conceptual intent, not internal tooling implementation details.

Soft Orienters (Non-Canonical)

Storybook and Style Dictionary serve as *soft orienters* for understanding the system, not as sources of truth.

• Style Dictionary indicates how artifacts are generated, but does not dictate the final structure of `generated/`.
• Storybook reflects how the system is presented and understood by humans, but does not define or enforce directory structure.
• Changes in Storybook MUST NOT automatically trigger structural changes in `generated/`.

These tools provide directional guidance only.
The authoritative rules for structure and organization are defined exclusively in this manifest.

Examples

• Figma outputs:
  generated/figma/
    tokens/
      variables.tokens.full.json
      variables.tokens.scoped.json
    adapter/
      variables.adapter.json
    structures/
      structures.eui.button.json

• CSS outputs:
  generated/css/
    variables.css
    variables-dark.css

• TypeScript / TSX outputs (small scale):
  generated/tsx/
    button.tsx
    button.contract.ts

• TypeScript / TSX outputs (grown structure):
  generated/tsx/
    components/
      button/
        button.tsx
        button.contract.ts

generated/ Documentation Requirements

	•	The root `generated/` directory MUST contain a `README.md` describing:
		–	the purpose of `generated/` as a whole
		–	how to interpret first-level platform directories
		–	what qualifies as a generated artifact versus a build output

	•	Each first-level directory under `generated/` (platform/destination directory) MUST contain a `README.md` describing:
		–	which source modules or workflows produce these artifacts (provenance)
		–	what artifacts are expected to appear here
		–	how to regenerate or refresh the artifacts (high level)
		–	the intended consumers/destinations

	•	Whenever the assistant introduces, removes, renames, or materially reorganizes directories or files under `generated/`,
		the assistant MUST update the relevant `README.md` files so that they reflect the current state.
		Stale or misleading `generated/` documentation is considered an error.

	•	README.md files are REQUIRED at:
		–	the root `generated/` directory
		–	each first-level platform directory under `generated/`
	•	Deeper README.md files are OPTIONAL and should be added only when they improve understanding.

⸻

Personal Sandbox (Explicit Exception)

The `personal/` directory is an explicitly isolated sandbox.

It is not part of the project architecture, generative pipeline, or system contract.
Its contents may include personal utilities, experimental scripts, temporary files,
or workflow-specific helpers that are not intended to be part of the project itself.

The rules defined in this manifest do NOT apply to the `personal/` directory,
with the following single, explicit exception:

	•	Any generated output produced by tools or scripts located inside `personal/`
		MUST be written to `personal/generated/`.

The root-level `generated/` directory is reserved exclusively for
project-level, pipeline-generated artifacts.

Outputs originating from `personal/` MUST NOT be written into the root `generated/` directory.

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

Recommended README Header (Required)

	•	Every README.md file under `generated/` MUST start with a canonical header describing:
		–	the purpose of the directory or artifact group
		–	the relationship to source modules or workflows
		–	the intended consumers or destinations
		–	the artifact types and their roles

The header documents provenance, intent, and context; directory structure documents destination and semantics.  
The header is mandatory, while the remaining README content is flexible and may evolve.

⸻

6. Assistant Expectations

When assisting with architecture, structure, or implementation, the assistant must:

	•	Treat this WORKFLOW_MANIFEST.md as the primary operational source of truth.
	•	Follow ADR-TEMPLATE.md exactly when drafting architectural decisions.
	•	Never invent new document types, workflows, or directory conventions.
	•	Respect the Project Structure & Generation Model.
	•	Enforce the platform-oriented `generated/` model for pipeline artifacts.
	•	Assume consistency and discipline are more important than convenience.

Version Control Behavior

	•	By default, the assistant MUST NOT create git commits.
	•	The assistant may modify files, run generators, and restructure the repository,
		but all changes must remain uncommitted unless explicitly instructed otherwise.
	•	The assistant is allowed to create a git commit ONLY when the task explicitly
		states that committing changes is permitted.
	•	If committing is not explicitly authorized, the assistant must stop after
		preparing changes and report what was modified.

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
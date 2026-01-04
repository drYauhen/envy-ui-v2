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

**For detailed ADR workflow, see:** [`docs/workflows/adr-workflow.md`](./docs/workflows/adr-workflow.md)

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

History Preservation
	•	When LAST_STEP.md is updated, the previous version MUST be archived to `docs/steps/`
	•	Archived files are named using the date from the "Last updated" field: `YYYY-MM-DD-step.md`
	•	Example: If LAST_STEP.md has "Last updated: 2025-12-20", archive it as `docs/steps/2025-12-20-step.md`
	•	The root LAST_STEP.md always contains the most recent session snapshot
	•	This preserves development history as a sequence of dated files

Agent Guidance
	•	The assistant may read LAST_STEP.md for orientation only.
	•	LAST_STEP.md must not override user instructions or ADRs.
	•	If LAST_STEP.md conflicts with current user intent, it must be ignored.
	•	When updating LAST_STEP.md, the assistant MUST archive the previous version to `docs/steps/` before making changes.

3. Canonical Inputs for New Sessions

A typical session bootstrap relies on:
	1.	Tokens (tokens/)
	•	Token-first system (DTCG-aligned)
	•	Source of truth for UI semantics and variation axes
	•	**Workflow:** [`docs/workflows/tokens-workflow.md`](./docs/workflows/tokens-workflow.md)
	2.	ADR documents (docs/adr/)
	•	Historical record of architectural intent
	•	Directional, not necessarily reflecting latest implementation details
	•	**Workflow:** [`docs/workflows/adr-workflow.md`](./docs/workflows/adr-workflow.md)
	3.	LAST_STEP.md (optional)
	•	Free-form summary of the last completed session
	•	May describe what was done, why it matters, and any open context
	•	May include tentative intentions, but is not a task list or commitment
	•	Informational only; never authoritative
	•	Historical versions are preserved in `docs/steps/` as dated files
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

**For detailed workflows, see:** [`docs/workflows/`](./docs/workflows/)

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

**For Storybook workflow, see:** [`docs/workflows/storybook-workflow.md`](./docs/workflows/storybook-workflow.md)

Examples

• Figma outputs:
  generated/figma/
    tokens/
      variables.tokens.full.json
      variables.tokens.scoped.json
    adapter/
      variables.adapter.json
    snapshots/
      YYYY-MM-DD-HHmmss-snapshot.json

• CSS outputs:
  generated/css/
    tokens.css

• TypeScript / TSX outputs (small scale):
  generated/tsx/
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
		–	links to relevant workflow documentation when applicable

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

ADR Diagram Principles

	•	Mermaid diagrams in ADRs MUST use vertical orientation (`graph TD`, not `graph LR`).
	•	Diagram font size MUST match document body text size (14px).
	•	Node sizes MUST be compact, not oversized or dominating the page.
	•	Diagrams MUST integrate seamlessly with surrounding text.
	•	Font sizes, node padding, and spacing are automatically optimized for readability.
	•	See `docs/adr/README.md` for detailed diagram guidelines and best practices.

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

**For AI Assistants and Code Editors**

This section defines rules that apply to all AI assistants, code editors, and automated tools working with this project. These rules are self-contained and do not depend on editor-specific configuration files.

Manifest as Living Document

This manifest is a living document that may lag behind project evolution. The project is actively developed, and new directories, entities, and structures may be introduced that are not yet documented here.

When working with this manifest:

	•	**Follow manifest rules strictly** for documented structures and conventions.
	•	**Do NOT break existing project structures** that are not yet documented in the manifest.
	•	**Respect current project state** - if a directory or pattern exists in the project but is not in the manifest, it is valid and should be preserved.
	•	**Adapt to project evolution** - new structures that emerge should be respected, not removed to match an outdated manifest.
	•	**Update the manifest** when introducing significant structural changes, but do not require manifest updates for every minor addition.

Priority order (when rules conflict):
	1.	User instructions (highest priority)
	2.	Current project structure and existing code
	3.	Manifest rules (for documented structures)
	4.	Workflow documentation
	5.	ADR documents (historical context)

The manifest provides guidance and establishes conventions, but the actual project structure reflects the current reality. When in doubt between manifest rules and existing project structure, preserve the existing structure and note the discrepancy for potential manifest update.

Language Requirement

All code, comments, documentation, and commit messages must use English.

This applies to:
	•	Source code files (`.ts`, `.tsx`, `.js`, `.mjs`, `.css`)
	•	Documentation files (`.md`)
	•	Comments in code
	•	Commit messages
	•	Variable names, function names, and identifiers
	•	Error messages and console logs
	•	README files
	•	Configuration files with human-readable content
	•	All project directories, including `personal/`, `generated/`, `apps/dev-app/`, and `storybook-static/`

Core Expectations

When assisting with architecture, structure, or implementation, the assistant must:

	•	Treat this WORKFLOW_MANIFEST.md as the primary operational source of truth.
	•	Follow ADR-TEMPLATE.md exactly when drafting architectural decisions.
	•	Never invent new document types, workflows, or directory conventions.
	•	Respect the Project Structure & Generation Model.
	•	Enforce the platform-oriented `generated/` model for pipeline artifacts.
	•	Assume consistency and discipline are more important than convenience.
	•	Use English for all code, comments, documentation, and commit messages.

Editor-Specific Configuration

Some editors may support project-specific configuration files (e.g., `.cursorrules` for Cursor IDE). These files are optional and serve as convenience wrappers that reference this manifest. They should not contain rules that are not already present in this document.

If an editor-specific configuration file exists, it should:
	•	Reference this WORKFLOW_MANIFEST.md as the source of truth
	•	Provide quick access to the most critical rules
	•	Not duplicate extensive content (link to this document instead)

The absence of editor-specific configuration files does not affect the validity of rules defined in this manifest.

Version Control Behavior

	•	By default, the assistant MUST NOT create git commits.
	•	The assistant may modify files, run generators, and restructure the repository,
		but all changes must remain uncommitted unless explicitly instructed otherwise.
	•	The assistant is allowed to create a git commit ONLY when the task explicitly
		states that committing changes is permitted.
	•	**When committing is authorized, changes MUST be split into logical, atomic commits:**
		- Each commit should represent a single logical change or related set of changes
		- Related changes should be grouped together in one commit
		- Unrelated changes must be in separate commits
		- Commit messages should clearly describe what was changed and why
		- Examples of separate commits:
		  * "feat(dev-app): Add third-party integration strategy"
		  * "docs(architecture): Add README with documentation index"
		  * "fix(storybook): Resolve importers path error in architecture stories"
		- If user requests to commit "all changes", the assistant must still split them
		  into logical commits based on the nature of changes (features, docs, fixes, etc.)
	•	If committing is not explicitly authorized, the assistant must stop after
		preparing changes and report what was modified.

⸻

7. Workflows Documentation

Detailed operational workflows are documented in `docs/workflows/`:

- **[Tokens Workflow](./docs/workflows/tokens-workflow.md)** - Working with design tokens
- **[Figma Workflow](./docs/workflows/figma-workflow.md)** - Figma integration (plugin, scripts, artifacts)
- **[Storybook Workflow](./docs/workflows/storybook-workflow.md)** - Storybook development and documentation
- **[ADR Workflow](./docs/workflows/adr-workflow.md)** - Writing and managing Architectural Decision Records

This manifest provides the framework and rules; workflows provide step-by-step instructions.

⸻

9. Project Directory Structure

This section describes the main directories in the project. Note that this structure may evolve, and new directories may be added that are not yet documented here. Existing structures take precedence over this documentation.

Core Directories

	•	`tokens/` - Source of truth for design tokens (DTCG-aligned)
	•	`generated/` - Platform-oriented generated artifacts (see section 4)
	•	`docs/` - Documentation (ADR, workflows, architecture)
	•	`scripts/` - Build and generation scripts
	•	`style-dictionary/` - Style Dictionary configuration and formats
	•	`personal/` - Personal sandbox (excluded from rules, see section 4)

Package Directories

	•	`packages/tsx/` - TypeScript/React component implementations
	•	`packages/tailwind/` - Tailwind CSS configuration and utilities
	•	`packages/web-components/` - Web Components implementations

Application Directories

	•	`apps/dev-app/` - Development application (testing, demos)
	  - May have its own conventions
	  - Excluded from main project structural rules

Storybook Structure

	•	`stories/` - Storybook stories organized by category:
	  - `stories/tokens/` - Token documentation stories
	  - `stories/components/` - Component stories
	  - `stories/docs/` - Documentation viewer stories
	  - `stories/viewers/` - Custom story viewers
	  - `stories/architecture/` - Architecture documentation stories

Source Code

	•	`src/ui/` - Component CSS styles (token-consumers)
	•	`src/hooks/` - React hooks
	•	`src/utils/` - Utility functions

Figma Integration

	•	`figma-plugin/` - Figma plugin code
	  - Follows Figma plugin API conventions
	  - Integrates with `generated/figma/` artifacts

Component Model

	•	`component-model/` - Component schema definitions
	  - JSON schemas for component structure
	  - Used by generators and validators

Reference

	•	`reference/` - Reference documentation and guides
	  - Quick reference materials
	  - Migration guides
	  - Legacy system documentation

Note: This directory structure may not be exhaustive. New directories may exist that are not yet documented here. When working with the project, respect existing structures even if they are not listed in this section.

⸻

10. Scope & Evolution

This manifest defines operational workflow, structural rules, and canonical conventions.

It is intended to be:
	•	stable
	•	minimal
	•	enforced

However, this manifest is a living document that evolves with the project:
	•	New directories and structures may be introduced before they are documented here.
	•	The manifest is updated periodically, not continuously.
	•	Existing project structures that are not yet documented are valid and should be preserved.
	•	When significant structural changes are made, the manifest should be updated to reflect them.

Architectural intent lives in ADRs.
Implementation details may evolve.
Structural rules defined here must remain consistent, but the manifest itself may lag behind project evolution.
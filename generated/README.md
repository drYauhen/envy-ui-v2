# generated/

Purpose: Canonical location for human-readable pipeline artifacts derived from tokens.
Source/workflow: Produced by explicit generators (e.g. Style Dictionary, contract scripts) reading `tokens/`.
Consumers/destinations: Platform/runtime layers that consume generated artifacts (e.g. figma, tsx, css, js).
Artifact types/roles: Contracts, variables, adapters, and other platform-specific outputs.

Structure
- First-level directories represent platform/runtime destinations.
- Artifact types live inside platform directories (flat or subdivided as needed).
- Personal utilities write outputs to `personal/generated/`, not this directory.

Regeneration
- Run the producing pipeline for the specific platform directory (see subdirectory READMEs).

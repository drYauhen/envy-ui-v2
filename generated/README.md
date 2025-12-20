# generated/

Purpose: Canonical location for human-readable pipeline artifacts derived from tokens.
Source/workflow: Produced by explicit generators (e.g. Style Dictionary, contract scripts) reading `tokens/`.
Consumers/destinations: Platform/runtime layers that consume generated artifacts (e.g. figma, tsx, css, js).
Artifact types/roles: Contracts, variables, adapters, and other platform-specific outputs.

Structure
- First-level directories represent platform/destination layers.
- Artifact types live inside platform directories (flat or subdivided as needed).
- Personal utilities write outputs to `personal/generated/`, not this directory.

Generated vs build outputs
- Generated artifacts are human-readable pipeline outputs that define the system contract.
- Build outputs (e.g. `dist/`, `storybook-static/`) are runtime artifacts and are not part of the contract.

Regeneration
- Run the producing pipeline for the specific platform directory (see subdirectory READMEs).

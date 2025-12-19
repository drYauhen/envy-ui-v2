# generated/

This directory contains all human-readable generated artifacts produced by the project.
It is the canonical location for generated outputs and is separate from build outputs
(e.g. dist/, storybook-static/, previews), which are not part of the pipeline contract.

Structure
- Each first-level directory mirrors a source module or workflow.
- If a module/workflow produces generated artifacts, it must have a matching directory here.

Regeneration
- Regenerate artifacts by running the producing pipeline or utility for the specific
  generated area (see each subdirectory README for details).

## Session Snapshot (Editable Section)

**Last updated:** 2025-12-19

### Context

This session focused on restoring structural clarity and workflow discipline in the project.
The work was not feature-oriented; it addressed foundational organization, pipeline thinking, and long-term maintainability.

Key themes included generation boundaries, directory structure consistency, and working-mode alignment.

### What was done

- Introduced and formalized Gitflow as the primary development workflow.
  - Established `master` as a stable baseline.
  - Introduced `develop` as the main integration branch.
  - Began working in feature branches for structural changes.

- Reworked workflow concepts to remove false linear planning.
  - Deprecated the concept of “Next Step”.
  - Introduced `LAST_STEP.md` as an optional, contextual session summary.

- Clarified the role of architectural records.
  - Confirmed ADRs as historical records of architectural thinking, not current documentation.
  - Explicitly defined safe agent behavior when ADRs conflict with current intent.

- Began consolidating mental models around pipeline vs build output.
  - Distinguished between generated artifacts (human-readable, pipeline-level) and build outputs (technical, disposable).

### Why it matters

These changes establish a stable foundation for further development without accumulating hidden structural debt.

They reduce ambiguity for both humans and agents by:
- separating history from instruction,
- separating context from planning,
- and separating pipeline artifacts from build outputs.

This creates a project structure that can evolve without requiring repeated re-interpretation of intent.

### Open context / notes

- Further work is expected around formalizing the `Generated/` directory and its mirroring rules.
- Additional cleanup of legacy workflow assumptions may still be required.
- No new product features were added during this session.
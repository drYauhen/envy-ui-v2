# WORKFLOW_MANIFEST.md — UI Design System Handoff and Decision Records

This repository uses lightweight, versioned documents to keep architecture decisions, implementation milestones, and “handoff context” consistent across machines and chat sessions.

---

## 1. Document Types

### 1.1 ADR / EDR (Decision Records)

We use **ADR-style Engineering Decision Records** (EDRs) to capture architectural decisions. In this repository they are stored as **ADR-XXXX** files.

**Location**
- `adr/` (canonical folder)

**Filename format**
- `adr/ADR-0006-focus-policy-architecture.md`
- Pattern: `ADR-<4 digits>-<kebab-case-title>.md`

**Numbering rules**
- Numbers are **monotonic** and **never reused**.
- If a decision changes, create a new ADR that **supersedes** the old one (do not renumber existing ADRs).

**Required header fields**
- `Status:` Proposed | Accepted | Deprecated | Superseded
- `Date:` YYYY-MM-DD
- `Related:` list of ADR references

**Minimum recommended structure**
1. Decision Summary
2. Problem Statement / Context
3. Decision
4. Alternatives Considered (optional but recommended)
5. Consequences (positive + trade-offs)
6. Non-Goals / Deferred Items (explicitly)
7. Status

**Linking convention**
- Prefer relative links with the filename, for example (inside `adr/`):
  - `[ADR-0004](./ADR-0004-context-aware-ui-components-and-projection-model.md)`
- When referencing ADRs in prose, always use the ADR number (`ADR-0006`) to avoid ambiguity.

---

### 1.2 NEXT_STEP.md (Session Handoff)

`NEXT_STEP.md` is a **committed** handoff document used to start a new chat session on any machine.

**Purpose**
- Provide an unambiguous “start point” for a new chat session.
- List the current baseline, what changed last, and what to do next.

**Rules**
- `NEXT_STEP.md` is committed and updated at the end of a working session.
- It should be concise and operational.
- It must reference ADRs as the source of truth for decisions.

---

## 2. How the Assistant Should Generate ADRs

When generating a new ADR, the assistant must provide:

1. **Exact filename** to use (e.g. `adr/ADR-0007-<title>.md`)
2. The **full Markdown content**, matching the structure above
3. If needed, a **downloadable `.md` file** for direct drop-in
4. Update guidance for references (e.g., which ADRs should link to the new ADR)

---

## 3. Repository Baseline Assumptions (Stable)

- Token-first system aligned to **DTCG / Style Dictionary**
- Canonical namespace: **`ui`**
- Axis separation is enforced conceptually:
  - Component / Intent / Context / State / Scheme
- Context-aware projection model is adopted (see ADRs)

---

## 4. ADR Index (Optional but Recommended)

If this repository grows, introduce a simple index:
- `adr/README.md` listing ADRs in order with one-line summaries.

(For now, `NEXT_STEP.md` plus filenames in `adr/` is sufficient.)

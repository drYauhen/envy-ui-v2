# Architecture Documentation

**Document ID:** ARCH-system-001-architecture-documentation
**Status:** Draft
**Date:** 2026-01-15
**Last Updated:** 2026-01-14
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**


---

This directory contains **current architectural rules, standards, and references** for Envy UI. These documents define how the system works **now**, not historical decisions.

## Difference from ADR

**Architecture Documents (this directory):**
- ✅ Current rules and standards
- ✅ Enforceable guidelines
- ✅ Reference documentation
- ✅ Updated as the system evolves

**ADR (Architectural Decision Records):**
- 📜 Historical records of decisions
- 📜 Context for why decisions were made
- 📜 Not current system documentation
- 📜 See [`../adr/README.md`](../adr/README.md) for ADR documentation

## Documentation Index

### Rules & Standards

**Enforceable rules that must be followed:**

- **[Component CSS Architecture](./ARCH-components-001-component-css-architecture.md)** - Mandatory rules for component CSS implementation (single source of truth, no hardcoded values, OKLCH color space, theme overrides)
- **[Token Usage Rules](./ARCH-tokens-004-token-usage-rules.md)** - Rules for using design tokens in CSS, contracts, and generated outputs
- **[System Prefix](./ARCH-system-006-system-prefix.md)** - Canonical prefix system (`eui`)

### References

**Comprehensive reference documentation:**

- **[Token Architecture](./ARCH-tokens-003-token-architecture.md)** - Complete token system architecture, DTCG compliance, and developer tooling
- **[Accessibility Reference](./ARCH-accessibility-001-accessibility-reference.md)** - ARIA roles, WAI-ARIA patterns, and React Aria hooks reference
- **[Dev App Architecture](./ARCH-system-004-dev-app-architecture.md)** - Architecture of the development application

### Guides

**Architectural guides and patterns:**

- **[ADR Validation and Implementation](./ARCH-system-003-architecture-validation-through-implementation.md)** - Process for validating architectural decisions through implementation and maintaining ADR-implementation synchronization
- **[Hero Section Theme Architecture](./ARCH-theme-001-hero-section-theme-architecture.md)** - Theme architecture for hero sections
- **[Component Naming Conventions](./ARCH-components-002-component-naming-conventions.md)** - Recommended naming patterns for components and variants
- **[Layout Composition Guide](./ARCH-layout-001-layout-composition-guide.md)** - Canonical layout patterns and composition rules

## Creating New Architecture Documents

### When to Create an Architecture Document

Create an Architecture document when:
- ✅ You need to define **current rules** or **standards**
- ✅ You need to provide **reference documentation**
- ✅ You need to document **how the system works now**
- ✅ The content is **enforceable** or **actionable**

**Do NOT create an Architecture document for:**
- ❌ Historical decisions (use ADR instead)
- ❌ Exploratory ideas (use ADR with status "Exploratory")
- ❌ One-time decisions (use ADR)

### Workflow for Creating Architecture Documents

1. **Create the markdown file** in `docs/architecture/`
   - Use descriptive, kebab-case filename: `my-architectural-rule.md`
   - Follow existing document structure

2. **Add to this README** (index)
   - Add entry in appropriate category (Rules, References, or Guides)
   - Use format: `- **[Title](./filename.md)** - Brief description`

3. **Create Storybook story** (if needed for viewing in Storybook)
   - Create `stories/docs/architecture/filename.stories.tsx`
   - Follow pattern from `accessibility-reference.stories.tsx`
   - Use `DocViewer` component

4. **Update docs-registry.ts** (if needed)
   - Add entry to `architectureDocs` array in `stories/viewers/docs/docs-registry.ts`
   - Include `storybookId` when the document has a Storybook story (for link mapping)

5. **Add metadata** (recommended)
   - Add `**Last Updated:**` date
   - Add `**Related ADR:**` links if applicable
   - Add `**Category:**` (Rules / Reference / Guide)

### Linking to Architecture Documents

**From ADR:**
```markdown
See [Token Usage Rules](../architecture/ARCH-tokens-004-token-usage-rules.md) for current rules.
```

**From other Architecture documents:**
```markdown
See [Component Naming Conventions](./ARCH-components-002-component-naming-conventions.md) for naming patterns.
```

**From workflow documentation:**
```markdown
See [Architecture Documentation](../architecture/ARCH-system-001-architecture-documentation.md) for current rules and standards.
```

## Important Notes for AI Agents

⚠️ **CRITICAL:** When creating links to Architecture documents:

1. **Check if document exists** before linking
   - If document doesn't exist, **create it first**
   - ❌ **NEVER create broken links**
   - ✅ Always verify file exists: `ls docs/architecture/document-name.md`

2. **Use correct path format:**
   - From ADR: `../architecture/filename.md`
   - From Architecture: `./filename.md`
   - From workflows: `../architecture/filename.md`
   - Always use relative paths

3. **When creating new Architecture document:**
   - ✅ Create the markdown file first
   - ✅ Add entry to this README index (appropriate category)
   - ✅ Create Storybook story if needed (`stories/docs/architecture/filename.stories.tsx`)
   - ✅ Update `docs-registry.ts` if needed
   - ✅ Add metadata (Last Updated, Related ADR, Category)
   - ✅ Verify all links work

4. **Workflow for linking from ADR:**
   ```
   1. Check: ls docs/architecture/document-name.md
   2. If missing → Create document → Update README → Create story → Verify
   3. If exists → Use correct path format → Verify link works
   ```

5. **Create Storybook story** if document should be viewable in Storybook
   - Follow pattern from `accessibility-reference.stories.tsx`
   - Use `DocViewer` component
   - Export name: PascalCase (e.g., `TokenUsageRules`)

6. **Add metadata** to new documents:
   - `**Last Updated:**` date
   - `**Related ADR:**` links (if applicable)
   - `**Category:**` (Rules / Reference / Guide)

## Related Documentation

- **[ADR Documentation](../adr/README.md)** - Historical decision records
- **[Documentation Guide](../DOCS-GUIDE.md)** - General documentation guidelines
- **[ADR Workflow](../workflows/adr-workflow.md)** - How to create and manage ADRs

# Legacy Documentation Archive

**Archive Date:** 2026-01-17
**Cleanup Branch:** cleanup/legacy-docs-2026-01-17
**Rationale:** Consolidation of outdated, duplicate, and abandoned documentation

## What's Archived Here

This directory contains documentation that was removed from the active project structure but preserved for historical reference and potential future retrieval.

### Directory Structure

```
Legacy/
├── README.md (this file)
├── 2026-01-17-cleanup-manifest.md     # Detailed cleanup manifest
├── docs/dirty/                         # 88 abandoned research and placeholder documents
│   ├── empty/                          # 15 empty files (0 bytes) - never populated
│   ├── placeholders/                   # 65 placeholder files (3 bytes each) - abandoned stubs
│   └── research/                       # 8 substantial research documents (11K-30K)
├── stories/docs/                       # 1 orphaned Storybook story with broken path
└── migrations/                         # 1 completed migration report
```

## Contents

### docs/dirty/

**Context:** This directory was .gitignored and contained abandoned exploration documents.

#### empty/ (15 files, 0 bytes each)

Files that were created as placeholders but never populated:
- CHECKBOX_SWITCH_ARCHITECTURE.md
- COMPONENT_SLOTS_ARCHITECTURE.md
- DATA_ATTRIBUTES_AUDIT.md
- DECORATION_COMPATIBILITY_RULES.md
- DECORATION_SCHEME_PROPOSAL.md
- ICON_SYSTEM_MULTI_LAYER_ARCHITECTURE.md
- LAYOUT_COMPONENTS_ARCHITECTURE.md
- MENU_COMPONENT_ARCHITECTURE.md
- MODAL_DIALOG_ARCHITECTURE.md
- PLACEHOLDER_SKELETON_ARCHITECTURE.md
- POSITIONING_LIBRARY_ARCHITECTURE.md
- REACT_ARIA_DATA_ATTRIBUTES_OPTIMIZATION.md
- README.md
- SVG_ICON_LIBRARY_ORGANIZATION.md
- SVG_NORMALIZATION_STRATEGY.md

#### placeholders/ (65 files, 3 bytes each)

Files containing only placeholder markers (typically "   ") - abandoned exploration stubs. These were likely created during brainstorming sessions but never developed.

**Notable patterns:**
- Multiple variants of same topics (e.g., CHECKBOX_SWITCH_ARCHITECTURE_V2.md, _FULL.md, _CORRECTED.md)
- Icon system explorations (EXTRACT_SVG_GUIDE.md, ICON_SYSTEM_*.md)
- Typography research (TYPOGRAPHY_*.md - multiple files)
- Counter/Badge variations (COUNTER_*.md - multiple files)

#### research/ (8 files with substantial content)

These files contain actual research and analysis that may be valuable for future reference:

1. **TYPOGRAPHY_AUDIT_PLAN.md**
   - Comprehensive typography system audit
   - Token structure analysis
   - May inform future typography decisions

2. **INPUT_GROUP_POSITIONING_COMPARISON.md**
   - Comparative analysis of input group positioning strategies
   - Industry research

3. **INPUT_GROUP_ICONS_RESEARCH.md**
   - Icon placement research for input components
   - Best practices analysis

4. **TOKEN_STRUCTURE_PROPOSAL.md**
   - Token architecture proposal
   - Superseded by current implementation (ADR-0041)

5. **TYPOGRAPHY_LAYER_WORKFLOW.md**
   - Typography layer generation workflow

6. **TYPOGRAPHY_TEXT_STYLE_MAPPING.md**
   - Text style mapping strategy

7. **VIEWERS_ORGANIZATION_REVIEW.md**
   - Storybook viewer organization review

8. **TAILWIND_USAGE_OPTIONS.md**
   - Tailwind CSS integration options

### stories/docs/

**theme-structure-analysis.stories.tsx**
- Orphaned Storybook story file
- References non-existent markdown path: `/docs/architecture/../theme-structure-analysis.md`
- Superseded by current architecture documentation system (ARCH-theme-002)
- Related to the Jan 13, 2026 architecture reorganization

### migrations/

**ARCHITECTURE_RENAME_PLAN.md**
- Migration report from January 13, 2026
- Documents the ARCH- taxonomy reorganization
- Successfully completed - all 17 architecture documents renamed
- Historical reference for understanding current structure

## Why These Files Were Archived

### Outdated/Superseded
- **ARCHITECTURE_RENAME_PLAN.md** - Migration completed, superseded by current state
- **theme-structure-analysis.stories.tsx** - Replaced by ARCH-theme-002 story
- **TOKEN_STRUCTURE_PROPOSAL.md** - Superseded by current token architecture (ADR-0041)

### Abandoned Exploration
- **docs/dirty/** - 88 files of abandoned research and placeholders
- Most were never developed beyond initial creation
- Already .gitignored, indicating they were considered temporary

### Broken References
- **theme-structure-analysis.stories.tsx** - Markdown path doesn't exist

## Retrieving Archived Content

If you need to reference or restore any archived content:

### View file in Legacy

```bash
cat Legacy/docs/dirty/research/TYPOGRAPHY_AUDIT_PLAN.md
```

### Restore file to active project

```bash
# Copy to restore (preserving archive)
cp Legacy/docs/dirty/research/TYPOGRAPHY_AUDIT_PLAN.md docs/research/

# Or move back
git mv Legacy/docs/dirty/research/TYPOGRAPHY_AUDIT_PLAN.md docs/research/
```

### View git history

```bash
# Files moved with git mv preserve history
git log --follow Legacy/migrations/ARCHITECTURE_RENAME_PLAN.md
```

## Cleanup Summary

**Files moved:** 90 total
- 88 files from docs/dirty/ (15 empty, 65 placeholders, 8 research)
- 1 story file from stories/docs/
- 1 migration report from root

**Files deleted:** 0 (all preserved)

**Git operations:** Tracked files moved with `git mv` to preserve history

**Pre-cleanup snapshot:** Git tag `pre-legacy-cleanup-2026-01-17`

## Related Documentation

- **docs/migrations/2026-01-14-unified-doc-processing.md** - Active migration docs
- **docs/DOCS-GUIDE.md** - Current documentation standards
- **.gitignore** - Lines documenting ignored directories

## Notes

### public/docs/adr/ NOT Archived

The duplicate ADR files in `public/docs/adr/` were **intentionally left alone**:
- Generated by `scripts/copy-docs-to-public.mjs`
- Required for Storybook static serving
- Already .gitignored
- Part of build process, not source files
- Both `ADR-XXXX.md` and `ADR-XXXX-full-name.md` formats serve different purposes

### Future Cleanup

If additional cleanup is needed:
1. Create new dated subdirectory: `Legacy/2026-XX-XX/`
2. Update this README with new section
3. Preserve git history with `git mv`

---

**Archived by:** Eugene Goncharov (with Claude Code assistance)
**Archive Reason:** Documentation consolidation - remove outdated/abandoned files
**Restoration Policy:** Files can be restored if needed; preserved for historical reference

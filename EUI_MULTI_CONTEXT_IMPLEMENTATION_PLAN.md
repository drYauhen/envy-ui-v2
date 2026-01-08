# EUI Multi-Context Theming Architecture - Implementation Plan

## Overview
Implementation of the 3-layer token architecture with container-island theming model.

**Goal**: Build predictable, extensible token and theming architecture that supports multiple contexts (app/web/report), nested and parallel context islands, independent theme switching, and works across Web (CSS), Figma Variables, and JSON/DTCG.

## Architecture Summary

### 3-Layer Token Model
- **Layer A: Primitives** - Global raw scales (colors, spacing, radius, fonts)
- **Layer B: Context Semantics** - Per-context foundational decisions
- **Layer C: Component Contract** - Unified component API

### Container-Island Model
```html
<div data-eui-context="app" data-eui-theme="default">
  <div data-eui-context="web" data-eui-theme="dark">
    <!-- Nested contexts work perfectly -->
  </div>
</div>
```

---

## 📋 Implementation Phases

### 🎯 Phase 1: Foundation Setup (Token Structure) ✅ COMPLETED
**Goal:** Establish the 3-layer token model and new directory structure.

**Status:** ✅ Completed
**Actual Time:** ~45 minutes

#### 1.1 Create Primitives Layer ✅ COMPLETED
- [x] Extract raw scales from current foundations
- [x] Create `tokens/primitives/` directory
- [x] Move color scales, spacing steps, radius steps, font sizes to primitives
- [x] Update references in semantic tokens to use primitives
- [x] Created `tokens/primitives/colors/` (tonal scales)
- [x] Created `tokens/primitives/shape.json` (radius steps)
- [x] Created `tokens/primitives/spacing.json` (pixel spacing steps)
- [x] Created `tokens/primitives/typography.json` (pixel font sizes, weights, etc.)

#### 1.2 Restructure Context Semantics ✅ COMPLETED
- [x] Rename `tokens/app/foundations/` → `tokens/contexts/app/semantics/`
- [x] Rename `tokens/app/semantic/` → merge into `tokens/contexts/app/semantics/`
- [x] Create `tokens/contexts/web/semantics/` (empty for now)
- [x] Create `tokens/contexts/report/semantics/` (empty for now)

#### 1.3 Create Theme Structure ✅ COMPLETED
- [x] Move `tokens/app/themes/` → `tokens/contexts/app/themes/`
- [x] Ensure theme files contain only semantic overrides
- [x] Create empty theme structures for web/report contexts

#### 1.4 Add Component Contract Layer ✅ COMPLETED
- [x] Create `tokens/components/` directory
- [x] Define component tokens (button, input, card, etc.)
- [x] Create context mappings: `tokens/contexts/app/components.json`

---

### 🎯 Phase 2: CSS Generation System
**Goal:** Update Style Dictionary to generate the new architecture.

**Status:** ⏳ Pending
**Estimated Time:** 3-4 hours

#### 2.1 Update CSS Format
- [ ] Generate primitives in `:root`
- [ ] Generate context semantics in `[data-eui-context="X"]`
- [ ] Generate theme overrides in `[data-eui-context="X"][data-eui-theme="Y"]`
- [ ] Generate component mappings per context

#### 2.2 Create Separate CSS Files
- [ ] `primitives.css` - Raw scales
- [ ] `contexts.css` - Context semantics + theme overrides
- [ ] `components.css` - Component mappings

#### 2.3 Update Build Scripts
- [ ] Modify `package.json` scripts for multiple CSS outputs
- [ ] Update Style Dictionary config for new file structure

---

### 🎯 Phase 3: Component System Integration
**Goal:** Make components context-agnostic.

**Status:** ⏳ Pending
**Estimated Time:** 4-5 hours

#### 3.1 Update Component Styles
- [ ] Change components to use `--eui-button-bg` instead of `--eui-app-color-brand`
- [ ] Ensure all components use component contract variables

#### 3.2 Create Context Mapping System
- [ ] Each context defines how its semantics map to component tokens
- [ ] Example: `--eui-button-bg: var(--eui-app-color-brand)`

#### 3.3 Update ContextThemeScope Component
- [ ] Change from `data-eui-{context}-theme` to `data-eui-context` + `data-eui-theme`
- [ ] Support nested context islands

---

### 🎯 Phase 4: Validation & Testing
**Goal:** Ensure architecture works correctly.

**Status:** ⏳ Pending
**Estimated Time:** 2-3 hours

#### 4.1 Create Test Pages
- [ ] Nested context islands
- [ ] Parallel context islands
- [ ] Theme switching within contexts

#### 4.2 Update Storybook Integration
- [ ] Modify addons to use new attribute system
- [ ] Test context switching

#### 4.3 Validate CSS Cascade
- [ ] Ensure proper inheritance
- [ ] Test specificity rules

---

### 🎯 Phase 5: Figma Variables (Future)
**Goal:** Generate Figma collections from new structure.

**Status:** ⏳ Future
**Estimated Time:** 4-5 hours

#### 5.1 Create Figma Export Scripts
- [ ] Generate collections: Primitives, App Semantics, Web Semantics, etc.
- [ ] Set up proper aliases between collections

#### 5.2 Update Figma Plugin
- [ ] Support new collection structure
- [ ] Handle context-to-component mappings

---

## 📊 Current Progress Tracking

### Phase 1 Progress
- [x] Plan created and approved
- [x] 1.1 Create Primitives Layer ✅ COMPLETED
- [x] 1.2 Restructure Context Semantics ✅ COMPLETED
- [x] 1.3 Create Theme Structure ✅ COMPLETED
- [x] 1.4 Add Component Contract Layer ✅ COMPLETED

### Key Invariants (Must Maintain)
- [x] Theme never writes to :root / html / body
- [x] Theme overrides always scoped: context + theme
- [x] Each context has unique namespace variables
- [x] Container-island is single source of appearance changes
- [x] Nested and parallel islands work without special cases

---

## ✅ Success Criteria

- [ ] Nested contexts work: `<div data-eui-context="app"><div data-eui-context="web">`
- [ ] Theme switching: `[data-eui-context="app"][data-eui-theme="accessibility"]`
- [ ] Component portability: Same component works in all contexts
- [ ] CSS cascade: Nearest ancestor context wins
- [ ] No variable conflicts between contexts

---

## 🚀 Implementation Notes

- **Start Small**: Begin with app context only, expand to web/report later
- **Incremental**: Each phase can be tested independently
- **Backwards Compatible**: Maintain existing functionality during transition
- **Validation**: Test each phase before moving to next

---

*Last Updated: January 8, 2026*
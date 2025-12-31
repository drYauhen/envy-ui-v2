# ADR-0020: Elevation System Architecture

**Status:** Accepted  
**Date:** 2025-12-20  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  

- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes
- [ADR-0014](./ADR-0014-color-model-tonal-scales-and-contextual-architecture.md) — Color Model, Tonal Scales, and Contextual Architecture

---

## 1. Context

Elevation (shadows and visual depth) is a key tool for creating visual hierarchy in interfaces. Different components (Cards, Menus, Modals, Dropdowns, Tooltips) require different elevation levels for proper visual separation and functional hierarchy.

**Problem:** The system needs to determine:
- How to organize the elevation token system
- Which elevation levels to use for different components
- How elevation correlates with z-index
- What principles and rules to apply

**Industry standards show:** Most mature design systems follow the principle: **the higher an element is in the z-index hierarchy, the greater its elevation**.

---

## 2. Decision

I adopt a **hierarchical elevation model** based on functional importance of components, with explicit correlation between elevation and z-index.

### A. Semantic Elevation Tokens

**Decision:** Use bidirectional scale (consistent with radius system):

```
none → small → default → large → extra-large
```

**Tokens:**
- `eui.shadow.none` — No shadow (flat elements: buttons, inputs, flat cards)
- `eui.shadow.small` — Subtle elevation (1-2dp, cards, panels)
- `eui.shadow.default` — Standard elevation (2-4dp, standard cards, containers)
- `eui.shadow.large` — Prominent elevation (8-12dp, menus, dropdowns, modals)
- `eui.shadow.extra-large` — Maximum elevation (16-24dp, tooltips, highest priority modals)

**Rationale:**
- Consistency with existing radius system (bidirectional scale)
- Intuitive hierarchy (none → small → default → large → extra-large)
- Aligns with industry standards (most design systems use similar semantic naming)
- Sufficient granularity for all components

### B. Component Elevation Mapping

**Decision:** Elevation should reflect **functional hierarchy**, not just visual hierarchy.

**Component Mapping:**

| Elevation Level | Depth      | Components                                    |
| --------------- | ---------- | --------------------------------------------- |
| none            | 0dp        | Buttons (default state), Inputs, Flat cards   |
| small           | 1-2dp      | Cards (subtle variant), Panels                |
| default         | 2-4dp      | Cards (elevated variant, default), Standard containers |
| large           | 8-12dp     | Menus, Dropdowns, Popovers, Modals (standard), Cards (strong variant) |
| extra-large     | 16-24dp    | Tooltips, Highest priority modals             |

**Specific Rules:**

1. **Buttons**: `none` (flat design, consistent with modern design trends)
2. **Cards**: 
   - `flat` variant → `none`
   - `elevated` variant → `default`
   - `strong` variant → `large`
3. **Menus/Dropdowns**: `large`
4. **Modals**: `large` (standard), `extra-large` (critical/high-priority)
5. **Tooltips**: `extra-large` (highest elevation)
6. **Detail Panel**: Custom left-side shadow (context-specific, not standard elevation)

**Rationale:**
- Functional hierarchy: floating UI (menus) above content (cards)
- Consistency: same components → same elevation
- Industry standards: aligns with common practices in mature design systems

### C. Z-Index Correlation

**Decision:** Elevation should **explicitly correlate** with z-index.

**Z-Index Layers:**

```css
/* Proposed z-index tokens (for reference) */
--eui-z-index-base: 0;        /* Background content */
--eui-z-index-content: 100;    /* Cards, panels */
--eui-z-index-interactive: 200; /* Buttons, inputs (hover/focus) */
--eui-z-index-floating: 300;    /* Menus, dropdowns */
--eui-z-index-overlay: 400;     /* Modals */
--eui-z-index-top: 500;         /* Tooltips */
```

**Correlation Rule:**

| Z-Index Range | Elevation Level | Layer Description                    |
| ------------- | --------------- | ------------------------------------ |
| 0-100         | none/small/default | Content layer                        |
| 200           | small/default | Interactive layer                    |
| 300           | large         | Floating layer (menus, dropdowns)    |
| 400           | large/extra-large | Overlay layer (modals)                |
| 500           | extra-large    | Top layer (tooltips)                  |

**Rationale:**
- Explicit correlation prevents visual inconsistencies
- High z-index = high elevation (intuitive)
- Aligns with industry standards (common practice in design systems)

### D. Principles and Rules

**1. Functional Hierarchy Principle**

Elevation should reflect **functional importance** of an element, not just visual hierarchy.

- Background content (cards, panels) → Low elevation
- Floating UI (menus, dropdowns) → High elevation
- Overlays (modals) → Very high elevation
- Critical UI (tooltips) → Maximum elevation

**2. Z-Index Correlation Rule**

If an element has `z-index: N`, its elevation should correspond to that level:
- `z-index: 300` → `elevation: large`
- `z-index: 400` → `elevation: large` (or `extra-large` for critical)
- `z-index: 500` → `elevation: extra-large`

**3. Consistency Principle**

Components with the same functional role should have the same elevation:
- All **Menus** → `large`
- All **Modals** → `large` (or `extra-large` for critical)
- All **Cards (elevated)** → `default`
- All **Tooltips** → `extra-large`

**4. Context Awareness**

Elevation may vary depending on context:
- **Detail Panel**: Custom left-side shadow (not standard elevation)
- **Modal in Modal**: Second modal may have `extra-large` for visual separation
- **Card in Modal**: Card inside modal may have `small` instead of `default`

**5. Dynamic Elevation (Optional)**

Elements may change elevation on interaction (optional):
- **Button**: `none` → `small` (hover, if needed)
- **Card**: `default` → `large` (hover, if needed)
- **Menu**: `large` (static, does not change)

**Note:** In the current system, buttons remain flat (`none`), which aligns with modern design trends.

---

## 3. Consequences

### Positive

1. **Clear visual hierarchy:** Elevation creates intuitive understanding of functional importance
2. **Consistency:** Same components have the same elevation
3. **Standards alignment:** System aligns with industry standards (common practices in design systems)
4. **Scalability:** Bidirectional scale allows easy addition of new levels if needed
5. **Explicit correlation:** Z-index and elevation are explicitly linked, preventing visual inconsistencies

### Negative

1. **Complexity for newcomers:** Need to understand functional hierarchy to choose correct elevation
2. **Contextual exceptions:** Detail Panel uses custom shadow (not standard elevation)
3. **Dynamic elevation:** Optional elevation changes on interaction may complicate the system

### Neutral

1. **Z-index tokens:** Proposed for future implementation (not critical for current system)
2. **Tooltips:** `extra-large` defined for future components

---

## 4. Implementation Notes

### Current State

✅ **Already implemented:**
- Semantic tokens: `eui.shadow.none`, `small`, `default`, `large`, `extra-large`
- Component tokens:
  - `eui.card.variant.elevated.shadow` → `default`
  - `eui.card.variant.flat.shadow` → `none`
  - `eui.card.variant.strong.shadow` → `large`
  - `eui.menu.shadow` → `large`
  - `eui.modal.shadow.elevation` → `large`
  - `eui.detail-panel.shadow.left` → Custom left-side shadow

### Future Enhancements

💡 **Can be added:**
- Z-index tokens for explicit correlation with elevation
- `extra-large` for critical modals (if needed)
- Tooltip component with `extra-large` elevation

### Usage Guidelines

**Correct:**
```css
/* ✅ Use semantic tokens */
box-shadow: var(--eui-shadow-large);

/* ✅ Component tokens reference semantic tokens */
box-shadow: var(--eui-menu-shadow); /* → eui.shadow.large */
```

**Incorrect:**
```css
/* ❌ Hardcode values */
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

/* ❌ Use wrong level for functional role */
.menu { box-shadow: var(--eui-shadow-small); } /* ❌ Menu should be large */
```

---

## 5. Alternatives Considered

### Alternative 1: Numeric Levels

**Approach:** Use numeric levels (0, 1, 2, 3, 4, 5) similar to some design systems.

**Rejected because:**
- Less intuitive for developers (need to remember what "3" means)
- Inconsistent with existing radius system (bidirectional scale)
- Less descriptive than semantic naming

### Alternative 2: Size-Based Only

**Approach:** Use only size-based naming (sm, md, lg, xl) without semantic meaning.

**Rejected because:**
- Does not reflect functional hierarchy
- Less clear which level to use for which component
- Does not align with industry standards (most systems use semantic naming)

### Alternative 3: Component-Specific Elevation (No Semantic Tokens)

**Approach:** Define elevation only at component level, without semantic tokens.

**Rejected because:**
- No reuse between components
- Harder to maintain consistency
- Does not align with token-first architecture principle

---

## 6. Notes

- Current system is already well-structured and aligns with industry standards
- Detail Panel uses custom left-side shadow — this is the correct approach for contextual cases
- Z-index tokens are proposed for future implementation but not critical for current system
- Dynamic elevation (change on hover) is optional and not required for all components

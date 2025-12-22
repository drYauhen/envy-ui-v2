# ADR-0019: Layout Components Architecture

**Status:** Accepted  
**Date:** 2025-12-21  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)

**Related:**
- ADR-0001 — React Aria as Headless Accessibility Foundation
- ADR-0004 — Context-Aware UI Components and Projection Model
- ADR-0017 — Layered Token Architecture for Contexts and Themes

---

## 1. Context

The application requires global layout containers to structure the overall application shell. Based on the application structure, we need:

- **Left vertical navigation sidebar** - Expandable/collapsible, brand-colored background
- **Top application header** - Global header with user info, help, impersonation banner
- **Global title bar** - Below header, contains breadcrumbs and global actions
- **Contextual title bar** - Below global title bar, context-specific (page title, filters, search)
- **Main content area** - Flexible, scrollable content region
- **Right detail panel** - Contextual panel that opens/closes, has title + body structure, elevated with left-side shadow

These components form the application shell and must work together cohesively while maintaining accessibility, responsiveness, and theme support.

---

## 2. Decision

I adopt a **component-based layout architecture** using:

1. **AppShell** - Root container with CSS Grid layout
2. **Sidebar** - Left navigation (`<nav>`), expandable/collapsible
3. **Header** - Top application header (`<header>`)
4. **TitleBarGlobal** - Global title bar (below header)
5. **TitleBarContextual** - Contextual title bar (above content)
6. **Content** - Main content area (`<main>`)
7. **DetailPanel** - Right panel (`<aside>`), contextual, with left-side shadow

**Key Architectural Decisions:**

### A. CSS Grid for Layout

**Decision:** Use CSS Grid for the overall layout structure.

**Rationale:**
- Grid provides explicit control over layout regions
- Natural fit for application shell patterns
- Responsive by default (grid adapts to container)
- Clear separation of regions (header, sidebar, content, panel)
- Better than Flexbox for 2D layouts (rows + columns)

**Alternative Considered:** Flexbox
- Rejected: Flexbox is 1D (row OR column), Grid is 2D (rows AND columns)
- Grid is more appropriate for application shell layouts

### B. Semantic HTML + ARIA

**Decision:** Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<aside>`) with ARIA attributes for clarity.

**Rationale:**
- Semantic HTML provides implicit ARIA roles (better than explicit roles)
- Screen readers understand semantic structure
- WCAG 2.1 compliance
- React Aria does NOT provide layout-specific hooks (only interactive element hooks)
- Semantic HTML is the foundation for accessibility

**Implementation:**
- `<header>` for application header (implicit `role="banner"`)
- `<nav>` for sidebar navigation (implicit `role="navigation"`)
- `<main>` for main content (implicit `role="main"`)
- `<aside>` for detail panel (implicit `role="complementary"`)
- `aria-label` for clarity when needed
- `aria-expanded` for sidebar state
- `aria-hidden` for detail panel when closed

### C. Component Composition

**Decision:** Separate components for each layout region, composed within AppShell.

**Rationale:**
- Clear separation of concerns
- Each component can be styled independently via tokens
- Reusable (e.g., TitleBar and Content can be used in DetailPanel)
- Flexible composition
- Easier to maintain and extend

**Alternative Considered:** Single monolithic layout component
- Rejected: Too rigid, harder to customize, violates composition principle

### D. Token-Driven Styling

**Decision:** All layout components use token system for colors, sizes, spacing, shadows.

**Rationale:**
- Consistent with existing component architecture
- Themeable (context + theme combinations)
- Maintainable (change tokens, not CSS)
- Aligns with ADR-0017 (Layered Token Architecture)

### E. Right Panel Elevation

**Decision:** DetailPanel has left-side shadow to show elevation relative to main content.

**Rationale:**
- Visual hierarchy: panel appears elevated above content
- Clear separation between main content and detail panel
- Industry standard for side panels
- Left-side shadow (negative X offset) creates depth perception

**Implementation:**
- `box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1)` (or token-based)
- Shadow only on left side (not all sides)

### F. Sidebar Expand/Collapse

**Decision:** Sidebar supports expanded/collapsed states with smooth transition.

**Rationale:**
- Space efficiency: collapsed shows icons only, expanded shows labels
- User preference: some prefer compact, others prefer full labels
- Smooth transition provides visual feedback
- CSS Grid adapts automatically (content area adjusts)

**Implementation:**
- `data-eui-collapsed="true|false"` for state
- `aria-expanded` for accessibility
- CSS transition for smooth animation
- Grid column width changes based on state

### G. DetailPanel Structure Reuse

**Decision:** DetailPanel can reuse TitleBar and Content components internally.

**Rationale:**
- DetailPanel has same structure as main area (title + body)
- DRY principle: don't duplicate components
- Consistency: same styling and behavior
- Simpler API: reuse existing components

---

## 3. Consequences

### Positive

- ✅ **Accessible:** Semantic HTML + ARIA provides excellent screen reader support
- ✅ **Responsive:** CSS Grid adapts to different screen sizes
- ✅ **Themeable:** Token-driven styling supports context + theme combinations
- ✅ **Maintainable:** Clear component boundaries, token-based styling
- ✅ **Flexible:** Components can be composed in different ways
- ✅ **WCAG 2.1 Compliant:** Proper semantic structure and ARIA usage

### Negative

- ⚠️ **CSS Grid Browser Support:** Requires modern browsers (but support is excellent now)
- ⚠️ **Complexity:** Multiple components to coordinate (but necessary for flexibility)
- ⚠️ **Storybook Integration:** Global layout components are harder to showcase in Storybook (but can use iframe or full-page examples)

### Neutral

- Layout components are foundational: changes affect entire application
- Token system must support layout-specific values (sizes, colors, spacing)
- Accessibility is built-in, not optional

---

## 4. Implementation Notes

### HTML Structure

```html
<div class="eui-app-shell">
  <header class="eui-header" role="banner" aria-label="Application header">
    <!-- Header content -->
  </header>
  
  <nav 
    class="eui-sidebar" 
    role="navigation" 
    aria-label="Main navigation"
    aria-expanded="true"
    data-eui-collapsed="false"
  >
    <!-- Navigation items -->
  </nav>
  
  <div class="eui-title-bar eui-title-bar--global" role="region" aria-label="Global navigation">
    <!-- Global title bar content -->
  </div>
  
  <div class="eui-title-bar eui-title-bar--contextual" role="region" aria-label="Page context">
    <!-- Contextual title bar content -->
  </div>
  
  <main class="eui-content" role="main" aria-label="Main content">
    <!-- Main content -->
  </main>
  
  <aside 
    class="eui-detail-panel" 
    role="complementary" 
    aria-label="Details panel"
    aria-hidden="true"
    data-eui-open="false"
  >
    <!-- Detail panel content -->
  </aside>
</div>
```

### CSS Grid Layout

```css
.eui-app-shell {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar global-title-bar detail-panel"
    "sidebar contextual-title-bar detail-panel"
    "sidebar content detail-panel";
  grid-template-columns: var(--eui-sidebar-width) 1fr var(--eui-detail-panel-width);
  grid-template-rows: 
    var(--eui-header-height) 
    var(--eui-title-bar-height) 
    var(--eui-title-bar-height) 
    1fr;
  height: 100vh;
}
```

### Skip Links

```html
<a href="#main-content" class="eui-skip-link">Skip to main content</a>
<a href="#main-navigation" class="eui-skip-link">Skip to navigation</a>
```

---

## 5. Alternatives Considered

### Alternative 1: Flexbox Layout

**Rejected because:**
- Flexbox is 1D (row OR column), not 2D
- Grid is more appropriate for application shell (rows AND columns)
- Grid provides explicit region control

### Alternative 2: React Aria Layout Hooks

**Rejected because:**
- React Aria does NOT provide layout-specific hooks
- React Aria provides interactive element hooks, not structural hooks
- Semantic HTML + ARIA is the correct approach for layout

### Alternative 3: Single Monolithic Layout Component

**Rejected because:**
- Too rigid, harder to customize
- Violates composition principle
- Separate components are more maintainable

### Alternative 4: All-Sides Shadow on DetailPanel

**Rejected because:**
- Left-side shadow is sufficient and more subtle
- All-sides shadow would be too prominent
- Left-side shadow clearly indicates elevation relative to content

---

## 6. Related Decisions

- **ADR-0001:** React Aria for interactive elements (not layout)
- **ADR-0004:** Context-aware components (layout adapts to context)
- **ADR-0017:** Token architecture (layout uses tokens for styling)

---

## 7. Validation

This architecture will be validated by:
- ✅ Implementation of layout components with tokens
- ✅ Storybook examples (full-page iframe or isolated examples)
- ✅ Accessibility testing (screen readers, keyboard navigation)
- ✅ Responsive behavior testing (different screen sizes)
- ✅ Theme switching (context + theme combinations)

---

## 8. Notes

- Layout components are foundational: changes affect entire application
- Storybook integration may require iframe or full-page examples
- CSS Grid support is excellent in modern browsers (2017+)
- Semantic HTML is preferred over ARIA roles (but ARIA labels add clarity)


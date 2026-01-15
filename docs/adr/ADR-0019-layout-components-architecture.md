# ADR-0019: Layout Components Architecture

**Status:** Accepted (Partially Implemented)
**Date:** 2025-12-21
**Last Updated:** 2026-01-08
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Related:**
- [ADR-0001](./ADR-0001-react-aria-headless.md) — React Aria as Headless Accessibility Foundation
- [ADR-0004](./ADR-0004-context-aware-ui-components-and-projection-model.md) — Context-Aware UI Components and Projection Model
- [ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md) — Layered Token Architecture for Contexts and Themes

---

## 1. Context

Different contexts require fundamentally different layout approaches. The system serves three distinct contexts with different layout needs and philosophies:

### App Context: Functional Application Shell
- **Purpose**: Internal application for data management and operations
- **Layout Needs**: Simple, functional navigation and content layout
- **Philosophy**: Practical, minimal complexity, focused on productivity
- **Current State**: Implemented with simple flexbox layout (SideNav + main content)

### Website Context: Customizable Marketing/Content Pages
- **Purpose**: CMS-generated marketing pages, landing pages, documentation
- **Layout Needs**: Flexible, brand-adaptive layouts using template library
- **Philosophy**: Customizable, generative, brand-focused
- **Current State**: Not implemented - requires template system

### Report Context: Structured Data Presentations
- **Purpose**: Generated reports for printing, digital distribution, compliance
- **Layout Needs**: Structured, print-optimized layouts using template library
- **Philosophy**: Data-driven, consistent, accessibility-focused
- **Current State**: Not implemented - requires template system

---

## 2. Decision

I adopt a **context-specific layout architecture** that recognizes different contexts need fundamentally different layout approaches:

### App Context: Simple Functional Layout

**Decision:** App context uses a simple, practical flexbox layout focused on functionality.

**Implementation:**
- **SideNav + Main Content**: Basic flexbox layout (`display: 'flex'`)
- **Expandable Sidebar**: Smooth collapse/expand with `isCollapsed` state
- **Context+Theme Support**: Data attributes for theming (`data-eui-context="app"`)
- **Routing Integration**: Main content area handles page routing
- **Token-Driven Styling**: Consistent with overall token system

**Rationale:**
- App context prioritizes functionality over architectural complexity
- Simple layout reduces maintenance burden
- Focus on user productivity and data management tasks
- Current dev app implementation is correct and appropriate

**Example Implementation:**
```tsx
<div style={{ display: 'flex', height: '100vh' }}>
  <SideNav sections={sections} isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} />
  <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
    <Routes>{/* Page routing */}</Routes>
  </main>
</div>
```

### Website Context: Template-Based Generative Layouts

**Decision:** Website context uses a library of customizable templates for different page types.

**Future Implementation:**
- **Template Library**: Pre-built layout templates for marketing pages, landing pages, documentation
- **Generative Composition**: Templates composed from reusable layout components
- **Brand Customization**: Templates adapt to brand-specific styling needs
- **CMS Integration**: Templates work with content management systems
- **Responsive Design**: Templates handle different screen sizes and devices

**Rationale:**
- Marketing pages need flexible, brand-adaptive layouts
- CMS-generated content requires template-based approach
- Different page types (landing, blog, documentation) need different layouts
- Generative approach allows customization without code changes

### Report Context: Template-Based Generative Layouts

**Decision:** Report context uses a library of structured templates optimized for data presentation.

**Future Implementation:**
- **Report Templates**: Specialized templates for different report types (compact, presentation, accessibility)
- **Print Optimization**: Templates designed for both screen and print output
- **Data-Driven Layout**: Templates adapt to content structure and length
- **Compliance Support**: Templates meet accessibility and regulatory requirements
- **Export Formats**: Templates support PDF, HTML, and other output formats

**Rationale:**
- Reports need consistent, structured presentation of data
- Print optimization requires different layout considerations
- Compliance requirements (accessibility, formal standards) need template enforcement
- Different report types need specialized layouts

### CSS Grid as Optional Enhancement

**Decision:** CSS Grid layouts are available but not mandatory for app context.

**Implementation:**
- **Optional Complexity**: CSS Grid can be used when layout complexity justifies it
- **Prepared CSS**: Grid-based CSS exists but is not currently integrated
- **Template Foundation**: Website/report templates can leverage CSS Grid for advanced layouts
- **Progressive Enhancement**: Start simple, add complexity as needed

**Rationale:**
- Not all layouts need CSS Grid complexity
- Simple flexbox is sufficient for most app use cases
- CSS Grid should be opt-in, not mandatory
- Templates benefit from Grid's advanced layout capabilities

---

## 3. Consequences

### Positive

- ✅ **Practical App Layout:** Simple, functional layout meets immediate app needs without over-engineering
- ✅ **Template System Ready:** Foundation established for sophisticated website/report layouts
- ✅ **Context-Appropriate:** Each context gets the layout complexity it actually needs
- ✅ **Maintainable:** Simple app layout reduces maintenance burden
- ✅ **Extensible:** Template system can grow independently of app layout

### Negative

- ⚠️ **Template System Gap:** Website and report contexts lack layout implementation
- ⚠️ **Inconsistent Complexity:** App context is simple while website/report need complex systems
- ⚠️ **Future Migration:** May need to evolve app layout if complexity grows

### Neutral

- Different contexts having different layout approaches is acceptable and appropriate
- App layout prioritizes immediate usability over architectural completeness
- Template systems for website/report contexts represent future investment
- CSS Grid foundation exists but is opt-in rather than mandatory

---

## 4. Implementation Notes

### Current App Context Implementation

**Status:** ✅ **Fully Implemented**

The app context uses a simple, effective layout that serves the current operational needs:

```tsx
// From apps/dev-app/src/App.tsx
<div 
  data-eui-context="app" 
  data-eui-theme="default" 
  style={{ 
    display: 'flex', 
    height: '100vh',
    overflow: 'hidden'
  }}
>
  <SideNav
    sections={sections}
    footer={footer}
    isCollapsed={isCollapsed}
    onCollapsedChange={setIsCollapsed}
  />
  <main style={{ 
    flex: 1, 
    padding: '32px', 
    overflow: 'auto',
    width: '100%',
    backgroundColor: '#ffffff'
  }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/components" element={<Components />} />
      <Route path="/:pageKey" element={<PageContent />} />
    </Routes>
  </main>
</div>
```

**Key Features:**
- Simple flexbox layout (`display: 'flex'`)
- Expandable/collapsible sidebar with smooth transitions
- Context+theme data attributes for theming
- Routing integration in main content area
- Token-driven styling for SideNav component

### Website Context Template System (Future)

**Status:** ❌ **Not Implemented - Planned**

Website context will require a template library system:

**Template Types Needed:**
- Landing page templates (hero sections, feature grids, testimonials)
- Content page templates (blog posts, documentation, articles)
- Marketing page templates (campaign pages, product pages)
- Navigation layouts (header variations, footer styles)

**Template Architecture:**
- Composable layout components (Header, Hero, Content, Footer, Sidebar)
- Template configuration system (JSON-based layouts)
- Brand adaptation capabilities
- Responsive breakpoint handling
- CMS integration points

### Report Context Template System (Future)

**Status:** ❌ **Not Implemented - Planned**

Report context will require specialized templates for data presentation:

**Template Types Needed:**
- Compact report templates (maximize data density)
- Presentation report templates (visual appeal, client-facing)
- Accessibility report templates (WCAG compliance, screen reader optimized)
- Print-optimized templates (page breaks, print styles)

**Template Architecture:**
- Data-aware layout components
- Print-specific styling rules
- Compliance validation features
- Export format support (PDF, HTML, DOCX)
- Responsive design for digital viewing

### CSS Grid Foundation

**Status:** ✅ **Prepared but Optional**

Advanced CSS Grid layouts are available for complex use cases:

```css
/* From src/ui/app-shell.css */
[data-eui-context] .eui-app-shell {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar global-title-bar ."
    "sidebar contextual-title-bar ."
    "sidebar content .";
  /* ... complex grid layout ... */
}
```

**Current Usage:** CSS Grid foundation exists but is not integrated into the app. It can be adopted when layout complexity justifies it, or used as a foundation for website/report templates.

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

- **[ADR-0001](./ADR-0001-react-aria-headless.md):** React Aria for interactive elements (not layout)
- **[ADR-0004](./ADR-0004-context-aware-ui-components-and-projection-model.md):** Context-aware components (layout adapts to context)
- **[ADR-0017](./ADR-0017-layered-token-architecture-contexts-and-themes.md):** Token architecture (layout uses tokens for styling)

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
- Semantic HTML is preferred over ARIA roles (but ARIA labels add clarity)

- All-sides shadow would be too prominent

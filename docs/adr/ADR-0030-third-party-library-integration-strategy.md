# ADR-0030: Third-Party Library Integration Strategy

**Status:** Accepted  
**Date:** 2025-01-02  
**Owner:** Eugene Goncharov  
**Assistance:** AI-assisted drafting (human-reviewed)  
**Related:**  
- [ADR-0015](./ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) — Token-First Contract Layer and Renderer-Agnostic Model  
- [ADR-0024](./ADR-0024-css-layer-strategy-context-priority.md) — CSS Layer Strategy for Context Priority  
- [ADR-0022](./ADR-0022-storybook-model-ai-agent-oriented-architecture.md) — Storybook Model AI Agent-Oriented Architecture  
- [Token Usage Rules](../architecture/token-usage-rules.md) — Token Usage Rules

---

## Context

The design system follows a **token-first architecture** where design tokens are the single source of truth for all UI semantics. All component CSS must consume tokens and cannot redefine values.

However, the system needs to integrate **third-party libraries** (e.g., React Grid Layout for dashboard builders, drag-and-drop libraries, charting libraries) that come with their own CSS containing fixed values. These libraries cannot be modified to use our token system directly.

**Requirements:**
1. Integrate third-party libraries without breaking token-first principles
2. Ensure third-party components respect context/theme system
3. Maintain predictable CSS cascade order
4. Allow customization of third-party components using design tokens
5. Document integration patterns for consistency

**Examples of third-party libraries that may be integrated:**
- React Grid Layout (dashboard/layout builders)
- Drag-and-drop libraries (@dnd-kit, react-beautiful-dnd)
- Charting libraries (recharts, chart.js)
- Date pickers, rich text editors, etc.

---

## Decision

I decided to establish a **Third-Party Integration Strategy** that:

1. **Uses CSS `@layer` to isolate third-party CSS** (lowest priority)
2. **Creates token-based overrides** in component layer (higher priority)
3. **Maps third-party CSS variables to design tokens** where possible
4. **Documents exceptions** in token-usage-rules for third-party integration
5. **Requires explicit approval** for third-party library usage
6. **Creates adapter components** that wrap third-party libraries with token integration

### Layer Order (Updated)

The CSS layer order is extended to include third-party libraries:

1. `:root` - Foundation and semantic tokens (base values)
2. `@layer third-party` - **Third-party library CSS** (lowest priority, isolated)
3. `@layer context-app` - Application context styles
4. `@layer context-website` - Website/CMS context styles
5. `@layer context-report` - Report context styles
6. `@layer components` - **Our component overrides** (including third-party customization)
7. `@layer theme` - Theme overrides (highest priority)

### Integration Patterns

#### Pattern 1: CSS Variable Mapping

Map third-party CSS variables to design tokens:

```css
/* Third-party library CSS (in @layer third-party) */
.third-party-component {
  --third-party-color: #000000; /* Fixed value from library */
}

/* Our override (in @layer components) */
[data-eui-context] .third-party-component {
  --third-party-color: var(--eui-color-background-base);
  /* Map library's CSS variable to our token */
}
```

#### Pattern 2: Scoped Overrides

Override third-party styles using tokens:

```css
/* In @layer components */
[data-eui-context] .react-grid-layout {
  background: var(--eui-color-background-base);
  border: 1px solid var(--eui-color-border-default);
  border-radius: var(--eui-radius-default);
}

[data-eui-context] .react-grid-item {
  background: var(--eui-color-background-base);
  box-shadow: var(--eui-shadow-sm);
}
```

#### Pattern 3: Adapter Components

Wrap third-party components with context/theme integration:

```typescript
import GridLayout from 'react-grid-layout';

function ThemedGridLayout(props) {
  return (
    <div data-eui-context="app" data-eui-theme="default">
      <GridLayout className="eui-grid-layout" {...props} />
    </div>
  );
}
```

#### Pattern 4: Token Creation for Third-Party

Create design tokens specifically for third-party component values:

```json
{
  "eui": {
    "grid-layout": {
      "colors": {
        "background": {
          "$value": "{eui.color.background.base}",
          "$type": "color"
        },
        "border": {
          "$value": "{eui.color.border.default}",
          "$type": "color"
        }
      }
    }
  }
}
```

---

## Rationale

### Why This Approach?

**1. Maintains Token-First Principle**
- Third-party CSS is isolated in its own layer
- Our overrides use tokens exclusively
- No literal values in our code (only in third-party CSS, which we don't control)

**2. Predictable Cascade**
- CSS `@layer` ensures our overrides always win
- Third-party CSS cannot accidentally override our tokens
- Clear separation of concerns

**3. Context/Theme Compatibility**
- Third-party components can be wrapped with `[data-eui-context]` attributes
- CSS custom properties penetrate component boundaries
- Themes work automatically through token system

**4. Scalability**
- Pattern can be applied to any third-party library
- Consistent approach across all integrations
- Easy to document and maintain

**5. Flexibility**
- Can customize third-party components without modifying their source
- Can create tokens for third-party-specific values
- Can adapt third-party components to our design system

### Why Not Modify Third-Party Libraries?

**1. Maintenance Burden**
- Modifying third-party code creates maintenance overhead
- Updates to libraries would require re-applying modifications
- Risk of breaking changes

**2. Separation of Concerns**
- Third-party libraries should remain independent
- Our design system should adapt to libraries, not vice versa
- Clear boundaries between our code and external dependencies

**3. Upgrade Path**
- Unmodified libraries can be upgraded easily
- No risk of conflicts with library updates
- Standard integration patterns

---

## Consequences

### Positive

- **Token-First Maintained**: Third-party integration doesn't break token-first principles
- **Predictable**: CSS layers ensure our overrides always win
- **Scalable**: Pattern works for any third-party library
- **Maintainable**: Clear separation and documentation
- **Flexible**: Can customize third-party components using tokens

### Trade-offs

- **Additional Layer**: Adds `@layer third-party` to CSS layer order
- **Documentation Required**: Each third-party integration must be documented
- **Explicit Approval**: Third-party libraries require explicit approval (prevents accidental dependencies)
- **Token Coverage**: May need to create tokens for third-party-specific values

### Implementation Requirements

1. Update CSS layer order to include `@layer third-party`
2. Create integration guide for third-party libraries
3. Update token-usage-rules.md with third-party exceptions
4. Create example integrations (React Grid Layout, etc.)
5. Document approval process for new third-party libraries

---

## Explicit Rules

1. **Third-Party CSS Placement**: All third-party CSS must be in `@layer third-party`
2. **Our Overrides**: All our overrides must be in `@layer components` using tokens
3. **No Literal Values**: Our code cannot contain literal values (only third-party CSS can)
4. **Token Mapping**: Map third-party CSS variables to design tokens where possible
5. **Explicit Approval**: Third-party libraries require explicit approval before integration
6. **Documentation**: Each third-party integration must be documented with:
   - Which library is used
   - Why it's needed
   - How it's integrated (pattern used)
   - Token mappings created
7. **Adapter Components**: Wrap third-party components with context/theme integration
8. **Scoped Selectors**: Use `[data-eui-context]` selectors for all overrides

---

## Examples

### Example 1: React Grid Layout Integration

```css
/* @layer third-party */
@import 'react-grid-layout/css/styles.css';
@import 'react-resizable/css/styles.css';

/* @layer components */
[data-eui-context] .react-grid-layout {
  background: var(--eui-color-background-base);
  border: 1px solid var(--eui-color-border-default);
  border-radius: var(--eui-radius-default);
}

[data-eui-context] .react-grid-item {
  background: var(--eui-color-background-base);
  box-shadow: var(--eui-shadow-sm);
  border: 1px solid var(--eui-color-border-default);
  border-radius: var(--eui-radius-default);
}

[data-eui-context] .react-resizable-handle {
  background: var(--eui-color-border-default);
}

[data-eui-context] .react-resizable-handle:hover {
  background: var(--eui-color-brand-600);
}
```

### Example 2: Adapter Component

```typescript
import GridLayout from 'react-grid-layout';
import type { Layout, Layouts } from 'react-grid-layout';

interface ThemedGridLayoutProps {
  layout: Layout[];
  onLayoutChange?: (layout: Layout[]) => void;
  children: React.ReactNode;
}

export function ThemedGridLayout({
  layout,
  onLayoutChange,
  children,
  ...props
}: ThemedGridLayoutProps) {
  return (
    <div data-eui-context="app" data-eui-theme="default">
      <GridLayout
        className="eui-grid-layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...props}
      >
        {children}
      </GridLayout>
    </div>
  );
}
```

---

## Related Documentation

- [Token Usage Rules](../architecture/token-usage-rules.md) - Updated with third-party exceptions
- [CSS Layer Strategy](./ADR-0024-css-layer-strategy-context-priority.md) - Layer order includes third-party
- [Storybook Model](./ADR-0022-storybook-model-ai-agent-oriented-architecture.md) - Updated to allow third-party with approval


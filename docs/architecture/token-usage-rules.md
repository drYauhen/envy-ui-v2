# Token Usage Rules

This document defines the enforceable rules for how design tokens must be used in runtime styles,
contracts, and generated outputs. It is not an ADR and does not restate architectural history.

## Core Principle

Design tokens are the single source of truth for UI semantics:
- size
- spacing
- color
- shape
- border
- focus

Component CSS and contracts must consume tokens; they must not redefine values.

## Allowed Pattern

Use token variables directly in component selectors and contract examples:

```css
.eui-button[data-size="md"] {
  --eui-button-height: var(--eui-button-size-md-height);
}
```

This is correct because it keeps the component bound to generated token values without introducing
literal overrides or fallback shortcuts.

## Disallowed Patterns

The following are forbidden unless explicitly approved:

- Literal values in component CSS:

```css
height: 40px;
background: #066a8d;
```

- Token references with literal fallbacks that override generated values:

```css
var(--eui-button-size-md-height, 40px)
```

- Incorrect token names that cause fallbacks to win silently:

```css
var(--eui-button-layout-default-whiteSpace)
```

If a token name is wrong, fix the reference. Do not add a literal fallback.

## Exceptions (Temporary Gaps)

The following values may currently have no tokens:
- motion / transition durations
- press translation (e.g. translateY)
- opacity used for interaction states

These are treated as known gaps. Either:
- introduce a token later, or
- document the literal as an explicit exception.

Silent literals outside this list are not allowed.

## Decoration Compatibility Rule

### Context-Specific: Application Context

**In `app` context: Stackable/splitable components MUST use the same radius level to ensure visual compatibility when composed.**

This rule applies specifically to **application context** where form elements (input, button, select) are frequently composed together.

Components that can be visually combined (e.g., input + button, button groups) must reference `{eui.radius.default}`:

- ✅ Button: `{eui.radius.default}`
- ✅ Input (future): `{eui.radius.default}`
- ✅ Select (future): `{eui.radius.default}`
- ✅ Textarea (future): `{eui.radius.default}`

This ensures that when components are stacked/split (e.g., `[Input] [Button]`), they share the same radius value regardless of theme. Themes can shift the `default` value (e.g., 4px → 8px), but all stackable components shift together, maintaining visual compatibility.

**Why:** Application contexts have many form compositions requiring visual cohesion. Mixing different radius levels (e.g., button=4px, input=8px) creates visual breaks in stackable compositions.

### Other Contexts: Website & Printable

**In `site` and `report` contexts:** This rule does not apply, as:
- **Website context:** Primarily reading-focused, minimal form compositions. Design goals prioritize expressive visuals over stackable consistency.
- **Printable context:** No interactive form elements. Design goals focus on document expressiveness, not component composition.

**Non-stackable components** (cards, modals, containers) can use different levels (`large`, `extra-large`) as appropriate for their visual hierarchy, regardless of context.

## Scope Clarifications

Strict enforcement:
- Component CSS (e.g. `src/ui/button.css`)
- HTML+CSS contracts in Storybook
- Generated platform outputs derived from tokens
- Stackable component radius references (must use `default`)

Permissive (literals allowed unless stated otherwise):
- Storybook viewer UI/layout components
- Figma plugin UI (`figma-plugin/ui.html`)
- Internal tooling or debugging UI

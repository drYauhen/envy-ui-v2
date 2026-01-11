# Card Component - Non-Canonical Theme Notes

**Status:** Knowledge Preservation - Do Not Implement in CSS
**Component:** Card
**Source:** `tokens/knowledge/components/card/legacy.card.css`

## Theme-Specific Behavior (Preserved for Reference)

### Website Context - Toy-R-Us Theme

**Legacy Implementation:**
```css
[data-eui-context='website'][data-eui-theme='toy-r-us'] .eui-card__header {
  text-align: center;
}

[data-eui-context='website'][data-eui-theme='toy-r-us'] .eui-card__body {
  text-align: center;
  justify-content: center;
}

[data-eui-context='website'][data-eui-theme='toy-r-us'] .eui-card__body > * {
  width: 100%;
}
```

**Behavior Description:**
- Header text is center-aligned
- Body content is center-aligned both horizontally (text-align) and vertically (justify-content)
- All direct children of the body have full width (100%)

**Architectural Decision:**
These theme-specific selectors violate the canonical component architecture rule: "no theme-specific selectors inside canonical component CSS". The behavior is preserved here as knowledge for future reference but must not be implemented in canonical component CSS files.

**Future Implementation Options:**
1. Implement as separate theme-specific CSS files if needed
2. Document as deprecated behavior
3. Remove entirely if no longer required by product requirements

---

**Last Updated:** 2026-01-10
**Preserved From:** `src/ui/card.css` migration
**Policy:** Knowledge only - do not implement in canonical CSS

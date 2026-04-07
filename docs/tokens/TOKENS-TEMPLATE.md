# [Category] Tokens

**Document ID:** tokens-tokens
**Status:** Template
**Date:** 2026-04-04
**Last Updated:** 2026-04-06
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Tokens

---
## Overview

### Purpose
[Brief description of what these tokens represent and their role in the design system.]

### Scope
[What types of tokens are included? What platforms/contexts do they cover?]

### Token Categories
[List the main categories of tokens covered in this document.]

## Token Reference

### [Token Category 1]

#### [Token Name 1]
**Name:** `[full.token.name]`
**Value:** `[current value]`
**Type:** `[color|spacing|typography|etc.]`

**Description:**
[What this token represents and when to use it.]

**Usage:**
```css
/* CSS usage */
.class {
  property: var(--token-name);
}
```

```typescript
// JavaScript/React usage
const styles = {
  property: 'var(--token-name)'
};
```

**Accessibility:**
[WCAG compliance notes, contrast requirements, etc.]

**Platform Support:**
- ✅ Web
- ✅ iOS
- ✅ Android

#### [Token Name 2]
[Continue with token documentation...]

### [Token Category 2]
[Continue with additional categories...]

## Usage Guidelines

### When to Use These Tokens

#### ✅ Recommended Usage
- [Use case 1]: [Explanation]
- [Use case 2]: [Explanation]

#### ❌ Avoid These Patterns
- [Anti-pattern 1]: [Why to avoid and alternative]
- [Anti-pattern 2]: [Why to avoid and alternative]

### Implementation Examples

#### Basic Usage
```typescript
// Component using tokens
const Button = styled.button`
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-medium);
  border-radius: var(--border-radius-small);
`;
```

#### Theme-Aware Usage
```typescript
// Theme-aware component
const Card = ({ theme }) => (
  <div style={{
    backgroundColor: `var(--color-background-${theme})`,
    border: `1px solid var(--color-border-${theme})`,
    borderRadius: 'var(--border-radius-medium)'
  }}>
    Content
  </div>
);
```

#### Responsive Usage
```typescript
// Responsive component
const Container = styled.div`
  padding: var(--spacing-small);

  @media (min-width: 768px) {
    padding: var(--spacing-medium);
  }

  @media (min-width: 1024px) {
    padding: var(--spacing-large);
  }
`;
```

## Token Relationships

### Related Tokens
- **[Related Token 1]**: [How it relates to current tokens]
- **[Related Token 2]**: [How it relates to current tokens]

### Token Dependencies
[List any tokens that depend on or reference these tokens.]

### Semantic Mapping
[How these design tokens map to semantic contexts.]

## Validation Rules

### Automated Validation
```javascript
// Example validation rules
const validationRules = {
  contrast: {
    background: 'color.background.primary',
    foreground: 'color.text.primary',
    ratio: 4.5
  },
  spacing: {
    scale: 'linear',
    base: 4,
    max: 64
  }
};
```

### Manual Verification
- [ ] [Manual check 1]
- [ ] [Manual check 2]
- [ ] [Manual check 3]

## Migration Guide

### Breaking Changes
[List any breaking changes when updating these tokens.]

### Migration Steps
1. [Step 1]: [What to do]
2. [Step 2]: [What to do]
3. [Step 3]: [What to do]

### Backward Compatibility
[How long old tokens will be supported.]

## Testing

### Visual Regression Tests
```javascript
// Example test
describe('Token Usage', () => {
  it('should render correctly with new tokens', () => {
    // Test implementation
  });
});
```

### Accessibility Tests
- [ ] Color contrast validation
- [ ] Focus indicator visibility
- [ ] Text readability

## Platform-Specific Notes

### Web Implementation
[Web-specific notes, CSS custom properties, etc.]

### iOS Implementation
[iOS-specific notes, Swift usage, etc.]

### Android Implementation
[Android-specific notes, Kotlin usage, etc.]

## Future Considerations

### Planned Changes
[Upcoming changes to these tokens.]

### Deprecation Timeline
[When old tokens will be removed.]

### Extension Points
[How these tokens can be extended.]

## Change History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| YYYY-MM-DD | 1.0 | Initial token documentation | [Author] |

## References

### Related Documentation
- [Link to related token docs]
- [Link to component usage docs]
- [Link to design system docs]

### Technical References
- [Link to token definitions]
- [Link to Style Dictionary config]
- [Link to build outputs]

### Design References
- [Link to design system guidelines]
- [Link to Figma libraries]
- [Link to design tokens]

**Link behavior rule:** Use normal relative source links (do not hardcode Storybook URLs). Internal registered `.md` docs open in the current Storybook tab. Code-file links (`.ts/.tsx/.js/.mjs/.css/.json`) open via Source File Viewer in a new tab. External or unregistered links open in a new tab with external-link indicator.

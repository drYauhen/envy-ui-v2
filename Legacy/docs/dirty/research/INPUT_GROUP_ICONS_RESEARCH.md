# Input Group with Icons: Research & Recommendations

**Date:** 2025-01-21  
**Status:** Research & Proposal  
**Context:** Planning Input Group component with prefix/suffix icons

---

## Problem Statement

Input fields often need visual indicators or interactive elements inside the input area:
- **Prefix icons** (left side): Search icon, currency symbol, user icon
- **Suffix icons** (right side): Clear button, password visibility toggle, validation icon

These should be visually "inside" the input but properly structured for accessibility and styling.

---

## Research: Industry Practices

### Material UI (MUI)

**Approach:** `InputAdornment` component with `position="start"` or `position="end"`

**Structure:**
```tsx
<TextField
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleClear}>
          <CloseIcon />
        </IconButton>
      </InputAdornment>
    )
  }}
/>
```

**Key Features:**
- ✅ Uses `InputAdornment` wrapper component
- ✅ Position prop: `"start"` or `"end"`
- ✅ Can contain icons, text, or buttons
- ✅ Automatically handles spacing and alignment
- ✅ Input padding adjusts based on adornments

**CSS Structure:**
- Adornment has fixed width/height
- Input padding increases on the side with adornment
- Border wraps around input + adornments
- All elements share the same border-radius (only outer corners rounded)

---

### Ant Design

**Approach:** Direct `prefix` and `suffix` props on `Input` component

**Structure:**
```tsx
<Input
  prefix={<SearchOutlined />}
  suffix={
    value ? (
      <IconButton onClick={handleClear}>
        <CloseOutlined />
      </IconButton>
    ) : null
  }
/>
```

**Key Features:**
- ✅ Simple `prefix` and `suffix` props
- ✅ Can pass ReactNode (icon, button, text)
- ✅ Conditional rendering supported
- ✅ Automatic padding adjustment
- ✅ Border wraps around all elements

**Additional Props:**
- `addonBefore` - element before input (outside border)
- `addonAfter` - element after input (outside border)
- Different from prefix/suffix which are inside border

---

### Chakra UI

**Approach:** `InputGroup`, `InputLeftElement`, `InputRightElement` components

**Structure:**
```tsx
<InputGroup>
  <InputLeftElement>
    <Icon as={SearchIcon} />
  </InputLeftElement>
  <Input />
  <InputRightElement>
    <IconButton icon={<CloseIcon />} onClick={handleClear} />
  </InputRightElement>
</InputGroup>
```

**Key Features:**
- ✅ Explicit wrapper components (`InputGroup`)
- ✅ Separate components for left/right elements
- ✅ Elements are absolutely positioned
- ✅ Input padding automatically adjusts
- ✅ Clean separation of concerns

**CSS Structure:**
- `InputGroup` is relative container
- `InputLeftElement` / `InputRightElement` are absolutely positioned
- Fixed width (usually based on input height)
- Input has padding-left/right to accommodate elements

---

### Mantine

**Approach:** `leftSection` and `rightSection` props on `TextInput`

**Structure:**
```tsx
<TextInput
  leftSection={<IconSearch />}
  rightSection={
    value ? (
      <ActionIcon onClick={handleClear}>
        <IconX />
      </ActionIcon>
    ) : null
  }
/>
```

**Key Features:**
- ✅ Simple props: `leftSection`, `rightSection`
- ✅ Can be icons, buttons, or any ReactNode
- ✅ Automatic padding and spacing
- ✅ Clean API similar to Ant Design

---

## Common Patterns Across Systems

### 1. **Positioning**

All systems use one of two approaches:

**Option A: Absolute Positioning (Chakra UI style)**
- Icons are absolutely positioned relative to input container
- Input padding increases to make room
- Border wraps around everything

**Option B: Flexbox Layout (MUI style)**
- Container uses flexbox
- Icons are flex items with fixed width
- Input is flex-grow: 1
- Border wraps around everything

### 2. **Border Handling**

**Critical:** Border must wrap around input + icons, not each element separately.

```css
/* ❌ Wrong - separate borders */
.input { border: 1px solid gray; }
.icon { border: 1px solid gray; }

/* ✅ Correct - shared border */
.input-group {
  border: 1px solid gray;
  border-radius: 4px;
}
.input-group .input { border: none; }
.input-group .icon { border: none; }
```

### 3. **Border Radius**

Only outer corners should be rounded:
- Left icon: input has border-radius on right side only
- Right icon: input has border-radius on left side only
- Both icons: input has no border-radius (square)
- No icons: input has full border-radius

### 4. **Icon Size**

Icons should match input height (approximately):
- Small input: 16px icon
- Medium input: 20px icon
- Large input: 24px icon

### 5. **Spacing**

Standard spacing between icon and text:
- 8-12px gap (usually `--eui-spacing-sm` or `--eui-spacing-md`)

---

## Recommendation for Our System

### **Approach: Props-based with Slots (Similar to Ant Design/Mantine)**

**Rationale:**
1. ✅ Simple, intuitive API
2. ✅ Matches our existing slot pattern (`startIcon`/`endIcon` in Button)
3. ✅ Easy to use and remember
4. ✅ Flexible (can pass icons, buttons, or any ReactNode)

### **API Design:**

```tsx
<Input
  prefix={<Icon name="search" />}           // Left icon
  suffix={<IconButton icon="close" />}      // Right icon/button
  placeholder="Search..."
/>
```

### **HTML Structure:**

```html
<div class="eui-input-group">
  <!-- Prefix slot (optional) -->
  <span class="eui-input-prefix" data-eui-slot="prefix">
    <Icon name="search" />
  </span>
  
  <!-- Input field -->
  <input class="eui-input" />
  
  <!-- Suffix slot (optional) -->
  <span class="eui-input-suffix" data-eui-slot="suffix">
    <IconButton icon="close" />
  </span>
</div>
```

### **CSS Structure:**

```css
/* Container - wraps everything, provides border */
[data-eui-context] .eui-input-group {
  position: relative;
  display: flex;
  align-items: center;
  border: var(--eui-input-border-width) var(--eui-input-border-style) var(--eui-color-border-default);
  border-radius: var(--eui-input-shape-radius);
  background-color: var(--eui-input-background-base);
}

/* Input - no border, takes remaining space */
[data-eui-context] .eui-input-group .eui-input {
  border: none;
  border-radius: 0;
  background: transparent;
  flex: 1 1 auto;
}

/* Prefix/Suffix slots - fixed width, centered content */
[data-eui-context] .eui-input-prefix,
[data-eui-context] .eui-input-suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--eui-color-text-subtle);
  /* Width matches input height for square icons */
  width: var(--eui-input-size-md-height);
  height: var(--eui-input-size-md-height);
}

/* Spacing between prefix and input text */
[data-eui-context] .eui-input-group:has(.eui-input-prefix) .eui-input {
  padding-left: 0; /* Remove left padding, prefix provides spacing */
}

/* Spacing between input text and suffix */
[data-eui-context] .eui-input-group:has(.eui-input-suffix) .eui-input {
  padding-right: 0; /* Remove right padding, suffix provides spacing */
}

/* Gap between prefix/suffix and input text */
[data-eui-context] .eui-input-prefix + .eui-input {
  padding-left: var(--eui-spacing-sm);
}

[data-eui-context] .eui-input + .eui-input-suffix {
  padding-right: var(--eui-spacing-sm);
}

/* Border radius adjustments */
[data-eui-context] .eui-input-group:not(:has(.eui-input-prefix)) .eui-input {
  border-top-left-radius: var(--eui-input-shape-radius);
  border-bottom-left-radius: var(--eui-input-shape-radius);
}

[data-eui-context] .eui-input-group:not(:has(.eui-input-suffix)) .eui-input {
  border-top-right-radius: var(--eui-input-shape-radius);
  border-bottom-right-radius: var(--eui-input-shape-radius);
}
```

### **Alternative: Simpler CSS with Padding Approach**

If `:has()` selector support is a concern, use explicit padding:

```css
[data-eui-context] .eui-input-group {
  position: relative;
  display: flex;
  align-items: center;
  border: var(--eui-input-border-width) var(--eui-input-border-style) var(--eui-color-border-default);
  border-radius: var(--eui-input-shape-radius);
  background-color: var(--eui-input-background-base);
}

[data-eui-context] .eui-input-prefix {
  padding-left: var(--eui-spacing-sm);
  padding-right: var(--eui-spacing-xs);
}

[data-eui-context] .eui-input-suffix {
  padding-left: var(--eui-spacing-xs);
  padding-right: var(--eui-spacing-sm);
}

[data-eui-context] .eui-input-group .eui-input {
  border: none;
  border-radius: 0;
  background: transparent;
  flex: 1 1 auto;
  padding-left: var(--eui-input-size-md-padding-inline);
  padding-right: var(--eui-input-size-md-padding-inline);
}

/* Adjust padding when prefix/suffix present */
[data-eui-context] .eui-input-group .eui-input-prefix ~ .eui-input {
  padding-left: var(--eui-spacing-sm);
}

[data-eui-context] .eui-input-group .eui-input:has(+ .eui-input-suffix) {
  padding-right: var(--eui-spacing-sm);
}
```

---

## Implementation Considerations

### 1. **Icon Size**

Icons should match input height:
- Small: 16px icon (matches input height)
- Medium: 20px icon (matches input height)
- Large: 24px icon (matches input height)

### 2. **Interactive Elements**

Suffix can contain interactive elements (buttons):
- Clear button
- Password visibility toggle
- Dropdown trigger

These should:
- Be focusable
- Have proper hover/focus states
- Not interfere with input focus

### 3. **Accessibility**

- Icons should be decorative (use `aria-hidden="true"`)
- Interactive suffix elements should have proper ARIA labels
- Screen readers should announce input label, not icon

### 4. **States**

All states (hover, focus, disabled, error) should work correctly:
- Border color changes apply to container
- Focus ring appears around container
- Disabled state applies to all elements
- Error state shows on container border

---

## Comparison Table

| System | API | Positioning | Border | Complexity |
|--------|-----|-------------|--------|------------|
| **Material UI** | `startAdornment`/`endAdornment` | Flexbox | Shared | Medium |
| **Ant Design** | `prefix`/`suffix` | Flexbox | Shared | Low |
| **Chakra UI** | `InputLeftElement`/`InputRightElement` | Absolute | Shared | Medium |
| **Mantine** | `leftSection`/`rightSection` | Flexbox | Shared | Low |
| **Our Proposal** | `prefix`/`suffix` | Flexbox | Shared | Low |

---

## Decision

**✅ Use Props-based API: `prefix` and `suffix`**

**Rationale:**
1. Simple, intuitive API (like Ant Design/Mantine)
2. Matches existing patterns (`startIcon`/`endIcon` in Button)
3. Flexible (can pass any ReactNode)
4. Easy to implement with flexbox
5. Clean HTML structure

**Next Steps:**
1. Add `prefix` and `suffix` props to Input component
2. Create CSS for `.eui-input-group` wrapper
3. Handle border-radius based on presence of prefix/suffix
4. Test with common use cases (search, clear button, password toggle)



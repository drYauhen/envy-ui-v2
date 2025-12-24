# Component Naming Conventions: Research & Recommendations

**Date:** 2025-01-21  
**Status:** Research & Recommendation  
**Context:** Establishing naming conventions for Select component variants

---

## Research: Industry Practices

### Approach 1: Modifier Prefix (Most Common)
**Pattern:** `[Modifier][BaseComponent]`

**Examples:**
- `Select` (base)
- `MultiSelect`
- `SearchableSelect`
- `ComboBox` (alternative name for SearchableSelect)

**Used by:**
- Most third-party libraries (React Select, Downshift)
- Many design systems (Telerik, Emarsys)
- Common in React ecosystem

**Pros:**
- ✅ Alphabetical grouping in IDE autocomplete (all variants together)
- ✅ Clear, descriptive names
- ✅ Follows React component naming conventions (PascalCase)
- ✅ Easy to import: `import { Select, MultiSelect, SearchableSelect } from './select'`

**Cons:**
- ❌ Doesn't emphasize relationship to base component visually
- ❌ Can be harder to discover if you only know the base name

---

### Approach 2: Base Prefix
**Pattern:** `[BaseComponent][Modifier]`

**Examples:**
- `Select` (base)
- `SelectMultiple`
- `SelectSearchable`
- `SelectMultiSearchable` (combined)

**Used by:**
- Some design systems (Rosatom Design System)
- Some enterprise systems

**Pros:**
- ✅ Emphasizes relationship to base component
- ✅ Groups all variants under base name in IDE
- ✅ Clear hierarchy

**Cons:**
- ❌ Longer names
- ❌ Less common in React ecosystem
- ❌ Can be verbose: `SelectMultipleSearchable`

---

### Approach 3: Single Component with Props (Most Mature Systems)
**Pattern:** One component with variant props

**Examples:**
- `Select` with `multiple` prop
- `Select` with `showSearch` prop
- `Select` with `mode="multiple"` (Ant Design)
- `Autocomplete` as separate component (Material UI)

**Used by:**
- **Material UI (MUI):** `Select` (with `multiple`), `Autocomplete` (separate)
- **Ant Design:** `Select` (with `mode="multiple"` and `showSearch`)
- **Chakra UI:** `Select` (with `multiple` prop)
- **Mantine:** `Select` (with `multiple`), `Combobox` (separate)

**Pros:**
- ✅ Single API surface
- ✅ Type safety through props
- ✅ Less code duplication
- ✅ Industry standard for mature systems

**Cons:**
- ❌ More complex component implementation
- ❌ Props can become numerous
- ❌ Less explicit in component name

---

## Recommendation for Our System

### **Hybrid Approach: Separate Components with Modifier Prefix**

**Rationale:**
1. ✅ **Current Implementation:** We already have separate components (`Select`, `MultiSelect`, `SearchableSelect`)
2. ✅ **Type Safety:** Separate components allow better TypeScript inference
3. ✅ **Clarity:** Component name clearly indicates functionality
4. ✅ **Industry Alignment:** Matches common React ecosystem patterns
5. ✅ **IDE Experience:** Alphabetical grouping helps discovery

### **Naming Convention:**

```typescript
// Base component
Select

// Variants (modifier prefix)
MultiSelect          // Multiple selection
SearchableSelect    // Search/filter functionality
// Future: AsyncSelect, CreatableSelect, etc.
```

### **File Structure:**

```
packages/tsx/select/
  ├── select.tsx              // Base Select
  ├── multi-select.tsx        // MultiSelect
  ├── searchable-select.tsx   // SearchableSelect
  └── primitives/             // Shared primitives
      ├── select-trigger.tsx
      ├── select-popover.tsx
      └── ...
```

### **Export Pattern:**

```typescript
// packages/tsx/select/index.ts
export { Select } from './select';
export { MultiSelect } from './multi-select';
export { SearchableSelect } from './searchable-select';

// Usage
import { Select, MultiSelect, SearchableSelect } from '@envy-ui/select';
```

---

## General Naming Principles

### 1. **Component Names: PascalCase**
- ✅ `Select`, `MultiSelect`, `SearchableSelect`
- ❌ `select`, `multi-select`, `searchable-select`

### 2. **File Names: kebab-case**
- ✅ `select.tsx`, `multi-select.tsx`, `searchable-select.tsx`
- ❌ `Select.tsx`, `MultiSelect.tsx`

### 3. **Modifier Order (if multiple modifiers)**
When combining modifiers, order by importance/functionality:
- `MultiSearchableSelect` (multi is primary feature, search is secondary)
- Or keep separate: `MultiSelect` + `SearchableSelect`

### 4. **Consistency Across System**
Apply same pattern to other components:
- `Button`, `IconButton`, `LoadingButton`
- `Input`, `PasswordInput`, `NumberInput`
- `Card`, `ElevatedCard`, `OutlinedCard`

---

## Comparison Table

| Approach | Example | Pros | Cons | Industry Usage |
|----------|---------|------|------|----------------|
| **Modifier Prefix** | `MultiSelect` | Alphabetical grouping, clear names | Less visual hierarchy | ⭐⭐⭐⭐⭐ Common |
| **Base Prefix** | `SelectMultiple` | Clear hierarchy | Longer names, less common | ⭐⭐ Rare |
| **Single Component** | `Select` with props | Single API, mature | Complex implementation | ⭐⭐⭐⭐⭐ Most mature systems |

---

## Decision

**✅ Use Modifier Prefix Pattern:**
- `Select` (base)
- `MultiSelect` (variant)
- `SearchableSelect` (variant)

**Reasoning:**
1. Aligns with current implementation
2. Matches React ecosystem conventions
3. Better IDE autocomplete experience
4. Clear, descriptive names
5. Easy to extend with new variants

---

## Future Considerations

If we need to support combined features (e.g., multi + searchable), we have options:

1. **Separate Component:** `MultiSearchableSelect`
2. **Composition:** Use both `MultiSelect` and `SearchableSelect` primitives
3. **Props-based:** Add `searchable` prop to `MultiSelect`

Decision should be made based on usage patterns and complexity.



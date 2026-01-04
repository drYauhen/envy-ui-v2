# Accessibility Reference

**Purpose:** Comprehensive reference for ARIA roles, WAI-ARIA Authoring Practices Guide patterns, and React Aria hooks used in Envy UI v2.

**Last Updated:** 2025-01-21  
**Related ADR:** [ADR-0029 - Accessibility Architecture and Decision Framework](../adr/ADR-0029-accessibility-architecture-and-decision-framework.md)

---

## Overview

This document provides a complete reference for:

- **ARIA Roles** (~103 roles total, ~90 practical roles)
- **WAI-ARIA Authoring Practices Guide Patterns** (~27 patterns)
- **React Aria Hooks** (~60+ hooks)
- **Envy UI v2 Usage** (what's currently used in the project)

**Note:** This is a living document. Update as React Aria and ARIA standards evolve.

---

## ARIA Roles Overview

### Statistics

| Category | Count | Description |
|----------|-------|-------------|
| **Abstract Roles** | ~12 | Base concepts (not used directly) |
| **Widget Roles** | ~30 | Interactive UI controls |
| **Composite Roles** | ~8 | Combinations of widgets |
| **Document Structure Roles** | ~20 | Content organization |
| **Landmark Roles** | ~8 | Page navigation regions |
| **Live Region Roles** | ~6 | Dynamically updated content |
| **Window Roles** | ~2 | Modal elements |
| **Total (all)** | ~103 | Including abstract |
| **Total (practical)** | ~90 | Excluding abstract |

---

## ARIA Roles by Category

### 1. Abstract Roles (~12 roles)

**Purpose:** Base concepts for other roles. Not used directly in markup.

**Roles:**
- `command`
- `composite`
- `input`
- `landmark`
- `range`
- `roletype`
- `section`
- `select`
- `structure`
- `widget`
- `window`

**Usage:** These roles serve as base classes for other roles and are not assigned to elements.

---

### 2. Widget Roles (~30 roles)

**Purpose:** Interactive UI controls that users can interact with.

**Common Widget Roles:**

| Role | Description | HTML Equivalent |
|------|-------------|-----------------|
| `button` | Clickable button | `<button>` |
| `checkbox` | Checkbox input | `<input type="checkbox">` |
| `radio` | Radio button | `<input type="radio">` |
| `switch` | Toggle switch | Custom |
| `slider` | Range slider | `<input type="range">` |
| `progressbar` | Progress indicator | `<progress>` |
| `combobox` | Combo box (input + list) | Custom |
| `textbox` | Text input | `<input type="text">`, `<textarea>` |
| `searchbox` | Search input | `<input type="search">` |
| `spinbutton` | Number input with steppers | `<input type="number">` |
| `tab` | Tab button | Custom |
| `menuitem` | Menu item (action) | Custom |
| `menuitemcheckbox` | Menu item with checkbox | Custom |
| `menuitemradio` | Menu item with radio | Custom |
| `option` | Listbox option | `<option>` |
| `treeitem` | Tree node | Custom |
| `gridcell` | Grid cell | Custom |
| `row` | Table/grid row | `<tr>` |
| `columnheader` | Column header | `<th>` |
| `rowheader` | Row header | Custom |

**Usage in Envy UI v2:** Many of these roles are used implicitly via React Aria hooks or semantic HTML.

---

### 3. Composite Roles (~8 roles)

**Purpose:** Combinations of widgets that form complex UI patterns.

| Role | Description | Contains |
|------|-------------|----------|
| `menu` | Menu (list of actions) | `menuitem`, `menuitemcheckbox`, `menuitemradio` |
| `menubar` | Menu bar (horizontal menu) | `menuitem` |
| `listbox` | List box (selectable list) | `option` |
| `grid` | Interactive grid/table | `row`, `columnheader`, `rowheader`, `gridcell` |
| `tree` | Tree view | `treeitem` |
| `treegrid` | Tree grid (hierarchical table) | `treeitem`, `row`, `gridcell` |
| `tablist` | Tab list | `tab`, `tabpanel` |
| `radiogroup` | Radio button group | `radio` |
| `checkboxgroup` | Checkbox group | `checkbox` |

**Usage in Envy UI v2:**
- `menu` - Used via `useMenu` hook
- `listbox` - Used via `useSelect` hook
- `grid` - Used for interactive tables (custom implementation)
- `treegrid` - Used for expandable tables (custom implementation)
- `tablist` - Future: `useTabs` hook

---

### 4. Document Structure Roles (~20 roles)

**Purpose:** Organize and structure content on the page.

**Common Structure Roles:**

| Role | Description | HTML Equivalent |
|------|-------------|-----------------|
| `article` | Independent content | `<article>` |
| `section` | Section of content | `<section>` |
| `heading` | Heading | `<h1>` - `<h6>` |
| `list` | List | `<ul>`, `<ol>` |
| `listitem` | List item | `<li>` |
| `table` | Table | `<table>` |
| `tablecell` | Table cell | `<td>` |
| `rowgroup` | Row group | `<thead>`, `<tbody>`, `<tfoot>` |
| `column` | Column (in table) | Custom |
| `definition` | Definition | `<dd>` |
| `term` | Term (in definition list) | `<dt>` |
| `img` | Image | `<img>` |
| `figure` | Figure | `<figure>` |
| `code` | Code | `<code>` |
| `strong` | Strong emphasis | `<strong>` |
| `emphasis` | Emphasis | `<em>` |

**Usage in Envy UI v2:** Mostly via semantic HTML elements (implicit roles).

---

### 5. Landmark Roles (~8 roles)

**Purpose:** Help users navigate and identify major page regions.

| Role | Description | HTML Equivalent |
|------|-------------|-----------------|
| `banner` | Site header/banner | `<header>` |
| `main` | Main content | `<main>` |
| `navigation` | Navigation region | `<nav>` |
| `complementary` | Complementary content | `<aside>` |
| `contentinfo` | Site footer | `<footer>` |
| `form` | Form | `<form>` |
| `search` | Search region | Custom |
| `region` | Generic region | `<section>` with `aria-label` |

**Usage in Envy UI v2:** Used in layout components (AppShell) via semantic HTML.

---

### 6. Live Region Roles (~6 roles)

**Purpose:** Announce dynamic content changes to screen readers.

| Role | Description | Usage |
|------|-------------|-------|
| `alert` | Urgent announcement | Error messages, alerts |
| `status` | Status update | Loading states, progress |
| `log` | Log of messages | Chat, activity feed |
| `timer` | Timer/countdown | Countdown timers |
| `marquee` | Scrolling text | Scrolling announcements |

**Usage in Envy UI v2:** `alert` role used in Alert Banner component.

---

### 7. Window Roles (~2 roles)

**Purpose:** Modal dialogs and popups.

| Role | Description | Attributes |
|------|-------------|------------|
| `dialog` | Dialog window | `aria-modal="true/false"`, `aria-labelledby` |
| `alertdialog` | Alert dialog | `aria-modal="true"`, `aria-labelledby` |

**Usage in Envy UI v2:** Used in Modal/Dialog components via `useDialog` hook.

---

## WAI-ARIA Authoring Practices Guide Patterns

The WAI-ARIA Authoring Practices Guide (APG) defines ~27 standard patterns for common UI components.

### Essential Patterns (8 patterns)

1. **Button** (`role="button"`)
   - Standard button control
   - React Aria: `useButton`

2. **Checkbox** (`role="checkbox"`)
   - Checkbox input
   - React Aria: `useCheckbox`

3. **Switch** (`role="switch"`)
   - Toggle switch (on/off)
   - React Aria: `useSwitch`

4. **Radio Group** (`role="radiogroup"` + `role="radio"`)
   - Radio button group
   - React Aria: `useRadio`, `useRadioGroup`

5. **Textbox** (`role="textbox"`)
   - Text input
   - React Aria: `useTextField`

6. **Slider** (`role="slider"`)
   - Range slider
   - React Aria: `useSlider`

7. **Progress Bar** (`role="progressbar"`)
   - Progress indicator
   - React Aria: (native HTML `<progress>` usually sufficient)

8. **Separator** (`role="separator"`)
   - Visual separator
   - React Aria: (native HTML `<hr>` or CSS usually sufficient)

### Composite Patterns (15 patterns)

9. **Menu Button** (button + menu)
   - Button that opens a menu
   - React Aria: `useMenuTrigger` + `useMenu`

10. **Menu Bar** (`role="menubar"`)
    - Horizontal menu bar
    - React Aria: `useMenuBar`

11. **Disclosure (Show/Hide)** (`aria-expanded`)
    - Collapsible/expandable content
    - React Aria: `useDisclosure`

12. **Listbox** (`role="listbox"`)
    - Selectable list (single or multiple)
    - React Aria: `useListBox`, `useSelect`

13. **Combobox** (`role="combobox"`)
    - Input with dropdown list
    - React Aria: `useComboBox`

14. **Select** (dropdown)
    - Dropdown select
    - React Aria: `useSelect`

15. **Tabs** (`role="tablist"` + `role="tab"` + `role="tabpanel"`)
    - Tab navigation
    - React Aria: `useTabs`, `useTab`, `useTabList`, `useTabPanel`

16. **Dialog (Modal)** (`role="dialog"`)
    - Modal dialog
    - React Aria: `useDialog`, `useModal`

17. **Alert Dialog** (`role="alertdialog"`)
    - Urgent modal dialog
    - React Aria: `useDialog` with `role="alertdialog"`

18. **Tooltip** (`role="tooltip"`)
    - Tooltip popup
    - React Aria: `useTooltip`

19. **Breadcrumb** (`role="navigation"` with `aria-label="Breadcrumb"`)
    - Breadcrumb navigation
    - React Aria: `useBreadcrumbs`, `useBreadcrumbItem`

20. **Tree View** (`role="tree"` + `role="treeitem"`)
    - Hierarchical tree view
    - React Aria: `useTreeView`, `useTreeViewItem`

21. **Treegrid** (`role="treegrid"`)
    - Hierarchical table (expandable rows)
    - React Aria: (custom implementation, no high-level hook)

22. **Grid** (`role="grid"`)
    - Interactive table/grid
    - React Aria: (custom implementation, no high-level hook)

23. **Table** (enhanced)
    - Enhanced table with sorting, selection
    - React Aria: (custom implementation, no high-level hook)

### Date/Time Patterns (3 patterns)

24. **Date Picker**
    - Date selection
    - React Aria: `useDatePicker`, `useDateField`, `useCalendar`

25. **Date Range Picker**
    - Date range selection
    - React Aria: `useDateRangePicker`

26. **Time Picker**
    - Time selection
    - React Aria: (custom implementation)

### Feed Pattern (1 pattern)

27. **Feed** (`role="feed"`)
    - Scrollable feed of articles
    - React Aria: (custom implementation)

---

## React Aria Hooks Reference

React Aria provides ~60+ hooks that implement ARIA patterns and accessibility behaviors.

### Low-Level Primitives (Level 1) (~15 hooks)

**Purpose:** Browser-behavior replacements for basic interactive elements.

| Hook | ARIA Role | Usage in Envy UI v2 |
|------|-----------|---------------------|
| `useButton` | `button` | ✅ Used (Button component) |
| `useCheckbox` | `checkbox` | ✅ Used (Checkbox component) |
| `useRadio` | `radio` | ✅ Mentioned in ADR-0001 |
| `useSwitch` | `switch` | ✅ Mentioned in ADR-0001 |
| `useSlider` | `slider` | ❌ Not yet used |
| `useTextField` | `textbox` | ✅ Used (Input/TextField component) |
| `useSearchField` | `searchbox` | ❌ Not yet used |
| `useNumberField` | `spinbutton` | ❌ Not yet used |
| `useToggleButton` | `button` (toggle) | ❌ Not yet used |
| `useFocusRing` | (utility) | ✅ Used (focus management) |
| `useHover` | (utility) | ✅ Used (hover states) |
| `usePress` | (utility) | ✅ Used (press events) |
| `useLongPress` | (utility) | ❌ Not yet used |
| `useKeyboard` | (utility) | ❌ Not yet used |
| `useId` | (utility) | ❌ Not yet used (React.useId preferred) |

**Note:** According to ADR-0001, these are mandatory for basic components.

---

### Pattern Primitives (Level 2) (~20 hooks)

**Purpose:** Building blocks for complex UI patterns.

| Hook | APG Pattern | Usage in Envy UI v2 |
|------|-------------|---------------------|
| `useListBox` | Listbox | ✅ Used (via Select component) |
| `useOption` | Listbox option | ✅ Used (via Select component) |
| `useMenu` | Menu | ✅ Used (Menu component) |
| `useMenuItem` | Menu item | ✅ Used (Menu component) |
| `useMenuTrigger` | Menu button | ❌ Not yet used |
| `useMenuBar` | Menu bar | ❌ Not yet used |
| `useSelect` | Select/Listbox | ✅ Used (Select, MultiSelect components) |
| `useComboBox` | Combobox | ✅ Used (SearchableSelect component) |
| `useDialog` | Dialog | ✅ Mentioned in ADR-0001 |
| `useModal` | Modal | ✅ Mentioned in ADR-0001 |
| `usePopover` | Popover | ✅ Mentioned in ADR-0001 |
| `useTooltip` | Tooltip | ❌ Not yet used |
| `useDisclosure` | Disclosure | ❌ Not yet used (could be used for Accordion) |
| `useTabs` | Tabs | ❌ Not yet used |
| `useTab` | Tab | ❌ Not yet used |
| `useTabList` | Tab list | ❌ Not yet used |
| `useTabPanel` | Tab panel | ❌ Not yet used |
| `useAccordion` | Accordion | ❌ Not yet used |
| `useBreadcrumbs` | Breadcrumb | ❌ Not yet used |
| `useBreadcrumbItem` | Breadcrumb item | ❌ Not yet used |
| `useTreeView` | Tree view | ❌ Not yet used |
| `useTreeViewItem` | Tree item | ❌ Not yet used |

**Note:** According to ADR-0001, these are used selectively as building blocks.

---

### Date/Time Primitives (~5 hooks)

| Hook | Pattern | Usage in Envy UI v2 |
|------|---------|---------------------|
| `useCalendar` | Calendar | ✅ Used (Calendar component) |
| `useCalendarCell` | Calendar cell | ✅ Used (Calendar component) |
| `useDateField` | Date field | ❌ Not yet used |
| `useDatePicker` | Date picker | ❌ Not yet used |
| `useDateRangePicker` | Date range picker | ❌ Not yet used |

---

### Advanced Patterns (~10 hooks)

**Purpose:** Complex patterns that React Aria provides hooks for (but Envy UI v2 doesn't use high-level components per ADR-0001).

| Hook | Pattern | Usage in Envy UI v2 |
|------|---------|---------------------|
| `useDragAndDrop` | Drag and drop | ❌ Not yet used |
| `useDrag` | Drag | ❌ Not yet used |
| `useDrop` | Drop | ❌ Not yet used |
| `useTable` | Table | ❌ Not used (per ADR-0001, high-level components not used) |
| `useTableHeaderRow` | Table header row | ❌ Not used |
| `useTableRow` | Table row | ❌ Not used |
| `useTableColumnHeader` | Table column header | ❌ Not used |
| `useTableSelectAllCheckbox` | Table select all | ❌ Not used |
| `useTableSelectionCheckbox` | Table row selection | ❌ Not used |
| `useGrid` | Grid | ❌ Not used (per ADR-0001, high-level components not used) |

**Note:** Per ADR-0001, Envy UI v2 does NOT use React Aria high-level components (Table, Calendar, DatePicker, ComboBox). Instead, custom implementations are built on top of low-level primitives.

---

### Utilities (~10 hooks)

| Hook | Purpose | Usage in Envy UI v2 |
|------|---------|---------------------|
| `useLocale` | Locale information | ✅ Used (Calendar component) |
| `useLocalizedStringFormatter` | String formatting | ❌ Not yet used |
| `useRouter` | Router integration | ❌ Not yet used |
| `useLink` | Link component | ❌ Not yet used |
| `useForm` | Form management | ❌ Not yet used |
| `useField` | Form field | ❌ Not yet used |
| `useValidation` | Form validation | ❌ Not yet used |
| `useAriaLabel` | ARIA label utility | ❌ Not yet used |
| `useLabel` | Label utility | ❌ Not yet used |
| `useDescription` | Description utility | ❌ Not yet used |

---

## Envy UI v2 Usage Summary

### Currently Used (Level 1 - Mandatory)

Based on ADR-0001 and codebase analysis:

- ✅ `useButton` - Button component
- ✅ `useCheckbox` - Checkbox component
- ✅ `useRadio` - (Mentioned in ADR-0001)
- ✅ `useSwitch` - (Mentioned in ADR-0001)
- ✅ `useTextField` - Input/TextField component
- ✅ `useFocusRing` - Focus management
- ✅ `useHover` - Hover states
- ✅ `usePress` - Press events

### Currently Used (Level 2 - Selective)

- ✅ `useListBox` / `useSelect` - Select, MultiSelect components
- ✅ `useMenu` / `useMenuItem` - Menu component
- ✅ `useCalendar` / `useCalendarCell` - Calendar component
- ✅ `usePopover` - (Mentioned in ADR-0001)
- ✅ `useDialog` - (Mentioned in ADR-0001)
- ✅ `useLocale` - Calendar component

### Future Candidates (Based on Needs)

**Likely to be used:**
- `useTabs` - For tab navigation
- `useDisclosure` - For accordion/collapsible sections
- `useTooltip` - For tooltips
- `useBreadcrumbs` - For breadcrumb navigation
- `useTreeView` - For tree/hierarchical navigation

**Will NOT be used (per ADR-0001):**
- `useTable` - Custom implementation instead
- `useGrid` - Custom implementation instead
- High-level Calendar/DatePicker components - Custom implementation instead

---

## Decision Framework Quick Reference

For detailed decision framework, see [ADR-0029](../adr/ADR-0029-accessibility-architecture-and-decision-framework.md).

### Quick Rules

1. **Table vs Grid vs TreeGrid:**
   - Static data → `<table>` or `role="table"`
   - Interactive cells/editing → `role="grid"`
   - Expandable/hierarchical rows → `role="treegrid"`

2. **Menu vs ListBox:**
   - List of actions → `role="menu"` (use `useMenu`)
   - List of selectable items (with checkboxes) → `role="listbox"` (use `useSelect`/`useListBox`)

3. **Component Composition:**
   - When adding interactive elements (expandable, checkboxes), reassess the ARIA role
   - Role should reflect functional purpose, not just visual appearance

4. **React Aria Usage:**
   - Use low-level primitives for basic components
   - Use pattern primitives selectively for complex patterns
   - Do NOT use high-level components (per ADR-0001)
   - Build custom implementations on top of primitives

---

## References

- **WAI-ARIA 1.2 Specification:** https://www.w3.org/TR/wai-aria-1.2/
- **WAI-ARIA Authoring Practices Guide:** https://www.w3.org/WAI/ARIA/apg/
- **React Aria Documentation:** https://react-spectrum.adobe.com/react-aria/
- **ADR-0001:** React Aria as Headless Accessibility Foundation
- **ADR-0029:** Accessibility Architecture and Decision Framework

---

**Last Updated:** 2025-01-21  
**Maintainer:** Update this document as React Aria evolves and new patterns are adopted in Envy UI v2.

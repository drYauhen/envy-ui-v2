# Layout Composition Guide

**Document ID:** ARCH-layout-001-layout-composition-guide
**Status:** Guide (Advisory)
**Date:** 2026-01-06
**Last Updated:** 2026-01-14
**Owner:** Eugene Goncharov
**Assistance:** AI-assisted drafting (human-reviewed)
**Category:** Architecture Rules (Binding)
**Related:**


---

## Core Concepts

### 1) App Shell (Application Context)
**Purpose:** Full application chrome and layout grid: header, side nav, title bars, content, optional detail panel.  
**Component:** `eui-app-shell`

**Required children (grid areas):**
- `eui-header` (global header / top bar)
- `eui-side-nav` (left navigation)
- `eui-title-bar eui-title-bar--global` (global context row)
- `eui-title-bar eui-title-bar--contextual` (page-specific row)
- `eui-content` (main scroll container)
- `eui-detail-panel` (optional right panel)

**Notes:**
- `eui-content` is the main scroll container inside the shell.
- `eui-app-shell` is **application-only**. It is not used for website or report contexts.

---

### 2) Page (Standalone or Inside Content)
**Purpose:** Page-level wrapper with header/body/footer semantics.  
**Component:** `eui-page`

**Typical use:**
- Standalone pages (site/report context)
- Inside `eui-content` when you want a consistent page header + body layout

**Notes:**
- Use `eui-page__header` and `eui-page__body` to structure content.
- Do not use `eui-page` as a replacement for `eui-app-shell`.

---

### 3) Container
**Purpose:** Width constraint and horizontal gutters.  
**Component:** `eui-container`

**Variants:**
- `data-eui-container="standard"` (forms / detail pages)
- `data-eui-container="wide"` (tables / dashboards)
- `data-eui-container="fluid"` (full width)

---

### 4) Section
**Purpose:** Vertical grouping with title + content.  
**Component:** `eui-section`

**Parts:**
- `eui-section__title`
- `eui-section__content`

---

### 5) Layout Primitives
**Purpose:** Local layout control inside sections.  
**Components:**
- `eui-stack` (vertical)
- `eui-inline` (horizontal)
- `eui-grid` (columns)
- `eui-toolbar` (left/center/right row)

---

### 6) Split Layout (Resizable Panes)
**Purpose:** Two-pane layouts with resize/collapse behavior.  
**Components:**
- `eui-split` (behavioral container)
- `eui-pane` (content surface)

**Notes:**
- `eui-split` should own resize/collapse behavior and handle exactly two children.
- Use nesting of `eui-split` for more complex layouts (left/right + top/bottom).
- `eui-pane` can include optional `eui-pane__header` and `eui-pane__content`.

---

## Canonical Composition Patterns

### A) Application Shell + Page Content
Use when building the main application experience.

```layout
app-shell-page
```
```html
<div class="eui-app-shell" data-eui-sidebar-collapsed="false" data-eui-detail-panel-open="false">
  <header class="eui-header">...</header>
  <nav class="eui-side-nav">...</nav>
  <div class="eui-title-bar eui-title-bar--global">...</div>
  <div class="eui-title-bar eui-title-bar--contextual">...</div>

  <main class="eui-content">
    <div class="eui-page">
      <div class="eui-page__header">
        <div class="eui-container" data-eui-container="wide">
          <div class="eui-page-header">...</div>
        </div>
      </div>
      <div class="eui-page__body">
        <div class="eui-container" data-eui-container="wide">
          <div class="eui-stack" data-eui-gap="lg">
            <div class="eui-section">
              <h2 class="eui-section__title">Section</h2>
              <div class="eui-section__content">...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <aside class="eui-detail-panel" data-eui-open="false">...</aside>
</div>
```

---

### B) Standalone Page (Site/Report)
Use for standalone routes (no app shell).

```layout
standalone-page
```
```html
<div class="eui-page">
  <div class="eui-page__header">
    <div class="eui-container" data-eui-container="standard">
      <div class="eui-page-header">...</div>
    </div>
  </div>
  <div class="eui-page__body">
    <div class="eui-container" data-eui-container="standard">
      <div class="eui-section">
        <h2 class="eui-section__title">Section</h2>
        <div class="eui-section__content">...</div>
      </div>
    </div>
  </div>
</div>
```

---

### C) Data Table Page
Use for table-heavy app screens.

```layout
data-table-page
```
```html
<div class="eui-page">
  <div class="eui-page__header">
    <div class="eui-container" data-eui-container="wide">
      <div class="eui-page-header">...</div>
    </div>
  </div>
  <div class="eui-page__body">
    <div class="eui-container" data-eui-container="wide">
      <div class="eui-stack" data-eui-gap="md">
        <div class="eui-toolbar">
          <div class="eui-toolbar__left">...</div>
          <div class="eui-toolbar__right">...</div>
        </div>
        <div class="eui-card" data-eui-variant="elevated">Table content</div>
      </div>
    </div>
  </div>
</div>
```

---

### D) Split Pane Layouts
Use when the screen requires resizable or collapsible panes.

#### D1) Two Pane (Left/Right)
```layout
split-two
```
```html
<main class="eui-content">
  <div class="eui-split" data-eui-orientation="horizontal">
    <section class="eui-pane">
      <div class="eui-pane__header">...</div>
      <div class="eui-pane__content">...</div>
    </section>
    <section class="eui-pane">
      <div class="eui-pane__header">...</div>
      <div class="eui-pane__content">...</div>
    </section>
  </div>
</main>
```

#### D2) Left + Right + Bottom (Default)
Bottom pane belongs to the right column.
```layout
split-right-bottom
```
```html
<main class="eui-content">
  <div class="eui-split" data-eui-orientation="horizontal">
    <section class="eui-pane">...</section>
    <div class="eui-split" data-eui-orientation="vertical">
      <section class="eui-pane">...</section>
      <section class="eui-pane">...</section>
    </div>
  </div>
</main>
```

#### D3) Left + Right + Bottom (Full Width, Rare)
Bottom pane spans the full width under left and right.
```layout
split-full-width
```
```html
<main class="eui-content">
  <div class="eui-split" data-eui-orientation="vertical">
    <div class="eui-split" data-eui-orientation="horizontal">
      <section class="eui-pane">...</section>
      <section class="eui-pane">...</section>
    </div>
    <section class="eui-pane">...</section>
  </div>
</main>
```

---

## Practical Guidance

- Use **App Shell** only for the application context.
- Use **Page** inside `eui-content` when you want consistent header/body structure.
- Always pair **Page Header** with **Container** for correct width.
- Use **Section** for vertical grouping; use **Stack/Inline/Grid** inside sections.
- For multi-pane layouts, keep each split to **two children** and nest splits as needed.
- Prefer **token-driven classes** over inline styles.

---

## Related Documents

- [Dev App Architecture](ARCH-system-004-dev-app-architecture.md)
- [Token Usage Rules](ARCH-tokens-004-token-usage-rules.md)

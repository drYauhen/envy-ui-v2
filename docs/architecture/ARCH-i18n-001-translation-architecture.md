# i18n Translation Architecture

**Document ID:** ARCH-i18n-001-translation-architecture
**Status:** Proposed
**Date:** 2026-01-25
**Category:** Application Architecture

---

## Overview

This document defines the internationalization (i18n) architecture for the application layer. The goal is to provide a scalable, consistent way to handle translations while keeping the Design System (DS) i18n-agnostic.

## Core Principles

1.  **App-Layer Responsibility**: Translation happens in the application, not the Design System. DS components receive ready-to-render strings.
2.  **Single API**: We use `t()` (via `react-i18next`) as the single source of truth for string resolution.
3.  **Semantic Keys**: Keys describe the *meaning* of the string, not the content (e.g., `actions.save` instead of `save`).
4.  **Interpolation**: We support dynamic values using single braces `{name}`.

## Technology Stack

-   **Library**: `i18next` + `react-i18next`
-   **Format**: JSON dictionaries
-   **Structure**: Resource-based loading (initially bundled, extensible to async backend)

## Naming Conventions

Keys are organized into semantic namespaces. Do not use component names as namespaces.

| Namespace | Purpose | Examples |
| :--- | :--- | :--- |
| `actions.*` | CTA verbs and interactive elements | `actions.save`, `actions.cancel` |
| `labels.*` | Field labels, column headers, common nouns | `labels.name`, `labels.status` |
| `messages.*` | System states, notifications, empty states | `messages.loading`, `messages.noData` |
| `errors.*` | Validation messages, system errors | `errors.requiredField`, `errors.network` |
| `status.*` | Status values | `status.active`, `status.pending` |
| `a11y.*` | Screen-reader only text, aria-labels | `a11y.close`, `a11y.removeItem` |

### Rules
-   **CamelCase**: Use camelCase for keys (e.g., `saveChanges`).
-   **No Generic Roots**: Avoid root-level keys like `save` or `ok`. Always nest under a namespace.
-   **Stability**: Rename the text value, not the key, when copy changes (unless the meaning changes entirely).

## Usage Guidelines

### 1. Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

export const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <Button>
      {t('actions.save')}
    </Button>
  );
};
```

### 2. Interpolation

Use `{variableName}` in the translation string.

**en.json**:
```json
{
  "a11y": {
    "removeItem": "Remove {name}"
  }
}
```

**Component**:
```tsx
<button aria-label={t('a11y.removeItem', { name: 'Item A' })}>
  <Icon name="trash" />
</button>
```

### 3. Design System Integration

Pass translated strings to DS components.

```tsx
// ✅ Correct
<Badge label={t('status.active')} />

// ❌ Incorrect: Passing key to DS
<Badge label="status.active" />
```

# Themes

Themes define visual identity within the App context.

## Overview

Themes override semantic tokens to provide different visual expressions while maintaining the same structural constraints defined by the App context.

## Available Themes

- **Default**: Standard visual appearance for application interface
- **Accessibility**: Enhanced contrast and larger font sizes for accessibility compliance

## How Themes Work

Themes are applied via CSS custom properties with selectors like:
```css
[data-eui-context="app"][data-eui-theme="default"]
[data-eui-context="app"][data-eui-theme="accessibility"]
```

Theme tokens override semantic tokens to provide different visual expressions while maintaining the same structural constraints.


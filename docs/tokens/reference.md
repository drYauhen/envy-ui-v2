# Design Tokens Reference

> Auto-generated from design tokens. Last updated: 2026-01-12T02:52:54.863Z

## Overview

This document lists all available CSS custom properties (tokens) organized by component and foundation tokens.

**Total tokens:** 664

## Usage

### In CSS

```css
/* In component CSS */
.my-component {
  color: var(--eui-button-primary-label-base);
  height: var(--eui-button-size-md-height);
}
```

### In TypeScript/React

```typescript
// Using type-safe token utilities
import { tokenVar, getTokenValue } from '@/generated/tsx/tokens.types';
import { getComponentTokens } from '@/utils/tokens';

// Type-safe token reference
const style = {
  color: tokenVar('eui-button-primary-label-base'),
  height: tokenVar('eui-button-size-md-height')
};

// Get token value at runtime
const buttonColor = getTokenValue('eui-button-primary-label-base');

// Get all tokens for a component
const buttonTokens = getComponentTokens('button');
```

### In Inline Styles

```tsx
<div style={{ color: 'var(--eui-button-primary-label-base)' }}>
  Content
</div>
```

---

## Foundation Tokens

Foundation tokens are base design tokens that are not component-specific.

| Token | Value |
|-------|-------|
| `--eui-border-style-default` | `solid` |
| `--eui-border-style-solid` | `solid` |
| `--eui-border-width-default` | `2px` |
| `--eui-border-width-default` | `2px` |
| `--eui-border-width-focus` | `2px` |
| `--eui-border-width-thick` | `3px` |
| `--eui-border-width-thick` | `3px` |
| `--eui-border-width-thin` | `1px` |
| `--eui-border-width-thin` | `1px` |
| `--eui-color-accent-100` | `oklch(93% 0.06 236)` |
| `--eui-color-accent-200` | `oklch(89% 0.09 236)` |
| `--eui-color-accent-300` | `oklch(84% 0.14 236)` |
| `--eui-color-accent-400` | `oklch(76% 0.15 237)` |
| `--eui-color-accent-50` | `oklch(96% 0.04 236)` |
| `--eui-color-accent-500` | `oklch(71% 0.15 237)` |
| `--eui-color-accent-600` | `oklch(68% 0.15 237)` |
| `--eui-color-accent-700` | `oklch(63% 0.15 237)` |
| `--eui-color-accent-800` | `oklch(58% 0.14 237)` |
| `--eui-color-accent-900` | `oklch(53% 0.13 238)` |
| `--eui-color-accent-muted` | `oklch(84% 0.14 236)` |
| `--eui-color-accent-primary` | `oklch(68% 0.15 237)` |
| `--eui-color-accent-primary` | `oklch(68% 0.15 237)` |
| `--eui-color-accent-secondary` | `oklch(71% 0.15 237)` |
| `--eui-color-background-inverse` | `oklch(25% 0.00 0)` |
| `--eui-color-background-muted` | `oklch(98% 0.00 0)` |
| `--eui-color-background-muted` | `var(--eui-color-neutral-200)` |
| `--eui-color-background-subtle` | `oklch(96.5% 0.00 0)` |
| `--eui-color-background-subtle` | `var(--eui-color-neutral-300)` |
| `--eui-color-background-surface` | `oklch(100% 0.00 0)` |
| `--eui-color-background-transparent` | `transparent` |
| `--eui-color-border-default` | `oklch(90% 0.00 0)` |
| `--eui-color-border-default` | `var(--eui-color-neutral-700)` |
| `--eui-color-border-default` | `var(--eui-color-neutral-300)` |
| `--eui-color-border-inverse` | `oklch(33% 0.00 0)` |
| `--eui-color-border-strong` | `oklch(84% 0.00 0)` |
| `--eui-color-border-strong` | `var(--eui-color-neutral-800)` |
| `--eui-color-border-subtle` | `oklch(94% 0.00 0)` |
| `--eui-color-border-subtle` | `var(--eui-color-neutral-600)` |
| `--eui-color-brand-100` | `oklch(93% 0.05 232)` |
| `--eui-color-brand-200` | `oklch(85% 0.06 231)` |
| `--eui-color-brand-300` | `oklch(75% 0.08 231)` |
| `--eui-color-brand-400` | `oklch(65% 0.09 231)` |
| `--eui-color-brand-50` | `oklch(97% 0.02 232)` |
| `--eui-color-brand-500` | `oklch(57% 0.09 231)` |
| `--eui-color-brand-600` | `oklch(52% 0.10 230)` |
| `--eui-color-brand-700` | `oklch(49% 0.10 230)` |
| `--eui-color-brand-800` | `oklch(47% 0.10 230)` |
| `--eui-color-brand-900` | `oklch(46% 0.09 231)` |
| `--eui-color-brand-accent` | `oklch(52% 0.10 230)` |
| `--eui-color-brand-primary` | `oklch(49% 0.10 230)` |
| `--eui-color-brand-primary` | `oklch(49% 0.10 230)` |
| `--eui-color-brand-secondary` | `oklch(57% 0.09 231)` |
| `--eui-color-focus-ring` | `oklch(71% 0.15 237)` |
| `--eui-color-focus-ring` | `var(--eui-color-accent-700)` |
| `--eui-color-focus-ring` | `var(--eui-color-accent-500)` |
| `--eui-color-neutral-100` | `oklch(96.5% 0.00 0)` |
| `--eui-color-neutral-200` | `oklch(94% 0.00 0)` |
| `--eui-color-neutral-300` | `oklch(90% 0.00 0)` |
| `--eui-color-neutral-400` | `oklch(84% 0.00 0)` |
| `--eui-color-neutral-50` | `oklch(98% 0.00 0)` |
| `--eui-color-neutral-500` | `oklch(75% 0.00 0)` |
| `--eui-color-neutral-600` | `oklch(63% 0.00 0)` |
| `--eui-color-neutral-700` | `oklch(48% 0.00 0)` |
| `--eui-color-neutral-800` | `oklch(33% 0.00 0)` |
| `--eui-color-neutral-900` | `oklch(25% 0.00 0)` |
| `--eui-color-neutral-border` | `oklch(90% 0.00 0)` |
| `--eui-color-neutral-border-strong` | `oklch(84% 0.00 0)` |
| `--eui-color-neutral-divider` | `oklch(94% 0.00 0)` |
| `--eui-color-neutral-surface` | `oklch(100% 0.00 0)` |
| `--eui-color-neutral-text` | `oklch(25% 0.00 0)` |
| `--eui-color-neutral-text-muted` | `oklch(75% 0.00 0)` |
| `--eui-color-neutral-text-secondary` | `oklch(48% 0.00 0)` |
| `--eui-color-neutral-transparent` | `transparent` |
| `--eui-color-neutral-white` | `oklch(100% 0 0)` |
| `--eui-color-neutral-zero` | `oklch(100% 0.00 0)` |
| `--eui-color-signal-100` | `oklch(87% 0.14 25)` |
| `--eui-color-signal-200` | `oklch(77% 0.20 25)` |
| `--eui-color-signal-300` | `oklch(67% 0.24 25)` |
| `--eui-color-signal-400` | `oklch(57% 0.26 25)` |
| `--eui-color-signal-50` | `oklch(97% 0.08 25)` |
| `--eui-color-signal-500` | `oklch(62% 0.26 25)` |
| `--eui-color-signal-600` | `oklch(57% 0.25 25)` |
| `--eui-color-signal-700` | `oklch(54% 0.24 25)` |
| `--eui-color-signal-800` | `oklch(51% 0.23 25)` |
| `--eui-color-signal-900` | `oklch(48% 0.22 25)` |
| `--eui-color-signal-keyboardFocus` | `var(--eui-color-signal-500)` |
| `--eui-color-signal-keyboardFocus` | `oklch(62% 0.26 25)` |
| `--eui-color-status-application-100` | `oklch(85% 0.12 137)` |
| `--eui-color-status-application-200` | `oklch(75% 0.16 137)` |
| `--eui-color-status-application-300` | `oklch(70% 0.17 137)` |
| `--eui-color-status-application-400` | `oklch(65% 0.18 137)` |
| `--eui-color-status-application-50` | `oklch(95% 0.05 137)` |
| `--eui-color-status-application-500` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-600` | `oklch(55% 0.18 137)` |
| `--eui-color-status-application-700` | `oklch(52% 0.17 137)` |
| `--eui-color-status-application-800` | `oklch(49% 0.16 137)` |
| `--eui-color-status-application-900` | `oklch(46% 0.15 137)` |
| `--eui-color-status-application-completed` | `oklch(51% 0.16 256)` |
| `--eui-color-status-application-completed` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-discontinued` | `oklch(32% 0.01 61)` |
| `--eui-color-status-application-discontinued` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-majorDisruption` | `oklch(58% 0.23 26)` |
| `--eui-color-status-application-majorDisruption` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-minorDisruption` | `oklch(89% 0.18 95)` |
| `--eui-color-status-application-minorDisruption` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-onTrack` | `oklch(66% 0.18 137)` |
| `--eui-color-status-application-onTrack` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-pending` | `oklch(64% 0.00 326)` |
| `--eui-color-status-application-pending` | `oklch(60% 0.18 137)` |
| `--eui-color-status-application-upcoming` | `oklch(57% 0.10 312)` |
| `--eui-color-status-application-upcoming` | `oklch(60% 0.18 137)` |
| `--eui-color-status-error-100` | `oklch(74% 0.18 25)` |
| `--eui-color-status-error-200` | `oklch(64% 0.21 25)` |
| `--eui-color-status-error-300` | `oklch(59% 0.21 25)` |
| `--eui-color-status-error-400` | `oklch(54% 0.21 25)` |
| `--eui-color-status-error-50` | `oklch(84% 0.10 24)` |
| `--eui-color-status-error-500` | `oklch(64% 0.21 25)` |
| `--eui-color-status-error-600` | `oklch(59% 0.20 25)` |
| `--eui-color-status-error-700` | `oklch(56% 0.19 25)` |
| `--eui-color-status-error-800` | `oklch(53% 0.18 25)` |
| `--eui-color-status-error-900` | `oklch(50% 0.17 25)` |
| `--eui-color-status-error-background` | `oklch(84% 0.10 24)` |
| `--eui-color-status-error-border` | `oklch(64% 0.21 25)` |
| `--eui-color-status-error-primary` | `oklch(64% 0.21 25)` |
| `--eui-color-status-error-solid` | `oklch(59% 0.20 25)` |
| `--eui-color-status-error-text` | `oklch(56% 0.19 25)` |
| `--eui-color-status-info-100` | `oklch(78% 0.13 237)` |
| `--eui-color-status-info-200` | `oklch(68% 0.15 237)` |
| `--eui-color-status-info-300` | `oklch(63% 0.15 237)` |
| `--eui-color-status-info-400` | `oklch(58% 0.15 237)` |
| `--eui-color-status-info-50` | `oklch(88% 0.07 236)` |
| `--eui-color-status-info-500` | `oklch(68% 0.15 237)` |
| `--eui-color-status-info-600` | `oklch(63% 0.15 237)` |
| `--eui-color-status-info-700` | `oklch(60% 0.14 237)` |
| `--eui-color-status-info-800` | `oklch(57% 0.13 237)` |
| `--eui-color-status-info-900` | `oklch(54% 0.12 237)` |
| `--eui-color-status-info-background` | `oklch(96% 0.04 236)` |
| `--eui-color-status-info-border` | `oklch(89% 0.09 236)` |
| `--eui-color-status-info-primary` | `oklch(68% 0.15 237)` |
| `--eui-color-status-info-solid` | `oklch(68% 0.15 237)` |
| `--eui-color-status-info-text` | `oklch(63% 0.15 237)` |
| `--eui-color-status-neutral-background` | `oklch(98% 0.00 0)` |
| `--eui-color-status-neutral-border` | `oklch(94% 0.00 0)` |
| `--eui-color-status-neutral-solid` | `oklch(25% 0.00 0)` |
| `--eui-color-status-neutral-text` | `oklch(48% 0.00 0)` |
| `--eui-color-status-success-100` | `oklch(82% 0.17 150)` |
| `--eui-color-status-success-200` | `oklch(72% 0.19 150)` |
| `--eui-color-status-success-300` | `oklch(67% 0.19 150)` |
| `--eui-color-status-success-400` | `oklch(62% 0.19 150)` |
| `--eui-color-status-success-50` | `oklch(92% 0.10 149)` |
| `--eui-color-status-success-500` | `oklch(72% 0.19 150)` |
| `--eui-color-status-success-600` | `oklch(67% 0.18 150)` |
| `--eui-color-status-success-700` | `oklch(64% 0.17 150)` |
| `--eui-color-status-success-800` | `oklch(61% 0.16 150)` |
| `--eui-color-status-success-900` | `oklch(58% 0.15 150)` |
| `--eui-color-status-success-background` | `oklch(92% 0.10 149)` |
| `--eui-color-status-success-border` | `oklch(72% 0.19 150)` |
| `--eui-color-status-success-primary` | `oklch(72% 0.19 150)` |
| `--eui-color-status-success-solid` | `oklch(67% 0.18 150)` |
| `--eui-color-status-success-text` | `oklch(64% 0.17 150)` |
| `--eui-color-status-warning-100` | `oklch(87% 0.14 70)` |
| `--eui-color-status-warning-200` | `oklch(77% 0.16 70)` |
| `--eui-color-status-warning-300` | `oklch(72% 0.16 70)` |
| `--eui-color-status-warning-400` | `oklch(67% 0.16 70)` |
| `--eui-color-status-warning-50` | `oklch(97% 0.08 69)` |
| `--eui-color-status-warning-500` | `oklch(77% 0.16 70)` |
| `--eui-color-status-warning-600` | `oklch(72% 0.15 70)` |
| `--eui-color-status-warning-700` | `oklch(69% 0.15 70)` |
| `--eui-color-status-warning-800` | `oklch(66% 0.14 70)` |
| `--eui-color-status-warning-900` | `oklch(63% 0.13 70)` |
| `--eui-color-status-warning-background` | `oklch(97% 0.08 69)` |
| `--eui-color-status-warning-border` | `oklch(77% 0.16 70)` |
| `--eui-color-status-warning-primary` | `oklch(77% 0.16 70)` |
| `--eui-color-status-warning-solid` | `oklch(72% 0.15 70)` |
| `--eui-color-status-warning-text` | `oklch(69% 0.15 70)` |
| `--eui-color-system-focus` | `var(--eui-color-signal-500)` |
| `--eui-color-text-disabled` | `oklch(75% 0.00 0)` |
| `--eui-color-text-disabled` | `var(--eui-color-neutral-600)` |
| `--eui-color-text-inverse` | `oklch(100% 0 0)` |
| `--eui-color-text-muted` | `oklch(48% 0.00 0)` |
| `--eui-color-text-muted` | `var(--eui-color-neutral-800)` |
| `--eui-color-text-primary` | `oklch(25% 0.00 0)` |
| `--eui-color-text-primary` | `var(--eui-color-neutral-900)` |
| `--eui-color-text-subtle` | `oklch(63% 0.00 0)` |
| `--eui-color-text-subtle` | `var(--eui-color-neutral-700)` |
| `--eui-radius-default` | `4px` |
| `--eui-radius-extra-large` | `12px` |
| `--eui-radius-full` | `9999px` |
| `--eui-radius-full` | `9999px` |
| `--eui-radius-large` | `8px` |
| `--eui-radius-lg` | `8px` |
| `--eui-radius-md` | `4px` |
| `--eui-radius-none` | `0px` |
| `--eui-radius-none` | `0px` |
| `--eui-radius-sm` | `2px` |
| `--eui-radius-small` | `2px` |
| `--eui-radius-xl` | `12px` |
| `--eui-shadow-default` | `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.10)` |
| `--eui-shadow-default` | `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.10)` |
| `--eui-shadow-extra-large` | `0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)` |
| `--eui-shadow-extra-large` | `0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)` |
| `--eui-shadow-large` | `0 2px 4px rgba(0, 0, 0, 0.10), 0 2px 3px rgba(0, 0, 0, 0.12)` |
| `--eui-shadow-large` | `0 2px 4px rgba(0, 0, 0, 0.10), 0 2px 3px rgba(0, 0, 0, 0.12)` |
| `--eui-shadow-none` | `none` |
| `--eui-shadow-none` | `none` |
| `--eui-shadow-small` | `0 1px 2px rgba(0, 0, 0, 0.05)` |
| `--eui-shadow-small` | `0 1px 2px rgba(0, 0, 0, 0.05)` |
| `--eui-spacing-0` | `0px` |
| `--eui-spacing-1` | `4px` |
| `--eui-spacing-10` | `40px` |
| `--eui-spacing-11` | `44px` |
| `--eui-spacing-12` | `48px` |
| `--eui-spacing-13` | `52px` |
| `--eui-spacing-14` | `56px` |
| `--eui-spacing-15` | `60px` |
| `--eui-spacing-16` | `64px` |
| `--eui-spacing-17` | `68px` |
| `--eui-spacing-18` | `72px` |
| `--eui-spacing-19` | `76px` |
| `--eui-spacing-2` | `8px` |
| `--eui-spacing-20` | `80px` |
| `--eui-spacing-2xl` | `48px` |
| `--eui-spacing-2xl` | `3.4286rem` |
| `--eui-spacing-2xs` | `2px` |
| `--eui-spacing-2xs` | `0.1429rem` |
| `--eui-spacing-3` | `12px` |
| `--eui-spacing-4` | `16px` |
| `--eui-spacing-5` | `20px` |
| `--eui-spacing-6` | `24px` |
| `--eui-spacing-7` | `28px` |
| `--eui-spacing-8` | `32px` |
| `--eui-spacing-9` | `36px` |
| `--eui-spacing-lg` | `24px` |
| `--eui-spacing-lg` | `1.7143rem` |
| `--eui-spacing-md` | `16px` |
| `--eui-spacing-md` | `1.1429rem` |
| `--eui-spacing-sm` | `8px` |
| `--eui-spacing-sm` | `0.5714rem` |
| `--eui-spacing-xl` | `32px` |
| `--eui-spacing-xl` | `2.2857rem` |
| `--eui-spacing-xs` | `4px` |
| `--eui-spacing-xs` | `0.2857rem` |
| `--eui-typography-base-fontSize` | `var(--eui-typography-fontSize-lg)` |
| `--eui-typography-fontFamily-monospace` | `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace` |
| `--eui-typography-fontFamily-monospace` | `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace` |
| `--eui-typography-fontFamily-ui` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-fontFamily-ui` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-fontSize-2xl` | `30px` |
| `--eui-typography-fontSize-2xl` | `30px` |
| `--eui-typography-fontSize-3xl` | `36px` |
| `--eui-typography-fontSize-3xl` | `36px` |
| `--eui-typography-fontSize-4xl` | `48px` |
| `--eui-typography-fontSize-4xl` | `48px` |
| `--eui-typography-fontSize-5xl` | `60px` |
| `--eui-typography-fontSize-5xl` | `60px` |
| `--eui-typography-fontSize-6xl` | `72px` |
| `--eui-typography-fontSize-6xl` | `72px` |
| `--eui-typography-fontSize-base` | `16px` |
| `--eui-typography-fontSize-base` | `16px` |
| `--eui-typography-fontSize-lg` | `20px` |
| `--eui-typography-fontSize-lg` | `20px` |
| `--eui-typography-fontSize-md` | `18px` |
| `--eui-typography-fontSize-md` | `18px` |
| `--eui-typography-fontSize-sm` | `14px` |
| `--eui-typography-fontSize-sm` | `14px` |
| `--eui-typography-fontSize-xl` | `24px` |
| `--eui-typography-fontSize-xl` | `24px` |
| `--eui-typography-fontSize-xs` | `12px` |
| `--eui-typography-fontSize-xs` | `12px` |
| `--eui-typography-fontStyle-italic` | `italic` |
| `--eui-typography-fontStyle-italic` | `italic` |
| `--eui-typography-fontStyle-normal` | `normal` |
| `--eui-typography-fontStyle-normal` | `normal` |
| `--eui-typography-fontStyle-oblique` | `oblique` |
| `--eui-typography-fontStyle-oblique` | `oblique` |
| `--eui-typography-fontWeight-black` | `900` |
| `--eui-typography-fontWeight-bold` | `700` |
| `--eui-typography-fontWeight-bold` | `700` |
| `--eui-typography-fontWeight-extrabold` | `800` |
| `--eui-typography-fontWeight-extralight` | `200` |
| `--eui-typography-fontWeight-light` | `300` |
| `--eui-typography-fontWeight-light` | `300` |
| `--eui-typography-fontWeight-medium` | `500` |
| `--eui-typography-fontWeight-medium` | `500` |
| `--eui-typography-fontWeight-normal` | `400` |
| `--eui-typography-fontWeight-normal` | `400` |
| `--eui-typography-fontWeight-semibold` | `600` |
| `--eui-typography-fontWeight-semibold` | `600` |
| `--eui-typography-fontWeight-thin` | `100` |
| `--eui-typography-letterSpacing-normal` | `0em` |
| `--eui-typography-letterSpacing-normal` | `0em` |
| `--eui-typography-letterSpacing-tight` | `-0.025em` |
| `--eui-typography-letterSpacing-tight` | `-0.025em` |
| `--eui-typography-letterSpacing-tighter` | `-0.05em` |
| `--eui-typography-letterSpacing-tighter` | `-0.05em` |
| `--eui-typography-letterSpacing-wide` | `0.025em` |
| `--eui-typography-letterSpacing-wide` | `0.025em` |
| `--eui-typography-letterSpacing-wider` | `0.05em` |
| `--eui-typography-letterSpacing-wider` | `0.05em` |
| `--eui-typography-letterSpacing-widest` | `0.1em` |
| `--eui-typography-letterSpacing-widest` | `0.1em` |
| `--eui-typography-lineHeight-loose` | `2` |
| `--eui-typography-lineHeight-loose` | `2` |
| `--eui-typography-lineHeight-none` | `1.25` |
| `--eui-typography-lineHeight-normal` | `1.5` |
| `--eui-typography-lineHeight-normal` | `1.5` |
| `--eui-typography-lineHeight-relaxed` | `1.625` |
| `--eui-typography-lineHeight-relaxed` | `1.625` |
| `--eui-typography-lineHeight-snug` | `1.375` |
| `--eui-typography-lineHeight-tight` | `1.25` |
| `--eui-typography-lineHeight-tight` | `1.25` |
| `--eui-typography-textDecoration-line-through` | `line-through` |
| `--eui-typography-textDecoration-line-through` | `line-through` |
| `--eui-typography-textDecoration-none` | `none` |
| `--eui-typography-textDecoration-none` | `none` |
| `--eui-typography-textDecoration-underline` | `underline` |
| `--eui-typography-textDecoration-underline` | `underline` |
| `--eui-typography-textStyle-body-base-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-body-base-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-body-base-fontSize` | `16px` |
| `--eui-typography-textStyle-body-base-fontSize` | `16px` |
| `--eui-typography-textStyle-body-base-fontWeight` | `400` |
| `--eui-typography-textStyle-body-base-fontWeight` | `400` |
| `--eui-typography-textStyle-body-base-lineHeight` | `1.5` |
| `--eui-typography-textStyle-body-base-lineHeight` | `1.5` |
| `--eui-typography-textStyle-body-large-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-body-large-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-body-large-fontSize` | `18px` |
| `--eui-typography-textStyle-body-large-fontSize` | `18px` |
| `--eui-typography-textStyle-body-large-fontWeight` | `400` |
| `--eui-typography-textStyle-body-large-fontWeight` | `400` |
| `--eui-typography-textStyle-body-large-lineHeight` | `1.5` |
| `--eui-typography-textStyle-body-large-lineHeight` | `1.5` |
| `--eui-typography-textStyle-body-small-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-body-small-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-body-small-fontSize` | `14px` |
| `--eui-typography-textStyle-body-small-fontSize` | `14px` |
| `--eui-typography-textStyle-body-small-fontWeight` | `400` |
| `--eui-typography-textStyle-body-small-fontWeight` | `400` |
| `--eui-typography-textStyle-body-small-lineHeight` | `1.5` |
| `--eui-typography-textStyle-body-small-lineHeight` | `1.5` |
| `--eui-typography-textStyle-bodyStrong-base-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-bodyStrong-base-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-bodyStrong-base-fontSize` | `16px` |
| `--eui-typography-textStyle-bodyStrong-base-fontSize` | `16px` |
| `--eui-typography-textStyle-bodyStrong-base-fontWeight` | `600` |
| `--eui-typography-textStyle-bodyStrong-base-fontWeight` | `600` |
| `--eui-typography-textStyle-bodyStrong-base-lineHeight` | `1.5` |
| `--eui-typography-textStyle-bodyStrong-base-lineHeight` | `1.5` |
| `--eui-typography-textStyle-bodyStrong-small-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-bodyStrong-small-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-bodyStrong-small-fontSize` | `14px` |
| `--eui-typography-textStyle-bodyStrong-small-fontSize` | `14px` |
| `--eui-typography-textStyle-bodyStrong-small-fontWeight` | `600` |
| `--eui-typography-textStyle-bodyStrong-small-fontWeight` | `600` |
| `--eui-typography-textStyle-bodyStrong-small-lineHeight` | `1.5` |
| `--eui-typography-textStyle-bodyStrong-small-lineHeight` | `1.5` |
| `--eui-typography-textStyle-caption-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-caption-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-caption-fontSize` | `12px` |
| `--eui-typography-textStyle-caption-fontSize` | `12px` |
| `--eui-typography-textStyle-caption-fontWeight` | `400` |
| `--eui-typography-textStyle-caption-fontWeight` | `400` |
| `--eui-typography-textStyle-caption-lineHeight` | `1.5` |
| `--eui-typography-textStyle-caption-lineHeight` | `1.5` |
| `--eui-typography-textStyle-code-base-fontFamily` | `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace` |
| `--eui-typography-textStyle-code-base-fontFamily` | `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace` |
| `--eui-typography-textStyle-code-base-fontSize` | `14px` |
| `--eui-typography-textStyle-code-base-fontSize` | `14px` |
| `--eui-typography-textStyle-code-base-fontWeight` | `400` |
| `--eui-typography-textStyle-code-base-fontWeight` | `400` |
| `--eui-typography-textStyle-code-base-lineHeight` | `1.5` |
| `--eui-typography-textStyle-code-base-lineHeight` | `1.5` |
| `--eui-typography-textStyle-code-small-fontFamily` | `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace` |
| `--eui-typography-textStyle-code-small-fontFamily` | `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Courier New', monospace` |
| `--eui-typography-textStyle-code-small-fontSize` | `12px` |
| `--eui-typography-textStyle-code-small-fontSize` | `12px` |
| `--eui-typography-textStyle-code-small-fontWeight` | `400` |
| `--eui-typography-textStyle-code-small-fontWeight` | `400` |
| `--eui-typography-textStyle-code-small-lineHeight` | `1.5` |
| `--eui-typography-textStyle-code-small-lineHeight` | `1.5` |
| `--eui-typography-textStyle-heading-1-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-1-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-1-fontSize` | `72px` |
| `--eui-typography-textStyle-heading-1-fontSize` | `72px` |
| `--eui-typography-textStyle-heading-1-fontWeight` | `700` |
| `--eui-typography-textStyle-heading-1-fontWeight` | `700` |
| `--eui-typography-textStyle-heading-1-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-1-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-2-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-2-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-2-fontSize` | `60px` |
| `--eui-typography-textStyle-heading-2-fontSize` | `60px` |
| `--eui-typography-textStyle-heading-2-fontWeight` | `700` |
| `--eui-typography-textStyle-heading-2-fontWeight` | `700` |
| `--eui-typography-textStyle-heading-2-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-2-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-3-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-3-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-3-fontSize` | `48px` |
| `--eui-typography-textStyle-heading-3-fontSize` | `48px` |
| `--eui-typography-textStyle-heading-3-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-3-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-3-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-3-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-4-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-4-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-4-fontSize` | `36px` |
| `--eui-typography-textStyle-heading-4-fontSize` | `36px` |
| `--eui-typography-textStyle-heading-4-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-4-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-4-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-4-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-5-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-5-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-5-fontSize` | `30px` |
| `--eui-typography-textStyle-heading-5-fontSize` | `30px` |
| `--eui-typography-textStyle-heading-5-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-5-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-5-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-5-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-6-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-6-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-heading-6-fontSize` | `24px` |
| `--eui-typography-textStyle-heading-6-fontSize` | `24px` |
| `--eui-typography-textStyle-heading-6-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-6-fontWeight` | `600` |
| `--eui-typography-textStyle-heading-6-lineHeight` | `1.25` |
| `--eui-typography-textStyle-heading-6-lineHeight` | `1.25` |
| `--eui-typography-textStyle-label-md-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-label-md-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-label-md-fontSize` | `14px` |
| `--eui-typography-textStyle-label-md-fontSize` | `14px` |
| `--eui-typography-textStyle-label-md-fontWeight` | `600` |
| `--eui-typography-textStyle-label-md-fontWeight` | `600` |
| `--eui-typography-textStyle-label-md-lineHeight` | `1.5` |
| `--eui-typography-textStyle-label-md-lineHeight` | `1.5` |
| `--eui-typography-textStyle-label-sm-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-label-sm-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-label-sm-fontSize` | `12px` |
| `--eui-typography-textStyle-label-sm-fontSize` | `12px` |
| `--eui-typography-textStyle-label-sm-fontWeight` | `600` |
| `--eui-typography-textStyle-label-sm-fontWeight` | `600` |
| `--eui-typography-textStyle-label-sm-lineHeight` | `1.5` |
| `--eui-typography-textStyle-label-sm-lineHeight` | `1.5` |
| `--eui-typography-textStyle-overline-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-overline-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-overline-fontSize` | `12px` |
| `--eui-typography-textStyle-overline-fontSize` | `12px` |
| `--eui-typography-textStyle-overline-fontWeight` | `600` |
| `--eui-typography-textStyle-overline-fontWeight` | `600` |
| `--eui-typography-textStyle-overline-letterSpacing` | `0.05em` |
| `--eui-typography-textStyle-overline-letterSpacing` | `0.05em` |
| `--eui-typography-textStyle-overline-lineHeight` | `1.5` |
| `--eui-typography-textStyle-overline-lineHeight` | `1.5` |
| `--eui-typography-textStyle-overline-textTransform` | `uppercase` |
| `--eui-typography-textStyle-overline-textTransform` | `uppercase` |
| `--eui-typography-textStyle-title-lg-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-title-lg-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-title-lg-fontSize` | `24px` |
| `--eui-typography-textStyle-title-lg-fontSize` | `24px` |
| `--eui-typography-textStyle-title-lg-fontWeight` | `600` |
| `--eui-typography-textStyle-title-lg-fontWeight` | `600` |
| `--eui-typography-textStyle-title-lg-lineHeight` | `1.25` |
| `--eui-typography-textStyle-title-lg-lineHeight` | `1.25` |
| `--eui-typography-textStyle-title-md-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-title-md-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-title-md-fontSize` | `20px` |
| `--eui-typography-textStyle-title-md-fontSize` | `20px` |
| `--eui-typography-textStyle-title-md-fontWeight` | `600` |
| `--eui-typography-textStyle-title-md-fontWeight` | `600` |
| `--eui-typography-textStyle-title-md-lineHeight` | `1.25` |
| `--eui-typography-textStyle-title-md-lineHeight` | `1.25` |
| `--eui-typography-textStyle-title-sm-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-title-sm-fontFamily` | `'Source Sans 3', 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--eui-typography-textStyle-title-sm-fontSize` | `18px` |
| `--eui-typography-textStyle-title-sm-fontSize` | `18px` |
| `--eui-typography-textStyle-title-sm-fontWeight` | `600` |
| `--eui-typography-textStyle-title-sm-fontWeight` | `600` |
| `--eui-typography-textStyle-title-sm-lineHeight` | `1.25` |
| `--eui-typography-textStyle-title-sm-lineHeight` | `1.25` |
| `--eui-typography-textTransform-capitalize` | `capitalize` |
| `--eui-typography-textTransform-capitalize` | `capitalize` |
| `--eui-typography-textTransform-lowercase` | `lowercase` |
| `--eui-typography-textTransform-lowercase` | `lowercase` |
| `--eui-typography-textTransform-none` | `none` |
| `--eui-typography-textTransform-none` | `none` |
| `--eui-typography-textTransform-uppercase` | `uppercase` |
| `--eui-typography-textTransform-uppercase` | `uppercase` |

---

## Badge

| Token | Value |
|-------|-------|
| `--eui-badge-border-style` | `var(--eui-border-style-default)` |
| `--eui-badge-border-width` | `var(--eui-border-width-thin)` |
| `--eui-badge-colors-error-background` | `var(--eui-color-status-error-background)` |
| `--eui-badge-colors-error-border` | `var(--eui-color-status-error-border)` |
| `--eui-badge-colors-error-solid-background` | `var(--eui-color-status-error-solid)` |
| `--eui-badge-colors-error-solid-border` | `var(--eui-color-status-error-solid)` |
| `--eui-badge-colors-error-solid-text` | `var(--eui-color-text-inverse)` |
| `--eui-badge-colors-error-text` | `var(--eui-color-status-error-text)` |
| `--eui-badge-colors-info-background` | `var(--eui-color-status-info-background)` |
| `--eui-badge-colors-info-border` | `var(--eui-color-status-info-border)` |
| `--eui-badge-colors-info-solid-background` | `var(--eui-color-status-info-solid)` |
| `--eui-badge-colors-info-solid-border` | `var(--eui-color-status-info-solid)` |
| `--eui-badge-colors-info-solid-text` | `var(--eui-color-text-inverse)` |
| `--eui-badge-colors-info-text` | `var(--eui-color-status-info-text)` |
| `--eui-badge-colors-neutral-background` | `var(--eui-color-status-neutral-background)` |
| `--eui-badge-colors-neutral-border` | `var(--eui-color-status-neutral-border)` |
| `--eui-badge-colors-neutral-solid-background` | `var(--eui-color-status-neutral-solid)` |
| `--eui-badge-colors-neutral-solid-border` | `var(--eui-color-status-neutral-solid)` |
| `--eui-badge-colors-neutral-solid-text` | `var(--eui-color-text-inverse)` |
| `--eui-badge-colors-neutral-text` | `var(--eui-color-status-neutral-text)` |
| `--eui-badge-colors-success-background` | `var(--eui-color-status-success-background)` |
| `--eui-badge-colors-success-border` | `var(--eui-color-status-success-border)` |
| `--eui-badge-colors-success-solid-background` | `var(--eui-color-status-success-solid)` |
| `--eui-badge-colors-success-solid-border` | `var(--eui-color-status-success-solid)` |
| `--eui-badge-colors-success-solid-text` | `var(--eui-color-text-inverse)` |
| `--eui-badge-colors-success-text` | `var(--eui-color-status-success-text)` |
| `--eui-badge-colors-variant-outline-background` | `var(--eui-color-background-transparent)` |
| `--eui-badge-colors-warning-background` | `var(--eui-color-status-warning-background)` |
| `--eui-badge-colors-warning-border` | `var(--eui-color-status-warning-border)` |
| `--eui-badge-colors-warning-solid-background` | `var(--eui-color-status-warning-solid)` |
| `--eui-badge-colors-warning-solid-border` | `var(--eui-color-status-warning-solid)` |
| `--eui-badge-colors-warning-solid-text` | `var(--eui-color-text-inverse)` |
| `--eui-badge-colors-warning-text` | `var(--eui-color-status-warning-text)` |
| `--eui-badge-focus-color` | `var(--eui-color-focus-ring)` |
| `--eui-badge-focus-ring-color` | `var(--eui-color-focus-ring)` |
| `--eui-badge-focus-ring-offset` | `var(--eui-focus-ring-offset-default)` |
| `--eui-badge-focus-ring-width` | `var(--eui-focus-ring-width)` |
| `--eui-badge-shape-radius` | `var(--eui-radius-default)` |
| `--eui-badge-size-default-fontSize` | `var(--eui-typography-fontSize-xs)` |
| `--eui-badge-size-default-gap` | `var(--eui-spacing-xs)` |
| `--eui-badge-size-default-height` | `var(--eui-dimension-6)` |
| `--eui-badge-size-default-lineHeight` | `var(--eui-typography-lineHeight-tight)` |
| `--eui-badge-size-default-padding-block` | `var(--eui-spacing-2xs)` |
| `--eui-badge-size-default-padding-inline` | `var(--eui-spacing-sm)` |
| `--eui-badge-size-small-fontSize` | `var(--eui-typography-fontSize-xs)` |
| `--eui-badge-size-small-gap` | `var(--eui-spacing-2xs)` |
| `--eui-badge-size-small-height` | `var(--eui-dimension-5)` |
| `--eui-badge-size-small-lineHeight` | `var(--eui-typography-lineHeight-tight)` |
| `--eui-badge-size-small-padding-block` | `var(--eui-dimension-0)` |
| `--eui-badge-size-small-padding-inline` | `var(--eui-spacing-xs)` |
| `--eui-badge-typography-fontFamily` | `var(--eui-typography-fontFamily-ui)` |
| `--eui-badge-typography-fontWeight` | `var(--eui-typography-fontWeight-medium)` |
| `--eui-badge-typography-letterSpacing` | `var(--eui-typography-letterSpacing-wide)` |
| `--eui-badge-typography-textTransform` | `var(--eui-typography-textTransform-uppercase)` |

## Breakpoint

| Token | Value |
|-------|-------|
| `--eui-breakpoint-desktop` | `1280px` |
| `--eui-breakpoint-narrow` | `1024px` |
| `--eui-breakpoint-wide` | `1600px` |

## Card

| Token | Value |
|-------|-------|
| `--eui-card-background-color` | `var(--eui-color-background-surface)` |
| `--eui-card-background-color` | `var(--eui-color-background-surface)` |
| `--eui-card-background-color` | `var(--eui-color-background-surface)` |
| `--eui-card-background-color` | `var(--eui-color-background-muted)` |
| `--eui-card-background-color` | `var(--eui-color-background-surface)` |
| `--eui-card-border-color` | `var(--eui-color-border-default)` |
| `--eui-card-border-color` | `var(--eui-color-border-default)` |
| `--eui-card-border-style` | `var(--eui-border-style-default)` |
| `--eui-card-border-style` | `var(--eui-border-style-default)` |
| `--eui-card-border-style` | `var(--eui-border-style-default)` |
| `--eui-card-border-style` | `var(--eui-border-style-default)` |
| `--eui-card-border-style` | `var(--eui-border-style-default)` |
| `--eui-card-border-width` | `var(--eui-border-width-thin)` |
| `--eui-card-border-width` | `var(--eui-border-width-thin)` |
| `--eui-card-border-width` | `var(--eui-border-width-thin)` |
| `--eui-card-border-width` | `var(--eui-border-width-thin)` |
| `--eui-card-border-width` | `var(--eui-border-width-thin)` |
| `--eui-card-padding` | `var(--eui-spacing-md)` |
| `--eui-card-radius` | `var(--eui-radius-large)` |
| `--eui-card-radius` | `var(--eui-radius-large)` |
| `--eui-card-radius` | `var(--eui-radius-large)` |
| `--eui-card-radius` | `var(--eui-radius-large)` |
| `--eui-card-radius` | `var(--eui-radius-large)` |
| `--eui-card-shadow` | `var(--eui-shadow-default)` |
| `--eui-card-shadow` | `var(--eui-shadow-default)` |
| `--eui-card-shadow` | `var(--eui-shadow-none)` |
| `--eui-card-shadow` | `var(--eui-shadow-none)` |
| `--eui-card-shadow` | `var(--eui-shadow-large)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-pending)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-onTrack)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-completed)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-minorDisruption)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-majorDisruption)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-upcoming)` |
| `--eui-card-status-indicator-color` | `var(--eui-color-status-application-discontinued)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |
| `--eui-card-status-indicator-width` | `var(--eui-layout-card-statusIndicator-width)` |

## Dimension

| Token | Value |
|-------|-------|
| `--eui-dimension-0` | `0rem` |
| `--eui-dimension-0-5` | `0.1429rem` |
| `--eui-dimension-1` | `0.2857rem` |
| `--eui-dimension-10` | `2.8571rem` |
| `--eui-dimension-11` | `3.1429rem` |
| `--eui-dimension-12` | `3.4286rem` |
| `--eui-dimension-13` | `3.7143rem` |
| `--eui-dimension-14` | `4rem` |
| `--eui-dimension-15` | `4.2857rem` |
| `--eui-dimension-16` | `4.5714rem` |
| `--eui-dimension-17` | `4.8571rem` |
| `--eui-dimension-18` | `5.1429rem` |
| `--eui-dimension-19` | `5.4286rem` |
| `--eui-dimension-2` | `0.5714rem` |
| `--eui-dimension-20` | `5.7143rem` |
| `--eui-dimension-3` | `0.8571rem` |
| `--eui-dimension-4` | `1.1429rem` |
| `--eui-dimension-5` | `1.4286rem` |
| `--eui-dimension-6` | `1.7143rem` |
| `--eui-dimension-7` | `2rem` |
| `--eui-dimension-8` | `2.2857rem` |
| `--eui-dimension-9` | `2.5714rem` |

## Filter

| Token | Value |
|-------|-------|
| `--eui-filter-muted-brightness` | `0.95` |
| `--eui-filter-muted-brightness` | `0.95` |
| `--eui-filter-muted-contrast` | `0.9` |
| `--eui-filter-muted-contrast` | `0.9` |
| `--eui-filter-muted-grayscale` | `1` |
| `--eui-filter-muted-grayscale` | `1` |
| `--eui-filter-muted-saturate` | `0.35` |
| `--eui-filter-muted-saturate` | `0.35` |

## Focus

| Token | Value |
|-------|-------|
| `--eui-focus-ring-offset-default` | `0.1429rem` |
| `--eui-focus-ring-width` | `2px` |

## Layer

| Token | Value |
|-------|-------|
| `--eui-layer-base` | `var(--eui-z-base)` |
| `--eui-layer-dialog` | `1070` |
| `--eui-layer-dropdown` | `1000` |
| `--eui-layer-hide` | `-1` |
| `--eui-layer-modal` | `1060` |
| `--eui-layer-overlay` | `1050` |
| `--eui-layer-sticky` | `100` |

## Layout

| Token | Value |
|-------|-------|
| `--eui-layout-breakpoint-desktop` | `1280px` |
| `--eui-layout-breakpoint-narrow` | `1024px` |
| `--eui-layout-breakpoint-wide` | `1600px` |
| `--eui-layout-card-statusIndicator-width` | `var(--eui-spacing-xs)` |
| `--eui-layout-container-gutterX` | `var(--eui-spacing-lg)` |
| `--eui-layout-container-standard-maxWidth` | `960px` |
| `--eui-layout-container-standard-maxWidth` | `960px` |
| `--eui-layout-container-wide-maxWidth` | `100%` |
| `--eui-layout-container-wide-maxWidth` | `100%` |
| `--eui-layout-page-padding-x` | `var(--eui-layout-container-gutterX)` |
| `--eui-layout-page-padding-y` | `var(--eui-spacing-lg)` |
| `--eui-layout-section-gap` | `var(--eui-spacing-md)` |
| `--eui-layout-section-padding` | `var(--eui-spacing-md)` |
| `--eui-layout-section-title-gap` | `var(--eui-spacing-sm)` |
| `--eui-layout-toolbar-gap` | `var(--eui-spacing-sm)` |
| `--eui-layout-toolbar-height` | `3.1429rem` |
| `--eui-layout-toolbar-paddingY` | `var(--eui-spacing-md)` |

## Opacity

| Token | Value |
|-------|-------|
| `--eui-opacity-disabled` | `0.5` |
| `--eui-opacity-muted` | `0.6` |
| `--eui-opacity-muted` | `0.6` |
| `--eui-opacity-subtle` | `0.8` |

## Transition

| Token | Value |
|-------|-------|
| `--eui-transition-duration-base` | `200ms` |
| `--eui-transition-duration-base` | `200ms` |
| `--eui-transition-duration-fast` | `100ms` |
| `--eui-transition-duration-fast` | `100ms` |
| `--eui-transition-duration-instant` | `0ms` |
| `--eui-transition-duration-instant` | `0ms` |
| `--eui-transition-duration-slow` | `300ms` |
| `--eui-transition-duration-slow` | `300ms` |
| `--eui-transition-duration-slower` | `500ms` |
| `--eui-transition-duration-slower` | `500ms` |
| `--eui-transition-easing-in` | `ease-in` |
| `--eui-transition-easing-in` | `ease-in` |
| `--eui-transition-easing-inOut` | `ease-in-out` |
| `--eui-transition-easing-inOut` | `ease-in-out` |
| `--eui-transition-easing-linear` | `linear` |
| `--eui-transition-easing-linear` | `linear` |
| `--eui-transition-easing-out` | `ease-out` |
| `--eui-transition-easing-out` | `ease-out` |

## Z

| Token | Value |
|-------|-------|
| `--eui-z-base` | `0` |
| `--eui-z-dialog` | `1070` |
| `--eui-z-dropdown` | `1000` |
| `--eui-z-hide` | `-1` |
| `--eui-z-modal` | `1060` |
| `--eui-z-overlay` | `1050` |
| `--eui-z-sticky` | `100` |

---

## Related Documentation

- [Token Usage Rules](../architecture/token-usage-rules.md) - Rules for using tokens in components
- [Token System Architecture](../adr/ADR-0017-layered-token-architecture-contexts-and-themes.md) - Architecture overview
- [Token-First Contract Layer](../adr/ADR-0015-token-first-contract-layer-and-renderer-agnostic-model.md) - Contract layer design

---

*This file is auto-generated. Do not edit manually. Run `npm run tokens:generate-docs` to regenerate.*

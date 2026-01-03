// AUTO-GENERATED - Do not edit manually
// Generated from: generated/css/tokens.css
// Run: npm run tokens:generate-types
// Last updated: 2026-01-03T17:15:34.582Z

/**
 * All available CSS custom property names (without -- prefix)
 * Use with: var(--${TokenName})
 * 
 * @example
 * ```css
 * color: var(--eui-button-primary-label-base);
 * ```
 * 
 * @example
 * ```typescript
 * import { tokenVar } from '@/generated/tsx/tokens.types';
 * const color = tokenVar('eui-button-primary-label-base');
 * ```
 */
export type TokenName = 
  | 'eui-alert-banner-border-style'
  | 'eui-alert-banner-border-width'
  | 'eui-alert-banner-colors-background-error'
  | 'eui-alert-banner-colors-background-info'
  | 'eui-alert-banner-colors-background-success'
  | 'eui-alert-banner-colors-background-warning'
  | 'eui-alert-banner-colors-border-error'
  | 'eui-alert-banner-colors-border-info'
  | 'eui-alert-banner-colors-border-success'
  | 'eui-alert-banner-colors-border-warning'
  | 'eui-alert-banner-colors-icon-error'
  | 'eui-alert-banner-colors-icon-info'
  | 'eui-alert-banner-colors-icon-success'
  | 'eui-alert-banner-colors-icon-warning'
  | 'eui-alert-banner-colors-text-error'
  | 'eui-alert-banner-colors-text-info'
  | 'eui-alert-banner-colors-text-success'
  | 'eui-alert-banner-colors-text-warning'
  | 'eui-alert-banner-spacing-gap-actions'
  | 'eui-alert-banner-spacing-gap-content'
  | 'eui-alert-banner-spacing-height-min'
  | 'eui-alert-banner-spacing-padding'
  | 'eui-alert-banner-z-index'
  | 'eui-app-shell-layout-grid-template-areas'
  | 'eui-avatar-background-fallback'
  | 'eui-avatar-border-color'
  | 'eui-avatar-border-color-lead'
  | 'eui-avatar-border-style'
  | 'eui-avatar-border-width'
  | 'eui-avatar-group-layout-hover-duration'
  | 'eui-avatar-group-layout-hover-easing'
  | 'eui-avatar-group-layout-hover-scale'
  | 'eui-avatar-group-layout-hover-spread'
  | 'eui-avatar-group-layout-max-visible'
  | 'eui-avatar-group-layout-overlap'
  | 'eui-avatar-group-layout-overlap-lead'
  | 'eui-avatar-group-layout-overlap-tight'
  | 'eui-avatar-shape-circle-radius'
  | 'eui-avatar-size-lg-diameter'
  | 'eui-avatar-size-md-diameter'
  | 'eui-avatar-size-sm-diameter'
  | 'eui-avatar-text-fallback'
  | 'eui-avatar-typography-font-family'
  | 'eui-avatar-typography-font-size-lg'
  | 'eui-avatar-typography-font-size-md'
  | 'eui-avatar-typography-font-size-sm'
  | 'eui-avatar-typography-font-weight'
  | 'eui-avatar-typography-line-height'
  | 'eui-avatar-typography-text-transform'
  | 'eui-breakpoint-desktop'
  | 'eui-breakpoint-narrow'
  | 'eui-breakpoint-wide'
  | 'eui-button-accent-background-active'
  | 'eui-button-accent-background-base'
  | 'eui-button-accent-background-disabled'
  | 'eui-button-accent-background-hover'
  | 'eui-button-accent-background-selected'
  | 'eui-button-accent-finished-background-active'
  | 'eui-button-accent-finished-background-base'
  | 'eui-button-accent-finished-background-disabled'
  | 'eui-button-accent-finished-background-hover'
  | 'eui-button-accent-finished-background-selected'
  | 'eui-button-accent-finished-label-active'
  | 'eui-button-accent-finished-label-base'
  | 'eui-button-accent-finished-label-disabled'
  | 'eui-button-accent-finished-label-hover'
  | 'eui-button-accent-finished-label-selected'
  | 'eui-button-accent-label-active'
  | 'eui-button-accent-label-base'
  | 'eui-button-accent-label-disabled'
  | 'eui-button-accent-label-hover'
  | 'eui-button-accent-label-selected'
  | 'eui-button-border-style'
  | 'eui-button-border-width'
  | 'eui-button-focus-ring-color-derived-accessible'
  | 'eui-button-focus-ring-color-derived-base'
  | 'eui-button-focus-ring-offset-base'
  | 'eui-button-focus-ring-width-accessible'
  | 'eui-button-focus-ring-width-base'
  | 'eui-button-group-orientation-horizontal'
  | 'eui-button-group-orientation-vertical'
  | 'eui-button-group-position-first-shape-orientation-horizontal-corner-bottom-left'
  | 'eui-button-group-position-first-shape-orientation-horizontal-corner-bottom-right'
  | 'eui-button-group-position-first-shape-orientation-horizontal-corner-top-left'
  | 'eui-button-group-position-first-shape-orientation-horizontal-corner-top-right'
  | 'eui-button-group-position-first-shape-orientation-vertical-corner-bottom-left'
  | 'eui-button-group-position-first-shape-orientation-vertical-corner-bottom-right'
  | 'eui-button-group-position-first-shape-orientation-vertical-corner-top-left'
  | 'eui-button-group-position-first-shape-orientation-vertical-corner-top-right'
  | 'eui-button-group-position-last-shape-orientation-horizontal-corner-bottom-left'
  | 'eui-button-group-position-last-shape-orientation-horizontal-corner-bottom-right'
  | 'eui-button-group-position-last-shape-orientation-horizontal-corner-top-left'
  | 'eui-button-group-position-last-shape-orientation-horizontal-corner-top-right'
  | 'eui-button-group-position-last-shape-orientation-vertical-corner-bottom-left'
  | 'eui-button-group-position-last-shape-orientation-vertical-corner-bottom-right'
  | 'eui-button-group-position-last-shape-orientation-vertical-corner-top-left'
  | 'eui-button-group-position-last-shape-orientation-vertical-corner-top-right'
  | 'eui-button-group-position-middle-shape-orientation-horizontal-corner-bottom-left'
  | 'eui-button-group-position-middle-shape-orientation-horizontal-corner-bottom-right'
  | 'eui-button-group-position-middle-shape-orientation-horizontal-corner-top-left'
  | 'eui-button-group-position-middle-shape-orientation-horizontal-corner-top-right'
  | 'eui-button-group-position-middle-shape-orientation-vertical-corner-bottom-left'
  | 'eui-button-group-position-middle-shape-orientation-vertical-corner-bottom-right'
  | 'eui-button-group-position-middle-shape-orientation-vertical-corner-top-left'
  | 'eui-button-group-position-middle-shape-orientation-vertical-corner-top-right'
  | 'eui-button-group-position-single-shape-corner-bottom-left'
  | 'eui-button-group-position-single-shape-corner-bottom-right'
  | 'eui-button-group-position-single-shape-corner-top-left'
  | 'eui-button-group-position-single-shape-corner-top-right'
  | 'eui-button-layout-default-flex-basis'
  | 'eui-button-layout-default-flex-grow'
  | 'eui-button-layout-default-flex-shrink'
  | 'eui-button-layout-default-white-space'
  | 'eui-button-layout-stack-internal-border-horizontal'
  | 'eui-button-layout-stack-internal-border-vertical'
  | 'eui-button-layout-stack-perimeter-border'
  | 'eui-button-layout-stack-separator-inset'
  | 'eui-button-layout-stack-separator-thickness'
  | 'eui-button-primary-background-active'
  | 'eui-button-primary-background-base'
  | 'eui-button-primary-background-disabled'
  | 'eui-button-primary-background-hover'
  | 'eui-button-primary-background-selected'
  | 'eui-button-primary-label-active'
  | 'eui-button-primary-label-base'
  | 'eui-button-primary-label-disabled'
  | 'eui-button-primary-label-hover'
  | 'eui-button-primary-label-selected'
  | 'eui-button-secondary-background-active'
  | 'eui-button-secondary-background-base'
  | 'eui-button-secondary-background-disabled'
  | 'eui-button-secondary-background-hover'
  | 'eui-button-secondary-background-selected'
  | 'eui-button-secondary-border-active'
  | 'eui-button-secondary-border-base'
  | 'eui-button-secondary-border-disabled'
  | 'eui-button-secondary-border-hover'
  | 'eui-button-secondary-border-selected'
  | 'eui-button-secondary-label-active'
  | 'eui-button-secondary-label-base'
  | 'eui-button-secondary-label-disabled'
  | 'eui-button-secondary-label-hover'
  | 'eui-button-secondary-label-selected'
  | 'eui-button-separator-inset'
  | 'eui-button-separator-thickness'
  | 'eui-button-shape-circle-radius'
  | 'eui-button-shape-default-radius'
  | 'eui-button-shape-round-radius'
  | 'eui-button-size-lg-font-size'
  | 'eui-button-size-lg-font-weight'
  | 'eui-button-size-lg-gap'
  | 'eui-button-size-lg-height'
  | 'eui-button-size-lg-padding-inline'
  | 'eui-button-size-md-font-size'
  | 'eui-button-size-md-font-weight'
  | 'eui-button-size-md-gap'
  | 'eui-button-size-md-height'
  | 'eui-button-size-md-padding-inline'
  | 'eui-button-size-sm-font-size'
  | 'eui-button-size-sm-font-weight'
  | 'eui-button-size-sm-gap'
  | 'eui-button-size-sm-height'
  | 'eui-button-size-sm-padding-inline'
  | 'eui-button-states-active'
  | 'eui-button-states-disabled'
  | 'eui-button-states-hover'
  | 'eui-button-states-selected'
  | 'eui-calendar-border-radius-calendar'
  | 'eui-calendar-border-radius-day'
  | 'eui-calendar-border-width'
  | 'eui-calendar-colors-background'
  | 'eui-calendar-colors-day-background-active'
  | 'eui-calendar-colors-day-background-default'
  | 'eui-calendar-colors-day-background-disabled'
  | 'eui-calendar-colors-day-background-hover'
  | 'eui-calendar-colors-day-background-outside-month'
  | 'eui-calendar-colors-day-background-selected'
  | 'eui-calendar-colors-day-background-selected-hover'
  | 'eui-calendar-colors-day-background-today'
  | 'eui-calendar-colors-day-border-default'
  | 'eui-calendar-colors-day-border-selected'
  | 'eui-calendar-colors-day-text-default'
  | 'eui-calendar-colors-day-text-disabled'
  | 'eui-calendar-colors-day-text-outside-month'
  | 'eui-calendar-colors-day-text-selected'
  | 'eui-calendar-colors-day-text-today'
  | 'eui-calendar-colors-header-background'
  | 'eui-calendar-colors-header-button-active-background'
  | 'eui-calendar-colors-header-button-hover-background'
  | 'eui-calendar-colors-header-button-text'
  | 'eui-calendar-colors-header-text'
  | 'eui-calendar-colors-range-background'
  | 'eui-calendar-colors-range-background-hover'
  | 'eui-calendar-colors-range-text'
  | 'eui-calendar-colors-weekday-text'
  | 'eui-calendar-size-day-aspect-ratio'
  | 'eui-calendar-size-day-min-height'
  | 'eui-calendar-size-day-width'
  | 'eui-calendar-size-header-height'
  | 'eui-calendar-size-min-width'
  | 'eui-calendar-size-weekday-height'
  | 'eui-calendar-size-weekday-width'
  | 'eui-calendar-size-width'
  | 'eui-calendar-spacing-day-margin-overlap'
  | 'eui-calendar-spacing-day-padding-horizontal'
  | 'eui-calendar-spacing-day-padding-vertical'
  | 'eui-calendar-spacing-grid-gap'
  | 'eui-calendar-spacing-header-gap'
  | 'eui-calendar-spacing-header-padding-horizontal'
  | 'eui-calendar-spacing-header-padding-vertical'
  | 'eui-calendar-spacing-padding'
  | 'eui-calendar-spacing-weekday-gap'
  | 'eui-calendar-spacing-weekday-padding-vertical'
  | 'eui-calendar-typography-day-font-size'
  | 'eui-calendar-typography-day-font-weight'
  | 'eui-calendar-typography-day-line-height'
  | 'eui-calendar-typography-header-font-size'
  | 'eui-calendar-typography-header-font-weight'
  | 'eui-calendar-typography-weekday-font-size'
  | 'eui-calendar-typography-weekday-font-weight'
  | 'eui-calendar-z-index-default'
  | 'eui-calendar-z-index-focus'
  | 'eui-calendar-z-index-interactive'
  | 'eui-calendar-z-index-selected'
  | 'eui-card-status-completed-indicator'
  | 'eui-card-status-completed-indicator-width'
  | 'eui-card-status-discontinued-indicator'
  | 'eui-card-status-discontinued-indicator-width'
  | 'eui-card-status-major-disruption-indicator'
  | 'eui-card-status-major-disruption-indicator-width'
  | 'eui-card-status-minor-disruption-indicator'
  | 'eui-card-status-minor-disruption-indicator-width'
  | 'eui-card-status-on-track-indicator'
  | 'eui-card-status-on-track-indicator-width'
  | 'eui-card-status-pending-indicator'
  | 'eui-card-status-pending-indicator-width'
  | 'eui-card-status-upcoming-indicator'
  | 'eui-card-status-upcoming-indicator-width'
  | 'eui-card-variant-elevated-background'
  | 'eui-card-variant-elevated-border-color'
  | 'eui-card-variant-elevated-border-style'
  | 'eui-card-variant-elevated-border-width'
  | 'eui-card-variant-elevated-radius'
  | 'eui-card-variant-elevated-shadow'
  | 'eui-card-variant-flat-background'
  | 'eui-card-variant-flat-border-color'
  | 'eui-card-variant-flat-border-style'
  | 'eui-card-variant-flat-border-width'
  | 'eui-card-variant-flat-radius'
  | 'eui-card-variant-flat-shadow'
  | 'eui-card-variant-strong-background'
  | 'eui-card-variant-strong-border-color'
  | 'eui-card-variant-strong-border-style'
  | 'eui-card-variant-strong-border-width'
  | 'eui-card-variant-strong-radius'
  | 'eui-card-variant-strong-shadow'
  | 'eui-celebration-animation-delay-long'
  | 'eui-celebration-animation-delay-medium'
  | 'eui-celebration-animation-delay-short'
  | 'eui-celebration-animation-duration'
  | 'eui-celebration-animation-easing'
  | 'eui-celebration-animation-lift-max-scale'
  | 'eui-celebration-animation-lift-max-translate-y'
  | 'eui-celebration-animation-lift-shadow-base'
  | 'eui-celebration-animation-lift-shadow-peak'
  | 'eui-celebration-animation-shine-duration'
  | 'eui-celebration-animation-shine-easing'
  | 'eui-celebration-animation-shine-width'
  | 'eui-celebration-animation-sparkle-duration'
  | 'eui-celebration-animation-sparkle-easing'
  | 'eui-celebration-animation-sparkle-particle-size'
  | 'eui-celebration-colors-shine-end'
  | 'eui-celebration-colors-shine-mid'
  | 'eui-celebration-colors-shine-start'
  | 'eui-celebration-colors-sparkle-base'
  | 'eui-celebration-colors-sparkle-bright'
  | 'eui-celebration-colors-sparkle-dim'
  | 'eui-checkbox-background-base'
  | 'eui-checkbox-background-checked'
  | 'eui-checkbox-background-checked-disabled'
  | 'eui-checkbox-background-checked-hover'
  | 'eui-checkbox-background-disabled'
  | 'eui-checkbox-background-hover'
  | 'eui-checkbox-background-indeterminate'
  | 'eui-checkbox-background-indeterminate-disabled'
  | 'eui-checkbox-background-indeterminate-hover'
  | 'eui-checkbox-border-base'
  | 'eui-checkbox-border-checked'
  | 'eui-checkbox-border-checked-disabled'
  | 'eui-checkbox-border-checked-hover'
  | 'eui-checkbox-border-disabled'
  | 'eui-checkbox-border-hover'
  | 'eui-checkbox-border-indeterminate'
  | 'eui-checkbox-border-indeterminate-disabled'
  | 'eui-checkbox-border-indeterminate-hover'
  | 'eui-checkbox-border-style'
  | 'eui-checkbox-border-width'
  | 'eui-checkbox-checkmark-base'
  | 'eui-checkbox-checkmark-disabled'
  | 'eui-checkbox-checkmark-indeterminate'
  | 'eui-checkbox-checkmark-indeterminate-disabled'
  | 'eui-checkbox-focus-ring-color-derived-accessible'
  | 'eui-checkbox-focus-ring-color-derived-base'
  | 'eui-checkbox-focus-ring-offset'
  | 'eui-checkbox-focus-ring-width-accessible'
  | 'eui-checkbox-focus-ring-width-base'
  | 'eui-checkbox-layout-gap'
  | 'eui-checkbox-shape-radius'
  | 'eui-checkbox-size-lg-size'
  | 'eui-checkbox-size-md-size'
  | 'eui-checkbox-size-sm-size'
  | 'eui-color-accent-100'
  | 'eui-color-accent-200'
  | 'eui-color-accent-300'
  | 'eui-color-accent-400'
  | 'eui-color-accent-50'
  | 'eui-color-accent-500'
  | 'eui-color-accent-600'
  | 'eui-color-accent-700'
  | 'eui-color-accent-800'
  | 'eui-color-accent-900'
  | 'eui-color-accent-primary'
  | 'eui-color-background-base'
  | 'eui-color-background-inverse'
  | 'eui-color-background-muted'
  | 'eui-color-background-subtle'
  | 'eui-color-background-surface'
  | 'eui-color-border-default'
  | 'eui-color-border-inverse'
  | 'eui-color-border-strong'
  | 'eui-color-border-subtle'
  | 'eui-color-brand-100'
  | 'eui-color-brand-200'
  | 'eui-color-brand-300'
  | 'eui-color-brand-400'
  | 'eui-color-brand-50'
  | 'eui-color-brand-500'
  | 'eui-color-brand-600'
  | 'eui-color-brand-700'
  | 'eui-color-brand-800'
  | 'eui-color-brand-900'
  | 'eui-color-brand-primary'
  | 'eui-color-focus-ring'
  | 'eui-color-neutral-100'
  | 'eui-color-neutral-200'
  | 'eui-color-neutral-300'
  | 'eui-color-neutral-400'
  | 'eui-color-neutral-50'
  | 'eui-color-neutral-500'
  | 'eui-color-neutral-600'
  | 'eui-color-neutral-700'
  | 'eui-color-neutral-800'
  | 'eui-color-neutral-900'
  | 'eui-color-neutral-white'
  | 'eui-color-signal-keyboard-focus'
  | 'eui-color-status-application-completed'
  | 'eui-color-status-application-discontinued'
  | 'eui-color-status-application-major-disruption'
  | 'eui-color-status-application-minor-disruption'
  | 'eui-color-status-application-on-track'
  | 'eui-color-status-application-pending'
  | 'eui-color-status-application-upcoming'
  | 'eui-color-status-error-100'
  | 'eui-color-status-error-50'
  | 'eui-color-status-error-500'
  | 'eui-color-status-error-600'
  | 'eui-color-status-error-700'
  | 'eui-color-status-info-100'
  | 'eui-color-status-info-50'
  | 'eui-color-status-info-500'
  | 'eui-color-status-info-600'
  | 'eui-color-status-info-700'
  | 'eui-color-status-success-100'
  | 'eui-color-status-success-50'
  | 'eui-color-status-success-500'
  | 'eui-color-status-success-600'
  | 'eui-color-status-success-700'
  | 'eui-color-status-warning-100'
  | 'eui-color-status-warning-50'
  | 'eui-color-status-warning-500'
  | 'eui-color-status-warning-600'
  | 'eui-color-status-warning-700'
  | 'eui-color-system-focus'
  | 'eui-color-text-disabled'
  | 'eui-color-text-inverse'
  | 'eui-color-text-muted'
  | 'eui-color-text-primary'
  | 'eui-color-text-subtle'
  | 'eui-content-colors-background'
  | 'eui-content-colors-text'
  | 'eui-content-spacing-padding'
  | 'eui-counter-colors-filter-background'
  | 'eui-counter-colors-filter-border'
  | 'eui-counter-colors-filter-color'
  | 'eui-counter-colors-filter-icon-color'
  | 'eui-counter-colors-pill-default-background'
  | 'eui-counter-colors-pill-default-border'
  | 'eui-counter-colors-pill-default-color'
  | 'eui-counter-colors-pill-disabled-background'
  | 'eui-counter-colors-pill-disabled-border'
  | 'eui-counter-colors-pill-disabled-color'
  | 'eui-counter-colors-pill-inverse-background'
  | 'eui-counter-colors-pill-inverse-border'
  | 'eui-counter-colors-pill-inverse-color'
  | 'eui-counter-colors-text-default-color'
  | 'eui-counter-colors-text-disabled-color'
  | 'eui-counter-colors-text-inverse-color'
  | 'eui-counter-shape-filter-radius'
  | 'eui-counter-shape-pill-radius'
  | 'eui-counter-shape-text-radius'
  | 'eui-counter-size-lg-height'
  | 'eui-counter-size-lg-padding-inline'
  | 'eui-counter-size-lg-padding-vertical'
  | 'eui-counter-size-md-height'
  | 'eui-counter-size-md-padding-inline'
  | 'eui-counter-size-md-padding-vertical'
  | 'eui-counter-size-sm-height'
  | 'eui-counter-size-sm-padding-inline'
  | 'eui-counter-size-sm-padding-vertical'
  | 'eui-counter-spacing-icon-gap'
  | 'eui-counter-spacing-icon-size-lg'
  | 'eui-counter-spacing-icon-size-md'
  | 'eui-counter-spacing-icon-size-sm'
  | 'eui-counter-typography-font-family'
  | 'eui-counter-typography-font-size-filter'
  | 'eui-counter-typography-font-size-pill'
  | 'eui-counter-typography-font-size-text'
  | 'eui-counter-typography-font-weight'
  | 'eui-counter-typography-line-height'
  | 'eui-detail-panel-colors-background'
  | 'eui-detail-panel-colors-border'
  | 'eui-detail-panel-colors-text'
  | 'eui-detail-panel-shadow-left'
  | 'eui-detail-panel-size-width'
  | 'eui-detail-panel-spacing-padding'
  | 'eui-divider-colors-default'
  | 'eui-divider-size-thickness'
  | 'eui-divider-spacing-margin-horizontal'
  | 'eui-divider-spacing-margin-vertical'
  | 'eui-focus-ring-width-accessible'
  | 'eui-focus-ring-width-base'
  | 'eui-form-animation-duration'
  | 'eui-form-animation-easing'
  | 'eui-form-spacing-field-gap-external'
  | 'eui-form-spacing-field-gap-internal'
  | 'eui-form-spacing-group-gap'
  | 'eui-form-spacing-row-gap'
  | 'eui-form-spacing-section-gap-external'
  | 'eui-form-spacing-section-gap-internal'
  | 'eui-form-spacing-section-gap-title'
  | 'eui-form-spacing-section-header-padding'
  | 'eui-header-colors-background'
  | 'eui-header-colors-border'
  | 'eui-header-colors-text'
  | 'eui-header-size-height'
  | 'eui-header-spacing-gap'
  | 'eui-header-spacing-padding-horizontal'
  | 'eui-header-spacing-padding-vertical'
  | 'eui-hero-section-colors-background-base'
  | 'eui-hero-section-colors-background-overlay-dark'
  | 'eui-hero-section-colors-background-overlay-light'
  | 'eui-hero-section-colors-text-heading'
  | 'eui-hero-section-colors-text-subheading'
  | 'eui-hero-section-size-content-max-width'
  | 'eui-hero-section-size-heading-max-width'
  | 'eui-hero-section-size-min-height-desktop'
  | 'eui-hero-section-size-min-height-mobile'
  | 'eui-hero-section-size-min-height-tablet'
  | 'eui-hero-section-size-min-height-wide'
  | 'eui-hero-section-size-subheading-max-width'
  | 'eui-hero-section-spacing-gap-content'
  | 'eui-hero-section-spacing-gap-cta'
  | 'eui-hero-section-spacing-gap-media'
  | 'eui-hero-section-spacing-padding-desktop-block'
  | 'eui-hero-section-spacing-padding-desktop-inline'
  | 'eui-hero-section-spacing-padding-mobile-block'
  | 'eui-hero-section-spacing-padding-mobile-inline'
  | 'eui-hero-section-spacing-padding-tablet-block'
  | 'eui-hero-section-spacing-padding-tablet-inline'
  | 'eui-hero-section-typography-heading-desktop-font-size'
  | 'eui-hero-section-typography-heading-desktop-font-weight'
  | 'eui-hero-section-typography-heading-desktop-line-height'
  | 'eui-hero-section-typography-heading-mobile-font-size'
  | 'eui-hero-section-typography-heading-mobile-font-weight'
  | 'eui-hero-section-typography-heading-mobile-line-height'
  | 'eui-hero-section-typography-subheading-desktop-font-size'
  | 'eui-hero-section-typography-subheading-desktop-line-height'
  | 'eui-hero-section-typography-subheading-mobile-font-size'
  | 'eui-hero-section-typography-subheading-mobile-line-height'
  | 'eui-input-background-base'
  | 'eui-input-background-disabled'
  | 'eui-input-background-focus'
  | 'eui-input-background-hover'
  | 'eui-input-border-base'
  | 'eui-input-border-disabled'
  | 'eui-input-border-error'
  | 'eui-input-border-focus'
  | 'eui-input-border-hover'
  | 'eui-input-border-style'
  | 'eui-input-border-width'
  | 'eui-input-focus-ring-color-derived-accessible'
  | 'eui-input-focus-ring-color-derived-base'
  | 'eui-input-focus-ring-offset'
  | 'eui-input-focus-ring-width-accessible'
  | 'eui-input-focus-ring-width-base'
  | 'eui-input-group-colors-prefix-text'
  | 'eui-input-group-colors-suffix-text'
  | 'eui-input-group-size-prefix-height-lg'
  | 'eui-input-group-size-prefix-height-md'
  | 'eui-input-group-size-prefix-height-sm'
  | 'eui-input-group-size-prefix-width-lg'
  | 'eui-input-group-size-prefix-width-md'
  | 'eui-input-group-size-prefix-width-sm'
  | 'eui-input-group-size-suffix-height-lg'
  | 'eui-input-group-size-suffix-height-md'
  | 'eui-input-group-size-suffix-height-sm'
  | 'eui-input-group-size-suffix-width-lg'
  | 'eui-input-group-size-suffix-width-md'
  | 'eui-input-group-size-suffix-width-sm'
  | 'eui-input-group-spacing-input-padding-left'
  | 'eui-input-group-spacing-input-padding-right'
  | 'eui-input-group-spacing-prefix-padding-left'
  | 'eui-input-group-spacing-prefix-padding-right'
  | 'eui-input-group-spacing-suffix-padding-left'
  | 'eui-input-group-spacing-suffix-padding-right'
  | 'eui-input-shape-radius'
  | 'eui-input-size-lg-font-size'
  | 'eui-input-size-lg-height'
  | 'eui-input-size-lg-padding-inline'
  | 'eui-input-size-md-font-size'
  | 'eui-input-size-md-height'
  | 'eui-input-size-md-padding-inline'
  | 'eui-input-size-sm-font-size'
  | 'eui-input-size-sm-height'
  | 'eui-input-size-sm-padding-inline'
  | 'eui-input-text-base'
  | 'eui-input-text-disabled'
  | 'eui-input-text-placeholder'
  | 'eui-input-typography-font-family'
  | 'eui-input-typography-font-weight'
  | 'eui-input-typography-line-height'
  | 'eui-layout-container-gutter-x'
  | 'eui-layout-container-standard-max-width'
  | 'eui-layout-container-wide-max-width'
  | 'eui-layout-page-padding-x'
  | 'eui-layout-page-padding-y'
  | 'eui-layout-section-gap'
  | 'eui-layout-section-padding'
  | 'eui-layout-section-title-gap'
  | 'eui-layout-toolbar-gap'
  | 'eui-layout-toolbar-height'
  | 'eui-layout-toolbar-padding-y'
  | 'eui-logo-colors-icon-default'
  | 'eui-logo-colors-icon-grayscale'
  | 'eui-logo-colors-icon-inverse'
  | 'eui-logo-colors-icon-monochrome'
  | 'eui-logo-size-icon-lg'
  | 'eui-logo-size-icon-md'
  | 'eui-logo-size-icon-sm'
  | 'eui-logo-size-icon-xl'
  | 'eui-logo-size-icon-xs'
  | 'eui-logo-spacing-gap'
  | 'eui-menu-border-color'
  | 'eui-menu-border-style'
  | 'eui-menu-border-width'
  | 'eui-menu-colors-background'
  | 'eui-menu-colors-border'
  | 'eui-menu-colors-item-background-default'
  | 'eui-menu-colors-item-background-focus'
  | 'eui-menu-colors-item-background-hover'
  | 'eui-menu-colors-item-background-selected'
  | 'eui-menu-colors-item-text'
  | 'eui-menu-colors-item-text-disabled'
  | 'eui-menu-shadow'
  | 'eui-menu-shape-radius'
  | 'eui-menu-size-max-height'
  | 'eui-menu-size-max-width'
  | 'eui-menu-size-min-width'
  | 'eui-menu-spacing-divider-margin'
  | 'eui-menu-spacing-item-gap'
  | 'eui-menu-spacing-item-padding-horizontal'
  | 'eui-menu-spacing-item-padding-vertical'
  | 'eui-menu-spacing-list-padding'
  | 'eui-modal-backdrop-blur'
  | 'eui-modal-backdrop-color'
  | 'eui-modal-colors-body-background'
  | 'eui-modal-colors-body-border'
  | 'eui-modal-colors-body-text'
  | 'eui-modal-colors-close-color'
  | 'eui-modal-colors-close-hover'
  | 'eui-modal-colors-footer-background'
  | 'eui-modal-colors-footer-border'
  | 'eui-modal-colors-footer-text'
  | 'eui-modal-colors-header-background'
  | 'eui-modal-colors-header-border'
  | 'eui-modal-colors-header-text'
  | 'eui-modal-shadow-elevation'
  | 'eui-modal-shape-radius'
  | 'eui-modal-size-full-max-width'
  | 'eui-modal-size-lg-max-width'
  | 'eui-modal-size-md-max-width'
  | 'eui-modal-size-sm-max-width'
  | 'eui-modal-size-xl-max-width'
  | 'eui-modal-spacing-body-padding'
  | 'eui-modal-spacing-footer-padding-horizontal'
  | 'eui-modal-spacing-footer-padding-vertical'
  | 'eui-modal-spacing-gap'
  | 'eui-modal-spacing-header-padding-horizontal'
  | 'eui-modal-spacing-header-padding-vertical'
  | 'eui-radius-default'
  | 'eui-radius-extra-large'
  | 'eui-radius-full'
  | 'eui-radius-large'
  | 'eui-radius-none'
  | 'eui-radius-pill'
  | 'eui-radius-small'
  | 'eui-select-dropdown-background'
  | 'eui-select-dropdown-border-color'
  | 'eui-select-dropdown-border-style'
  | 'eui-select-dropdown-border-width'
  | 'eui-select-dropdown-max-height'
  | 'eui-select-dropdown-padding'
  | 'eui-select-dropdown-radius'
  | 'eui-select-dropdown-shadow'
  | 'eui-select-dropdown-z-index'
  | 'eui-select-icon-color'
  | 'eui-select-icon-disabled'
  | 'eui-select-option-background-default'
  | 'eui-select-option-background-focused'
  | 'eui-select-option-background-hover'
  | 'eui-select-option-background-selected'
  | 'eui-select-option-background-selected-focused'
  | 'eui-select-option-color-default'
  | 'eui-select-option-color-disabled'
  | 'eui-select-option-padding-horizontal'
  | 'eui-select-option-padding-vertical'
  | 'eui-select-primitive-badge-colors-background'
  | 'eui-select-primitive-badge-colors-remove-icon'
  | 'eui-select-primitive-badge-colors-text'
  | 'eui-select-primitive-badge-shape-radius'
  | 'eui-select-primitive-badge-spacing-gap'
  | 'eui-select-primitive-badge-spacing-padding-horizontal'
  | 'eui-select-primitive-badge-spacing-padding-vertical'
  | 'eui-select-primitive-listbox-spacing-gap'
  | 'eui-select-primitive-option-shape-radius'
  | 'eui-select-primitive-option-spacing-padding-horizontal'
  | 'eui-select-primitive-option-spacing-padding-vertical'
  | 'eui-select-primitive-popover-size-max-height'
  | 'eui-select-primitive-popover-size-min-width'
  | 'eui-select-primitive-popover-spacing-padding'
  | 'eui-select-primitive-trigger-spacing-gap'
  | 'eui-select-trigger-background'
  | 'eui-select-trigger-border'
  | 'eui-shadow-default'
  | 'eui-shadow-extra-large'
  | 'eui-shadow-large'
  | 'eui-shadow-none'
  | 'eui-shadow-small'
  | 'eui-side-nav-animation-duration'
  | 'eui-side-nav-animation-easing'
  | 'eui-side-nav-animation-indicator-duration'
  | 'eui-side-nav-animation-indicator-easing'
  | 'eui-side-nav-animation-item-duration'
  | 'eui-side-nav-animation-item-easing'
  | 'eui-side-nav-colors-background'
  | 'eui-side-nav-colors-border'
  | 'eui-side-nav-colors-footer-border'
  | 'eui-side-nav-colors-header-border'
  | 'eui-side-nav-colors-item-background-active'
  | 'eui-side-nav-colors-item-background-default'
  | 'eui-side-nav-colors-item-background-disabled'
  | 'eui-side-nav-colors-item-background-focus'
  | 'eui-side-nav-colors-item-background-hover'
  | 'eui-side-nav-colors-item-background-selected'
  | 'eui-side-nav-colors-item-badge-background'
  | 'eui-side-nav-colors-item-badge-text'
  | 'eui-side-nav-colors-item-indicator-active'
  | 'eui-side-nav-colors-item-indicator-selected'
  | 'eui-side-nav-colors-item-text-active'
  | 'eui-side-nav-colors-item-text-default'
  | 'eui-side-nav-colors-item-text-disabled'
  | 'eui-side-nav-colors-item-text-hover'
  | 'eui-side-nav-colors-item-text-selected'
  | 'eui-side-nav-colors-section-title-text'
  | 'eui-side-nav-colors-separator'
  | 'eui-side-nav-colors-toggle-border'
  | 'eui-side-nav-colors-tooltip-background'
  | 'eui-side-nav-colors-tooltip-text'
  | 'eui-side-nav-size-badge-height'
  | 'eui-side-nav-size-badge-min-width'
  | 'eui-side-nav-size-footer-height'
  | 'eui-side-nav-size-header-height'
  | 'eui-side-nav-size-icon-height'
  | 'eui-side-nav-size-icon-width'
  | 'eui-side-nav-size-item-height'
  | 'eui-side-nav-size-item-indicator-width'
  | 'eui-side-nav-size-section-title-height'
  | 'eui-side-nav-size-toggle-height'
  | 'eui-side-nav-size-toggle-width'
  | 'eui-side-nav-size-width-collapsed'
  | 'eui-side-nav-size-width-expanded'
  | 'eui-side-nav-spacing-group-gap'
  | 'eui-side-nav-spacing-item-gap'
  | 'eui-side-nav-spacing-item-padding-horizontal'
  | 'eui-side-nav-spacing-nested-indent'
  | 'eui-side-nav-spacing-padding-horizontal'
  | 'eui-side-nav-spacing-padding-vertical'
  | 'eui-side-nav-spacing-section-padding-horizontal'
  | 'eui-side-nav-spacing-section-padding-top'
  | 'eui-side-nav-spacing-separator-margin-vertical'
  | 'eui-side-nav-spacing-toggle-offset-right'
  | 'eui-side-nav-typography-header-font-size'
  | 'eui-side-nav-typography-header-font-weight'
  | 'eui-side-nav-typography-item-font-size'
  | 'eui-side-nav-typography-item-font-weight'
  | 'eui-side-nav-typography-item-line-height'
  | 'eui-side-nav-typography-section-title-font-size'
  | 'eui-side-nav-typography-section-title-font-weight'
  | 'eui-side-nav-typography-section-title-line-height'
  | 'eui-sidebar-animation-duration'
  | 'eui-sidebar-animation-easing'
  | 'eui-sidebar-colors-background'
  | 'eui-sidebar-colors-border'
  | 'eui-sidebar-colors-text'
  | 'eui-sidebar-size-collapsed-width'
  | 'eui-sidebar-size-expanded-width'
  | 'eui-sidebar-spacing-item-gap'
  | 'eui-sidebar-spacing-padding'
  | 'eui-skeleton-animation-duration'
  | 'eui-skeleton-animation-easing'
  | 'eui-skeleton-animation-shimmer-width'
  | 'eui-skeleton-animation-stagger-max'
  | 'eui-skeleton-animation-stagger-step'
  | 'eui-skeleton-colors-background-base'
  | 'eui-skeleton-colors-shimmer-end'
  | 'eui-skeleton-colors-shimmer-mid'
  | 'eui-skeleton-colors-shimmer-start'
  | 'eui-skeleton-shape-circular-radius'
  | 'eui-skeleton-shape-rectangular-radius'
  | 'eui-skeleton-shape-text-radius'
  | 'eui-skeleton-size-circular-default-diameter'
  | 'eui-skeleton-size-rectangular-default-height'
  | 'eui-skeleton-size-text-line-height'
  | 'eui-spacing-2xl'
  | 'eui-spacing-lg'
  | 'eui-spacing-md'
  | 'eui-spacing-sm'
  | 'eui-spacing-xl'
  | 'eui-spacing-xs'
  | 'eui-switch-focus-ring-color-derived-accessible'
  | 'eui-switch-focus-ring-color-derived-base'
  | 'eui-switch-focus-ring-offset'
  | 'eui-switch-focus-ring-width-accessible'
  | 'eui-switch-focus-ring-width-base'
  | 'eui-switch-shape-radius-thumb'
  | 'eui-switch-shape-radius-track'
  | 'eui-switch-size-lg-thumb-offset'
  | 'eui-switch-size-lg-thumb-size'
  | 'eui-switch-size-lg-track-height'
  | 'eui-switch-size-lg-track-width'
  | 'eui-switch-size-md-thumb-offset'
  | 'eui-switch-size-md-thumb-size'
  | 'eui-switch-size-md-track-height'
  | 'eui-switch-size-md-track-width'
  | 'eui-switch-size-sm-thumb-offset'
  | 'eui-switch-size-sm-thumb-size'
  | 'eui-switch-size-sm-track-height'
  | 'eui-switch-size-sm-track-width'
  | 'eui-switch-thumb-background-base'
  | 'eui-switch-thumb-background-disabled'
  | 'eui-switch-thumb-border-disabled'
  | 'eui-switch-thumb-border-style'
  | 'eui-switch-thumb-border-width'
  | 'eui-switch-track-background-disabled'
  | 'eui-switch-track-background-disabled-on'
  | 'eui-switch-track-background-off'
  | 'eui-switch-track-background-on'
  | 'eui-switch-track-border-disabled'
  | 'eui-switch-track-border-off'
  | 'eui-switch-track-border-on'
  | 'eui-switch-track-border-style'
  | 'eui-switch-track-border-width'
  | 'eui-table-border-radius'
  | 'eui-table-border-style'
  | 'eui-table-border-width'
  | 'eui-table-colors-background'
  | 'eui-table-colors-border'
  | 'eui-table-colors-cell-text'
  | 'eui-table-colors-header-background'
  | 'eui-table-colors-header-text'
  | 'eui-table-colors-row-background-default'
  | 'eui-table-colors-row-background-hover'
  | 'eui-table-colors-row-background-selected'
  | 'eui-table-colors-subheader-background'
  | 'eui-table-colors-subheader-text'
  | 'eui-table-expandable-cell-animation-duration'
  | 'eui-table-expandable-cell-animation-easing'
  | 'eui-table-expandable-cell-border-radius'
  | 'eui-table-expandable-cell-panel-max-height'
  | 'eui-table-expandable-cell-panel-max-width'
  | 'eui-table-expandable-cell-panel-z-index'
  | 'eui-table-expandable-cell-shadow'
  | 'eui-table-expandable-cell-spacing-padding'
  | 'eui-table-folder-animation-duration'
  | 'eui-table-folder-animation-easing'
  | 'eui-table-folder-icon-gap'
  | 'eui-table-folder-icon-size'
  | 'eui-table-folder-indent-level'
  | 'eui-table-spacing-cell-padding-horizontal'
  | 'eui-table-spacing-cell-padding-right'
  | 'eui-table-spacing-footer-height'
  | 'eui-table-spacing-footer-padding-y'
  | 'eui-table-spacing-header-height'
  | 'eui-table-spacing-header-padding-horizontal'
  | 'eui-table-spacing-header-padding-vertical'
  | 'eui-table-spacing-row-gap'
  | 'eui-table-spacing-row-height'
  | 'eui-table-spacing-subheader-padding-horizontal'
  | 'eui-table-spacing-subheader-padding-vertical'
  | 'eui-table-spacing-toolbar-gap'
  | 'eui-table-spacing-toolbar-padding-y'
  | 'eui-textarea-size-min-height'
  | 'eui-textarea-size-min-rows'
  | 'eui-textarea-size-padding-inline'
  | 'eui-textarea-size-padding-vertical'
  | 'eui-textarea-typography-line-height'
  | 'eui-title-bar-colors-background'
  | 'eui-title-bar-colors-border'
  | 'eui-title-bar-colors-text'
  | 'eui-title-bar-size-height'
  | 'eui-title-bar-spacing-gap'
  | 'eui-title-bar-spacing-padding-horizontal'
  | 'eui-title-bar-spacing-padding-vertical'
  | 'eui-typography-base-font-size'
  | 'eui-typography-base-fontSize'
  | 'eui-typography-font-family-monospace'
  | 'eui-typography-font-family-ui'
  | 'eui-typography-font-size-2xl'
  | 'eui-typography-font-size-3xl'
  | 'eui-typography-font-size-4xl'
  | 'eui-typography-font-size-5xl'
  | 'eui-typography-font-size-6xl'
  | 'eui-typography-font-size-base'
  | 'eui-typography-font-size-lg'
  | 'eui-typography-font-size-md'
  | 'eui-typography-font-size-sm'
  | 'eui-typography-font-size-xl'
  | 'eui-typography-font-size-xs'
  | 'eui-typography-font-style-italic'
  | 'eui-typography-font-style-normal'
  | 'eui-typography-font-style-oblique'
  | 'eui-typography-font-weight-bold'
  | 'eui-typography-font-weight-light'
  | 'eui-typography-font-weight-medium'
  | 'eui-typography-font-weight-normal'
  | 'eui-typography-font-weight-semibold'
  | 'eui-typography-letter-spacing-normal'
  | 'eui-typography-letter-spacing-tight'
  | 'eui-typography-letter-spacing-tighter'
  | 'eui-typography-letter-spacing-wide'
  | 'eui-typography-letter-spacing-wider'
  | 'eui-typography-letter-spacing-widest'
  | 'eui-typography-line-height-loose'
  | 'eui-typography-line-height-none'
  | 'eui-typography-line-height-normal'
  | 'eui-typography-line-height-relaxed'
  | 'eui-typography-line-height-tight'
  | 'eui-typography-text-decoration-line-through'
  | 'eui-typography-text-decoration-none'
  | 'eui-typography-text-decoration-underline'
  | 'eui-typography-text-style-body-base-font-size'
  | 'eui-typography-text-style-body-base-font-weight'
  | 'eui-typography-text-style-body-base-line-height'
  | 'eui-typography-text-style-body-large-font-size'
  | 'eui-typography-text-style-body-large-font-weight'
  | 'eui-typography-text-style-body-large-line-height'
  | 'eui-typography-text-style-body-small-font-size'
  | 'eui-typography-text-style-body-small-font-weight'
  | 'eui-typography-text-style-body-small-line-height'
  | 'eui-typography-text-style-caption-font-size'
  | 'eui-typography-text-style-caption-font-weight'
  | 'eui-typography-text-style-caption-line-height'
  | 'eui-typography-text-style-code-base-font-family'
  | 'eui-typography-text-style-code-base-font-size'
  | 'eui-typography-text-style-code-base-font-weight'
  | 'eui-typography-text-style-code-base-line-height'
  | 'eui-typography-text-style-code-small-font-family'
  | 'eui-typography-text-style-code-small-font-size'
  | 'eui-typography-text-style-code-small-font-weight'
  | 'eui-typography-text-style-code-small-line-height'
  | 'eui-typography-text-style-heading-1-font-size'
  | 'eui-typography-text-style-heading-1-font-weight'
  | 'eui-typography-text-style-heading-1-line-height'
  | 'eui-typography-text-style-heading-2-font-size'
  | 'eui-typography-text-style-heading-2-font-weight'
  | 'eui-typography-text-style-heading-2-line-height'
  | 'eui-typography-text-style-heading-3-font-size'
  | 'eui-typography-text-style-heading-3-font-weight'
  | 'eui-typography-text-style-heading-3-line-height'
  | 'eui-typography-text-style-heading-4-font-size'
  | 'eui-typography-text-style-heading-4-font-weight'
  | 'eui-typography-text-style-heading-4-line-height'
  | 'eui-typography-text-style-heading-5-font-size'
  | 'eui-typography-text-style-heading-5-font-weight'
  | 'eui-typography-text-style-heading-5-line-height'
  | 'eui-typography-text-style-heading-6-font-size'
  | 'eui-typography-text-style-heading-6-font-weight'
  | 'eui-typography-text-style-heading-6-line-height'
  | 'eui-typography-text-transform-capitalize'
  | 'eui-typography-text-transform-lowercase'
  | 'eui-typography-text-transform-none'
  | 'eui-typography-text-transform-uppercase';

/**
 * Helper type for CSS var() function
 * 
 * @example
 * ```typescript
 * const color: TokenVar = 'var(--eui-button-primary-label-base)';
 * ```
 */
export type TokenVar = `var(--${TokenName})`;

/**
 * Get all token names as array
 * 
 * @example
 * ```typescript
 * import { TOKEN_NAMES } from '@/generated/tsx/tokens.types';
 * 
 * // Check if a token exists
 * if (TOKEN_NAMES.includes('eui-button-primary-label-base')) {
 *   // Token exists
 * }
 * ```
 */
export const TOKEN_NAMES: readonly TokenName[] = [
  'eui-alert-banner-border-style',
  'eui-alert-banner-border-width',
  'eui-alert-banner-colors-background-error',
  'eui-alert-banner-colors-background-info',
  'eui-alert-banner-colors-background-success',
  'eui-alert-banner-colors-background-warning',
  'eui-alert-banner-colors-border-error',
  'eui-alert-banner-colors-border-info',
  'eui-alert-banner-colors-border-success',
  'eui-alert-banner-colors-border-warning',
  'eui-alert-banner-colors-icon-error',
  'eui-alert-banner-colors-icon-info',
  'eui-alert-banner-colors-icon-success',
  'eui-alert-banner-colors-icon-warning',
  'eui-alert-banner-colors-text-error',
  'eui-alert-banner-colors-text-info',
  'eui-alert-banner-colors-text-success',
  'eui-alert-banner-colors-text-warning',
  'eui-alert-banner-spacing-gap-actions',
  'eui-alert-banner-spacing-gap-content',
  'eui-alert-banner-spacing-height-min',
  'eui-alert-banner-spacing-padding',
  'eui-alert-banner-z-index',
  'eui-app-shell-layout-grid-template-areas',
  'eui-avatar-background-fallback',
  'eui-avatar-border-color',
  'eui-avatar-border-color-lead',
  'eui-avatar-border-style',
  'eui-avatar-border-width',
  'eui-avatar-group-layout-hover-duration',
  'eui-avatar-group-layout-hover-easing',
  'eui-avatar-group-layout-hover-scale',
  'eui-avatar-group-layout-hover-spread',
  'eui-avatar-group-layout-max-visible',
  'eui-avatar-group-layout-overlap',
  'eui-avatar-group-layout-overlap-lead',
  'eui-avatar-group-layout-overlap-tight',
  'eui-avatar-shape-circle-radius',
  'eui-avatar-size-lg-diameter',
  'eui-avatar-size-md-diameter',
  'eui-avatar-size-sm-diameter',
  'eui-avatar-text-fallback',
  'eui-avatar-typography-font-family',
  'eui-avatar-typography-font-size-lg',
  'eui-avatar-typography-font-size-md',
  'eui-avatar-typography-font-size-sm',
  'eui-avatar-typography-font-weight',
  'eui-avatar-typography-line-height',
  'eui-avatar-typography-text-transform',
  'eui-breakpoint-desktop',
  'eui-breakpoint-narrow',
  'eui-breakpoint-wide',
  'eui-button-accent-background-active',
  'eui-button-accent-background-base',
  'eui-button-accent-background-disabled',
  'eui-button-accent-background-hover',
  'eui-button-accent-background-selected',
  'eui-button-accent-finished-background-active',
  'eui-button-accent-finished-background-base',
  'eui-button-accent-finished-background-disabled',
  'eui-button-accent-finished-background-hover',
  'eui-button-accent-finished-background-selected',
  'eui-button-accent-finished-label-active',
  'eui-button-accent-finished-label-base',
  'eui-button-accent-finished-label-disabled',
  'eui-button-accent-finished-label-hover',
  'eui-button-accent-finished-label-selected',
  'eui-button-accent-label-active',
  'eui-button-accent-label-base',
  'eui-button-accent-label-disabled',
  'eui-button-accent-label-hover',
  'eui-button-accent-label-selected',
  'eui-button-border-style',
  'eui-button-border-width',
  'eui-button-focus-ring-color-derived-accessible',
  'eui-button-focus-ring-color-derived-base',
  'eui-button-focus-ring-offset-base',
  'eui-button-focus-ring-width-accessible',
  'eui-button-focus-ring-width-base',
  'eui-button-group-orientation-horizontal',
  'eui-button-group-orientation-vertical',
  'eui-button-group-position-first-shape-orientation-horizontal-corner-bottom-left',
  'eui-button-group-position-first-shape-orientation-horizontal-corner-bottom-right',
  'eui-button-group-position-first-shape-orientation-horizontal-corner-top-left',
  'eui-button-group-position-first-shape-orientation-horizontal-corner-top-right',
  'eui-button-group-position-first-shape-orientation-vertical-corner-bottom-left',
  'eui-button-group-position-first-shape-orientation-vertical-corner-bottom-right',
  'eui-button-group-position-first-shape-orientation-vertical-corner-top-left',
  'eui-button-group-position-first-shape-orientation-vertical-corner-top-right',
  'eui-button-group-position-last-shape-orientation-horizontal-corner-bottom-left',
  'eui-button-group-position-last-shape-orientation-horizontal-corner-bottom-right',
  'eui-button-group-position-last-shape-orientation-horizontal-corner-top-left',
  'eui-button-group-position-last-shape-orientation-horizontal-corner-top-right',
  'eui-button-group-position-last-shape-orientation-vertical-corner-bottom-left',
  'eui-button-group-position-last-shape-orientation-vertical-corner-bottom-right',
  'eui-button-group-position-last-shape-orientation-vertical-corner-top-left',
  'eui-button-group-position-last-shape-orientation-vertical-corner-top-right',
  'eui-button-group-position-middle-shape-orientation-horizontal-corner-bottom-left',
  'eui-button-group-position-middle-shape-orientation-horizontal-corner-bottom-right',
  'eui-button-group-position-middle-shape-orientation-horizontal-corner-top-left',
  'eui-button-group-position-middle-shape-orientation-horizontal-corner-top-right',
  'eui-button-group-position-middle-shape-orientation-vertical-corner-bottom-left',
  'eui-button-group-position-middle-shape-orientation-vertical-corner-bottom-right',
  'eui-button-group-position-middle-shape-orientation-vertical-corner-top-left',
  'eui-button-group-position-middle-shape-orientation-vertical-corner-top-right',
  'eui-button-group-position-single-shape-corner-bottom-left',
  'eui-button-group-position-single-shape-corner-bottom-right',
  'eui-button-group-position-single-shape-corner-top-left',
  'eui-button-group-position-single-shape-corner-top-right',
  'eui-button-layout-default-flex-basis',
  'eui-button-layout-default-flex-grow',
  'eui-button-layout-default-flex-shrink',
  'eui-button-layout-default-white-space',
  'eui-button-layout-stack-internal-border-horizontal',
  'eui-button-layout-stack-internal-border-vertical',
  'eui-button-layout-stack-perimeter-border',
  'eui-button-layout-stack-separator-inset',
  'eui-button-layout-stack-separator-thickness',
  'eui-button-primary-background-active',
  'eui-button-primary-background-base',
  'eui-button-primary-background-disabled',
  'eui-button-primary-background-hover',
  'eui-button-primary-background-selected',
  'eui-button-primary-label-active',
  'eui-button-primary-label-base',
  'eui-button-primary-label-disabled',
  'eui-button-primary-label-hover',
  'eui-button-primary-label-selected',
  'eui-button-secondary-background-active',
  'eui-button-secondary-background-base',
  'eui-button-secondary-background-disabled',
  'eui-button-secondary-background-hover',
  'eui-button-secondary-background-selected',
  'eui-button-secondary-border-active',
  'eui-button-secondary-border-base',
  'eui-button-secondary-border-disabled',
  'eui-button-secondary-border-hover',
  'eui-button-secondary-border-selected',
  'eui-button-secondary-label-active',
  'eui-button-secondary-label-base',
  'eui-button-secondary-label-disabled',
  'eui-button-secondary-label-hover',
  'eui-button-secondary-label-selected',
  'eui-button-separator-inset',
  'eui-button-separator-thickness',
  'eui-button-shape-circle-radius',
  'eui-button-shape-default-radius',
  'eui-button-shape-round-radius',
  'eui-button-size-lg-font-size',
  'eui-button-size-lg-font-weight',
  'eui-button-size-lg-gap',
  'eui-button-size-lg-height',
  'eui-button-size-lg-padding-inline',
  'eui-button-size-md-font-size',
  'eui-button-size-md-font-weight',
  'eui-button-size-md-gap',
  'eui-button-size-md-height',
  'eui-button-size-md-padding-inline',
  'eui-button-size-sm-font-size',
  'eui-button-size-sm-font-weight',
  'eui-button-size-sm-gap',
  'eui-button-size-sm-height',
  'eui-button-size-sm-padding-inline',
  'eui-button-states-active',
  'eui-button-states-disabled',
  'eui-button-states-hover',
  'eui-button-states-selected',
  'eui-calendar-border-radius-calendar',
  'eui-calendar-border-radius-day',
  'eui-calendar-border-width',
  'eui-calendar-colors-background',
  'eui-calendar-colors-day-background-active',
  'eui-calendar-colors-day-background-default',
  'eui-calendar-colors-day-background-disabled',
  'eui-calendar-colors-day-background-hover',
  'eui-calendar-colors-day-background-outside-month',
  'eui-calendar-colors-day-background-selected',
  'eui-calendar-colors-day-background-selected-hover',
  'eui-calendar-colors-day-background-today',
  'eui-calendar-colors-day-border-default',
  'eui-calendar-colors-day-border-selected',
  'eui-calendar-colors-day-text-default',
  'eui-calendar-colors-day-text-disabled',
  'eui-calendar-colors-day-text-outside-month',
  'eui-calendar-colors-day-text-selected',
  'eui-calendar-colors-day-text-today',
  'eui-calendar-colors-header-background',
  'eui-calendar-colors-header-button-active-background',
  'eui-calendar-colors-header-button-hover-background',
  'eui-calendar-colors-header-button-text',
  'eui-calendar-colors-header-text',
  'eui-calendar-colors-range-background',
  'eui-calendar-colors-range-background-hover',
  'eui-calendar-colors-range-text',
  'eui-calendar-colors-weekday-text',
  'eui-calendar-size-day-aspect-ratio',
  'eui-calendar-size-day-min-height',
  'eui-calendar-size-day-width',
  'eui-calendar-size-header-height',
  'eui-calendar-size-min-width',
  'eui-calendar-size-weekday-height',
  'eui-calendar-size-weekday-width',
  'eui-calendar-size-width',
  'eui-calendar-spacing-day-margin-overlap',
  'eui-calendar-spacing-day-padding-horizontal',
  'eui-calendar-spacing-day-padding-vertical',
  'eui-calendar-spacing-grid-gap',
  'eui-calendar-spacing-header-gap',
  'eui-calendar-spacing-header-padding-horizontal',
  'eui-calendar-spacing-header-padding-vertical',
  'eui-calendar-spacing-padding',
  'eui-calendar-spacing-weekday-gap',
  'eui-calendar-spacing-weekday-padding-vertical',
  'eui-calendar-typography-day-font-size',
  'eui-calendar-typography-day-font-weight',
  'eui-calendar-typography-day-line-height',
  'eui-calendar-typography-header-font-size',
  'eui-calendar-typography-header-font-weight',
  'eui-calendar-typography-weekday-font-size',
  'eui-calendar-typography-weekday-font-weight',
  'eui-calendar-z-index-default',
  'eui-calendar-z-index-focus',
  'eui-calendar-z-index-interactive',
  'eui-calendar-z-index-selected',
  'eui-card-status-completed-indicator',
  'eui-card-status-completed-indicator-width',
  'eui-card-status-discontinued-indicator',
  'eui-card-status-discontinued-indicator-width',
  'eui-card-status-major-disruption-indicator',
  'eui-card-status-major-disruption-indicator-width',
  'eui-card-status-minor-disruption-indicator',
  'eui-card-status-minor-disruption-indicator-width',
  'eui-card-status-on-track-indicator',
  'eui-card-status-on-track-indicator-width',
  'eui-card-status-pending-indicator',
  'eui-card-status-pending-indicator-width',
  'eui-card-status-upcoming-indicator',
  'eui-card-status-upcoming-indicator-width',
  'eui-card-variant-elevated-background',
  'eui-card-variant-elevated-border-color',
  'eui-card-variant-elevated-border-style',
  'eui-card-variant-elevated-border-width',
  'eui-card-variant-elevated-radius',
  'eui-card-variant-elevated-shadow',
  'eui-card-variant-flat-background',
  'eui-card-variant-flat-border-color',
  'eui-card-variant-flat-border-style',
  'eui-card-variant-flat-border-width',
  'eui-card-variant-flat-radius',
  'eui-card-variant-flat-shadow',
  'eui-card-variant-strong-background',
  'eui-card-variant-strong-border-color',
  'eui-card-variant-strong-border-style',
  'eui-card-variant-strong-border-width',
  'eui-card-variant-strong-radius',
  'eui-card-variant-strong-shadow',
  'eui-celebration-animation-delay-long',
  'eui-celebration-animation-delay-medium',
  'eui-celebration-animation-delay-short',
  'eui-celebration-animation-duration',
  'eui-celebration-animation-easing',
  'eui-celebration-animation-lift-max-scale',
  'eui-celebration-animation-lift-max-translate-y',
  'eui-celebration-animation-lift-shadow-base',
  'eui-celebration-animation-lift-shadow-peak',
  'eui-celebration-animation-shine-duration',
  'eui-celebration-animation-shine-easing',
  'eui-celebration-animation-shine-width',
  'eui-celebration-animation-sparkle-duration',
  'eui-celebration-animation-sparkle-easing',
  'eui-celebration-animation-sparkle-particle-size',
  'eui-celebration-colors-shine-end',
  'eui-celebration-colors-shine-mid',
  'eui-celebration-colors-shine-start',
  'eui-celebration-colors-sparkle-base',
  'eui-celebration-colors-sparkle-bright',
  'eui-celebration-colors-sparkle-dim',
  'eui-checkbox-background-base',
  'eui-checkbox-background-checked',
  'eui-checkbox-background-checked-disabled',
  'eui-checkbox-background-checked-hover',
  'eui-checkbox-background-disabled',
  'eui-checkbox-background-hover',
  'eui-checkbox-background-indeterminate',
  'eui-checkbox-background-indeterminate-disabled',
  'eui-checkbox-background-indeterminate-hover',
  'eui-checkbox-border-base',
  'eui-checkbox-border-checked',
  'eui-checkbox-border-checked-disabled',
  'eui-checkbox-border-checked-hover',
  'eui-checkbox-border-disabled',
  'eui-checkbox-border-hover',
  'eui-checkbox-border-indeterminate',
  'eui-checkbox-border-indeterminate-disabled',
  'eui-checkbox-border-indeterminate-hover',
  'eui-checkbox-border-style',
  'eui-checkbox-border-width',
  'eui-checkbox-checkmark-base',
  'eui-checkbox-checkmark-disabled',
  'eui-checkbox-checkmark-indeterminate',
  'eui-checkbox-checkmark-indeterminate-disabled',
  'eui-checkbox-focus-ring-color-derived-accessible',
  'eui-checkbox-focus-ring-color-derived-base',
  'eui-checkbox-focus-ring-offset',
  'eui-checkbox-focus-ring-width-accessible',
  'eui-checkbox-focus-ring-width-base',
  'eui-checkbox-layout-gap',
  'eui-checkbox-shape-radius',
  'eui-checkbox-size-lg-size',
  'eui-checkbox-size-md-size',
  'eui-checkbox-size-sm-size',
  'eui-color-accent-100',
  'eui-color-accent-200',
  'eui-color-accent-300',
  'eui-color-accent-400',
  'eui-color-accent-50',
  'eui-color-accent-500',
  'eui-color-accent-600',
  'eui-color-accent-700',
  'eui-color-accent-800',
  'eui-color-accent-900',
  'eui-color-accent-primary',
  'eui-color-background-base',
  'eui-color-background-inverse',
  'eui-color-background-muted',
  'eui-color-background-subtle',
  'eui-color-background-surface',
  'eui-color-border-default',
  'eui-color-border-inverse',
  'eui-color-border-strong',
  'eui-color-border-subtle',
  'eui-color-brand-100',
  'eui-color-brand-200',
  'eui-color-brand-300',
  'eui-color-brand-400',
  'eui-color-brand-50',
  'eui-color-brand-500',
  'eui-color-brand-600',
  'eui-color-brand-700',
  'eui-color-brand-800',
  'eui-color-brand-900',
  'eui-color-brand-primary',
  'eui-color-focus-ring',
  'eui-color-neutral-100',
  'eui-color-neutral-200',
  'eui-color-neutral-300',
  'eui-color-neutral-400',
  'eui-color-neutral-50',
  'eui-color-neutral-500',
  'eui-color-neutral-600',
  'eui-color-neutral-700',
  'eui-color-neutral-800',
  'eui-color-neutral-900',
  'eui-color-neutral-white',
  'eui-color-signal-keyboard-focus',
  'eui-color-status-application-completed',
  'eui-color-status-application-discontinued',
  'eui-color-status-application-major-disruption',
  'eui-color-status-application-minor-disruption',
  'eui-color-status-application-on-track',
  'eui-color-status-application-pending',
  'eui-color-status-application-upcoming',
  'eui-color-status-error-100',
  'eui-color-status-error-50',
  'eui-color-status-error-500',
  'eui-color-status-error-600',
  'eui-color-status-error-700',
  'eui-color-status-info-100',
  'eui-color-status-info-50',
  'eui-color-status-info-500',
  'eui-color-status-info-600',
  'eui-color-status-info-700',
  'eui-color-status-success-100',
  'eui-color-status-success-50',
  'eui-color-status-success-500',
  'eui-color-status-success-600',
  'eui-color-status-success-700',
  'eui-color-status-warning-100',
  'eui-color-status-warning-50',
  'eui-color-status-warning-500',
  'eui-color-status-warning-600',
  'eui-color-status-warning-700',
  'eui-color-system-focus',
  'eui-color-text-disabled',
  'eui-color-text-inverse',
  'eui-color-text-muted',
  'eui-color-text-primary',
  'eui-color-text-subtle',
  'eui-content-colors-background',
  'eui-content-colors-text',
  'eui-content-spacing-padding',
  'eui-counter-colors-filter-background',
  'eui-counter-colors-filter-border',
  'eui-counter-colors-filter-color',
  'eui-counter-colors-filter-icon-color',
  'eui-counter-colors-pill-default-background',
  'eui-counter-colors-pill-default-border',
  'eui-counter-colors-pill-default-color',
  'eui-counter-colors-pill-disabled-background',
  'eui-counter-colors-pill-disabled-border',
  'eui-counter-colors-pill-disabled-color',
  'eui-counter-colors-pill-inverse-background',
  'eui-counter-colors-pill-inverse-border',
  'eui-counter-colors-pill-inverse-color',
  'eui-counter-colors-text-default-color',
  'eui-counter-colors-text-disabled-color',
  'eui-counter-colors-text-inverse-color',
  'eui-counter-shape-filter-radius',
  'eui-counter-shape-pill-radius',
  'eui-counter-shape-text-radius',
  'eui-counter-size-lg-height',
  'eui-counter-size-lg-padding-inline',
  'eui-counter-size-lg-padding-vertical',
  'eui-counter-size-md-height',
  'eui-counter-size-md-padding-inline',
  'eui-counter-size-md-padding-vertical',
  'eui-counter-size-sm-height',
  'eui-counter-size-sm-padding-inline',
  'eui-counter-size-sm-padding-vertical',
  'eui-counter-spacing-icon-gap',
  'eui-counter-spacing-icon-size-lg',
  'eui-counter-spacing-icon-size-md',
  'eui-counter-spacing-icon-size-sm',
  'eui-counter-typography-font-family',
  'eui-counter-typography-font-size-filter',
  'eui-counter-typography-font-size-pill',
  'eui-counter-typography-font-size-text',
  'eui-counter-typography-font-weight',
  'eui-counter-typography-line-height',
  'eui-detail-panel-colors-background',
  'eui-detail-panel-colors-border',
  'eui-detail-panel-colors-text',
  'eui-detail-panel-shadow-left',
  'eui-detail-panel-size-width',
  'eui-detail-panel-spacing-padding',
  'eui-divider-colors-default',
  'eui-divider-size-thickness',
  'eui-divider-spacing-margin-horizontal',
  'eui-divider-spacing-margin-vertical',
  'eui-focus-ring-width-accessible',
  'eui-focus-ring-width-base',
  'eui-form-animation-duration',
  'eui-form-animation-easing',
  'eui-form-spacing-field-gap-external',
  'eui-form-spacing-field-gap-internal',
  'eui-form-spacing-group-gap',
  'eui-form-spacing-row-gap',
  'eui-form-spacing-section-gap-external',
  'eui-form-spacing-section-gap-internal',
  'eui-form-spacing-section-gap-title',
  'eui-form-spacing-section-header-padding',
  'eui-header-colors-background',
  'eui-header-colors-border',
  'eui-header-colors-text',
  'eui-header-size-height',
  'eui-header-spacing-gap',
  'eui-header-spacing-padding-horizontal',
  'eui-header-spacing-padding-vertical',
  'eui-hero-section-colors-background-base',
  'eui-hero-section-colors-background-overlay-dark',
  'eui-hero-section-colors-background-overlay-light',
  'eui-hero-section-colors-text-heading',
  'eui-hero-section-colors-text-subheading',
  'eui-hero-section-size-content-max-width',
  'eui-hero-section-size-heading-max-width',
  'eui-hero-section-size-min-height-desktop',
  'eui-hero-section-size-min-height-mobile',
  'eui-hero-section-size-min-height-tablet',
  'eui-hero-section-size-min-height-wide',
  'eui-hero-section-size-subheading-max-width',
  'eui-hero-section-spacing-gap-content',
  'eui-hero-section-spacing-gap-cta',
  'eui-hero-section-spacing-gap-media',
  'eui-hero-section-spacing-padding-desktop-block',
  'eui-hero-section-spacing-padding-desktop-inline',
  'eui-hero-section-spacing-padding-mobile-block',
  'eui-hero-section-spacing-padding-mobile-inline',
  'eui-hero-section-spacing-padding-tablet-block',
  'eui-hero-section-spacing-padding-tablet-inline',
  'eui-hero-section-typography-heading-desktop-font-size',
  'eui-hero-section-typography-heading-desktop-font-weight',
  'eui-hero-section-typography-heading-desktop-line-height',
  'eui-hero-section-typography-heading-mobile-font-size',
  'eui-hero-section-typography-heading-mobile-font-weight',
  'eui-hero-section-typography-heading-mobile-line-height',
  'eui-hero-section-typography-subheading-desktop-font-size',
  'eui-hero-section-typography-subheading-desktop-line-height',
  'eui-hero-section-typography-subheading-mobile-font-size',
  'eui-hero-section-typography-subheading-mobile-line-height',
  'eui-input-background-base',
  'eui-input-background-disabled',
  'eui-input-background-focus',
  'eui-input-background-hover',
  'eui-input-border-base',
  'eui-input-border-disabled',
  'eui-input-border-error',
  'eui-input-border-focus',
  'eui-input-border-hover',
  'eui-input-border-style',
  'eui-input-border-width',
  'eui-input-focus-ring-color-derived-accessible',
  'eui-input-focus-ring-color-derived-base',
  'eui-input-focus-ring-offset',
  'eui-input-focus-ring-width-accessible',
  'eui-input-focus-ring-width-base',
  'eui-input-group-colors-prefix-text',
  'eui-input-group-colors-suffix-text',
  'eui-input-group-size-prefix-height-lg',
  'eui-input-group-size-prefix-height-md',
  'eui-input-group-size-prefix-height-sm',
  'eui-input-group-size-prefix-width-lg',
  'eui-input-group-size-prefix-width-md',
  'eui-input-group-size-prefix-width-sm',
  'eui-input-group-size-suffix-height-lg',
  'eui-input-group-size-suffix-height-md',
  'eui-input-group-size-suffix-height-sm',
  'eui-input-group-size-suffix-width-lg',
  'eui-input-group-size-suffix-width-md',
  'eui-input-group-size-suffix-width-sm',
  'eui-input-group-spacing-input-padding-left',
  'eui-input-group-spacing-input-padding-right',
  'eui-input-group-spacing-prefix-padding-left',
  'eui-input-group-spacing-prefix-padding-right',
  'eui-input-group-spacing-suffix-padding-left',
  'eui-input-group-spacing-suffix-padding-right',
  'eui-input-shape-radius',
  'eui-input-size-lg-font-size',
  'eui-input-size-lg-height',
  'eui-input-size-lg-padding-inline',
  'eui-input-size-md-font-size',
  'eui-input-size-md-height',
  'eui-input-size-md-padding-inline',
  'eui-input-size-sm-font-size',
  'eui-input-size-sm-height',
  'eui-input-size-sm-padding-inline',
  'eui-input-text-base',
  'eui-input-text-disabled',
  'eui-input-text-placeholder',
  'eui-input-typography-font-family',
  'eui-input-typography-font-weight',
  'eui-input-typography-line-height',
  'eui-layout-container-gutter-x',
  'eui-layout-container-standard-max-width',
  'eui-layout-container-wide-max-width',
  'eui-layout-page-padding-x',
  'eui-layout-page-padding-y',
  'eui-layout-section-gap',
  'eui-layout-section-padding',
  'eui-layout-section-title-gap',
  'eui-layout-toolbar-gap',
  'eui-layout-toolbar-height',
  'eui-layout-toolbar-padding-y',
  'eui-logo-colors-icon-default',
  'eui-logo-colors-icon-grayscale',
  'eui-logo-colors-icon-inverse',
  'eui-logo-colors-icon-monochrome',
  'eui-logo-size-icon-lg',
  'eui-logo-size-icon-md',
  'eui-logo-size-icon-sm',
  'eui-logo-size-icon-xl',
  'eui-logo-size-icon-xs',
  'eui-logo-spacing-gap',
  'eui-menu-border-color',
  'eui-menu-border-style',
  'eui-menu-border-width',
  'eui-menu-colors-background',
  'eui-menu-colors-border',
  'eui-menu-colors-item-background-default',
  'eui-menu-colors-item-background-focus',
  'eui-menu-colors-item-background-hover',
  'eui-menu-colors-item-background-selected',
  'eui-menu-colors-item-text',
  'eui-menu-colors-item-text-disabled',
  'eui-menu-shadow',
  'eui-menu-shape-radius',
  'eui-menu-size-max-height',
  'eui-menu-size-max-width',
  'eui-menu-size-min-width',
  'eui-menu-spacing-divider-margin',
  'eui-menu-spacing-item-gap',
  'eui-menu-spacing-item-padding-horizontal',
  'eui-menu-spacing-item-padding-vertical',
  'eui-menu-spacing-list-padding',
  'eui-modal-backdrop-blur',
  'eui-modal-backdrop-color',
  'eui-modal-colors-body-background',
  'eui-modal-colors-body-border',
  'eui-modal-colors-body-text',
  'eui-modal-colors-close-color',
  'eui-modal-colors-close-hover',
  'eui-modal-colors-footer-background',
  'eui-modal-colors-footer-border',
  'eui-modal-colors-footer-text',
  'eui-modal-colors-header-background',
  'eui-modal-colors-header-border',
  'eui-modal-colors-header-text',
  'eui-modal-shadow-elevation',
  'eui-modal-shape-radius',
  'eui-modal-size-full-max-width',
  'eui-modal-size-lg-max-width',
  'eui-modal-size-md-max-width',
  'eui-modal-size-sm-max-width',
  'eui-modal-size-xl-max-width',
  'eui-modal-spacing-body-padding',
  'eui-modal-spacing-footer-padding-horizontal',
  'eui-modal-spacing-footer-padding-vertical',
  'eui-modal-spacing-gap',
  'eui-modal-spacing-header-padding-horizontal',
  'eui-modal-spacing-header-padding-vertical',
  'eui-radius-default',
  'eui-radius-extra-large',
  'eui-radius-full',
  'eui-radius-large',
  'eui-radius-none',
  'eui-radius-pill',
  'eui-radius-small',
  'eui-select-dropdown-background',
  'eui-select-dropdown-border-color',
  'eui-select-dropdown-border-style',
  'eui-select-dropdown-border-width',
  'eui-select-dropdown-max-height',
  'eui-select-dropdown-padding',
  'eui-select-dropdown-radius',
  'eui-select-dropdown-shadow',
  'eui-select-dropdown-z-index',
  'eui-select-icon-color',
  'eui-select-icon-disabled',
  'eui-select-option-background-default',
  'eui-select-option-background-focused',
  'eui-select-option-background-hover',
  'eui-select-option-background-selected',
  'eui-select-option-background-selected-focused',
  'eui-select-option-color-default',
  'eui-select-option-color-disabled',
  'eui-select-option-padding-horizontal',
  'eui-select-option-padding-vertical',
  'eui-select-primitive-badge-colors-background',
  'eui-select-primitive-badge-colors-remove-icon',
  'eui-select-primitive-badge-colors-text',
  'eui-select-primitive-badge-shape-radius',
  'eui-select-primitive-badge-spacing-gap',
  'eui-select-primitive-badge-spacing-padding-horizontal',
  'eui-select-primitive-badge-spacing-padding-vertical',
  'eui-select-primitive-listbox-spacing-gap',
  'eui-select-primitive-option-shape-radius',
  'eui-select-primitive-option-spacing-padding-horizontal',
  'eui-select-primitive-option-spacing-padding-vertical',
  'eui-select-primitive-popover-size-max-height',
  'eui-select-primitive-popover-size-min-width',
  'eui-select-primitive-popover-spacing-padding',
  'eui-select-primitive-trigger-spacing-gap',
  'eui-select-trigger-background',
  'eui-select-trigger-border',
  'eui-shadow-default',
  'eui-shadow-extra-large',
  'eui-shadow-large',
  'eui-shadow-none',
  'eui-shadow-small',
  'eui-side-nav-animation-duration',
  'eui-side-nav-animation-easing',
  'eui-side-nav-animation-indicator-duration',
  'eui-side-nav-animation-indicator-easing',
  'eui-side-nav-animation-item-duration',
  'eui-side-nav-animation-item-easing',
  'eui-side-nav-colors-background',
  'eui-side-nav-colors-border',
  'eui-side-nav-colors-footer-border',
  'eui-side-nav-colors-header-border',
  'eui-side-nav-colors-item-background-active',
  'eui-side-nav-colors-item-background-default',
  'eui-side-nav-colors-item-background-disabled',
  'eui-side-nav-colors-item-background-focus',
  'eui-side-nav-colors-item-background-hover',
  'eui-side-nav-colors-item-background-selected',
  'eui-side-nav-colors-item-badge-background',
  'eui-side-nav-colors-item-badge-text',
  'eui-side-nav-colors-item-indicator-active',
  'eui-side-nav-colors-item-indicator-selected',
  'eui-side-nav-colors-item-text-active',
  'eui-side-nav-colors-item-text-default',
  'eui-side-nav-colors-item-text-disabled',
  'eui-side-nav-colors-item-text-hover',
  'eui-side-nav-colors-item-text-selected',
  'eui-side-nav-colors-section-title-text',
  'eui-side-nav-colors-separator',
  'eui-side-nav-colors-toggle-border',
  'eui-side-nav-colors-tooltip-background',
  'eui-side-nav-colors-tooltip-text',
  'eui-side-nav-size-badge-height',
  'eui-side-nav-size-badge-min-width',
  'eui-side-nav-size-footer-height',
  'eui-side-nav-size-header-height',
  'eui-side-nav-size-icon-height',
  'eui-side-nav-size-icon-width',
  'eui-side-nav-size-item-height',
  'eui-side-nav-size-item-indicator-width',
  'eui-side-nav-size-section-title-height',
  'eui-side-nav-size-toggle-height',
  'eui-side-nav-size-toggle-width',
  'eui-side-nav-size-width-collapsed',
  'eui-side-nav-size-width-expanded',
  'eui-side-nav-spacing-group-gap',
  'eui-side-nav-spacing-item-gap',
  'eui-side-nav-spacing-item-padding-horizontal',
  'eui-side-nav-spacing-nested-indent',
  'eui-side-nav-spacing-padding-horizontal',
  'eui-side-nav-spacing-padding-vertical',
  'eui-side-nav-spacing-section-padding-horizontal',
  'eui-side-nav-spacing-section-padding-top',
  'eui-side-nav-spacing-separator-margin-vertical',
  'eui-side-nav-spacing-toggle-offset-right',
  'eui-side-nav-typography-header-font-size',
  'eui-side-nav-typography-header-font-weight',
  'eui-side-nav-typography-item-font-size',
  'eui-side-nav-typography-item-font-weight',
  'eui-side-nav-typography-item-line-height',
  'eui-side-nav-typography-section-title-font-size',
  'eui-side-nav-typography-section-title-font-weight',
  'eui-side-nav-typography-section-title-line-height',
  'eui-sidebar-animation-duration',
  'eui-sidebar-animation-easing',
  'eui-sidebar-colors-background',
  'eui-sidebar-colors-border',
  'eui-sidebar-colors-text',
  'eui-sidebar-size-collapsed-width',
  'eui-sidebar-size-expanded-width',
  'eui-sidebar-spacing-item-gap',
  'eui-sidebar-spacing-padding',
  'eui-skeleton-animation-duration',
  'eui-skeleton-animation-easing',
  'eui-skeleton-animation-shimmer-width',
  'eui-skeleton-animation-stagger-max',
  'eui-skeleton-animation-stagger-step',
  'eui-skeleton-colors-background-base',
  'eui-skeleton-colors-shimmer-end',
  'eui-skeleton-colors-shimmer-mid',
  'eui-skeleton-colors-shimmer-start',
  'eui-skeleton-shape-circular-radius',
  'eui-skeleton-shape-rectangular-radius',
  'eui-skeleton-shape-text-radius',
  'eui-skeleton-size-circular-default-diameter',
  'eui-skeleton-size-rectangular-default-height',
  'eui-skeleton-size-text-line-height',
  'eui-spacing-2xl',
  'eui-spacing-lg',
  'eui-spacing-md',
  'eui-spacing-sm',
  'eui-spacing-xl',
  'eui-spacing-xs',
  'eui-switch-focus-ring-color-derived-accessible',
  'eui-switch-focus-ring-color-derived-base',
  'eui-switch-focus-ring-offset',
  'eui-switch-focus-ring-width-accessible',
  'eui-switch-focus-ring-width-base',
  'eui-switch-shape-radius-thumb',
  'eui-switch-shape-radius-track',
  'eui-switch-size-lg-thumb-offset',
  'eui-switch-size-lg-thumb-size',
  'eui-switch-size-lg-track-height',
  'eui-switch-size-lg-track-width',
  'eui-switch-size-md-thumb-offset',
  'eui-switch-size-md-thumb-size',
  'eui-switch-size-md-track-height',
  'eui-switch-size-md-track-width',
  'eui-switch-size-sm-thumb-offset',
  'eui-switch-size-sm-thumb-size',
  'eui-switch-size-sm-track-height',
  'eui-switch-size-sm-track-width',
  'eui-switch-thumb-background-base',
  'eui-switch-thumb-background-disabled',
  'eui-switch-thumb-border-disabled',
  'eui-switch-thumb-border-style',
  'eui-switch-thumb-border-width',
  'eui-switch-track-background-disabled',
  'eui-switch-track-background-disabled-on',
  'eui-switch-track-background-off',
  'eui-switch-track-background-on',
  'eui-switch-track-border-disabled',
  'eui-switch-track-border-off',
  'eui-switch-track-border-on',
  'eui-switch-track-border-style',
  'eui-switch-track-border-width',
  'eui-table-border-radius',
  'eui-table-border-style',
  'eui-table-border-width',
  'eui-table-colors-background',
  'eui-table-colors-border',
  'eui-table-colors-cell-text',
  'eui-table-colors-header-background',
  'eui-table-colors-header-text',
  'eui-table-colors-row-background-default',
  'eui-table-colors-row-background-hover',
  'eui-table-colors-row-background-selected',
  'eui-table-colors-subheader-background',
  'eui-table-colors-subheader-text',
  'eui-table-expandable-cell-animation-duration',
  'eui-table-expandable-cell-animation-easing',
  'eui-table-expandable-cell-border-radius',
  'eui-table-expandable-cell-panel-max-height',
  'eui-table-expandable-cell-panel-max-width',
  'eui-table-expandable-cell-panel-z-index',
  'eui-table-expandable-cell-shadow',
  'eui-table-expandable-cell-spacing-padding',
  'eui-table-folder-animation-duration',
  'eui-table-folder-animation-easing',
  'eui-table-folder-icon-gap',
  'eui-table-folder-icon-size',
  'eui-table-folder-indent-level',
  'eui-table-spacing-cell-padding-horizontal',
  'eui-table-spacing-cell-padding-right',
  'eui-table-spacing-footer-height',
  'eui-table-spacing-footer-padding-y',
  'eui-table-spacing-header-height',
  'eui-table-spacing-header-padding-horizontal',
  'eui-table-spacing-header-padding-vertical',
  'eui-table-spacing-row-gap',
  'eui-table-spacing-row-height',
  'eui-table-spacing-subheader-padding-horizontal',
  'eui-table-spacing-subheader-padding-vertical',
  'eui-table-spacing-toolbar-gap',
  'eui-table-spacing-toolbar-padding-y',
  'eui-textarea-size-min-height',
  'eui-textarea-size-min-rows',
  'eui-textarea-size-padding-inline',
  'eui-textarea-size-padding-vertical',
  'eui-textarea-typography-line-height',
  'eui-title-bar-colors-background',
  'eui-title-bar-colors-border',
  'eui-title-bar-colors-text',
  'eui-title-bar-size-height',
  'eui-title-bar-spacing-gap',
  'eui-title-bar-spacing-padding-horizontal',
  'eui-title-bar-spacing-padding-vertical',
  'eui-typography-base-font-size',
  'eui-typography-base-fontSize',
  'eui-typography-font-family-monospace',
  'eui-typography-font-family-ui',
  'eui-typography-font-size-2xl',
  'eui-typography-font-size-3xl',
  'eui-typography-font-size-4xl',
  'eui-typography-font-size-5xl',
  'eui-typography-font-size-6xl',
  'eui-typography-font-size-base',
  'eui-typography-font-size-lg',
  'eui-typography-font-size-md',
  'eui-typography-font-size-sm',
  'eui-typography-font-size-xl',
  'eui-typography-font-size-xs',
  'eui-typography-font-style-italic',
  'eui-typography-font-style-normal',
  'eui-typography-font-style-oblique',
  'eui-typography-font-weight-bold',
  'eui-typography-font-weight-light',
  'eui-typography-font-weight-medium',
  'eui-typography-font-weight-normal',
  'eui-typography-font-weight-semibold',
  'eui-typography-letter-spacing-normal',
  'eui-typography-letter-spacing-tight',
  'eui-typography-letter-spacing-tighter',
  'eui-typography-letter-spacing-wide',
  'eui-typography-letter-spacing-wider',
  'eui-typography-letter-spacing-widest',
  'eui-typography-line-height-loose',
  'eui-typography-line-height-none',
  'eui-typography-line-height-normal',
  'eui-typography-line-height-relaxed',
  'eui-typography-line-height-tight',
  'eui-typography-text-decoration-line-through',
  'eui-typography-text-decoration-none',
  'eui-typography-text-decoration-underline',
  'eui-typography-text-style-body-base-font-size',
  'eui-typography-text-style-body-base-font-weight',
  'eui-typography-text-style-body-base-line-height',
  'eui-typography-text-style-body-large-font-size',
  'eui-typography-text-style-body-large-font-weight',
  'eui-typography-text-style-body-large-line-height',
  'eui-typography-text-style-body-small-font-size',
  'eui-typography-text-style-body-small-font-weight',
  'eui-typography-text-style-body-small-line-height',
  'eui-typography-text-style-caption-font-size',
  'eui-typography-text-style-caption-font-weight',
  'eui-typography-text-style-caption-line-height',
  'eui-typography-text-style-code-base-font-family',
  'eui-typography-text-style-code-base-font-size',
  'eui-typography-text-style-code-base-font-weight',
  'eui-typography-text-style-code-base-line-height',
  'eui-typography-text-style-code-small-font-family',
  'eui-typography-text-style-code-small-font-size',
  'eui-typography-text-style-code-small-font-weight',
  'eui-typography-text-style-code-small-line-height',
  'eui-typography-text-style-heading-1-font-size',
  'eui-typography-text-style-heading-1-font-weight',
  'eui-typography-text-style-heading-1-line-height',
  'eui-typography-text-style-heading-2-font-size',
  'eui-typography-text-style-heading-2-font-weight',
  'eui-typography-text-style-heading-2-line-height',
  'eui-typography-text-style-heading-3-font-size',
  'eui-typography-text-style-heading-3-font-weight',
  'eui-typography-text-style-heading-3-line-height',
  'eui-typography-text-style-heading-4-font-size',
  'eui-typography-text-style-heading-4-font-weight',
  'eui-typography-text-style-heading-4-line-height',
  'eui-typography-text-style-heading-5-font-size',
  'eui-typography-text-style-heading-5-font-weight',
  'eui-typography-text-style-heading-5-line-height',
  'eui-typography-text-style-heading-6-font-size',
  'eui-typography-text-style-heading-6-font-weight',
  'eui-typography-text-style-heading-6-line-height',
  'eui-typography-text-transform-capitalize',
  'eui-typography-text-transform-lowercase',
  'eui-typography-text-transform-none',
  'eui-typography-text-transform-uppercase'
] as const;

/**
 * Helper function to create CSS variable reference
 * 
 * @param name - Token name (without -- prefix)
 * @returns CSS variable reference string
 * 
 * @example
 * ```typescript
 * import { tokenVar } from '@/generated/tsx/tokens.types';
 * 
 * // TypeScript will validate the token name
 * const color = tokenVar('eui-button-primary-label-base'); // ✅ OK
 * const wrong = tokenVar('eui-button-wrong-name'); // ❌ TypeScript error
 * 
 * // Use in styles
 * const style = {
 *   color: tokenVar('eui-button-primary-label-base'),
 *   height: tokenVar('eui-button-size-md-height')
 * };
 * ```
 */
export function tokenVar(name: TokenName): TokenVar {
  return `var(--${name})` as TokenVar;
}

/**
 * Type-safe token name validator
 * 
 * @param name - String to validate
 * @returns True if name is a valid token name
 * 
 * @example
 * ```typescript
 * import { isValidTokenName, tokenVar } from '@/generated/tsx/tokens.types';
 * 
 * function useToken(name: string) {
 *   if (isValidTokenName(name)) {
 *     // TypeScript now knows name is TokenName
 *     const value = tokenVar(name); // ✅ Type-safe
 *     return value;
 *   }
 *   throw new Error(`Invalid token name: ${name}`);
 * }
 * ```
 */
export function isValidTokenName(name: string): name is TokenName {
  return TOKEN_NAMES.includes(name as TokenName);
}

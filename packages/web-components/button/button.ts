/**
 * EuiButton Web Component
 * 
 * A framework-agnostic button component using Web Components standards.
 * Integrates with the token system via CSS custom properties that penetrate Shadow DOM.
 * 
 * Usage:
 *   <eui-button data-eui-intent="primary">Click me</eui-button>
 */

export class EuiButton extends HTMLElement {
  private shadow: ShadowRoot;

  // Observed attributes trigger attributeChangedCallback when modified
  static get observedAttributes(): string[] {
    return [
      'data-eui-intent',
      'data-eui-size',
      'data-eui-shape',
      'data-eui-selected',
      'disabled'
    ];
  }

  constructor() {
    super();
    // Create Shadow DOM with open mode to allow token inheritance
    // CSS custom properties penetrate Shadow DOM boundaries automatically
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const intent = this.getAttribute('data-eui-intent') || 'primary';
    const size = this.getAttribute('data-eui-size') || 'md';
    const shape = this.getAttribute('data-eui-shape') || 'default';
    const selected = this.hasAttribute('data-eui-selected');
    const disabled = this.hasAttribute('disabled');

    // CSS custom properties from parent context automatically penetrate Shadow DOM
    // No need to manually read or copy tokens - they flow through :host
    this.shadow.innerHTML = `
      <style>
        /* Host element inherits CSS custom properties from parent context */
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--eui-button-gap, var(--eui-button-size-md-gap));
          height: var(--eui-button-height, var(--eui-button-size-md-height));
          min-width: var(--eui-button-height, var(--eui-button-size-md-height));
          padding-inline: var(--eui-button-padding-inline, var(--eui-button-size-md-padding-inline));
          flex: var(--eui-button-flex-grow, var(--eui-button-layout-default-flex-grow)) 
                var(--eui-button-flex-shrink, var(--eui-button-layout-default-flex-shrink)) 
                var(--eui-button-flex-basis, var(--eui-button-layout-default-flex-basis));
          white-space: var(--eui-button-white-space, var(--eui-button-layout-default-white-space));
          border-radius: var(--eui-button-corner-top-left, var(--eui-radius-default)) 
                        var(--eui-button-corner-top-right, var(--eui-radius-default)) 
                        var(--eui-button-corner-bottom-right, var(--eui-radius-default)) 
                        var(--eui-button-corner-bottom-left, var(--eui-radius-default));
          border: var(--eui-button-border-width, 1px) 
                  var(--eui-button-border-style, solid) 
                  var(--eui-button-border-base, transparent);
          background-color: var(--eui-button-bg-base, var(--eui-button-primary-background-base));
          color: var(--eui-button-label-base, var(--eui-button-primary-label-base));
          font-size: var(--eui-button-font-size, var(--eui-button-size-md-font-size));
          font-weight: var(--eui-button-font-weight, var(--eui-button-size-md-font-weight));
          font-family: inherit;
          line-height: 1;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
          outline: none;
          position: relative;
          z-index: 0;
        }

        /* Intent-based token overrides */
        :host([data-eui-intent="primary"]) {
          --eui-button-bg-base: var(--eui-button-primary-background-base);
          --eui-button-label-base: var(--eui-button-primary-label-base);
          --eui-button-border-base: transparent;
        }

        :host([data-eui-intent="secondary"]) {
          --eui-button-bg-base: var(--eui-button-secondary-background-base);
          --eui-button-label-base: var(--eui-button-secondary-label-base);
          --eui-button-border-base: var(--eui-color-border-default);
        }

        :host([data-eui-intent="accent"]) {
          --eui-button-bg-base: var(--eui-button-accent-background-base);
          --eui-button-label-base: var(--eui-button-accent-label-base);
          --eui-button-border-base: transparent;
        }

        /* Selected state overrides */
        :host([data-eui-selected][data-eui-intent="primary"]) {
          --eui-button-bg-base: var(--eui-button-primary-background-selected);
          --eui-button-label-base: var(--eui-button-primary-label-selected);
        }

        :host([data-eui-selected][data-eui-intent="secondary"]) {
          --eui-button-bg-base: var(--eui-button-secondary-background-selected);
          --eui-button-label-base: var(--eui-button-secondary-label-selected);
          --eui-button-border-base: var(--eui-color-border-default);
        }

        :host([data-eui-selected][data-eui-intent="accent"]) {
          --eui-button-bg-base: var(--eui-button-accent-background-selected);
          --eui-button-label-base: var(--eui-button-accent-label-selected);
        }

        /* Size overrides */
        :host([data-eui-size="sm"]) {
          --eui-button-height: var(--eui-button-size-sm-height);
          --eui-button-padding-inline: var(--eui-button-size-sm-padding-inline);
          --eui-button-font-size: var(--eui-button-size-sm-font-size);
          --eui-button-font-weight: var(--eui-button-size-sm-font-weight);
          --eui-button-gap: var(--eui-button-size-sm-gap);
        }

        :host([data-eui-size="md"]) {
          --eui-button-height: var(--eui-button-size-md-height);
          --eui-button-padding-inline: var(--eui-button-size-md-padding-inline);
          --eui-button-font-size: var(--eui-button-size-md-font-size);
          --eui-button-font-weight: var(--eui-button-size-md-font-weight);
          --eui-button-gap: var(--eui-button-size-md-gap);
        }

        :host([data-eui-size="lg"]) {
          --eui-button-height: var(--eui-button-size-lg-height);
          --eui-button-padding-inline: var(--eui-button-size-lg-padding-inline);
          --eui-button-font-size: var(--eui-button-size-lg-font-size);
          --eui-button-font-weight: var(--eui-button-size-lg-font-weight);
          --eui-button-gap: var(--eui-button-size-lg-gap);
        }

        /* Shape overrides */
        :host([data-eui-shape="round"]) {
          --eui-button-corner-top-left: var(--eui-button-shape-pill-radius, var(--eui-button-shape-round-radius));
          --eui-button-corner-top-right: var(--eui-button-shape-pill-radius, var(--eui-button-shape-round-radius));
          --eui-button-corner-bottom-right: var(--eui-button-shape-pill-radius, var(--eui-button-shape-round-radius));
          --eui-button-corner-bottom-left: var(--eui-button-shape-pill-radius, var(--eui-button-shape-round-radius));
        }

        :host([data-eui-shape="circle"]) {
          width: var(--eui-button-height);
          padding-inline: 0;
          border-radius: var(--eui-button-shape-circle-radius);
        }

        /* States */
        :host(:disabled) {
          cursor: not-allowed;
          opacity: 0.8;
          background-color: color-mix(in srgb, var(--eui-button-bg-base), var(--eui-color-neutral-300) 35%);
          color: color-mix(in srgb, var(--eui-button-label-base), var(--eui-color-neutral-500) 40%);
          border-color: color-mix(in srgb, var(--eui-button-border-base), var(--eui-color-neutral-300) 35%);
        }

        :host(:not(:disabled):hover) {
          background-color: color-mix(in srgb, var(--eui-button-bg-base), white 8%);
          border-color: color-mix(in srgb, var(--eui-button-border-base), white 8%);
        }

        :host([data-eui-intent="secondary"]:not(:disabled):hover) {
          background-color: var(--eui-color-accent-50);
          border-color: var(--eui-color-border-default);
        }

        :host([data-eui-intent="secondary"]:not(:disabled):focus) {
          background-color: var(--eui-color-accent-50);
          border-color: var(--eui-color-border-default);
        }

        :host([data-eui-intent="secondary"]:not(:disabled):active) {
          background-color: var(--eui-color-accent-100);
          border-color: var(--eui-color-border-default);
          transform: translateY(1px);
        }

        :host(:not(:disabled):active) {
          background-color: color-mix(in srgb, var(--eui-button-bg-base), black 8%);
          border-color: color-mix(in srgb, var(--eui-button-border-base), black 12%);
          transform: translateY(1px);
        }

        /* Focus ring */
        :host(:focus) {
          box-shadow: 0 0 0 var(--eui-button-focus-ring-width-base, 2px) var(--eui-button-focus-color-base, var(--eui-button-focus-ring-color-derived-base));
        }

        :host(:focus-visible) {
          box-shadow: 0 0 0 var(--eui-button-focus-ring-width-accessible, 3px) var(--eui-button-focus-color-accessible, var(--eui-button-focus-ring-color-derived-accessible));
        }

        :host(:focus:not(:focus-visible)) {
          box-shadow: 0 0 0 var(--eui-button-focus-ring-width-base, 2px) var(--eui-button-focus-color-base, var(--eui-button-focus-ring-color-derived-base));
        }

        /* Button element inside Shadow DOM */
        button {
          all: unset;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: inherit;
          width: 100%;
          height: 100%;
          font: inherit;
          color: inherit;
          cursor: inherit;
        }

        /* Slot styling */
        ::slotted(*) {
          display: inline-flex;
          align-items: center;
        }
      </style>
      <button 
        ${disabled ? 'disabled' : ''}
        aria-disabled="${disabled ? 'true' : 'false'}"
      >
        <slot></slot>
      </button>
    `;

    // Set attributes on host element for CSS selectors
    // Only update if value changed to prevent infinite loop with attributeChangedCallback
    const currentIntent = this.getAttribute('data-eui-intent');
    if (currentIntent !== intent) {
      this.setAttribute('data-eui-intent', intent);
    }

    const currentSize = this.getAttribute('data-eui-size');
    if (currentSize !== size) {
      this.setAttribute('data-eui-size', size);
    }

    const currentShape = this.getAttribute('data-eui-shape');
    if (currentShape !== shape) {
      this.setAttribute('data-eui-shape', shape);
    }

    const currentlySelected = this.hasAttribute('data-eui-selected');
    if (currentlySelected !== selected) {
      if (selected) {
        this.setAttribute('data-eui-selected', '');
      } else {
        this.removeAttribute('data-eui-selected');
      }
    }
  }
}

// Register the custom element
// Only register if not already registered (allows for HMR in development)
if (!customElements.get('eui-button')) {
  customElements.define('eui-button', EuiButton);
}



import type { Meta, StoryObj } from '@storybook/react';

const markupExample = `<button
  class="ui-button"
  data-variant="primary"
  data-size="md"
>
  Button
</button>`;

const cssSource = `.ui-button {
  --ui-button-height: 40px;
  --ui-button-padding-inline: 20px;
  --ui-button-font-size: 0.95rem;
  --ui-button-font-weight: 600;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  height: var(--ui-button-height);
  min-width: var(--ui-button-height);
  padding-inline: var(--ui-button-padding-inline);
  border-radius: var(--env2-ui-radius-pill, 999px);
  border: 1px solid transparent;
  background-color: transparent;
  color: inherit;
  font-size: var(--ui-button-font-size);
  font-weight: var(--ui-button-font-weight);
  font-family: inherit;
  line-height: 1;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  outline: none;
}

.ui-button[data-size="md"] {
  --ui-button-height: 40px;
  --ui-button-padding-inline: 20px;
  --ui-button-font-size: 0.95rem;
  --ui-button-font-weight: 600;
}

.ui-button[data-variant="primary"] {
  background-color: var(--env2-ui-button-primary-background-base, var(--env2-ui-color-brand-primary, #066a8d));
  color: var(--env2-ui-button-primary-label-base, var(--env2-ui-color-neutral-white, #ffffff));
}

.ui-button[data-variant="secondary"] {
  background-color: var(--env2-ui-button-secondary-background-base, #ffffff);
  color: var(--env2-ui-button-secondary-label-base, var(--env2-ui-color-neutral-900, #0f172a));
  border-color: var(--env2-ui-button-secondary-border-base, var(--env2-ui-color-neutral-300, #cbd5e1));
}

.ui-button[data-state="hover"] {
  background-color: color-mix(in srgb, currentColor 6%, transparent);
  border-color: color-mix(in srgb, currentColor 12%, transparent);
}

.ui-button[data-state="active"] {
  background-color: color-mix(in srgb, currentColor 12%, transparent);
  border-color: color-mix(in srgb, currentColor 18%, transparent);
}

.ui-button[data-state="focus-visible"] {
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor, transparent 25%);
}

.ui-button[data-state="disabled"],
.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}`;

const meta: Meta = {
  title: 'HTML + CSS/Components/Button',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const Preview = () => (
  <div style={{ display: 'grid', gap: '1.5rem' }}>
    <style>{cssSource}</style>

    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <button className="ui-button" data-variant="primary" data-size="md">
        Primary
      </button>
      <button className="ui-button" data-variant="secondary" data-size="md">
        Secondary
      </button>
      <button className="ui-button" data-variant="primary" data-size="md" data-state="hover" aria-label="Hover sample">
        Hover (sample)
      </button>
      <button className="ui-button" data-variant="primary" data-size="md" data-state="active" aria-label="Active sample">
        Active (sample)
      </button>
      <button
        className="ui-button"
        data-variant="secondary"
        data-size="md"
        data-state="disabled"
        disabled
        aria-label="Disabled sample"
      >
        Disabled
      </button>
    </div>

    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <div>
        <p style={{ margin: '0 0 0.35rem', fontWeight: 600 }}>Markup (HTML)</p>
        <pre
          style={{
            background: '#0f172a',
            color: '#e2e8f0',
            padding: '12px',
            borderRadius: '8px',
            overflowX: 'auto',
            fontSize: '0.9rem'
          }}
        >
          <code>{markupExample}</code>
        </pre>
      </div>

      <div>
        <p style={{ margin: '0 0 0.35rem', fontWeight: 600 }}>CSS</p>
        <pre
          style={{
            background: '#0f172a',
            color: '#e2e8f0',
            padding: '12px',
            borderRadius: '8px',
            overflowX: 'auto',
            fontSize: '0.9rem'
          }}
        >
          <code>{cssSource}</code>
        </pre>
      </div>
    </div>
  </div>
);

export const Button: Story = {
  name: 'Button (HTML + CSS)',
  render: () => <Preview />
};

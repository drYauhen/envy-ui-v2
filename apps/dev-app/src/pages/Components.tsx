import { ButtonClean } from '@packages/tsx';
import { Select } from '@packages/tsx/select';
import { AlertBanner } from '@packages/tsx/alert-banner';
import { useState } from 'react';
import type { Key } from 'react';

function Components() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const selectItems = [
    { key: 'option1', label: 'Option 1' },
    { key: 'option2', label: 'Option 2' },
    { key: 'option3', label: 'Option 3' },
  ];

  return (
    <div>
      <h1>Component Showcase</h1>
      
      <section style={{ marginBottom: '48px' }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <ButtonClean intent="primary" size="md">Primary Button</ButtonClean>
          <ButtonClean intent="secondary" size="md">Secondary Button</ButtonClean>
          <ButtonClean intent="accent" size="md">Accent Button</ButtonClean>
          <ButtonClean intent="primary" size="sm">Small</ButtonClean>
          <ButtonClean intent="primary" size="lg">Large</ButtonClean>
          <ButtonClean intent="primary" size="md" disabled>Disabled</ButtonClean>
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2>Select</h2>
        <div style={{ maxWidth: '300px' }}>
          <Select
            label="Select an option"
            items={selectItems}
            selectedKey={selectedValue}
            onSelectionChange={(key: Key) => setSelectedValue(key as string)}
            placeholder="Choose..."
          />
          {selectedValue && (
            <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--eui-color-text-muted, #64748b)' }}>
              Selected: {selectedValue}
            </p>
          )}
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2>Alert Banner</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AlertBanner id="alert-info" variant="info" message="This is an info alert banner" />
          <AlertBanner id="alert-success" variant="success" message="This is a success alert banner" />
          <AlertBanner id="alert-warning" variant="warning" message="This is a warning alert banner" />
          <AlertBanner id="alert-error" variant="error" message="This is an error alert banner" />
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2>Form Elements</h2>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="ui-label" htmlFor="test-input">
              Text Input
            </label>
            <input
              id="test-input"
              className="ui-input"
              type="text"
              placeholder="Enter text..."
            />
          </div>
          <div>
            <label className="ui-label" htmlFor="test-textarea">
              Textarea
            </label>
            <textarea
              id="test-textarea"
              className="ui-textarea"
              placeholder="Enter multiline text..."
              rows={4}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Components;


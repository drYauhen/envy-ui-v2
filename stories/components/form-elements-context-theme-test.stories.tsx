import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Components/FormElementsContextThemeTest',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',
  maxWidth: '800px'
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  backgroundColor: '#ffffff'
} as const;

const sectionTitleStyle = {
  margin: '0 0 1rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
} as const;

const noteStyle = {
  fontSize: '0.875rem',
  color: '#64748b',
  fontStyle: 'italic',
  margin: '0 0 1rem 0'
} as const;

export const AllFormElements: Story = {
  name: 'All Form Elements - Test Context & Theme Switching',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        story: 'This story demonstrates all form elements (input, textarea, select, checkbox) in different states. Use Storybook toolbar to switch contexts (app/report) and themes (default/accessibility/print/screen) to verify that all components respond correctly to context and theme changes.'
      }
    }
  },
  render: () => (
    <div style={containerStyle}>
      <p style={noteStyle}>
        💡 Use Storybook toolbar to switch Context (app/report) and Theme (default/accessibility/print/screen) to test all components.
      </p>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Input Fields</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Text Input</span>
            <input type="text" className="eui-input" placeholder="Enter text" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Email Input</span>
            <input type="email" className="eui-input" placeholder="your.email@example.com" />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled Input</span>
            <input type="text" className="eui-input" placeholder="Disabled" disabled />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Error Input</span>
            <input type="text" className="eui-input" data-eui-state="error" placeholder="Error state" defaultValue="invalid" />
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Textarea</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Textarea</span>
            <textarea className="eui-textarea" placeholder="Enter multi-line text" rows={4} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled Textarea</span>
            <textarea className="eui-textarea" placeholder="Disabled" disabled rows={3} />
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Select</h3>
        <div style={formGroupStyle}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Select Dropdown</span>
            <select className="eui-select">
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="eui-label">Disabled Select</span>
            <select className="eui-select" disabled>
              <option value="option1">Option 1</option>
              <option value="option2" selected>Option 2</option>
            </select>
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Checkbox</h3>
        <div style={formGroupStyle}>
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" />
            <span className="eui-label">Unchecked</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" defaultChecked />
            <span className="eui-label">Checked</span>
          </label>
          
          <label className="eui-checkbox-wrapper">
            <input type="checkbox" className="eui-checkbox" disabled />
            <span className="eui-label">Disabled</span>
          </label>
        </div>
      </div>
    </div>
  )
};


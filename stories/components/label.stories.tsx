import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Label',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const formContainerStyle = {
  padding: '2rem',
  maxWidth: '500px',
  backgroundColor: '#ffffff'
} as const;

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
} as const;

const formSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
} as const;

const sectionTitleStyle = {
  margin: '0',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
} as const;

const inputStyle = {
  padding: '0.5rem 0.75rem',
  border: '1px solid #a3a3a3',
  borderRadius: '4px',
  fontSize: '1rem',
  fontFamily: 'inherit',
  backgroundColor: '#ffffff'
} as const;

const inputDisabledStyle = {
  ...inputStyle,
  backgroundColor: '#f3f4f6',
  color: '#9ca3af',
  cursor: 'not-allowed'
} as const;

export const FormExample: Story = {
  name: 'Label Usage in Forms',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={formContainerStyle}>
      <form style={formStyle}>
        <div style={formSectionStyle}>
          <h3 style={sectionTitleStyle}>Account Settings</h3>
          
          <div style={formGroupStyle}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="eui-label">Email address</span>
              <input type="email" placeholder="your.email@example.com" style={inputStyle} />
            </label>
          </div>
          
          <div style={formGroupStyle}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="eui-label">Full name</span>
              <input type="text" placeholder="John Doe" style={inputStyle} />
            </label>
          </div>
          
          <div style={formGroupStyle}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="eui-label">Phone number (disabled)</span>
              <input type="tel" placeholder="+1 234 567 8900" disabled style={inputDisabledStyle} />
            </label>
          </div>
        </div>

        <div style={formSectionStyle}>
          <h3 style={sectionTitleStyle}>Preferences</h3>
          
          <div style={formGroupStyle}>
            <label className="eui-checkbox-wrapper">
              <input type="checkbox" className="eui-checkbox" defaultChecked />
              <span className="eui-label">Email notifications</span>
            </label>
            
            <label className="eui-checkbox-wrapper">
              <input type="checkbox" className="eui-checkbox" />
              <span className="eui-label">SMS notifications</span>
            </label>
            
            <label className="eui-checkbox-wrapper">
              <input type="checkbox" className="eui-checkbox" />
              <span className="eui-label">Marketing emails</span>
            </label>
            
            <label className="eui-checkbox-wrapper">
              <input type="checkbox" className="eui-checkbox" disabled />
              <span className="eui-label">Beta features (disabled)</span>
            </label>
          </div>
        </div>

        <div style={formSectionStyle}>
          <h3 style={sectionTitleStyle}>Privacy</h3>
          
          <div style={formGroupStyle}>
            <label className="eui-checkbox-wrapper">
              <input type="checkbox" className="eui-checkbox" defaultChecked />
              <span className="eui-label">Make profile public</span>
            </label>
            
            <label className="eui-checkbox-wrapper">
              <input type="checkbox" className="eui-checkbox" />
              <span className="eui-label">Show online status</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
};


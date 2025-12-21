import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'HTML + CSS/Components/Card',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const cardContentStyle = {
  padding: '1.5rem'
} as const;

const cardTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#1e293b'
} as const;

const cardTextStyle = {
  margin: 0,
  fontSize: '0.875rem',
  color: '#64748b',
  lineHeight: 1.6
} as const;

const variantsRowStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap'
} as const;

export const Card: Story = {
  name: 'Card (HTML + CSS)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      {/* Variants comparison */}
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
          Card Variants
        </h3>
        <div style={variantsRowStyle}>
          {/* Elevated (default) */}
          <div className="eui-card" data-eui-variant="elevated" style={{ width: '280px' }}>
            <div style={cardContentStyle}>
              <h4 style={cardTitleStyle}>Elevated Card</h4>
              <p style={cardTextStyle}>
                Standard card with elevation shadow. This is the default variant.
              </p>
            </div>
          </div>

          {/* Flat */}
          <div className="eui-card" data-eui-variant="flat" style={{ width: '280px' }}>
            <div style={cardContentStyle}>
              <h4 style={cardTitleStyle}>Flat Card</h4>
              <p style={cardTextStyle}>
                Card without shadow, using border for separation.
              </p>
            </div>
          </div>

          {/* Strong */}
          <div className="eui-card" data-eui-variant="strong" style={{ width: '280px' }}>
            <div style={cardContentStyle}>
              <h4 style={cardTitleStyle}>Strong Card</h4>
              <p style={cardTextStyle}>
                Card with prominent shadow for emphasis.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};


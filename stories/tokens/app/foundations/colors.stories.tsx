import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import neutral from '../../../../tokens/app/foundations/colors/neutral.json';
import brand from '../../../../tokens/app/foundations/colors/brand.json';
import accent from '../../../../tokens/app/foundations/colors/accent.json';
import statusUi from '../../../../tokens/app/foundations/colors/status.json';
import statusApplication from '../../../../tokens/app/foundations/colors/status-application.json';
import { ColorScaleViewer } from '../../../viewers/tokens/ColorScaleViewer';
import { converter } from 'culori';

type Story = StoryObj;

const meta: Meta = {
  title: 'Tokens/App/Foundations/Colors',
  tags: ['autodocs'],
  parameters: { 
    layout: 'fullscreen',
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false,
      description: {
        component: `
Base color scales (foundations) for the App context. These are context-specific foundation tokens.

Semantic tokens reference these scales and are optimized for **app-default** context/theme by default. 
Other contexts/themes may override semantic values as needed.

**Current Context/Theme:** Use the Storybook toolbar to switch between contexts and themes.
The default view shows colors in **app-default** context/theme.

**Anchor Colors:**
- **Brand-700** is the canonical brand anchor color (perceptually dark, suitable for primary actions)
- **Accent-600** is the canonical accent anchor color (Viking Blue, suitable for interactive elements)
        `
      }
    }
  }
};

export default meta;

const scales: Record<string, Record<string, { $value: string }>> = {
  neutral: (neutral as any).eui.color.neutral,
  brand: (brand as any).eui.color.brand,
  accent: (accent as any).eui.color.accent
};

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

const renderFamily = (family: string) => (
  <ColorScaleViewer
    family={family}
    tokens={scales[family] ?? {}}
    steps={steps}
    title={`Foundations / Colors — ${family}`}
    description="Inspection-only. Base tones (50-900) projected directly from tokens/app/foundations/colors."
  />
);

// Helper to convert color to RGB for display
const toRgb = converter('rgb');

function formatRgbForDisplay(colorValue: string): string | null {
  if (!colorValue) return null;
  
  try {
    const rgb = toRgb(colorValue);
    if (rgb && typeof rgb.r === 'number' && typeof rgb.g === 'number' && typeof rgb.b === 'number') {
      const r = Math.max(0, Math.min(1, rgb.r));
      const g = Math.max(0, Math.min(1, rgb.g));
      const b = Math.max(0, Math.min(1, rgb.b));
      const r255 = Math.round(r * 255);
      const g255 = Math.round(g * 255);
      const b255 = Math.round(b * 255);
      return `RGB(${r255}, ${g255}, ${b255})`;
    }
  } catch (error) {
    // If conversion fails, return null
  }
  return null;
}

// Render UI Status Colors as scale (like other color families)
const renderStatusColors = () => {
  const statusTokens = (statusUi as any).eui.color.status;
  const statusKeys = Object.keys(statusTokens);
  const statusSteps = ['50', '100', '500', '600', '700'];
  
  const pageStyle: CSSProperties = {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    background: '#f8fafc',
    color: '#0f172a'
  };

  const cardStyle: CSSProperties = {
    padding: '1rem 1.25rem',
    background: '#ffffff',
    borderRadius: '8px'
  };

  const headingStyle: CSSProperties = { margin: 0, fontSize: '1rem', fontWeight: 700 };
  const subStyle: CSSProperties = { margin: '0.25rem 0 0', color: '#475569', fontSize: '0.9rem' };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h3 style={headingStyle}>Foundations / Colors — Status (UI)</h3>
        <p style={subStyle}>General-purpose UI feedback colors for alerts, notifications, form validation, and popups. Separate from application-specific status colors. Each status has a 5-level scale: 50-100 for backgrounds, 500 as anchor, 600-700 for text/icons.</p>
      </div>
      {statusKeys.map((statusName) => {
        const statusScale = statusTokens[statusName];
        return (
          <section key={statusName} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>status.{statusName}</h4>
              <p style={subStyle}>5-level scale for {statusName} status color.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
              {statusSteps.map((step) => {
                const token = statusScale[step];
                const oklchValue = token?.$value ?? '';
                const rgbValue = oklchValue ? formatRgbForDisplay(oklchValue) : null;
                const isAnchor = step === '500';
                
                return (
                  <div key={step} style={{ 
                    padding: '0.5rem 0.25rem 0.25rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.35rem',
                    position: 'relative'
                  }}>
                    <div
                      style={{
                        height: '96px',
                        borderRadius: '12px',
                        background: oklchValue || '#e2e8f0',
                        border: isAnchor ? '2px solid #0ea5e9' : undefined,
                        boxShadow: isAnchor ? '0 0 0 2px rgba(14, 165, 233, 0.2)' : undefined
                      }}
                    />
                    {isAnchor && (
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.5rem',
                        background: '#0ea5e9',
                        color: '#ffffff',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Anchor
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span style={{ fontWeight: 700 }}>status.{statusName}.{step}</span>
                      <span style={{ color: '#475569', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                        {oklchValue || '-'}
                      </span>
                      {rgbValue && (
                        <span style={{ 
                          color: '#94a3b8', 
                          fontSize: '0.8rem', 
                          marginTop: '0.1rem',
                          opacity: 0.7
                        }}>
                          ~ {rgbValue}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export const Neutral: Story = {
  name: 'Neutral',
  render: () => renderFamily('neutral')
};

export const Brand: Story = {
  name: 'Brand',
  render: () => renderFamily('brand')
};

export const Accent: Story = {
  name: 'Accent',
  render: () => renderFamily('accent')
};

// Render Application Status Colors as vertical list (description on left, color on right)
const renderApplicationStatusColors = () => {
  const applicationStatusTokens = (statusApplication as any).eui.color.status.application;
  const applicationStatusKeys = Object.keys(applicationStatusTokens);
  
  const pageStyle: CSSProperties = {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    background: '#f8fafc',
    color: '#0f172a'
  };

  const cardStyle: CSSProperties = {
    padding: '1rem 1.25rem',
    background: '#ffffff',
    borderRadius: '8px'
  };

  const headingStyle: CSSProperties = { margin: 0, fontSize: '1rem', fontWeight: 700 };
  const subStyle: CSSProperties = { margin: '0.25rem 0 0', color: '#475569', fontSize: '0.9rem' };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h3 style={headingStyle}>Foundations / Colors — Status (Application)</h3>
        <p style={subStyle}>Application-specific status colors for domain concepts. Used for projects, plans, workflow states, and other application-specific statuses. Separate from UI status colors. Individual colors (no scale).</p>
      </div>
      <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Application Status Colors</h4>
          <p style={subStyle}>Individual status colors for application-specific concepts.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {applicationStatusKeys.map((key) => {
            const token = applicationStatusTokens[key];
            const colorValue = token?.$value ?? '';
            const description = token?.$description ?? '';
            const rgbValue = colorValue ? formatRgbForDisplay(colorValue) : null;
            
            return (
              <div key={key} style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                {/* Left side: Color swatch */}
                <div style={{ 
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '12px',
                      background: colorValue || '#e2e8f0',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                
                {/* Right side: Description */}
                <div style={{ 
                  flex: '1 1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  minWidth: 0
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>status.application.{key}</span>
                    {description && (
                      <span style={{ 
                        color: '#64748b', 
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {description}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginTop: '0.25rem' }}>
                    <span style={{ color: '#475569', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                      {colorValue || '-'}
                    </span>
                    {rgbValue && (
                      <span style={{ 
                        color: '#94a3b8', 
                        fontSize: '0.8rem',
                        opacity: 0.7
                      }}>
                        ~ {rgbValue}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export const StatusUI: Story = {
  name: 'Status (UI)',
  render: () => renderStatusColors()
};

export const StatusApp: Story = {
  name: 'Status (Application)',
  render: () => renderApplicationStatusColors()
};


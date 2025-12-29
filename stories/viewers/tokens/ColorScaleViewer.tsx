import type { CSSProperties } from 'react';
import { converter } from 'culori';

type TokenValue = { $value?: string };

type ColorScaleViewerProps = {
  family: string;
  tokens: Record<string, TokenValue>;
  steps: string[];
  title: string;
  description: string;
};

// Setup culori converter for OKLCH to RGB
const toRgb = converter('rgb');

// Helper function to convert OKLCH to RGB and format for display (Figma UI format: 0-255)
function formatRgbForFigma(oklchValue: string): string | null {
  if (!oklchValue || !oklchValue.startsWith('oklch(')) {
    return null;
  }
  
  try {
    const rgb = toRgb(oklchValue);
    if (rgb && typeof rgb.r === 'number' && typeof rgb.g === 'number' && typeof rgb.b === 'number') {
      // Clamp values to [0, 1] range (same as we do in Style Dictionary)
      const r = Math.max(0, Math.min(1, rgb.r));
      const g = Math.max(0, Math.min(1, rgb.g));
      const b = Math.max(0, Math.min(1, rgb.b));
      const a = rgb.alpha !== undefined ? Math.max(0, Math.min(1, rgb.alpha)) : 1;
      
      // Convert to Figma UI format (0-255 range, like Figma shows in UI)
      const r255 = Math.round(r * 255);
      const g255 = Math.round(g * 255);
      const b255 = Math.round(b * 255);
      
      if (a < 1) {
        return `RGBA(${r255}, ${g255}, ${b255}, ${Math.round(a * 100)}%)`;
      }
      return `RGB(${r255}, ${g255}, ${b255})`;
    }
  } catch (error) {
    console.warn('Failed to convert OKLCH to RGB:', oklchValue, error);
  }
  
  return null;
}

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
  background: '#ffffff'
};

const headingStyle: CSSProperties = { margin: 0, fontSize: '1rem', fontWeight: 700 };
const subStyle: CSSProperties = { margin: '0.25rem 0 0', color: '#475569', fontSize: '0.9rem' };

export const ColorScaleViewer = ({ family, tokens, steps, title, description }: ColorScaleViewerProps) => (
  <div style={pageStyle}>
    <div style={cardStyle}>
      <h3 style={headingStyle}>{title}</h3>
      <p style={subStyle}>{description}</p>
    </div>
    <section style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{family}</h4>
        <p style={subStyle}>Base tones for {family}, steps 50-900.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
        {steps.map((step) => {
          const token = tokens[step];
          const oklchValue = token?.$value ?? '';
          const rgbValue = oklchValue ? formatRgbForFigma(oklchValue) : null;
          const isBaseColor = (family === 'brand' && step === '700') || (family === 'accent' && step === '600');
          
          return (
            <div key={step} style={{ padding: '0.5rem 0.25rem 0.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', position: 'relative' }}>
              <div
                style={{
                  height: '96px',
                  borderRadius: '12px',
                  background: oklchValue || '#e2e8f0',
                  border: isBaseColor ? '2px solid #0ea5e9' : undefined,
                  boxShadow: isBaseColor ? '0 0 0 2px rgba(14, 165, 233, 0.2)' : undefined
                }}
              />
              {isBaseColor && (
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
                  Base
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{ fontWeight: 700 }}>{family}.{step}</span>
                <span style={{ color: '#475569', fontSize: '0.9rem' }}>{oklchValue || '-'}</span>
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
  </div>
);

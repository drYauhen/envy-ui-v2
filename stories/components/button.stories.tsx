import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonStatesViewer } from '../viewers/components/ButtonStatesViewer';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Button',
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

export const Button: Story = {
  name: 'Button (HTML + CSS)',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Button'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <ButtonStatesViewer
        config={{ intent: 'primary', size: 'md', shape: 'default', label: 'Button' }}
        title="Primary"
        description="Primary button with all states"
      />
      <ButtonStatesViewer
        config={{ intent: 'secondary', size: 'md', shape: 'default', label: 'Button' }}
        title="Secondary"
        description="Secondary button with all states"
      />
      <ButtonStatesViewer
        config={{ intent: 'accent', size: 'md', shape: 'default', label: 'Button' }}
        title="Accent"
        description="Accent button with all states"
      />
      <ButtonStatesViewer
        config={{ intent: 'primary', size: 'md', shape: 'round', label: 'Button' }}
        title="Primary Round"
        description="Primary button with round shape"
      />
    </div>
  )
};

export const SparkleTest: Story = {
  name: 'Sparkle Test (Static)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    
    React.useEffect(() => {
      if (buttonRef.current) {
        buttonRef.current.setAttribute('data-eui-celebration', 'active');
        buttonRef.current.classList.add('eui-celebration');
      }
    }, []);
    
    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
            Sparkle Visibility Test
          </h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Button with active celebration classes - sparkles should be visible statically.
          </p>
          <button
            ref={buttonRef}
            className="eui-button eui-celebration"
            data-eui-intent="accent"
            data-eui-size="md"
            data-eui-shape="default"
            data-eui-celebration="active"
          >
            Finish Task
          </button>
        </div>
      </div>
    );
  }
};

export const CelebrationVariants: Story = {
  name: 'Celebration Animation Variants',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const [activeButton, setActiveButton] = React.useState<string | null>(null);

    const handleClick = (variant: string, e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveButton(variant);
      e.currentTarget.focus();
      setTimeout(() => setActiveButton(null), 2000);
    };

    const buttonVariants = [
      { id: 'default', label: 'Default', variant: undefined, description: 'Original: lift + shine animation' },
      { id: 'color-pulse', label: 'Color Pulse', variant: 'color-pulse', description: 'Color brightness/saturation pulse - no movement' },
      { id: 'color-glow', label: 'Color Glow', variant: 'color-glow', description: 'Color glow with shadow effects' },
      { id: 'color-wave', label: 'Color Wave', variant: 'color-wave', description: 'Color wave with hue rotation' },
      { id: 'color-particles', label: 'Color Particles', variant: 'color-particles', description: 'Color particles effect using box-shadow' },
      { id: 'color-gradient', label: 'Color Gradient', variant: 'color-gradient', description: 'Animated gradient background' }
    ];

    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
              Celebration Animation Variants
            </h3>
            <p style={{ margin: 0, color: '#64748b', marginTop: '0.5rem' }}>
              Click each button to compare different celebration animation styles inspired by YouTube subscribe button.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {buttonVariants.map(({ id, label, variant, description }) => (
              <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    className={`eui-button eui-celebration`}
                    data-eui-intent="accent"
                    data-eui-size="md"
                    data-eui-shape="default"
                    data-eui-celebration={activeButton === id ? 'active' : 'inactive'}
                    data-eui-celebration-variant={variant}
                    onClick={(e) => handleClick(id, e)}
                  >
                    {label}
                  </button>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export const AccentToFinished: Story = {
  name: 'Accent to Finished Transition',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const [isFinished, setIsFinished] = React.useState(false);
    const [isFinishing, setIsFinishing] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isFinished) {
        setIsFinishing(true);
        // Keep focus on button during animation
        e.currentTarget.focus();
        // Trigger celebration effect
        setTimeout(() => {
          setIsFinished(true);
          setIsFinishing(false);
        }, 1200); // Match animation duration
      }
    };

    const handleRestore = () => {
      setIsFinished(false);
      setIsFinishing(false);
    };

    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#0f172a' }}>
            Finish Task Button
          </h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Click the button to see it transition from accent to finished state with animation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className={`eui-button ${isFinishing ? 'eui-celebration' : ''}`}
                data-eui-intent={isFinished ? 'accent-finished' : 'accent'}
                data-eui-size="md"
                data-eui-shape="default"
                data-eui-celebration={isFinishing ? 'active' : 'inactive'}
                data-eui-finishing={isFinishing ? '' : undefined}
                onClick={handleClick}
                disabled={isFinished}
                autoFocus={isFinishing}
              >
                {isFinished ? '✓ Task Finished' : 'Finish Task'}
              </button>
                     {isFinishing && (
                       <span className="eui-celebration-sparkle"></span>
                     )}
            </div>
          </div>
          {isFinished && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '4px',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{ margin: 0, color: '#0f172a', fontSize: '0.875rem', fontWeight: 500 }}>
                Task is finished
              </p>
              <button
                onClick={handleRestore}
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.875rem',
                  color: '#066a8d',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px'
                }}
              >
                Restore
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

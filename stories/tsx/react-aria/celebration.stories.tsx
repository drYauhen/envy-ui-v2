import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CelebrationWrapper } from '../../../packages/tsx/celebration';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Celebration',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Celebration effect component using React hooks. Supports multiple trigger types: onMount, onVisible, onClick, onValueChange, and manual.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.5rem'
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
} as const;

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a'
} as const;

const rowStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  alignItems: 'center'
} as const;

const buttonStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: '1px solid #cbd5e1',
  backgroundColor: '#f8fafc',
  cursor: 'pointer',
  fontSize: '0.875rem'
} as const;

export const OnMount: Story = {
  name: 'On Mount (Auto-trigger)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="application">
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Auto-trigger on Mount</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Celebration effect triggers automatically when component mounts.
        </p>
        <div style={rowStyle}>
          <CelebrationWrapper trigger="onMount">
            <div style={{ padding: '1rem', backgroundColor: '#066a8d', color: 'white', borderRadius: '4px' }}>
              🎉 Auto-celebrating!
            </div>
          </CelebrationWrapper>
        </div>
      </div>
    </div>
  )
};

export const WithDelay: Story = {
  name: 'With Delay',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="application">
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Delayed Celebration</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Celebration effects with different delay options.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>Short delay (200ms)</p>
            <CelebrationWrapper trigger="onMount" delay="short">
              <div style={{ padding: '0.75rem 1rem', backgroundColor: '#10b981', color: 'white', borderRadius: '4px', display: 'inline-block' }}>
                Short delay
              </div>
            </CelebrationWrapper>
          </div>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>Medium delay (500ms)</p>
            <CelebrationWrapper trigger="onMount" delay="medium">
              <div style={{ padding: '0.75rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', display: 'inline-block' }}>
                Medium delay
              </div>
            </CelebrationWrapper>
          </div>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>Long delay (1000ms)</p>
            <CelebrationWrapper trigger="onMount" delay="long">
              <div style={{ padding: '0.75rem 1rem', backgroundColor: '#8b5cf6', color: 'white', borderRadius: '4px', display: 'inline-block' }}>
                Long delay
              </div>
            </CelebrationWrapper>
          </div>
        </div>
      </div>
    </div>
  )
};

export const OnClick: Story = {
  name: 'On Click',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="application">
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Click to Celebrate</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Click the button to trigger celebration effect.
        </p>
        <div style={rowStyle}>
          <CelebrationWrapper trigger="onClick" as="button">
            <div style={{ padding: '0.5rem 1rem', backgroundColor: '#066a8d', color: 'white', borderRadius: '4px' }}>
              Click me! 🎉
            </div>
          </CelebrationWrapper>
        </div>
      </div>
    </div>
  )
};

export const ValueChange: Story = {
  name: 'On Value Change',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => {
    const [count, setCount] = useState(15);

    return (
      <div style={containerStyle} data-eui-context="application">
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Value Change Trigger</h3>
          <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
            Celebration triggers when value changes. Simulates outdated tasks counter.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={rowStyle}>
              <CelebrationWrapper 
                trigger="onValueChange" 
                value={count}
                onCelebrate={() => {
                  if (count === 0) {
                    console.log('All tasks completed!');
                  }
                }}
              >
                <div style={{ 
                  padding: '0.75rem 1.5rem', 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>⚠️</span>
                  <span>{count}</span>
                  <span>projects outdated</span>
                </div>
              </CelebrationWrapper>
            </div>
            <div style={rowStyle}>
              <button
                onClick={() => setCount(Math.max(0, count - 1))}
                style={buttonStyle}
              >
                Decrease
              </button>
              <button
                onClick={() => setCount(count + 1)}
                style={buttonStyle}
              >
                Increase
              </button>
              <button
                onClick={() => setCount(0)}
                style={buttonStyle}
              >
                Set to 0
              </button>
            </div>
            {count === 0 && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: '#10b981', 
                color: 'white', 
                borderRadius: '4px',
                marginTop: '1rem'
              }}>
                🎉 Wow! Congratulations! All tasks are done!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export const OnVisible: Story = {
  name: 'On Visible (Scroll)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="application">
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>On Visible (Scroll into view)</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Scroll down to see the celebration effect trigger when element becomes visible.
        </p>
        <div style={{ height: '200vh', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ padding: '2rem', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
            <p>Scroll down...</p>
          </div>
          <CelebrationWrapper trigger="onVisible" delay="short">
            <div style={{ 
              padding: '2rem', 
              backgroundColor: '#066a8d', 
              color: 'white', 
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              🎉 Celebration triggered when scrolled into view!
            </div>
          </CelebrationWrapper>
          <div style={{ padding: '2rem', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
            <p>More content below...</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export const DifferentContent: Story = {
  name: 'Different Content Types',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="application">
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Works with Any Content</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Celebration effect works with text, buttons, icons, or any combination.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>Text only</p>
            <CelebrationWrapper trigger="onMount">
              <div style={{ padding: '0.5rem', display: 'inline-block' }}>
                Simple text
              </div>
            </CelebrationWrapper>
          </div>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>Button</p>
            <CelebrationWrapper trigger="onMount" as="button">
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#066a8d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Button with celebration
              </div>
            </CelebrationWrapper>
          </div>
          <div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>Icon + Text</p>
            <CelebrationWrapper trigger="onMount">
              <div style={{ 
                padding: '0.75rem 1rem', 
                backgroundColor: '#8b5cf6', 
                color: 'white', 
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>⭐</span>
                <span>Icon with text</span>
              </div>
            </CelebrationWrapper>
          </div>
        </div>
      </div>
    </div>
  )
};


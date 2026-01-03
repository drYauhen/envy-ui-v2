import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { getSectionParameters } from '../../.storybook/preview';

const meta: Meta = {
  title: 'HTML + CSS/Components/Skeleton',
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

export const Variants: Story = {
  name: 'Variants',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Skeleton'),
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Skeleton Variants</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Skeleton components come in three variants to mimic different content types.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Text</h4>
          <div style={{ width: '300px' }}>
            <div className="eui-skeleton" data-eui-variant="text"></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '80%', marginTop: '0.5rem' }}></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '60%', marginTop: '0.5rem' }}></div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Rectangular</h4>
          <div style={rowStyle}>
            <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '200px', height: '100px' }}></div>
            <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '150px', height: '80px' }}></div>
            <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '100px', height: '60px' }}></div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Circular</h4>
          <div style={rowStyle}>
            <div className="eui-skeleton" data-eui-variant="circular" style={{ width: '40px', height: '40px' }}></div>
            <div className="eui-skeleton" data-eui-variant="circular" style={{ width: '48px', height: '48px' }}></div>
            <div className="eui-skeleton" data-eui-variant="circular" style={{ width: '64px', height: '64px' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const CardExample: Story = {
  name: 'Card Example',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Card Skeleton Example</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Skeleton components can be composed to mimic complex layouts like cards. This example shows a card with avatar, title, description, and action buttons.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Card with Wave Animation</h4>
          <div className="eui-card" data-eui-variant="elevated" style={{ maxWidth: '400px' }}>
            <div className="eui-skeleton-group" data-eui-animation="wave" style={{ padding: '1.5rem' }}>
              {/* Header with avatar and title */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div className="eui-skeleton" data-eui-variant="circular" style={{ width: '40px', height: '40px' }}></div>
                <div style={{ flex: 1 }}>
                  <div className="eui-skeleton" data-eui-variant="text" style={{ height: '16px' }}></div>
                  <div className="eui-skeleton" data-eui-variant="text" style={{ width: '60%', height: '14px', marginTop: '0.5rem' }}></div>
                </div>
              </div>
              {/* Content */}
              <div className="eui-skeleton" data-eui-variant="text" style={{ marginBottom: '0.5rem' }}></div>
              <div className="eui-skeleton" data-eui-variant="text" style={{ width: '90%', marginBottom: '0.5rem' }}></div>
              <div className="eui-skeleton" data-eui-variant="text" style={{ width: '75%' }}></div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '80px', height: '32px', borderRadius: '4px' }}></div>
                <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '80px', height: '32px', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Same Card without Animation</h4>
          <div className="eui-card" data-eui-variant="elevated" style={{ maxWidth: '400px' }}>
            <div style={{ padding: '1.5rem' }}>
              {/* Header with avatar and title */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div className="eui-skeleton" data-eui-variant="circular" data-eui-animation="none" style={{ width: '40px', height: '40px' }}></div>
                <div style={{ flex: 1 }}>
                  <div className="eui-skeleton" data-eui-variant="text" data-eui-animation="none" style={{ height: '16px' }}></div>
                  <div className="eui-skeleton" data-eui-variant="text" data-eui-animation="none" style={{ width: '60%', height: '14px', marginTop: '0.5rem' }}></div>
                </div>
              </div>
              {/* Content */}
              <div className="eui-skeleton" data-eui-variant="text" data-eui-animation="none" style={{ marginBottom: '0.5rem' }}></div>
              <div className="eui-skeleton" data-eui-variant="text" data-eui-animation="none" style={{ width: '90%', marginBottom: '0.5rem' }}></div>
              <div className="eui-skeleton" data-eui-variant="text" data-eui-animation="none" style={{ width: '75%' }}></div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <div className="eui-skeleton" data-eui-variant="rectangular" data-eui-animation="none" style={{ width: '80px', height: '32px', borderRadius: '4px' }}></div>
                <div className="eui-skeleton" data-eui-variant="rectangular" data-eui-animation="none" style={{ width: '80px', height: '32px', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const WaveAnimation: Story = {
  name: 'Wave Animation',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Wave Animation</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          When skeletons are grouped in a container with <code style={{ padding: '0.125rem 0.25rem', backgroundColor: '#f1f5f9', borderRadius: '4px', fontSize: '0.875rem' }}>data-eui-animation="wave"</code>, 
          they animate sequentially, creating a wave effect. This makes loading feel faster and more engaging.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Text Lines with Wave</h4>
          <div className="eui-skeleton-group" data-eui-animation="wave" style={{ width: '300px' }}>
            <div className="eui-skeleton" data-eui-variant="text"></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '85%', marginTop: '0.5rem' }}></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '70%', marginTop: '0.5rem' }}></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '90%', marginTop: '0.5rem' }}></div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Mixed Elements with Wave</h4>
          <div className="eui-card" data-eui-variant="elevated">
            <div className="eui-skeleton-group" data-eui-animation="wave" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
              <div className="eui-skeleton" data-eui-variant="circular" style={{ width: '48px', height: '48px' }}></div>
              <div style={{ flex: 1 }}>
                <div className="eui-skeleton" data-eui-variant="text"></div>
                <div className="eui-skeleton" data-eui-variant="text" style={{ width: '70%', marginTop: '0.5rem' }}></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '24px', height: '24px', borderRadius: '4px' }}></div>
                <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '24px', height: '24px', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            <strong>How it works:</strong> Each skeleton in the group gets a varied animation delay (not strictly sequential). 
            This creates a more organic, less synchronized effect where elements start animating at slightly different times, 
            making the loading experience feel more natural and less mechanical. The shimmer effect appears to flow through 
            elements in a more organic pattern rather than a strict sequence.
          </p>
        </div>
      </div>
    </div>
  )
};

export const ComplexLayout: Story = {
  name: 'Complex Layout Example',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Complex Layout - User Profile Card</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Example of a complex skeleton layout mimicking a user profile card with avatar, name, bio, stats, and actions.
        </p>
        <div className="eui-card" data-eui-variant="elevated" style={{ maxWidth: '500px' }}>
          <div className="eui-skeleton-group" data-eui-animation="wave" style={{ padding: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="eui-skeleton" data-eui-variant="circular" style={{ width: '64px', height: '64px' }}></div>
              <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '20px', width: '60%' }}></div>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '14px', width: '40%', marginTop: '0.5rem' }}></div>
              </div>
            </div>
            {/* Bio */}
            <div style={{ marginBottom: '1rem' }}>
              <div className="eui-skeleton" data-eui-variant="text" style={{ marginBottom: '0.5rem' }}></div>
              <div className="eui-skeleton" data-eui-variant="text" style={{ width: '95%', marginBottom: '0.5rem' }}></div>
              <div className="eui-skeleton" data-eui-variant="text" style={{ width: '80%' }}></div>
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ flex: 1 }}>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '24px', width: '50px', marginBottom: '0.25rem' }}></div>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '14px', width: '80px' }}></div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '24px', width: '50px', marginBottom: '0.25rem' }}></div>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '14px', width: '80px' }}></div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '24px', width: '50px', marginBottom: '0.25rem' }}></div>
                <div className="eui-skeleton" data-eui-variant="text" style={{ height: '14px', width: '80px' }}></div>
              </div>
            </div>
            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div className="eui-skeleton" data-eui-variant="rectangular" style={{ flex: 1, height: '36px', borderRadius: '4px' }}></div>
              <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '36px', height: '36px', borderRadius: '4px' }}></div>
              <div className="eui-skeleton" data-eui-variant="rectangular" style={{ width: '36px', height: '36px', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Contexts: Story = {
  name: 'Contexts',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Contexts</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#64748b' }}>
          Skeleton animations are enabled in app and site contexts, but disabled in report context for print-optimized output.
        </p>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Application Context (app) - Animated</h4>
          <div style={{ width: '300px' }}>
            <div className="eui-skeleton" data-eui-variant="text"></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '80%', marginTop: '0.5rem' }}></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '60%', marginTop: '0.5rem' }}></div>
          </div>
        </div>
        <div style={sectionStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Report Context (report) - Static</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b' }}>
            In report context, skeletons are static (no animation) for print compatibility.
          </p>
          <div style={{ width: '300px' }}>
            <div className="eui-skeleton" data-eui-variant="text"></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '80%', marginTop: '0.5rem' }}></div>
            <div className="eui-skeleton" data-eui-variant="text" style={{ width: '60%', marginTop: '0.5rem' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
};


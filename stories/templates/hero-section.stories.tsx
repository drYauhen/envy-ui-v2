import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Template configurations (inline to avoid import issues)
const centeredConfig = {
  templateId: "hero-centered-v1",
  templateName: "Centered Hero",
  category: "centered",
  layout: {
    variant: "centered",
    mediaPosition: "none",
    contentAlignment: "center"
  },
  background: {
    type: "gradient",
    gradient: {
      direction: "to-bottom",
      stops: [
        { color: "var(--eui-color-brand-primary-base)", position: 0 },
        { color: "var(--eui-color-brand-primary-dark)", position: 100 }
      ]
    },
    overlay: {
      enabled: false
    }
  },
  content: {
    heading: {
      text: "Welcome to Our Platform",
      level: 1,
      maxWidth: "800px"
    },
    subheading: {
      text: "Build amazing experiences with our design system",
      maxWidth: "600px"
    },
    ctaPrimary: {
      text: "Get Started",
      href: "#",
      intent: "accent",
      size: "lg"
    },
    ctaSecondary: {
      text: "Learn More",
      href: "#",
      intent: "secondary",
      size: "lg"
    }
  },
  navigation: {
    style: "overlay",
    position: "top",
    transparent: true
  },
  responsive: {
    mobile: {
      minHeight: "400px",
      layout: "stacked",
      hideMedia: false
    },
    tablet: {
      minHeight: "500px",
      layout: "centered"
    },
    desktop: {
      minHeight: "600px",
      layout: "centered"
    }
  },
  theme: {
    context: "website",
    themeName: "default"
  }
};

const splitConfig = {
  templateId: "hero-split-v1",
  templateName: "Split Hero",
  category: "split",
  layout: {
    variant: "split",
    mediaPosition: "right",
    contentAlignment: "left"
  },
  background: {
    type: "solid",
    color: "var(--eui-color-background-base)"
  },
  content: {
    heading: {
      text: "Transform Your Business",
      level: 1,
      maxWidth: "600px"
    },
    subheading: {
      text: "Powerful tools and insights to help you grow",
      maxWidth: "500px"
    },
    ctaPrimary: {
      text: "Start Free Trial",
      href: "#",
      intent: "primary",
      size: "lg"
    },
    ctaSecondary: {
      text: "View Demo",
      href: "#",
      intent: "secondary",
      size: "lg"
    }
  },
  media: {
    type: "image",
    url: "/placeholder-hero-image.jpg",
    alt: "Hero illustration"
  },
  navigation: {
    style: "integrated",
    position: "top",
    transparent: false
  },
  responsive: {
    mobile: {
      minHeight: "500px",
      layout: "stacked",
      hideMedia: false
    },
    tablet: {
      minHeight: "550px",
      layout: "split"
    },
    desktop: {
      minHeight: "600px",
      layout: "split"
    }
  },
  theme: {
    context: "website",
    themeName: "default"
  }
};

const meta: Meta = {
  title: 'Templates/Hero Section',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'CMS-ready Hero Section templates. Templates are JSON-configurable and integrate with the token system for responsive, theme-aware layouts.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  width: '100%',
  margin: 0,
  padding: 0
} as const;

// Helper to render Hero Section from config
const renderHeroSection = (config: any) => {
  const {
    layout,
    background,
    content,
    navigation,
    responsive
  } = config;

  // Determine background styles
  let backgroundStyle: React.CSSProperties = {};
  if (background.type === 'gradient' && background.gradient) {
    const stops = background.gradient.stops.map((stop: any) => `${stop.color} ${stop.position}%`).join(', ');
    backgroundStyle.background = `linear-gradient(${background.gradient.direction === 'to-bottom' ? '180deg' : '90deg'}, ${stops})`;
  } else if (background.type === 'solid') {
    backgroundStyle.backgroundColor = background.color;
  }

  // Responsive min-height
  const minHeight = responsive?.desktop?.minHeight || '600px';

  return (
    <section
      style={{
        ...backgroundStyle,
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: layout.contentAlignment === 'center' ? 'center' : layout.contentAlignment === 'right' ? 'flex-end' : 'flex-start',
        padding: '4rem 2rem',
        position: 'relative',
        width: '100%'
      }}
      data-eui-context="website"
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: layout.variant === 'split' ? 'row' : 'column',
          alignItems: layout.variant === 'centered' ? 'center' : 'flex-start',
          gap: '2rem',
          textAlign: layout.contentAlignment === 'center' ? 'center' : 'left'
        }}
      >
        {/* Content */}
        <div
          style={{
            flex: layout.variant === 'split' ? '1' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: layout.contentAlignment === 'center' ? 'center' : 'flex-start'
          }}
        >
          {content.heading && (
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
                color: 'var(--eui-color-text-primary)',
                maxWidth: content.heading.maxWidth || '100%'
              }}
            >
              {content.heading.text}
            </h1>
          )}
          {content.subheading && (
            <p
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                margin: 0,
                color: 'var(--eui-color-text-secondary)',
                maxWidth: content.subheading.maxWidth || '100%'
              }}
            >
              {content.subheading.text}
            </p>
          )}
          {(content.ctaPrimary || content.ctaSecondary) && (
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '1rem'
              }}
            >
              {content.ctaPrimary && (
                <button
                  className="eui-button"
                  data-eui-intent={content.ctaPrimary.intent || 'primary'}
                  data-eui-size={content.ctaPrimary.size || 'lg'}
                  data-eui-shape="default"
                >
                  {content.ctaPrimary.text}
                </button>
              )}
              {content.ctaSecondary && (
                <button
                  className="eui-button"
                  data-eui-intent={content.ctaSecondary.intent || 'secondary'}
                  data-eui-size={content.ctaSecondary.size || 'lg'}
                  data-eui-shape="default"
                >
                  {content.ctaSecondary.text}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Media (for split layout) */}
        {layout.variant === 'split' && layout.mediaPosition !== 'none' && (
          <div
            style={{
              flex: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: 'var(--eui-color-background-elevated)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--eui-color-text-tertiary)'
              }}
            >
              Media Placeholder
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const CenteredHero: Story = {
  name: 'Centered Hero (v1)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="website">
      {renderHeroSection(centeredConfig)}
    </div>
  )
};

export const SplitHero: Story = {
  name: 'Split Hero (v1)',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={containerStyle} data-eui-context="website">
      {renderHeroSection(splitConfig)}
    </div>
  )
};

export const TemplateComparison: Story = {
  name: 'Template Comparison',
  parameters: {
    docs: {
      canvas: { sourceState: 'none' },
      codePanel: false
    }
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <div>
        <h2 style={{ marginBottom: '1rem', padding: '0 2rem' }}>Centered Hero</h2>
        {renderHeroSection(centeredConfig)}
      </div>
      <div>
        <h2 style={{ marginBottom: '1rem', padding: '0 2rem' }}>Split Hero</h2>
        {renderHeroSection(splitConfig)}
      </div>
    </div>
  )
};


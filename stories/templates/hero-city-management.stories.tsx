import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Hero Section for city management (GAVTEK)
// Visualization concepts:
// 1. Networks and connections (communication networks, transportation networks)
// 2. Urban infrastructure (buildings, roads, parks)
// 3. Communities (people, interaction, urban life)
// 4. Smart city (technology, data, analytics)

const cityManagementConfig = {
  templateId: "hero-city-management-v1",
  templateName: "City Management Hero",
  category: "split",
  layout: {
    variant: "split",
    mediaPosition: "right",
    contentAlignment: "left"
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
      enabled: true,
      type: "dark",
      opacity: 0.3
    }
  },
  content: {
    heading: {
      text: "Next-Generation City Management",
      level: 1,
      maxWidth: "600px"
    },
    subheading: {
      text: "Unified platform for city administration. Connecting communities, infrastructure, and technology for efficient governance.",
      maxWidth: "550px"
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
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1000&h=750&fit=crop&q=80",
    alt: "Small town community park",
    position: "center"
  },
  responsive: {
    mobile: {
      minHeight: "500px",
      layout: "stacked"
    },
    desktop: {
      minHeight: "650px",
      layout: "split"
    }
  }
};

// Alternative variant: centered with background image
const cityManagementCenteredConfig = {
  templateId: "hero-city-management-centered-v1",
  templateName: "City Management Hero (Centered)",
  category: "centered",
  layout: {
    variant: "centered",
    mediaPosition: "background",
    contentAlignment: "center"
  },
  background: {
    type: "image",
    image: {
      url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop&q=80",
      alt: "Small town street with people",
      position: "center",
      size: "cover"
    },
    overlay: {
      enabled: true,
      type: "dark",
      opacity: 0.6
    }
  },
  content: {
    heading: {
      text: "Connecting Cities and Communities",
      level: 1,
      maxWidth: "800px"
    },
    subheading: {
      text: "Innovative solutions for managing urban infrastructure and developing local communities",
      maxWidth: "700px"
    },
    ctaPrimary: {
      text: "View Demo",
      href: "#",
      intent: "accent",
      size: "lg"
    }
  }
};

// SVG illustration for city network (embedded)
const CityNetworkSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 400"
    style={{ maxHeight: '400px' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background elements - buildings */}
    <rect x="50" y="200" width="80" height="150" fill="var(--eui-color-background-elevated)" opacity="0.3" rx="4"/>
    <rect x="150" y="180" width="80" height="170" fill="var(--eui-color-background-elevated)" opacity="0.3" rx="4"/>
    <rect x="250" y="220" width="80" height="130" fill="var(--eui-color-background-elevated)" opacity="0.3" rx="4"/>
    <rect x="350" y="190" width="80" height="160" fill="var(--eui-color-background-elevated)" opacity="0.3" rx="4"/>
    <rect x="450" y="210" width="80" height="140" fill="var(--eui-color-background-elevated)" opacity="0.3" rx="4"/>
    
    {/* Networks and connections */}
    <line x1="90" y1="250" x2="190" y2="230" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.6"/>
    <line x1="190" y1="230" x2="290" y2="270" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.6"/>
    <line x1="290" y1="270" x2="390" y2="240" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.6"/>
    <line x1="390" y1="240" x2="490" y2="260" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.6"/>
    
    {/* Network nodes */}
    <circle cx="90" cy="250" r="8" fill="var(--eui-color-brand-primary-base)"/>
    <circle cx="190" cy="230" r="8" fill="var(--eui-color-brand-primary-base)"/>
    <circle cx="290" cy="270" r="8" fill="var(--eui-color-brand-primary-base)"/>
    <circle cx="390" cy="240" r="8" fill="var(--eui-color-brand-primary-base)"/>
    <circle cx="490" cy="260" r="8" fill="var(--eui-color-brand-primary-base)"/>
    
    {/* Additional connections (diagonal) */}
    <line x1="90" y1="250" x2="290" y2="270" stroke="var(--eui-color-accent-primary)" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4"/>
    <line x1="190" y1="230" x2="390" y2="240" stroke="var(--eui-color-accent-primary)" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4"/>
    
    {/* Central node (community) */}
    <circle cx="300" cy="150" r="20" fill="var(--eui-color-brand-primary-base)" opacity="0.8"/>
    <circle cx="300" cy="150" r="30" fill="var(--eui-color-brand-primary-base)" opacity="0.2"/>
    <line x1="300" y1="150" x2="90" y2="250" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.5"/>
    <line x1="300" y1="150" x2="190" y2="230" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.5"/>
    <line x1="300" y1="150" x2="290" y2="270" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.5"/>
    <line x1="300" y1="150" x2="390" y2="240" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.5"/>
    <line x1="300" y1="150" x2="490" y2="260" stroke="var(--eui-color-brand-primary-base)" strokeWidth="2" opacity="0.5"/>
  </svg>
);

const renderHeroSection = (config: any) => {
  const {
    layout,
    background,
    content,
    media,
    responsive
  } = config;

  let backgroundStyle: React.CSSProperties = {};
  if (background.type === 'gradient' && background.gradient) {
    const stops = background.gradient.stops.map((stop: any) => `${stop.color} ${stop.position}%`).join(', ');
    backgroundStyle.background = `linear-gradient(180deg, ${stops})`;
    if (background.overlay?.enabled) {
      backgroundStyle.position = 'relative';
    }
  } else if (background.type === 'solid') {
    backgroundStyle.backgroundColor = background.color;
  } else if (background.type === 'image' && background.image) {
    backgroundStyle.backgroundImage = `url(${background.image.url})`;
    backgroundStyle.backgroundSize = background.image.size || 'cover';
    backgroundStyle.backgroundPosition = background.image.position || 'center';
    backgroundStyle.backgroundRepeat = 'no-repeat';
    backgroundStyle.position = 'relative';
  } else if (background.type === 'video' && background.video) {
    backgroundStyle.position = 'relative';
  }

  const minHeight = responsive?.desktop?.minHeight || '600px';

  return (
    <section
      style={{
        ...backgroundStyle,
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: layout.contentAlignment === 'center' ? 'center' : 'flex-start',
        padding: '4rem 2rem',
        position: 'relative',
        width: '100%'
      }}
      data-eui-context="website"
    >
      {background.type === 'video' && background.video && (
        <video
          src={background.video.url}
          poster={background.video.poster}
          autoPlay={background.video.autoplay !== false}
          loop={background.video.loop !== false}
          muted={background.video.muted !== false}
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: background.video.position || 'center',
            zIndex: 0
          }}
        />
      )}
      {background.overlay?.enabled && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: background.overlay.type === 'dark' 
              ? `rgba(0, 0, 0, ${background.overlay.opacity || 0.6})` 
              : `rgba(255, 255, 255, ${background.overlay.opacity || 0.2})`,
            zIndex: 1
          }}
        />
      )}
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: layout.variant === 'split' ? 'row' : 'column',
          alignItems: layout.variant === 'centered' ? 'center' : 'flex-start',
          gap: '2rem',
          textAlign: layout.contentAlignment === 'center' ? 'center' : 'left',
          position: 'relative',
          zIndex: 2
        }}
      >
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              {media?.type === 'image' && media.url && (
                <img
                  src={media.url}
                  alt={media.alt || 'Hero image'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: media.position || 'center'
                  }}
                />
              )}
              {media?.type === 'video' && media.url && (
                <video
                  src={media.url}
                  autoPlay={media.autoplay !== false}
                  loop={media.loop !== false}
                  muted={media.muted !== false}
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: media.position || 'center'
                  }}
                />
              )}
              {media?.type === 'gif' && media.url && (
                <img
                  src={media.url}
                  alt={media.alt || 'Hero animation'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: media.position || 'center'
                  }}
                />
              )}
              {(!media || media.type === 'illustration' || !media.url) && (
                <CityNetworkSVG />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const meta: Meta = {
  title: 'Templates/City Management/Hero Section',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Hero Section template for city management products with centered layout.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

export const ManagementCentered: Story = {
  name: 'Management-Centered Layout',
  render: () => renderHeroSection(cityManagementCenteredConfig)
};


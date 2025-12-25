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
  title: 'Templates/Hero Section/City Management',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Hero Section templates for city management products. Includes visualizations of networks, infrastructure, and communities.'
      }
    }
  }
};

export default meta;

type Story = StoryObj;

export const CityManagementSplit: Story = {
  name: 'City Management (Split Layout)',
  render: () => renderHeroSection(cityManagementConfig)
};

export const CityManagementCentered: Story = {
  name: 'City Management (Centered Layout)',
  render: () => renderHeroSection(cityManagementCenteredConfig)
};

// Variant with video background
const cityManagementVideoConfig = {
  ...cityManagementConfig,
  templateId: "hero-city-management-video-v1",
  templateName: "City Management Hero (Video Background)",
  media: {
    type: "video",
    url: "https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_25fps.mp4",
    autoplay: true,
    loop: true,
    muted: true,
    position: "center"
  }
};

// Variant with GIF animation
const cityManagementGifConfig = {
  ...cityManagementConfig,
  templateId: "hero-city-management-gif-v1",
  templateName: "City Management Hero (GIF Animation)",
  media: {
    type: "gif",
    url: "https://media.giphy.com/media/3o7aD2saQqLEoe2X4s/giphy.gif",
    alt: "Community park animation",
    position: "center"
  }
};

// Variant with different city image - park scene
const cityManagementImageConfig = {
  ...cityManagementConfig,
  templateId: "hero-city-management-image-v1",
  templateName: "City Management Hero (Park Scene)",
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&h=750&fit=crop&q=80",
    alt: "Community park with people",
    position: "center"
  }
};

// Variant with small town street
const cityManagementStreetConfig = {
  ...cityManagementConfig,
  templateId: "hero-city-management-street-v1",
  templateName: "City Management Hero (Town Street)",
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&h=750&fit=crop&q=80",
    alt: "Small town street with community",
    position: "center"
  }
};

// Variant with community gathering
const cityManagementCommunityConfig = {
  ...cityManagementConfig,
  templateId: "hero-city-management-community-v1",
  templateName: "City Management Hero (Community)",
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&h=750&fit=crop&q=80",
    alt: "Community gathering in public space",
    position: "center"
  }
};

export const CityManagementWithVideo: Story = {
  name: 'City Management (Video Background)',
  render: () => renderHeroSection(cityManagementVideoConfig)
};

export const CityManagementWithGif: Story = {
  name: 'City Management (GIF Animation)',
  render: () => renderHeroSection(cityManagementGifConfig)
};

export const CityManagementWithImage: Story = {
  name: 'City Management (Park Scene)',
  render: () => renderHeroSection(cityManagementImageConfig)
};

export const CityManagementStreet: Story = {
  name: 'City Management (Town Street)',
  render: () => renderHeroSection(cityManagementStreetConfig)
};

export const CityManagementCommunity: Story = {
  name: 'City Management (Community Gathering)',
  render: () => renderHeroSection(cityManagementCommunityConfig)
};

// Variant with video background (centered layout) - small town
const cityManagementVideoBackgroundConfig = {
  ...cityManagementCenteredConfig,
  templateId: "hero-city-management-video-bg-v1",
  templateName: "City Management Hero (Video Background)",
  background: {
    type: "video",
    video: {
      url: "https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_25fps.mp4",
      poster: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop&q=80",
      autoplay: true,
      loop: true,
      muted: true,
      position: "center"
    },
    overlay: {
      enabled: true,
      type: "dark",
      opacity: 0.7
    }
  }
};

export const CityManagementVideoBackground: Story = {
  name: 'City Management (Video Background - Centered)',
  render: () => renderHeroSection(cityManagementVideoBackgroundConfig)
};

export const VisualConcepts: Story = {
  name: 'Visual Concepts',
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }} data-eui-context="website">
      <h2 style={{ marginBottom: '2rem' }}>Recommended Visual Concepts</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--eui-color-background-elevated)', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>1. Networks and Connections</h3>
          <p>Abstract visualization of communication and transportation networks connecting different parts of the city.</p>
          <p><strong>Style:</strong> Minimalist, lines and nodes, emphasis on connections</p>
        </div>
        
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--eui-color-background-elevated)', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>2. Urban Infrastructure</h3>
          <p>Modern buildings, roads, parks - elements of urban environment unified into a single system.</p>
          <p><strong>Style:</strong> Photorealistic or isometric, emphasis on architecture</p>
        </div>
        
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--eui-color-background-elevated)', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>3. Communities and People</h3>
          <p>People interacting with urban environment, public spaces, city life.</p>
          <p><strong>Style:</strong> Illustrative, friendly, emphasis on human factor</p>
        </div>
        
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--eui-color-background-elevated)', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>4. Smart City</h3>
          <p>Technology, data, analytics - digital solutions for city management.</p>
          <p><strong>Style:</strong> Technological, futuristic, emphasis on innovation</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--eui-color-background-elevated)', borderRadius: '8px' }}>
        <h3>Example SVG Illustration (embedded in template)</h3>
        <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
          <CityNetworkSVG />
        </div>
      </div>
    </div>
  )
};


import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Import SVG files as React components
const FullLogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 90">
    <path fill="currentColor" d="M96.5 36.8a3.47 3.47 0 0 1 3.61-3.57h11.08c2.28 0 3.62 1.32 3.62 3.3 0 2-1.34 3.32-3.62 3.32h-7.45v5.7h6.83c2.28 0 3.6 1.28 3.6 3.31 0 2.03-1.32 3.3-3.6 3.3h-6.83v5.89h7.72c2.28 0 3.61 1.24 3.61 3.3 0 2.07-1.33 3.34-3.61 3.34H100.1a3.48 3.48 0 0 1-3.61-3.59V36.83m29.61-.07c0-2.52 1.52-3.8 3.61-3.8 1.93 0 2.59.82 5 3.85l12.02 14.85h.08v-14.9c0-2.52 1.52-3.8 3.62-3.8s3.61 1.28 3.61 3.8v24.36c0 2.52-1.5 3.8-3.6 3.8-1.93 0-2.64-.81-5-3.84L133.41 46.2h-.1v14.91c0 2.52-1.5 3.8-3.6 3.8-2.11 0-3.62-1.28-3.62-3.8V36.76Zm57.6-.58c.66-1.63 1.28-3.26 4.02-3.26a3.49 3.49 0 0 1 3.52 3.5c-.13.9-.39 1.77-.76 2.6l-9.02 22.06c-.7 1.77-1.34 3.8-4.02 3.8-2.68 0-3.3-2.03-4.01-3.8l-8.88-22.02a9.83 9.83 0 0 1-.76-2.6 3.47 3.47 0 0 1 3.53-3.5c2.72 0 3.35 1.63 4.02 3.26l6.16 16.07 6.2-16.1Zm24.55 24.94c0 2.52-1.52 3.8-3.62 3.8s-3.61-1.28-3.61-3.8V36.76c0-2.52 1.5-3.8 3.61-3.8 2.1 0 3.62 1.28 3.62 3.8v24.36Zm14.28-4.72c1.78 0 4.07 1.82 7.81 1.82 2.81 0 3.84-1.41 3.84-2.96 0-2.39-2.77-2.87-6.87-4.2-3.75-1.18-7.64-2.77-7.64-8.47 0-6.84 5.4-10.06 11.42-10.06 5.8 0 9.01 1.99 9.01 4.72a3.13 3.13 0 0 1-3.2 3.36c-2.33 0-3.08-1.2-6.16-1.2-1.97 0-3.31 1.02-3.31 2.57 0 1.8 1.78 2.02 6.78 3.65 3.93 1.28 7.74 3.26 7.74 9.23 0 7.25-5.41 10.5-12.15 10.5-4.24 0-10.67-1.62-10.67-5.16 0-1.93 1.2-3.8 3.39-3.8m38.28 4.72c0 2.52-1.51 3.8-3.62 3.8-2.1 0-3.62-1.28-3.62-3.8V36.76c0-2.52 1.52-3.8 3.62-3.8s3.62 1.28 3.62 3.8v24.36Zm19.37-12.17c0 4.98 2.27 9.77 7.85 9.77 5.59 0 7.86-4.82 7.86-9.77 0-4.95-2.28-9.78-7.86-9.78s-7.85 4.82-7.85 9.78Zm23.48 0c0 9.98-6.2 16.42-15.63 16.42-9.42 0-15.63-6.44-15.63-16.42s6.21-16.42 15.63-16.42c9.42 0 15.63 6.44 15.63 16.42ZM14.39 78.93a5.18 5.18 0 0 1-5.83-2.02 48.33 48.33 0 0 1-6.19-12.63C-5.86 38.63 8.55 11.11 34.52 2.95A49.93 49.93 0 0 1 47.62.7 5.1 5.1 0 1 1 48 10.88a38.65 38.65 0 0 0-33.4 21 38.54 38.54 0 0 0 2.5 39.32 5.04 5.04 0 0 1-2.71 7.7M49.54 88.9a36.73 36.73 0 0 1-28.3-25.2 36.27 36.27 0 0 1 13.79-40.35 5.2 5.2 0 0 1 7.17 1.17 5.07 5.07 0 0 1-1.18 7.12 26.22 26.22 0 0 0-9.95 29.08 26.79 26.79 0 0 0 36.84 16.13 5.2 5.2 0 0 1 6.87 2.44 5.08 5.08 0 0 1-2.45 6.8 37.15 37.15 0 0 1-22.79 2.81ZM49.83 58.23a5.01 5.01 0 0 1-5.04-5.08 5.5 5.5 0 0 1 5.24-5.43 13.38 13.38 0 0 0 12.72-13.17 12.1 12.1 0 0 0-2.6-7.7 5.32 5.32 0 0 1 .92-7.39 5.44 5.44 0 0 1 3.41-1.2 4.96 4.96 0 0 1 3.93 1.88 22.2 22.2 0 0 1 4.82 14.08 23.93 23.93 0 0 1-6.88 16.63 23.9 23.9 0 0 1-16.31 7.4h-.2"></path>
  </svg>
);

const IconOnlySVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 90">
    <path fill="currentColor" d="M14.39 78.88a5.18 5.18 0 0 1-5.83-2.02 48.33 48.33 0 0 1-6.19-12.62C-5.86 38.58 8.55 11.06 34.52 2.9A49.93 49.93 0 0 1 47.62.64a5.1 5.1 0 1 1 .39 10.2 38.65 38.65 0 0 0-33.4 21 38.54 38.54 0 0 0 2.49 39.32 5.04 5.04 0 0 1-2.71 7.71M49.54 88.86a36.73 36.73 0 0 1-28.3-25.2A36.27 36.27 0 0 1 35.03 23.3a5.2 5.2 0 0 1 7.17 1.16 5.07 5.07 0 0 1-1.18 7.12 26.22 26.22 0 0 0-9.95 29.09A26.73 26.73 0 0 0 67.91 76.8a5.2 5.2 0 0 1 6.87 2.45 5.08 5.08 0 0 1-2.45 6.79 37.15 37.15 0 0 1-22.79 2.82ZM49.83 58.18a5.01 5.01 0 0 1-5.04-5.08 5.5 5.5 0 0 1 5.24-5.42A13.38 13.38 0 0 0 62.75 34.5c.05-2.8-.87-5.51-2.6-7.7a5.32 5.32 0 0 1 .92-7.4 5.44 5.44 0 0 1 3.41-1.2 4.96 4.96 0 0 1 3.93 1.89 22.2 22.2 0 0 1 4.82 14.07 23.93 23.93 0 0 1-6.88 16.64 23.9 23.9 0 0 1-16.31 7.4h-.2"></path>
  </svg>
);

const meta: Meta = {
  title: 'HTML + CSS/Components/Logo',
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj;

export const Variants: Story = {
  name: 'Variants',
  render: () => {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Icon Only</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="eui-logo" data-eui-variant="icon-only" data-eui-size="xs" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlySVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only" data-eui-size="sm" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlySVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only" data-eui-size="md" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlySVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only" data-eui-size="lg" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlySVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only" data-eui-size="xl" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlySVG /></span>
            </a>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Full Logo</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="xs" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="sm" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="md" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="lg" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="xl" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export const ColorVariants: Story = {
  name: 'Color Variants',
  render: () => {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Light Background</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="md" data-eui-color="default" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="md" data-eui-color="grayscale" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="md" data-eui-color="monochrome" style={{ color: '#e11d48' }} aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
          </div>
        </div>

        <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>Dark Background</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="md" data-eui-color="inverse" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full" data-eui-size="md" data-eui-color="grayscale" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullLogoSVG /></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { getSectionParameters } from '../../.storybook/preview';

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

const FullColorLogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93 31">
    <path fill="#7B7979" d="M7.405,24.524c-0.598,0.188-1.275-0.026-1.645-0.567c-0.751-1.096-1.338-2.297-1.746-3.571
	C1.687,13.125,5.757,5.344,13.09,3.039c1.202-0.378,2.447-0.594,3.698-0.641c0.804-0.031,1.478,0.59,1.51,1.386
	c0.031,0.795-0.597,1.464-1.4,1.496c-0.988,0.036-1.976,0.206-2.929,0.507C8.167,7.611,4.948,13.77,6.789,19.514
	c0.324,1.01,0.79,1.962,1.382,2.829c0.451,0.658,0.276,1.554-0.39,2C7.663,24.422,7.536,24.482,7.405,24.524"/>
    <path fill="#1080A8" d="M17.34,27.344c-3.801-0.726-6.866-3.457-8-7.125c-0.498-1.603-0.588-3.323-0.267-4.977
	c0.511-2.603,1.987-4.889,4.16-6.434c0.655-0.464,1.563-0.316,2.033,0.33c0.467,0.648,0.318,1.547-0.335,2.013
	c-1.566,1.114-2.631,2.761-2.995,4.638c-0.234,1.193-0.169,2.434,0.187,3.586c0.82,2.646,3.03,4.614,5.77,5.139
	c1.581,0.303,3.184,0.103,4.632-0.576c0.726-0.34,1.594-0.032,1.94,0.688c0.341,0.719,0.031,1.579-0.697,1.92
	C21.755,27.486,19.532,27.762,17.34,27.344"/>
    <path fill="#99D648" d="M17.412,18.669c-0.383,0-0.74-0.146-1.007-0.414c-0.268-0.27-0.415-0.633-0.413-1.022
	c0.005-0.814,0.667-1.502,1.478-1.533c0.953-0.037,1.851-0.444,2.532-1.149c0.679-0.706,1.058-1.623,1.061-2.581
	c0.006-0.804-0.249-1.556-0.734-2.17c-0.5-0.626-0.382-1.565,0.26-2.093c0.275-0.223,0.618-0.348,0.962-0.348
	c0.438,0,0.845,0.195,1.111,0.534c0.897,1.125,1.366,2.501,1.359,3.978c-0.011,1.392-0.441,2.732-1.25,3.875
	c-0.214,0.3-0.444,0.579-0.688,0.83c-1.236,1.284-2.874,2.027-4.614,2.094C17.468,18.669,17.414,18.669,17.412,18.669"/>
    <path fill="#231F20" d="M31.853,12.011c0-0.649,0.493-1.011,1.021-1.011H36c0.643,0,1.023,0.375,1.023,0.937
	c0,0.587-0.38,0.936-1.023,0.936h-2.104v1.61h1.929c0.643,0,1.02,0.362,1.02,0.936c0,0.574-0.377,0.937-1.02,0.937h-1.929v1.662
	h2.179c0.644,0,1.023,0.349,1.023,0.937c0,0.562-0.379,0.936-1.023,0.936h-3.202c-0.527,0-1.021-0.362-1.021-1.012V12.011"/>
    <path fill="#231F20" d="M40.211,11.999c0-0.712,0.428-1.074,1.021-1.074c0.542,0,0.731,0.238,1.412,1.086l3.393,4.207
	h0.023v-4.219c0-0.712,0.428-1.074,1.02-1.074c0.596,0,1.021,0.362,1.021,1.074v6.888c0,0.714-0.426,1.076-1.021,1.076
	c-0.539,0-0.742-0.237-1.41-1.087l-3.392-4.207h-0.025v4.217c0,0.714-0.428,1.076-1.021,1.076c-0.593,0-1.021-0.362-1.021-1.076
	V11.999"/>
    <path fill="#231F20" d="M56.475,11.835c0.189-0.46,0.365-0.911,1.135-0.911c0.592,0,0.996,0.474,0.996,0.986
	c0,0.188-0.152,0.586-0.215,0.736l-2.547,6.24c-0.201,0.5-0.377,1.076-1.135,1.076c-0.757,0-0.934-0.576-1.135-1.076l-2.496-6.24
	c-0.062-0.15-0.216-0.548-0.216-0.736c0-0.513,0.405-0.986,0.995-0.986c0.771,0,0.948,0.45,1.138,0.911l1.738,4.544L56.475,11.835"
	/>
    <path fill="#231F20" d="M63.408,18.887c0,0.714-0.43,1.076-1.021,1.076c-0.594,0-1.021-0.362-1.021-1.076v-6.888
	c0-0.712,0.427-1.074,1.021-1.074c0.592,0,1.021,0.362,1.021,1.074V18.887"/>
    <path fill="#231F20" d="M67.441,17.552c0.504,0,1.159,0.514,2.205,0.514c0.795,0,1.085-0.398,1.085-0.837
	c0-0.675-0.782-0.811-1.942-1.186c-1.06-0.337-2.154-0.787-2.154-2.397c0-1.935,1.523-2.846,3.227-2.846
	c1.64,0,2.545,0.562,2.545,1.335c0,0.548-0.363,0.949-0.905,0.949c-0.657,0-0.872-0.338-1.74-0.338
	c-0.554,0-0.934,0.287-0.934,0.726c0,0.512,0.505,0.575,1.916,1.035c1.108,0.362,2.183,0.923,2.183,2.609
	c0,2.049-1.527,2.971-3.43,2.971c-1.198,0-3.014-0.462-3.014-1.46C66.482,18.079,66.822,17.552,67.441,17.552"/>
    <path fill="#231F20" d="M78.244,18.887c0,0.714-0.428,1.076-1.021,1.076c-0.594,0-1.022-0.362-1.022-1.076v-6.888
	c0-0.712,0.429-1.074,1.022-1.074c0.593,0,1.021,0.362,1.021,1.074V18.887"/>
    <path fill="#231F20" d="M83.715,15.443c0,1.411,0.643,2.773,2.219,2.773s2.219-1.362,2.219-2.773
	c0-1.409-0.643-2.77-2.219-2.77S83.715,14.034,83.715,15.443z M90.348,15.443c0,2.823-1.754,4.645-4.414,4.645
	s-4.411-1.822-4.411-4.645c0-2.819,1.751-4.643,4.411-4.643S90.348,12.624,90.348,15.443"/>
  </svg>
);

const IconOnlyColorSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.96 10.6">
    <defs>
      <style>{`.cls-1{fill:#7c7a7a;}.cls-2{fill:#1280a8;}.cls-3{fill:#9bcb4c;}`}</style>
    </defs>
    <path className="cls-1" d="M4.28,12a.62.62,0,0,1-.7-.24,6,6,0,0,1-.73-1.5A5.82,5.82,0,0,1,6.67,3a5.94,5.94,0,0,1,1.56-.27.61.61,0,1,1,0,1.22A4.36,4.36,0,0,0,7,4.14,4.61,4.61,0,0,0,4,9.93a4.38,4.38,0,0,0,.58,1.19.6.6,0,0,1-.17.84.55.55,0,0,1-.15.08" transform="translate(-2.57 -2.71)"/>
    <path className="cls-2" d="M8.46,13.23a4.39,4.39,0,0,1-3.37-3A4.28,4.28,0,0,1,5,8.13,4.37,4.37,0,0,1,6.73,5.41a.63.63,0,0,1,.86.14.61.61,0,0,1-.14.85,3.17,3.17,0,0,0-1.27,2,3.22,3.22,0,0,0,.08,1.51,3.18,3.18,0,0,0,4.39,1.92.63.63,0,0,1,.82.29.61.61,0,0,1-.3.81,4.35,4.35,0,0,1-2.71.34" transform="translate(-2.57 -2.71)"/>
    <path className="cls-3" d="M8.49,9.57A.58.58,0,0,1,7.9,9a.65.65,0,0,1,.62-.65,1.63,1.63,0,0,0,1.07-.48A1.61,1.61,0,0,0,10,6.75a1.39,1.39,0,0,0-.31-.92A.63.63,0,0,1,9.83,5a.69.69,0,0,1,.41-.15.61.61,0,0,1,.47.23,2.63,2.63,0,0,1,.57,1.68,2.83,2.83,0,0,1-.53,1.63,2.45,2.45,0,0,1-.29.35,2.85,2.85,0,0,1-1.94.88h0" transform="translate(-2.57 -2.71)"/>
  </svg>
);

const LoadingSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85.5 84.8">
    <style type="text/css">
      {`
        .env-logo-layer1 {
          fill: #7C7A7A;
          animation: cycle1 2s linear infinite;
        }

        .env-logo-layer2 {
          fill: #1781A8;
          animation: cycle2 2s linear infinite;
        }

        .env-logo-layer3 {
          fill: #9CCC4D;
          animation: cycle3 2s linear infinite;
        }

        @keyframes cycle1 {
          0%, 65% {
            fill: #7c7a7a;
          }
          75%, 82% {
            fill: #e4e4e4;
          }
          92%, 100% {
            fill: #7c7a7a;
          }
        }

        @keyframes cycle2 {
          0%, 40% {
            fill: #1781a8;
          }
          50%, 86% {
            fill: #c6eaf7;
          }
          96%, 100% {
            fill: #1781a8;
          }
        }

        @keyframes cycle3 {
          0%, 15% {
            fill: #9ccc4d;
          }
          25%, 90% {
            fill: #ebf4db;
          }
          100% {
            fill: #9ccc4d;
          }
        }
      `}
    </style>
    <path className="env-logo-layer1" d="M26,65.3c-1.5,0.5-3.1-0.1-4.1-1.4c-1.9-2.7-3.3-5.7-4.3-8.8C11.9,37.2,21.9,18.1,40,12.4
      c3-0.9,6-1.5,9.1-1.6c2-0.1,3.6,1.5,3.7,3.4c0.1,2-1.5,3.6-3.4,3.7c-2.4,0.1-4.9,0.5-7.2,1.3C27.9,23.6,19.9,38.8,24.5,53
      c0.8,2.5,1.9,4.8,3.4,7c1.1,1.6,0.7,3.8-1,4.9C26.6,65.1,26.3,65.2,26,65.3"/>
    <path className="env-logo-layer2" d="M50.5,72.3c-9.4-1.8-16.9-8.5-19.7-17.6c-1.2-3.9-1.4-8.2-0.7-12.3c1.3-6.4,4.9-12,10.2-15.9
      c1.6-1.1,3.9-0.8,5,0.8c1.2,1.6,0.8,3.8-0.8,5c-3.9,2.7-6.5,6.8-7.4,11.4c-0.6,2.9-0.4,6,0.5,8.8c2,6.5,7.5,11.4,14.2,12.7
      c3.9,0.7,7.8,0.3,11.4-1.4c1.8-0.8,3.9-0.1,4.8,1.7c0.8,1.8,0.1,3.9-1.7,4.7C61.3,72.6,55.9,73.3,50.5,72.3"/>
    <path className="env-logo-layer3" d="M50.6,50.9c-0.9,0-1.8-0.4-2.5-1c-0.7-0.7-1-1.6-1-2.5c0-2,1.6-3.7,3.6-3.8
      c2.3-0.1,4.6-1.1,6.2-2.8c1.7-1.7,2.6-4,2.6-6.4c0-2-0.6-3.8-1.8-5.3c-1.2-1.5-0.9-3.9,0.6-5.2c0.7-0.5,1.5-0.9,2.4-0.9
      c1.1,0,2.1,0.5,2.7,1.3c2.2,2.8,3.4,6.2,3.3,9.8c0,3.4-1.1,6.7-3.1,9.5c-0.5,0.7-1.1,1.4-1.7,2c-3,3.2-7.1,5-11.4,5.2
      C50.8,50.9,50.6,50.9,50.6,50.9"/>
  </svg>
);

const meta: Meta = {
  title: 'HTML + CSS/Components/Logo',
  tags: ['autodocs'],
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('HTML + CSS/Components/Logo'),
    layout: 'padded'
  }};

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

export const ColoredVariants: Story = {
  name: 'Colored Variants',
  render: () => {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Full Color Logo</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="eui-logo" data-eui-variant="full-color" data-eui-size="xs" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullColorLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full-color" data-eui-size="sm" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullColorLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full-color" data-eui-size="md" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullColorLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full-color" data-eui-size="lg" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullColorLogoSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="full-color" data-eui-size="xl" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><FullColorLogoSVG /></span>
            </a>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Icon Only Color</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="eui-logo" data-eui-variant="icon-only-color" data-eui-size="xs" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlyColorSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only-color" data-eui-size="sm" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlyColorSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only-color" data-eui-size="md" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlyColorSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only-color" data-eui-size="lg" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlyColorSVG /></span>
            </a>
            <a href="#" className="eui-logo" data-eui-variant="icon-only-color" data-eui-size="xl" aria-label="ENVISIO Home">
              <span className="eui-logo__svg"><IconOnlyColorSVG /></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export const Loading: Story = {
  name: 'Loading Animation',
  render: () => {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Animated Loading Logo</h3>
          <p style={{ marginBottom: '1rem', color: '#64748b' }}>This variant shows an animated loading state with color cycling.</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="eui-logo" data-eui-variant="loading" data-eui-size="xs" aria-label="ENVISIO Loading">
              <span className="eui-logo__svg"><LoadingSVG /></span>
            </div>
            <div className="eui-logo" data-eui-variant="loading" data-eui-size="sm" aria-label="ENVISIO Loading">
              <span className="eui-logo__svg"><LoadingSVG /></span>
            </div>
            <div className="eui-logo" data-eui-variant="loading" data-eui-size="md" aria-label="ENVISIO Loading">
              <span className="eui-logo__svg"><LoadingSVG /></span>
            </div>
            <div className="eui-logo" data-eui-variant="loading" data-eui-size="lg" aria-label="ENVISIO Loading">
              <span className="eui-logo__svg"><LoadingSVG /></span>
            </div>
            <div className="eui-logo" data-eui-variant="loading" data-eui-size="xl" aria-label="ENVISIO Loading">
              <span className="eui-logo__svg"><LoadingSVG /></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

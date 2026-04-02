import type { Meta, StoryObj } from '@storybook/react';
import { LinkClean } from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/Link',
  tags: ['autodocs'],
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/Link'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const stackStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1rem',
  maxWidth: '760px'
};

const textStyle = {
  margin: 0,
  color: '#334155'
} as const;

export const Default: Story = {
  render: () => (
    <div style={stackStyle}>
      <p style={textStyle}>
        View the{' '}
        <LinkClean href="#default-link" onClick={(event) => event.preventDefault()}>
          documentation page
        </LinkClean>{' '}
        for API details.
      </p>
    </div>
  )
};

export const TypographyInheritance: Story = {
  name: 'Typography Inheritance',
  render: () => (
    <div style={stackStyle}>
      <h2 style={{ margin: 0, fontSize: '1.75rem', lineHeight: 1.2 }}>
        Open the{' '}
        <LinkClean href="#heading-link" onClick={(event) => event.preventDefault()}>
          implementation guide
        </LinkClean>
      </h2>
      <p style={{ ...textStyle, fontSize: '0.875rem' }}>
        Small text with{' '}
        <LinkClean href="#small-link" onClick={(event) => event.preventDefault()}>
          inline link
        </LinkClean>{' '}
        uses the same inherited typography scale.
      </p>
    </div>
  )
};

export const ExternalTarget: Story = {
  name: 'External Target',
  render: () => (
    <div style={stackStyle}>
      <LinkClean
        href="https://example.com"
        target="_blank"
        onClick={(event) => event.preventDefault()}
      >
        Open external resource in new tab
      </LinkClean>
      <p style={textStyle}>
        For `_blank` links, `LinkClean` automatically appends `noopener noreferrer` to `rel`.
      </p>
    </div>
  )
};

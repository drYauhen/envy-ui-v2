import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import type { CSSProperties } from 'react';

type Story = StoryObj;

const containerStyle: CSSProperties = {
  padding: '24px',
  maxWidth: 1200,
  margin: '0 auto',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  color: '#0f172a'
};

const titleStyle: CSSProperties = {
  margin: '0 0 24px',
  fontSize: '28px',
  fontWeight: 600,
  color: '#0f172a'
};

const descriptionStyle: CSSProperties = {
  margin: '0 0 32px',
  fontSize: '16px',
  color: '#475569',
  lineHeight: 1.6,
  maxWidth: '800px'
};

const listStyle: CSSProperties = {
  display: 'grid',
  gap: '12px',
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const itemStyle: CSSProperties = {
  padding: '16px',
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
  transition: 'all 0.2s ease'
};

const linkStyle: CSSProperties = {
  color: '#0f172a',
  textDecoration: 'none',
  display: 'block'
};

const adrTitleStyle: CSSProperties = {
  margin: '0 0 8px',
  fontSize: '18px',
  fontWeight: 600,
  color: '#0f172a'
};

const adrMetaStyle: CSSProperties = {
  display: 'flex',
  gap: '12px',
  fontSize: '14px',
  color: '#64748b',
  marginTop: '8px'
};

const statusBadgeStyle: CSSProperties = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase'
};

const getStatusStyle = (status: string): CSSProperties => {
  const base = { ...statusBadgeStyle };
  switch (status.toLowerCase()) {
    case 'accepted':
      return { ...base, background: '#d1fae5', color: '#065f46' };
    case 'exploratory':
      return { ...base, background: '#dbeafe', color: '#1e40af' };
    case 'superseded':
      return { ...base, background: '#f3f4f6', color: '#374151' };
    default:
      return { ...base, background: '#fef3c7', color: '#92400e' };
  }
};

const adrs = [
  { number: '0001', title: 'React Aria as Headless Accessibility Foundation', status: 'Accepted', date: '2025-12-15' },
  { number: '0002', title: 'Data-Driven Storybook Pipeline via Style Dictionary', status: 'Accepted', date: '2025-12-15' },
  { number: '0003', title: 'Data-Driven Figma Variables Pipeline', status: 'Accepted', date: '2025-12-15' },
  { number: '0004', title: 'Context-Aware UI Components and Projection Model', status: 'Accepted', date: '2025-12-15' },
  { number: '0005', title: 'Canonical UI Namespace and Button v1 Baseline', status: 'Accepted', date: '2025-12-15' },
  { number: '0006', title: 'Focus Policy Architecture', status: 'Accepted', date: '2025-12-15' },
  { number: '0007', title: 'Focus Token Separation and Policy Mapping', status: 'Accepted', date: '2025-12-15' },
  { number: '0008', title: 'TSX Layer (React Aria) Button v1 and Storybook Layering', status: 'Accepted', date: '2025-12-16' },
  { number: '0009', title: 'AVE Token Rule Profile-Aware Visual Encoding', status: 'Accepted', date: '2025-12-16' },
  { number: '0010', title: 'Button TSX React Aria v2 Alpha', status: 'Accepted', date: '2025-12-16' },
  { number: '0011', title: 'Token-Driven Button Contracts v1 Exploratory', status: 'Accepted', date: '2025-12-17' },
  { number: '0012', title: 'Button Evolution, Layered Architecture and Contexts', status: 'Accepted', date: '2025-12-17' },
  { number: '0013', title: 'Current Architectural Intent Exploratory', status: 'Accepted', date: '2025-12-17' },
  { number: '0014', title: 'Color Model, Tonal Scales, and Contextual Architecture', status: 'Accepted', date: '2025-12-18' },
  { number: '0015', title: 'Token-First Contract Layer and Renderer-Agnostic Model', status: 'Accepted', date: '2025-12-18' },
  { number: '0016', title: 'Prefix Unification (eui)', status: 'Accepted', date: '2025-12-19' },
  { number: '0017', title: 'Layered Token Architecture for Contexts and Themes', status: 'Accepted', date: '2025-12-20' },
  { number: '0018', title: 'Typography Units Architecture (rem, em, px)', status: 'Accepted', date: '2025-12-20' },
  { number: '0019', title: 'Layout Components Architecture', status: 'Accepted', date: '2025-12-20' },
  { number: '0020', title: 'Elevation System Architecture', status: 'Accepted', date: '2025-12-20' },
  { number: '0021', title: 'Web Components as Framework-Agnostic Implementation Layer', status: 'Exploratory', date: '2025-01-XX' }
];

const meta: Meta = {
  title: 'Docs/ADR',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs']
};

export default meta;

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Architectural Decision Records (ADR)</h1>
      <div style={descriptionStyle}>
        <p>
          Architectural Decision Records (ADR) capture the history of architectural reasoning and decision-making over time.
          They reflect how thinking evolved at specific moments and are not guaranteed to describe the current or final state of the system.
        </p>
        <p>
          ADR documents serve as a historical record of architectural thinking, context for understanding why certain approaches were explored,
          and reference material for reflection and analysis.
        </p>
      </div>
      <ul style={listStyle}>
        {adrs.map((adr) => {
          const adrId = adr.number.toLowerCase().replace(/^0+/, '');
          const storyId = `docs-adr-adr-${adrId}`;
          return (
            <li key={adr.number} style={itemStyle}>
              <a 
                href={`?path=/story/${storyId}--default`}
                style={linkStyle}
              >
                <div style={adrTitleStyle}>
                  ADR-{adr.number}: {adr.title}
                </div>
                <div style={adrMetaStyle}>
                  <span style={getStatusStyle(adr.status)}>{adr.status}</span>
                  <span>Date: {adr.date}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  )
};


import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Import SVG as React component using SVGR
// The ?react suffix tells Vite to use SVGR to transform the SVG
import IconTasks from '../../assets/icons/extracted/tasks.svg?react';
import IconPlan from '../../assets/icons/extracted/plan.svg?react';

const meta: Meta = {
  title: 'HTML + CSS/Icon Test (SVGR)',
  component: IconTasks,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Testing SVGR: SVG imported as React component
 * 
 * How it works:
 * - SVG file is transformed into a React component by SVGR
 * - The component accepts standard SVG props (width, height, className, fill, stroke, etc.)
 * - Each usage creates an inline SVG element in the DOM
 * - No SVG sprite - each instance is independent
 */

export const BasicUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <IconTasks width={24} height={24} />
      <IconPlan width={32} height={32} />
      <IconTasks width={48} height={48} style={{ color: 'red' }} />
    </div>
  ),
};

export const WithCurrentColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '1.5rem' }}>
      <div style={{ color: '#0066cc' }}>
        <IconTasks width={24} height={24} /> Blue icon
      </div>
      <div style={{ color: '#cc0000' }}>
        <IconTasks width={24} height={24} /> Red icon
      </div>
      <div style={{ color: '#00cc00' }}>
        <IconTasks width={24} height={24} /> Green icon
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button className="eui-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <IconTasks width={16} height={16} />
        Tasks
      </button>
      <button className="eui-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <IconPlan width={16} height={16} />
        Plan
      </button>
    </div>
  ),
};

export const MultipleInstances: Story = {
  render: () => (
    <div>
      <p>This demonstrates how SVGR works: each icon is an inline SVG in the DOM</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <IconTasks key={i} width={24} height={24} style={{ color: `hsl(${i * 36}, 70%, 50%)` }} />
        ))}
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Each icon above is a separate inline SVG element in the DOM.
        They are NOT reused from a sprite - each instance is independent.
        This is the standard approach for SVGR/inline SVG components.
      </p>
    </div>
  ),
};



import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Calendar } from '../../../packages/tsx/calendar';
import '../../../src/ui/calendar.css';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX + React Aria/Components/Calendar',
  parameters: {
    // Apply section-specific parameters automatically
    ...getSectionParameters('TSX + React Aria/Components/Calendar'),
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    
    return (
      <div data-eui-context="app" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Calendar
          value={value}
          onChange={setValue}
        />
        {value && (
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Selected: {value.toLocaleDateString()}
          </div>
        )}
      </div>
    );
  }
};

export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    
    return (
      <div data-eui-context="app" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Calendar
          value={value}
          onChange={setValue}
        />
        {value && (
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Selected: {value.toLocaleDateString()}
          </div>
        )}
      </div>
    );
  }
};

export const Disabled: Story = {
  render: () => {
    return (
      <div data-eui-context="app">
        <Calendar
          defaultValue={new Date()}
          isDisabled
        />
      </div>
    );
  }
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <div data-eui-context="app">
        <Calendar
          defaultValue={new Date()}
          isReadOnly
        />
      </div>
    );
  }
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7); // 7 days ago
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // 30 days from now
    
    return (
      <div data-eui-context="app" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Calendar
          value={value}
          onChange={setValue}
          minValue={minDate}
          maxValue={maxDate}
        />
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          <p>Min date: {minDate.toLocaleDateString()}</p>
          <p>Max date: {maxDate.toLocaleDateString()}</p>
          {value && <p>Selected: {value.toLocaleDateString()}</p>}
        </div>
      </div>
    );
  }
};


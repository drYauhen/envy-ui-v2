import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FormField, FormSection, FormRow, FormGroup } from '../../../packages/tsx/form';

const meta: Meta = {
  title: 'TSX + React Aria/Components/FormLayout',
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj;

// FormField Examples
export const FormFieldBasic: Story = {
  render: () => (
    <>
      <FormField label="First Name" helperText="This is your given name">
        <input type="text" className="eui-input" placeholder="Enter your first name" />
      </FormField>

      <FormField label="Email Address" helperText="We'll never share your email">
        <input type="email" className="eui-input" placeholder="your@email.com" />
      </FormField>
    </>
  )
};

export const FormFieldWithError: Story = {
  render: () => (
    <FormField 
      label="Email Address" 
      error="Please enter a valid email address"
    >
      <input type="email" className="eui-input" placeholder="your@email.com" defaultValue="invalid-email" />
    </FormField>
  )
};

export const FormFieldLabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <FormField label="Top Label" labelPosition="top">
        <input type="text" className="eui-input" placeholder="Label on top" />
      </FormField>

      <FormField label="Left Label" labelPosition="left">
        <input type="text" className="eui-input" placeholder="Label on left" />
      </FormField>

      <FormField label="Inline Label" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
    </div>
  )
};

// FormSection Examples
export const FormSectionBasic: Story = {
  render: () => (
    <FormSection title="Personal Information">
      <FormField label="First Name">
        <input type="text" className="eui-input" />
      </FormField>
      <FormField label="Last Name">
        <input type="text" className="eui-input" />
      </FormField>
    </FormSection>
  )
};

export const FormSectionCollapsible: Story = {
  render: () => {
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(true);

    return (
      <>
        <FormSection 
          title="Collapsed Section"
          collapsible
          expanded={expanded1}
          onExpandedChange={setExpanded1}
        >
          <FormField label="Field 1">
            <input type="text" className="eui-input" />
          </FormField>
        </FormSection>

        <FormSection 
          title="Expanded Section"
          collapsible
          expanded={expanded2}
          onExpandedChange={setExpanded2}
        >
          <FormField label="Field 1">
            <input type="text" className="eui-input" />
          </FormField>
          <FormField label="Field 2">
            <input type="text" className="eui-input" />
          </FormField>
        </FormSection>
      </>
    );
  }
};

export const FormSectionWithHeaderContent: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(true);

    return (
      <FormSection 
        title="Team Members"
        collapsible
        expanded={expanded}
        onExpandedChange={setExpanded}
        headerContent={
          <>
            <img src="https://i.pravatar.cc/40?img=1" alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
            <span style={{ 
              fontSize: '0.75rem', 
              padding: '0.125rem 0.5rem', 
              background: 'var(--eui-color-accent-100)', 
              borderRadius: '999px',
              color: 'var(--eui-color-accent-900)'
            }}>5 members</span>
          </>
        }
      >
        <FormField label="Team Name">
          <input type="text" className="eui-input" />
        </FormField>
        <FormField label="Description">
          <input type="text" className="eui-input" />
        </FormField>
      </FormSection>
    );
  }
};

// FormRow Examples
export const FormRowTwoColumns: Story = {
  render: () => (
    <FormRow columns={2}>
      <FormField label="First Name">
        <input type="text" className="eui-input" />
      </FormField>
      <FormField label="Last Name">
        <input type="text" className="eui-input" />
      </FormField>
    </FormRow>
  )
};

export const FormRowThreeColumns: Story = {
  render: () => (
    <FormRow columns={3}>
      <FormField label="Day">
        <input type="text" className="eui-input" placeholder="DD" />
      </FormField>
      <FormField label="Month">
        <input type="text" className="eui-input" placeholder="MM" />
      </FormField>
      <FormField label="Year">
        <input type="text" className="eui-input" placeholder="YYYY" />
      </FormField>
    </FormRow>
  )
};

// FormGroup Examples
export const FormGroupVertical: Story = {
  render: () => (
    <FormGroup label="Notification Preferences" orientation="vertical">
      <FormField label="Email notifications" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
      <FormField label="SMS notifications" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
      <FormField label="Push notifications" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
    </FormGroup>
  )
};

export const FormGroupHorizontal: Story = {
  render: () => (
    <FormGroup label="Payment Method" orientation="horizontal">
      <FormField label="Credit Card" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
      <FormField label="PayPal" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
      <FormField label="Bank Transfer" labelPosition="inline">
        <input type="checkbox" className="eui-checkbox" />
      </FormField>
    </FormGroup>
  )
};

// Complex Form Example
export const ComplexFormExample: Story = {
  render: () => {
    const [personalExpanded, setPersonalExpanded] = useState(true);
    const [preferencesExpanded, setPreferencesExpanded] = useState(false);

    return (
      <div style={{ maxWidth: '600px' }}>
        <FormSection 
          title="Personal Information"
          collapsible
          expanded={personalExpanded}
          onExpandedChange={setPersonalExpanded}
        >
          <FormRow columns={2}>
            <FormField label="First Name">
              <input type="text" className="eui-input" />
            </FormField>
            <FormField label="Last Name">
              <input type="text" className="eui-input" />
            </FormField>
          </FormRow>
          <FormField label="Email" helperText="We'll never share your email">
            <input type="email" className="eui-input" />
          </FormField>
        </FormSection>

        <FormSection 
          title="Preferences"
          collapsible
          expanded={preferencesExpanded}
          onExpandedChange={setPreferencesExpanded}
        >
          <FormGroup label="Notification Types" orientation="vertical">
            <FormField label="Email" labelPosition="inline">
              <input type="checkbox" className="eui-checkbox" />
            </FormField>
            <FormField label="SMS" labelPosition="inline">
              <input type="checkbox" className="eui-checkbox" />
            </FormField>
          </FormGroup>
        </FormSection>
      </div>
    );
  }
};


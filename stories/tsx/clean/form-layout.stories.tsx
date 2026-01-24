import type { Meta, StoryObj } from '@storybook/react';
import {
  Form,
  FormActions,
  FormField,
  FormGroup,
  FormRow,
  FormSection,
  InputClean
} from '../../../packages/tsx';
import { getSectionParameters } from '../../../.storybook/preview';

const meta: Meta = {
  title: 'TSX (Clean)/Components/FormLayout',
  parameters: {
    ...getSectionParameters('TSX (Clean)/Components/FormLayout'),
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '2rem',
  maxWidth: '680px'
};

const constrainedStyle = {
  maxWidth: '320px',
  border: '1px dashed var(--eui-color-border-subtle)',
  padding: '1rem',
  borderRadius: '8px'
};

export const HorizontalDefault: Story = {
  render: () => (
    <div style={containerStyle}>
      <Form layout="horizontal">
        <FormSection title="Profile" subtitle="Basic account details">
          <FormRow columns={2}>
            <FormField label="First name">
              <InputClean placeholder="Ada" />
            </FormField>
            <FormField label="Last name">
              <InputClean placeholder="Lovelace" />
            </FormField>
          </FormRow>
          <FormField label="Email" helperText="We will only use this for account updates.">
            <InputClean placeholder="name@company.com" />
          </FormField>
          <FormGroup label="Notifications" orientation="vertical">
            <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" className="eui-checkbox" defaultChecked />
              <span>Email updates</span>
            </label>
            <label className="eui-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" className="eui-checkbox" />
              <span>Product news</span>
            </label>
          </FormGroup>
        </FormSection>
        <FormActions align="end">
          <button className="eui-button" data-eui-intent="secondary" data-eui-size="md" type="button">
            Cancel
          </button>
          <button className="eui-button" data-eui-intent="primary" data-eui-size="md" type="button">
            Save changes
          </button>
        </FormActions>
      </Form>
    </div>
  )
};

export const StackedLayout: Story = {
  render: () => (
    <div style={containerStyle}>
      <Form layout="stacked">
        <FormField label="Company name" labelPosition="top">
          <InputClean placeholder="Envy" />
        </FormField>
        <FormField label="Workspace domain" labelPosition="top" error="This domain is already taken.">
          <InputClean placeholder="envy-ui" data-eui-state="error" />
        </FormField>
        <FormField label="Timezone" labelPosition="top" helperText="Used for scheduling and reports.">
          <InputClean placeholder="UTC" />
        </FormField>
      </Form>
    </div>
  )
};

export const MixedLayout: Story = {
  render: () => (
    <div style={containerStyle}>
      <Form layout="horizontal">
        <FormField label="Project" labelPosition="left">
          <InputClean placeholder="Launch" />
        </FormField>
        <FormField label="Notes (stacked override)" labelPosition="top">
          <InputClean placeholder="Optional" />
        </FormField>
        <FormField label="Archive after publish" labelPosition="inline">
          <input type="checkbox" className="eui-checkbox" />
        </FormField>
      </Form>
    </div>
  )
};

export const ConstrainedContainer: Story = {
  render: () => (
    <div style={containerStyle}>
      <div style={constrainedStyle}>
        <Form layout="auto">
          <FormField label="Street" labelPosition="top">
            <InputClean placeholder="12 Main St" />
          </FormField>
          <FormRow columns={2}>
            <FormField label="City" labelPosition="top">
              <InputClean placeholder="Paris" />
            </FormField>
            <FormField label="ZIP" labelPosition="top">
              <InputClean placeholder="75001" />
            </FormField>
          </FormRow>
        </Form>
      </div>
    </div>
  )
};

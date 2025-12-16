import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import '../build/css/tokens.css';
import '../src/ui/focus-policy.css';
import '../src/ui/button.css';
import './preview.css';

const withPreviewLayout: Decorator = (Story, context) => {
  const focusPolicy = context.globals.focusPolicy ?? 'derived';

  return (
    <div className="sb-preview-wrapper" data-ui-focus-policy={focusPolicy}>
      <div className="sb-preview-region">
        <Story />
      </div>
    </div>
  );
};

export const decorators: Preview['decorators'] = [withPreviewLayout];

export const globalTypes: Preview['globalTypes'] = {
  focusPolicy: {
    name: 'Focus policy',
    description: 'Select derived vs system focus styling.',
    defaultValue: 'derived',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'derived', title: 'Derived' },
        { value: 'system', title: 'System' }
      ],
      dynamicTitle: true
    }
  }
};

export const parameters: Preview['parameters'] = {
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  }
};

const preview: Preview = { decorators, parameters };

export default preview;

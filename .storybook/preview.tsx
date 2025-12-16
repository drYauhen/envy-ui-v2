import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import '../build/css/tokens.css';
import '../src/ui/button.css';
import './preview.css';

const withPreviewLayout: Decorator = (Story) => (
  <div className="sb-preview-wrapper">
    <div className="sb-preview-region">
      <Story />
    </div>
  </div>
);

const preview: Preview = {
  decorators: [withPreviewLayout],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;

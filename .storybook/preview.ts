import type { Preview } from '@storybook/react';
import '../build/css/tokens.css';
import '../src/ui/button.css';

const preview: Preview = {
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

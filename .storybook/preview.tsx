import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import '../generated/css/tokens.css';
import '../src/ui/focus-policy.css';
import '../src/ui/label.css';
import '../src/ui/button.css';
import '../src/ui/card.css';
import '../src/ui/checkbox.css';
import '../src/ui/input.css';
import '../src/ui/textarea.css';
import '../src/ui/select.css';
import './preview.css';

const withPreviewLayout: Decorator = (Story, context) => {
  const focusPolicy = context.globals.focusPolicy === '_reset' ? 'derived' : (context.globals.focusPolicy ?? 'derived');
  const contextValue = context.globals.context === '_reset' ? 'app' : (context.globals.context ?? 'app');
  const theme = context.globals.theme === '_reset' ? 'default' : (context.globals.theme ?? 'default');

  return (
    <div 
      className="sb-preview-wrapper" 
      data-eui-focus-policy={focusPolicy}
      data-eui-context={contextValue}
      data-eui-theme={theme}
    >
      <div className="sb-preview-region">
        <Story />
      </div>
    </div>
  );
};

export const decorators: Preview['decorators'] = [withPreviewLayout];

export const globalTypes: Preview['globalTypes'] = {
  context: {
    name: 'Context',
    description: 'Select rendering context',
    defaultValue: 'app',
    toolbar: {
      icon: 'folder',
      items: [
        { value: 'app', title: 'Application' },
        { value: 'site', title: 'Website/CMS', disabled: true },
        { value: 'report', title: 'Report' }
      ],
      showName: true,
      dynamicTitle: true
    }
  },
  
  theme: {
    name: 'Theme',
    description: 'Select theme',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'accessibility', title: 'Accessibility' },
        { value: 'print', title: 'Print' },
        { value: 'screen', title: 'Screen' }
      ],
      showName: true,
      dynamicTitle: true
    }
  },
  
  focusPolicy: {
    name: 'Focus Policy',
    description: 'Select focus styling: Derived (brand color) or System (high accessibility orange).',
    defaultValue: 'derived',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'derived', title: 'Derived' },
        { value: 'system', title: 'System' }
      ],
      showName: true,
      dynamicTitle: true
    }
  }
};

export const parameters: Preview['parameters'] = {
  layout: 'fullscreen',
  options: {
    storySort: {
      order: ['Tokens', 'HTML + CSS', 'TSX (Clean)', 'TSX', 'TSX + React Aria']
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  },
};

const preview: Preview = { decorators, parameters };

export default preview;

import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import '../generated/css/tokens.css';
import '../src/ui/focus-policy.css';
import '../src/ui/button.css';
import './preview.css';

const withPreviewLayout: Decorator = (Story, context) => {
  const focusPolicy = context.globals.focusPolicy ?? 'derived';
  const contextValue = context.globals.context ?? 'app';
  const theme = context.globals.theme ?? 'default';

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
        { value: 'report', title: 'Report', disabled: true }
      ],
      dynamicTitle: true
    }
  },
  
  theme: {
    name: 'Theme',
    description: 'Select theme within context',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'accessibility', title: 'Accessibility' }
      ],
      dynamicTitle: true
    }
  },
  
  focusPolicy: {
    name: 'Focus policy',
    description: 'Select focus styling: Derived (brand color) or System (high accessibility orange).',
    defaultValue: 'derived',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'derived', title: 'Focus: Derived' },
        { value: 'system', title: 'Focus: System' }
      ],
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
  }
};

const preview: Preview = { decorators, parameters };

export default preview;

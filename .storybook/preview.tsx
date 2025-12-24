import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import navigationConfig from './storybook-navigation.config';
import '../generated/css/tokens.css';
import '../src/ui/focus-policy.css';
import '../src/ui/label.css';
import '../src/ui/button.css';
import '../src/ui/card.css';
import '../src/ui/checkbox.css';
import '../src/ui/switch.css';
import '../src/ui/input.css';
import '../src/ui/input-group.css';
import '../src/ui/textarea.css';
import '../src/ui/select.css';
import '../src/ui/avatar.css';
import '../src/ui/avatar-group.css';
import '../src/ui/counter.css';
import '../src/ui/related-group.css';
import '../src/ui/skeleton.css';
import '../src/ui/modal.css';
import '../src/ui/app-shell.css';
import '../src/ui/sidebar.css';
import '../src/ui/header.css';
import '../src/ui/title-bar.css';
import '../src/ui/content.css';
import '../src/ui/detail-panel.css';
import '../src/ui/skip-link.css';
import '../src/ui/table.css';
import '../src/ui/menu.css';
import '../src/ui/divider.css';
import '../src/ui/icons/_icons.css';
import '../src/ui/form-field.css';
import '../src/ui/form-section.css';
import '../src/ui/form-row.css';
import '../src/ui/form-group.css';
import '../src/ui/alert-banner.css';
import '../src/ui/select-dropdown.css';
import '../src/ui/select-primitives.css';
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
    // Custom story sorting function with config embedded inline
    storySort: (a, b) => {
      // Embedded navigation config to avoid closure issues
      const navConfig = {
        "HTML + CSS": {
          componentGroups: [
            { components: ["Avatar", "AvatarGroup"] },
            { components: ["Button", "ButtonGroup"] },
            { components: ["Input", "InputGroup", "Select", "Textarea"] },
            { components: ["Checkbox", "Switch"] },
            { components: ["Card", "Layout"] }
          ],
          otherComponents: ["AlertBanner", "Counter", "FormElementsContextThemeTest", "FormLayout", "Icon", "Label", "Menu", "Modal", "Skeleton", "Table"]
        },
        "TSX + React Aria": {
          componentGroups: [
            { components: ["Select", "MultiSelect", "SearchableSelect"] }
          ],
          otherComponents: ["AlertBanner", "Button", "FormLayout", "Icon", "Menu"]
        },
        "Web Components": {
          componentGroups: [],
          otherComponents: ["Button"]
        }
      };
      
      const aTitle = a[1]?.title || a[1]?.kind || '';
      const bTitle = b[1]?.title || b[1]?.kind || '';
      const aParts = aTitle.split('/');
      const bParts = bTitle.split('/');
      const aSection = aParts[0] || '';
      const bSection = bParts[0] || '';
      
      const sectionOrder = ['Docs', 'Tokens', 'HTML + CSS', 'TSX (Clean)', 'TSX', 'TSX + React Aria', 'Web Components', 'Architecture'];
      const aSectionIndex = sectionOrder.indexOf(aSection);
      const bSectionIndex = sectionOrder.indexOf(bSection);
      
      if (aSectionIndex !== bSectionIndex) {
        if (aSectionIndex === -1) return 1;
        if (bSectionIndex === -1) return -1;
        return aSectionIndex - bSectionIndex;
      }
      
      const sectionConfig = navConfig[aSection];
      if (!sectionConfig || aParts.length < 3 || bParts.length < 3) {
        return aTitle.localeCompare(bTitle);
      }
      
      const aComponentName = aParts[2] || '';
      const bComponentName = bParts[2] || '';
      let aGroupIndex = -1, aComponentIndex = -1, bGroupIndex = -1, bComponentIndex = -1;
      
      if (sectionConfig.componentGroups) {
        sectionConfig.componentGroups.forEach((group, groupIdx) => {
          const aIdx = group.components.indexOf(aComponentName);
          const bIdx = group.components.indexOf(bComponentName);
          if (aIdx !== -1) { aGroupIndex = groupIdx; aComponentIndex = aIdx; }
          if (bIdx !== -1) { bGroupIndex = groupIdx; bComponentIndex = bIdx; }
        });
      }
      
      if (aGroupIndex !== -1 && bGroupIndex !== -1) {
        if (aGroupIndex !== bGroupIndex) return aGroupIndex - bGroupIndex;
        return aComponentIndex - bComponentIndex;
      }
      if (aGroupIndex !== -1) return -1;
      if (bGroupIndex !== -1) return 1;
      
      const aOtherIndex = sectionConfig.otherComponents?.indexOf(aComponentName) ?? -1;
      const bOtherIndex = sectionConfig.otherComponents?.indexOf(bComponentName) ?? -1;
      if (aOtherIndex !== -1 && bOtherIndex !== -1) {
        return aOtherIndex - bOtherIndex;
      }
      
      return aComponentName.localeCompare(bComponentName);
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

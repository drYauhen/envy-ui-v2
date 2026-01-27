import type { Decorator, Preview } from '@storybook/react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { useEffect, type ReactNode } from 'react';
import { getSectionConfig } from './section-config';
import './mermaid.css';
import '../generated/css/tokens.css';
import '../generated/css/components/divider.tokens.css';
import '../src/ui/focus-policy.css';
import '../src/ui/control.css';
import '../src/ui/state.css';
import '../src/ui/label.css';
import '../src/ui/button.css';
import '../src/ui/components/card/card.index.css';
import '../src/ui/components/badge/badge.index.css';
import '../src/ui/components/divider/divider.index.css';
import '../src/ui/components/tooltip/tooltip.index.css';
import '../src/ui/components/checkbox/checkbox.index.css';
import '../src/ui/components/switch/switch.index.css';
import '../src/ui/components/input/input.index.css';
import '../src/ui/components/input-group/input-group.index.css';
import '../src/ui/components/form/form.index.css';
// import '../src/ui/checkbox.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/switch.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/input.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/input-group.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/textarea.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/select.css'; // LEGACY: Likely defines old component tokens
import '../src/ui/avatar.css';
import '../src/ui/avatar-group.css';
import '../src/ui/counter.css';
import '../src/ui/related-group.css';
import '../src/ui/components/skeleton/skeleton.index.css';
import '../src/ui/celebration.css';
// import '../src/ui/modal.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/app-shell.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/sidebar.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/side-nav.css'; // LEGACY: Likely defines old component tokens
import '../src/ui/logo.css';
// import '../src/ui/header.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/title-bar.css'; // LEGACY: Likely defines old component tokens
import '../src/ui/content.css';
// import '../src/ui/detail-panel.css'; // LEGACY: Likely defines old component tokens
import '../src/ui/skip-link.css';
import '../src/ui/code-block.css';
import '../src/ui/callout.css';
import '../src/ui/table.css';
import '../src/ui/table-container.css';
// import '../src/ui/menu.css'; // LEGACY: Likely defines old component tokens

import '../src/ui/icons/_icons.css';
// import '../src/ui/form-field.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/form-section.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/form-row.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/form-group.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/alert-banner.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/select-dropdown.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/select-primitives.css'; // LEGACY: Likely defines old component tokens
import '../src/ui/container.css';
import '../src/ui/page.css';
import '../src/ui/section.css';
import '../src/ui/stack.css';
import '../src/ui/inline.css';
import '../src/ui/grid.css';
// import '../src/ui/toolbar.css'; // LEGACY: Likely defines old component tokens
// import '../src/ui/page-header.css'; // LEGACY: Likely defines old component tokens
import '../src/ui/typography.css';
import '../src/ui/docs.css';
import './preview.css';
import { ContextThemeProvider, DEFAULT_CONTEXT_THEMES } from '../stories/utils/context-theme';

/**
 * Function to get section-specific parameters based on story title
 * This will be used to merge with story parameters
 */
export function getSectionParameters(title: string) {
  const sectionConfig = getSectionConfig(title);
  
  if (!sectionConfig || !sectionConfig.panels) {
    return {};
  }
  
  const { panels } = sectionConfig;
  const params: Record<string, any> = {};
  
  // Apply controls configuration
  if (panels.controls === false || (typeof panels.controls === 'object' && panels.controls.hidden)) {
    params.controls = { hidden: true };
  }
  
  // Apply actions configuration
  if (panels.actions === false || (typeof panels.actions === 'object' && panels.actions.hidden)) {
    params.actions = { hidden: true };
  }
  
  // Apply a11y configuration
  if (panels.a11y === false || (typeof panels.a11y === 'object' && panels.a11y.hidden)) {
    params.a11y = { hidden: true };
  }
  
  // Apply codePanel configuration
  if (panels.codePanel === false) {
    params.docs = { codePanel: false };
  }
  
  return params;
}

const getGlobalValue = (value: unknown, fallback: string) =>
  value === '_reset' || value == null ? fallback : String(value);

const joinClassNames = (...values: Array<string | undefined>) =>
  values.filter(Boolean).join(' ');

const syncHtmlContext = (context: string, theme: string, focusPolicy: string) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-eui-context', context);
  root.setAttribute('data-eui-theme', theme);
  root.setAttribute('data-eui-focus-policy', focusPolicy);
  root.style.fontSize = 'var(--eui-typography-fontSize-base)';
};

const HtmlContextSync = ({
  context,
  theme,
  focusPolicy,
  children
}: {
  context: string;
  theme: string;
  focusPolicy: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    syncHtmlContext(context, theme, focusPolicy);
  }, [context, theme, focusPolicy]);

  return <>{children}</>;
};

const isDocsCodeBlock = (className: string | undefined, children: any) => {
  const text = typeof children === 'string' ? children :
    Array.isArray(children) ? children.join('') : '';
  const hasLanguage = typeof className === 'string' && className.includes('language-');

  return hasLanguage || (typeof text === 'string' && text.includes('\n'));
};

const DocsCode = ({ className, children, ...props }: any) => {
  if (isDocsCodeBlock(className, children)) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code
      className={joinClassNames('eui-code-block', className)}
      data-eui-variant="inline"
      {...props}
    >
      {children}
    </code>
  );
};

const DocsPre = ({ className, children, ...props }: any) => (
  <pre
    className={joinClassNames('eui-code-block', className)}
    data-eui-variant="block"
    {...props}
  >
    {children}
  </pre>
);

const DocsThemeContainer = ({ children, context }: DocsContainerProps) => {
  const globals = (context as any)?.globals ?? {};
  const focusPolicy = getGlobalValue(globals.focusPolicy, 'derived');
  const appTheme = getGlobalValue(globals.appTheme, DEFAULT_CONTEXT_THEMES.app);
  const websiteTheme = getGlobalValue(globals.websiteTheme, DEFAULT_CONTEXT_THEMES.website);
  const reportTheme = getGlobalValue(globals.reportTheme, DEFAULT_CONTEXT_THEMES.report);

  return (
    <ContextThemeProvider themes={{ app: appTheme, website: websiteTheme, report: reportTheme }}>
      <HtmlContextSync context="app" theme={appTheme} focusPolicy={focusPolicy}>
        <DocsContainer context={context}>
          <div
            className="sb-docs-wrapper eui-typography-root"
            data-eui-focus-policy={focusPolicy}
            data-eui-context="app"
            data-eui-theme={appTheme}
          >
            {children}
          </div>
        </DocsContainer>
      </HtmlContextSync>
    </ContextThemeProvider>
  );
};

const withPreviewLayout: Decorator = (Story, context) => {
  const focusPolicy = getGlobalValue(context.globals.focusPolicy, 'derived');
  const appTheme = getGlobalValue(context.globals.appTheme, DEFAULT_CONTEXT_THEMES.app);
  const websiteTheme = getGlobalValue(context.globals.websiteTheme, DEFAULT_CONTEXT_THEMES.website);
  const reportTheme = getGlobalValue(context.globals.reportTheme, DEFAULT_CONTEXT_THEMES.report);
  const storyNode = <Story />;

  return (
    <ContextThemeProvider themes={{ app: appTheme, website: websiteTheme, report: reportTheme }}>
      <HtmlContextSync context="app" theme={appTheme} focusPolicy={focusPolicy}>
        <div
          className="sb-preview-wrapper eui-typography-root"
          data-eui-focus-policy={focusPolicy}
          data-eui-context="app"
          data-eui-theme={appTheme}
        >
          <div className="sb-preview-region">{storyNode}</div>
        </div>
      </HtmlContextSync>
    </ContextThemeProvider>
  );
};

/**
 * Decorator to apply section-specific parameters
 * Note: In Storybook, parameters are applied before decorators run.
 * This decorator serves as documentation - actual parameters should be applied
 * via meta.parameters in individual story files or through a custom addon.
 * 
 * For now, we'll apply parameters manually in story files using getSectionParameters helper.
 */
const withSectionParameters: Decorator = (Story, context) => {
  // Parameters are already applied by Storybook before decorators run
  // This decorator is a placeholder for future enhancement
  return <Story />;
};

export const decorators: Preview['decorators'] = [withSectionParameters, withPreviewLayout];

export const globalTypes: Preview['globalTypes'] = {
  appTheme: {
    name: 'App Theme',
    description: 'Theme for app context',
    defaultValue: DEFAULT_CONTEXT_THEMES.app
  },

  websiteTheme: {
    name: 'Website Theme',
    description: 'Theme for website context',
    defaultValue: DEFAULT_CONTEXT_THEMES.website
  },

  reportTheme: {
    name: 'Report Theme',
    description: 'Theme for report context',
    defaultValue: DEFAULT_CONTEXT_THEMES.report
  },

  focusPolicy: {
    name: 'Focus Policy',
    description: 'Select focus styling: Derived (brand color) or System (high accessibility orange).',
    defaultValue: 'derived'
  }
};

export const parameters: Preview['parameters'] = {
  layout: 'fullscreen',
  docs: {
    container: DocsThemeContainer,
    components: {
      code: DocsCode,
      pre: DocsPre
    }
  },
  options: {
    // Custom story sorting function with config embedded inline
    // Note: All values must be embedded directly (not via closure) because Storybook serializes this function
    storySort: (a, b) => {
      // IMPORTANT: Due to Storybook serialization, we cannot use imports in this function.
      // All configuration must be embedded directly here.
      // 
      // Configuration source: .storybook/navigation.config.ts
      // To change navigation order:
      //   1. Edit .storybook/navigation.config.ts
      //   2. Run: npm run storybook:sync-config
      //   3. Or manually copy values from navigation.config.ts to this function
      // 
      // Section order (from navigation.config.ts -> sectionOrder)
                                                      const sectionOrder = [
        "Docs",
        "Tokens",
        "HTML + CSS",
        "TSX (Clean)",
        "TSX + React Aria",
        "Templates",
        "Web Components"
      ];
      
      // Special rules (from navigation.config.ts)
                                                      const specialRules = {
        "Docs/ADR": { firstItem: "ADR Overview" }
      };
      
      // Section configs (from navigation.config.ts)
                                                      const sectionConfigs = {
        "HTML + CSS": {
          componentGroups: [
            { components: ["Avatar", "AvatarGroup"] },
            { components: ["Button", "ButtonGroup"] },
            { components: ["Input", "InputGroup", "Select", "Textarea"] },
            { components: ["Checkbox", "Switch"] },
            { components: ["Card", "Layout"] }
          ],
          otherComponents: ["AlertBanner", "Badge", "Counter", "FormElementsContextThemeTest", "FormLayout", "Icon", "Label", "Menu", "Modal", "Skeleton", "Table"]
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
      
      // Extract story paths - Storybook 10 format: objects with title/kind/name properties
      const aTitle = a.title || a.kind || '';
      const bTitle = b.title || b.kind || '';
      const aParts = aTitle.split('/');
      const bParts = bTitle.split('/');
      const aSection = aParts[0] || '';
      const bSection = bParts[0] || '';
      
      // Compare sections
      const aSectionIndex = sectionOrder.indexOf(aSection);
      const bSectionIndex = sectionOrder.indexOf(bSection);
      
      if (aSectionIndex !== bSectionIndex) {
        if (aSectionIndex === -1) return 1;
        if (bSectionIndex === -1) return -1;
        return aSectionIndex - bSectionIndex;
      }
      
      // Apply special rules
      const aPath = aParts.slice(0, 2).join('/');
      const bPath = bParts.slice(0, 2).join('/');
      const specialRule = specialRules[aPath] || specialRules[bPath];
      
      if (specialRule && specialRule.firstItem) {
        const aName = a.name || '';
        const bName = b.name || '';
        if (aName === specialRule.firstItem) return -1;
        if (bName === specialRule.firstItem) return 1;
      }
      
      // Compare components within section
      const sectionConfig = sectionConfigs[aSection];
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
      
      const aOtherIndex = sectionConfig.otherComponents ? sectionConfig.otherComponents.indexOf(aComponentName) : -1;
      const bOtherIndex = sectionConfig.otherComponents ? sectionConfig.otherComponents.indexOf(bComponentName) : -1;
      if (aOtherIndex !== -1 && bOtherIndex !== -1) {
        return aOtherIndex - bOtherIndex;
      }
      
      return aComponentName.localeCompare(bComponentName);
    }
  },
  // Disable addon panels for Docs/ADR stories
  // This is applied globally, but can be overridden per-story
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  },
  // Configure accessibility testing to only target component containers within MultiContextViewer
  a11y: {
    context: '[data-testid="component-under-test"]'
  },
  // Apply parameters based on story title
  // Stories with title starting with "Docs/ADR" will have panels disabled
  // (This is handled in individual story files via meta.parameters)
};

const preview: Preview = {
  decorators,
  parameters
};

export default preview;

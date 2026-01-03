/**
 * Storybook Section Configuration
 * 
 * Centralized configuration for Storybook sections.
 * Defines which panels, viewers, and features should be enabled for each section.
 * 
 * This configuration will be used to automatically apply parameters to stories
 * based on their section (title prefix).
 */

import { navigationConfig } from './navigation.config';

/**
 * Configuration for Storybook addon panels
 */
export type PanelConfig = {
  /**
   * Controls panel (props editor)
   * true = enabled, false = disabled, { hidden: true } = hidden
   */
  controls: boolean | { hidden: boolean };
  
  /**
   * Actions panel (event handlers)
   * true = enabled, false = disabled, { hidden: true } = hidden
   */
  actions: boolean | { hidden: boolean };
  
  /**
   * Accessibility panel (a11y inspection)
   * true = enabled, false = disabled, { hidden: true } = hidden
   */
  a11y: boolean | { hidden: boolean };
  
  /**
   * Code panel (source code display)
   * true = enabled (collapsible), false = disabled
   */
  codePanel: boolean;
};

/**
 * Configuration for a Storybook section
 */
export type SectionConfig = {
  /**
   * Viewer component name to use for this section
   * null = use default Storybook viewer
   */
  viewer: string | null;
  
  /**
   * Panel configuration
   */
  panels: PanelConfig;
};

/**
 * Map of section names to their configuration
 */
export type SectionConfigMap = Record<string, SectionConfig>;

/**
 * Default panel configuration (all enabled)
 */
const defaultPanels: PanelConfig = {
  controls: true,
  actions: true,
  a11y: true,
  codePanel: true,
};

/**
 * Section configurations
 * 
 * Each section can have:
 * - Custom viewer component
 * - Custom panel configuration
 * 
 * Sections are matched by the first part of the story title (e.g., "Tokens" from "Tokens/App/Foundations/Colors")
 */
const sectionConfigs: SectionConfigMap = {
  // Documentation sections - no interactive panels needed
  'Docs': {
    viewer: null,
    panels: {
      controls: { hidden: true },
      actions: { hidden: true },
      a11y: { hidden: true },
      codePanel: false,
    },
  },
  
  // Token sections - inspection only, no controls/actions, but a11y for accessibility inspection
  'Tokens': {
    viewer: null, // Will be set to specific viewers later (e.g., 'ColorScaleViewer')
    panels: {
      controls: { hidden: true },
      actions: { hidden: true },
      a11y: true, // Keep for accessibility inspection
      codePanel: false,
    },
  },
  
  // HTML + CSS components - full interactive panels
  'HTML + CSS': {
    viewer: null,
    panels: {
      controls: true,
      actions: true,
      a11y: true,
      codePanel: true, // Collapsible code examples
    },
  },
  
  // TSX (Clean) components - full interactive panels
  'TSX (Clean)': {
    viewer: null,
    panels: {
      controls: true,
      actions: true,
      a11y: true,
      codePanel: true,
    },
  },
  
  // TSX + React Aria components - full interactive panels
  'TSX + React Aria': {
    viewer: null,
    panels: {
      controls: true,
      actions: true,
      a11y: true,
      codePanel: true,
    },
  },
  
  // Templates - documentation-like, minimal panels
  'Templates': {
    viewer: null,
    panels: {
      controls: true,
      actions: { hidden: true },
      a11y: true,
      codePanel: true,
    },
  },
  
  // Tailwind - inspection/documentation
  'Tailwind': {
    viewer: null,
    panels: {
      controls: { hidden: true },
      actions: { hidden: true },
      a11y: true,
      codePanel: true,
    },
  },
  
  // Web Components - full interactive panels
  'Web Components': {
    viewer: null,
    panels: {
      controls: true,
      actions: true,
      a11y: true,
      codePanel: true,
    },
  },
};

/**
 * Get section configuration for a story title
 * 
 * @param title - Story title in format "Section/Subsection/Component" or "Section/Component"
 * @returns Section configuration or null if section not found
 * 
 * @example
 * getSectionConfig("Tokens/App/Foundations/Colors") // Returns Tokens config
 * getSectionConfig("HTML + CSS/Components/Button") // Returns HTML + CSS config
 */
export function getSectionConfig(title: string): SectionConfig | null {
  if (!title) return null;
  
  // Parse title to get section name (first part before '/')
  const parts = title.split('/');
  const sectionName = parts[0]?.trim();
  
  if (!sectionName) return null;
  
  // Check if section exists in config
  const config = sectionConfigs[sectionName];
  
  if (config) {
    return config;
  }
  
  // Return null if section not found (will use Storybook defaults)
  return null;
}

/**
 * Get all section names from navigation config
 * Useful for validation and debugging
 */
export function getAllSectionNames(): readonly string[] {
  return navigationConfig.sectionOrder;
}

/**
 * Check if a section has configuration
 */
export function hasSectionConfig(sectionName: string): boolean {
  return sectionName in sectionConfigs;
}

/**
 * Export section configs for external use (e.g., in decorators)
 */
export { sectionConfigs };


/**
 * Viewer Registry
 * 
 * Centralized registry for all Storybook viewer components.
 * Provides automatic viewer selection based on section configuration.
 * 
 * This registry maps viewer names (from section-config.ts) to actual React components.
 */

import type { ComponentType } from 'react';

// Import all viewer components
import { ColorScaleViewer } from '../stories/viewers/tokens/ColorScaleViewer';
import { TypographyViewer } from '../stories/viewers/tokens/TypographyViewer';
import { MarkdownViewer } from '../stories/viewers/tokens/MarkdownViewer';
import { ButtonStatesViewer } from '../stories/viewers/components/ButtonStatesViewer';
import { ButtonGroupViewer } from '../stories/viewers/components/ButtonGroupViewer';
import { IconGrid } from '../stories/viewers/components/IconGrid';
import { AdrViewer } from '../stories/viewers/docs/AdrViewer';
import { AdrListViewer } from '../stories/viewers/docs/AdrListViewer';
import { CodeExampleViewer } from '../stories/viewers/code/CodeExampleViewer';
import { PlaceholderPage } from '../stories/viewers/architecture/PlaceholderPage';

/**
 * Viewer registry mapping viewer names to components
 * 
 * Viewer names are defined in section-config.ts:
 * - "ColorScaleViewer" - for token color scales
 * - "TypographyViewer" - for typography tokens
 * - "ButtonStatesViewer" - for button component states
 * - "AdrViewer" - for ADR documents
 * - etc.
 */
export const viewerRegistry: Record<string, ComponentType<any>> = {
  // Token viewers
  ColorScaleViewer,
  TypographyViewer,
  MarkdownViewer,
  
  // Component viewers
  ButtonStatesViewer,
  ButtonGroupViewer,
  IconGrid,
  ComponentViewer: ButtonStatesViewer, // Alias for generic component viewer
  
  // Documentation viewers
  AdrViewer,
  AdrListViewer,
  
  // Code viewers
  CodeExampleViewer,
  
  // Architecture viewers
  PlaceholderPage,
  
  // Placeholder/fallback viewers
  TemplateViewer: PlaceholderPage,
  TailwindViewer: PlaceholderPage,
  WebComponentViewer: PlaceholderPage,
};

/**
 * Get viewer component by name
 * 
 * @param viewerName - Name of the viewer from section-config.ts
 * @returns React component or null if viewer not found
 * 
 * @example
 * const Viewer = getViewerComponent('ColorScaleViewer');
 * if (Viewer) {
 *   return <Viewer {...props} />;
 * }
 */
export function getViewerComponent(viewerName: string | null): ComponentType<any> | null {
  if (!viewerName) {
    return null;
  }
  
  return viewerRegistry[viewerName] || null;
}

/**
 * Check if a viewer exists in the registry
 * 
 * @param viewerName - Name of the viewer to check
 * @returns true if viewer exists, false otherwise
 */
export function hasViewer(viewerName: string | null): boolean {
  if (!viewerName) {
    return false;
  }
  
  return viewerName in viewerRegistry;
}

/**
 * Get all registered viewer names
 * 
 * @returns Array of all viewer names in the registry
 */
export function getAllViewerNames(): string[] {
  return Object.keys(viewerRegistry);
}


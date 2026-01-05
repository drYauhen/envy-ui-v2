/**
 * Section Badges Configuration (JavaScript version for manager context)
 * 
 * Configuration for section status badges in Storybook sidebar.
 * This file imports configuration from navigation.config.ts to maintain
 * a single source of truth.
 * 
 * Note: Using .js extension for manager context compatibility
 */

// Import navigation config - Storybook will handle TypeScript compilation
import { navigationConfig } from '../../navigation.config';
import { docsRegistry } from '../../../stories/viewers/docs/docs-registry';

/**
 * Configuration object for section badges addon
 */
export const badgesConfig = {
  sectionStatus: navigationConfig.sectionStatus,
  badgeLabels: navigationConfig.badgeLabels,
  badgeTooltips: navigationConfig.badgeTooltips,
  docStatus: Object.fromEntries(
    docsRegistry
      .filter((doc) => doc.storybookId && doc.status)
      .map((doc) => [doc.storybookId, doc.status])
  ),
  docBadgeTooltips: {
    'in-progress': 'In progress. Content is being actively updated.'
  }
};

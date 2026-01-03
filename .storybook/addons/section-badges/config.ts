/**
 * Section Badges Configuration
 * 
 * Configuration for section status badges in Storybook sidebar.
 * This file imports configuration from navigation.config.ts to maintain
 * a single source of truth.
 */

import { navigationConfig } from '../../navigation.config';

/**
 * Configuration object for section badges addon
 */
export const badgesConfig = {
  sectionStatus: navigationConfig.sectionStatus,
  badgeLabels: navigationConfig.badgeLabels,
  badgeTooltips: navigationConfig.badgeTooltips,
};


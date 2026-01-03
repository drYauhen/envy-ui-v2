/**
 * Section Badges Addon
 * 
 * Official Storybook addon for adding status badges to sidebar navigation sections.
 * Uses Storybook's addons API for proper integration.
 */

import { addons } from 'storybook/manager-api';
import { addStatusBadges } from './manager.js';
import { badgesConfig } from './config';

// CSS styles from styles.css (injected at runtime in manager context)
const badgeStyles = `
/* Section Status Badges */
.section-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  margin-left: 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 3px;
  line-height: 1.2;
  cursor: help;
  user-select: none;
  flex-shrink: 0;
}

.section-badge--active {
  background-color: #10b981;
  color: white;
}

.section-badge--exp {
  background-color: #f59e0b;
  color: white;
}

.section-badge--future {
  background-color: #6b7280;
  color: white;
}

/* Tooltip */
.section-badge-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background-color: rgba(31, 41, 55, 0.95);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 12px;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  white-space: normal;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  z-index: 1000;
  max-width: 200px;
  text-align: center;
  line-height: 1.4;
}

/* Tooltip arrow */
.section-badge-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(31, 41, 55, 0.95);
}

/* Show tooltip on hover */
.section-badge:hover .section-badge-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
  pointer-events: auto;
}

/* Ensure badge doesn't break button layout */
button[data-action="collapse-root"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
`;

// Function to inject CSS (only runs in browser)
function injectStyles() {
  if (typeof document === 'undefined') return;
  
  // Check if styles already injected
  if (document.getElementById('section-badges-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'section-badges-styles';
  style.textContent = badgeStyles;
  document.head.appendChild(style);
}

const ADDON_ID = 'envy-ui/section-badges';

// Register the addon
addons.register(ADDON_ID, () => {
  // Only run in browser context
  if (typeof document === 'undefined') return;
  
  // Inject CSS styles first
  injectStyles();
  
  // Initialize badges when manager loads
  function initBadges() {
    addStatusBadges(badgesConfig);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBadges);
  } else {
    // DOM already ready, run with delay to ensure sidebar is rendered
    setTimeout(initBadges, 100);
  }
  
  // Listen for Storybook navigation events
  const channel = addons.getChannel();
  if (channel) {
    channel.on('storybook-navigated', () => {
      setTimeout(initBadges, 200);
    });
    
    channel.on('storybook-stories-loaded', () => {
      setTimeout(initBadges, 200);
    });
  }
  
  // Also retry periodically in case sidebar loads late
  setTimeout(initBadges, 500);
  setTimeout(initBadges, 1000);
  setTimeout(initBadges, 2000);
});


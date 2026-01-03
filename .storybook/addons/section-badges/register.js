/**
 * Section Badges Addon
 * 
 * Official Storybook addon for adding status badges to sidebar navigation sections.
 * Uses CSS-only approach with data attributes for maximum stability.
 */

import { addons } from 'storybook/manager-api';
import { addStatusBadges } from './manager.js';
import { badgesConfig } from './config.js';

// CSS styles for badges (inline for manager context compatibility)
const badgeStyles = `
/* Section Status Badges - CSS-only implementation */
/* Badge via ::after pseudo-element - naturally positioned in flexbox */
button[data-action="collapse-root"][data-section-status]::after {
  content: attr(data-section-status);
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 3px;
  line-height: 1.2;
  cursor: help;
  user-select: none;
  white-space: nowrap;
  pointer-events: auto;
}

button[data-action="collapse-root"][data-section-status="active"]::after {
  background-color: #10b981;
  color: white;
  content: "Active";
}

button[data-action="collapse-root"][data-section-status="exp"]::after {
  background-color: #f59e0b;
  color: white;
  content: "Exp";
}

button[data-action="collapse-root"][data-section-status="future"]::after {
  background-color: #6b7280;
  color: white;
  content: "Future";
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

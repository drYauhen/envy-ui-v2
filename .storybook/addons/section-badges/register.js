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
  padding: 2px;
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

/* Doc Status Icons */
button[data-doc-status="in-progress"]::after {
  content: "";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  min-width: 8px;
  min-height: 14px;
  background-color: #f59e0b;
  border-radius: 3px;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22white%22%3E%3Cpath%20fill%3D%22white%22%20d%3D%22M%2012%200.375%20C%205.578125%200.375%200.375%205.578125%200.375%2012%20S%205.578125%2023.625%2012%2023.625%20S%2023.625%2018.421875%2023.625%2012%20S%2018.421875%200.375%2012%200.375%20Z%20M%2012%2021.375%20C%206.820313%2021.375%202.625%2017.179688%202.625%2012%20S%206.820313%202.625%2012%202.625%20S%2021.375%206.820313%2021.375%2012%20S%2017.179688%2021.375%2012%2021.375%20Z%20M%2014.896875%2016.48125%20L%2010.917188%2013.589063%20C%2010.771875%2013.48125%2010.6875%2013.3125%2010.6875%2013.134375%20V%205.4375%20C%2010.6875%205.128125%2010.940625%204.875%2011.25%204.875%20H%2012.75%20C%2013.059375%204.875%2013.3125%205.128125%2013.3125%205.4375%20V%2012.079687%20L%2016.44375%2014.357813%20C%2016.696875%2014.540625%2016.748438%2014.892187%2016.565625%2015.145313%20L%2015.684375%2016.359375%20C%2015.501563%2016.607813%2015.15%2016.664063%2014.896875%2016.48125%20Z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10px 10px;
  cursor: help;
  user-select: none;
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

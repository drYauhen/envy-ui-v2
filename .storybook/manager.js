import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandUrl: '/',
    brandImage: '/assets/logo/full-color.svg',
  },
});

// Section Badges Addon - inline implementation to avoid import issues
// Configuration
const sectionStatus = {
  "Docs": null,
  "Tokens": "active",
  "HTML + CSS": "active",
  "TSX (Clean)": "future",
  "TSX + React Aria": "active",
  "Templates": "future",
  "Tailwind": "future",
  "Web Components": "exp"
};

const badgeLabels = {
  active: "Active",
  exp: "Exp",
  future: "Future"
};

const badgeTooltips = {
  active: "Actively developed and maintained. Ready for production use.",
  exp: "Experimental/Exploratory. Proof of concept. Not production-ready.",
  future: "Planned for future development. Placeholder for upcoming features."
};

// CSS styles
const badgeStyles = `
/* Section Badge Styles */
.section-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px 4px 1px;
  margin-left: 0;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border-radius: 2px;
  line-height: 1.1;
  cursor: help;
  user-select: none;
  flex-shrink: 0;
  vertical-align: middle;
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

.section-badge-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(31, 41, 55, 0.95);
}

.section-badge:hover .section-badge-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
  pointer-events: auto;
}

/* Ensure button can contain badge without breaking layout */
button[data-action="collapse-root"] {
  position: relative;
}
`;

// Function to add badges
function addStatusBadges() {
  if (typeof document === 'undefined') return;
  
  console.log('[Section Badges] Looking for sidebar...');
  
  const sidebar = document.querySelector('[data-side="left"]') || 
                  document.querySelector('[role="complementary"]') ||
                  document.querySelector('.os-host[data-side="left"]') ||
                  document.querySelector('aside[role="complementary"]') ||
                  document.querySelector('[data-test-id="sidebar-container"]') ||
                  document.querySelector('.sidebar-container') ||
                  document.querySelector('[class*="sidebar"]');
  
  if (!sidebar) {
    console.log('[Section Badges] Sidebar not found, retrying...');
    setTimeout(addStatusBadges, 500);
    return;
  }

  console.log('[Section Badges] Sidebar found:', sidebar);

  function addBadges() {
    // Try multiple selectors for section buttons
    let sectionButtons = Array.from(
      document.querySelectorAll('.sidebar-subheading[data-nodetype="root"] > button[data-action="collapse-root"]')
    );
    
    // Fallback: try all collapse-root buttons
    if (sectionButtons.length === 0) {
      sectionButtons = Array.from(
        document.querySelectorAll('button[data-action="collapse-root"]')
      );
    }
    
    console.log('[Section Badges] Found', sectionButtons.length, 'section buttons');
    
    if (sectionButtons.length === 0) {
      console.log('[Section Badges] No buttons found, retrying...');
      setTimeout(addBadges, 200);
      return;
    }

    // Log all button texts for debugging
    console.log('[Section Badges] Button texts:', sectionButtons.map(btn => btn.textContent?.trim()));

    let badgesAdded = 0;

    Object.entries(sectionStatus).forEach(([sectionName, status]) => {
      if (!status) return;

      const sectionButton = sectionButtons.find(btn => {
        // Get text content, removing any existing badge text
        const text = btn.textContent?.trim() || '';
        const textWithoutBadge = text.replace(/\s*(Active|Exp|Future)\s*$/, '').trim();
        
        // Check if this button matches the section name and doesn't already have a badge
        const matches = textWithoutBadge === sectionName;
        const hasBadge = btn.querySelector('.section-badge') !== null;
        
        if (matches) {
          console.log('[Section Badges] Match found:', sectionName, 'text:', textWithoutBadge, 'hasBadge:', hasBadge);
        }
        
        return matches && !hasBadge;
      });

      if (sectionButton) {
        console.log('[Section Badges] Adding badge to:', sectionName, status);
        
        // Create badge
        const badge = document.createElement('span');
        badge.className = `section-badge section-badge--${status}`;
        badge.textContent = badgeLabels[status];
        badge.setAttribute('aria-label', badgeTooltips[status]);
        badge.setAttribute('title', badgeTooltips[status]);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'section-badge-tooltip';
        tooltip.textContent = badgeTooltips[status];
        badge.appendChild(tooltip);
        
        // Append badge to button (after text content)
        sectionButton.appendChild(badge);
        badgesAdded++;
      }
    });
    
    console.log('[Section Badges] Added', badgesAdded, 'badges');
  }

  // Use MutationObserver to handle dynamic sidebar updates
  const observer = new MutationObserver(() => {
    addBadges();
  });

  observer.observe(sidebar, { childList: true, subtree: true });
  
  // Initial runs with delays
  addBadges();
  setTimeout(addBadges, 100);
  setTimeout(addBadges, 500);
  setTimeout(addBadges, 1000);
  setTimeout(addBadges, 2000);
}

// Register addon
const ADDON_ID = 'envy-ui/section-badges';
addons.register(ADDON_ID, () => {
  if (typeof document === 'undefined') {
    console.log('[Section Badges] Skipping - not in browser context');
    return;
  }
  
  console.log('[Section Badges] Registering addon...');
  
  // Inject CSS
  if (!document.getElementById('section-badges-styles')) {
    const style = document.createElement('style');
    style.id = 'section-badges-styles';
    style.textContent = badgeStyles;
    document.head.appendChild(style);
    console.log('[Section Badges] CSS injected');
  }
  
  // Initialize badges
  function initBadges() {
    console.log('[Section Badges] Initializing badges...');
    addStatusBadges();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[Section Badges] DOMContentLoaded event fired');
      initBadges();
    });
  } else {
    console.log('[Section Badges] DOM already ready, initializing...');
    setTimeout(initBadges, 100);
  }
  
  const channel = addons.getChannel();
  if (channel) {
    channel.on('storybook-navigated', () => {
      console.log('[Section Badges] Storybook navigated');
      setTimeout(initBadges, 200);
    });
    channel.on('storybook-stories-loaded', () => {
      console.log('[Section Badges] Stories loaded');
      setTimeout(initBadges, 200);
    });
  }
  
  setTimeout(initBadges, 500);
  setTimeout(initBadges, 1000);
  setTimeout(initBadges, 2000);
});


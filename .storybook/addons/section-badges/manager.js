/**
 * Section Badges Manager
 * 
 * Adds status badges to Storybook sidebar navigation sections.
 * Uses configuration from navigation.config.ts
 */

// Import config - we'll need to handle this differently since we can't use ES6 imports in manager context
// Configuration will be passed from register.js

export function addStatusBadges(config) {
  console.log('[Section Badges] addStatusBadges called with config:', config);
  
  if (!config || !config.sectionStatus) {
    console.error('[Section Badges] Invalid config:', config);
    return;
  }
  
  const { sectionStatus, badgeLabels, badgeTooltips } = config;
  
  console.log('[Section Badges] Looking for sidebar...');
  
  // Try multiple selectors for sidebar
  const sidebar = document.querySelector('[data-side="left"]') || 
                  document.querySelector('[role="complementary"]') ||
                  document.querySelector('.os-host[data-side="left"]') ||
                  document.querySelector('aside[role="complementary"]') ||
                  document.querySelector('[data-test-id="sidebar-container"]') ||
                  document.querySelector('.sidebar-container') ||
                  document.querySelector('[class*="sidebar"]');
  
  if (!sidebar) {
    console.log('[Section Badges] Sidebar not found, retrying...');
    // Retry after a delay
    setTimeout(() => addStatusBadges(config), 500);
    return;
  }

  console.log('[Section Badges] Sidebar found:', sidebar);

  function addBadges() {
    // Find all section buttons
    const sectionButtons = Array.from(
      document.querySelectorAll('button[data-action="collapse-root"]')
    );
    
    console.log('[Section Badges] Found', sectionButtons.length, 'section buttons');
    
    if (sectionButtons.length === 0) {
      console.log('[Section Badges] No buttons found, retrying...');
      // Retry if buttons not found
      setTimeout(addBadges, 200);
      return;
    }

    // Log all button texts for debugging
    console.log('[Section Badges] Button texts:', sectionButtons.map(btn => btn.textContent?.trim()));

    let badgesAdded = 0;

    Object.entries(sectionStatus).forEach(([sectionName, status]) => {
      if (!status) return;

      // Find button by text content
      const sectionButton = sectionButtons.find(btn => {
        const text = btn.textContent?.trim() || '';
        // Remove any existing badge text from comparison
        const textWithoutBadge = text.replace(/\s*(Active|Exp|Future)\s*$/, '').trim();
        // Check if button text starts with section name and doesn't have badge yet
        const matches = textWithoutBadge === sectionName;
        const hasBadge = btn.querySelector('.section-badge') !== null;
        
        if (matches) {
          console.log('[Section Badges] Match found:', sectionName, 'text:', textWithoutBadge, 'hasBadge:', hasBadge);
        }
        
        return matches && !hasBadge;
      });

      if (sectionButton) {
        console.log('[Section Badges] Adding badge to:', sectionName, status);
        
        const badge = document.createElement('span');
        badge.className = `section-badge section-badge--${status}`;
        badge.textContent = badgeLabels[status];
        badge.setAttribute('aria-label', badgeTooltips[status]);
        badge.setAttribute('title', badgeTooltips[status]);
        
        // Add tooltip container
        const tooltip = document.createElement('div');
        tooltip.className = 'section-badge-tooltip';
        tooltip.textContent = badgeTooltips[status];
        badge.appendChild(tooltip);
        
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
  
  // Initial run with multiple attempts
  addBadges();
  setTimeout(addBadges, 100);
  setTimeout(addBadges, 500);
  setTimeout(addBadges, 1000);
  
  // Return cleanup function
  return () => observer.disconnect();
}


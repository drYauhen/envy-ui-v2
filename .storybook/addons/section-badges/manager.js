/**
 * Section Badges Manager
 * 
 * Adds status badges to Storybook sidebar navigation sections.
 * Uses configuration from navigation.config.ts
 */

// Import config - we'll need to handle this differently since we can't use ES6 imports in manager context
// Configuration will be passed from register.js

export function addStatusBadges(config) {
  const { sectionStatus, badgeLabels, badgeTooltips } = config;
  
  // Try multiple selectors for sidebar
  const sidebar = document.querySelector('[data-side="left"]') || 
                  document.querySelector('[role="complementary"]') ||
                  document.querySelector('.os-host[data-side="left"]') ||
                  document.querySelector('aside[role="complementary"]') ||
                  document.querySelector('[data-test-id="sidebar-container"]');
  
  if (!sidebar) {
    // Retry after a delay
    setTimeout(() => addStatusBadges(config), 500);
    return;
  }

  function addBadges() {
    // Find all section buttons
    const sectionButtons = Array.from(
      document.querySelectorAll('button[data-action="collapse-root"]')
    );
    
    if (sectionButtons.length === 0) {
      // Retry if buttons not found
      setTimeout(addBadges, 200);
      return;
    }

    Object.entries(sectionStatus).forEach(([sectionName, status]) => {
      if (!status) return;

      // Find button by text content
      const sectionButton = sectionButtons.find(btn => {
        const text = btn.textContent?.trim() || '';
        // Remove any existing badge text from comparison
        const textWithoutBadge = text.replace(/\s*(Active|Exp|Future)\s*$/, '').trim();
        // Check if button text starts with section name and doesn't have badge yet
        return textWithoutBadge === sectionName && !btn.querySelector('.section-badge');
      });

      if (sectionButton) {
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
      }
    });
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


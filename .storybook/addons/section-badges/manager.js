/**
 * Section Badges Manager
 * 
 * Adds data attributes to Storybook sidebar navigation sections for CSS-based badges.
 * Uses configuration from navigation.config.ts
 * 
 * This approach is more stable than DOM manipulation:
 * - Only adds data attributes (minimal DOM changes)
 * - CSS handles all visual rendering via ::after pseudo-elements
 * - No style overrides, no MutationObserver needed
 */

export function addStatusBadges(config) {
  if (!config || !config.sectionStatus) {
    console.error('[Section Badges] Invalid config:', config);
    return;
  }
  
  const { sectionStatus } = config;
  
  // Try multiple selectors for sidebar
  const sidebar = document.querySelector('[data-side="left"]') || 
                  document.querySelector('[role="complementary"]') ||
                  document.querySelector('.os-host[data-side="left"]') ||
                  document.querySelector('aside[role="complementary"]') ||
                  document.querySelector('[data-test-id="sidebar-container"]') ||
                  document.querySelector('.sidebar-container') ||
                  document.querySelector('[class*="sidebar"]');
  
  if (!sidebar) {
    // Retry after a delay
    setTimeout(() => addStatusBadges(config), 500);
    return;
  }

  function addDataAttributes() {
    // Find all section buttons (first level only)
    const sectionButtons = Array.from(
      document.querySelectorAll('button[data-action="collapse-root"]')
    );
    
    if (sectionButtons.length === 0) {
      // Retry if buttons not found
      setTimeout(addDataAttributes, 200);
      return;
    }

    let attributesAdded = 0;

    Object.entries(sectionStatus).forEach(([sectionName, status]) => {
      if (!status) return; // Skip sections without badges

      // Find button by text content
      const sectionButton = sectionButtons.find(btn => {
        const text = btn.textContent?.trim() || '';
        // Remove any existing badge text from comparison
        const textWithoutBadge = text.replace(/\s*(Active|Exp|Future)\s*$/, '').trim();
        // Check if button text matches section name and doesn't have data attribute yet
        return textWithoutBadge === sectionName && !btn.hasAttribute('data-section-status');
      });

      if (sectionButton) {
        // Only add data attribute - CSS will handle the rest
        sectionButton.setAttribute('data-section-status', status);
        sectionButton.setAttribute('title', getTooltipForStatus(status, config));
        attributesAdded++;
      }
    });
    
    if (attributesAdded > 0) {
      console.log('[Section Badges] Added', attributesAdded, 'data attributes');
    }
  }

  // Helper function to get tooltip text
  function getTooltipForStatus(status, config) {
    const { badgeTooltips } = config;
    return badgeTooltips[status] || '';
  }

  // Initial run with multiple attempts (sidebar may load asynchronously)
  addDataAttributes();
  setTimeout(addDataAttributes, 100);
  setTimeout(addDataAttributes, 500);
  setTimeout(addDataAttributes, 1000);
  
  // Note: Storybook navigation events are handled in register.js
  // This function only adds data attributes, no event listeners needed here
}

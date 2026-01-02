import React, { useEffect, useRef } from 'react';

// Logo SVG components
const FullLogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 90">
    <path fill="currentColor" d="M96.5 36.8a3.47 3.47 0 0 1 3.61-3.57h11.08c2.28 0 3.62 1.32 3.62 3.3 0 2-1.34 3.32-3.62 3.32h-7.45v5.7h6.83c2.28 0 3.6 1.28 3.6 3.31 0 2.03-1.32 3.3-3.6 3.3h-6.83v5.89h7.72c2.28 0 3.61 1.24 3.61 3.3 0 2.07-1.33 3.34-3.61 3.34H100.1a3.48 3.48 0 0 1-3.61-3.59V36.83m29.61-.07c0-2.52 1.52-3.8 3.61-3.8 1.93 0 2.59.82 5 3.85l12.02 14.85h.08v-14.9c0-2.52 1.52-3.8 3.62-3.8s3.61 1.28 3.61 3.8v24.36c0 2.52-1.5 3.8-3.6 3.8-1.93 0-2.64-.81-5-3.84L133.41 46.2h-.1v14.91c0 2.52-1.5 3.8-3.6 3.8-2.11 0-3.62-1.28-3.62-3.8V36.76Zm57.6-.58c.66-1.63 1.28-3.26 4.02-3.26a3.49 3.49 0 0 1 3.52 3.5c-.13.9-.39 1.77-.76 2.6l-9.02 22.06c-.7 1.77-1.34 3.8-4.02 3.8-2.68 0-3.3-2.03-4.01-3.8l-8.88-22.02a9.83 9.83 0 0 1-.76-2.6 3.47 3.47 0 0 1 3.53-3.5c2.72 0 3.35 1.63 4.02 3.26l6.16 16.07 6.2-16.1Zm24.55 24.94c0 2.52-1.52 3.8-3.62 3.8s-3.61-1.28-3.61-3.8V36.76c0-2.52 1.5-3.8 3.61-3.8 2.1 0 3.62 1.28 3.62 3.8v24.36Zm14.28-4.72c1.78 0 4.07 1.82 7.81 1.82 2.81 0 3.84-1.41 3.84-2.96 0-2.39-2.77-2.87-6.87-4.2-3.75-1.18-7.64-2.77-7.64-8.47 0-6.84 5.4-10.06 11.42-10.06 5.8 0 9.01 1.99 9.01 4.72a3.13 3.13 0 0 1-3.2 3.36c-2.33 0-3.08-1.2-6.16-1.2-1.97 0-3.31 1.02-3.31 2.57 0 1.8 1.78 2.02 6.78 3.65 3.93 1.28 7.74 3.26 7.74 9.23 0 7.25-5.41 10.5-12.15 10.5-4.24 0-10.67-1.62-10.67-5.16 0-1.93 1.2-3.8 3.39-3.8m38.28 4.72c0 2.52-1.51 3.8-3.62 3.8-2.1 0-3.62-1.28-3.62-3.8V36.76c0-2.52 1.52-3.8 3.62-3.8s3.62 1.28 3.62 3.8v24.36Zm19.37-12.17c0 4.98 2.27 9.77 7.85 9.77 5.59 0 7.86-4.82 7.86-9.77 0-4.95-2.28-9.78-7.86-9.78s-7.85 4.82-7.85 9.78Zm23.48 0c0 9.98-6.2 16.42-15.63 16.42-9.42 0-15.63-6.44-15.63-16.42s6.21-16.42 15.63-16.42c9.42 0 15.63 6.44 15.63 16.42ZM14.39 78.93a5.18 5.18 0 0 1-5.83-2.02 48.33 48.33 0 0 1-6.19-12.63C-5.86 38.63 8.55 11.11 34.52 2.95A49.93 49.93 0 0 1 47.62.7 5.1 5.1 0 1 1 48 10.88a38.65 38.65 0 0 0-33.4 21 38.54 38.54 0 0 0 2.5 39.32 5.04 5.04 0 0 1-2.71 7.7M49.54 88.9a36.73 36.73 0 0 1-28.3-25.2 36.27 36.27 0 0 1 13.79-40.35 5.2 5.2 0 0 1 7.17 1.17 5.07 5.07 0 0 1-1.18 7.12 26.22 26.22 0 0 0-9.95 29.08 26.79 26.79 0 0 0 36.84 16.13 5.2 5.2 0 0 1 6.87 2.44 5.08 5.08 0 0 1-2.45 6.8 37.15 37.15 0 0 1-22.79 2.81ZM49.83 58.23a5.01 5.01 0 0 1-5.04-5.08 5.5 5.5 0 0 1 5.24-5.43 13.38 13.38 0 0 0 12.72-13.17 12.1 12.1 0 0 0-2.6-7.7 5.32 5.32 0 0 1 .92-7.39 5.44 5.44 0 0 1 3.41-1.2 4.96 4.96 0 0 1 3.93 1.88 22.2 22.2 0 0 1 4.82 14.08 23.93 23.93 0 0 1-6.88 16.63 23.9 23.9 0 0 1-16.31 7.4h-.2"></path>
  </svg>
);

const IconOnlySVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 90">
    <path fill="currentColor" d="M14.39 78.88a5.18 5.18 0 0 1-5.83-2.02 48.33 48.33 0 0 1-6.19-12.62C-5.86 38.58 8.55 11.06 34.52 2.9A49.93 49.93 0 0 1 47.62.64a5.1 5.1 0 1 1 .39 10.2 38.65 38.65 0 0 0-33.4 21 38.54 38.54 0 0 0 2.49 39.32 5.04 5.04 0 0 1-2.71 7.71M49.54 88.86a36.73 36.73 0 0 1-28.3-25.2A36.27 36.27 0 0 1 35.03 23.3a5.2 5.2 0 0 1 7.17 1.16 5.07 5.07 0 0 1-1.18 7.12 26.22 26.22 0 0 0-9.95 29.09A26.73 26.73 0 0 0 67.91 76.8a5.2 5.2 0 0 1 6.87 2.45 5.08 5.08 0 0 1-2.45 6.79 37.15 37.15 0 0 1-22.79 2.82ZM49.83 58.18a5.01 5.01 0 0 1-5.04-5.08 5.5 5.5 0 0 1 5.24-5.42A13.38 13.38 0 0 0 62.75 34.5c.05-2.8-.87-5.51-2.6-7.7a5.32 5.32 0 0 1 .92-7.4 5.44 5.44 0 0 1 3.41-1.2 4.96 4.96 0 0 1 3.93 1.89 22.2 22.2 0 0 1 4.82 14.07 23.93 23.93 0 0 1-6.88 16.64 23.9 23.9 0 0 1-16.31 7.4h-.2"></path>
  </svg>
);

export interface SideNavProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  expandedItems?: Set<string>;
  setExpandedItems?: (value: Set<string>) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ 
  collapsed, 
  setCollapsed, 
  expandedItems = new Set(),
  setExpandedItems = () => {}
}) => {
  const toggleExpand = (key: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateScrollShadows = () => {
      const { scrollTop, scrollHeight, clientHeight } = content;
      const hasScroll = scrollHeight > clientHeight;
      const isAtTop = scrollTop <= 1; // Allow 1px tolerance
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;
      const nav = content.closest('.eui-side-nav') as HTMLElement;
      
      if (hasScroll) {
        content.classList.toggle('has-scroll-top', !isAtTop);
        content.classList.toggle('has-scroll-bottom', !isAtBottom);
        if (nav) {
          nav.classList.toggle('has-scroll-top', !isAtTop);
          nav.classList.toggle('has-scroll-bottom', !isAtBottom);
        }
      } else {
        content.classList.remove('has-scroll-top', 'has-scroll-bottom');
        if (nav) {
          nav.classList.remove('has-scroll-top', 'has-scroll-bottom');
        }
      }
    };

    // Initial check with small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updateScrollShadows();
    }, 100);

    // Update on scroll
    content.addEventListener('scroll', updateScrollShadows, { passive: true });
    
    // Update on resize (content might change)
    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(updateScrollShadows);
    });
    resizeObserver.observe(content);

    return () => {
      clearTimeout(timeoutId);
      content.removeEventListener('scroll', updateScrollShadows);
      resizeObserver.disconnect();
    };
  }, [collapsed, expandedItems]); // Re-run when layout changes
  
  return (
    <nav 
      className={`eui-side-nav ${collapsed ? 'eui-side-nav--collapsed' : ''}`}
      role="navigation"
      aria-label="Application navigation"
    >
      {/* Header */}
      <div className="eui-side-nav__header">
        <a 
          href="/" 
          className="eui-logo" 
          data-eui-variant={collapsed ? "icon-only" : "full"}
          data-eui-size="md"
          data-eui-color="inverse"
          aria-label="ENVISIO Home"
        >
          <span className="eui-logo__svg eui-logo__svg--full">
            <FullLogoSVG />
          </span>
          <span className="eui-logo__svg eui-logo__svg--icon">
            <IconOnlySVG />
          </span>
        </a>
        <div className="eui-side-nav__tooltip">ENVISIO</div>
      </div>
      
      {/* Toggle button */}
      <button 
        className="eui-side-nav__toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
      >
        <span 
          className="eui-side-nav__toggle-icon"
          data-eui-icon={collapsed ? "chevron-right" : "chevron-left"}
          aria-hidden="true"
        />
      </button>
      
      {/* Content */}
      <div className="eui-side-nav__content" ref={contentRef}>
        <ul className="eui-side-nav__list">
          {/* Section: Plans */}
          <li className="eui-side-nav__section">
            <div className="eui-side-nav__section-title">Plans</div>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="plan" aria-hidden="true" />
                <span className="eui-side-nav__item-label">View/Edit Plan</span>
              </div>
              <div className="eui-side-nav__tooltip">View/Edit Plan</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="submit-updates" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Submit Updates</span>
                <span className="eui-side-nav__item-badge">3</span>
              </div>
              <div className="eui-side-nav__tooltip">Submit Updates (3)</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button" data-eui-active="true">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="plan-reports" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Reports</span>
              </div>
              <div className="eui-side-nav__tooltip">Reports</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="plan-dashboards" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Public Dashboards</span>
              </div>
              <div className="eui-side-nav__tooltip">Public Dashboards</div>
            </button>
          </li>
          
          {/* Separator */}
          <li>
            <div className="eui-side-nav__separator" role="separator" />
          </li>
          
          {/* Section: Projects */}
          <li className="eui-side-nav__section">
            <div className="eui-side-nav__section-title">Projects</div>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="tasks" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Tasks</span>
              </div>
              <div className="eui-side-nav__tooltip">Tasks</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="pencil-ruler" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Projects Planning</span>
              </div>
              <div className="eui-side-nav__tooltip">Projects Planning</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="map-marked-alt" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Projects Dashboard</span>
              </div>
              <div className="eui-side-nav__tooltip">Projects Dashboard</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="plan-reports" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Project Reports</span>
              </div>
              <div className="eui-side-nav__tooltip">Project Reports</div>
            </button>
          </li>
          
          {/* Separator */}
          <li>
            <div className="eui-side-nav__separator" role="separator" />
          </li>
          
          {/* Section: Analytics */}
          <li className="eui-side-nav__section">
            <div className="eui-side-nav__section-title">Analytics</div>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="data-source" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Data Sources</span>
              </div>
              <div className="eui-side-nav__tooltip">Data Sources</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="visuals" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Visuals</span>
              </div>
              <div className="eui-side-nav__tooltip">Visuals</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="visuals-dashboard" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Dashboards</span>
              </div>
              <div className="eui-side-nav__tooltip">Dashboards</div>
            </button>
          </li>
          
          {/* Separator */}
          <li>
            <div className="eui-side-nav__separator" role="separator" />
          </li>
          
          {/* Section: People */}
          <li className="eui-side-nav__section">
            <div className="eui-side-nav__section-title">People</div>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="personal-assessment" aria-hidden="true" />
                <span className="eui-side-nav__item-label">My Assessments</span>
              </div>
              <div className="eui-side-nav__tooltip">My Assessments</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="team-assessment" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Team Assessments</span>
              </div>
              <div className="eui-side-nav__tooltip">Team Assessments</div>
            </button>
          </li>
          
          <li>
            <button className="eui-side-nav__item" type="button">
              <div className="eui-side-nav__item-content">
                <span className="eui-side-nav__item-icon" data-eui-icon="org-assessment" aria-hidden="true" />
                <span className="eui-side-nav__item-label">Organization Assessments</span>
              </div>
              <div className="eui-side-nav__tooltip">Organization Assessments</div>
            </button>
          </li>
        </ul>
        
        {/* Collapsible empty area */}
        <button
          className="eui-side-nav__collapse-zone"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          onMouseEnter={(e) => {
            const nav = e.currentTarget.closest('.eui-side-nav');
            if (nav) nav.setAttribute('data-eui-collapse-zone-hover', 'true');
          }}
          onMouseLeave={(e) => {
            const nav = e.currentTarget.closest('.eui-side-nav');
            if (nav) nav.removeAttribute('data-eui-collapse-zone-hover');
          }}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        />
      </div>
      
      {/* Footer */}
      <div className="eui-side-nav__footer">
        <div className="eui-side-nav__footer-avatar">
          <div className="eui-avatar" data-eui-size="md">
            <img src="https://i.pravatar.cc/150?img=12" alt="Alex Morgan" />
          </div>
        </div>
        <div className="eui-side-nav__footer-info">
          <div className="eui-side-nav__footer-name">Alex Morgan</div>
          <div className="eui-side-nav__footer-role">Head of Product</div>
        </div>
        <div className="eui-side-nav__tooltip">Alex Morgan<br />Head of Product</div>
      </div>
    </nav>
  );
};


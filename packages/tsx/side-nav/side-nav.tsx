import * as React from 'react';
import { useButton } from 'react-aria';
import { useLink } from 'react-aria';
import { useMenu, useMenuItem } from 'react-aria';
import { useToggleState, useTreeState } from 'react-stately';
import { useFocusRing } from 'react-aria';
import { useHover } from 'react-aria';
import { mergeProps } from 'react-aria';
import { Icon } from '../icon';
import { useOverlayScrollbar } from '../scrollbar';
import systemMeta from '../../../system.meta.json';
import '../../../src/ui/side-nav.css';
import '../../../src/ui/scrollbar.css';

const SYSTEM_PREFIX = systemMeta?.tokens?.prefix ?? 'eui';
const prefixedDataAttr = (name: string) => `data-${SYSTEM_PREFIX}-${name}`;
const dataAttr = (value: boolean | undefined) => (value ? '' : undefined);

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

// Helper function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export interface SideNavItem {
  key: string;
  label: string;
  icon: string;
  badge?: number | string;
  isActive?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onAction?: () => void;
}

export interface SideNavSection {
  title?: string;
  items: SideNavItem[];
}

export interface SideNavAdditionalLink {
  key: string;
  label: string;
  icon: string;
  href: string;
  onClick?: () => void;
}

export interface SideNavUserActions {
  onPreferencesClick?: () => void;
  onSignOutClick?: () => void;
  canViewPreferences?: boolean;
  canImpersonate?: boolean;
  onImpersonateClick?: () => void;
}

export interface SideNavCorporation {
  name: string;
  logoUrl?: string;
  timeZone?: string;
  onSettingsClick?: () => void;
  canViewSettings?: boolean;
}

export interface SideNavFooter {
  name: string;
  role: string;
  avatarUrl?: string;
  /**
   * Corporation information (shown in user mode)
   */
  corporation?: SideNavCorporation;
  /**
   * Additional links (Organization Chart, Employees, etc.)
   */
  additionalLinks?: SideNavAdditionalLink[];
  /**
   * User actions (Preferences, Sign Out, etc.)
   */
  userActions?: SideNavUserActions;
}

export interface SideNavProps {
  /**
   * Whether the navigation is collapsed
   */
  isCollapsed?: boolean;
  /**
   * Controlled collapsed state
   */
  defaultCollapsed?: boolean;
  /**
   * Callback when collapsed state changes
   */
  onCollapsedChange?: (isCollapsed: boolean) => void;
  /**
   * Navigation sections with items
   */
  sections?: SideNavSection[];
  /**
   * Footer information (user avatar, name, role)
   */
  footer?: SideNavFooter;
  /**
   * Selected item key
   */
  selectedKey?: string;
  /**
   * Callback when item is selected
   */
  onSelectionChange?: (key: string) => void;
  /**
   * Whether to show user mode (user/corporation info) instead of navigation
   */
  showUserMode?: boolean;
  /**
   * Callback when user mode toggle is requested
   */
  onUserModeToggle?: (showUserMode: boolean) => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

// Sign Out Button Component
const SignOutButton = React.memo(({ onSignOut }: { onSignOut: () => void }) => {
  const signOutButtonRef = React.useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: onSignOut,
      'aria-label': 'Sign out'
    },
    signOutButtonRef
  );
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      ref={signOutButtonRef}
      type="button"
      className={`${SYSTEM_PREFIX}-side-nav__sign-out-button`}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      {...{
        [prefixedDataAttr('hovered')]: dataAttr(isHovered),
        [prefixedDataAttr('focus-visible')]: dataAttr(isFocusVisible)
      }}
    >
      <div className={`${SYSTEM_PREFIX}-side-nav__item-content`}>
        <span
          className={`${SYSTEM_PREFIX}-side-nav__item-icon`}
          {...{ [prefixedDataAttr('icon')]: 'power-off' }}
          aria-hidden="true"
        />
        <span className={`${SYSTEM_PREFIX}-side-nav__item-label`}>Log Out</span>
      </div>
    </button>
  );
});

SignOutButton.displayName = 'SignOutButton';

// Footer Button Component
const FooterButton = React.memo(({
  footer,
  isCollapsed,
  showUserMode,
  onToggle
}: {
  footer: SideNavFooter;
  isCollapsed: boolean;
  showUserMode: boolean;
  onToggle: () => void;
}) => {
  const footerButtonRef = React.useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: onToggle,
      'aria-label': showUserMode ? 'Back to navigation' : 'Show user information'
    },
    footerButtonRef
  );
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      ref={footerButtonRef}
      className={`${SYSTEM_PREFIX}-side-nav__footer`}
      type="button"
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      {...{
        [prefixedDataAttr('hovered')]: dataAttr(isHovered),
        [prefixedDataAttr('focus-visible')]: dataAttr(isFocusVisible),
        [prefixedDataAttr('user-mode')]: dataAttr(showUserMode)
      }}
    >
      {showUserMode && isCollapsed ? (
        <>
          <span className={`${SYSTEM_PREFIX}-side-nav__footer-back-text`}>Back</span>
          <span
            className={`${SYSTEM_PREFIX}-side-nav__footer-chevron`}
            {...{ [prefixedDataAttr('icon')]: 'chevron-right' }}
            aria-hidden="true"
          />
        </>
      ) : showUserMode && !isCollapsed ? (
        <>
          <span className={`${SYSTEM_PREFIX}-side-nav__footer-back-text`}>Back</span>
          <span
            className={`${SYSTEM_PREFIX}-side-nav__footer-chevron`}
            {...{ [prefixedDataAttr('icon')]: 'chevron-right' }}
            aria-hidden="true"
          />
        </>
      ) : isCollapsed ? (
        <>
          <div className={`${SYSTEM_PREFIX}-side-nav__footer-avatar`}>
            <div className={`${SYSTEM_PREFIX}-avatar`} {...{ [prefixedDataAttr('size')]: 'sm' }}>
              {footer.avatarUrl ? (
                <img src={footer.avatarUrl} alt={footer.name} />
              ) : (
                <span className={`${SYSTEM_PREFIX}-avatar-initials`}>{getInitials(footer.name)}</span>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${SYSTEM_PREFIX}-side-nav__footer-avatar`}>
            <div className={`${SYSTEM_PREFIX}-avatar`} {...{ [prefixedDataAttr('size')]: 'sm' }}>
              {footer.avatarUrl ? (
                <img src={footer.avatarUrl} alt={footer.name} />
              ) : (
                <span className={`${SYSTEM_PREFIX}-avatar-initials`}>{getInitials(footer.name)}</span>
              )}
            </div>
          </div>
          <div className={`${SYSTEM_PREFIX}-side-nav__footer-info`}>
            <div className={`${SYSTEM_PREFIX}-side-nav__footer-name`}>{footer.name}</div>
            <div className={`${SYSTEM_PREFIX}-side-nav__footer-role`}>{footer.role}</div>
          </div>
          <span
            className={`${SYSTEM_PREFIX}-side-nav__footer-chevron`}
            {...{ [prefixedDataAttr('icon')]: 'chevron-right' }}
            aria-hidden="true"
          />
        </>
      )}
      <div className={`${SYSTEM_PREFIX}-side-nav__tooltip`}>
        {showUserMode ? 'Back to navigation' : `${footer.name}\n${footer.role}`}
      </div>
    </button>
  );
});

FooterButton.displayName = 'FooterButton';

export const SideNav = React.forwardRef<HTMLElement, SideNavProps>(function SideNav(
  {
    isCollapsed: controlledCollapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    sections = [],
    footer,
    selectedKey,
    onSelectionChange,
    showUserMode: controlledShowUserMode,
    onUserModeToggle,
    className,
    ...rest
  },
  forwardedRef
) {
  const navRef = React.useRef<HTMLElement>(null);
  React.useImperativeHandle(forwardedRef, () => navRef.current as HTMLElement);

  const isControlled = controlledCollapsed !== undefined;
  const toggleState = useToggleState({
    defaultSelected: defaultCollapsed,
    isSelected: isControlled ? controlledCollapsed : undefined,
    onChange: isControlled ? onCollapsedChange : undefined
  });

  const isCollapsed = isControlled ? controlledCollapsed : toggleState.isSelected;

  // User mode state
  const isUserModeControlled = controlledShowUserMode !== undefined;
  const [internalShowUserMode, setInternalShowUserMode] = React.useState(false);
  const showUserMode = isUserModeControlled ? controlledShowUserMode : internalShowUserMode;

  const handleUserModeToggle = React.useCallback(() => {
    const newShowUserMode = !showUserMode;
    if (!isUserModeControlled) {
      setInternalShowUserMode(newShowUserMode);
    }
    onUserModeToggle?.(newShowUserMode);

    // If menu is collapsed, expand it when switching to user mode
    if (isCollapsed && newShowUserMode) {
      if (isControlled) {
        onCollapsedChange?.(false);
      } else {
        toggleState.setSelected(false);
      }
    }
  }, [showUserMode, isUserModeControlled, isCollapsed, isControlled, onCollapsedChange, onUserModeToggle, toggleState]);

  // Toggle button
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const { buttonProps: toggleButtonProps } = useButton(
    {
      onPress: () => {
        if (isControlled) {
          onCollapsedChange?.(!controlledCollapsed);
        } else {
          toggleState.toggle();
        }
      },
      'aria-label': isCollapsed ? 'Expand navigation' : 'Collapse navigation'
    },
    toggleRef
  );

  const { focusProps: toggleFocusProps, isFocusVisible: toggleFocusVisible } = useFocusRing();
  const { hoverProps: toggleHoverProps, isHovered: toggleHovered } = useHover({});

  // Collapse zone button
  const collapseZoneRef = React.useRef<HTMLButtonElement>(null);
  const { buttonProps: collapseZoneButtonProps } = useButton(
    {
      onPress: () => {
        if (isControlled) {
          onCollapsedChange?.(!controlledCollapsed);
        } else {
          toggleState.toggle();
        }
      },
      'aria-label': isCollapsed ? 'Expand navigation' : 'Collapse navigation'
    },
    collapseZoneRef
  );

  // Menu Bar Pattern: Create tree state for menu items
  // Similar to Menu component, we use empty children and manage items manually
  // Items are registered dynamically via useMenuItem hooks
  const listRef = React.useRef<HTMLUListElement>(null);
  const treeState = useTreeState<object>({
    children: [],
    selectionMode: 'none' // Changed from 'single' to 'none' - selection is handled externally
  });

  // Use menu hook for the list container
  const { menuProps } = useMenu(
    {
      'aria-label': 'Main navigation'
    },
    treeState,
    listRef
  );

  // Overlay scrollbar
  const { contentRef, trackRef, thumbRef, containerProps } = useOverlayScrollbar();

  // Scroll shadow management
  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateScrollShadows = () => {
      const { scrollTop, scrollHeight, clientHeight } = content;
      const hasScroll = scrollHeight > clientHeight;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;
      const nav = content.closest(`.${SYSTEM_PREFIX}-side-nav`) as HTMLElement;

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

    const timeoutId = setTimeout(() => {
      updateScrollShadows();
    }, 100);

    content.addEventListener('scroll', updateScrollShadows, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateScrollShadows);
    });
    resizeObserver.observe(content);

    return () => {
      clearTimeout(timeoutId);
      content.removeEventListener('scroll', updateScrollShadows);
      resizeObserver.disconnect();
    };
  }, [isCollapsed, sections]);

  // User Mode Components
  const UserModeContent = React.memo(() => {
    if (!footer) return null;

    return (
      <div className={`${SYSTEM_PREFIX}-side-nav__user-mode`}>
        {/* User Info Section */}
        <div className={`${SYSTEM_PREFIX}-side-nav__user-info`}>
          <div className={`${SYSTEM_PREFIX}-side-nav__user-avatar-large`}>
            <div className={`${SYSTEM_PREFIX}-avatar`} {...{ [prefixedDataAttr('size')]: 'lg' }}>
              {footer.avatarUrl ? (
                <img src={footer.avatarUrl} alt={footer.name} />
              ) : (
                <span className={`${SYSTEM_PREFIX}-avatar-initials`}>{getInitials(footer.name)}</span>
              )}
            </div>
          </div>
          <div className={`${SYSTEM_PREFIX}-side-nav__user-details`}>
            <div className={`${SYSTEM_PREFIX}-side-nav__user-name`}>{footer.name}</div>
            <div className={`${SYSTEM_PREFIX}-side-nav__user-role`}>{footer.role}</div>
          </div>
          {footer.userActions?.canImpersonate && footer.userActions.onImpersonateClick && (
            <div className={`${SYSTEM_PREFIX}-side-nav__user-actions`}>
              <button
                type="button"
                className={`${SYSTEM_PREFIX}-side-nav__user-action-button`}
                onClick={footer.userActions.onImpersonateClick}
                aria-label="Switch user"
              >
                <span
                  className={`${SYSTEM_PREFIX}-side-nav__item-icon`}
                  {...{ [prefixedDataAttr('icon')]: 'swap' }}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className={`${SYSTEM_PREFIX}-side-nav__separator`} role="separator" />

        {/* Corporation Info Section */}
        {footer.corporation && (
          <>
            <div className={`${SYSTEM_PREFIX}-side-nav__corporation-info`}>
              {footer.corporation.logoUrl && (
                <div className={`${SYSTEM_PREFIX}-side-nav__corporation-logo`}>
                  <img src={footer.corporation.logoUrl} alt={footer.corporation.name} />
                </div>
              )}
              <div className={`${SYSTEM_PREFIX}-side-nav__corporation-details`}>
                <div className={`${SYSTEM_PREFIX}-side-nav__corporation-name`}>{footer.corporation.name}</div>
                {footer.corporation.timeZone && (
                  <div className={`${SYSTEM_PREFIX}-side-nav__corporation-context`}>{footer.corporation.timeZone}</div>
                )}
              </div>
              {footer.corporation.canViewSettings && footer.corporation.onSettingsClick && (
                <div className={`${SYSTEM_PREFIX}-side-nav__corporation-actions`}>
                  <button
                    type="button"
                    className={`${SYSTEM_PREFIX}-side-nav__corporation-action-button`}
                    onClick={footer.corporation.onSettingsClick}
                    aria-label="Organization settings"
                  >
                    <span
                      className={`${SYSTEM_PREFIX}-side-nav__item-icon`}
                      {...{ [prefixedDataAttr('icon')]: 'cog' }}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className={`${SYSTEM_PREFIX}-side-nav__separator`} role="separator" />
          </>
        )}

        {/* Additional Links */}
        {footer.additionalLinks && footer.additionalLinks.length > 0 && (
          <>
            <ul className={`${SYSTEM_PREFIX}-side-nav__additional-links`}>
              {footer.additionalLinks.map((link) => {
                const linkRef = React.useRef<HTMLAnchorElement>(null);
                const { linkProps } = useLink(
                  {
                    href: link.href,
                    onPress: () => {
                      link.onClick?.();
                    }
                  },
                  linkRef
                );
                const { hoverProps, isHovered } = useHover({});
                const { focusProps, isFocusVisible } = useFocusRing();

                return (
                  <li key={link.key}>
                    <a
                      ref={linkRef}
                      className={`${SYSTEM_PREFIX}-side-nav__additional-link`}
                      {...mergeProps(linkProps, hoverProps, focusProps)}
                      {...{
                        [prefixedDataAttr('hovered')]: dataAttr(isHovered),
                        [prefixedDataAttr('focus-visible')]: dataAttr(isFocusVisible)
                      }}
                    >
                      <div className={`${SYSTEM_PREFIX}-side-nav__item-content`}>
                        <span
                          className={`${SYSTEM_PREFIX}-side-nav__item-icon`}
                          {...{ [prefixedDataAttr('icon')]: link.icon }}
                          aria-hidden="true"
                        />
                        <span className={`${SYSTEM_PREFIX}-side-nav__item-label`}>{link.label}</span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Separator */}
            <div className={`${SYSTEM_PREFIX}-side-nav__separator`} role="separator" />
          </>
        )}

        {/* Sign Out Button (only when expanded) */}
        {!isCollapsed && footer.userActions?.onSignOutClick && (
          <div className={`${SYSTEM_PREFIX}-side-nav__user-actions-footer`}>
            <SignOutButton onSignOut={footer.userActions.onSignOutClick} />
          </div>
        )}
      </div>
    );
  });

  UserModeContent.displayName = 'UserModeContent';

  // Navigation item component with Menu Bar Pattern
  const NavItem = React.memo(({ item }: { item: SideNavItem }) => {
    const itemRef = React.useRef<HTMLLIElement>(null);
    const isSelected = selectedKey === item.key || item.isSelected || item.isActive;

    // Generate a stable key for this item (use item.key as the key)
    // Note: useMenuItem requires a key, and we use item.key which should be unique
    const { menuItemProps } = useMenuItem(
      {
        key: item.key,
        onAction: () => {
          onSelectionChange?.(item.key);
          item.onAction?.();
        },
        isSelected,
        isDisabled: item.isDisabled
      },
      treeState,
      itemRef
    );

    const { hoverProps, isHovered } = useHover({ isDisabled: item.isDisabled });
    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <li
        ref={itemRef}
        role="menuitem"
        {...{
          [prefixedDataAttr('active')]: dataAttr(item.isActive),
          [prefixedDataAttr('selected')]: dataAttr(isSelected),
          [prefixedDataAttr('disabled')]: dataAttr(item.isDisabled),
          [prefixedDataAttr('hovered')]: dataAttr(isHovered),
          [prefixedDataAttr('focus-visible')]: dataAttr(isFocusVisible)
        }}
        {...mergeProps(menuItemProps, hoverProps, focusProps)}
      >
        <button
          className={`${SYSTEM_PREFIX}-side-nav__item`}
          type="button"
          tabIndex={-1} // Remove from tab order - navigation handled by menuItemProps
        >
          <div className={`${SYSTEM_PREFIX}-side-nav__item-content`}>
            <span
              className={`${SYSTEM_PREFIX}-side-nav__item-icon`}
              {...{ [prefixedDataAttr('icon')]: item.icon }}
              aria-hidden="true"
            />
            <span className={`${SYSTEM_PREFIX}-side-nav__item-label`}>{item.label}</span>
            {item.badge !== undefined && (
              <span className={`${SYSTEM_PREFIX}-side-nav__item-badge`}>{item.badge}</span>
            )}
          </div>
          <div className={`${SYSTEM_PREFIX}-side-nav__tooltip`}>
            {item.label}
            {item.badge !== undefined && ` (${item.badge})`}
          </div>
        </button>
      </li>
    );
  });

  NavItem.displayName = 'NavItem';

  return (
    <nav
      ref={navRef}
      className={[`${SYSTEM_PREFIX}-side-nav`, isCollapsed ? `${SYSTEM_PREFIX}-side-nav--collapsed` : '', className]
        .filter(Boolean)
        .join(' ')}
      role="navigation"
      aria-label="Application navigation"
      {...rest}
    >
      {/* Header */}
      <div className={`${SYSTEM_PREFIX}-side-nav__header`}>
        <a
          href="/"
          className={`${SYSTEM_PREFIX}-logo`}
          {...{
            [prefixedDataAttr('variant')]: isCollapsed ? 'icon-only' : 'full',
            [prefixedDataAttr('size')]: 'md',
            [prefixedDataAttr('color')]: 'inverse'
          }}
          aria-label="ENVISIO Home"
        >
          <span className={`${SYSTEM_PREFIX}-logo__svg ${SYSTEM_PREFIX}-logo__svg--full`}>
            <FullLogoSVG />
          </span>
          <span className={`${SYSTEM_PREFIX}-logo__svg ${SYSTEM_PREFIX}-logo__svg--icon`}>
            <IconOnlySVG />
          </span>
        </a>
        <div className={`${SYSTEM_PREFIX}-side-nav__tooltip`}>ENVISIO</div>
      </div>

      {/* Toggle button */}
      <button
        ref={toggleRef}
        className={`${SYSTEM_PREFIX}-side-nav__toggle`}
        {...{
          [prefixedDataAttr('hovered')]: dataAttr(toggleHovered),
          [prefixedDataAttr('focus-visible')]: dataAttr(toggleFocusVisible)
        }}
        {...mergeProps(toggleButtonProps, toggleFocusProps, toggleHoverProps)}
      >
        <span
          className={`${SYSTEM_PREFIX}-side-nav__toggle-icon`}
          {...{ [prefixedDataAttr('icon')]: isCollapsed ? 'chevron-right' : 'chevron-left' }}
          aria-hidden="true"
        />
      </button>

      {/* Content wrapper with scrollbar */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div 
          className={`${SYSTEM_PREFIX}-side-nav__content eui-scrollbar-content`} 
          ref={contentRef}
        >
          {!showUserMode ? (
            <>
              <ul
                ref={listRef}
                className={`${SYSTEM_PREFIX}-side-nav__list`}
                role="menu"
                aria-label="Main navigation"
                {...menuProps}
              >
                {sections.map((section, sectionIndex) => (
                  <React.Fragment key={sectionIndex}>
                    {section.title && (
                      <li className={`${SYSTEM_PREFIX}-side-nav__section`}>
                        <div className={`${SYSTEM_PREFIX}-side-nav__section-title`}>{section.title}</div>
                      </li>
                    )}
                    {section.items.map((item) => (
                      <NavItem key={item.key} item={item} />
                    ))}
                    {sectionIndex < sections.length - 1 && (
                      <li>
                        <div className={`${SYSTEM_PREFIX}-side-nav__separator`} role="separator" />
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>

              {/* Collapsible empty area */}
              <button
                ref={collapseZoneRef}
                className={`${SYSTEM_PREFIX}-side-nav__collapse-zone`}
                type="button"
                {...collapseZoneButtonProps}
                onMouseEnter={(e) => {
                  const nav = e.currentTarget.closest(`.${SYSTEM_PREFIX}-side-nav`) as HTMLElement;
                  if (nav) nav.setAttribute(prefixedDataAttr('collapse-zone-hover'), 'true');
                }}
                onMouseLeave={(e) => {
                  const nav = e.currentTarget.closest(`.${SYSTEM_PREFIX}-side-nav`) as HTMLElement;
                  if (nav) nav.removeAttribute(prefixedDataAttr('collapse-zone-hover'));
                }}
              />
            </>
          ) : (
            <UserModeContent />
          )}
        </div>
        {/* Overlay scrollbar - outside content to stay fixed */}
        <div ref={trackRef} className="eui-scrollbar-track">
          <div ref={thumbRef} className="eui-scrollbar-thumb" />
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <FooterButton
          footer={footer}
          isCollapsed={isCollapsed}
          showUserMode={showUserMode}
          onToggle={handleUserModeToggle}
        />
      )}
    </nav>
  );
});

SideNav.displayName = 'SideNav';


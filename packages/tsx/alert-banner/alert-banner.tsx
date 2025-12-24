import React, { useState, useEffect } from 'react';
import { useButton } from 'react-aria';
import { Icon } from '../icon';

export interface AlertBannerProps {
  /**
   * Unique identifier for this banner (used for persistence)
   */
  id: string;
  /**
   * Banner variant
   */
  variant?: 'info' | 'warning' | 'error' | 'success';
  /**
   * Main message text (used when children not provided)
   */
  message?: string;
  /**
   * Optional link text and URL (used when children not provided)
   */
  link?: {
    text: string;
    href: string;
  };
  /**
   * Custom content via slots. Use data-eui-slot="icon", "content", or "actions"
   * If children provided, message and link props are ignored
   */
  children?: React.ReactNode;
  /**
   * Whether banner can be dismissed
   */
  dismissible?: boolean;
  /**
   * Whether to show "Don't show again" button
   */
  allowPersistence?: boolean;
  /**
   * Dismissal behavior
   */
  dismissalType?: 'session' | 'persistent' | 'preference';
  /**
   * Icon to display (defaults based on variant, used when children not provided)
   */
  icon?: string;
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;
  className?: string;
}

const STORAGE_KEY_PREFIX = 'eui-alert-banner-dismissed-';

const defaultIcons = {
  info: 'info-circle',
  warning: 'exclamation-circle',
  error: 'exclamation-circle',
  success: 'check-circle',
} as const;

export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  function AlertBanner(
    {
      id,
      variant = 'info',
      message,
      link,
      children,
      dismissible = true,
      allowPersistence = false,
      dismissalType = 'session',
      icon,
      onDismiss,
      className,
      ...rest
    },
    ref
  ) {
    const [isDismissed, setIsDismissed] = useState(false);

    // Check storage on mount
    useEffect(() => {
      if (dismissalType === 'persistent' || dismissalType === 'preference') {
        const dismissed = localStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
        if (dismissed === 'true') {
          setIsDismissed(true);
        }
      } else if (dismissalType === 'session') {
        const dismissed = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
        if (dismissed === 'true') {
          setIsDismissed(true);
        }
      }
    }, [id, dismissalType]);

    const handleDismiss = () => {
      setIsDismissed(true);

      if (dismissalType === 'persistent' || dismissalType === 'preference') {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${id}`, 'true');
      } else {
        sessionStorage.setItem(`${STORAGE_KEY_PREFIX}${id}`, 'true');
      }

      onDismiss?.();
    };

    const handleDontShowAgain = () => {
      setIsDismissed(true);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${id}`, 'true');
      onDismiss?.();
    };

    const iconName = icon || defaultIcons[variant];

    const dismissButtonRef = React.useRef<HTMLButtonElement>(null);
    const { buttonProps: dismissButtonProps } = useButton(
      {
        onPress: handleDismiss,
      },
      dismissButtonRef
    );

    const dontShowButtonRef = React.useRef<HTMLButtonElement>(null);
    const { buttonProps: dontShowButtonProps } = useButton(
      {
        onPress: handleDontShowAgain,
      },
      dontShowButtonRef
    );

    if (isDismissed) {
      return null;
    }

    // Check if custom content via children/slots is provided
    const hasCustomContent = React.Children.count(children) > 0;

    // Extract slots from children if provided
    const slots: {
      icon: React.ReactNode | null;
      content: React.ReactNode | null;
      actions: React.ReactNode | null;
    } = {
      icon: null,
      content: null,
      actions: null,
    };

    if (hasCustomContent) {
      React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
          const slot = (child.props as any)?.['data-eui-slot'];
          if (slot === 'icon') {
            slots.icon = child;
          } else if (slot === 'content') {
            slots.content = child;
          } else if (slot === 'actions') {
            slots.actions = child;
          } else if (!slot) {
            // If no slot specified, assume it's content
            slots.content = slots.content ? (
              <>
                {slots.content}
                {child}
              </>
            ) : child;
          }
        }
      });
    }

    return (
      <div
        ref={ref}
        className={`eui-alert-banner ${className || ''}`}
        data-eui-variant={variant}
        data-eui-dismissible={dismissible}
        data-eui-id={id}
        data-eui-dismissed={isDismissed}
        role="banner"
        aria-live="polite"
        {...rest}
      >
        <div className="eui-alert-banner-content">
          {hasCustomContent ? (
            <>
              {slots.icon ? (
                <span className="eui-alert-banner-icon" aria-hidden="true">
                  {slots.icon}
                </span>
              ) : (
                <span className="eui-alert-banner-icon" aria-hidden="true">
                  <Icon name={iconName as any} size={20} />
                </span>
              )}
              {slots.content ? (
                <div className="eui-alert-banner-message">{slots.content}</div>
              ) : null}
            </>
          ) : (
            <>
              <span className="eui-alert-banner-icon" aria-hidden="true">
                <Icon name={iconName as any} size={20} />
              </span>
              <div className="eui-alert-banner-message">
                {message && (
                  <p className="eui-alert-banner-text">{message}</p>
                )}
                {link && (
                  <a href={link.href} className="eui-alert-banner-link">
                    {link.text}
                  </a>
                )}
              </div>
            </>
          )}
        </div>
        <div className="eui-alert-banner-actions">
          {hasCustomContent && slots.actions ? (
            <>
              {slots.actions}
              {dismissible && (
                <button
                  ref={dismissButtonRef}
                  className="eui-alert-banner-dismiss"
                  aria-label="Dismiss"
                  {...dismissButtonProps}
                >
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
                </button>
              )}
            </>
          ) : (
            <>
              {allowPersistence && (
                <button
                  ref={dontShowButtonRef}
                  className="eui-alert-banner-dont-show"
                  {...dontShowButtonProps}
                >
                  Don't show again
                </button>
              )}
              {dismissible && (
                <button
                  ref={dismissButtonRef}
                  className="eui-alert-banner-dismiss"
                  aria-label="Dismiss"
                  {...dismissButtonProps}
                >
                  <span style={{ fontSize: '16px', lineHeight: 1 }}>×</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);


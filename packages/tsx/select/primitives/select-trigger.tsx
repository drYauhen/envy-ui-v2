import React, { forwardRef } from 'react';
import { mergeProps } from 'react-aria';
import { Icon } from '../../icon';

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Selected value text to display
   */
  value?: string;
  /**
   * Whether value is placeholder
   */
  isPlaceholder?: boolean;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether trigger is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether dropdown is open
   */
  isOpen?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger(
    {
      value,
      isPlaceholder = false,
      size = 'md',
      isDisabled,
      isOpen,
      className,
      children,
      ...rest
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={`eui-select-trigger eui-select ${className || ''}`}
        data-eui-size={size}
        disabled={isDisabled}
        aria-expanded={isOpen}
        {...rest}
      >
        {children || (
          <>
            <span
              className="eui-select-value"
              data-placeholder={isPlaceholder}
            >
              {value || 'Select an option'}
            </span>
            <span className="eui-select-chevron" aria-hidden="true">
              <Icon name="chevron-down" size={16} />
            </span>
          </>
        )}
      </button>
    );
  }
);



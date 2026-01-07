import * as React from 'react';
import systemMeta from '../../system.meta.json';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'default' | 'subtle';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Visual orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Visual style variant.
   * - 'default': solid line for clear separation
   * - 'subtle': dashed line for less prominent separation
   * @default 'default'
   */
  variant?: DividerVariant;
}

/**
 * Divider component - a visual separator for organizing content and UI sections.
 *
 * Uses semantic `<hr>` element which has an implicit `role="separator"`.
 * For vertical dividers, applies `aria-orientation="vertical"`.
 *
 * @example
 * // Horizontal divider (default)
 * <Divider />
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // Subtle variant
 * <Divider variant="subtle" />
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  function Divider(
    { orientation = 'horizontal', variant = 'default', className, ...rest },
    ref
  ) {
    const systemPrefix = systemMeta?.tokens?.prefix ?? 'eui';
    const classes = [`${systemPrefix}-divider`, className]
      .filter(Boolean)
      .join(' ');

    const ariaProps =
      orientation === 'vertical' ? { 'aria-orientation': 'vertical' as const } : {};

    return (
      <hr
        ref={ref}
        className={classes}
        data-eui-orientation={orientation}
        data-eui-variant={variant}
        {...ariaProps}
        {...rest}
      />
    );
  }
);

Divider.displayName = 'Divider';

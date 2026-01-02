import * as React from 'react';
import { useOverlayScrollbar, UseOverlayScrollbarOptions } from './use-overlay-scrollbar';
import '../../../src/ui/scrollbar.css';

/**
 * Props for OverlayScrollbar component
 */
export interface OverlayScrollbarProps extends UseOverlayScrollbarOptions {
  /**
   * Children (content to scroll)
   */
  children: React.ReactNode;
  /**
   * Additional CSS class for container
   */
  className?: string;
  /**
   * Additional CSS class for content
   */
  contentClassName?: string;
  /**
   * Styles for container
   */
  style?: React.CSSProperties;
  /**
   * Styles for content
   */
  contentStyle?: React.CSSProperties;
}

/**
 * OverlayScrollbar Component
 * 
 * A wrapper component that provides a custom overlay scrollbar.
 * The scrollbar doesn't take space in layout and is always visible when content is scrollable.
 * 
 * @example
 * ```tsx
 * <OverlayScrollbar>
 *   <div>Your scrollable content here</div>
 * </OverlayScrollbar>
 * ```
 * 
 * @example
 * ```tsx
 * <OverlayScrollbar 
 *   className="my-container"
 *   contentClassName="my-content"
 *   width={10}
 * >
 *   <div>Custom styled scrollbar</div>
 * </OverlayScrollbar>
 * ```
 */
export const OverlayScrollbar = React.forwardRef<HTMLDivElement, OverlayScrollbarProps>(
  function OverlayScrollbar(
    {
      children,
      className,
      contentClassName,
      style,
      contentStyle,
      alwaysVisible = true,
      width = 8,
      thumbColor = 'rgba(0, 0, 0, 0.12)',
      thumbHoverColor = 'rgba(0, 0, 0, 0.2)',
      ...rest
    },
    ref
  ) {
    const { contentRef, trackRef, thumbRef, containerProps } = useOverlayScrollbar({
      alwaysVisible,
      width,
      thumbColor,
      thumbHoverColor,
    });

    return (
      <div
        ref={ref}
        {...containerProps}
        className={`eui-scrollbar-container ${className || ''}`.trim()}
        style={style}
        {...rest}
      >
        <div
          ref={contentRef}
          className={`eui-scrollbar-content ${contentClassName || ''}`.trim()}
          style={{ 
            overflowY: 'auto', 
            overflowX: 'hidden',
            ...contentStyle 
          }}
        >
          {children}
        </div>
        <div ref={trackRef} className="eui-scrollbar-track">
          <div ref={thumbRef} className="eui-scrollbar-thumb" />
        </div>
      </div>
    );
  }
);


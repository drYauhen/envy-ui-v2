import * as React from 'react';
import { useTransition } from './use-transition';
import type { TransitionType } from './types';
import '../../../src/ui/transition.css';

export interface TransitionProps {
  /**
   * Current state (true = show alternate content, false = primary)
   */
  isActive: boolean;
  
  /**
   * Primary content (shown when isActive === false)
   */
  children: React.ReactNode;
  
  /**
   * Alternate content (shown when isActive === true)
   */
  alternate: React.ReactNode;
  
  /**
   * Transition type
   * @default 'slide-left'
   */
  type?: TransitionType;
  
  /**
   * Enable animation
   * @default true
   */
  animated?: boolean;
  
  /**
   * Animation duration (CSS value)
   * @default '150ms'
   */
  duration?: string;
  
  /**
   * Easing function
   * @default 'ease-in-out'
   */
  easing?: string;
  
  /**
   * Focus management on switch
   * @default true
   */
  manageFocus?: boolean;
  
  /**
   * Selector to find the first focusable element in the new content
   * @default 'button, a, [tabindex]:not([tabindex="-1"])'
   */
  focusSelector?: string;
  
  /**
   * Callback when transition starts
   */
  onTransitionStart?: () => void;
  
  /**
   * Callback when transition ends
   */
  onTransitionEnd?: () => void;
  
  /**
   * Additional CSS class for the container
   */
  className?: string;
  
  /**
   * Additional styles for the container
   */
  style?: React.CSSProperties;
}

/**
 * Transition Component
 * 
 * Universal component for animated transitions between two content states.
 * Supports multiple transition types (slide, fade, scale) with full accessibility support.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Transition isActive={showUserMode} alternate={<UserMode />}>
 *   <NavigationMode />
 * </Transition>
 * ```
 * 
 * @example
 * ```tsx
 * // Without animation (instant switch)
 * <Transition 
 *   isActive={showUserMode} 
 *   alternate={<UserMode />}
 *   animated={false}
 * >
 *   <NavigationMode />
 * </Transition>
 * ```
 * 
 * @example
 * ```tsx
 * // Custom animation
 * <Transition 
 *   isActive={showUserMode} 
 *   alternate={<UserMode />}
 *   type="fade"
 *   duration="300ms"
 *   easing="cubic-bezier(0.4, 0, 0.2, 1)"
 * >
 *   <NavigationMode />
 * </Transition>
 * ```
 */
export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  function Transition(
    {
      isActive,
      children,
      alternate,
      type = 'slide-left',
      animated = true,
      duration = '150ms',
      easing = 'ease-in-out',
      manageFocus = true,
      focusSelector = 'button, a, [tabindex]:not([tabindex="-1"])',
      onTransitionStart,
      onTransitionEnd,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const primaryRef = React.useRef<HTMLDivElement>(null);
    const alternateRef = React.useRef<HTMLDivElement>(null);
    
    // Merge refs
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const {
      isTransitioning,
      shouldRenderPrimary,
      shouldRenderAlternate,
      handleTransitionEnd
    } = useTransition({
      isActive,
      animated,
      duration,
      onTransitionStart,
      onTransitionEnd,
      manageFocus,
      focusSelector,
      primaryRef,
      alternateRef
    });

    // Determine which transition type to use
    const effectiveType = animated ? type : 'none';
    
    // CSS classes
    const containerClasses = [
      'eui-transition',
      `eui-transition--${effectiveType}`,
      isActive ? 'eui-transition--active' : '',
      isTransitioning ? 'eui-transition--transitioning' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={containerRef}
        className={containerClasses}
        style={{
          '--eui-transition-duration': duration,
          '--eui-transition-easing': easing,
          ...style
        } as React.CSSProperties}
        {...rest}
      >
        {/* Wrapper for horizontal layout */}
        <div className="eui-transition__wrapper">
          {/* Primary content */}
          {(shouldRenderPrimary || isTransitioning) && (
            <div
              ref={primaryRef}
              className={[
                'eui-transition__content',
                'eui-transition__content--primary'
              ].filter(Boolean).join(' ')}
              aria-hidden={isActive ? 'true' : 'false'}
              {...(isActive && {
                'data-tabindex-disabled': 'true',
                style: { pointerEvents: 'none' }
              })}
              onTransitionEnd={handleTransitionEnd}
            >
              {children}
            </div>
          )}

          {/* Alternate content */}
          {(shouldRenderAlternate || isTransitioning) && (
            <div
              ref={alternateRef}
              className={[
                'eui-transition__content',
                'eui-transition__content--alternate'
              ].filter(Boolean).join(' ')}
              aria-hidden={!isActive ? 'true' : 'false'}
              {...(!isActive && {
                'data-tabindex-disabled': 'true',
                style: { pointerEvents: 'none' }
              })}
              onTransitionEnd={handleTransitionEnd}
            >
              {alternate}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Transition.displayName = 'Transition';

import * as React from 'react';

interface UseTransitionOptions {
  isActive: boolean;
  animated: boolean;
  duration: string;
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
  manageFocus: boolean;
  focusSelector: string;
  primaryRef: React.RefObject<HTMLDivElement>;
  alternateRef: React.RefObject<HTMLDivElement>;
}

/**
 * Parse CSS duration to milliseconds
 */
function parseDuration(duration: string): number {
  const match = duration.match(/([\d.]+)(ms|s)/);
  if (!match) return 150;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  return unit === 's' ? value * 1000 : value;
}

export function useTransition({
  isActive,
  animated,
  duration,
  onTransitionStart,
  onTransitionEnd,
  manageFocus,
  focusSelector,
  primaryRef,
  alternateRef
}: UseTransitionOptions) {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  // Initial state: render only the active content
  const [shouldRenderPrimary, setShouldRenderPrimary] = React.useState(!isActive);
  const [shouldRenderAlternate, setShouldRenderAlternate] = React.useState(isActive);
  const prevIsActiveRef = React.useRef(isActive);
  const isInitialMount = React.useRef(true);

  // Handle switching
  React.useEffect(() => {
    // On initial mount, just sync state
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevIsActiveRef.current = isActive;
      setShouldRenderPrimary(!isActive);
      setShouldRenderAlternate(isActive);
      return;
    }

    if (prevIsActiveRef.current === isActive) return;
    
    const previousIsActive = prevIsActiveRef.current;
    prevIsActiveRef.current = isActive;

    if (animated) {
      setIsTransitioning(true);
      onTransitionStart?.();

      // Render both contents for animation
      setShouldRenderPrimary(true);
      setShouldRenderAlternate(true);

      // After animation, keep only the active content
      const durationMs = parseDuration(duration);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setShouldRenderPrimary(!isActive);
        setShouldRenderAlternate(isActive);
        onTransitionEnd?.();
      }, durationMs);

      return () => clearTimeout(timer);
    } else {
      // Instant switch without animation
      setIsTransitioning(false);
      setShouldRenderPrimary(!isActive);
      setShouldRenderAlternate(isActive);
      onTransitionEnd?.();
    }
  }, [isActive, animated, duration, onTransitionStart, onTransitionEnd]);

  // Focus management
  React.useEffect(() => {
    if (!manageFocus || !isTransitioning || !animated) return;

    const durationMs = parseDuration(duration);
    const timer = setTimeout(() => {
      const targetRef = isActive ? alternateRef : primaryRef;
      const targetElement = targetRef.current;
      
      if (targetElement) {
        const firstFocusable = targetElement.querySelector(focusSelector) as HTMLElement;
        firstFocusable?.focus();
      }
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isActive, isTransitioning, animated, manageFocus, focusSelector, duration, primaryRef, alternateRef]);

  const handleTransitionEnd = React.useCallback((e: React.TransitionEvent) => {
    // Handle only events from the element itself, not its children
    if (e.target === e.currentTarget) {
      // Focus is already handled in useEffect
    }
  }, []);

  return {
    isTransitioning,
    shouldRenderPrimary,
    shouldRenderAlternate,
    handleTransitionEnd
  };
}

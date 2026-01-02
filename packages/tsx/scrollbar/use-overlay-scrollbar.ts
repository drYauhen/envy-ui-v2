import * as React from 'react';

/**
 * Options for useOverlayScrollbar hook
 */
export interface UseOverlayScrollbarOptions {
  /**
   * Show scrollbar always (when scrollable) or only on hover
   * @default true
   */
  alwaysVisible?: boolean;
  /**
   * Scrollbar width in pixels
   * @default 8
   */
  width?: number;
  /**
   * Thumb color
   * @default 'rgba(0, 0, 0, 0.12)'
   */
  thumbColor?: string;
  /**
   * Thumb color on hover
   * @default 'rgba(0, 0, 0, 0.2)'
   */
  thumbHoverColor?: string;
}

/**
 * Return value from useOverlayScrollbar hook
 */
export interface UseOverlayScrollbarReturn {
  /**
   * Ref for content container (should have overflow-y: auto)
   */
  contentRef: React.RefObject<HTMLDivElement>;
  /**
   * Ref for track element
   */
  trackRef: React.RefObject<HTMLDivElement>;
  /**
   * Ref for thumb element
   */
  thumbRef: React.RefObject<HTMLDivElement>;
  /**
   * Props for container (adds position: relative)
   */
  containerProps: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * React hook for custom overlay scrollbar
 * 
 * Provides refs and logic for a custom overlay scrollbar that doesn't take space in layout.
 * The scrollbar is always visible when content is scrollable.
 * 
 * @example
 * ```tsx
 * const { contentRef, trackRef, thumbRef, containerProps } = useOverlayScrollbar();
 * 
 * return (
 *   <div {...containerProps}>
 *     <div ref={contentRef} style={{ overflowY: 'auto' }}>
 *       Content
 *     </div>
 *     <div ref={trackRef} className="eui-scrollbar-track">
 *       <div ref={thumbRef} className="eui-scrollbar-thumb" />
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useOverlayScrollbar(
  options: UseOverlayScrollbarOptions = {}
): UseOverlayScrollbarReturn {
  const {
    alwaysVisible = true,
    width = 8,
    thumbColor = 'rgba(0, 0, 0, 0.12)',
    thumbHoverColor = 'rgba(0, 0, 0, 0.2)',
  } = options;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    const content = contentRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!content || !track || !thumb) return;

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight } = content;
      const hasScroll = scrollHeight > clientHeight;

      if (!hasScroll) {
        track.setAttribute('data-eui-hidden', 'true');
        thumb.style.display = 'none';
        return;
      }

      // Always show when scrollable
      track.removeAttribute('data-eui-hidden');
      thumb.style.display = 'block';

      // Track height must match content's visible height (clientHeight)
      // Since track and content are siblings in the same container,
      // track should have the same height as content's visible area
      const trackHeight = clientHeight;
      
      // Set track height to match content's visible height
      // Track is positioned absolutely, so it will align with content's top (top: 0)
      track.style.setProperty('height', `${trackHeight}px`, 'important');
      track.style.setProperty('top', '0', 'important');
      track.style.setProperty('bottom', 'auto', 'important'); // Override CSS bottom: 0
      
      // Safety check
      if (trackHeight === 0 || !trackHeight) {
        requestAnimationFrame(updateScrollbar);
        return;
      }

      const scrollableHeight = scrollHeight - clientHeight;
      
      if (scrollableHeight <= 0) {
        thumb.style.display = 'none';
        return;
      }

      // Calculate thumb height: represents how much content is visible
      // Formula: (visible height / total height) * track height
      // Example: (758 / 851) * 758 ≈ 674px (most of track is visible)
      // The larger the scrollable area, the smaller the thumb
      const visibleRatio = clientHeight / scrollHeight;
      const thumbHeight = Math.max(20, visibleRatio * trackHeight);
      const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
      
      // Calculate thumb position based on scroll position
      // When scrollTop = 0, thumbTop = 0 (at top)
      // When scrollTop = scrollableHeight, thumbTop = maxThumbTop (at bottom)
      const scrollRatio = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
      const thumbTop = Math.max(0, Math.min(maxThumbTop, scrollRatio * maxThumbTop));

      // Apply styles with !important to ensure they override any CSS
      thumb.style.setProperty('height', `${thumbHeight}px`, 'important');
      thumb.style.setProperty('top', `${thumbTop}px`, 'important');
      thumb.style.setProperty('background-color', thumbColor, 'important');
      thumb.style.setProperty('position', 'absolute', 'important');
      
      // Force reflow to ensure styles are applied
      void thumb.offsetHeight;
    };

    // Handle thumb drag
    const handleThumbMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;

      const startY = e.clientY;
      const startThumbTop = parseFloat(thumb.style.top) || 0;
      const { scrollHeight, clientHeight } = content;
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
      const scrollableHeight = scrollHeight - clientHeight;
      
      // Ratio: how much scroll per pixel of thumb movement
      const scrollRatio = scrollableHeight > 0 && maxThumbTop > 0
        ? scrollableHeight / maxThumbTop
        : 0;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaY = e.clientY - startY;
        const newThumbTop = Math.max(0, Math.min(maxThumbTop, startThumbTop + deltaY));
        const newScrollTop = newThumbTop * scrollRatio;
        content.scrollTop = newScrollTop;
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Handle track click for scrolling
    const handleTrackClick = (e: MouseEvent) => {
      if (e.target === thumb) return;
      const trackRect = track.getBoundingClientRect();
      const clickY = e.clientY - trackRect.top;
      const trackHeight = trackRect.height;
      const { scrollHeight, clientHeight } = content;
      const scrollableHeight = scrollHeight - clientHeight;
      const scrollPosition = (clickY / trackHeight) * scrollableHeight;
      content.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    };

    // Event listeners
    content.addEventListener('scroll', updateScrollbar, { passive: true });
    thumb.addEventListener('mousedown', handleThumbMouseDown);
    track.addEventListener('click', handleTrackClick);

    // ResizeObserver for dynamic updates
    const contentResizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateScrollbar);
    });
    contentResizeObserver.observe(content);
    
    // Also observe track for size changes
    const trackResizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateScrollbar);
    });
    trackResizeObserver.observe(track);

    // Initial update with delay to ensure track is rendered
    const initTimeout = setTimeout(() => {
      updateScrollbar();
    }, 0);

    return () => {
      clearTimeout(initTimeout);
      content.removeEventListener('scroll', updateScrollbar);
      thumb.removeEventListener('mousedown', handleThumbMouseDown);
      track.removeEventListener('click', handleTrackClick);
      contentResizeObserver.disconnect();
      trackResizeObserver.disconnect();
    };

    return () => {
      content.removeEventListener('scroll', updateScrollbar);
      thumb.removeEventListener('mousedown', handleThumbMouseDown);
      track.removeEventListener('click', handleTrackClick);
      resizeObserver.disconnect();
    };
  }, [thumbColor]);

  const containerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'eui-scrollbar-container',
    style: { position: 'relative' },
  };

  return {
    contentRef,
    trackRef,
    thumbRef,
    containerProps,
  };
}


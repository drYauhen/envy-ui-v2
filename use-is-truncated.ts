import { useState, useLayoutEffect, RefObject } from 'react';

/**
 * Detects if an element's content is truncated (overflowing).
 */
export function useIsTruncated(ref: RefObject<HTMLElement>, content: any) {
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkTruncation = () => {
      // Use a small threshold to avoid false positives due to sub-pixel rendering
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    checkTruncation();
    const observer = new ResizeObserver(checkTruncation);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, content]);

  return isTruncated;
}
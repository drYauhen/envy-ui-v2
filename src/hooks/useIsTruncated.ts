import { useState, useLayoutEffect, RefObject } from 'react';

const canUseResizeObserver = () => typeof ResizeObserver !== 'undefined';

const isOverflowing = (element: HTMLElement) =>
  element.scrollWidth > element.clientWidth;

/**
 * Detects if an element's content is truncated (overflowing).
 */
export function useIsTruncated(ref: RefObject<HTMLElement | null>, content: unknown) {
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const checkTruncation = () => {
      setIsTruncated(isOverflowing(element));
    };

    checkTruncation();

    if (!canUseResizeObserver()) {
      return;
    }

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, content]);

  return isTruncated;
}

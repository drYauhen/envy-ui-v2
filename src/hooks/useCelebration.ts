import { useState, useEffect, useRef, useCallback } from 'react';

type CelebrationTrigger = 
  | 'onMount' 
  | 'onVisible' 
  | 'onClick' 
  | 'onValueChange' 
  | 'manual';

type CelebrationDelay = number | 'short' | 'medium' | 'long';

interface UseCelebrationOptions {
  trigger?: CelebrationTrigger;
  delay?: CelebrationDelay;
  value?: any; // For 'onValueChange' trigger
  enabled?: boolean;
  onCelebrate?: () => void;
}

const getDelayMs = (delay: CelebrationDelay): number => {
  if (typeof delay === 'number') return delay;
  if (delay === 'short') return 200;
  if (delay === 'medium') return 500;
  return 1000; // long
};

export const useCelebration = ({
  trigger = 'onMount',
  delay = 0,
  value,
  enabled = true,
  onCelebrate
}: UseCelebrationOptions = {}) => {
  const [isActive, setIsActive] = useState(false);
  const [delayAttr, setDelayAttr] = useState<string | undefined>();
  const prevValueRef = useRef(value);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle delay
  useEffect(() => {
    if (typeof delay === 'number') {
      setDelayAttr(undefined);
    } else {
      setDelayAttr(delay);
    }
  }, [delay]);

  // Trigger: onMount
  useEffect(() => {
    if (trigger === 'onMount' && enabled) {
      const timeout = getDelayMs(delay);
      
      const timer = setTimeout(() => {
        setIsActive(true);
        onCelebrate?.();
        
        // Automatically remove after 2 seconds
        setTimeout(() => setIsActive(false), 2000);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [trigger, delay, enabled, onCelebrate]);

  // Trigger: onVisible (Intersection Observer)
  useEffect(() => {
    if (trigger === 'onVisible' && enabled && elementRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isActive) {
              const timeout = getDelayMs(delay);
              
              setTimeout(() => {
                setIsActive(true);
                onCelebrate?.();
                setTimeout(() => setIsActive(false), 2000);
              }, timeout);
              
              // Disconnect observer after first trigger
              observerRef.current?.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );

      observerRef.current.observe(elementRef.current);

      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, [trigger, delay, enabled, isActive, onCelebrate]);

  // Trigger: onValueChange
  useEffect(() => {
    if (trigger === 'onValueChange' && enabled && value !== undefined) {
      if (prevValueRef.current !== value) {
        const timeout = getDelayMs(delay);
        
        setTimeout(() => {
          setIsActive(true);
          onCelebrate?.();
          setTimeout(() => setIsActive(false), 2000);
        }, timeout);
        
        prevValueRef.current = value;
      }
    }
  }, [trigger, delay, enabled, value, onCelebrate]);

  // Trigger: onClick
  const handleClick = useCallback(() => {
    if (trigger === 'onClick' && enabled) {
      const timeout = getDelayMs(delay);
      
      setTimeout(() => {
        setIsActive(true);
        onCelebrate?.();
        setTimeout(() => setIsActive(false), 2000);
      }, timeout);
    }
  }, [trigger, delay, enabled, onCelebrate]);

  // Manual trigger
  const triggerCelebration = useCallback(() => {
    if (enabled) {
      setIsActive(true);
      onCelebrate?.();
      setTimeout(() => setIsActive(false), 2000);
    }
  }, [enabled, onCelebrate]);

  // Get attributes for element
  const getAttributes = useCallback(() => {
    const attrs: Record<string, any> = {
      className: 'eui-celebration',
      'data-eui-celebration': isActive ? 'active' : 'inactive',
    };

    if (delayAttr) {
      attrs['data-eui-celebration-delay'] = delayAttr;
    }

    if (trigger === 'onClick') {
      attrs.onClick = handleClick;
    }

    return attrs;
  }, [isActive, delayAttr, trigger, handleClick]);

  return {
    isActive,
    elementRef,
    triggerCelebration,
    getAttributes,
    celebrationProps: getAttributes()
  };
};


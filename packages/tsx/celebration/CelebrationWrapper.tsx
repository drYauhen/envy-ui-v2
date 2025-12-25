import React, { ReactNode } from 'react';
import { useCelebration } from '../../../src/hooks/useCelebration';

type CelebrationTrigger = 'onMount' | 'onVisible' | 'onClick' | 'onValueChange' | 'manual';
type CelebrationDelay = number | 'short' | 'medium' | 'long';

interface CelebrationWrapperProps {
  children: ReactNode;
  trigger?: CelebrationTrigger;
  delay?: CelebrationDelay;
  value?: any;
  enabled?: boolean;
  onCelebrate?: () => void;
  as?: keyof JSX.IntrinsicElements;
}

export const CelebrationWrapper: React.FC<CelebrationWrapperProps> = ({
  children,
  trigger = 'onMount',
  delay = 0,
  value,
  enabled = true,
  onCelebrate,
  as: Component = 'div'
}) => {
  const { elementRef, celebrationProps } = useCelebration({
    trigger,
    delay,
    value,
    enabled,
    onCelebrate
  });

  return (
    <Component ref={elementRef} {...celebrationProps}>
      {children}
    </Component>
  );
};


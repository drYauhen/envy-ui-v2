import React from 'react';
import { IconProps } from '../icon.contract';

export const IconChevronDown = ({ 
  size = 16, 
  color = 'currentColor',
  className,
  ...props 
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill={color} d="M 22.289063 7.621875 L 21.95625 7.289063 C 21.735938 7.06875 21.379688 7.06875 21.159375 7.289063 L 12 16.453125 L 2.835938 7.289063 C 2.615625 7.06875 2.259375 7.06875 2.039063 7.289063 L 1.70625 7.621875 C 1.485938 7.842188 1.485938 8.198438 1.70625 8.41875 L 11.596875 18.314063 C 11.817188 18.534375 12.173438 18.534375 12.39375 18.314063 L 22.284375 8.41875 C 22.509375 8.198438 22.509375 7.842188 22.289063 7.621875 Z"></path>
  </svg>
);

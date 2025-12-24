import React from 'react';
import { IconProps } from '../icon.contract';

export const IconTrash = ({ 
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
    <path fill={color} d="M 22.125 3 H 17.25 L 15.675 0.9 A 2.25 2.25 0 0 0 13.875 0 H 10.125 A 2.25 2.25 0 0 0 8.325 0.9 L 6.75 3 H 1.875 A 0.375 0.375 0 0 0 1.5 3.375 V 4.125 A 0.375 0.375 0 0 0 1.875 4.5 H 2.760938 L 4.317188 21.951563 A 2.25 2.25 0 0 0 6.557813 24 H 17.442188 A 2.25 2.25 0 0 0 19.682813 21.951563 L 21.239063 4.5 H 22.125 A 0.375 0.375 0 0 0 22.5 4.125 V 3.375 A 0.375 0.375 0 0 0 22.125 3 Z M 9.525 1.8 A 0.754688 0.754688 0 0 0 10.125 1.5 H 13.875 A 0.754688 0.754688 0 0 0 14.475 1.8 L 15.375 3 H 8.625 Z M 18.1875 21.815625 A 0.745781 0.745781 0 0 0 17.442188 22.5 H 6.557813 A 0.745781 0.745781 0 0 0 5.8125 21.815625 L 4.265625 4.5 H 19.734375 Z"></path>
  </svg>
);

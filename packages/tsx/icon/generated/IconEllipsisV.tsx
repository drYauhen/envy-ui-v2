import React from 'react';
import { IconProps } from '../icon.contract';

export const IconEllipsisV = ({ 
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
    <path fill={color} d="M 12 9.75 C 13.242188 9.75 14.25 10.757813 14.25 12 S 13.242188 14.25 12 14.25 S 9.75 13.242188 9.75 12 S 10.757813 9.75 12 9.75 Z M 9.75 4.875 C 9.75 6.117188 10.757813 7.125 12 7.125 S 14.25 6.117188 14.25 4.875 S 13.242188 2.625 12 2.625 S 9.75 3.632813 9.75 4.875 Z M 9.75 19.125 C 9.75 20.367188 10.757813 21.375 12 21.375 S 14.25 20.367188 14.25 19.125 S 13.242188 16.875 12 16.875 S 9.75 17.882813 9.75 19.125 Z"></path>
  </svg>
);

import React from 'react';
import { IconProps } from '../icon.contract';

export const IconAlertTriangle = ({ 
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
    <path fill="black" d="M12 3.5L22 20.5H2L12 3.5Z" />
  <rect x="11" y="9" width="2" height="6" fill="black" />
  <rect x="11" y="17" width="2" height="2" fill="black" />
  </svg>
);

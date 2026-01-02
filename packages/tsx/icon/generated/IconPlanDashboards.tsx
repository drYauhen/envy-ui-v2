import React from 'react';
import { IconProps } from '../icon.contract';

export const IconPlanDashboards = ({ 
  size = 16, 
  color = 'currentColor',
  className,
  ...props 
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 88 85"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill={color} d="M79.258-.01H8.742a8.12 8.12 0 0 0-5.745 2.383 8.14 8.14 0 0 0-2.38 5.752v59.75a8.14 8.14 0 0 0 2.38 5.751 8.12 8.12 0 0 0 5.745 2.383h70.516a8.12 8.12 0 0 0 5.745-2.383 8.14 8.14 0 0 0 2.38-5.752V8.125a8.14 8.14 0 0 0-2.38-5.752A8.119 8.119 0 0 0 79.258-.01ZM6.06 8.125a2.649 2.649 0 0 1 1.65-2.492 2.64 2.64 0 0 1 1.032-.193h8.124v10.82H6.06V8.125Zm75.88 59.75a2.686 2.686 0 0 1-2.682 2.724H8.742a2.68 2.68 0 0 1-2.682-2.725V21.71h75.88v46.164Zm0-51.615H22.31V5.44h56.95a2.64 2.64 0 0 1 2.488 1.651c.133.329.199.68.193 1.034v8.135Z"></path>
  </svg>
);

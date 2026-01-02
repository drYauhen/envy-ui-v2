import React from 'react';
import { IconProps } from '../icon.contract';

export const IconSwap = ({ 
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
    <path fill={color} d="M 8.524138 21.6 V 11.575172 H 7.097931 V 21.6 L 1.911724 16.411034 L 0.902069 17.417931 L 7.806897 24.322759 L 14.714483 17.415172 L 13.710345 16.408276 L 8.521379 21.6 Z M 7.793103 22.295172 H 7.826207 L 7.809655 22.311724 L 7.793103 22.295172 Z M 22.248276 8.165517 L 17.062069 2.97931 V 13.075862 H 15.638621 V 2.97931 L 10.449655 8.165517 L 9.44 7.158621 L 16.350345 0.251034 L 23.255172 7.161379 L 22.245517 8.165517 Z"></path>
  </svg>
);

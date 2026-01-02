import React from 'react';
import { IconProps } from '../icon.contract';

export const IconPersonalAssessment = ({ 
  size = 16, 
  color = 'currentColor',
  className,
  ...props 
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 87 90"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill={color} d="M44.06 42.48a20.75 20.75 0 0 1-20.89-20.9A20.75 20.75 0 0 1 44.06.7a20.75 20.75 0 0 1 20.89 20.89 21 21 0 0 1-20.89 20.89Zm0-36.16a15.26 15.26 0 1 0-.01 30.52 15.26 15.26 0 0 0 .01-30.52Zm40.17 84.76c-1.6 0-2.81-1.2-2.81-2.8A38.14 38.14 0 0 0 43.26 50.1C22.77 50.51 5.5 67.38 5.5 88.27c0 1.6-1.2 2.81-2.81 2.81s-2.41-1.2-2.41-2.8a43.46 43.46 0 0 1 43.38-43.4 43.46 43.46 0 0 1 43.38 43.4c0 1.6-1.2 2.8-2.81 2.8ZM39.53 83.05c-.4 0-.81.09-1.5-.4l-7.63-6.03c-1.2-.8-1.2-2.8-.4-3.61.8-1.2 2.81-1.2 3.62-.4l5.22 4.41 12.85-15.26c.8-1.2 2.81-1.2 3.62-.4 1.2.8 1.2 2.81.4 3.61L40.85 82.25c-.42.52-1.15.8-1.32.8Z"></path>
  </svg>
);

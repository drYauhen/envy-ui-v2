import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'square';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  intent = 'primary',
  size = 'md',
  shape = 'rounded',
  children,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Intent classes using tokens from Tailwind config
  // Colors are flattened: brand-600, accent-600, etc.
  const intentClasses = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-400',
    secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-500',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
  };
  
  // Size classes using spacing tokens
  // Note: Tailwind uses spacing scale for padding, so px-sm, px-md, px-lg work
  const sizeClasses = {
    sm: 'px-sm py-1.5 text-sm',
    md: 'px-md py-2 text-base',
    lg: 'px-lg py-3 text-lg',
  };
  
  // Shape classes using border radius tokens
  // Using standard Tailwind rounded-md (0.375rem) since we only have 'pill' in tokens
  const shapeClasses = {
    rounded: 'rounded-md',
    square: 'rounded-none',
  };
  
  const classes = [
    baseClasses,
    intentClasses[intent],
    sizeClasses[size],
    shapeClasses[shape],
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};


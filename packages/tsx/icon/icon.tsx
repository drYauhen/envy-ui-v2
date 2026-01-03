/**
 * Universal Icon Component
 * 
 * Single component for all icons. Uses icon name to render the appropriate icon.
 * Individual icon components are internal and not exported.
 * 
 * @example
 * ```tsx
 * <Icon name="search" size={16} />
 * <Icon name="ellipsis-v" size={20} color="var(--eui-color-accent-primary)" />
 * ```
 */

import React from 'react';
import { IconProps } from './icon.contract';
import { iconMap, IconName } from './icon-map';

export interface IconComponentProps extends IconProps {
  /**
   * Name of the icon (kebab-case)
   * Available icons: 'search', 'ellipsis-v', etc.
   */
  name: IconName;
}

/**
 * Universal Icon component that renders an icon by name
 * 
 * This is the primary way to use icons in the TSX layer.
 * Individual icon components (IconSearch, IconEllipsisV, etc.) are internal
 * and used via the iconMap. They are not exported for direct use.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Icon name="search" size={16} />
 * 
 * // With custom color
 * <Icon name="search" size={20} color="var(--eui-color-accent-primary)" />
 * 
 * // With rotation (no animation)
 * <Icon name="chevron-right" rotate={180} />
 * 
 * // With animated rotation
 * <Icon name="chevron-right" rotate={180} animated={true} />
 * 
 * // In button
 * <Button startIcon={<Icon name="search" size={16} />}>
 *   Search
 * </Button>
 * ```
 */
export const Icon = ({ 
  name, 
  size = 16, 
  color = 'currentColor',
  className,
  rotate,
  animated = false,
  rotationDuration = '150ms',
  rotationEasing = 'ease-in-out',
  style,
  ...props 
}: IconComponentProps) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Available icons: ${Object.keys(iconMap).join(', ')}`);
    return null;
  }
  
  // Compute rotation styles
  const rotationStyle: React.CSSProperties = rotate !== undefined ? {
    transform: `rotate(${rotate}deg)`,
    transition: animated 
      ? `transform ${rotationDuration} ${rotationEasing}`
      : 'none',
    transformOrigin: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle'
  } : {};
  
  // Merge styles: rotation first, then provided style (provided wins)
  const combinedStyle = style 
    ? { ...rotationStyle, ...style }
    : rotationStyle;
  
  // If rotate is set, wrap in a span for more reliable transform application
  if (rotate !== undefined) {
    return (
      <span 
        style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
        className={className}
        aria-label={props['aria-label']}
        aria-hidden={props['aria-hidden']}
      >
        <IconComponent 
          size={size} 
          color={color} 
          {...props}
        />
      </span>
    );
  }
  
  // Without rotation, render directly
  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className}
      style={style}
      {...props} 
    />
  );
};

// Export IconName type for TypeScript
export type { IconName } from './icon-map';

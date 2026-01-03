/**
 * Icon Component Contract
 * Defines the interface for icon components
 */

export interface IconProps {
  /**
   * Size of the icon in pixels or CSS units
   * @default 16
   */
  size?: number | string;
  
  /**
   * Color of the icon
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Accessibility label for the icon
   */
  'aria-label'?: string;
  
  /**
   * Whether the icon is decorative (hidden from screen readers)
   * @default true
   */
  'aria-hidden'?: boolean;
  
  /**
   * Rotation angle in degrees (0-360)
   * @example 180 for chevron-right -> chevron-left
   */
  rotate?: number;
  
  /**
   * Enable smooth animation for rotation
   * @default false
   */
  animated?: boolean;
  
  /**
   * Custom transition duration for rotation animation
   * @default '150ms'
   */
  rotationDuration?: string;
  
  /**
   * Custom transition easing for rotation animation
   * @default 'ease-in-out'
   */
  rotationEasing?: string;
}







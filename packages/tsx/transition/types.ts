/**
 * Types for Transition component
 */

export type TransitionType = 
  | 'slide-left'      // Slide left (for SideNav: nav -> user)
  | 'slide-right'     // Slide right (for SideNav: user -> nav)
  | 'slide-up'         // Slide up
  | 'slide-down'       // Slide down
  | 'fade'            // Smooth fade in/out
  | 'scale'           // Scaling
  | 'none';           // No animation (instant switch)

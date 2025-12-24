/**
 * TypeScript declarations for EuiButton custom element
 * Extends JSX.IntrinsicElements to allow <eui-button> in TSX/JSX
 */

import { EuiButton } from './button';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'eui-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'data-eui-intent'?: 'primary' | 'secondary' | 'accent';
          'data-eui-size'?: 'sm' | 'md' | 'lg';
          'data-eui-shape'?: 'default' | 'round' | 'circle';
          'data-eui-selected'?: boolean | '';
          disabled?: boolean;
        },
        HTMLElement
      >;
    }
  }

  interface HTMLElementTagNameMap {
    'eui-button': EuiButton;
  }
}

export {};



import React from 'react';
import { Ellipsis } from '../../../../src/ui';
import { BadgeClean } from '../../badge';

export interface SelectBadgeProps {
  /**
   * Badge label text
   */
  label: string;
  /**
   * Callback when badge remove button is clicked
   */
  onRemove?: () => void;
  /**
   * Whether badge is disabled
   */
  isDisabled?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

export function SelectBadge({ label, onRemove, isDisabled, className }: SelectBadgeProps) {
  const labelLength = Array.from(label).length;
  const minTextChars = Math.min(4, Math.max(1, labelLength));
  const badgeStyle = {
    '--eui-select-badge-min-text-ch': String(minTextChars)
  } as React.CSSProperties;

  return (
    <BadgeClean
      className={`eui-select-badge ${className || ''}`}
      tone="neutral"
      variant="subtle"
      size="default"
      shape="rectangular"
      onDismiss={onRemove && !isDisabled ? onRemove : undefined}
      dismissLabel={`Remove ${label}`}
      style={badgeStyle}
    >
      <Ellipsis
        className="eui-select-badge-label"
        tooltipOnTruncate
        tooltipStrategy="native"
        focusOnTruncate={false}
      >
        {label}
      </Ellipsis>
    </BadgeClean>
  );
}

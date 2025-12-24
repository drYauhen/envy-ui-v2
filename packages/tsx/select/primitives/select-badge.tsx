import React from 'react';

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
  return (
    <span className={`eui-select-badge ${className || ''}`}>
      {label}
      {onRemove && !isDisabled && (
        <button
          type="button"
          className="eui-select-badge-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}


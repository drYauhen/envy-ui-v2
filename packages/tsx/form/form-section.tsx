import React from 'react';
import { useButton } from 'react-aria';
import { useToggleState } from 'react-stately';
import { Icon } from '../icon';

export interface FormSectionProps {
  title?: string;
  subtitle?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean; // Controlled
  onExpandedChange?: (expanded: boolean) => void;
  headerContent?: React.ReactNode; // Additional content (avatar, metrics, badges)
  children: React.ReactNode;
  className?: string;
}

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  function FormSection(
    {
      title,
      subtitle,
      collapsible = false,
      defaultExpanded = true,
      expanded: controlledExpanded,
      onExpandedChange,
      headerContent,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const isControlled = controlledExpanded !== undefined;
    const toggleState = useToggleState({
      defaultSelected: collapsible ? defaultExpanded : true,
      isSelected: isControlled ? controlledExpanded : undefined,
      onChange: isControlled ? onExpandedChange : undefined
    });

    const isExpanded = isControlled ? controlledExpanded : (toggleState.isSelected ?? false);
    const toggle = isControlled
      ? () => onExpandedChange?.(!controlledExpanded)
      : toggleState.toggle;

    const headerRef = React.useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(
      {
        onPress: collapsible ? toggle : undefined,
        elementType: collapsible ? 'button' : 'div'
      },
      headerRef
    );

    const contentId = React.useId();

    return (
      <div
        ref={ref}
        className={`eui-form-section ${className || ''}`}
        data-eui-collapsible={collapsible || undefined}
        data-eui-expanded={isExpanded}
        {...rest}
      >
        {collapsible ? (
          <button
            ref={headerRef}
            className="eui-form-section-header"
            data-eui-slot="header"
            aria-expanded={isExpanded}
            aria-controls={contentId}
            {...buttonProps}
          >
            <div
              className="eui-form-section-header-content"
              data-eui-slot="header-content"
            >
              {title && (
                <h3 className="eui-form-section-title">{title}</h3>
              )}
              {subtitle && (
                <p className="eui-form-section-subtitle">{subtitle}</p>
              )}
              {headerContent && (
                <div
                  className="eui-form-section-header-extra"
                  data-eui-slot="header-extra"
                >
                  {headerContent}
                </div>
              )}
            </div>
            <span
              className="eui-form-section-chevron"
              data-eui-slot="header-chevron"
              aria-hidden="true"
            >
              <Icon name="chevron-down" size={16} />
            </span>
          </button>
        ) : (
          <div className="eui-form-section-header" data-eui-slot="header">
            {title && <h3 className="eui-form-section-title">{title}</h3>}
            {subtitle && (
              <p className="eui-form-section-subtitle">{subtitle}</p>
            )}
            {headerContent && (
              <div
                className="eui-form-section-header-extra"
                data-eui-slot="header-extra"
              >
                {headerContent}
              </div>
            )}
          </div>
        )}

        <div
          id={contentId}
          className="eui-form-section-content"
          data-eui-slot="content"
          hidden={collapsible && !isExpanded}
        >
          <div data-eui-slot="content">{children}</div>
        </div>
      </div>
    );
  }
);


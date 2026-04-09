import React, { useRef, useMemo } from 'react';
import { useSelect, useListBox, useOption, AriaSelectProps, mergeProps, useButton, useSearchField, useFilter } from 'react-aria';
import { useSelectState, useSearchFieldState } from 'react-stately';
import { Item } from '@react-stately/collections';
import type { Key } from '@react-types/shared';
import { SelectTrigger, SelectPopover, SelectListBox, SelectOption as SelectOptionPrimitive, SelectBadge } from './primitives';
import { Icon } from '../icon';
import { CheckboxClean } from '../checkbox';
import { Ellipsis, Tooltip, TooltipContent, TooltipTrigger } from '../../../src/ui';

export interface MultiSelectItem {
  key: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<
  AriaSelectProps<MultiSelectItem, 'multiple'>,
  'children' | 'items' | 'selectionMode' | 'defaultSelectedKeys' | 'selectedKeys' | 'onSelectionChange'
> {
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Placeholder text when no options are selected
   */
  placeholder?: string;
  /**
   * Array of select items
   */
  items: MultiSelectItem[];
  /**
   * Default selected keys (uncontrolled)
   */
  defaultSelectedKeys?: 'all' | Iterable<Key>;
  /**
   * Selected keys (controlled)
   */
  selectedKeys?: 'all' | Iterable<Key>;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (keys: Set<Key>) => void;
  /**
   * Whether select is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether select has error state
   */
  error?: boolean;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Whether to show a search field inside the dropdown
   */
  isSearchable?: boolean;
  /**
   * Search input placeholder
   */
  searchPlaceholder?: string;
  /**
   * Search input aria-label
   */
  searchLabel?: string;
  /**
   * Whether to show selection summary and select-all checkbox
   */
  showSelectionSummary?: boolean;
  /**
   * Selection summary label
   */
  selectionSummaryLabel?: string;
  /**
   * Maximum number of badges to show before collapsing into a "+N" indicator.
   */
  maxVisibleBadges?: number | 'auto';
  /**
   * Max width of the dropdown. Number values are treated as pixels.
   */
  popoverMaxWidth?: number | string;
  /**
   * Max height of the dropdown. Number values are treated as pixels.
   */
  popoverMaxHeight?: number | string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  function MultiSelect(
    {
      label,
      placeholder = 'Select options',
      items,
      defaultSelectedKeys,
      selectedKeys: controlledSelectedKeys,
      onSelectionChange,
      isDisabled,
      error,
      size = 'md',
      className,
      isSearchable = false,
      searchPlaceholder = 'Search options',
      searchLabel = 'Filter options',
      showSelectionSummary = false,
      selectionSummaryLabel = 'Selected',
      maxVisibleBadges = 'auto',
      popoverMaxWidth,
      popoverMaxHeight,
      ...rest
    },
    ref
  ) {
    // Convert items array to children with Item components
    const children = useMemo(() => {
      return items.map((item) => (
        <Item key={item.key} textValue={item.label}>
          {item.label}
        </Item>
      ));
    }, [items]);
    const disabledKeys = useMemo(() => new Set(items.filter((item) => item.disabled).map((item) => item.key)), [items]);
    
    const searchState = useSearchFieldState({});
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { contains } = useFilter({ sensitivity: 'base' });
    const filter = useMemo(() => {
      const query = searchState.value.trim();
      if (!query) return undefined;
      return (nodes: Iterable<any>) => {
        const filtered = [];
        for (const node of nodes) {
          if (node?.type === 'item') {
            const textValue = node.textValue ?? '';
            if (contains(textValue, query)) {
              filtered.push(node);
            }
          }
        }
        return filtered;
      };
    }, [contains, searchState.value]);

    // React Aria useSelectState with multiple selection
    const state = useSelectState({
      children,
      defaultSelectedKeys,
      selectedKeys: controlledSelectedKeys,
      onSelectionChange: onSelectionChange as any,
      disabledKeys,
      isDisabled,
      selectionMode: 'multiple',
      ...rest,
      filter,
      allowsEmptyCollection: isSearchable ? true : rest.allowsEmptyCollection
    } as any);

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const listBoxRef = useRef<HTMLUListElement | null>(null);
    const badgesRef = useRef<HTMLDivElement>(null);
    const badgeMeasureRef = useRef<HTMLDivElement>(null);
    const overflowMeasureRef = useRef<HTMLSpanElement>(null);

    const {
      labelProps,
      triggerProps,
      valueProps,
      menuProps
    } = useSelect(
      {
        label,
        isDisabled,
        ...rest
      } as any,
      state,
      triggerRef
    );

    const { buttonProps } = useButton(triggerProps as any, triggerRef);

    // Use useListBox for proper listbox behavior
    const { listBoxProps } = useListBox(
      menuProps as any,
      state,
      listBoxRef
    );

    const itemsByKey = useMemo(() => {
      return new Map(items.map((item) => [String(item.key), item]));
    }, [items]);

    const selectionManager = state.selectionManager;
    const selectedKeySet = selectionManager.selectedKeys;

    const selectableKeys = useMemo(() => {
      return items.filter((item) => !item.disabled).map((item) => item.key);
    }, [items]);

    const selectedCount = selectedKeySet.size;
    const isAllSelected = selectionManager.isSelectAll;
    const isIndeterminate = !selectionManager.isEmpty && !selectionManager.isSelectAll;

    const isFilterActive = isSearchable && searchState.value.trim().length > 0;
    const visibleSelectedCount = useMemo(() => {
      if (!isFilterActive) return selectedCount;
      let count = 0;
      for (const item of state.collection) {
        if (selectedKeySet.has(item.key)) {
          count += 1;
        }
      }
      return count;
    }, [isFilterActive, selectedKeySet, selectedCount, state.collection]);
    const hasHiddenSelection = isFilterActive && selectedCount > visibleSelectedCount;

    // Get selected items for display (use source items to avoid filter dropping badges)
    const selectedItems = Array.from(selectedKeySet)
      .map((key) => {
        const item = itemsByKey.get(String(key));
        if (item) {
          return { key: item.key, label: item.label };
        }
        const fallback = state.collection.getItem(key);
        return fallback ? { key: fallback.key, label: fallback.textValue || String(fallback.key) } : null;
      })
      .filter(Boolean) as Array<{ key: Key; label: string }>;

    const isAutoBadgeCount = maxVisibleBadges === 'auto' || maxVisibleBadges == null;
    const [autoVisibleCount, setAutoVisibleCount] = React.useState<number>(selectedItems.length);
    const selectedItemsSignature = useMemo(
      () => selectedItems.map((item) => String(item.key)).join('|'),
      [selectedItems]
    );

    const computeAutoVisibleCount = React.useCallback(() => {
      if (!isAutoBadgeCount) return;
      const container = badgesRef.current;
      const measure = badgeMeasureRef.current;
      const overflowEl = overflowMeasureRef.current;
      if (!container || !measure || !overflowEl) return;

      const containerWidth = container.clientWidth;
      if (!containerWidth) {
        setAutoVisibleCount(0);
        return;
      }

      const badgeEls = Array.from(measure.querySelectorAll<HTMLElement>('.eui-select-badge'));
      const widths = badgeEls.map((el) => Math.ceil(el.getBoundingClientRect().width));
      const total = widths.length;
      if (total === 0) {
        setAutoVisibleCount(0);
        return;
      }

      const styles = window.getComputedStyle(container);
      const gapValue = parseFloat(styles.columnGap || styles.gap || '0');
      const gap = Number.isFinite(gapValue) ? gapValue : 0;

      const prefix = new Array(total + 1).fill(0);
      for (let i = 0; i < total; i += 1) {
        prefix[i + 1] = prefix[i] + widths[i];
      }

      const totalWidth = prefix[total] + gap * Math.max(total - 1, 0);
      let visible = total;

      if (totalWidth > containerWidth) {
        for (let i = total - 1; i >= 0; i -= 1) {
          const hidden = total - i;
          overflowEl.textContent = `+${hidden}`;
          const overflowWidth = Math.ceil(overflowEl.getBoundingClientRect().width);
          const badgeGaps = i > 0 ? gap * (i - 1) : 0;
          const overflowGap = i > 0 ? gap : 0;
          const width = prefix[i] + badgeGaps + overflowGap + overflowWidth;
          if (width <= containerWidth) {
            visible = i;
            break;
          }
        }
      }

      setAutoVisibleCount((prev) => (prev === visible ? prev : visible));
    }, [isAutoBadgeCount]);

    React.useLayoutEffect(() => {
      if (!isAutoBadgeCount) {
        setAutoVisibleCount(selectedItems.length);
        return;
      }

      computeAutoVisibleCount();

      const container = badgesRef.current;
      if (!container || typeof ResizeObserver === 'undefined') return;

      const observer = new ResizeObserver(() => {
        computeAutoVisibleCount();
      });
      observer.observe(container);

      return () => observer.disconnect();
    }, [computeAutoVisibleCount, isAutoBadgeCount, selectedItemsSignature]);

    const resolvedMaxVisibleBadges = isAutoBadgeCount
      ? autoVisibleCount
      : Number.isFinite(maxVisibleBadges)
        ? Math.max(0, maxVisibleBadges)
        : selectedItems.length;
    const clampedVisibleCount = Math.min(resolvedMaxVisibleBadges, selectedItems.length);
    const visibleSelectedItems = clampedVisibleCount > 0 ? selectedItems.slice(0, clampedVisibleCount) : [];
    const hiddenSelectedItems = clampedVisibleCount > 0 ? selectedItems.slice(clampedVisibleCount) : selectedItems;
    const hiddenSelectedCount = hiddenSelectedItems.length;

    React.useEffect(() => {
      if (state.isOpen && isSearchable) {
        searchInputRef.current?.focus();
      }
      if (!state.isOpen && searchState.value) {
        searchState.setValue('');
      }
    }, [state.isOpen, isSearchable, searchState.value, searchState.setValue]);

    const { inputProps: searchInputProps } = useSearchField(
      {
        'aria-label': searchLabel,
        placeholder: searchPlaceholder,
        isDisabled,
        onKeyDown: (e) => {
          if (e.key === 'ArrowDown' && listBoxRef.current) {
            e.preventDefault();
            listBoxRef.current.focus();
          }
        }
      },
      searchState,
      searchInputRef
    );

    const handleToggleAll = React.useCallback(() => {
      if (isDisabled) return;
      if (isAllSelected) {
        selectionManager.clearSelection();
        return;
      }
      selectionManager.setSelectedKeys(new Set(selectableKeys));
    }, [isAllSelected, isDisabled, selectableKeys, selectionManager]);

    const hasSelection = selectedItems.length > 0;
    const visibleBadgeCount = Math.max(1, visibleSelectedItems.length);
    return (
      <div ref={ref} className={`eui-select-wrapper ${className || ''}`}>
        {label && (
          <label {...labelProps} className="eui-label">
            {label}
          </label>
        )}

        <SelectTrigger
          {...(mergeProps(buttonProps, {
            ref: triggerRef,
            size,
            isDisabled,
            isOpen: state.isOpen,
            'data-eui-state': error ? 'error' : undefined,
            'data-eui-select-mode': 'multi'
          }) as any)}
        >
          {hasSelection ? (
            <div
              {...valueProps}
              className="eui-select-badges"
              ref={badgesRef}
              style={
                {
                  ...(valueProps as React.HTMLAttributes<HTMLDivElement>).style,
                  '--eui-select-badge-visible-count': String(visibleBadgeCount)
                } as React.CSSProperties
              }
            >
              {visibleSelectedItems.map((item) => (
                <SelectBadge
                  key={item.key}
                  label={item.label}
                  onRemove={() => {
                    selectionManager.toggleSelection(item.key);
                  }}
                  isDisabled={isDisabled}
                />
              ))}
              {hiddenSelectedCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="eui-select-badge-overflow">
                      +{hiddenSelectedCount}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="eui-select-badge-overflow-list">
                      {hiddenSelectedItems.map((item) => (
                        <SelectBadge key={item.key} label={item.label} isDisabled />
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
              {isAutoBadgeCount && (
                <div
                  className="eui-select-badge-measure"
                  ref={badgeMeasureRef}
                  aria-hidden="true"
                  style={{ '--eui-select-badge-visible-count': '1' } as React.CSSProperties}
                >
                  {selectedItems.map((item) => (
                    <SelectBadge
                      key={`measure-${String(item.key)}`}
                      label={item.label}
                      onRemove={() => {}}
                      isDisabled={isDisabled}
                    />
                  ))}
                  <span ref={overflowMeasureRef} className="eui-select-badge-overflow">
                    +0
                  </span>
                </div>
              )}
            </div>
          ) : (
            <span {...valueProps} className="eui-select-value" data-placeholder>
              {placeholder}
            </span>
          )}
          <span className="eui-select-chevron" aria-hidden="true">
            <Icon name="chevron-down" size={16} />
          </span>
        </SelectTrigger>

        <SelectPopover
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
          referenceRef={triggerRef}
          placement="bottom-start"
          maxWidth={popoverMaxWidth}
          maxHeight={popoverMaxHeight}
        >
          {isSearchable && (
            <div className="eui-select-search">
              <input
                {...searchInputProps}
                ref={searchInputRef}
                className="eui-input eui-select-search-input"
                data-eui-size={size}
                disabled={isDisabled}
              />
            </div>
          )}
          {showSelectionSummary && (
            <>
              <div className="eui-select-summary" role="presentation">
                <CheckboxClean
                  size="md"
                  className="eui-select-summary-checkbox"
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleToggleAll}
                  disabled={isDisabled}
                  aria-label="Select all options"
                />
                <span className="eui-select-summary-count">
                  {selectionSummaryLabel}: {selectedCount}
                </span>
                {hasHiddenSelection && (
                  <span className="eui-select-summary-filter" aria-hidden="true">
                    <Icon name="search" size={12} />
                  </span>
                )}
              </div>
              <hr className="eui-divider eui-select-summary-divider" />
            </>
          )}
          <SelectListBox {...listBoxProps} ref={listBoxRef}>
            {state.collection.size === 0 ? (
              <li className="eui-select-option" data-eui-state="empty" role="option" aria-disabled="true">
                No results found
              </li>
            ) : (
              Array.from(state.collection).map((item) => (
                <MultiSelectOptionComponent
                  key={item.key}
                  item={item}
                  state={state}
                />
              ))
            )}
          </SelectListBox>
        </SelectPopover>
      </div>
    );
  }
);

interface MultiSelectOptionComponentProps {
  item: any;
  state: any;
}

function MultiSelectOptionComponent({ item, state }: MultiSelectOptionComponentProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );
  const label = item.textValue || (typeof item.rendered === 'string' ? item.rendered : String(item.key));

  return (
    <SelectOptionPrimitive
      {...optionProps}
      ref={ref}
      isSelected={isSelected}
      isFocused={isFocused}
      isDisabled={isDisabled}
      showCheckbox={false}
    >
      <span
        className="eui-select-option-checkbox"
        data-eui-selected={isSelected || undefined}
        aria-hidden="true"
      />
      <Ellipsis
        className="eui-select-option-label"
        tooltipOnTruncate
        tooltipStrategy="native"
        focusOnTruncate={false}
      >
        {label}
      </Ellipsis>
    </SelectOptionPrimitive>
  );
}

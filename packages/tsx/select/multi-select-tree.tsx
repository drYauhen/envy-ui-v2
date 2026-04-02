import React, { useRef, Key, useMemo } from 'react';
import {
  mergeProps,
  useButton,
  useFilter,
  useId,
  useLabel,
  useSearchField,
  useTree,
  useTreeItem
} from 'react-aria';
import { useOverlayTriggerState, useSearchFieldState, useTreeState, type TreeState } from 'react-stately';
import { useControlledState } from '@react-stately/utils';
import { Item } from '@react-stately/collections';
import { SelectTrigger, SelectPopover, SelectListBox, SelectBadge } from './primitives';
import { Icon } from '../icon';
import { CheckboxClean } from '../checkbox';
import { Ellipsis, Tooltip, TooltipContent, TooltipTrigger } from '../../../src/ui';

export interface MultiSelectTreeItem {
  key: string;
  label: string;
  disabled?: boolean;
  children?: MultiSelectTreeItem[];
}

export interface MultiSelectTreeProps {
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
  items: MultiSelectTreeItem[];
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
   * Default expanded keys (uncontrolled)
   */
  defaultExpandedKeys?: Iterable<Key>;
  /**
   * Expanded keys (controlled)
   */
  expandedKeys?: Iterable<Key>;
  /**
   * Callback when expansion changes
   */
  onExpandedChange?: (keys: Set<Key>) => void;
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

const flattenTree = (items: MultiSelectTreeItem[], map = new Map<string, MultiSelectTreeItem>()) => {
  for (const item of items) {
    map.set(String(item.key), item);
    if (item.children) {
      flattenTree(item.children, map);
    }
  }
  return map;
};

const collectLeafKeys = (items: MultiSelectTreeItem[], keys: Key[] = []) => {
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      collectLeafKeys(item.children, keys);
    } else {
      keys.push(item.key);
    }
  }
  return keys;
};

const collectSelectableLeafKeys = (items: MultiSelectTreeItem[], keys: Key[] = []) => {
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      collectSelectableLeafKeys(item.children, keys);
    } else if (!item.disabled) {
      keys.push(item.key);
    }
  }
  return keys;
};

const collectGroupSelectableLeafMap = (
  items: MultiSelectTreeItem[],
  map = new Map<Key, Key[]>()
) => {
  const walk = (node: MultiSelectTreeItem): Key[] => {
    if (!node.children || node.children.length === 0) {
      return node.disabled ? [] : [node.key];
    }

    const leaves = node.children.flatMap((child) => walk(child));
    map.set(node.key, leaves);
    return leaves;
  };

  for (const item of items) {
    walk(item);
  }

  return map;
};

const collectDisabledKeys = (items: MultiSelectTreeItem[], keys = new Set<Key>()) => {
  for (const item of items) {
    if (item.disabled) {
      keys.add(item.key);
    }
    if (item.children) {
      collectDisabledKeys(item.children, keys);
    }
  }
  return keys;
};

const filterTreeItems = (
  items: MultiSelectTreeItem[],
  query: string,
  contains: (text: string, value: string) => boolean
) => {
  if (!query) return items;

  const filterNode = (node: MultiSelectTreeItem): MultiSelectTreeItem | null => {
    const matches = contains(node.label, query);
    if (!node.children || node.children.length === 0) {
      return matches ? node : null;
    }

    const filteredChildren = node.children
      .map(filterNode)
      .filter(Boolean) as MultiSelectTreeItem[];

    if (matches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren
      };
    }

    return null;
  };

  return items.map(filterNode).filter(Boolean) as MultiSelectTreeItem[];
};

const collectExpandableKeys = (items: MultiSelectTreeItem[], keys = new Set<Key>()) => {
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      keys.add(item.key);
      collectExpandableKeys(item.children, keys);
    }
  }
  return keys;
};

const renderTreeItem = (item: MultiSelectTreeItem) => (
  <Item key={item.key} textValue={item.label} childItems={item.children} isDisabled={item.disabled}>
    {item.label}
  </Item>
);

export const MultiSelectTree = React.forwardRef<HTMLDivElement, MultiSelectTreeProps>(
  function MultiSelectTree(
    {
      label,
      placeholder = 'Select options',
      items,
      defaultSelectedKeys,
      selectedKeys: controlledSelectedKeys,
      onSelectionChange,
      defaultExpandedKeys,
      expandedKeys: controlledExpandedKeys,
      onExpandedChange,
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
      popoverMaxHeight
    },
    ref
  ) {
    const overlayState = useOverlayTriggerState({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const treeRef = useRef<HTMLUListElement>(null);
    const badgesRef = useRef<HTMLDivElement>(null);
    const badgeMeasureRef = useRef<HTMLDivElement>(null);
    const overflowMeasureRef = useRef<HTMLSpanElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const treeId = useId();
    const collapseTimeoutsRef = useRef<Map<Key, number>>(new Map());
    const enteringTimeoutsRef = useRef<Map<Key, number>>(new Map());
    const expandedKeysRef = useRef<Set<Key>>(new Set());
    const prevVisibleKeysRef = useRef<Set<Key>>(new Set());

    const { labelProps, fieldProps } = useLabel({ label });
    const { contains } = useFilter({ sensitivity: 'base' });

    const leafKeys = useMemo(() => collectLeafKeys(items), [items]);
    const leafKeySet = useMemo(() => new Set(leafKeys), [leafKeys]);
    const selectableLeafKeys = useMemo(() => collectSelectableLeafKeys(items), [items]);
    const selectableLeafKeySet = useMemo(() => new Set(selectableLeafKeys), [selectableLeafKeys]);
    const groupSelectableLeafMap = useMemo(() => collectGroupSelectableLeafMap(items), [items]);
    const groupKeySet = useMemo(() => new Set(groupSelectableLeafMap.keys()), [groupSelectableLeafMap]);

    const normalizeSelectedKeys = React.useCallback(
      (keys: 'all' | Iterable<Key> | undefined) => {
        if (!keys) return undefined;
        if (keys === 'all') return new Set(leafKeySet);
        const normalized = new Set<Key>();
        for (const key of keys) {
          if (leafKeySet.has(key)) {
            normalized.add(key);
          }
        }
        return normalized;
      },
      [leafKeySet]
    );

    const resolvedDefaultSelectedKeys = useMemo(
      () => normalizeSelectedKeys(defaultSelectedKeys),
      [defaultSelectedKeys, normalizeSelectedKeys]
    );
    const resolvedSelectedKeys = useMemo(
      () => normalizeSelectedKeys(controlledSelectedKeys),
      [controlledSelectedKeys, normalizeSelectedKeys]
    );

    const searchState = useSearchFieldState({});
    const query = searchState.value.trim();

    const filteredItems = useMemo(
      () => filterTreeItems(items, query, contains),
      [items, query, contains]
    );

    const autoExpandedKeys = useMemo(
      () => (query ? collectExpandableKeys(filteredItems) : new Set<Key>()),
      [query, filteredItems]
    );

    const controlledExpandedKeysSet = useMemo(
      () => (controlledExpandedKeys ? new Set(controlledExpandedKeys) : undefined),
      [controlledExpandedKeys]
    );

    const fallbackExpandedKeys = useMemo(
      () => collectExpandableKeys(items),
      [items]
    );

    const defaultExpandedKeysSet = useMemo(
      () => new Set(defaultExpandedKeys ?? fallbackExpandedKeys),
      [defaultExpandedKeys, fallbackExpandedKeys]
    );

    const [expandedKeys, setExpandedKeys] = useControlledState(
      controlledExpandedKeysSet,
      defaultExpandedKeysSet,
      onExpandedChange
    );

    const [animatedExpandedKeys, setAnimatedExpandedKeys] = React.useState<Set<Key>>(expandedKeys);
    const [collapsingKeys, setCollapsingKeys] = React.useState<Set<Key>>(new Set());
    const [enteringKeys, setEnteringKeys] = React.useState<Set<Key>>(new Set());
    const collapsingKeysRef = useRef(collapsingKeys);
    const animatedExpandedKeysRef = useRef(animatedExpandedKeys);

    React.useEffect(() => {
      expandedKeysRef.current = expandedKeys;
    }, [expandedKeys]);

    React.useEffect(() => {
      collapsingKeysRef.current = collapsingKeys;
    }, [collapsingKeys]);

    React.useEffect(() => {
      animatedExpandedKeysRef.current = animatedExpandedKeys;
    }, [animatedExpandedKeys]);

    React.useEffect(() => {
      const animationMs = 160;

      if (query) {
        setAnimatedExpandedKeys(autoExpandedKeys);
        setCollapsingKeys(new Set());
        return;
      }

      const targetKeys = expandedKeys;
      const currentKeys = animatedExpandedKeysRef.current;

      const addedKeys = Array.from(targetKeys).filter((key) => !currentKeys.has(key));
      if (addedKeys.length > 0) {
        setAnimatedExpandedKeys(new Set([...currentKeys, ...addedKeys]));
        setCollapsingKeys((prev) => {
          const next = new Set(prev);
          for (const key of addedKeys) {
            const timeout = collapseTimeoutsRef.current.get(key);
            if (timeout !== undefined) {
              window.clearTimeout(timeout);
              collapseTimeoutsRef.current.delete(key);
            }
            next.delete(key);
          }
          return next;
        });
      }

      const removedKeys = Array.from(currentKeys).filter((key) => !targetKeys.has(key));
      const newlyCollapsedKeys = removedKeys.filter((key) => !collapsingKeysRef.current.has(key));

      if (newlyCollapsedKeys.length > 0) {
        setCollapsingKeys((prev) => new Set([...prev, ...newlyCollapsedKeys]));
        for (const key of newlyCollapsedKeys) {
          const timeout = window.setTimeout(() => {
            if (expandedKeysRef.current.has(key)) {
              setCollapsingKeys((prev) => {
                const next = new Set(prev);
                next.delete(key);
                return next;
              });
              return;
            }

            setAnimatedExpandedKeys((prev) => {
              const next = new Set(prev);
              next.delete(key);
              return next;
            });

            setCollapsingKeys((prev) => {
              const next = new Set(prev);
              next.delete(key);
              return next;
            });

            collapseTimeoutsRef.current.delete(key);
          }, animationMs);

          collapseTimeoutsRef.current.set(key, timeout);
        }
      }
    }, [expandedKeys, query, autoExpandedKeys]);

    const resolvedExpandedKeys = query ? autoExpandedKeys : animatedExpandedKeys;

    const disabledKeys = useMemo(() => collectDisabledKeys(items), [items]);

    const state = useTreeState<MultiSelectTreeItem>({
      selectionMode: 'multiple',
      selectionBehavior: 'toggle',
      items: filteredItems,
      children: renderTreeItem,
      disabledKeys,
      defaultSelectedKeys: resolvedDefaultSelectedKeys,
      selectedKeys: resolvedSelectedKeys,
      onSelectionChange: ((keys: Set<Key>) => {
        const filtered = new Set<Key>();
        for (const key of keys) {
          if (leafKeySet.has(key)) {
            filtered.add(key);
          }
        }
        onSelectionChange?.(filtered);
      }) as any,
      expandedKeys: resolvedExpandedKeys,
      onExpandedChange: (keys) => {
        if (!query) {
          setExpandedKeys(keys);
        }
      }
    });

    const treeCollection = state.collection as typeof state.collection & {
      getChildren?: (key: Key) => Iterable<unknown>;
      getItem?: (key: Key) => { childNodes?: Iterable<unknown> } | null;
    };

    if (typeof treeCollection.getChildren !== 'function') {
      treeCollection.getChildren = (key: Key) => {
        const item = treeCollection.getItem?.(key);
        return item?.childNodes ?? [];
      };
    }

    const selectionManager = state.selectionManager as typeof state.selectionManager & {
      __euiOriginalCanSelectItem?: typeof state.selectionManager.canSelectItem;
    };

    if (!selectionManager.__euiOriginalCanSelectItem) {
      selectionManager.__euiOriginalCanSelectItem = selectionManager.canSelectItem.bind(selectionManager);
    }

    selectionManager.canSelectItem = (key: Key) => {
      if (groupKeySet.has(key)) {
        return false;
      }
      return selectionManager.__euiOriginalCanSelectItem?.(key) ?? false;
    };

    const { gridProps } = useTree(
      {
        'aria-label': label || 'Options'
      },
      state,
      treeRef
    );

    const visibleKeyArray = useMemo(() => Array.from(state.collection.getKeys()), [state.collection]);
    const visibleKeysSignature = useMemo(() => visibleKeyArray.join('|'), [visibleKeyArray]);

    React.useEffect(() => {
      const animationMs = 160;
      const visibleSet = new Set(visibleKeyArray);
      const prevVisible = prevVisibleKeysRef.current;

      const newKeys = visibleKeyArray.filter((key) => !prevVisible.has(key));
      if (newKeys.length > 0) {
        setEnteringKeys((prev) => new Set([...prev, ...newKeys]));
        for (const key of newKeys) {
          const timeout = window.setTimeout(() => {
            setEnteringKeys((prev) => {
              const next = new Set(prev);
              next.delete(key);
              return next;
            });
            enteringTimeoutsRef.current.delete(key);
          }, animationMs);
          enteringTimeoutsRef.current.set(key, timeout);
        }
      }

      prevVisibleKeysRef.current = visibleSet;
    }, [visibleKeysSignature, visibleKeyArray]);

    const { buttonProps } = useButton(
      {
        onPress: () => {
          if (isDisabled) return;
          overlayState.toggle();
        },
        isDisabled
      },
      triggerRef
    );

    const itemsByKey = useMemo(() => flattenTree(items), [items]);
    const selectableKeys = useMemo(() => selectableLeafKeys, [selectableLeafKeys]);

    const selectedKeySet = selectionManager.selectedKeys;
    const selectedCount = selectedKeySet.size;
    const isAllSelected = selectableKeys.length > 0 && selectableKeys.every((key) => selectedKeySet.has(key));
    const isIndeterminate = selectedCount > 0 && !isAllSelected;

    const visibleSelectedCount = useMemo(() => {
      if (!query) return selectedCount;
      let count = 0;
      for (const node of state.collection) {
        if (selectedKeySet.has(node.key)) {
          count += 1;
        }
      }
      return count;
    }, [query, selectedCount, selectedKeySet, state.collection]);

    const hasHiddenSelection = query.length > 0 && selectedCount > visibleSelectedCount;

    const selectedItems = Array.from(selectedKeySet)
      .filter((key) => leafKeySet.has(key))
      .map((key) => {
        const item = itemsByKey.get(String(key));
        return item ? { key: item.key, label: item.label } : null;
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
      if (overlayState.isOpen && isSearchable) {
        searchInputRef.current?.focus();
      }
      if (!overlayState.isOpen && searchState.value) {
        searchState.setValue('');
      }
    }, [overlayState.isOpen, isSearchable, searchState.value, searchState.setValue]);

    const { inputProps: searchInputProps } = useSearchField(
      {
        'aria-label': searchLabel,
        placeholder: searchPlaceholder,
        isDisabled,
        onKeyDown: (e) => {
          if (e.key === 'ArrowDown' && treeRef.current) {
            e.preventDefault();
            treeRef.current.focus();
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
          {...mergeProps(buttonProps, fieldProps, {
            ref: triggerRef,
            size,
            isDisabled,
            isOpen: overlayState.isOpen,
            'data-eui-state': error ? 'error' : undefined,
            'data-eui-select-mode': 'multi',
            'aria-haspopup': 'tree',
            'aria-controls': treeId
          })}
        >
          {hasSelection ? (
            <div
              className="eui-select-badges"
              ref={badgesRef}
              style={
                {
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
            <span className="eui-select-value" data-placeholder>
              {placeholder}
            </span>
          )}
          <span className="eui-select-chevron" aria-hidden="true">
            <Icon name="chevron-down" size={16} />
          </span>
        </SelectTrigger>

        <SelectPopover
          isOpen={overlayState.isOpen}
          onClose={() => overlayState.close()}
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
          <SelectListBox
            {...gridProps}
            ref={treeRef}
            id={treeId}
            className="eui-select-tree"
          >
            {state.collection.size === 0 ? (
              <li className="eui-select-option" data-eui-state="empty" role="row" aria-disabled="true">
                <div className="eui-select-tree-cell" role="gridcell">
                  No results found
                </div>
              </li>
            ) : (
              Array.from(state.collection.getKeys())
                .map((key) => state.collection.getItem(key))
                .filter(Boolean)
                .map((node) => (
                  <MultiSelectTreeNode
                    key={node!.key}
                    node={node}
                    state={state}
                    groupSelectableLeafMap={groupSelectableLeafMap}
                    collapsingKeys={collapsingKeys}
                    enteringKeys={enteringKeys}
                  />
                ))
            )}
          </SelectListBox>
        </SelectPopover>
      </div>
    );
  }
);

interface MultiSelectTreeNodeProps {
  node: any;
  state: TreeState<MultiSelectTreeItem>;
  groupSelectableLeafMap: Map<Key, Key[]>;
  collapsingKeys: Set<Key>;
  enteringKeys: Set<Key>;
}

function MultiSelectTreeNode({
  node,
  state,
  groupSelectableLeafMap,
  collapsingKeys,
  enteringKeys
}: MultiSelectTreeNodeProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { rowProps, gridCellProps, isSelected, isFocused, isDisabled, expandButtonProps } = useTreeItem(
    { node },
    state,
    ref
  );

  const isExpanded = state.expandedKeys.has(node.key);
  const label = node.textValue || (typeof node.rendered === 'string' ? node.rendered : String(node.key));
  const groupSelectableKeys = groupSelectableLeafMap.get(node.key) ?? [];
  const isGroup = node.hasChildNodes && groupSelectableLeafMap.has(node.key);
  const selectedKeySet = state.selectionManager.selectedKeys;
  const groupSelectedCount = isGroup
    ? groupSelectableKeys.filter((key) => selectedKeySet.has(key)).length
    : 0;
  const isGroupSelected = isGroup && groupSelectableKeys.length > 0 && groupSelectedCount === groupSelectableKeys.length;
  const isGroupIndeterminate = isGroup && groupSelectedCount > 0 && !isGroupSelected;
  const isGroupSelectionDisabled = isGroup && (groupSelectableKeys.length === 0 || isDisabled);

  const toggleGroupSelection = React.useCallback(() => {
    if (!isGroup || isGroupSelectionDisabled) return;
    const nextSelected = new Set(selectedKeySet);
    if (isGroupSelected) {
      groupSelectableKeys.forEach((key) => nextSelected.delete(key));
    } else {
      groupSelectableKeys.forEach((key) => nextSelected.add(key));
    }
    state.selectionManager.setSelectedKeys(nextSelected);
  }, [groupSelectableKeys, isGroup, isGroupSelected, isGroupSelectionDisabled, selectedKeySet, state.selectionManager]);

  const rowOnClick = (rowProps as any).onClick as ((event: React.MouseEvent) => void) | undefined;
  const rowOnKeyDown = (rowProps as any).onKeyDown as ((event: React.KeyboardEvent) => void) | undefined;

  const mergedRowProps = {
    ...rowProps,
    onClick: (event: React.MouseEvent) => {
      rowOnClick?.(event);
      if (event.defaultPrevented || !isGroup) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('.eui-select-tree-expander')) return;
      if (target?.closest('.eui-select-tree-checkbox')) return;
      state.toggleKey(node.key);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      rowOnKeyDown?.(event);
      if (event.defaultPrevented || !isGroup) return;
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        state.toggleKey(node.key);
      }
    }
  };

  const isCollapsing = (() => {
    let parentKey = node.parentKey;
    while (parentKey != null) {
      if (collapsingKeys.has(parentKey)) {
        return true;
      }
      const parentNode = state.collection.getItem(parentKey);
      parentKey = parentNode?.parentKey ?? null;
    }
    return false;
  })();

  const isInGroup = (() => {
    let parentKey = node.parentKey;
    while (parentKey != null) {
      if (groupSelectableLeafMap.has(parentKey)) {
        return true;
      }
      const parentNode = state.collection.getItem(parentKey);
      parentKey = parentNode?.parentKey ?? null;
    }
    return false;
  })();

  const isEntering = !isCollapsing && enteringKeys.has(node.key);

  return (
    <li
      {...mergedRowProps}
      ref={ref}
      className="eui-select-tree-row"
      data-eui-tree-group={isGroup || undefined}
      data-eui-tree-group-expanded={isGroup && isExpanded ? true : undefined}
      data-eui-tree-child={isInGroup && !isGroup ? true : undefined}
      data-eui-collapsing={isCollapsing || undefined}
      data-eui-entering={isEntering || undefined}
      aria-disabled={isDisabled || undefined}
    >
      <div
        {...gridCellProps}
        className="eui-select-option eui-select-tree-cell"
        data-eui-selected={isSelected || undefined}
        data-eui-focused={isFocused || undefined}
        style={{
          paddingInlineStart: `calc(var(--eui-select-primitive-tree-indent, 1rem) * ${node.level})`
        }}
      >
        {isGroup ? (
          <CheckboxClean
            size="md"
            className="eui-select-tree-checkbox"
            checked={isGroupSelected}
            indeterminate={isGroupIndeterminate}
            disabled={isGroupSelectionDisabled}
            aria-label={`Select all in ${label}`}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => {
              event.stopPropagation();
              toggleGroupSelection();
            }}
          />
        ) : (
          <span
            className="eui-select-option-checkbox"
            data-eui-selected={isSelected || undefined}
            aria-hidden="true"
          />
        )}
        <Ellipsis
          className="eui-select-option-label"
          tooltipOnTruncate
          tooltipStrategy="native"
          focusOnTruncate={false}
        >
          {label}
        </Ellipsis>
        {node.hasChildNodes ? (
          <button
            {...expandButtonProps}
            type="button"
            className="eui-select-tree-expander"
            data-eui-expanded={isExpanded || undefined}
            aria-label={isExpanded ? 'Collapse group' : 'Expand group'}
          >
            <Icon name="chevron-right" size={12} />
          </button>
        ) : (
          <span className="eui-select-tree-expander-placeholder" aria-hidden="true" />
        )}
      </div>
    </li>
  );
}

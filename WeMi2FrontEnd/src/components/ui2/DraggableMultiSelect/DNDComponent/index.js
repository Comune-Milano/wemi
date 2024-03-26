import React, { useState, useEffect, useRef } from 'react';
import { noop } from 'utils/functions/noop';
import { arrayMove } from 'react-sortable-hoc';
import { useLogger } from 'services/Logger';
import isEqual from 'react-fast-compare';
import { isFunction } from 'utils/functions/typeCheckers';
import { orientationTypes } from '../constants';
import { SelectContainer } from './partials/SelectContainer';
import { SortableContainer } from './partials/SortableContainer';
import { ScrollableDiv } from './partials/style/scrollablediv';

const DnDComponentR = ({
  sortableElementsLabel = '',
  selectedElementsLabel = '',
  orientation = orientationTypes.vertical,
  placeholderSearch = 'Ricerca...',
  onSort = noop,
  onAdd = noop,
  onDelete = noop,
  selectedItems = [],
  items = [],
  sortItemsFunction,
  searchKeyLength = 3,
  disabled,
  color,
}) => {
  const logger = useLogger();
/**
 * @param {Object} item the item dragged and dropped
 * callback to calculate the new array of selected after drag n drop
 */
  const onSortEnd = (item) => {
    const { oldIndex, newIndex } = item;
    const newArray = arrayMove(selectedItems, oldIndex, newIndex);
    onSort(newArray);
  };

/**
 * @param {Array} listItem the list of items
 * @param {Object} item the item to find
 */
  const findItem = (listItem = [], item = {}) =>
    !!listItem.find((element) => element.id === item.id);

/**
 *
 * @param {Object} item the item to add
 * callback to add the item in the selectedItems and remove it from the items
 */
  const onAddItem = async (item) => {
    logger.info(item, 'item selezionato');
    const slicedSelectedItems = selectedItems.slice();

    const slicedItems = items.slice();
    const isItemSelectedFound = findItem(slicedSelectedItems, item);
    if (!isItemSelectedFound) {
      slicedSelectedItems.push(item);
      logger.info(item, slicedSelectedItems, 'item added');
    }

    const isItemFound = findItem(slicedItems, item);
    let newItems = slicedItems;
    if (isItemFound) {
      newItems = newItems.filter((element) => element.id !== item.id);
      logger.info(item, newItems, 'item filtered');
    }

    const newSelectedItems = slicedSelectedItems;
    logger.info(newSelectedItems, newItems);
    scrollContainerRef.current.scrollTo(0, 0);
    window.scrollTo(0, scrollContainerRef.current.offsetTop - 170);
    if (isFunction(sortItemsFunction)) {
      newItems = sortItemsFunction(newItems);
    }
    onAdd(newSelectedItems, newItems);
  };

/**
 *
 * @param {Object} item the item to add
 * callback to delete the item in the selectedItems and add it in the items
 */
  const onDeleteItem = (item) => {
    logger.info(item, 'item selezionato');
    const slicedSelectedItems = selectedItems.slice();

    const slicedItems = items.slice();
    const isItemSelectedFound = findItem(slicedSelectedItems, item);
    let newSelectedItems = slicedSelectedItems;

    if (isItemSelectedFound) {
      newSelectedItems = newSelectedItems.filter((element) => element.id !== item.id);
      logger.info(item, newSelectedItems, 'item added');
    }

    const isItemFound = findItem(slicedItems, item);
    if (!isItemFound) {
      slicedItems.push(item);
      logger.info(item, slicedItems, 'item removed');
    }

    let newItems = slicedItems;
    if (isFunction(sortItemsFunction)) {
      newItems = sortItemsFunction(newItems);
    }
    onDelete(newSelectedItems, newItems);
  };
/**
 *
 * @param {String} searchKey the search value entered
 *  by the user on the input field Ricerca...
 * callback to filter the items by the search key entered by the user
 */
  const onSearchItem = (searchKey = '') => {
    logger.info(searchKey, 'search key');
    if (!searchKey) {
      return setSearchState({
        searchKey,
        searchedElements: items,
      });
    }
    if (searchKey.length <= searchKeyLength) {
      return setSearchState(({ searchedElements }) => ({
        searchKey,
        searchedElements,
      }));
    }
    const itemsSliced = items.slice() || [];
    let filteredItems = itemsSliced.filter(item =>
      item.value ? item.value.toLowerCase().includes(searchKey.toLowerCase()) : true);
    logger.info(filteredItems, 'filtered items');
    if (isFunction(sortItemsFunction)) {
      filteredItems = sortItemsFunction(filteredItems);
    }
    return setSearchState({
      searchKey,
      searchedElements: filteredItems,
    });
  };

  /**
   * The initial state for the search in the draggable select
   */
  const initialState = {
    searchKey: '',
    searchedElements: items,
  };

  /**
   * The state for the search
   */
  const [searchState, setSearchState] = useState(initialState);

  /**
   * Reset the search state to the initial state
   * on change of the items.
   */
  useEffect(() => {
    if (!isEqual(searchState.searchedElements, items)) {
      setSearchState(initialState);
    }
  }, [items]);

  /**
   * A ref for the scroll container
   */
  const scrollContainerRef = useRef();


  return (
    <ScrollableDiv ref={scrollContainerRef} maxHeigth="500px">
      <SortableContainer
        disabled={disabled}
        tabIndex="0"
        items={selectedItems}
        onSortEnd={onSortEnd}
        label={sortableElementsLabel}
        orientation={orientation}
        mainLabel={sortableElementsLabel}
        onDelete={onDeleteItem}
        visible
        color={color}
      />
      <SelectContainer
        tabIndex="0"
        disabled={disabled}
        label={selectedElementsLabel}
        items={searchState.searchedElements}
        searchValue={searchState.searchKey}
        mainLabel={selectedElementsLabel}
        placeholderSearch={placeholderSearch}
        onAdd={onAddItem}
        onSearch={onSearchItem}
        color={color}
      />
    </ScrollableDiv>
  );
};

DnDComponentR.displayName = 'Drag n drop component with accordion';

export const DnDComponent = DnDComponentR;

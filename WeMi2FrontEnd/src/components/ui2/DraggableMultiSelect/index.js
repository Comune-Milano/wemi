import React from 'react';
import { noop } from 'utils/functions/noop';
import { orientationTypes } from './constants';
import { DnDComponent } from './DNDComponent';
import { StyledFieldset, Legend } from './style';

/**
 * item is of the type { id, value, order }
 */
export const DraggableMultiSelect = ({
  label = '',
  required = false,
  orientation = orientationTypes.vertical,
  placeholderSearch = 'Ricerca...',
  onSort = noop,
  onAdd = noop,
  sortableElementsLabel = '',
  selectedElementsLabel = '',
  onDelete = noop,
  selectedItems = [],
  items = [],
  sortItemsFunction,
  searchKeyLength = 3,
  disabled,
  color,
}) => (
  <StyledFieldset color={color} tabIndex="0">
    <DnDComponent
      color={color}
      disabled={disabled}
      orientation={orientation}
      placeholderSearch={placeholderSearch}
      onSort={onSort}
      onAdd={onAdd}
      sortableElementsLabel={sortableElementsLabel}
      selectedElementsLabel={selectedElementsLabel}
      onDelete={onDelete}
      selectedItems={selectedItems}
      items={items}
      sortItemsFunction={sortItemsFunction}
      searchKeyLength={searchKeyLength}
    />
    <Legend color={color} id={`${label}_exp_elem`}>
      {label}
      {required ? <i> *</i> : null}
    </Legend>
  </StyledFieldset>
  );

DraggableMultiSelect.displayName = 'Draggable multi select';

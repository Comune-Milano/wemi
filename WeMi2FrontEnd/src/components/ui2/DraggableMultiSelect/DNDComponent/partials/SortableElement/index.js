import React from 'react';
import { SortableElement as sortableElement } from 'react-sortable-hoc';
import { noop } from 'utils/functions/noop';
import { ListItem } from './partials/listitem';

const SortableElementComponent = ({
  id,
  item = '',
  onDelete = noop,
  ariaItemDescription = '',
  ariaButtonDescription = '',
  icon,
  iconColor,
  orientation,
  disabledItem,
  ...rest
}) => (
  <ListItem
    id={id}
    item={item}
    onClick={onDelete}
    ariaItemDescription={ariaItemDescription}
    ariaButtonDescription={ariaButtonDescription}
    icon={icon}
    iconColor={iconColor}
    orientation={orientation}
    disabledItem={disabledItem}
    {...rest}
  />
  );

SortableElementComponent.displayName = 'draggable sortable element';
export const SortableElement = sortableElement(SortableElementComponent);

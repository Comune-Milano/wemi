import React from 'react';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { orientationTypes } from 'components/ui2/DraggableMultiSelect/constants';
import { noop } from 'utils/functions/noop';
import Text from 'components/ui/Text';
import { SortableElement } from '../SortableElement';
import { Container } from '../Container';
import { StyledContainer } from './style';

const SortableContainerComponent = ({
  label = '',
  items = [],
  orientation = orientationTypes.vertical,
  onSortEnd,
  visible,
  onDelete = noop,
  disabled,
  color,
}) => {
  const findKeyCodes = () => {
    let keyCodesCalculated = {};
    if (orientation === orientationTypes.vertical) {
      keyCodesCalculated = {
        lift: [keyCodes.SPACE],
        drop: [keyCodes.SPACE],
        cancel: [keyCodes.DELETE],
        up: [keyCodes.UP_ARROW],
        down: [keyCodes.DOWN_ARROW],
      };
    }

    if (orientation === orientationTypes.horizontal) {
      keyCodesCalculated = {
        lift: [keyCodes.SPACE],
        drop: [keyCodes.SPACE],
        cancel: [keyCodes.DELETE],
        right: [keyCodes.RIGHT_ARROW],
        left: [keyCodes.LEFT_ARROW],
      };
    }
    if (orientation === orientationTypes.grid) {
      keyCodesCalculated = {
        lift: [keyCodes.SPACE],
        drop: [keyCodes.SPACE],
        cancel: [keyCodes.DELETE],
        right: [keyCodes.RIGHT_ARROW],
        left: [keyCodes.LEFT_ARROW],
        up: [keyCodes.UP_ARROW],
        down: [keyCodes.DOWN_ARROW],
      };
    }

    return keyCodesCalculated;
  };
  const SortableList = sortableContainer(({ items }) => (
    <StyledContainer>
      {items.length === 0 ?
        <Text value="Nessun valore selezionato" color="darkGrey" size="f7" />
        : null}
      {items.map((item, index) => (
        <SortableElement
          tabIndex="0"
          id={`${index}_deletable`}
          key={`${item.id}`}
          index={index}
          item={item}
          ariaItemDescription={`${item.value} eliminabile`}
          ariaButtonDescription={`Elimina l'item ${item.value}`}
          icon="times"
          iconColor="red"
          keyCodes={findKeyCodes()}
          onClick={onDelete}
          disabledItem={disabled}
          orientation={orientation}
        />
      ))}
    </StyledContainer>
  ));
  return (
    <Container
      label={label}
      tabIndex="0"
      aria-label={`${label}`}
      visible={visible}
      orientation={orientation}
      disabled={disabled}
      color={color}
    >
      <SortableList
        axis={orientation}
        onSortEnd={onSortEnd}
        items={items}
      />
    </Container>
  );
};

SortableContainerComponent.displayName = 'sortable component';

export const SortableContainer = SortableContainerComponent;

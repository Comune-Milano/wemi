import React from 'react';
import { noop } from 'utils/functions/noop';
import Input from 'components/ui2/Input';
import Text from 'components/ui/Text';
import { Container } from '../Container';
import { ListItem } from '../SortableElement/partials/listitem';
import { StyledContainerSearch, Wrapper } from './style';

const SelectContainerComponent = ({
  label = '',
  items = [],
  onSearch = noop,
  placeholderSearch = '',
  onAdd = noop,
  searchValue,
  disabled,
  color,
}) => (
  <Wrapper disabled={disabled}>
    <Container
      label={label}
      color={color}
    >
      <StyledContainerSearch>
        <Input
          onChange={onSearch}
          inputValue={searchValue}
          placeholder={placeholderSearch}
        />
      </StyledContainerSearch>
      {items.length === 0 ?
        <Text value="Nessun valore presente" color="darkGrey" size="f7" />
          : null}
      {items.map((item, index) => (
        <ListItem
          tabIndex="0"
          ariaItemDescription={`${item.value} selezionabile`}
          ariaButtonDescription={`Seleziona l'item ${item.value}`}
          key={`${item.id}`}
          id={`${index}_selectable`}
          icon="plus"
          iconColor="primary"
          item={item}
          onClick={onAdd}
          disabledItem={disabled}
        />
        ))}
    </Container>
  </Wrapper>
  );


SelectContainerComponent.displayName = 'selectable component';

export const SelectContainer = SelectContainerComponent;

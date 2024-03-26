import Select from 'components/ui2/Select';
import React from 'react';
import { noop } from 'utils/functions/noop';
import { DEFAULT_SORT, SORT_ITEMS } from './contentlist.constants';

export const SortSelect = ({
  handleSelected = noop,
  selectedValue = {},
}) => (
  <Select
    placeholder="Seleziona ordinamento"
    name="ordinamento-contenuto"
    label="Ordinamento"
    labelSelected="Le voci sono ordinate per"
    selectedValue={selectedValue}
    items={SORT_ITEMS}
    clickedSelectedItem={() => {
      handleSelected(DEFAULT_SORT);
    }}
    clickedItem={handleSelected}
  />
  );

SortSelect.displayName = 'Sort select';

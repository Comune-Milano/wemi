import React from 'react';


import { Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';


const items = [
  { id: 1, value: 'Prezzo crescente'},
  { id: 2, value: 'Prezzo decrescente'},
  { id: 3, value: 'Valutazione'},
]

const SortResults = ({
  value,
  handleValue,
}) => {
  const selectedValue = items.find(el => el.id === value);
  return (
    <Column
      xs="12"
      md="5"
      lg="4"
      padding="0 0 1em 0"
      sizepadding={{ md: '0 0 4em 0' }}
    >
      <Select
        label="Ordina per"
        items={items}
        selectedValue={selectedValue}
        clickedSelectedItem={()=> {}}
        placeholder="Ordina per"
        clickedItem={item => handleValue(item.id)}
      />
    </Column>
  );
};

SortResults.displayName = 'SortResults';

export default SortResults;
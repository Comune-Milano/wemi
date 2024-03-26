import Select from 'components/ui2/Select';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import React from 'react';
import { noop } from 'utils/functions/noop';
import { getDominioByTipoS } from './graphql';
import { STATE_ALL } from './contentlist.constants';

export const StatesSelect = ({
  handleSelected = noop,
  selectedValue = {},
}) => {
  const [statesList] = useGraphQLRequest(
    [],
    getDominioByTipoS,
    {
      typeDominio: 'STATO_CONTENUTO',
    },
    true,
    response => response.map(item => ({ id: item.value, value: item.textValue })),
  );
  return (
    <Select
      placeholder="Seleziona uno stato"
      name="stato-contenuto"
      label="Stato"
      labelSelected="lo stato selezionato è:"
      selectedValue={selectedValue}
      items={[STATE_ALL, ...statesList.data]}
      clickedSelectedItem={() => {
        handleSelected(STATE_ALL);
      }}
      clickedItem={handleSelected}
    />
  );
};

StatesSelect.displayName = 'State select';

import React from 'react';
import { Row } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Select from 'components/ui2/Select';
import { noop } from 'utils/functions/noop';
import { getAllSections } from './graphql';

const SectionList = ({
  selectedValue = [],
  handleSelected = noop,
}) => {
  const [allSections] = useGraphQLRequest(
    { list: [] },
    getAllSections,
    {},
    true,
    response => ({ list: response.list.map((item) => ({ id: item.id, value: item.title })) }),
  );

  const clickedItem = (selectedItem) => {
    const selectedValues = selectedValue.slice();
    selectedValues.push(selectedItem);
    handleSelected(selectedValues);
  };

  const clickedSelectedItem = (deselectedItem) => {
    const selectedValues = selectedValue.slice();
    handleSelected(selectedValues.filter(selectedItem => selectedItem.id !== deselectedItem.id));
  };

  return (
    <Row fluid margin="1rem 0">
      <Select
        placeholder="Seleziona sezione da associare"
        name="sezione-contenuto-associato"
        label="Lista Sezioni"
        selectedValue={selectedValue}
        items={allSections.data?.list}
        clickedItem={clickedItem}
        clickedSelectedItem={clickedSelectedItem}
        multi
        enableSearch
      />
    </Row>
  );
};

SectionList.displayName = 'Section List Content';

export default React.memo(SectionList);

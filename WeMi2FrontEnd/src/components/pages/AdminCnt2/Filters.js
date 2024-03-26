import React, { useContext } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import Select from 'components/ui2/Select';
import Button from 'components/ui2/Button';
import { contentContext } from './ContentContext';

const mapContent = (contents) => contents.map(content => ({
  id: content.value,
  value: content.textValue,
}));

export const Filters = ({
  typeStateOfContent,
  getContenutoTyData,
  typeContenuto,
}) => {
  const context = useContext(contentContext);

  const { setFilters, setCurrentPage, filters } = context;

  const handleSearch = value => {
    const searchWord = value;
    setFilters({ ...filters, ricerca: searchWord });
  };

  const handleSelect = option => {
    setFilters({ ...filters, statoCnt: option });
  };

  const handleFilters = async () => {
    const statoContenuto = filters.statoCnt.id !== 0 ? filters.statoCnt.id : undefined;
    const ricerca = filters.ricerca !== '' ? filters.ricerca : undefined;

    await getContenutoTyData({
      typeContenuto,
      statoContenuto,
      ricerca,
      offset: 0,
    });

    setCurrentPage(1);
  };

  const mappedContent = mapContent(typeStateOfContent);

  return (
    <form>
      <Row fluid margin="1em 0" justifycontent="flex-start" display="flex" alignitems="flex-end">
        <Column xs="12" md="4">
          <Input
            material
            placeholder="Cerca"
            label="Ricerca per descrizione"
            inputValue={filters.ricerca}
            onChange={handleSearch}
          />
        </Column>
        <Column xs="12" md="4">
          <Select
            placeholder="Seleziona uno stato"
            name="stato-contenuto"
            label="Filtro Stato"
            selectedValue={filters.statoCnt}
            items={[{ id: 0, value: 'Tutti gli stati' }, ...mappedContent]}
            clickedSelectedItem={handleSelect}
            clickedItem={handleSelect}
          />
        </Column>
        <Column xs="12" md="3" mdShift="1">
          <Button
            type="submit"
            name="cerca"
            label="Cerca"
            onClick={
              (event) => {
                event.preventDefault();
                handleFilters();
              }
            }
          />
        </Column>
      </Row>
    </form>
  );
};

Filters.displayName = 'Filters content search';

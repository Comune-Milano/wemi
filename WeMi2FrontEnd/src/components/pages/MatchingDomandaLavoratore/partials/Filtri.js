import React from 'react';
import Input from 'components/ui2/Input';
import Select from 'components/ui2/Select';
import { Row, Column } from 'components/ui/Grid';
import connectContext from 'hoc/connectContext';
import { convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import Button from 'components/ui2/Button';
import { mapFilterList } from '../utils/mapFilterList';
import { MatchingLavoratoreContext } from '../utils/MatchingLavoratoreContext';
import { mapLabelToProps, mapFiltersTableToProps } from '../utils/mapLabelToProps';
import { labelCalendario, labelTipologiaOrario } from '../labels';

const Filtri = ({
  filtersTable,
  handleFiltersTable,
  dataFiltersTable,
  dataReadyFiltersTable,
  setContextState,
  handleContextState,
  contextState,
  ricercaLavoratori,
}) => {
  if (!dataReadyFiltersTable) {
    return null;
  }

  const { popupFilters, calendario, idRichiestaTcb, openPopup } = contextState;

  /**
   * Costante per il ty_dominio_tcb 52
   */
  const filterAllStatoRichiesta = { id: null, value: 'Tutti gli stati' };

  const stateFilterDatabase = mapFilterList(dataFiltersTable, 52);

  const stateFilterValues = [filterAllStatoRichiesta, ...stateFilterDatabase];

  /**
   * Costante per il ty_dominio_tcb 46
   */

  const filterAllidServizio = { id: null, value: 'Tutti gli stati' };

  const tipologyFilterDatabase = mapFilterList(dataFiltersTable, 51);

  const tipologyFilterValues = [filterAllidServizio, ...tipologyFilterDatabase];


  return (
    <Row fluid margin="20px 0" flex alignitems="center">
      <Column md="10" padding="5px 5px 5px 0">
        <Row fluid>
          <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ sm: '5px 5px 5px 0' }}>
            <Input
              label="Codice Fiscale"
              inputValue={filtersTable.codiceFiscale}
              onChange={(value) => handleFiltersTable('codiceFiscale', value)}
            />
          </Column>
          <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ sm: '5px 5px 5px 0' }}>
            <Input
              label="cognome"
              inputValue={filtersTable.cognome}
              onChange={(value) => handleFiltersTable('cognome', value)}
            />
          </Column>
          <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ sm: '5px 5px 5px 0' }}>
            <Select
              items={stateFilterValues}
              selectedValue={filtersTable.statoCandidatura}
              label="Stato"
              enableSearch
              searchLowerLimit={1}
              clickedSelectedItem={() => handleFiltersTable('statoCandidatura', undefined)}
              clickedItem={(value) => handleFiltersTable('statoCandidatura', value)}
            />
          </Column>
          <Column xs="12" sm="3" md="3" padding="0" sizepadding={{ sm: '5px 5px 5px 0' }}>
            <Select
              items={tipologyFilterValues.map(element => ({ ...element, id: element.id }))}
              selectedValue={filtersTable.tipologiaServizio}
              label="Stato Associazioni"
              enableSearch
              searchLowerLimit={1}
              clickedSelectedItem={() => handleFiltersTable('tipologiaServizio', undefined)}
              clickedItem={(value) => handleFiltersTable('tipologiaServizio', value)}
            />
          </Column>
        </Row>
      </Column>
      <Column md="2" padding="5px 5px 5px 0">
        <Row fluid>
          <Column padding="0.1em" flex alignitems="flex-start">
            <Button
              width="100%"
              onClick={() => handleContextState('openPopup', !openPopup)}
              label="Imposta Filtri"
              fontSize="f7_5"
              name="imposta-filtri"
            />
          </Column>
          <Column padding="0.1em">
            <Button
              fontSize="f7_5"
              name="cerca"
              label="Cerca"
              width="100%"
              onClick={async () => {
                setContextState({ ...contextState, lavoratori: null, dataReadyLavoratore: false });
                const flagCalendario = calendario;

                const parameters = {
                  ...mapLabelToProps(popupFilters),
                  ...mapFiltersTableToProps(filtersTable),
                  calendario: flagCalendario ? convertObjectToBin(popupFilters[labelCalendario]) : undefined,
                };

                const ricerca = await ricercaLavoratori({
                  offset: 0,
                  parameters,
                  idRichiesta: idRichiestaTcb,
                });
                setContextState({ ...contextState, lavoratori: ricerca, dataReadyLavoratore: true, currentPage: 1 });
              }}
            />
          </Column>
        </Row>
      </Column>
    </Row>
  );
};

Filtri.displayName = 'Filtri matching domanda/lavoratore';

const mapContextToProps = (context) => ({
  filtersTable: context.contextState.filtersTable,
  dataReadyFiltersTable: context.contextState.dataReadyFiltersTable,
  handleFiltersTable: context.handleFiltersTable,
  dataFiltersTable: context.contextState.dataFiltersTable,
  setContextState: context.setContextState,
  handleContextState: context.handleContextState,
  contextState: context.contextState,
  ricercaLavoratori: context.ricercaLavoratori,
});

export default connectContext(MatchingLavoratoreContext, mapContextToProps)(Filtri);

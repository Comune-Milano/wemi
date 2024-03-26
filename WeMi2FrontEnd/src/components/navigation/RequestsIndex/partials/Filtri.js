/** @format */

import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';
import Text from 'components/ui/Text';
import DatePicker from 'components/ui2/DatePicker';
import MobileToggler from './MobileToggler';
import { stateItems, typeItems } from './mocks/selectMocks'

const FiltersRow = styled(Row)``;


const Filtri = ({ filtri, setFiltri }) => {
  const formattedDate = (date) => {
    return moment(date).format('YYYY/MM/DD');
  };

  const updateFiltri = (nomeFiltro, valore) => {
    setFiltri({ ...filtri, [nomeFiltro]: valore });
  };

  const filterSection = (
    <FiltersRow fluid alignitems='start' margin='0 0 1.5em 0'>
      {
        ['xs', 'sm', 'md'].indexOf(useWindowSize()) === -1 &&
        <Column xs='12' md="4" lg="2" padding="0" />
      }
      {
        ['xs', 'sm'].indexOf(useWindowSize()) === -1 &&
        <Column xs='12' md="4" lg="2" padding='5px' alignself="center">
          <Text 
            tag='strong' 
            size='f6' 
            weight='bold' 
            transform='uppercase'
            letterSpacing="0.05em" 
            value='Filtra per: ' 
            letterSpacing="0.05em"
          />
        </Column>
      }
      <Column xs='12' md="4" lg="2" padding='1em 0 0 0' sizepadding={{md: "0 0 0 1em"}}>
        <DatePicker
          label='Dal giorno'
          fromYear={2020}
          selectedDay={new Date(filtri.dataDa)}
          disabledDays={(date) => {
            return filtri.dataAl ? date > new Date(filtri.dataAl) : false;
          }}
          onChange={(date) => {
            updateFiltri('dataDa', date ? formattedDate(date) : undefined);
          }}
        />
      </Column>
      <Column xs='12' md="4" lg="2" padding='1em 0 0 0' sizepadding={{md: "0 0 0 1em"}}>
        <DatePicker
          disabledDays={{
            before: new Date(filtri.dataDa),
          }}
          label='Al giorno'
          selectedDay={new Date(filtri.dataAl)}
          fromYear={2020}
          onChange={(date) => {
            updateFiltri('dataAl', date ? formattedDate(date) : undefined);
          }}
        />
      </Column>
      {
        ['md'].indexOf(useWindowSize()) >= 0 &&
        <Column xs='12' md="4" lg="2" padding="0" />
      }
      <Column xs='12' md="4" lg="2" padding='1em 0 0 0' sizepadding={{md: "1em 0 0 1em", lg: "0 0 0 1em"}}>
        <Select
          name='statoRichiesta'
          label='Stato richiesta'
          items={stateItems}
          clickedSelectedItem={() => {
            updateFiltri('statoRichiesta', { id: undefined, value: 'Tutti gli stati' });
          }}
          clickedItem={(data) => {
            updateFiltri('statoRichiesta', data);
          }}
          removedItem={() => {
            updateFiltri('statoRichiesta', { id: undefined, value: 'Tutti gli stati' });
          }}
          selectedValue={filtri.statoRichiesta}
          placeholder="Seleziona lo stato della richiesta"
        />
      </Column>

      <Column xs='12' md="4" lg="2" padding='1em 0 0 0' sizepadding={{md: "1em 0 0 1em", lg: "0 0 0 1em"}}>
        <Select
          name='tipologia'
          label='Tipologia'
          items={typeItems}
          clickedSelectedItem={() => {
            updateFiltri('tipologiaServizio', { id: 0, value: 'Tutte le tipologie' });
          }}
          clickedItem={(data) => {
            updateFiltri('tipologiaServizio', data);
          }}
          removedItem={() => {
            updateFiltri('tipologiaServizio', { id: 0, value: 'Tutte le tipologie' });
          }}
          selectedValue={filtri.tipologiaServizio}
        />
      </Column>
    </FiltersRow>
  );

  return (
    <>
      {
        ['xs', 'sm'].indexOf(useWindowSize()) >= 0 ?
          <MobileToggler section={filterSection}></MobileToggler>
          :
          filterSection
      }
    </>
  );
};

Filtri.displayName = 'Filtri';
export default Filtri;

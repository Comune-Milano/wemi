/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import Select from 'components/ui2/Select';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { hexToRgba } from 'utils/functions/hexToRgba';
import Button from 'components/ui2/Button';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import DatePicker from 'components/ui2/DatePicker';
import moment from 'moment';
import { DominioTcbByTipoTcb as DominioTcbByTipoTcbQ } from './DatilavoratoreGraphql';
import useWindowSize from 'hooks/useWindowSize';
import MobileToggler from './MobileToggler';

const FiltersRow = styled(Row)``;

const SezioneLavoratoreFiltri = ({ setFilters, filters }) => {
  const filterAllStatoOpportunita = { id: '', value: 'Tutti gli stati' };

  const [
    dominioTcbStatoStatoOpportunita,
    performRequestDominioTcbStatoOpportunita,
  ] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 51,
    },
    true,
    dominiTcb => {
      const data = dominiTcb.map(row => ({ id: row.value, value: row.textValue }));
      data.unshift(filterAllStatoOpportunita);
      return data;
    }
  );

  const isMobile = ['xs', 'sm'].indexOf(useWindowSize()) >= 0;

  const filterSection = (
    <FiltersRow fluid alignitems='start' margin='0 0 1.5em 0'>
      {
       isMobile &&
        <Column xs='12' md="4" lg="2" padding="0" />
      }
      {
        !isMobile &&
        <Column xs='12' md="4" lg="2" padding='5px' alignself="center">
          <Text 
            tag='strong' 
            size='f6' 
            weight='bold' 
            transform='uppercase' 
            letterSpacing="0.05em"
            value='Filtra per: ' 
          />
        </Column>
      }
      <Column xs='12' md="4" lg="2" padding='1em 0 0 0' sizepadding={{ md: '0 0 0 1em' }}>
        {dominioTcbStatoStatoOpportunita.data ? (
          <Select
            material
            color="primary"
            label="Stato Opportunità"
            items={dominioTcbStatoStatoOpportunita.data}
            clickedItem={value => {
              setFilters({ ...filters, statoOpportunita: value });
            }}
            selectedValue={filters.statoOpportunita}
            intlFormatter
            intlPlaceholder=""
          />
        ) : null}
      </Column>
      <Column xs='12' md="4" lg="2" padding='1em 0 0 0' sizepadding={{ md: '0 0 0 1em' }}>
        <DatePicker
          label="Data Offerta"
          selectedDate={filters.dataOfferta}
          onChange={value => {
            setFilters({ ...filters, dataOfferta: value ? moment(value).format('DD/MM/YYYY') : undefined });
          }}
        />
      </Column>
    </FiltersRow>
  );

  if (isMobile) {
    return <MobileToggler section={filterSection}></MobileToggler>
  }

  return (
    filterSection
  );
};

SezioneLavoratoreFiltri.displayName = 'SezioneLavoratoreFiltri';
export default SezioneLavoratoreFiltri;

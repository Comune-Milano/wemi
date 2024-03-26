import React from 'react';
import { TipologiaOrario } from './TipologiaOrario';
import { Stipendio } from './Stipendio';

const StipendioPropostoList = ({
  filterList,
  selectedFilters,
  setPopupFilters,
}) => (
  <>
    <TipologiaOrario
      filterList={filterList}
      selectedFilters={selectedFilters}
      setPopupFilters={setPopupFilters}
    />
    <Stipendio
      filterList={filterList}
      selectedFilters={selectedFilters}
      setPopupFilters={setPopupFilters}
    />
  </>
  );


StipendioPropostoList.displayName = 'StipendioPropostoList';

export const StipendioProposto = StipendioPropostoList;

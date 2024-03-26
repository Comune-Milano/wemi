import React from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import TextAccordion from 'components/ui2/TextAccordion';
import { countFilter } from 'components/pages/MatchingDomandaLavoratore/utils/counterFilter';
import { labelCheckboxListDatiPersonali, labelCarattere } from 'components/pages/MatchingDomandaLavoratore/labels';
import connectContext from 'hoc/connectContext';
import { DivBackground } from 'components/pages/MatchingDomandaLavoratore/utils/DivBackground';
import { CheckboxList, Carattere } from './DatiPersonali/';

const DatiPersonaliComponent = ({ filterListDbData: filterList, handleFilterPopup: setPopupFilters, contextState }) => {
  const labels = {
    ...labelCheckboxListDatiPersonali,
    labelCarattere,
  };

  const filterCount = countFilter(labels, contextState);

  const { popupFilters: selectedFilters } = contextState;

  return (
    <TextAccordion
      label={`Dati Personali - filtri selezionati: ${filterCount}`}
      color="primary"
    >
      <DivBackground
        color="greyInput"
      >
        <CheckboxList
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
        <Carattere
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
          filterList={filterList}
        />
      </DivBackground>
    </TextAccordion>

  );
};

DatiPersonaliComponent.displayName = 'Dati Personali';

const mapContextToProps = (context) => ({
  filterListDbData: context.contextState.filterListDbData,
  handleFilterPopup: context.handleFilterPopup,
  contextState: context.contextState,
});


export const DatiPersonali = connectContext(MatchingLavoratoreContext, mapContextToProps)(DatiPersonaliComponent);

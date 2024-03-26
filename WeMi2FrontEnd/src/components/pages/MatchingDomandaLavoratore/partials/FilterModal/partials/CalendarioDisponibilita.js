import React from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import TextAccordion from 'components/ui2/TextAccordion';
import { labelCalendario, labelTipologiaOrario } from 'components/pages/MatchingDomandaLavoratore/labels';
import { countFilter } from 'components/pages/MatchingDomandaLavoratore/utils/counterFilter';
import connectContext from 'hoc/connectContext';
import { DivBackground } from 'components/pages/MatchingDomandaLavoratore/utils/DivBackground';
import { Calendario } from './CalendarioDisponibilita/';

const CalendarioDisponibilitaComponent = ({ filterListDbData: filterList, handleFilterPopup: setPopupFilters, contextState }) => {
  const labels = {
    labelCalendario,
    // labelTipologiaOrario,
  };

  const filterCount = countFilter(labels, contextState);

  const { popupFilters: selectedFilters } = contextState;

  return (
    <TextAccordion
      label={`Calendario disponibilità - filtri selezionati: ${filterCount}`}
      color="primary"
    >
      <DivBackground
        color="greyInput"
      >
        <Calendario
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
      </DivBackground>
    </TextAccordion>

  );
};

CalendarioDisponibilitaComponent.displayName = 'CalendarioDisponibilitaComponent';

const mapContextToProps = (context) => ({
  filterListDbData: context.contextState.filterListDbData,
  handleFilterPopup: context.handleFilterPopup,
  contextState: context.contextState,
});


export const CalendarioDisponibilita = connectContext(MatchingLavoratoreContext, mapContextToProps)(CalendarioDisponibilitaComponent);

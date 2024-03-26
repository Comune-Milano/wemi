import React from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import TextAccordion from 'components/ui2/TextAccordion';
import { labelCorsiTata, labelMadrelingua, labelCorsiBadante } from 'components/pages/MatchingDomandaLavoratore/labels';
import { countFilter } from 'components/pages/MatchingDomandaLavoratore/utils/counterFilter';
import connectContext from 'hoc/connectContext';
import { DivBackground } from 'components/pages/MatchingDomandaLavoratore/utils/DivBackground';
import { Madrelingua, CorsiBadante, CorsiTata } from './IstruzioneFormazione/';

const IstruzioneFormazioneList = ({ filterListDbData: filterList, handleFilterPopup: setPopupFilters, contextState }) => {
  const labels = {
    labelCorsiTata,
    labelCorsiBadante,
    ...labelMadrelingua,
  };

  const filterCount = countFilter(labels, contextState);

  const { popupFilters: selectedFilters } = contextState;

  return (
    <TextAccordion
      label={`Istruzione e Formazione - filtri selezionati: ${filterCount}`}
      color="primary"
    >
      <DivBackground
        color="greyInput"
      >
        <CorsiTata
          filterList={filterList}
          setPopupFilters={setPopupFilters}
          selectedFilters={selectedFilters}
        />
        <CorsiBadante
          filterList={filterList}
          setPopupFilters={setPopupFilters}
          selectedFilters={selectedFilters}
        />
        <Madrelingua
          filterList={filterList}
          setPopupFilters={setPopupFilters}
          selectedFilters={selectedFilters}
        />
      </DivBackground>
    </TextAccordion>

  );
};

IstruzioneFormazioneList.displayName = 'Istruzione e formazione';

const mapContextToProps = (context) => ({
  filterListDbData: context.contextState.filterListDbData,
  handleFilterPopup: context.handleFilterPopup,
  contextState: context.contextState,
});


export const IstruzioneFormazione = connectContext(MatchingLavoratoreContext, mapContextToProps)(IstruzioneFormazioneList);

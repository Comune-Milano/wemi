import React from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import { countFilter } from 'components/pages/MatchingDomandaLavoratore/utils/counterFilter';
import { labelCompetenzeBadante, labelCompetenzeTata, labelCompetenzeColf, labelFasceEta } from 'components/pages/MatchingDomandaLavoratore/labels';
import TextAccordion from 'components/ui2/TextAccordion';
import connectContext from 'hoc/connectContext';
import { DivBackground } from 'components/pages/MatchingDomandaLavoratore/utils/DivBackground';
import { Badante, Colf, Tata } from './Competenze/';

const CompetenzeComponent = ({ filterListDbData: filterList, handleFilterPopup: setPopupFilters, contextState }) => {
  const labels = {
    labelCompetenzeBadante,
    labelCompetenzeColf,
    labelCompetenzeTata,
    labelFasceEta,
  };

  const filterCount = countFilter(labels, contextState);

  const { popupFilters: selectedFilters } = contextState;

  return (
    <TextAccordion
      label={`Competenze - filtri selezionati: ${filterCount}`}
      color="primary"
    >
      <DivBackground
        color="greyInput"
      >
        <Tata
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
        <Colf
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}

        />
        <Badante
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
      </DivBackground>
    </TextAccordion>

  );
};

CompetenzeComponent.displayName = 'Competenze';

const mapContextToProps = (context) => ({
  filterListDbData: context.contextState.filterListDbData,
  handleFilterPopup: context.handleFilterPopup,
  contextState: context.contextState,
});


export const Competenze = connectContext(MatchingLavoratoreContext, mapContextToProps)(CompetenzeComponent);

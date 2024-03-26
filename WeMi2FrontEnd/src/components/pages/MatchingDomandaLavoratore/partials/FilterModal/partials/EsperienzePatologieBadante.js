import React from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import TextAccordion from 'components/ui2/TextAccordion';
import { labelAccudimento, labelAnniEsperienza } from 'components/pages/MatchingDomandaLavoratore/labels';
import { countFilter } from 'components/pages/MatchingDomandaLavoratore/utils/counterFilter';
import connectContext from 'hoc/connectContext';
import { DivBackground } from 'components/pages/MatchingDomandaLavoratore/utils/DivBackground';
import { CD_TIPOLOGICA_BADANTE } from 'types/tcbConstants';
import { Column } from 'components/ui/Grid';
import { Accudimento } from './EsperienzePatologieBadante/';

const EsperienzePatologieBadanteList = ({ filterListDbData: filterList, handleFilterPopup: setPopupFilters, contextState }) => {
  const labels = {
    labelAccudimento,
  };

  const filterCount = countFilter(labels, contextState);

  const { popupFilters: selectedFilters } = contextState;

  const { [labelAnniEsperienza.workerType]: workerType } = selectedFilters;


  if (workerType.id !== CD_TIPOLOGICA_BADANTE) {
    return null;
  }

  return (
    <Column xs="12" padding="0.1em" margin="0.5em 0">
      <TextAccordion
        label={`Esperienze Patologie Badante - filtri selezionati: ${filterCount}`}
        color="primary"
      >
        <DivBackground
          color="greyInput"
        >
          <Accudimento
            filterList={filterList}
            selectedFilters={selectedFilters}
            setPopupFilters={setPopupFilters}
          />
        </DivBackground>
      </TextAccordion>
    </Column>
  );
};

EsperienzePatologieBadanteList.displayName = 'Esperienze patologie badante';

const mapContextToProps = (context) => ({
  filterListDbData: context.contextState.filterListDbData,
  handleFilterPopup: context.handleFilterPopup,
  contextState: context.contextState,
});


export const EsperienzePatologieBadante = connectContext(MatchingLavoratoreContext, mapContextToProps)(EsperienzePatologieBadanteList);

import React from 'react';
import { MatchingLavoratoreContext } from 'components/pages/MatchingDomandaLavoratore/utils/MatchingLavoratoreContext';
import TextAccordion from 'components/ui2/TextAccordion';
import { countFilter } from 'components/pages/MatchingDomandaLavoratore/utils/counterFilter';
import { labelAnniEsperienza, labelSpaziLavoratore, labelTipologiaOrario, labelStipendioProposto, labelAltriValori, labelCheckboxListDisponibilita } from 'components/pages/MatchingDomandaLavoratore/labels';
import connectContext from 'hoc/connectContext';
import { DivBackground } from 'components/pages/MatchingDomandaLavoratore/utils/DivBackground';
import { StipendioProposto, AnniEsperienza, CheckboxList, AltriValori, SpaziLavoratore } from './Disponibilita/';

const DisponibilitaComponent = ({ filterListDbData: filterList, handleFilterPopup: setPopupFilters, setContextState, contextState }) => {
  const labels = {
    labelStipendioProposto,
    // labelTipologiaOrario,
    labelAnniEsperienza: labelAnniEsperienza.anniEsperienza,
    ...labelCheckboxListDisponibilita,
    ...labelAltriValori,
    ...labelSpaziLavoratore,
  };

  const filterCount = countFilter(labels, contextState);

  const { popupFilters: selectedFilters } = contextState;

  return (
    <TextAccordion
      label={`Disponibilità - filtri selezionati: ${filterCount}`}
      color="primary"
    >
      <DivBackground
        color="greyInput"
      >
        <StipendioProposto
          filterList={filterList}
          selectedFilters={contextState}
          setPopupFilters={setContextState}
        />
        <AnniEsperienza
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
        <CheckboxList
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
        <AltriValori
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
        <SpaziLavoratore
          filterList={filterList}
          selectedFilters={selectedFilters}
          setPopupFilters={setPopupFilters}
        />
      </DivBackground>
    </TextAccordion>

  );
};

DisponibilitaComponent.displayName = 'Disponibilita';

const mapContextToProps = (context) => ({
  filterListDbData: context.contextState.filterListDbData,
  handleFilterPopup: context.handleFilterPopup,
  contextState: context.contextState,
  setContextState: context.setContextState,
});


export const Disponibilita = connectContext(MatchingLavoratoreContext, mapContextToProps)(DisponibilitaComponent);

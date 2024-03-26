import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Loader from 'components/ui2/Loader';
import Text from 'components/ui/Text';
import connectContext from 'hoc/connectContext';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { DatiPersonali, Disponibilita, Competenze, IstruzioneFormazione, EsperienzePatologieBadante, CalendarioDisponibilita } from './partials';
import { MatchingLavoratoreContext } from '../../utils/MatchingLavoratoreContext';
import { countFilter } from '../../utils/counterFilter';
import {
  labelAccudimento,
  labelAltriValori,
  labelAnniEsperienza,
  labelCompetenzeBadante,
  labelCalendario,
  labelCarattere,
  labelCheckboxListDatiPersonali,
  labelCheckboxListDisponibilita,
  labelCompetenzeColf,
  labelCorsiBadante,
  labelCorsiTata,
  labelMadrelingua,
  labelSpaziLavoratore,
  labelStipendioProposto,
  labelCompetenzeTata,
  labelFasceEta,
} from '../../labels';
import { getFilters as getFiltersQ } from '../../graphql';
import { MAX_FILTERS } from '../../constants/maxfilters';

const BodyComponent = ({ errors, handleContextState, filterListDbData, contextState }) => {
  /**
   * The graphql request to get the filters for the popup from the db
   */
  const getFilters = useStatelessGraphQLRequest(getFiltersQ);

  useEffect(() => {
    const fetchDataPopup = async () => {
      const filterPopupDbList = await getFilters();
      await handleContextState('filterListDbData', filterPopupDbList);
    };

    fetchDataPopup();
  }, []);

  const allLabels = {
    labelAccudimento,
    ...labelAltriValori,
    labelAnniEsperienza: labelAnniEsperienza.anniEsperienza,
    labelCompetenzeBadante,
    // labelCalendario,
    labelCarattere,
    ...labelCheckboxListDatiPersonali,
    ...labelCheckboxListDisponibilita,
    labelCompetenzeColf,
    labelCorsiBadante,
    labelCorsiTata,
    ...labelMadrelingua,
    ...labelSpaziLavoratore,
    labelStipendioProposto,
    labelCompetenzeTata,
    labelFasceEta,
  };


  const count = countFilter(allLabels, contextState);


  return (
    <>
      <Row fluid justifycontent="center" margin="0.5em">
        <Column padding="0.1em">
          <Text
            value={`Filtri Selezionati - ${count}`}
            color="blue"
            tag="h3"
            weight="bold"
            align="center"
            size="unset"
          />
          {errors ? (
            <Text
              value={`Massimo ${MAX_FILTERS} filtri selezionabili + il calendario`}
              color="red"
              tag="h5"
              weight="bold"
              align="center"
            />
          )

            : null}
        </Column>

      </Row>


      <Row>
        {filterListDbData ? (
          <>
            <Column xs="12" padding="0.1em" margin="0.5em 0">
              <DatiPersonali />
            </Column>
            <Column xs="12" padding="0.1em" margin="0.5em 0">

              <IstruzioneFormazione />
            </Column>

            <Column xs="12" padding="0.1em" margin="0.5em 0">
              <Competenze />
            </Column>
            <EsperienzePatologieBadante />
            <Column xs="12" padding="0.1em" margin="0.5em 0">

              <Disponibilita />
            </Column>
            <Column xs="12" padding="0.1em" margin="0.5em 0">

              <CalendarioDisponibilita />
            </Column>
          </>
        )
          : <Loader />}
      </Row>
    </>
  );
};

const mapContextToProps = (context) => ({
  contextState: context.contextState,
  errors: context.contextState.errors,
  popupFilters: context.contextState.popupFilters,
  filtersTable: context.contextState.filtersTable,
  filterListDbData: context.contextState.filterListDbData,
  handleContextState: context.handleContextState,
  setContextState: context.setContextState,
});

BodyComponent.displayName = 'Body del modale';


export const Body = connectContext(MatchingLavoratoreContext, mapContextToProps)(BodyComponent);

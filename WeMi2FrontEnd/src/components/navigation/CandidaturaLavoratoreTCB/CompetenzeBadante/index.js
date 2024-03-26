/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { FadeInWrapper } from '../partials/FadeInWrapper';
import {
  estraiMansioniColf as estraiMansioniColfQ,
  estraiMansioniBadante as estraiMansioniBadanteQ,
  estraiDatiCompetenzeBadante as estraiDatiCompetenzeBadanteQ,
} from './CompetenzeBadanteGraphql';
import { EstraiPatologie as EstraiPatologieQ, estraiDatiEsperienzeBadante as estraiDatiEsperienzeBadanteQ } from '../EsperienzeBadante/EsperienzeBadanteGraphQL';
import { getInitialDataset } from './partials/datasets';
import { validationSchema } from './partials/validationSchema';
import CompetenzeBadanteForm from './CompetenzeBadanteForm';
import { codiciAttributo } from '../constants/CodiciAttributo';

const CompetenzeBadante = ({
  idLavoratore,
  idOperatore,
  saveStepAndTabsStatus,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
  locale,
  navigationTabs,
  setNavigationTabs,
}) => {
  const [datiCompetenzeBadante] = useGraphQLRequest(
    undefined,
    estraiDatiCompetenzeBadanteQ,
    { idUtenteLav: idLavoratore },
    true
  );

  const [mansioniColf] = useGraphQLRequest(
    undefined,
    estraiMansioniColfQ,
    undefined,
    true
  );

  const [mansioniBadante] = useGraphQLRequest(
    undefined,
    estraiMansioniBadanteQ,
    undefined,
    true
  );

  const [patologie] = useGraphQLRequest(
    undefined,
    EstraiPatologieQ,
    undefined,
    true
  );
  const [datiEsperienzeBadante] = useGraphQLRequest(
    undefined,
    estraiDatiEsperienzeBadanteQ,
    {
      input: {
        idUtente: idLavoratore,
        cdAttributoPatologieGeneriche: codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_GENERICHE,
        cdAttributoPatologieAnziani: codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_ANZIANI,
        servizioRiferimento: 999999,
      },
    },
    true
  );

  const loaded = !datiCompetenzeBadante.isLoading &&
    !datiCompetenzeBadante.pristine &&
    !mansioniBadante.isLoading &&
    !mansioniBadante.pristine &&
    !mansioniColf.isLoading &&
    !mansioniColf.pristine &&
    !patologie.isLoading &&
    !patologie.pristine &&
    !datiEsperienzeBadante.isLoading &&
    !datiEsperienzeBadante.pristine;

  return (
    <FadeInWrapper fluid>

      {loaded ?
        (
          <>

            <StepTitle
              title="Competenze badante"
            />
            <Form
              validateOnChange
              initialDataset={getInitialDataset(datiCompetenzeBadante.data, datiEsperienzeBadante, codiciAttributo)}
              validationSchema={validationSchema}
            >
              <CompetenzeBadanteForm
                idLavoratore={idLavoratore}
                patologie={patologie}
                codiciAttributo={codiciAttributo}
                idOperatore={idOperatore}
                changeStep={changeStep}
                saveStepAndTabsStatus={saveStepAndTabsStatus}
                moveToNextStep={moveToNextStep}
                moveToPrevStep={moveToPrevStep}
                locale={locale}
                navigationTabs={navigationTabs}
                setNavigationTabs={setNavigationTabs}
                stepCandidate={stepCandidate}
                formData={{ mansioniColf, mansioniBadante }}
              />
            </Form>
          </>
        )
        : null}
    </FadeInWrapper>
  );
};

CompetenzeBadante.displayName = 'CompetenzeBadante';

export default CompetenzeBadante;

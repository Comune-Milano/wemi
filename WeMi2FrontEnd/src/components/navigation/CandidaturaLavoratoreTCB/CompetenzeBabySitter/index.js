/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { FadeInWrapper } from '../partials/FadeInWrapper';
import {
  estraiFasceEta as estraiFasceEtaQ,
  estraiMansioniTata as estraiMansioniTataQ,
  estraiMansioniColf as estraiMansioniColfQ,
  estraiDatiCompetenzeTata as estraiDatiCompetenzeTataQ,
} from './CompetenzeBabySitterGraphQL';
import { getInitialDataset } from './partials/dataset';
import { validationSchema } from './partials/validationSchema';
import CompetenzeBabySitterForm from './CompetenzeBabySitterForm';

const CompetenzeBabySitter = ({
  idLavoratore,
  idOperatore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  locale,
  stepCandidate,
  navigationTabs,
  setNavigationTabs,
}) => {
  const [datiCompetenzeTata] = useGraphQLRequest(
    undefined,
    estraiDatiCompetenzeTataQ,
    { idUtenteLav: idLavoratore },
    true
  );

  const [fasceEta] = useGraphQLRequest(undefined, estraiFasceEtaQ, undefined, true);

  const [mansioniTata] = useGraphQLRequest(undefined, estraiMansioniTataQ, undefined, true);

  const [mansioniColf] = useGraphQLRequest(undefined, estraiMansioniColfQ, undefined, true);

  const loaded =
    !datiCompetenzeTata.isLoading &&
    !datiCompetenzeTata.pristine &&
    !fasceEta.isLoading &&
    !fasceEta.pristine &&
    !mansioniTata.isLoading &&
    !mansioniTata.pristine &&
    !mansioniColf.isLoading &&
    !mansioniColf.pristine;

  return (
    <FadeInWrapper fluid>
      {loaded ? (
        <>
          <StepTitle title="Competenze baby-sitter" />

          <Form
            validateOnChange
            initialDataset={getInitialDataset(datiCompetenzeTata.data)}
            validationSchema={validationSchema}
          >
            <CompetenzeBabySitterForm
              idLavoratore={idLavoratore}
              idOperatore={idOperatore}
              changeStep={changeStep}
              moveToNextStep={moveToNextStep}
              moveToPrevStep={moveToPrevStep}
              locale={locale}
              navigationTabs={navigationTabs}
              setNavigationTabs={setNavigationTabs}
              stepCandidate={stepCandidate}
              formData={{ fasceEta, mansioniTata, mansioniColf }}
            />
          </Form>
        </>
      ) : null}
    </FadeInWrapper>
  );
};

CompetenzeBabySitter.displayName = 'CompetenzeBabySitter';
export default CompetenzeBabySitter;

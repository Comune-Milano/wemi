/** @format */

import React from 'react';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { Form } from 'libs/Form/components/Form';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { FadeInWrapper } from '../partials/FadeInWrapper';
import {
  estraiMansioniColf as estraiMansioniColfQ,
  estraiDatiCompetenzeColf as estraiDatiCompetenzeColfQ,
} from './CompetenzeColfGraphQL';
import { getInitialDataset } from './partials/datasets';
import { validationSchema } from './partials/validationSchema';
import CompetenzeColfForm from './CompetenzeColfForm';

const CompetenzeColf = ({
  idLavoratore,
  idOperatore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
  locale,
  navigationTabs,
  setNavigationTabs,
}) => {
  const [datiCompetenzeColf] = useGraphQLRequest(
    undefined,
    estraiDatiCompetenzeColfQ,
    { idUtenteLav: idLavoratore },
    true
  );

  const [mansioniColf] = useGraphQLRequest(
    undefined,
    estraiMansioniColfQ,
    undefined,
    true
  );

  const loaded = !datiCompetenzeColf.isLoading &&
    !datiCompetenzeColf.pristine &&
    !mansioniColf.isLoading &&
    !mansioniColf.pristine;

  return (
    <FadeInWrapper fluid>

      {loaded ? (
        <>
          <StepTitle title="Competenze colf" />
          <Form
            validateOnChange
            initialDataset={getInitialDataset(datiCompetenzeColf.data)}
            validationSchema={validationSchema}
          >
            <CompetenzeColfForm
              idLavoratore={idLavoratore}
              idOperatore={idOperatore}
              changeStep={changeStep}
              moveToNextStep={moveToNextStep}
              moveToPrevStep={moveToPrevStep}
              locale={locale}
              navigationTabs={navigationTabs}
              setNavigationTabs={setNavigationTabs}
              stepCandidate={stepCandidate}
              formData={{ mansioniColf }}
            />
          </Form>
        </>
      ) : null}
    </FadeInWrapper>
  );
};

CompetenzeColf.displayName = 'CompetenzeColf';

export default CompetenzeColf;

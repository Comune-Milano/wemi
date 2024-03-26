
import React, { useEffect, useState } from 'react';
import yup from 'libs/Form/validation/yup';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';

import { Form } from 'libs/Form/components/Form';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

import { Header } from './partials/Header';
import { CheckCandidatura } from './partials/CheckCandidatura';
import { NavigationButtons } from './partials/NavigationButtons';
import { estraiFlagsCandidaturaQuery } from './CandidaturaGraphQL';
import { getInitialDataset } from './form/dataset';
import { validationSchema } from './form/validationSchema';

const SECTION_TITLE = 'Per quale servizio vuoi candidarti?';

const Candidatura = ({
  idLavoratore,
  idOperatore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
}) => {
  // The flags stored on the backend side.
  const fetchCandidaturaFlags = useStatelessGraphQLRequest(estraiFlagsCandidaturaQuery);

  // The initial dataset of the form.
  const [initialDataset, setInitialDataset] = useState();

  useEffect(
    () => {
      fetchCandidaturaFlags({ idUtente: idLavoratore })
        .then(flags => setInitialDataset(getInitialDataset(flags)));
    },
    []
  );

  // Break if the dataset is not initialized.
  if (!initialDataset) {
    return null;
  }

  return (
    <>
      <Header />
      <Form
        validateOnChange
        initialDataset={initialDataset}
        validationSchema={validationSchema}
        onChangeValidationDebounce={0}
      >
        {
          ({ dataset, setFormField, isFormValid, isFormDirty }) => (
            <>
              <Row fluid margin="0 0 1.5rem 0">
                <Text
                  tag="h6"
                  size="f6"
                  weight="bold"
                  color="primary"
                  margin="0 0 1.5rem 0"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  value={SECTION_TITLE}
                />
                <CheckCandidatura
                  candidatura={dataset}
                  setCandidatura={setFormField}
                />
              </Row>
              <Row fluid justifycontent="center">
                <NavigationButtons
                  formDataset={dataset}
                  isFormValid={isFormValid}
                  isFormDirty={isFormDirty}
                  idUtente={idLavoratore}
                  stepCandidate={stepCandidate}
                  changeStep={changeStep}
                  moveToNextStep={moveToNextStep}
                  moveToPrevStep={moveToPrevStep}
                />
              </Row>
            </>
          )
        }
      </Form>
    </>
  );
};

Candidatura.displayName = 'Step candidatura';

export default Candidatura;

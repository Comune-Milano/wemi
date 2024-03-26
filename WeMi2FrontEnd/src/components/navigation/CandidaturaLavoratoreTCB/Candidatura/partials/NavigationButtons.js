
import React from 'react';
import { useDepChange } from 'hooks/useDepChange';
import ButtonsNavigation from 'components/navigation/CandidaturaLavoratoreTCB/partials/ButtonsNavigation';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { updateFlagsCandidatura as updateFlagsCandidaturaMutation } from '../CandidaturaGraphQL';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';

export const NavigationButtons = ({
  formDataset,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  isFormValid,
  isFormDirty,
  idUtente,
  stepCandidate,
}) => {
  const [flagsCandidatura, updateFlagsCandidatura] = useGraphQLRequest(
    undefined,
    updateFlagsCandidaturaMutation
  );

  /**
   * Gets the callback triggering the data saving.
   */
  const getDataSavingCallback = () => {
    const {
      candTata: { checked: tata },
      candColf: { checked: colf },
      candBadante: { checked: badante },
    } = formDataset;

    if (!isFormDirty) {
      return () => Promise.resolve({ tata, colf, badante });
    }

    return () => updateFlagsCandidatura({
      idUtente,
      flags: { tata, colf, badante },
    });
  };

  /**
   * Save the new set of flags and return them as output.
   */
  const saveFlags = () => {
    const dataSavingCallback = getDataSavingCallback();
    return dataSavingCallback();
  };

  /**
   * The handler when clicking the next button.
   */
  const onMoveNext = () => {
    saveFlags().then(newFlags => moveToNextStep(newFlags, isFormValid));
  };

  /**
   * The handler when clicking the next button.
   */
  const onMoveBack = () => {
    saveFlags().then(newFlags => moveToPrevStep(newFlags, isFormValid));
  };

  /**
   * The handler for changes to the step candidate.
   * @param {*} step
   */
  const onStepCandidateChange = step => {
    changeStep(step, isFormValid, getDataSavingCallback());
  };

  // Listen to changes to the step candidate.
  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    saveFlags(),
    isNullOrUndefined(idOperatore)
  );

  return (
    <ButtonsNavigation
      onMoveNext={onMoveNext}
      onMoveBack={onMoveBack}
      moveNextDisabled={!isFormValid || flagsCandidatura.isLoading}
    />
  );
};

NavigationButtons.displayName = 'NavigationButtons';

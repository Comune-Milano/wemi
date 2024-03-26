
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { connect } from 'react-redux';
import { colors } from 'theme';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getBackendStepStatus, getClientStepStatus } from 'services/TCB/tcbStepConverter';
import Loader from 'components/ui2/Loader';
import Stepper from 'components/ui2/Header/Stepper';
import useWindowSize from 'hooks/useWindowSize';
import { withRouter } from 'react-router';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { isFunction } from 'utils/functions/typeCheckers';
import {
  aggiornaStepsLavoratoreTCBQuery,
  estraiStepsLavoratoreTCBQuery,
} from './graphQLRequests/graphQLRequests';
import MenuNavigazione from './partials/MenuNavigazione';
import {
  DEFAULT_NAVIGATION_STEPS,
  NAVIGATION_STEPS_TYPE_CODE,
  NAVIGATION_STEPS_TYPE_DATI_GENERALI,
  NAVIGATION_STEPS_TYPE_TATA,
  NAVIGATION_STEPS_TYPE_COLF,
  NAVIGATION_STEPS_TYPE_BADANTE,
} from './constants/DefaultNavigationSteps';
import {
  getRedirectStepIndex,
  getNextStep,
  getPrevStep,
} from './services/stepper';
import EsperienzeLavoratore from './EsperienzeLavoratore';
import Anagrafica from './Anagrafica';
import StatoOccupazionale from './StatoOccupazionale';
import IstruzioneFormazione from './IstruzioneFormazione';
import DatiPersonali from './DatiPersonali';
import CompetenzeBabySitter from './CompetenzeBabySitter';
import CompetenzeColf from './CompetenzeColf';
import CompetenzeBadante from './CompetenzeBadante';
import DisponibilitaTata from './DisponibilitaTata';
import DisponibilitaColf from './DisponibilitaColf';
import DisponibilitaBadante from './DisponibilitaBadante';

const ContentColumn = styled(Column)`
  padding-top: 1.5em;
  ${media.lg`
      padding-right: 3em;
      padding-top: 0em;
      border-right: 2px solid ${colors.grey};
  `}
`;

const NavigationColumn = styled(Column)`
  padding-bottom: 1.5em;
  border-bottom: 2px solid ${colors.grey};
  ${media.lg`
      padding-left: 3em;
      padding-bottom: 0em;
      border-bottom: none;
  `}
`;

const CandidaturaLavoratoreTCB = ({
  idOperatore,
  userInfo,
  history,
  locale,
}) => {
  /**
   * The state of (stepper) navigation tabs.
   */
  const [navigationTabs, setNavigationTabs] = useState([]);

  /**
   * The next step candidate. The setter should be called
   * every time we want to change the step outside of
   * the context of active step.
   */
  const [stepCandidate, setStepCandidate] = useState();

  /**
   * The index of the active step.
   */
  const activeStepIndex = useRef(0);

  /**
   * A flag telling whether there is a pending step transition or not.
   */
  const [stepTransitionPending, setStepTransitionPending] = useState(false);

  /**
   * The remote call to update the state of stepper.
   */
  const performStepsStatusUpdate = useStatelessGraphQLRequest(
    aggiornaStepsLavoratoreTCBQuery,
    undefined,
    res => {
      const {
        fg_candidatura_tata,
        fg_candidatura_colf,
        fg_candidatura_badante,
        ...rest
      } = res;
      return {
        steps: rest,
        flags: {
          tata: fg_candidatura_tata,
          colf: fg_candidatura_colf,
          badante: fg_candidatura_badante,
        },
      };
    }
  );

  const [statusSteps, setStatusSteps] = React.useState();

  /**
   * The remote call to get the state of stepper.
   */
  const [stepsStatus] = useGraphQLRequest(
    undefined,
    estraiStepsLavoratoreTCBQuery,
    { idUtenteLav: userInfo.idLavoratore },
    true,
    res => {
      const {
        isLavoratoreAssociato,
        fg_candidatura_tata,
        fg_candidatura_colf,
        fg_candidatura_badante,
        ...rest
      } = res;
      return {
        isLavoratoreAssociato,
        steps: rest,
        flags: {
          tata: fg_candidatura_tata,
          colf: fg_candidatura_colf,
          badante: fg_candidatura_badante,
        },
      };
    }
  );

  /**
   * Patches the step candidate.
   * @param {*} step
   */
  const updateStepCandidate = step => {
    // Do nothing if there is a pending transition.
    if (stepTransitionPending) {
      return;
    }
    setStepCandidate(step);
  };

  /**
   * Maps the steps status of the backend in a local shape.
   * @param {*} stepsStatusData
   */
  const getUpdatedStepsStatus = (stepsStatusData) => {
    const { steps, flags } = stepsStatusData;

    const stepActive = getStepActive(stepsStatusData);
    const navSteps = DEFAULT_NAVIGATION_STEPS.slice();

    if (NAVIGATION_STEPS_TYPE_DATI_GENERALI.includes(stepActive.code)) {
      navSteps.forEach(el => {
        el.hide = el && !NAVIGATION_STEPS_TYPE_DATI_GENERALI.includes(el.code);
      });
    } else if (NAVIGATION_STEPS_TYPE_TATA.includes(stepActive.code)) {
      navSteps.forEach(el => {
        el.hide = el && !NAVIGATION_STEPS_TYPE_TATA.includes(el.code);
      });
    } else if (NAVIGATION_STEPS_TYPE_COLF.includes(stepActive.code)) {
      navSteps.forEach(el => {
        el.hide = el && !NAVIGATION_STEPS_TYPE_COLF.includes(el.code);
      });
    } else if (NAVIGATION_STEPS_TYPE_BADANTE.includes(stepActive.code)) {
      navSteps.forEach(el => {
        el.hide = el && !NAVIGATION_STEPS_TYPE_BADANTE.includes(el.code);
      });
    }

    const newStoredNavigationTabs = navSteps.map((defaultStep, index) => {
      const stepIdentifier = `cd_stato_pag_${defaultStep.code}`;
      const stepCode = parseInt(steps[stepIdentifier], 10);
      const stepStatus = getClientStepStatus(stepCode);

      let visited = typeof stepStatus.visited === 'boolean' ? stepStatus.visited : defaultStep.visited;
      let valid = typeof stepStatus.valid === 'boolean' ? stepStatus.valid : defaultStep.valid;
      let { disabled } = defaultStep;

      const checkVisitedDeps = defaultStep.visitedDeps &&
        defaultStep.visitedDeps.some(el => {
          const relatedStepIdentifier = `cd_stato_pag_${el}`;
          const relatedStepCode = parseInt(steps[relatedStepIdentifier], 10);
          const relatedStepStatus = getClientStepStatus(relatedStepCode);
          return relatedStepStatus.visited;
        });
      const checkValidDeps = defaultStep.validDeps &&
        defaultStep.validDeps.every(el => {
          const relatedStepIdentifier = `cd_stato_pag_${el}`;
          const relatedStepCode = parseInt(steps[relatedStepIdentifier], 10);
          const relatedStepStatus = getClientStepStatus(relatedStepCode);
          return relatedStepStatus.valid;
        });

      if (checkVisitedDeps) {
        visited = true;
      }
      if (checkValidDeps) {
        valid = true;
      }

      if (stepStatus.active) {
        activeStepIndex.current = index;

        if (NAVIGATION_STEPS_TYPE_DATI_GENERALI.includes(defaultStep.code) && !stepHeaderActive.datiGenerali) {
          setStepHeaderActive({ datiGenerali: true });
          setStepsHeaderFn(0);
        } else if (NAVIGATION_STEPS_TYPE_TATA.includes(defaultStep.code) && !stepHeaderActive.tata) {
          setStepHeaderActive({ tata: true });
          setStepsHeaderFn(1);
        } else if (NAVIGATION_STEPS_TYPE_COLF.includes(defaultStep.code) && !stepHeaderActive.colf) {
          setStepHeaderActive({ colf: true });
          setStepsHeaderFn(2);
        } else if (NAVIGATION_STEPS_TYPE_BADANTE.includes(defaultStep.code) && !stepHeaderActive.badante) {
          setStepHeaderActive({ badante: true });
          setStepsHeaderFn(3);
        }
      }

      if (flags.tata !== 1 && NAVIGATION_STEPS_TYPE_CODE.disponibilitaTata === defaultStep.code) {
        disabled = true;
      } else if (flags.tata === 1) {
        disabled = false;
      }

      if (flags.colf !== 1 && NAVIGATION_STEPS_TYPE_CODE.disponibilitaColf === defaultStep.code) {
        disabled = true;
      } else if (flags.colf === 1) {
        disabled = false;
      }

      if (flags.badante !== 1 && (
        NAVIGATION_STEPS_TYPE_CODE.disponibilitaBadante === defaultStep.code)) {
        disabled = true;
      } else if (flags.badante === 1) {
        disabled = false;
      }

      return ({ ...defaultStep, ...stepStatus, visited, valid, disabled });
    });

    return newStoredNavigationTabs;
  };

  const getStepActive = (stepsStatusData) => {
    const { steps } = stepsStatusData;
    const navSteps = DEFAULT_NAVIGATION_STEPS.slice();

    return navSteps.map((defaultStep) => {
      const stepIdentifier = `cd_stato_pag_${defaultStep.code}`;
      const stepCode = parseInt(steps[stepIdentifier], 10);
      const stepStatus = getClientStepStatus(stepCode);
      return ({ ...defaultStep, ...stepStatus });
    }).find(el => el.active);
  };

  /**
   * Changes the active step.
   * @param {*} stepIndex The index of the new step.
   * @param {*} validity The validity status of the step.
   * @param {*} persistStepData An optional callback to run in
   * order to persist the data associated with the active step.
   */
  const persistTabs = (
    newNavigationTabs,
    persistStepData = () => Promise.resolve()
  ) => persistStepData().then(() => {
    const newStepsStatus = newNavigationTabs.reduce(
        (accumulator, step) => {
          accumulator[`cd_stato_pag_${step.code}`] = getBackendStepStatus(step);
          return accumulator;
        },
        {}
      );
    return performStepsStatusUpdate({
      idUtenteLav: userInfo.idLavoratore,
      steps: newStepsStatus,
    });
  });

 /**
  * Validate the step, trigger the save callback of the step and change the actual step.
  * @param {object[]} currentSteps the steps of the request tcb.
  * @param {number} stepIndex the index of the next step.
  * @param {Function} validationCallback The validation callback of the step.
  * @param {Function} persistStepData The callback to persist the data related to the active step.
  */
  const changeStep = (
    currentSteps,
    stepIndex,
    validationCallback,
    persistStepData = () => Promise.resolve()
  ) => {
    if (stepTransitionPending || !Number.isFinite(stepIndex)) {
      return;
    }

    const isIndexOutOfRange = stepIndex < 0 || stepIndex > (currentSteps.length - 1);
    if (isIndexOutOfRange) {
      return;
    }

    const redirectStepIndex = getRedirectStepIndex(stepIndex);
    if (redirectStepIndex === activeStepIndex.current) {
      return;
    }

    if (!isFunction(validationCallback)) {
      return;
    }
    // Validating the step syncronously
    const validationErrors = validationCallback();
    const hasValidationErrors = Object.values(validationErrors).length > 0;
    const validity = !hasValidationErrors;

    // A step transition is pending, marks as it is.
    setStepTransitionPending(true);
    // The new state of navigation tabs. It is persisted on the client
    // side once the needed backend calls complete successfully.
    const newNavigationTabs = currentSteps.map((stepValue, index) => ({
      ...stepValue,
      valid: stepValue.active ? validity : stepValue.valid,
      visited: stepValue.active ? true : stepValue.visited,
      active: redirectStepIndex === index,
    }));
    // Runs the callback to save step data.
    persistTabs(newNavigationTabs, persistStepData).then((stepsStatusData) => {
      const storedNavigationTabs = getUpdatedStepsStatus(stepsStatusData);
      setNavigationTabs(storedNavigationTabs);
      setStatusSteps(stepsStatusData);
      activeStepIndex.current = redirectStepIndex;
    })
      // Finally marks transition as completed.
      .finally(() => {
        setStepTransitionPending(false);
        setStepCandidate(undefined);
        // window.scrollTo(0, 0);
      });
  };

  /**
   * Changes the step starting from the current nav tabs status.
   * @param {number} stepIndex the index of the next step.
   * @param {Function} validationCallback The validation callback of the step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   */
  const changeStepFromLatestNavTabs = (
    stepIndex,
    validationCallback,
    persistStepData = () => Promise.resolve()
  ) => {
    changeStep(
      navigationTabs.slice(),
      stepIndex,
      validationCallback,
      persistStepData
    );
  };

  /**
   * Save the current step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   * @param {boolean} shouldNavigateBack a boolean to go back.
   */
  const saveCurrentStep = async (
    persistStepData = () => Promise.resolve(),
    shouldNavigateBack = false,
  ) => {
    await persistStepData();
    window.scrollTo(0, 0);
    if (shouldNavigateBack) {
      history.goBack();
    }
  };

  /**
   * Saves the step and tab status.
   * @param {Function} validationCallback The validation callback of the step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   */
  const saveStepAndTabsStatus = (
    validationCallback,
    persistStepData = () => Promise.resolve()
  ) => {
    const copiedSteps = navigationTabs.slice();

    if (!isFunction(validationCallback)) {
      return;
    }
    // Validate the step
    const validationErrors = validationCallback();
    const hasValidationErrors = Object.values(validationErrors).length > 0;
    const validity = !hasValidationErrors;

    const newNavigationTabs = copiedSteps.map((stepValue) => ({
      ...stepValue,
      valid: stepValue.active ? validity : stepValue.valid,
      visited: stepValue.active ? true : stepValue.visited,
      active: stepValue.active,
    }));
    persistTabs(newNavigationTabs, persistStepData);
    setNavigationTabs(newNavigationTabs);
  };
  /**
   * Moves to the next available step.
   * @param {Function} validationCallback The callback to validate the step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   */
  const moveToNextStep = (
    validationCallback,
    persistStepData = () => Promise.resolve()
  ) => {
    const copiedSteps = navigationTabs.slice();
    const nextStep = getNextStep(copiedSteps, activeStepIndex.current);

    changeStep(copiedSteps, nextStep, validationCallback, persistStepData);
  };

  /**
   * Moves to the previous step.
   * @param {Function} validationCallback The validitation callback for the step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   */
  const moveToPrevStep = (
    validationCallback,
    persistStepData = () => Promise.resolve()
  ) => {
    const copiedSteps = navigationTabs.slice();
    let prevStep = getPrevStep(copiedSteps, activeStepIndex.current);
    copiedSteps.forEach((defaultStep, index) => {
      if (!statusSteps?.flags?.tata && NAVIGATION_STEPS_TYPE_CODE.disponibilitaTata === defaultStep.code && prevStep === index) {
        prevStep -= 1;
      }
      if (!statusSteps?.flags?.colf && NAVIGATION_STEPS_TYPE_CODE.disponibilitaColf === defaultStep.code && prevStep === index) {
        prevStep -= 1;
      }
    });

    changeStep(copiedSteps, prevStep, validationCallback, persistStepData);
  };

  /**
   * Initializes the navigation tabs.
   */
  useEffect(
    () => {
      if (stepsStatus.pristine || stepsStatus.isLoading || stepsStatus.errored || stepTransitionPending || stepCandidate) {
        return;
      }
      const stepsStatusData = stepsStatus.data || {};
      const storedNavigationTabs = getUpdatedStepsStatus(stepsStatusData);
      setNavigationTabs(storedNavigationTabs);
      setStatusSteps(stepsStatusData);
    },
    [stepsStatus]
  );

  // Tells if the component should skip the rendering.
  const cannotRender = (stepsStatus.pristine || stepsStatus.errored);

  const setStepsHeaderFn = (stepIndex) => {
    const dataCopy = steps.map(el => ({ ...el }));
    dataCopy.forEach((el, index) => { el.active = index === stepIndex; });
    setSteps(dataCopy);
  };

  const [steps, setSteps] = useState([
    {
      title: 'Inserisci i tuoi dati',
      color: 'primary',
      link: null,
      active: false,
      onClickStepHandler: stepIndex => {
        setStepHeaderActive({ datiGenerali: true });
        setStepsHeaderFn(stepIndex);

        if (stepTransitionPending) {
          return;
        }
        updateStepCandidate(0);
      },
    },
    {
      title: 'Candidati come baby-sitter',
      color: 'orange',
      link: null,
      active: false,
      onClickStepHandler: stepIndex => {
        setStepHeaderActive({ tata: true });
        setStepsHeaderFn(stepIndex);

        if (stepTransitionPending) {
          return;
        }
        updateStepCandidate(5);
      },
    },
    {
      title: 'Candidati come colf',
      color: 'green',
      link: null,
      active: false,
      onClickStepHandler: stepIndex => {
        setStepHeaderActive({ colf: true });
        setStepsHeaderFn(stepIndex);

        if (stepTransitionPending) {
          return;
        }
        updateStepCandidate(7);
      },
    },
    {
      title: 'Candidati come badante',
      color: 'purple',
      link: null,
      active: false,
      onClickStepHandler: stepIndex => {
        setStepHeaderActive({ badante: true });
        setStepsHeaderFn(stepIndex);

        if (stepTransitionPending) {
          return;
        }
        updateStepCandidate(9);
      },
    },
  ]);

  const [stepHeaderActive, setStepHeaderActive] = useState({
    datiGenerali: false,
    tata: false,
    colf: false,
    badante: false,
  });

  const [openModalSummary, setOpenModalSummary] = React.useState(false);

  const windowSize = useWindowSize();
  const windowSizesLarge = ['lg', 'xl', 'xxl', 'xxxl'];

  // Render nothing till the steps status fetching is not started.
  if (cannotRender) {
    return null;
  }

  // Tells if the component is in a loading status.
  const { isLoading } = stepsStatus;

  // Wait for loading steps status.
  if (isLoading) {
    return <Loader />;
  }

  const isLastStep = activeStepIndex.current === navigationTabs.length - 1;

  const isLavoratoreAssociato = getObjectValue(stepsStatus, 'data.isLavoratoreAssociato', false);

  return (
    <>
      <Stepper steps={steps} />
      <Row fluid justifycontent="space-between">
        { windowSizesLarge.indexOf(windowSize) === -1 ? (
          <NavigationColumn
            xs="12"
            lg="4"
            padding="0"
            order={{ lg: 2 }}
            tagName="aside"
          >
            <MenuNavigazione
              isLavoratoreAssociato={isLavoratoreAssociato}
              navigationTabs={navigationTabs}
              onStepChange={updateStepCandidate}
              idOperatore={idOperatore}
              idLavoratore={parseInt(userInfo.idLavoratore, 10)}
              locale={locale}
              openModalSummary={openModalSummary}
              setOpenModalSummary={setOpenModalSummary}
            />
          </NavigationColumn>
        ) : null}
        <ContentColumn
          xs="12"
          lg="8"
          padding="0"
          order={{ lg: 1 }}
          tagName="section"
        >
          {/** STEPS */}
          <div id="startOfTCBCandidacy" role="none"></div>
          {navigationTabs.map((el, index) => {
            if (el.active) {
              switch (el.code) {
                case NAVIGATION_STEPS_TYPE_CODE.anagrafica:
                  return (
                    <Anagrafica
                      key={index.toString()}
                      idOperatore={idOperatore}
                      userInfo={userInfo}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      locale={locale}
                      stepCandidate={stepCandidate}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.statoOccupazionale:
                  return (
                    <StatoOccupazionale
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.istruzione:
                  return (
                    <IstruzioneFormazione
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.esperienzeLavoratore:
                  return (
                    <EsperienzeLavoratore
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      locale={locale}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      stepCandidate={stepCandidate}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.informazioniPersonali:
                  return (
                    <DatiPersonali
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.competenzeTata:
                  return (
                    <CompetenzeBabySitter
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}
                      navigationTabs={navigationTabs}
                      setNavigationTabs={setNavigationTabs}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.disponibilitaTata:
                  return (
                    <DisponibilitaTata
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={!isLastStep ? moveToNextStep : undefined}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}
                      navigationTabs={navigationTabs}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.competenzeColf:
                  return (
                    <CompetenzeColf
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}
                      navigationTabs={navigationTabs}
                      setNavigationTabs={setNavigationTabs}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.disponibilitaColf:
                  return (
                    <DisponibilitaColf
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={!isLastStep ? moveToNextStep : undefined}
                      moveToPrevStep={moveToPrevStep}
                      locale={locale}
                      stepCandidate={stepCandidate}
                      navigationTabs={navigationTabs}

                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.competenzeBadante:
                  return (
                    <CompetenzeBadante
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={moveToNextStep}
                      moveToPrevStep={moveToPrevStep}
                      saveStepAndTabsStatus={saveStepAndTabsStatus}
                      locale={locale}
                      stepCandidate={stepCandidate}
                      navigationTabs={navigationTabs}
                      setNavigationTabs={setNavigationTabs}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.disponibilitaBadante:
                  return (
                    <DisponibilitaBadante
                      key={index.toString()}
                      idOperatore={idOperatore}
                      idLavoratore={parseInt(userInfo.idLavoratore, 10)}
                      changeStep={changeStepFromLatestNavTabs}
                      moveToNextStep={!isLastStep ? moveToNextStep : undefined}
                      moveToPrevStep={moveToPrevStep}
                      saveCurrentStep={isLastStep ? saveCurrentStep : undefined}
                      locale={locale}
                      stepCandidate={stepCandidate}
                      navigationTabs={navigationTabs}
                    />
                  );
                default:
                  break;
              }
            }

            return null;
          })}
        </ContentColumn>
        { windowSizesLarge.indexOf(windowSize) >= 0 ? (
          <NavigationColumn
            xs="12"
            lg="4"
            padding="0"
            order={{ lg: 2 }}
            tagName="aside"
          >
            <MenuNavigazione
              isSticky
              isLavoratoreAssociato={isLavoratoreAssociato}
              navigationTabs={navigationTabs}
              onStepChange={updateStepCandidate}
              idOperatore={idOperatore}
              idLavoratore={parseInt(userInfo.idLavoratore, 10)}
              locale={locale}
              openModalSummary={openModalSummary} 
              setOpenModalSummary={setOpenModalSummary}
            />
          </NavigationColumn>
        ) : null}
      </Row>
    </>
  );
};

CandidaturaLavoratoreTCB.displayName = 'CandidaturaLavoratoreTCB';

const mapStoreToProps = store => ({ locale: store.locale });

export default connect(mapStoreToProps)(
  withRouter(CandidaturaLavoratoreTCB)
);

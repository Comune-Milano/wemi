import React, { useState, useEffect, useRef } from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Column, Row } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { getIdServizio } from 'utils/functions/getIdServizio';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import minPrice from 'components/navigation/RichiestaServizioTCB/partials/utils/minPrice';
import useWindowSize from 'hooks/useWindowSize';
import moment from 'moment';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { getBackendStepStatus } from 'services/TCB/tcbStepConverter';
import checkLavoratore from 'utils/functions/checkLavoratore';
import { generatePath, withRouter } from 'react-router';
import checkAdmin from 'utils/functions/checkAdmin';
import { PAGE_TCB_ADMIN_ERI_001, PAGE_REQUESTSINDEX_URL } from 'types/url';
import checkCittadino from 'utils/functions/checkCittadino';
import { useLogger } from 'services/Logger';
import Loader from 'components/ui2/Loader';
import { connect } from 'react-redux';
import { OpenModal } from 'redux-modules/actions/openModalInserimento';
import { isFunction } from 'utils/functions/typeCheckers';
import { MenuNavigazione } from './partials';
import {
  AggiornaDatiStepTCB as AggiornaDatiStepTCBQ,
  InviaRichiestaImpersonificazione,
  EstraiImportoDomandaTCB as EstraiImportoDomandaTCBQ,
  InviaRichiestaTCB as InviaRichiestaTCBQ,
} from './partials/ConfigurazioneRichiestaGraphQL';
import { estraiAttributiDomanda as estraiAttributiDomandaQ,
   estraiLivelliContrattuali as estraiLivelliContrattualiQ,
} from './estraiAttributiGraphql';
import { cdAttributo } from './CodiciAttributi';
import CuraDellePersone from './CuraDellePersone';
import CuraDellaCasa from './CuraDellaCasa';
import CuraDegliAnimali from './CuraDegliAnimali';
import DisponibilitaRichiesta from './DisponibilitaRichiesta';
import PreferenzeSulLavoratore from './PreferenzeSulLavoratore';
import SedeLavoroEContatti from './SedeLavoroEContatti';
import { getNextStep, getPrevStep } from './stepper';
import Beneficiari from './Beneficiari';
import { NAVIGATION_STEPS_TYPE_CODE } from './DefaultNavigationSteps';

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

const ConfigurazioneRichiestaTCB = ({
  userProfile,
  servizioTCB,
  datiStepTCB,
  locale,
  idRichiestaTcb,
  idAdmin,
  history,
  isAdmin,
  OpenModal,
}) => {
  const { datiLogin } = userProfile;

  /**
   * Gestione chiamate per ottenere i domini e gli attributi di contesto,
   * necessari per calcolare il prezzo base del servizio
   */
  const [livelliContrattuali] = useGraphQLRequest(
    [],
    estraiLivelliContrattualiQ(getIdServizio(servizioTCB.cd_dominio_tcb), moment().year()),
    null,
    true
  );

  const [attributiDomanda, getAttributiDomanda] = useGraphQLRequest(
    undefined,
    estraiAttributiDomandaQ,
    {
      idRichiestaTcb,
      arrayConfig: [
        cdAttributo.CD_ORARIO_LAVORO,
        cdAttributo.CD_LIVELLO_CONTRATTUALE,
        cdAttributo.CD_TIPOLOGIA_ASSUNZIONE,
      ],
    },
    true
  );

  const loaded = !livelliContrattuali.pristine && !livelliContrattuali.isLoading &&
    !attributiDomanda.pristine && !attributiDomanda.isLoading;

  const attributes = (!attributiDomanda.pristine && !attributiDomanda.isLoading) ? {
    orario: {
      id: attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO) ?
        getObjectValue(attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO), 'cd_val_attributo', null)
        : null,
      label: attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO) ?
        getObjectValue(attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_ORARIO_LAVORO), `tl_valore_testuale.${locale}`, null)
        : null,
    },
    contratto: {
      id: attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_LIVELLO_CONTRATTUALE) ?
        getObjectValue(attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_LIVELLO_CONTRATTUALE), 'cd_val_attributo', null)
        : null,
    },
    tipologiaAssunzione: {
      id: attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE) ?
        getObjectValue(attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE), 'cd_val_attributo', null)
        : 1,
      label: attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE) ?
        getObjectValue(attributiDomanda.data.find(el => el.cd_attributo === cdAttributo.CD_TIPOLOGIA_ASSUNZIONE), `tl_valore_testuale.${locale}`, null)
        : null,
    },
  } : null;

  const price = loaded ? minPrice(attributes.tipologiaAssunzione.id, livelliContrattuali.data.estraiConfigurazioniLivelliContrattuali, attributes.orario.id, attributes.contratto.id) : null;


  /**
  * Gestione dello stato degli steps
  */
  const readStepsData = (defaulSteps) => {
    const outputSteps = [];
    defaulSteps.forEach((step, index) => {
      switch (parseInt(datiStepTCB[`cd_stato_pag_${step.code}`], 10)) {
        case 1:
          outputSteps.push({
            ...step,
            valid: false,
            visited: true,
            active: false,
          });
          break;
        case 2:
          outputSteps.push({
            ...step,
            valid: true,
            visited: true,
            active: false,
          });
          break;
        case 3:
          activeStepIndex.current = index;
          outputSteps.push({
            ...step,
            valid: false,
            visited: true,
            active: true,
          });
          break;
        case 4:
          activeStepIndex.current = index;
          outputSteps.push({
            ...step,
            visited: true,
            active: true,
            valid: true,
          });
          break;
        default:
          outputSteps.push(step);
          break;
      }
      if (step.active) {
        activeStepIndex.current = index;
      }
    });
    return outputSteps;
  };

  const deafultSteps = [
    {
      code: 'beneficiario',
      title: servizioTCB.cd_dominio_tcb === 3 ? 'Persone da assistere' : 'Bambini da accudire',
      hide: !(servizioTCB.cd_dominio_tcb === 3 || servizioTCB.cd_dominio_tcb === 1),
      valid: false,
      visited: false,
      active: (servizioTCB.cd_dominio_tcb === 3 || servizioTCB.cd_dominio_tcb === 1),
    },
    {
      code: 'mansioni',
      title: servizioTCB.cd_dominio_tcb === 3 ? 'Cura della persona' : 'Cura dei bambini',
      hide: !(servizioTCB.cd_dominio_tcb === 3 || servizioTCB.cd_dominio_tcb === 1),
      valid: false,
      visited: false,
      active: false,
    },
    {
      code: 'casa',
      title: 'Cura della casa',
      valid: false,
      visited: false,
      active: (servizioTCB.cd_dominio_tcb === 2),
    },
    {
      code: 'animali',
      title: 'Cura degli animali',
      valid: false,
      visited: false,
      active: false,
    },
    {
      code: 'disponibilita',
      title: 'Disponibilità richiesta',
      valid: false,
      visited: false,
      active: false,
    },
    {
      code: 'preferenzelav',
      title: 'Preferenze sul lavoratore',
      valid: false,
      visited: false,
      active: false,
    },
    {
      code: 'sedelavoro',
      title: 'Sede di lavoro e contatti',
      valid: false,
      visited: false,
      active: false,
    },
  ];

  const activeStepIndex = useRef(0);

  const [navigationTabs, setNavigationTabs] = useState(
    deafultSteps
  );

  /**
   * useEffect to set the defaultSteps at the start of the component
   */

  useEffect(() => {
    const steps = readStepsData(deafultSteps);
    setNavigationTabs(steps);
  }, []);

  const aggiornaDatiStep = useStatelessGraphQLRequest(
    AggiornaDatiStepTCBQ,
  );

  const [transitionPending, setTransitionPending] = useState(false);
  const [stepDomanda, setStepDomanda] = useState();
  const [stepCheckValidity, setCheckValidity] = useState(false);
  const [loading, setLoading] = useState(false);

  const persistStepData = (
    newNavigationTabs,
    persistStep = Promise.resolve(),
  ) => persistStep().then(async () => {
    const newStepsStatus = newNavigationTabs.reduce(
      (accumulator, step) => {
        accumulator[`cd_stato_pag_${step.code}`] = getBackendStepStatus(step);
        return accumulator;
      },
      {}
    );
    await aggiornaDatiStep({
      steps: newStepsStatus,
      idRichiesta: idRichiestaTcb,
    });
    return newNavigationTabs;
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
    stepCallback = () => Promise.resolve()
  ) => {
    if (transitionPending || !Number.isFinite(stepIndex)) {
      return;
    }

    const isIndexOutOfRange = stepIndex < 0 || stepIndex > (currentSteps.length - 1);
    if (isIndexOutOfRange) {
      return;
    }

    if (!isFunction(validationCallback)) {
      return;
    }
    // Verify the errors and the validation of the step syncronously
    const validationErrors = validationCallback() || {};
    const hasValidationErrors = Object.values(validationErrors).length > 0;
    const validity = !hasValidationErrors;

    // A step transition is pending, marks as it is.
    setTransitionPending(true);
    // The new state of navigation tabs. It is persisted on the client
    // side once the needed backend calls complete successfully.
    const newNavigationTabs = currentSteps.map((stepValue, index) => ({
      ...stepValue,
      valid: stepValue.active ? validity : stepValue.valid,
      visited: stepValue.active ? true : stepValue.visited,
      active: stepIndex === index,
    }));
    // const stepRequestCallback = validity ? stepCallback : () => Promise.resolve();
    persistStepData(newNavigationTabs, stepCallback).then((stepsStatusData) => {
      setNavigationTabs(stepsStatusData);
      activeStepIndex.current = stepIndex;
    })
      // Finally marks transition as completed.
      .finally(() => {
        setTransitionPending(false);
        setStepDomanda(undefined);
        // window.scrollTo(0, 0);
      });
  };


  /**
  * Moves to the next available step.
  * @param {Function} validationCallback The validation callback of the step.
  * @param {Function} persistStepData The callback to persist the data related to the active step.
  */
  const moveNext = (
    validationCallback,
    stepCallback = () => Promise.resolve()
  ) => {
    const copiedSteps = navigationTabs.slice();
    const nextStep = getNextStep(copiedSteps, activeStepIndex.current);
    changeStep(copiedSteps, nextStep, validationCallback, stepCallback);
  };

  /**
   * Moves to the previous step.
   * @param {Function} validationCallback The validation callback of the step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   */
  const moveBack = (
    validationCallback,
    stepCallback = () => Promise.resolve()
  ) => {
    const copiedSteps = navigationTabs.slice();
    const prevStep = getPrevStep(copiedSteps, activeStepIndex.current);

    changeStep(copiedSteps, prevStep, validationCallback, stepCallback);
  };
  /**
   * Update the step status.
   * @param {number} stepIndex The index of the step.
   * @param {Function} validationCallback The validation callback of the step.
   * @param {Function} persistStepData The callback to persist the data related to the active step.
   */
  const updateStepsStatus = (
    stepIndex,
    validationCallback,
    stepCallback = () => Promise.resolve()
  ) => {
    const copiedSteps = navigationTabs.slice();

    changeStep(copiedSteps, stepIndex, validationCallback, stepCallback);
  };

  const estraiPrezzo = useStatelessGraphQLRequest(EstraiImportoDomandaTCBQ);
  const inviaTCB = useStatelessGraphQLRequest(
    InviaRichiestaTCBQ,
  );
  const inviaImpersonificazione = useStatelessGraphQLRequest(
    InviaRichiestaImpersonificazione,
  );
  const logger = useLogger();

  const estraiPrice = async () => estraiPrezzo({
    idRichiestaTcb,
    arrCdAttributi: [
      cdAttributo.IM_STIPENDIO_A_CONVIVENZA_RIDOTTA,
      cdAttributo.IM_STIPENDIO_ASSISTENZA_NOTTURNA,
      cdAttributo.IM_STIPENDIO_CONVIVENTE,
      cdAttributo.IM_STIPENDIO_NON_CONVIVENTE,
      cdAttributo.IM_STIPENDIO_PRESENZA_NOTTURNA,
      cdAttributo.IM_STIPENDIO_WEEKEND,
    ],
  }).then(res => res.dc_val);

  const sendRequestTCB = async (
    validationCallback,
    persistCallback,
  ) => {
    const validita = await onChangeValidation(validationCallback, persistCallback);

    if (validita) {
      const { datiLogin: loginData } = userProfile;
      setLoading(true);
      try {
        const prezzo = await estraiPrice();
        const sendRequest = callbackToCall();
        await sendRequest({
          idRichiestaTCB: idRichiestaTcb,
          idUtente: loginData && !isAdmin ? loginData.idCittadino : null,
          costoTCB: parseFloat(prezzo),
        });
      } catch (error) {
        logger.log("Errore nell' inserimento della richiesta");
      }
      setLoading(false);
      OpenModal({ open: true, nomeServizio: servizioTCB.tl_valore_testuale[locale] });
      return redirect();
    }
    return setCheckValidity(false);
  };

  const onChangeValidation = async (
    validationCallback = () => true,
    persistCallback = () => Promise.resolve(),
  ) => {
    const copiedSteps = navigationTabs.slice();
    if (!isFunction(validationCallback)) {
      return false;
    }
    // Verify the errors and the validation of the step
    const validationErrors = validationCallback();
    const hasValidationErrors = Object.values(validationErrors).length > 0;
    const validita = !hasValidationErrors;
    await changeStep(copiedSteps, activeStepIndex.current, validationCallback, persistCallback);
    return validita;
  };

  const callbackToCall = () => {
    if (isAdmin) {
      return inviaImpersonificazione;
    }
    return inviaTCB;
  };
  const redirect = () => {
    const { datiLogin } = userProfile;
    if (idAdmin) {
      const generatedPath = generatePath(PAGE_TCB_ADMIN_ERI_001, {
        idOperatore: idAdmin,
      });
      history.push(generatedPath);
    } else if (checkAdmin(datiLogin)) {
      const generatedPath = generatePath(PAGE_TCB_ADMIN_ERI_001, {
        idOperatore: datiLogin.idCittadino,
      });
      history.push(generatedPath);
    } else if (checkCittadino(datiLogin) || checkLavoratore(datiLogin)) {
      history.push(PAGE_REQUESTSINDEX_URL);
    }
  };

  const [openSummary, setOpenSummary] = useState(false);

  const windowSize = useWindowSize();
  const windowSizesLarge = ['lg', 'xl', 'xxl', 'xxxl'];

  return (
    <>
      {loading && <Loader overlay />}
      <Row fluid justifycontent="space-between">
        {windowSizesLarge.indexOf(windowSize) === -1 ? (
          <NavigationColumn
            xs="12"
            lg="4"
            padding="0"
            order={{ lg: 2 }}
            tagName="aside"
          >
            <MenuNavigazione
              locale={locale}
              idAdmin={idAdmin}
              openSummary={openSummary}
              idRichiestaTcb={idRichiestaTcb}
              servizioTCB={servizioTCB}
              moveToStep={setStepDomanda}
              setOpenSummary={setOpenSummary}
              setCheckValidity={setCheckValidity}
              navigationTabs={navigationTabs}
              DatiLogin={datiLogin}
              price={price}
              getAttributiDomanda={getAttributiDomanda}
              attributes={attributes}
              livelliContrattuali={livelliContrattuali}
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
          <div id="startOfTCBPage" role="none"></div>
          {navigationTabs.map((el) => {
            if (el.active) {
              switch (el.code) {
                case NAVIGATION_STEPS_TYPE_CODE.beneficiario:
                  return (
                    <Beneficiari
                      key={el.code}
                      locale={locale}
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      moveNext={moveNext}
                      moveBack={null}
                      changeStep={updateStepsStatus}
                      stepDomanda={stepDomanda}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.mansioni:
                  return (
                    <CuraDellePersone
                      key={el.code}
                      locale={locale}
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      moveNext={moveNext}
                      moveBack={moveBack}
                      changeStep={updateStepsStatus}
                      stepDomanda={stepDomanda}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.casa:
                  return (
                    <CuraDellaCasa
                      locale={locale}
                      key={el.code}
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      moveNext={moveNext}
                      moveBack={moveBack}
                      changeStep={updateStepsStatus}
                      stepDomanda={stepDomanda}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.animali:
                  return (
                    <CuraDegliAnimali
                      locale={locale}
                      key={el.code}
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      moveNext={moveNext}
                      moveBack={moveBack}
                      changeStep={updateStepsStatus}
                      stepDomanda={stepDomanda}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.disponibilita:
                  return (
                    <DisponibilitaRichiesta
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      key={el.code}
                      locale={locale}
                      userProfile={userProfile}
                      livelliContrattuali={livelliContrattuali}
                      updateAttributiDomanda={getAttributiDomanda}
                      moveNext={moveNext}
                      moveBack={moveBack}
                      changeStep={updateStepsStatus}
                      stepDomanda={stepDomanda}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.preferenzelav:
                  return (
                    <PreferenzeSulLavoratore
                      locale={locale}
                      key={el.code}
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      moveNext={moveNext}
                      moveBack={moveBack}
                      changeStep={updateStepsStatus}
                      stepDomanda={stepDomanda}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );
                case NAVIGATION_STEPS_TYPE_CODE.sedelavoro:
                  return (
                    <SedeLavoroEContatti
                      locale={locale}
                      key={el.code}
                      DatiLogin={datiLogin}
                      idRichiestaTcb={idRichiestaTcb}
                      servizioTCB={servizioTCB}
                      moveBack={moveBack}
                      stepDomanda={stepDomanda}
                      changeStep={updateStepsStatus}
                      openSummary={(v, callback) => {
                        updateStepsStatus(6, v, callback);
                        setOpenSummary(true);
                      }}
                      stepCheckValidity={stepCheckValidity}
                      onChangeValidation={onChangeValidation}
                      sendRequestTCB={sendRequestTCB}
                    />
                  );

                default:
                  return null;
              }
            }
            return null;
          })}
          <div id="endOfTCBPage" role="none"></div>
        </ContentColumn>
        {windowSizesLarge.indexOf(windowSize) >= 0 ? (
          <NavigationColumn
            xs="12"
            lg="4"
            padding="0"
            order={{ lg: 2 }}
            tagName="aside"
          >
            <MenuNavigazione
              isSticky
              locale={locale}
              idAdmin={idAdmin}
              idRichiestaTcb={idRichiestaTcb}
              servizioTCB={servizioTCB}
              moveToStep={setStepDomanda}
              setOpenSummary={setOpenSummary}
              openSummary={openSummary}
              setCheckValidity={setCheckValidity}
              navigationTabs={navigationTabs}
              DatiLogin={datiLogin}
              price={price}
              getAttributiDomanda={getAttributiDomanda}
              attributes={attributes}
              livelliContrattuali={livelliContrattuali}
            />
          </NavigationColumn>
        ) : null}
      </Row>
    </>
  );
};

ConfigurazioneRichiestaTCB.displayName = 'ConfigurazioneRichiestaTCB';
const mapDispatchToProps = ({
  OpenModal,
});
export default connect(null, mapDispatchToProps)(withRouter(ConfigurazioneRichiestaTCB));

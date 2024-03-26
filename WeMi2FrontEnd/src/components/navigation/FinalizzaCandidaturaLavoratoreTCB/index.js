
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { connect } from 'react-redux';
import { colors } from 'theme';
import DatiOperatore from './DatiOperatore';
import { NavLink } from 'components/router';
import Button from 'components/ui2/Button';
import {
  estraiEsperienzeLavoratore as estraiEsperienzeLavoratoreQ,
  estraiFlagsCandidaturaQuery,
  estraiDatiOperatore as estraiDatiOperatoreQ,
  inserisciDatiOperatore as inserisciDatiOperatoreM,
  aggiornaStepsLavoratoreTCBQuery,
  estraiStepsLavoratoreTCBQuery,
  estraiDocumentiLavoratore
} from './DatiOperatoreGraphQL';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import ModaleRiepilogo from '../CandidaturaLavoratoreTCB/partials/ModaleRiepilogo';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { withRouter } from 'react-router';
import { stepStatus } from 'services/TCB/tcbStepConverter';
import { NAVIGATION_STEPS_TYPE_CODE } from 'components/navigation/CandidaturaLavoratoreTCB/constants/DefaultNavigationSteps';
import { useNavHeight } from 'hooks/useNavHeight';
import useWindowSize from 'hooks/useWindowSize';

const StickyRow = styled(Row)`
  ${({ isSticky, navHeight }) => isSticky && `
    position: sticky;
    top: ${navHeight ? (navHeight + 10) : 0}px;
  `}
`;


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

const FinalizzaCandidaturaLavoratoreTCB = ({
  idOperatore,
  idLavoratore,
  locale,
  location,
  history
}) => {
  const [response, setResponse] = useState();
  const [openModalSummary, setOpenModalSummary] = useState(false);

  const navHeight = useNavHeight();

  const windowSize = useWindowSize();
  const isDesktop = ['lg', 'xl', 'xxl', 'xxxl'].indexOf(windowSize) > -1;

  const [candidaturaFlags] = useGraphQLRequest(
    undefined,
    estraiFlagsCandidaturaQuery,
    { idUtente: idLavoratore },
    true
  );

  const [datiOperatoreDb, estraiDatiOperatoreDb] = useGraphQLRequest(
    undefined,
    estraiDatiOperatoreQ,
    undefined,
    false
  );

  const [EsperienzeLavoratore, getEsperienzeLavoratore] = useGraphQLRequest(
    undefined,
    estraiEsperienzeLavoratoreQ,
    { idUtenteLav: idLavoratore },
    true
  );

  const eventBus = useEventBus();

  const loaded = !candidaturaFlags.pristine &&
    !candidaturaFlags.isLoading &&
    !datiOperatoreDb.pristine &&
    !datiOperatoreDb.isLoading &&
    !EsperienzeLavoratore.pristine &&
    !EsperienzeLavoratore.isLoading;


  useEffect(() => {
    let arrayIdServizi = [];
    if (candidaturaFlags.data) {
      if (candidaturaFlags.data.tata) {
        arrayIdServizi.push(999997)
      }
      if (candidaturaFlags.data.colf) {
        arrayIdServizi.push(999998)
      }
      if (candidaturaFlags.data.badante) {
        arrayIdServizi.push(999999)
      }
      estraiDatiOperatoreDb({
        idUtenteLav: idLavoratore,
        arrayIdServizi: arrayIdServizi
      })
    }
  }, [candidaturaFlags.data])

  const inserisciDatiOperatoreMutation = useStatelessGraphQLRequest(
    inserisciDatiOperatoreM
  );

  const estraiDocLavoratore = useStatelessGraphQLRequest(estraiDocumentiLavoratore);

  const saveData = async (input) => {
    setResponse(await inserisciDatiOperatoreMutation({
      input: input
    }))
    return null
  };

  const arrayInputAnniEsp = () => {
    let arr = [];
    if (candidaturaFlags.data.tata) {
      arr.push({ label: 'Anni esperienza baby-sitter', key: 'anniEspTata', max: 99 })
    }
    if (candidaturaFlags.data.colf) {
      arr.push({ label: 'Anni esperienza colf', key: 'anniEspColf', max: 99 })
    }
    if (candidaturaFlags.data.badante) {
      arr.push({ label: 'Anni esperienza badante', key: 'anniEspBadante', max: 99 })
    }
    return arr
  };

  const arrayInputValutazione = () => {
    let arr = [];
    if (candidaturaFlags.data.tata) {
      arr.push({ label: 'Voto esperienza baby-sitter', key: 'votoEspTata', max: 5 })
    }
    if (candidaturaFlags.data.colf) {
      arr.push({ label: 'Voto esperienza colf', key: 'votoEspColf', max: 5 })
    }
    if (candidaturaFlags.data.badante) {
      arr.push({ label: 'Voto esperienza badante', key: 'votoEspBadante', max: 5 })
    }
    return arr
  };

  const performStepsStatusUpdate = useStatelessGraphQLRequest(
    aggiornaStepsLavoratoreTCBQuery,
    undefined,
  );

  const stepsStatus = useStatelessGraphQLRequest(
    estraiStepsLavoratoreTCBQuery,
    { idUtenteLav: idLavoratore }
  );

  const getCodiceStepDaAttivare = (index) => {
    const keys = Object.keys(NAVIGATION_STEPS_TYPE_CODE);
    return `cd_stato_pag_${NAVIGATION_STEPS_TYPE_CODE[keys[index]]}`;
  };

  const getUpdatedSteps = (index, newStepsStatus) => {
    const keys = Object.keys(newStepsStatus);
    const step = getCodiceStepDaAttivare(index);
    keys.forEach(ele => {
      const stato = Number.parseInt(newStepsStatus[ele], 10);
      if (ele === step) {
        if (stato === Number.parseInt(stepStatus.visitedAndInvalid, 10)) {
          newStepsStatus[ele] = stepStatus.activeAndInvalid;
        } else  if (stato === Number.parseInt(stepStatus.visitedAndValid, 10)) {
            newStepsStatus[ele] = stepStatus.activeAndValid;
          }
      } else  if (stato === Number.parseInt(stepStatus.activeAndInvalid, 10)) {
          newStepsStatus[ele] = stepStatus.visitedAndInvalid;
        } else  if (stato === Number.parseInt(stepStatus.activeAndValid, 10)) {
            newStepsStatus[ele] = stepStatus.visitedAndValid;
          }
    });

    return newStepsStatus;
  };

  const updateStepRedirect = async (index) => {

      const status = await stepsStatus();
      const newStepsStatus = getUpdatedSteps(index, status);
      await performStepsStatusUpdate({
        idUtenteLav: idLavoratore,
        steps: newStepsStatus,
      });
      history.push({ pathname: `/admin/ModificaCandidaturaLavoratore/${idLavoratore}`, state: location.state});

  };

  return (
    <>
      <Row fluid justifycontent="space-between">
        <NavigationColumn
          xs="12"
          lg="4"
          padding="0"
          order={{ lg: 2 }}
          tagName="aside"
        >
          <StickyRow navHeight={navHeight} isSticky={isDesktop}>
            <Row fluid>
              <Button
                type="button"
                color="blue"
                fontSize="f7"
                width="100%"
                label="Salva e torna alla candidatura"
                onClick={() => eventBus.publish('SALVA_E_REDIREZIONA', { pathname: `/admin/ModificaCandidaturaLavoratore/${idLavoratore}`, state: location.state })}
              />
            </Row>
            <Row fluid>
              <Column xs="6" padding="1em 0.5em 0 0">
                <Button
                  type='button'
                  color="blue"
                  fontSize="f7"
                  width="100%"
                  label="Salva e chiudi"
                  onClick={() => eventBus.publish('SALVA_E_REDIREZIONA', { pathname: `/admin/${idOperatore}/candidatureLavoratoriTcb`, state: location.state })}
                />
              </Column>
              <Column xs="6" padding="1em 0.5em 0 0">
                <NavLink
                  to={{ pathname: `/admin/ModificaCandidaturaLavoratore/${idLavoratore}`, state: location.state }}
                  width="100%"
                >
                  <Button
                    type='button'
                    color="red"
                    fontSize="f7"
                    width="100%"
                    label="Annulla modifiche"
                  />
                </NavLink>
              </Column>
            </Row>
            <Row fluid margin="1em 0">
              <Button
                type='button'
                color="primary"
                fontSize="f7"
                width="100%"
                label="Riepilogo candidatura"
                onClick={() => setOpenModalSummary(true)}
              />
            </Row>
          </StickyRow>
        </NavigationColumn>
        <ContentColumn
          xs="12"
          lg="8"
          padding="0"
          order={{ lg: 1 }}
          tagName="section"
        >
          {loaded ?
            <DatiOperatore
              idOperatore={idOperatore}
              idLavoratore={idLavoratore}
              response={response}
              saveData={saveData}
              estraiDocLavoratore={estraiDocLavoratore}
              arrayInputAnniEsp={arrayInputAnniEsp}
              arrayInputValutazione={arrayInputValutazione}
              EsperienzeLavoratore={EsperienzeLavoratore.data}
              datiOperatoreDb={datiOperatoreDb.data}
            /> : null}
        </ContentColumn>
      </Row>

      <ModaleRiepilogo
        locale={locale}
        open={openModalSummary}
        setOpen={setOpenModalSummary}
        idLavoratore={idLavoratore}
        onPatchStep={undefined}
        isModifica
        onPatchStep={(index) => updateStepRedirect(index)}
      />
    </>
  );
};

FinalizzaCandidaturaLavoratoreTCB.displayName = 'FinalizzaCandidaturaLavoratoreTCB';

const mapStoreToProps = store => ({ locale: store.locale });

export default connect(mapStoreToProps)(withRouter(FinalizzaCandidaturaLavoratoreTCB));

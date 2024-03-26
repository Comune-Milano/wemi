import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import VerticalStepper from 'components/ui2/VerticalStepper';
import Button from 'components/ui2/Button';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui2/Tooltip';
import Text from 'components/ui/Text';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { withRouter, generatePath } from 'react-router-dom';
import checkLavoratore from 'utils/functions/checkLavoratore';
import checkAdmin from 'utils/functions/checkAdmin';
import checkCittadino from 'utils/functions/checkCittadino';
import { PAGE_TCB_ADMIN_ERI_001, PAGE_REQUESTSINDEX_URL } from 'types/url';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { useNavHeight } from 'hooks/useNavHeight';
import { EstraiStatoDomandaTCB as EstraiStatoDomandaTCBQ } from './ConfigurazioneRichiestaGraphQL';
import { ModaleUscita, ModaleEliminazione } from '.';
import ModaleRiepilogo from '../ModaleRiepilogo';

const StickyRow = styled(Row)`
    ${({ isSticky, navHeight }) => isSticky && `
      position: sticky;
      top: ${navHeight ? (navHeight + 10) : 0}px;
    `}

    #scrollTopButton {
        position: fixed;
        bottom: 5rem;
        right: 2rem;
        z-index: 10;
        transition: opacity 1s linear;
    }
    #scrollTopButton.show {
        opacity: 1;
        visibility: visible;
    }
    #scrollTopButton.hide {
        opacity: 0;
        visibility: hidden;
    }
    ${media.md`
        #scrollTopButton {
            display: none !important;
        }
    `}
`;

const StiledButtonContainer = styled.div`
    background-color: #FFF;
    border-radius: 50%;
    padding: 0.2rem;
`;

const MenuNavigazione = ({
    DatiLogin,
    navigationTabs,
    location,
    openSummary,
    setOpenSummary,
    moveToStep,
    idRichiestaTcb,
    getAttributiDomanda,
    history,
    idAdmin,
    setCheckValidity,
    price,
    attributes,
    servizioTCB,
    locale,
    livelliContrattuali,
    isSticky,
}) => {
  const [openElimina, setOpenElimina] = useState(false);
  const [openUscita, setOpenUscita] = useState(false);

  const navHeight = useNavHeight();

  const [stato] = useGraphQLRequest(
        undefined,
        EstraiStatoDomandaTCBQ,
    {
      idDomandaTCB: idRichiestaTcb,
    },
        true
    );

  const checkRequestValidity = navigationTabs.reduce((tot, step) => tot && !(!step.hide && !step.valid), true);
  const showRequiredMessage = !navigationTabs.reduce((tot, step) => tot && !(step.visited && !step.valid), true);
    /**
     * Implementazione "sporca", ma rapida e funzionante del salvataggio della bozza
     * viene identificato nel DOM il bottone nascosto di salvataggio bozza nel componente "BottoniNavigazione.js"
     * tramite evento nativo js onClick viene scatenato il salvataggio.
     * (Questo tipo di implementazione è stata scelta perché implementabile in modo rapido e compatibile con tutti i browser)
     */
  const callSaveDraft = () => {
    const buttonRef = document.getElementById('saveDraftTCB');
    if (buttonRef) {
      buttonRef.click();
      return buttonRef.className === 'valid';
    }
    return false;
  };

  const inviaRichiesta = async () => {
    setCheckValidity(true);
  };


  const redirect = () => {
    if (idAdmin) {
      const generatedPath = generatePath(PAGE_TCB_ADMIN_ERI_001, {
        idOperatore: idAdmin,
      });
      history.push(generatedPath);
    } else if (checkAdmin(DatiLogin)) {
      const generatedPath = generatePath(PAGE_TCB_ADMIN_ERI_001, {
        idOperatore: DatiLogin.idCittadino,
      });
      history.push(generatedPath);
    } else if (checkCittadino(DatiLogin) || checkLavoratore(DatiLogin)) {
      history.push(PAGE_REQUESTSINDEX_URL);
    }
  };

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const handleScrollTopButton = () => {
        // const windowSize = window.innerWidth;
        // if (windowSize < breakpoints.sm) {
    const startOfTCBPageRef = document.getElementById('startOfTCBPage');
    const endOfTCBPageRef = document.getElementById('endOfTCBPage');
    if (startOfTCBPageRef && endOfTCBPageRef) {
      const startPoint = startOfTCBPageRef.getBoundingClientRect().bottom;
      const endPoint = endOfTCBPageRef.getBoundingClientRect().bottom;
      if (startPoint < 200 && endPoint > 600) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    }
        // }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollTopButton);
    return () => { window.removeEventListener('scroll', handleScrollTopButton); };
  }, []);
  const eventBus = useEventBus();

  return (
    <>
      <StickyRow fluid navHeight={navHeight} isSticky={isSticky}>
        <Column xs="12" padding="0">
          <Tooltip
            fluid
            position="top"
            color="white"
            bgcolor="blue"
            posAdjustment="20%"
            preventOnHover={checkRequestValidity}
            value="Per inviare la richiesta è necessario compilare i campi obbligatori di tutte le sezioni"
          >
            {
              stato.data && parseInt(stato.data.cd_stato_ric_serv_ente, 10) > 0 ? (
                <Button
                  type="button"
                  color="blue"
                  fontSize="f7"
                  width="100%"
                  label="Salva domanda"
                  disabled={false}
                  onClick={() => {
                    // salvaDomanda();
                    eventBus.publish('SAVE_APPLICATION_ADMIN');
                    redirect();
                  }}
                />
              )
              : (
                <Button
                  type="button"
                  color="blue"
                  fontSize="f7"
                  width="100%"
                  label={location.state && location.state.isFromBackoffice ? 'Salva richiesta' : 'Invia richiesta'}
                  disabled={!checkRequestValidity}
                  onClick={() => {
                    inviaRichiesta();
                  }}
                />
              )}
          </Tooltip>
        </Column>

        <Column xs="9" padding="1em 0.5em 0 0">
          <Button
            color="red"
            fontSize="f7"
            label="ELIMINA TUTTI I DATI INSERITI"
            onClick={() => setOpenElimina(true)}
            padding="0.4em 0"
          />
        </Column>
        <Column xs="3" padding="1em 0 0 0.5em">
          <Button
            color="red"
            fontSize="f7"
            width="100%"
            label="ESCI"
            onClick={() => { setOpenUscita(true); }}
            padding="0.4em 0"
          />
        </Column>

        <Column xs="12" padding="1em 0">
          <VerticalStepper
            steps={navigationTabs}
            progressive
            onChange={(i) => {
              moveToStep(i);
            }}
          />
        </Column>

        <Column xs="12" padding="1em 0">
          <Button
            color="primary"
            fontSize="f7"
            width="100%"
            label="Visualizza riepilogo"
            disabled={false}
            onClick={() => {
              callSaveDraft();
              getAttributiDomanda();
              setOpenSummary(true);
            }}
          />
        </Column>

        {showRequiredMessage && (
          <Column xs="12" padding="1em 0 0 0" flex alignItems="flex-start">
            <span style={{ paddingRight: '1em' }}>*</span>
            <Text
              size="f7"
              color="black"
              tag="p"
              value="La compilazione della sezione deve essere completata per poter inviare la richiesta"
            />
          </Column>
              )}

        <StiledButtonContainer id="scrollTopButton" className={showScrollTopButton ? 'show' : 'hide'}>
          <ButtonIcon fontSize="f5" color="primary" icon="arrow-up" label="Scroll-top" onClick={() => { window.scrollTo(0, 0); }} />
        </StiledButtonContainer>
        <ModaleEliminazione
          openElimina={openElimina}
          setOpenElimina={setOpenElimina}
          idRichiestaTcb={idRichiestaTcb}
          idAdmin={idAdmin}
        />
        <ModaleUscita
          openUscita={openUscita}
          setOpenUscita={setOpenUscita}
          datiLogin={DatiLogin}
        />
      </StickyRow>
      <ModaleRiepilogo
        userProfile={{ datiLogin: DatiLogin }}
        locale={locale}
        open={openSummary}
        setOpen={setOpenSummary}
        servizioTCB={servizioTCB}
        idRichiestaTcb={idRichiestaTcb}
        navigationTabs={navigationTabs}
        moveToStep={moveToStep}
        livelliContrattuali={livelliContrattuali.data.estraiConfigurazioniLivelliContrattuali}
        attributes={attributes}
        price={price}
      />
    </>
  );
};

MenuNavigazione.displayName = 'MenuNavigazione';

export default withRouter(MenuNavigazione);

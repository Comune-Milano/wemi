/** @format */
import React, { useState, useEffect } from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import NavLink from 'components/router/NavLink';
import Button from 'components/ui2/Button';
import Tooltip from 'components/ui2/Tooltip';
import Text from 'components/ui/Text';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import DrawerChat from 'components/navigation/Chat';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import withAuthentication from 'hoc/withAuthentication';
import moment from 'moment';
import ModaleInfoRichiesta from 'components/shared/ModaleInfoRichiesta';
import { RICHIESTA_ENTE_INOLTRATA, RICHIESTA_ENTE_ACCETTATA, RICHIESTA_ENTE_CONVERSAZIONE, RICHIESTA_ENTE_PAGATA } from 'types/stati-richieste/richiesteEnte';
import { FEEDBACK_RICHIESTO, FEEDBACK_RILASCIATO, FEEDBACK_CONFERMATO } from 'types/stati-richieste/feedback';
import { chatStatus as chatStatusTypes } from 'types/chatStatus';
import { FilterIndexAdd } from 'redux-modules/actions/entEriActions';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { PAGE_RECENSIONE_URL, PAGE_RECENSIONE_FROM_GESTIONE_FEEDBACK_URL, PAGE_MODALERIFIUTOENTERI001_URL, PAGE_MODALEACCETTAZIONEENTERI001_URL } from 'types/url';
import { generatePath, withRouter } from 'react-router';
import { CITTADINO } from 'types/userRole';
import {
  richiediFeedback as richiediFeedbackQ,
  estraiRichiestaEnte as estraiRichiestaEnteQ,
} from './DrawerGraphQL';


const StyledColumn = styled(Column)`
 p {
  text-align: left;
 }
`;

const DrawerBody = ({
  currentPage,
  getElementi,
  userProfile,
  bodyValue,
  isFeedback,
  history,
}) => {
  const [openModalInfoRichiesta, setOpenModalInfoRichiesta] = useState(false);
  const richiediFeedback = useStatelessGraphQLRequest(richiediFeedbackQ);
  const [requestInfo, performRequestInfo] = useGraphQLRequest(
    {},
    estraiRichiestaEnteQ,
    {
      idRichiestaEnte: bodyValue.idRichiestaServizioEnte,
    },
    false,
  );

  useEffect(() => {
    if (bodyValue.idRichiestaServizioEnte) {
      performRequestInfo();
    }
  }, [bodyValue.idRichiestaServizioEnte]);

  const { datiLogin } = userProfile;
  const { idCittadino } = datiLogin;
  const isCittadino = datiLogin.Profilo === CITTADINO;

  const [chatVisible, setChatVisible] = useState(false);

  // stato richiesta:
  const inoltrata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_INOLTRATA;
  const accettata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_ACCETTATA;
  const conversazione = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_CONVERSAZIONE;
  // const annullata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_ANNULLATA;
  // const chiusa = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_CHIUSA;
  // const scaduta = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_SCADUTA;
  // const confermata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_CONFERMATA;
  const pagata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_PAGATA;

  // stato feedback:
  const feedbackConfermato = bodyValue.statoRecensione === FEEDBACK_CONFERMATO;
  const feedbackRichiesto = bodyValue.statoRecensione === FEEDBACK_RICHIESTO;
  const feedbackRilasciato = bodyValue.statoRecensione === FEEDBACK_RILASCIATO;

  // stato chat:
  // const chatStatus = Number.parseInt(bodyValue.statoChat, 10);

  const labelButtonChat = React.useMemo(
    () => {
      if (inoltrata || conversazione) {
        return 'SCRIVI AL CITTADINO';
      }
      return 'CONSULTA I MESSAGGI';
    },
    [inoltrata, conversazione]
  );

  const getRequestInfo = () => {
    const richiesta = getObjectValue(requestInfo, 'data.EstraiRichiestaEnte');
    const richiestaDisponibilita = getObjectValue(richiesta, 'richiestaServizioBase.js_dati_richiesta.fgRichiestaDisponibilita', false);

    let periodoRichiestoDal = null;
    let periodoRichiestoAl = null;

    if ((!richiestaDisponibilita && (pagata || accettata)) || richiestaDisponibilita) {
      periodoRichiestoDal = richiesta.dt_periodo_proposto_dal ? moment(richiesta.dt_periodo_proposto_dal).format('DD/MM/YYYY') : moment(richiesta.richiestaServizioBase.dt_periodo_richiesto_dal).format('DD/MM/YYYY');
      periodoRichiestoAl = richiesta.dt_periodo_proposto_al ? moment(richiesta.dt_periodo_proposto_al).format('DD/MM/YYYY') : moment(richiesta.richiestaServizioBase.dt_periodo_richiesto_al).format('DD/MM/YYYY');
    }

    return {
      idRichiestaServizioEnte: richiesta.id_richiesta_servizio_ente,
      idMittente: idCittadino,
      isCittadino,
      usernameCittadino: bodyValue.username,
      statoChat: parseInt(bodyValue.statoChat, 10),
      idDestinatario: richiesta.id_utente_richiedente,
      nomeEnte: richiesta.servizioEnte.ente.nm_ente,
      nomeServizio: richiesta.richiestaServizioBase.serviceName.it,
      dataRichiestaBaseDa: periodoRichiestoDal,
      dataRichiestaBaseA: periodoRichiestoAl,
      prezzoProposto: richiesta.im_costo_totale_calcolato,
      prezzoFinale: richiesta.im_costo_totale_ente,
      noteCittadino: richiesta.richiestaServizioBase.js_dati_richiesta.txNotaRichiesta,
    };
  };

  return (
    <Row padding="3em" fluid>
      {(!isFeedback && (inoltrata || conversazione)) && (
        <>
          <Row fluid justifycontent="space-between" alignitems="center" display="flex">
            <StyledColumn xs="5" padding="1em 0 0">
              <Text
                tag="p"
                align="left!important"
                size="f7"
                value="Apre form di accettazione della richiesta"
              />
            </StyledColumn>
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <Tooltip
                position="bottom"
                color="white"
                fluid
                bgcolor="blue"
                value="Trattasi di cittadino minorenne"
                posAdjustment="0%"
                preventOnHover={!bodyValue.isYoung}
              >
                <NavLink to={generatePath(PAGE_MODALEACCETTAZIONEENTERI001_URL, { idRichiesta: bodyValue.idRichiestaServizioEnte, idEnte: datiLogin.idEnte })} width="100%">
                  <Button
                    fontSize="f7"
                    type="accept"
                    disabled={bodyValue.isYoung}
                    label="Accetta"
                  />
                </NavLink>
              </Tooltip>
            </StyledColumn>
          </Row>

          <Row fluid justifycontent="space-between" alignitems="center" display="flex">
            <StyledColumn xs="5" padding="1em 0 0">
              <Text
                tag="p"
                align="left!important"
                size="f7"
                value="Apre form di rifiuto della richiesta"
              />
            </StyledColumn>
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <NavLink to={generatePath(PAGE_MODALERIFIUTOENTERI001_URL, { idRichiesta: bodyValue.idRichiestaServizioEnte, idEnte: datiLogin.idEnte })} width="100%">
                <Button
                  fontSize="f7"
                  type="cancel"
                  label="Chiudi"
                />
              </NavLink>
            </StyledColumn>
          </Row>
        </>
      )}
      <Row fluid justifycontent="space-between" alignitems="center" display="flex">
        <StyledColumn xs="5" padding="1em 0 0">
          <Text
            tag="p"
            align="left!important"
            size="f7"
            value="Apre la pagina per comunicare con il cittadino"
          />
        </StyledColumn>
        <StyledColumn xs="6" lg="5" padding="1em 0 0">
          <Button
            fontSize="f7"
            label={labelButtonChat}
            onClick={(ev) => {
              setChatVisible(true);
              ev.preventDefault();
              ev.stopPropagation();
            }}
          />
          {chatVisible ? (
            <DrawerChat
              newChatStatus={chatStatusTypes.MESSAGGIO_ENTE}
              usernameCittadino={`${bodyValue.nomeUtente} ${bodyValue.cognomeUtente}`}
              usernameEnte="Tu"
              titoloChat={`${bodyValue.nomeUtente} ${bodyValue.cognomeUtente}`}
              requestInfo={!requestInfo.isLoading ? getRequestInfo() : {}}
              onEscape={() => setChatVisible(false)}
              onUnload={() => setChatVisible(false)}
              chiudiChatVisible
              textAreaVisible={inoltrata || conversazione}
              sendButtonVisible={inoltrata || conversazione}
              uploadFileVisible={inoltrata || conversazione}
            />
          ) : null}
        </StyledColumn>
      </Row>
      <Row fluid justifycontent="space-between" alignitems="center" display="flex">
        <StyledColumn xs="5" padding="1em 0 0">
          <Text
            tag="p"
            align="left!important"
            size="f7"
            value="Visualizza il riepilogo della richiesta"
          />
        </StyledColumn>
        <StyledColumn xs="6" lg="5" padding="1em 0 0 0">
          <Button
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setOpenModalInfoRichiesta(true);
            }}
            fontSize="f7"
            type="primary"
            label="Info richiesta"
          />
        </StyledColumn>
      </Row>
      {pagata && !feedbackRilasciato && !feedbackRichiesto && !feedbackConfermato && (
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              size="f7"
              value="Richiede un feedback all'utente"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="01em 0 0">
            <Button
              fontSize="f7"
              label="Richiedi Feedback"
              onClick={async (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                await richiediFeedback({ idRichiestaEnte: bodyValue.idRichiestaServizioEnte });
                await getElementi(currentPage);
              }}
            />
          </StyledColumn>
        </Row>
      )}

      {(feedbackRilasciato || feedbackConfermato) && (
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              size="f7"
              value="Visualizza informazioni riguardo il feedback"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            <Button
              fontSize="f7"
              type="primary"
              label="Info Feedback"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                const idRichiesta = bodyValue.idRichiestaServizioEnte;
                if (isFeedback) {
                  history.push(generatePath(PAGE_RECENSIONE_FROM_GESTIONE_FEEDBACK_URL, { idRichiesta }));
                } else {
                  history.push(generatePath(PAGE_RECENSIONE_URL, { idRichiesta }));
                }
              }}
            />
          </StyledColumn>
        </Row>
      )}

      <ModaleInfoRichiesta
        openModal={openModalInfoRichiesta}
        setOpenModal={setOpenModalInfoRichiesta}
        idRichiestaServizioEnte={bodyValue.idRichiestaServizioEnte}
      />
    </Row>
  );
};

DrawerBody.displayName = 'DrawerBody';

const mapStoreToProps = store => ({
  locale: store.locale,
  pathname: store.routing.pathname,
});
const mapDispatchToProps = ({
  graphqlRequest,
  FilterIndexAdd,
});

export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(withRouter(DrawerBody)));

/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import DrawerChat from 'components/navigation/Chat';
import moment from 'moment';
import withAuthentication from 'hoc/withAuthentication';
import ModaleInfoRichiesta from 'components/shared/ModaleInfoRichiesta';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { RICHIESTA_ENTE_ACCETTATA, RICHIESTA_ENTE_PAGATA } from 'types/stati-richieste/richiesteEnte';
import withRouter from 'react-router/withRouter';
import { FEEDBACK_CONFERMATO, FEEDBACK_RILASCIATO } from 'types/stati-richieste/feedback';
import { generatePath } from 'react-router';
import { PAGE_RECENSIONE_ADMIN_URL } from 'types/url';

const StyledColumn = styled(Column)`
 p {
  text-align: left;
 } 
`;

const DrawerBodyOperatore = ({ userProfile, bodyValue, history }) => {
  const [openModalInfoRichiesta, setOpenModalInfoRichiesta] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const feedbackRilasciato = bodyValue.statoRecensione === FEEDBACK_CONFERMATO || bodyValue.statoRecensione === FEEDBACK_RILASCIATO;

  const { datiLogin } = userProfile;
  const { idCittadino } = datiLogin;

  const pagata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_PAGATA;
  const accettata = bodyValue.statoRichiestaEnte === RICHIESTA_ENTE_ACCETTATA;

  const getRequestInfo = () => {
    const richiestaDisponibilita = getObjectValue(bodyValue, 'jsDatiRichiesta.fgRichiestaDisponibilita', false);

    let periodoRichiestoAl = null;
    let periodoRichiestoDal = null;

    if ((!richiestaDisponibilita && (pagata || accettata)) || richiestaDisponibilita) {
      periodoRichiestoAl = bodyValue.periodoPropostoAl ? moment(bodyValue.periodoPropostoAl).format('DD/MM/YYYY') : moment(bodyValue.periodoRichiestoAl).format('DD/MM/YYYY');
      periodoRichiestoDal = bodyValue.periodoPropostoDal ? moment(bodyValue.periodoPropostoDal).format('DD/MM/YYYY') : moment(bodyValue.periodoRichiestoDal).format('DD/MM/YYYY');
    }

    return {
      idRichiestaServizioEnte: bodyValue.idRichiestaServizioEnte,
      idMittente: idCittadino,
      usernameCittadino: bodyValue.username,
      statoChat: parseInt(bodyValue.statoChat, 10),
      nomeEnte: bodyValue.nmEnte,
      nomeServizio: bodyValue.nomeServizio.it,
      dataRichiestaBaseDa: periodoRichiestoDal,
      dataRichiestaBaseA: periodoRichiestoAl,
      noteCittadino: bodyValue.jsDatiRichiesta && bodyValue.jsDatiRichiesta.txNotaRichiesta,
      prezzoFinale: bodyValue.prezzoFinale,
      prezzoProposto: bodyValue.prezzoProposto,
    };
  };

  return (
    <Row padding="3em" fluid>
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
      <Row fluid justifycontent="space-between" alignitems="center" display="flex">
        <StyledColumn xs="5" padding="1em 0 0">
          <Text
            tag="p"
            align="left!important"
            size="f7"
            value="Visualizza informazioni riguardo il feedback"
          />
        </StyledColumn>
        {feedbackRilasciato ? (
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            {/* <NavLink to={`/admin/rec/${bodyValue.idRichiestaServizioEnte}`} width="100%"> */}
            <Button
              fontSize="f7"
              type="primary"
              label="Info Feedback"
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                const idRichiesta = bodyValue.idRichiestaServizioEnte;
                history.push(generatePath(PAGE_RECENSIONE_ADMIN_URL, { idRichiesta }));
              }}
            />
            {/* </NavLink> */}
          </StyledColumn>
        ) :
          (
            <StyledColumn xs="6" lg="5" padding="1em 0 0">
              <Button
                type="disabled"
                disabled
                label="Info Feedback"
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                }}
              />
            </StyledColumn>
          )
        }
      </Row>
      <Row fluid justifycontent="space-between" alignitems="center" display="flex">
        <StyledColumn xs="5" padding="1em 0 0">
          <Text
            tag="p"
            align="left!important"
            size="f7"
            value="Apre la pagina per visualizzare chat tra cittadino ed ente"
          />
        </StyledColumn>
        <StyledColumn xs="6" lg="5" padding="1em 0 0">
          <Button
            fontSize="f7"
            label="Visualizza Chat"
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              setChatVisible(true);
            }}
          />
          {chatVisible ? (
            <DrawerChat
              usernameCittadino={`${bodyValue.nomeUtente} ${bodyValue.cognomeUtente}`}
              usernameEnte={bodyValue.nmEnte}
              titoloChat={`Conversazione tra ${bodyValue.nmEnte} e ${bodyValue.nomeUtente} ${bodyValue.cognomeUtente}`}
              requestInfo={getRequestInfo()}
              onEscape={() => setChatVisible(false)}
              onUnload={() => setChatVisible(false)}
            />
          ) : null}
        </StyledColumn>
      </Row>
      <ModaleInfoRichiesta
        openModal={openModalInfoRichiesta}
        setOpenModal={setOpenModalInfoRichiesta}
        idRichiestaServizioEnte={bodyValue.idRichiestaServizioEnte}
      />
    </Row>
  );
};

DrawerBodyOperatore.displayName = 'DrawerBodyOperatore';

const mapStoreToProps = store => ({
  locale: store.locale,
  pathname: store.routing.pathname,
});
const mapDispatchToProps = ({
  graphqlRequest,
});

export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(withRouter(DrawerBodyOperatore)));

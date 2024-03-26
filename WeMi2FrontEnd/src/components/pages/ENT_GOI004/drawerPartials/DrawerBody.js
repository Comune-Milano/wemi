
/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import NavLink from 'components/router/NavLink';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import { connect } from 'react-redux';
import { addCart } from 'redux-modules/actions/cartActions';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { OPERATORE_ENTE } from 'types/userRole';
import { withRouter, generatePath } from 'react-router';
import {
  PAGE_VISUALIZZA_ENTE_GOI_005_URL,
  PAGE_ADMIN_VISUALIZZA_ENTE_GOI_005_URL,
  PAGE_ADMIN_ENTE_GOI_005_URL,
  PAGE_ENTE_GOI_005_URL,
} from 'types/url';
import checkEnte from 'utils/functions/checkEnte';
import checkAdmin from 'utils/functions/checkAdmin';

const StyledColumn = styled(Column)`
 p {
  text-align: left;
 } 

`;

const DrawerBody = ({ bodyValue, history }) => {
  const abilitaModicaEnte = [2, 21, 30];
  const abilitaModicaAdmin = [31, 22, 4];

  const statoServizio = bodyValue.ele.cd_stato_dati_servizio_ente;
  const { datiLogin } = bodyValue;
  const flagVisualizzaModifica = (datiLogin.Ruolo == 'Ente' && abilitaModicaEnte.indexOf(statoServizio) >= 0) ||
    (datiLogin.Ruolo == 'Amministratore WeMi' && abilitaModicaAdmin.indexOf(statoServizio) >= 0);

  const { id_ente, ele, handleUpdateRow } = bodyValue && bodyValue;

  return (
    <Row padding="3em" fluid>

      {flagVisualizzaModifica && (
        <Row fluid justifycontent="space-between" alignitems="center" display="flex">
          <StyledColumn xs="5" padding="1em 0 0">
            <Text
              tag="p"
              align="left!important"
              size="f7"
              value="Modifica la scheda del servizio offerto"
            />
          </StyledColumn>
          <StyledColumn xs="6" lg="5" padding="1em 0 0">
            {/* <NavLink width="100%" to={`/gestioneEnte/${id_ente}/SchedaServiziEnte/${ele.id_servizio_ente}/ServizioAccreditato`}> */}
            <Button
              intlFormatter
              weight="normal"
              type="primary"
              onClick={(event) => {
                handleUpdateRow.bind(this); handleUpdateRow(event);
                if (checkEnte(datiLogin)) {
                  return history.push(generatePath(PAGE_ENTE_GOI_005_URL, {
                    idEnte: id_ente,
                    idServizio: ele.id_servizio_ente,
                  }));
                }
                if (checkAdmin(datiLogin)) {
                  return history.push(generatePath(PAGE_ADMIN_ENTE_GOI_005_URL, {
                    idEnte: id_ente,
                    idServizio: ele.id_servizio_ente,
                  }));
                }
              }}
              value="Modifica"
            />
            {/* </NavLink> */}
          </StyledColumn>
        </Row>
)}

      <Row fluid justifycontent="space-between" alignitems="center" display="flex">
        <StyledColumn xs="5" padding="1em 0 0">
          <Text
            tag="p"
            align="left!important"
            size="f7"
            value="Visualizza la scheda del servizio offerto"
          />
        </StyledColumn>
        <StyledColumn xs="6" lg="5" padding="1em 0 0">
          <Button
            onClick={() => {
              sessionStorage.setItem('occorenza_servizio', ele.id_servizio_ente);
              if (checkEnte(datiLogin)) {
                return history.push(generatePath(PAGE_VISUALIZZA_ENTE_GOI_005_URL, {
                  idEnte: id_ente,
                  idServizio: ele.id_servizio_ente,
                }));
              }
              if (checkAdmin(datiLogin)) {
                return history.push(generatePath(PAGE_ADMIN_VISUALIZZA_ENTE_GOI_005_URL, {
                  idEnte: id_ente,
                  idServizio: ele.id_servizio_ente,
                }));
              }
            }}
            intlFormatter
            weight="normal"
            value="Visualizza"
          />

        </StyledColumn>
      </Row>


    </Row>
  );
};

DrawerBody.displayName = 'DrawerBody';

const mapStoreToProps = store => ({
  locale: store.locale,
});

const mapDispatchToProps = {
  addCart,
  graphqlRequest,
};

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(DrawerBody));

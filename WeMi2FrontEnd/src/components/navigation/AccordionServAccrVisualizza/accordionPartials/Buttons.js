import React, { useState, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import Button from 'components/ui/Button';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Navlink from 'components/router/NavLink';
import withAuthentication from 'hoc/withAuthentication';
import { PAGE_ADMIN_ENTE_GOI_004_URL, PAGE_ENTE_GOI_004_URL } from 'types/url';
import { generatePath } from 'react-router';
import checkEnte from 'utils/functions/checkEnte';
import checkAdmin from 'utils/functions/checkAdmin';


const Buttons = ({ userProfile, note, key3, datacalendario, primocont, datiservizio1, sede1, datip, datis, datipr, sostec, graphqlRequest, locale, EstraiDettaglioAmministrativoServizioEnte }) => {
  const datiLogin = userProfile;


  const JsonDisponibilita = (disponibilita) => {
    const giorni = [
      'Lunedì',
      'Martedì',
      'Mercoledì',
      'Giovedì',
      'Venerdì',
      'Sabato',
      'Domenica'];
    const calendario = [];
    if (disponibilita) {
      for (let i = 0; i < disponibilita.length; i++) {
        let MA; let MD; let PD; let
PA;
        for (let y = 0; y < disponibilita[i].fascia.length; y++) {
          let cont1 = 0;
          let cont2 = 0;

          for (let t = 0; t < disponibilita[i].fascia[y].ore.length; t++) {
            if (y == 0) {
              if (disponibilita[i].fascia[y].ore[t].attivo == true) {
                cont1++;
                if (cont1 == 1) MD = disponibilita[i].fascia[y].ore[t].txValue;
                if (cont1 == 2) {
                  MA = disponibilita[i].fascia[y].ore[t].txValue;
                }
              }
            } else
                  if (y == 1) {
                    if (disponibilita[i].fascia[y].ore[t].attivo == true) {
                      cont2++;
                      if (cont2 == 1) PD = disponibilita[i].fascia[y].ore[t].txValue;
                      if (cont2 == 2) {
                        PA = disponibilita[i].fascia[y].ore[t].txValue;
                      }
                    }
                  }
          }
        }
        calendario.push({
          giorno: giorni[i],
          disponibilita: [
            MD ? {
              oraDa: MD,
              fascia: 'Mattino',
              oraA: MA,
            } : null,
            PD ? {
              oraDa: PD,
              fascia: 'Pomeriggio',
              oraA: PA,
            } : null,
          ],
        });
      }
    }


    const calendario2 = {
      calendario,
    };

    return (
      calendario2
    );
  };


  if (checkEnte(datiLogin)) {
    return (
      <div style={{ marginTop: '4em' }}>
        <Row>
          <Column lg={3} md={3}>
            <Navlink
              width="100%"
              to={
              generatePath(PAGE_ENTE_GOI_004_URL, {
                idEnte: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.id_ente,
              })
            }
            >
              <Button value="Annulla" style={{ backgroundColor: 'white', color: 'blue' }} />
            </Navlink>
          </Column>
        </Row>
      </div>
    );
  } if (checkAdmin(datiLogin)) {
    return (
      <div style={{ marginTop: '4em' }}>
        <Row>
          <Column lg={2} md={2} padding="0.5em">
            <Navlink
              width="100%"
              to={
              generatePath(PAGE_ADMIN_ENTE_GOI_004_URL, {
                idEnte: EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.id_ente,
              })
            }
            >
              <Button value="Annulla" type="cancel" />
            </Navlink>
          </Column>
        </Row>
      </div>
    );
  }
};
const mapDispatchToProps = ({
  graphqlRequest,
});
const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte,
});

export default connect(
            mapStoreToProps,
            mapDispatchToProps
          )(withAuthentication(Buttons));

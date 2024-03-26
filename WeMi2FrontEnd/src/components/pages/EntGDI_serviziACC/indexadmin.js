/** @format */

import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router';
import AccordionServAcc from 'components/navigation/AccordionServAccr';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Wrapper from 'components/navigation/NavigationWrapper';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/navigation/Breadcrumbs';

import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import Loader from 'components/ui/Loader';
import checkEnte from 'utils/functions/checkEnte';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';
import withAuthentication from 'hoc/withAuthentication';
import { parseData, getModificable } from './utils';
import { EstraiDettaglioAmministrativoServizioEnte as EstraiDettaglioAmministrativoServizioEnteQ } from './EntGOI005GraphQL';

const ServiziAccrAdmin = ({
  ReadOnly,
  userProfile,
  EstraiDettaglioAmministrativoServizioEnte,
  locale,
  graphqlRequest,
  match,
}) => {
  const [formGoi005, setFormGoi005] = useState();
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const datiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const { datiLogin } = userProfile;
  const { idEnte, idServizio } = match.params;

  const firstDataFetch = useRef(true);
  const estraiDati = React.useCallback(() => {
    setFormGoi005(null);
    graphqlRequest(EstraiDettaglioAmministrativoServizioEnteQ(idServizio, idEnte));
  });

  useEffect(
    () => {
      estraiDati();
    },
    []
  );

  useEffect(
    () => {
      if (firstDataFetch.current) {
        firstDataFetch.current = false;
        return;
      }

      const state = parseData(EstraiDettaglioAmministrativoServizioEnte, locale);
      const listaServizi = EstraiDettaglioAmministrativoServizioEnte.EstraiServizioErogatoEnte004;

      let cdStato;
      for (let index = 0; index <= listaServizi.length; index++) {
        const servizio = listaServizi[index];

        if (servizio.id_servizio_ente == idServizio) {
          cdStato = servizio.cd_stato_dati_servizio_ente;
          break;
        }
      }

      state.cdStatoDati = cdStato;
      // const datiLogin = sessionStorage.getItem('DatiLogin') && JSON.parse(sessionStorage.getItem('DatiLogin'));
      state.datiLogin = datiLogin;
      if (ReadOnly) {
        state.modifica = { campi: false, note: false };
      } else {
        state.modifica = getModificable(cdStato, datiLogin.Profilo);
      }
      setFormGoi005(state);
    },
    [EstraiDettaglioAmministrativoServizioEnte]
  );

  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'AreaPersonale',
    },
    {
      slash: 'Servizi erogati',
      url: `/admin/gestioneEnte/${window.location.pathname.split('/admin/gestioneEnte/')[1].split('/SchedaServiziEnte/')[0]}/SchedaServiziEnte`,
    },
    {
      slash: 'Gestione Scheda servizio enti',
      url: 'gestioneEnte',
    },
  ];

  const validitaEnte = checkEnte(datiLogin);
  const validitaAdmin = checkAdmin(datiLogin);
  return (
    <Wrapper>
      {
        validitaEnte || validitaAdmin ?
          EstraiDettaglioAmministrativoServizioEnte && formGoi005 ? (
            <>
              <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
              <Row fluid padding="20px">
                <Text size="f3" value="Scheda " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
                <Text size="f3" value="Servizio" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
                <Text
                  size="f3"
                  value={EstraiDettaglioAmministrativoServizioEnte
                    && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.service &&
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio ?
                    EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale] : null}
                  color="darkGrey"
                  transform="uppercase"
                  weight="bold"
                  padding="0 0.5em 0 0"
                />
                <Text size="f3" value="Ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
                <Text
                  size="f3"
                  value={EstraiDettaglioAmministrativoServizioEnte
                    && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente}
                  color="darkGrey"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  weight="bold"
                  padding="0 0.5em 0 0"
                />
              </Row>
              <Row>
                <AccordionServAcc Form={formGoi005} ReadOnly={ReadOnly}  estraiDati={estraiDati} />
              </Row>
            </>
          )
            : <Loader></Loader>
          : <RedirectAdmin />
      }

    </Wrapper>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
  resetField,
};

const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte,
  goi005: store.goi005,
});

ServiziAccrAdmin.displayName = 'ServiziAccr';
const ServiziAccreAdminWithAuth = withAuthentication(ServiziAccrAdmin);
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(withRouter(ServiziAccreAdminWithAuth));

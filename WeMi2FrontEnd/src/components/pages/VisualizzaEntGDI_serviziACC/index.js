/** @format */

import React from 'react';
import AccordionServAcc from 'components/navigation/AccordionServAccrVisualizza';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Wrapper from 'components/navigation/NavigationWrapper';
import { connect } from "react-redux";
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import withAuthentication from 'hoc/withAuthentication';

const ServiziAccr = ({ EstraiDettaglioAmministrativoServizioEnte,locale, match, userProfile }) => {
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const {datiLogin} = strDatiLogin && JSON.parse(strDatiLogin);
  const { datiLogin } = userProfile;
  if (datiLogin && datiLogin.Ruolo === "Amministratore WeMi"||"Ente") {

    const BreadcrumbPath = [
      {
        slash: 'Home',
        url: ``
      },
      {
        slash: 'Area personale',
        url: `AreaPersonale`
      },
       {
        slash: 'Servizi erogati',
        url: `/gestioneEnte/${window.location.pathname.split('/gestioneEnte/')[1].split('/SchedaServiziEnte/')[0]}/SchedaServiziEnte`
      },
      {
        slash: 'Gestione Scheda servizio enti',
        url: 'gestioneEnte',
      },
    ];

    return (
      <Wrapper>

        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />

        <Row fluid padding="20px">
          <Text size="f3" value="Scheda " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
          <Text size="f3" value="Servizio" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
          <Text size="f3" value={EstraiDettaglioAmministrativoServizioEnte
           && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte &&
           EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.service &&
           EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio?
           EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.service.txTitoloServizio[locale]:null}
           color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
            <Text size="f3" value="Ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value={EstraiDettaglioAmministrativoServizioEnte
           && EstraiDettaglioAmministrativoServizioEnte.EstraiDettaglioAmministrativoServizioEnte.ente.nm_ente}
           color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
        </Row>

        <Row>
          <AccordionServAcc idEnte={match.params.idEnte} idServizio={match.params.idServizio} login={datiLogin && datiLogin.Ruolo} dati={EstraiDettaglioAmministrativoServizioEnte}/>
        </Row>

      </Wrapper>
    )
  }
};



const mapStoreToProps = store => ({
  locale: store.locale,
  EstraiDettaglioAmministrativoServizioEnte: store.graphql.EstraiDettaglioAmministrativoServizioEnte
})

ServiziAccr.displayName = 'ServiziAccr';

export default connect(
  mapStoreToProps
)(withAuthentication(ServiziAccr));

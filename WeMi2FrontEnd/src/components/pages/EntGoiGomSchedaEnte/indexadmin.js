/** @format */

import React, { useEffect, useState } from 'react';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import AccordionSchedaEnte from 'components/navigation/EntSchedaEnte/AccordionSchedaEnte';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import {
  EstraiDatiPropriEnteR as EstraiDatiPropriEnteQ,
} from 'components/pages/DatiEnte/enteGraphQL';
import { connect } from 'react-redux';
import withAuthentication from 'hoc/withAuthentication';

const SchedaEnteAdmin = ({ userProfile, match, graphqlRequest, EstraiDatiPropriEnte }) => {

  useEffect(() => {
    graphqlRequest(EstraiDatiPropriEnteQ(match.params.idEnte));
  },
    []);
  // la nomenclatura andrebbe rivista, questo componente richiama gli accordion della GOI_003 (AccordionSchedaEnt)
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const datiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const { datiLogin } = userProfile;

  const BreadcrumbPathAdmin = [
    {
      slash: 'Homepage',
      url: ``
    },
    {
      slash: 'Area personale',
      url: `AreaPersonale`
    },
    {
      slash: 'Gestione Enti',
      url: `gestioneEnti`
    },
    {
      slash: 'Scheda Ente',
      url: `admin/gestioneEnte/SchedaEnte/${window.location.pathname.split('SchedaEnte/')[1]}`
    },
  ];

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPathAdmin} />
      <Row fluid padding="20px">
        {EstraiDatiPropriEnte &&
          <>
            <Text size="f3" value="Scheda" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value="Ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
            <Text size="f3" value={EstraiDatiPropriEnte.nm_ente} color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
          </>}
      </Row>
      <Row>
        <AccordionSchedaEnte idEnte={match.params.idEnte} login={datiLogin.Ruolo} />
      </Row>
    </Wrapper>
  )
};
const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { EstraiDatiPropriEnte, loaded } = graphql;
  return {
    EstraiDatiPropriEnte
  };
}

SchedaEnteAdmin.displayName = 'SchedaEnteAdmin';

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(SchedaEnteAdmin));

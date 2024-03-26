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
import checkEnte from 'utils/functions/checkEnte';
import { PAGE_HOME_URL } from 'types/url';
import { withRouter } from 'react-router';

const SchedaEnte = ({ userProfile, match, graphqlRequest, EstraiDatiPropriEnte, history }) => {
  useEffect(() => {
    graphqlRequest(EstraiDatiPropriEnteQ(match.params.idEnte));
  },
    []);
// la nomenclatura andrebbe rivista, questo componente richiama gli accordion della GOI_003 (AccordionSchedaEnt)
  // const strDatiLogin = sessionStorage.getItem('DatiLogin');
  // const datiLogin = strDatiLogin && JSON.parse(strDatiLogin);
  const { datiLogin } = userProfile;

  const BreadcrumbPath = [
    {
      slash: 'Homepage',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'AreaPersonale',
    },
    {
      slash: 'Scheda Ente',
      url: `SchedaEnte/${window.location.pathname.split('SchedaEnte/')[1]}`,
    },
  ];

  if (!checkEnte(datiLogin)) {
    history.push(PAGE_HOME_URL);
  }
  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Row fluid padding="20px">
        <Text size="f3" value="Scheda " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
        <Text size="f3" value="Ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
        <Text size="f3" value={EstraiDatiPropriEnte && EstraiDatiPropriEnte.nm_ente} color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
      </Row>

      <Row>
        <AccordionSchedaEnte idEnte={match.params.idEnte} />
      </Row>
    </Wrapper>
  );
};
const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql } = state;
  const { EstraiDatiPropriEnte, loaded } = graphql;
  return {
    EstraiDatiPropriEnte,
  };
}

SchedaEnte.displayName = 'SchedaEnte';

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(withRouter(SchedaEnte)));

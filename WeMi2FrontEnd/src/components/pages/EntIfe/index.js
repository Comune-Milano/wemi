/** @format */

import React from 'react';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import withAuthentication from 'hoc/withAuthentication';
import EntRecensione from 'components/navigation/EntRecensione';
import Header from 'components/ui2/Header';
import { Row, Column } from 'components/ui/Grid';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkCittadino from 'utils/functions/checkCittadino';
import { PAGE_HOME_URL } from 'types/url';
import { withRouter } from 'react-router';


const EntIfe = ({ match, loaded, userProfile, history }) => {
  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);
  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: 'homepage',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      slash: 'Storico delle richieste',
      url: 'r/idRequestsIndex',
    },
    {
      slash: 'Visualizza recensione servizio ente',
      url: window.location.pathname,
    },
  ];

  if (!validitaCittadino) {
    history.push(PAGE_HOME_URL);
  }
  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
      <Header loading={loaded === 1} fontSize="f4" title="Recensione servizio" color="blue" />
      <Row fluid margin="1em 0">
        <Column xs="12" md="8" lg="7" padding="0 0 0 0">
          <EntRecensione New match={match} />
        </Column>
      </Row>
    </Wrapper>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
};

const mapStoreToProps = store => ({
  error: store.graphql,
  loaded: store.graphql.loaded,
});


EntIfe.displayName = 'EntIfe';
const EntiFeWithAuth = withAuthentication(EntIfe);


export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(withRouter(EntiFeWithAuth));

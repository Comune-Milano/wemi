/** @format */

import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/ui2/Header';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import RequestsIndex from 'components/navigation/RequestsIndex';
import Wrapper from 'components/navigation/NavigationWrapper';
import checkCittadino from 'utils/functions/checkCittadino';
import RedirectAdmin from 'components/router/RedirectAdmin';
import withAuthentication from 'hoc/withAuthentication';

const RequestsIndexPage = ({ userProfile }) => {
  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'areaPersonale',
    },
    {
      // slash:  'RequestsIndex.header.breadcrumb',
      slash: 'STORICO DELLE RICHIESTE',
      url: 'r/idRequestsIndex',
    },

  ];
  const { datiLogin } = userProfile;
  const validitaCittadino = checkCittadino(datiLogin);
  return (
    <Wrapper>
      {!validitaCittadino ?
        <RedirectAdmin />
        : (
          <>
            <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />

            <Header fontSize="f4" title="Storico delle richieste" color="blue" />

            <RequestsIndex />
          </>
      )}
    </Wrapper>
  );
};

RequestsIndexPage.displayName = 'RequestsIndexPage';
// RequestsIndexPage.propTypes = RequestsIndexPagePropTypes;
const RequestsIndexPageWithAuth = withAuthentication(RequestsIndexPage);
const mapStoreToProps = store => ({
  pathname: store.graphql.servizioSelezionato,
  locale: store.locale,
  servizio: store.graphql.servizioSelezionato,
  loaded: store.graphql.loaded,
});
export default connect(mapStoreToProps, null)(RequestsIndexPageWithAuth);

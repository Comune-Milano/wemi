/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import EntRecensione from 'components/navigation/EntRecensione';
import Wrapper from 'components/navigation/NavigationWrapper';
import Header from 'components/ui2/Header';
import withAuthentication from 'hoc/withAuthentication';
import { withRouter, generatePath } from 'react-router';
import { numberRegex } from 'libs/Form/validation/regex';
import { PAGE_HOME_URL, PAGE_ENTERI001FEEDBACKS_URL, PAGE_RECENSIONE_ADMIN_URL } from 'types/url';

const EntFeedbackPage = ({ loaded, userProfile, location, match, history }) => {
  // const DatiLogin = JSON.parse(sessionStorage.getItem('DatiLogin'))
  const { datiLogin } = userProfile;
  const { idRichiesta } = match.params;

  const regexRichiesta = new RegExp(numberRegex, 'ig');

  if (!regexRichiesta.test(idRichiesta)) {
    history.push(PAGE_HOME_URL);
  }

    const BreadcrumbPath = [
      {
        slash: 'Home',
        url: '',
      },
      {
        slash: 'Area Personale',
        url: 'AreaPersonale/',
      },
      {
        slash: 'Gestione feedback',
        url:  generatePath(PAGE_ENTERI001FEEDBACKS_URL, {idEnte: datiLogin.idEnte}),
      },
      {
        slash: `Recensione richiesta di servizio ${idRichiesta}`,
        url: generatePath(PAGE_RECENSIONE_ADMIN_URL, {idRichiesta}),
      },
    ];

    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Header loading={loaded === 1} fontSize="f4" title="Recensione servizio" color="blue" />
        <Row fluid margin="1em 0">
          <Column xs="12" md="8" lg="7" padding="0 0 0 0">
            <EntRecensione 
              readOnly={false} 
              confirmFromFeedback
            />
          </Column>
        </Row>
      </Wrapper>
    );

};

EntFeedbackPage.displayName = 'EntFeedbackPage';
// EntFeedbackPage.propTypes = EntHandleRequestsPagePropTypes;

const mapStoreToProps = store => ({
  locale: store.locale,
  loaded: store.graphql.loaded,

});
const mapDispatchToProps = ({
  graphqlRequest,
});

const EntFeedbackPageWithAuth = withAuthentication(EntFeedbackPage);
export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(EntFeedbackPageWithAuth));

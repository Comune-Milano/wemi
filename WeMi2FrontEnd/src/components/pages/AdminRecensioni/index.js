/** @format */

import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {graphqlRequest} from 'redux-modules/actions/authActions';
import Text from 'components/ui/Text';
import {Row} from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import EntRecensione from 'components/navigation/EntRecensione';
import Wrapper from 'components/navigation/NavigationWrapper';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';



const EntFeedbackPage = ({userProfile}) => {
  const BreadcrumbPath = [
    {
      slash:  'Gestione Richieste Servizi Ente',
      url: 'e/rec/'
    },
  ];
  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);

  return(
    <Wrapper>
      {!validitaAdmin? <RedirectAdmin /> : 
        <>
          <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
          <Row fluid padding="20px">
            {/* <Header 
              title="Visualizza recensione "
              titleBold="servizio ente"
              fontSize="f1"
      /> */}
            <Text size="f3" value="Visualizza " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value="recensione " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
            <Text size="f3" value="servizio " color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
            <Text size="f3" value="Ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
          </Row>

          <Row fluid padding="20px">
            <EntRecensione />
          </Row>
      </>}
    
    </Wrapper>
)
};

EntFeedbackPage.displayName = 'EntFeedbackPage';
// EntFeedbackPage.propTypes = EntHandleRequestsPagePropTypes;

const mapStoreToProps = store => ({
  locale: store.locale
 
});
const mapDispatchToProps = ({
  graphqlRequest
})
export default connect(mapStoreToProps, mapDispatchToProps)(withAuthentication(EntFeedbackPage));

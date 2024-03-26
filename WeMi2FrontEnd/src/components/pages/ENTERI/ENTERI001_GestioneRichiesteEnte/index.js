/** @format */

import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import EntHandleRequests from 'components/navigation/EntHandleRequests';
import withAuthentication from 'hoc/withAuthentication';
import RedirectAdmin from 'components/router/RedirectAdmin';
import checkEnte from 'utils/functions/checkEnte';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { requestStates, feedbackState, serviceTipology } from 'components/navigation/EntHandleRequests/constants';
import { estraiRichiestePerIdEnteNew as estraiRichiestePerIdEnteNewQ } from './graphql/HandleRequestsGraphQL';

const EntHandleRequestsPage = ({ match, userProfile, locale }) => {
  const { datiLogin } = userProfile;
  const validitaEnte = checkEnte(datiLogin);
  const [richiesteEnteNew, getRichiesteEnte] = useGraphQLRequest(
    undefined,
    estraiRichiestePerIdEnteNewQ,
    {
      input: {
        idEnteErogatore: datiLogin.idEnte,
        numeroElementi: 0,
        statoRichiestaBase: requestStates[0].id.toString(),
        statoFeedback: feedbackState[0].id.toString(),
        tipoServizio: parseInt(serviceTipology[0].id, 10),
      },
    },
    true
  );

  if (validitaEnte) {
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
        slash: 'Gestione Richieste Servizi Ente',
        url: match.url,
      },
    ];


    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Row fluid padding="20px">
          <Text size="f3" value="Gestione Richieste Servizi ente" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
          <EntHandleRequests
            isEnte
            richiesteEnte={richiesteEnteNew}
            locale={locale}
            getRichiesteEnte={getRichiesteEnte}
            datiLogin={datiLogin}
            initialDataset={{
              statoRichiesta: requestStates[0],
              statoFeedback: feedbackState[0],
              tipologia: serviceTipology[0],
            }}
          />
        </Row>
      </Wrapper>
    );
  }

  return <RedirectAdmin />;
};

EntHandleRequestsPage.displayName = 'EntHandleRequestsPage';
// EntHandleRequestsPage.propTypes = EntHandleRequestsPagePropTypes;

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(mapStoreToProps)(withAuthentication(EntHandleRequestsPage));

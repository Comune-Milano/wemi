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
import { PAGE_AREAPERSONALE_URL, PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { requestStates, feedbackState, serviceTipology } from 'components/navigation/EntHandleRequests/constants';
import { estraiRichiestePerIdEnteNew as estraiRichiestePerIdEnteNewQ } from './graphql/HandleRequestsGraphQL';

const EntHandleRequestsPage = ({ userProfile, locale, match }) => {
  const { datiLogin } = userProfile;

  const validitaEnte = checkEnte(datiLogin);

  const [richiesteEnteNew, getRichiesteEnte] = useGraphQLRequest(
    undefined,
    estraiRichiestePerIdEnteNewQ,
    {
      input: {
        idEnteErogatore: datiLogin.idEnte,
        numeroElementi: 0,
        statoRichiestaBase: requestStates[7].id.toString(),
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
        url: PAGE_HOME_URL,
      },
      {
        slash: 'Area personale',
        url: PAGE_AREAPERSONALE_URL,
      },
      {
        slash: 'Gestione Feedback',
        url: match.url,
      },
    ];

    const isEnte = checkEnte(datiLogin);

    if (!isEnte) {
      return (<RedirectAdmin />);
    }

    const tableColumns = [
      'Codice Richiesta',
      'Codice Richiesta Ente',
      'Tipologia servizio',
      'Data richiesta',
      'Nome famiglia',
      'Operatore',
      'Stato Feedback',
      'Ultimo user',
      'Azioni',
    ];

    return (
      <Wrapper>
        <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
        <Row fluid padding="20px">
          <Text size="f3" value="Gestione Feedback" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
          <EntHandleRequests
            isEnte
            richiesteEnte={richiesteEnteNew}
            isFeedback
            locale={locale}
            tableColumns={tableColumns}
            datiLogin={datiLogin}
            getRichiesteEnte={getRichiesteEnte}
            initialDataset={{
              statoRichiesta: requestStates[7],
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

const mapStoreToProps = store => ({
  locale: store.locale,
});


export default connect(mapStoreToProps)(withAuthentication(EntHandleRequestsPage));

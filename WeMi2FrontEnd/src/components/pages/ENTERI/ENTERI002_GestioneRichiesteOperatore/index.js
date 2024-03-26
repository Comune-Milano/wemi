/** @format */

import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import EntHandleRequests from 'components/navigation/EntHandleRequests';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { Redirect } from 'react-router-dom';
import { PAGE_HOME_URL } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { estraiRichiesteEnteNew as estraiRichiesteEnteNewQ } from './HandleRequestsGraphQL';
import { requestStates, feedbackState, serviceTipology } from 'components/navigation/EntHandleRequests/constants';

const WeMiHandleRequestsPage = ({
  userProfile,
  locale,
}) => {
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
      slash: 'Gestione Richieste Servizi Operatore WeMi',
      url: `admin/${window.location.pathname.split('admin/')[1].split('/handlerequests')[0]}/handleRequests`,
    },
  ];
  const [richiesteEnteNew, getRichiesteEnte] = useGraphQLRequest(
    undefined,
    estraiRichiesteEnteNewQ,
    {
      input: {
        numeroElementi: 0,
        statoRichiestaBase: requestStates[0].id.toString(),
        statoFeedback: feedbackState[0].id.toString(),
        tipoServizio: parseInt(serviceTipology[0].id, 10),
      },
    },
    true
  );
  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);
  return (
    <Wrapper>
      {!validitaAdmin ?
        <Redirect to={PAGE_HOME_URL} />
        : (
          <>
            <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
            <Row fluid padding="20px">
              <Text size="f3" value="Gestione" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
              <Text size="f3" value="Richieste" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
              <Text size="f3" value="e" color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
              <Text size="f3" value="Servizi Amministratore WeMi" color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
              <EntHandleRequests
                richiesteEnte={richiesteEnteNew}
                locale={locale}
                getRichiesteEnte={getRichiesteEnte}
                initialDataset={{
                  statoRichiesta: requestStates[0],
                  statoFeedback: feedbackState[0],
                  tipologia: serviceTipology[0],
                }}
              />
            </Row>
          </>
      )}
    </Wrapper>
  );
};

WeMiHandleRequestsPage.displayName = 'WeMiHandleRequestsPage';
// WeMiHandleRequestsPage.propTypes = WeMiHandleRequestsPagePropTypes;
const WeMiHandleRequestsPageWithAuth = withAuthentication(WeMiHandleRequestsPage);
const mapStoreToProps = store => ({
  locale: store.locale,

});

export default connect(mapStoreToProps)(WeMiHandleRequestsPageWithAuth);

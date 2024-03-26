
import React, { memo, useEffect } from 'react';
import {
  Route,
  withRouter,
  Redirect,
  generatePath,
} from 'react-router-dom';
import {
  PAGE_ORDERBILLING_URL,
  PAGE_ORDERSUMMARY_URL,
} from 'types/url';
import Loader from 'components/ui2/Loader';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import withAuthentication from 'hoc/withAuthentication';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { checkLoginHoc } from 'hoc/checklogin';
import BillingFormContainer from './partials/BillingForm/BillingFormContainer';
import { matchOrderSubroutes } from './utils/routesMatcher';
import BillingFormSwitcher from './partials/BillingForm/BillingFormSwitcher';
import OrderSummary from './partials/OrderSummary';
import { ServiceOrderContextProvider } from './context/ServiceOrderContext';
import {
  estraiDatiRichiestaServizioEnte as datiRichiestaServizioEnteDefinition,
  latestPaymentInfoQuery,
} from './graphqlRequests/graphQLRequests';

/**
 * Handles the order for a service.
 */
const HandleOrder = ({
  location,
  match,
}) => {
  // Dati richiesta servizio.
  const [
    datiRichiestaServizioEnte,
    estraiDatiRichiestaServizioEnte,
  ] = useGraphQLRequest({}, datiRichiestaServizioEnteDefinition);

  // Dati relativi all'ultimo pagamento effettuato.
  const [
    latestPaymentInfo,
    fetchLatestPaymentInfo,
  ] = useGraphQLRequest({}, latestPaymentInfoQuery);

  // ID richiesta servizio.
  const { idRichiestaServizio } = match.params;

  // Triggers data fetching from the backend.
  useEffect(
    () => {
      estraiDatiRichiestaServizioEnte({
        idRichiestaServizioEnte: parseInt(idRichiestaServizio, 10),
      });

      fetchLatestPaymentInfo();
    },
    []
  );

  // A flag telling if a redirect to the billing page is needed.
  // It is so only if we're neither in order billing or summary
  // page (the "path" of order is not matched with exact to allow
  // having child routes).
  const shouldRedirect = !matchOrderSubroutes(location.pathname);

  // Waiting for api requests to be dispatched.
  if (datiRichiestaServizioEnte.pristine && latestPaymentInfo.pristine) {
    return null;
  }

  // Shows a loader while there are pending requests.
  if (datiRichiestaServizioEnte.isLoading || latestPaymentInfo.isLoading) {
    return <Loader />;
  }

  if (!datiRichiestaServizioEnte.isLoading && datiRichiestaServizioEnte.errored) {
    return null;
  }
  // Renders order sub-paths.
  return (
    <>
      {
        shouldRedirect ?
          (
            <Redirect
              to={generatePath(PAGE_ORDERBILLING_URL, {
                idRichiestaServizio,
              })}
            />
          ) :
          null
      }
      <ServiceOrderContextProvider>
        <BillingFormContainer>
          <Route
            exact
            path={PAGE_ORDERBILLING_URL}
            render={(props) => (
              <BillingFormSwitcher
                {...props}
                infoRichiestaEnte={datiRichiestaServizioEnte.data}
                latestBillingInfo={getObjectValue(latestPaymentInfo.data, 'jsDatiFatturazione')}
              />
            )}
          />
          <Route
            exact
            path={PAGE_ORDERSUMMARY_URL}
            render={(props) => (
              <OrderSummary
                {...props}
                infoRichiestaEnte={datiRichiestaServizioEnte.data}
              />
            )}
          />
        </BillingFormContainer>
      </ServiceOrderContextProvider>
    </>
  );
};

HandleOrder.displayName = 'HandlerOrder';

export default withRouter(
  withAuthentication(
    memo(HandleOrder)
  )
);

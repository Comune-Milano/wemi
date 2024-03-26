
import React, { memo } from 'react';
import { withRouter, generatePath } from "react-router-dom";
import Stepper from 'components/ui2/Header/Stepper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import {
  matchOrderBillingRoute,
  matchOrderSummaryRoute,
} from 'components/navigation/HandleServiceOrder/utils/routesMatcher';
import { PAGE_ORDERBILLING_URL, PAGE_ORDERSUMMARY_URL } from 'types/url';

const OrderHeader = ({ location, match, history }) => {
  const { pathname } = location;
  const isBillingActive = matchOrderBillingRoute(pathname);
  const isSummaryActive = matchOrderSummaryRoute(pathname);

  /**
   * The steps list to be provided to the stepper.
   */
  const steps = [
    {
      title: 'Concludi l\'ordine',
      color: 'primary',
      link: !isBillingActive ?
        `/r/idRequestsIndex/${match.params.idRichiestaServizio}/Order/billing` :
        null,
      active: isBillingActive,
      onClickStepHandler: () => {
        const path = generatePath(PAGE_ORDERBILLING_URL, { idRichiestaServizio: match.params.idRichiestaServizio })
        history.push(path);
      },

    },
    {
      title: 'Conferma l\'acquisto',
      color: 'green',
      link: null,
      active: isSummaryActive,
      onClickStepHandler: () => {
        const path = generatePath(PAGE_ORDERSUMMARY_URL, { idRichiestaServizio: match.params.idRichiestaServizio })
        history.push(path);
      },
    },
  ];

  /**
   * The paths of the breadcrumb.
   */
  const breadcrumbPaths = [
    {
      slash: 'Home',
      url: '',
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
      slash: 'Gestione ordine',
      url: `r/idRequestsIndex/${match.params.idRichiestaServizio}/Order/billing`,
    },
  ].concat(
    isSummaryActive ? {
      slash: 'Conferma l\'acquisto',
      url: `r/idRequestsIndex/${match.params.idRichiestaServizio}/Order/orderSummary`,
    } : []
  );

  return (
    <>
      <Breadcrumbs
        value="Breadcrumb.page"
        pathSlashes={breadcrumbPaths}
      />
      <Stepper steps={steps}></Stepper>
    </>
  );
};

OrderHeader.displayName = 'ServiceOrderHeader';

export default withRouter(
  memo(OrderHeader)
);

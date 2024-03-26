
import { matchPath } from 'react-router-dom';
import {
  PAGE_ORDERBILLING_URL,
  PAGE_ORDERSUMMARY_URL,
} from 'types/url';

/**
 * Allows to determine if the given path name matches one
 * of the order subroutes (i.e. billing or summary).
 * @param {*} pathname
 */
export const matchOrderSubroutes = pathname => {
  const matchOrderBilling = matchPath(pathname, {
    path: PAGE_ORDERBILLING_URL,
    exact: true,
    strict: true,
  });

  if (matchOrderBilling) {
    return true;
  }

  const matchOrderSummary = matchPath(pathname, {
    path: PAGE_ORDERSUMMARY_URL,
    exact: true,
    strict: true,
  });

  return !!matchOrderSummary;
};

/**
 * Allows to determine if the given path name matches
 * the billing sub-route of the service order page.
 * @param {*} pathname
 */
export const matchOrderBillingRoute = pathname => !!matchPath(pathname, {
  path: PAGE_ORDERBILLING_URL,
  exact: true,
  strict: true,
});

/**
 * Allows to determine if the given path name matches
 * the summary sub-route of the service order page.
 * @param {*} pathname
 */
export const matchOrderSummaryRoute = pathname => !!matchPath(pathname, {
  path: PAGE_ORDERSUMMARY_URL,
  exact: true,
  strict: true,
});

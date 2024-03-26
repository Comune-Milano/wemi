import { matchPath } from 'react-router-dom';
import { 
  PAGE_ENTI_SERVICES_SEARCH_URL,
  PAGE_ENTI_SERVICE_FLOW,
  PAGE_REQUESTSERVICE_URL,
} from 'types/url';

/**
 * Allows to determine if the given path name matches one
 * of the order subroutes (i.e. billing or summary).
 * @param {*} pathname
 */
export const matchReqServiceFlowSubroutes = pathname => {
  const matchSearchServiceUrl = matchPath(pathname, {
    path: PAGE_ENTI_SERVICES_SEARCH_URL,
    exact: true,
    strict: true,
  });

  if (matchSearchServiceUrl) {
    return true;
  }

  const matchRequestServiceUrl = matchPath(pathname, {
    path: PAGE_REQUESTSERVICE_URL,
    exact: true,
    strict: true,
  });

  return !!matchRequestServiceUrl;
};

/**
 * Allows to determine if the given path name matches
 * the billing sub-route of the service order page.
 * @param {*} pathname
 */
export const matchReqServiceFlowUrl = pathname => !!matchPath(pathname, {
  path: PAGE_ENTI_SERVICE_FLOW,
  exact: false,
  strict: true,
});

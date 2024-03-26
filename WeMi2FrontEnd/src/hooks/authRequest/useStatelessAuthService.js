import { getObjectValue } from 'utils/extensions/objectExtensions';
import { useHttpClient } from 'hooks/httpClient/useHttpClient';
import { mapperUser } from 'services/Authentication/mapperUser';

/**
 * A custom hook to interact with Authentication Service REST API in a stateless way.
 */
export const useStatelessAuthService = (
  abortable = false
) => {
  // The http client.
  const authService = useHttpClient();

  /**
   * Tranforms the authentication response.
   * @param {Object} responsePromise
   */
  const transformAuthResponse = (responsePromise) => {
    return responsePromise
      .then(response => {

        const responseUser = getObjectValue(response, "user");

        return mapperUser(responseUser);
      })
      .catch(_ => {
        return null;
      });

  };

  /**
   * 
   * @param {*} endpoint 
   * @param {*} headersParams 
   */
  const performRequest = (endpoint = "authentication", headersParams = {}) => {

    const headers = {
      ...headersParams,
      method: "GET"
    };

    if (abortable) {
      const [response, abortController] = authService.performAbortableHttpRequest(endpoint, headers);
      const transformedResponse = transformAuthResponse(response);

      return [transformedResponse, abortController];
    }

    const response = authService.performHttpRequest(endpoint, headers);
    return transformAuthResponse(response);

  };

  return performRequest;
};


import { useErrorManager } from 'errors/services/useErrorManager';
import { useGraphQLClient } from 'hooks/graphQLClient/useGraphQLClient';
import { getObjectValue } from '../../utils/extensions/objectExtensions';

/**
 * A custom hook to interact with GrapqhQL backend API
 * in a stateless way.
 */
export const useStatelessGraphQLRequest = (
  request,
  requestVariables = {},
  responseTransformer,
  abortable,
  skipErrorHandling,
) => {
  // The GraphQL client.
  const graphQLClient = useGraphQLClient();

  // The error manager.
  const errorManager = useErrorManager();

  /**
   * Tranforms the GraphQL response.
   * @param {*} response
   * @param {*} variables
   */
  const transformGraphQLResponse = (requestPromise, requestVariables) => {
    const [requestId, _, responseKey] = request;

    return requestPromise
      // Gets the graphQL payload.
      .then(response =>
        responseKey ? getObjectValue(response, responseKey) : response
      )
      // Applies the transformer, if any.
      .then(responseData =>
        responseTransformer ?
          responseTransformer(responseData, request, requestVariables) :
          responseData
      )
      // Encapsulate the transformed response under a given key, if provided.
      .then(transformedResponse =>
        requestId ? { [requestId]: transformedResponse } : transformedResponse
      )
      .catch(error => {
        if (!skipErrorHandling) {
          errorManager.handleError(error);
        } else {
          throw error;
        }
      });
  };

  /**
   * Performs the request.
   * @param {*} requestVariables The dynamic variables of graphql request.
   */
  const performRequest = variables => {
    if (!request) {
      return Promise.reject(
        new Error('useStatelessGraphQLRequest - No request provided.')
      );
    }

    const [_, requestDefinition] = request;

    const requestParams = {
      query: requestDefinition,
      variables: variables || requestVariables,
    };

    if (abortable) {
      const [requestPromise, abortController] = graphQLClient.performAbortableRequest(requestParams);
      const transformedResponse = transformGraphQLResponse(requestPromise);

      return [transformedResponse, abortController];
    }

    const requestPromise = graphQLClient.performRequest(requestParams);
    return transformGraphQLResponse(requestPromise);
  };

  return performRequest;
};

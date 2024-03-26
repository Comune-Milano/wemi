
import { createContext } from 'react';
import { useHttpClient } from "hooks/httpClient/useHttpClient";
import { GraphQLApiError } from "errors/api/definitions/GraphQLApiError";
import { useSubscriptionClient } from 'hooks/subscriptionClient/useSubscriptionClient';

export const SubscriptionClientContext = createContext();

export const useGraphQLClient = (
  baseUrl,
  relativeUrl = 'graphql',
) => {
  // The http client.
  const { performHttpRequest, performAbortableHttpRequest } = useHttpClient(baseUrl);

  // The subscription client.
  const subscriptionClient = useSubscriptionClient();

  /**
   * Handles a GraphQL response.
   * @param {*} response
   */
  const handleGraphQLResponse = (response) => {
    // Catch any error returned by the GraphQL backend.
    const { errors, data } = response;
    if (errors) {
      throw new GraphQLApiError(
        'GraphQLError - An error occurred while querying GraphQL API',
        errors,
        data
      );
    }
    return data;
  };

  /**
   * Get the options for the GraphQL request.
   * @param {*} operation
   * @param {*} options
   */
  const getRequestOptions = (operation, options) => {
    return {
      ...options,
      body: JSON.stringify({
        query: operation.query,
        variables: operation.variables,
        operationName: operation.operationName,
      }),
    };
  }; 

  /**
   * Performs a request against the graphql backend.
   * @param {*} operation
   * @param {*} options
   */
  const performRequest = (operation = {}, options = {}) => {
    const reqOpts = getRequestOptions(operation, options);

    return performHttpRequest(relativeUrl, reqOpts)
      .then(handleGraphQLResponse);
  };

  /**
   * Performs a request against the graphql backend.
   * @param {*} operation
   * @param {*} options
   */
  const performAbortableRequest = (operation = {}, options = {}) => {
    const [requestPromise, abortController] = performAbortableHttpRequest(
      relativeUrl,
      getRequestOptions(operation, options)
    );

    const mappedRequestPromise = requestPromise.then(handleGraphQLResponse);
    return [mappedRequestPromise, abortController];
  };

  /**
   * Performs the subscription against the graphql interface.
   * @param {*} operations
   * @param {*} options
   */
  const performSubscription = operation => subscriptionClient.request(operation);

  return {
    performRequest,
    performAbortableRequest,
    performSubscription,
  };
};

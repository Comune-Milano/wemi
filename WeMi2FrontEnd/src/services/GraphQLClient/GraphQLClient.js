
import { GraphQLApiError } from 'errors/api/definitions/GraphQLApiError';
import { NetworkError } from 'errors/api/definitions/NetworkError';
import { __BASE_URL__ } from 'utils/environment/variables';

/**
 * A client to interact with GraphQL backend.
 * @deprecated
 */
export class GraphQLClient {
  constructor(url = 'graphql', method = 'POST', headers = {}) {
    this.host = window.location.origin + __BASE_URL__;
    this.url = `${this.host}/${url}`;

    this.method = method;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  /**
   * Performs the request to the GraphQL backend.
   */
  request(operation = {}) {
    const reqOpts = {
      method: this.method,
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        query: operation.query,
        variables: operation.variables,
        operationName: operation.operationName,
      }),
    };

    return fetch(this.url, reqOpts)
      .then(response => {
        // Handle any network errors.
        if (!response.ok) {
          return response.text()
            .then(body => {
              const { status, statusText } = response;
              throw new NetworkError(
                `${statusText || 'Network Error - Unkown Error'}`,
                status,
                statusText,
                body
              );
            });
        }
        // JSON conversion if there were no network error.
        return response.json();
      })
      .then(jsonResponse => {
        // Catch any error returned by the GraphQL backend.
        const { errors, data } = jsonResponse;
        if (errors) {
          throw new GraphQLApiError(
            'GraphQLError - An error occurred while querying GraphQL API',
            errors,
            data
          );
        }
        return data;
      });
  }
}


import { NetworkError } from "errors/api/definitions/NetworkError";
import { __BASE_URL__ } from 'utils/environment/variables';

export const useHttpClient = (
  baseUrl = window.location.origin + __BASE_URL__
) => {
  /**
   * Default request options.
   */
  const defaultOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  /**
   * Performs a fetch.
   * @param {*} url
   * @param {*} requestOptions
   */
  const performHttpRequest = (relativeUrl, requestOptions = {}) => {
    const url = `${baseUrl}/${relativeUrl}`;

    const { body, method, headers = {}, credentials, signal } = requestOptions;
    const mergedOptions = {
      method: method || defaultOptions.method,
      credentials: credentials || defaultOptions.credentials,
      signal,
      headers: {
        ...defaultOptions.headers,
        ...headers,
      },
      body,
    };

    return fetch(url, mergedOptions)
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
      });
  };

  /**
   * Performs an abortable fetch.
   * @param {*} url
   * @param {*} requestOptions
   */
  const performAbortableHttpRequest = (relativeUrl, requestOptions = {}) => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const requestPromise = performHttpRequest(relativeUrl, {
      ...requestOptions,
      signal,
    });

    return [requestPromise, abortController];
  };

  return { performHttpRequest, performAbortableHttpRequest };
};

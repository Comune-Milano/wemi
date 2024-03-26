
import { useRef, useEffect, useReducer } from 'react';

import { useErrorManager } from 'errors/services/useErrorManager';
import { isFunction } from 'utils/functions/typeCheckers';
import { graphQLDataApiReducer } from './reducer';
import { requestInit, requestSuccess, requestError } from './actionCreators';
import { useStatelessGraphQLRequest } from './useStatelessGraphQLRequest';

/**
 * A custom hook to interact with GrapqhQL backend API
 * in a statefull way.
 */
export const useGraphQLRequest = (
  initialData,
  request,
  requestVariables = {},
  fetchOnBootstrap = false,
  responseTransformer,
  onError,
) => {
  // The state of the request.
  const [state, dispatch] = useReducer(graphQLDataApiReducer, {
    pristine: true,
    isLoading: false,
    errored: false,
    data: initialData,
  });

  // The hook to perform a stateless GraphQL request.
  const performStatelessRequest = useStatelessGraphQLRequest(
    request,
    requestVariables,
    responseTransformer,
    false, // We use the stateless hook to perform an abortable request
    true, // Errors are handled locally
  );

  // The error manager.
  const errorManager = useErrorManager();

  // Tells if the component is actually mounted or not.
  const isMounted = useRef(true);

  /**
   * The effect to keep track of mounting and
   * unmounting of the component.
   */
  useEffect(() => {
    isMounted.current = true;

    if (fetchOnBootstrap) {
      performRequest();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  /**
   * Performs the request.
   * @param {*} requestVariables The dynamic variables of graphql request.
   */
  const performRequest = async (variables) => {
    // Dispatch the action handling the initialization of the request.
    dispatch(requestInit());

    try {
      const response = await performStatelessRequest(variables);

      if (isMounted.current) {
        // Dispatch the action handling the successfull request.
        dispatch(requestSuccess(response));
      }

      return response;
    } catch (error) {
      if (isMounted.current) {
        // Dispatch the action handling the errored request.
        dispatch(requestError());
        // Let the error manager handling the error.
        errorManager.handleError(error);

        // Runs the error callback if provided.
        if (isFunction(onError)) {
          onError(error);
        }
      }

      return error;
    }
  };

  return [state, performRequest];
};

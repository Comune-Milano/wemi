
import { useRef, useEffect, useReducer } from 'react';

import { useErrorManager } from 'errors/services/useErrorManager';
import { isFunction } from 'utils/functions/typeCheckers';
import { graphQLDataApiReducer } from 'hooks/graphQLRequest/reducer';
import { requestInit, requestSuccess, requestError } from 'hooks/graphQLRequest/actionCreators';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useStatelessAuthService } from './useStatelessAuthService';
import { useUserProfile } from 'hooks/useUserProfile';

/**
 * A custom hook to interact with GrapqhQL backend API
 * in a statefull way, with Authentication Service 
 * REST API to update the user profile when ends the stateless GraphQLRequest.
 */
export const useAuthGraphQLRequest = (
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

  // Hook for the auth service request.
  const performAuthenticationRequest = useStatelessAuthService();

  // Hook to connect the result of the auth service request to the user profile context.
  const [userProfile, setUserProfile] = useUserProfile();

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

      const datiLogin = await performAuthenticationRequest();

      setUserProfile({ ...userProfile, datiLogin });

      return response;

    }
    catch (error) {
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

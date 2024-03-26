
import { GraphQLDataApiActions } from './actions';

/**
 * The action to dispatch when a request starts.
 */
export const requestInit = () => ({ type: GraphQLDataApiActions.REQUEST_INIT });

/**
 * The action to dispatch when a request completes successfully.
 * @param {*} payload
 */
export const requestSuccess = payload => ({
  type: GraphQLDataApiActions.REQUEST_SUCCESS,
  payload,
});

/**
 * The action to dispatch when the request goes in error.
 */
export const requestError = () => ({ type: GraphQLDataApiActions.REQUEST_ERROR });


import { GraphQLDataApiActions } from './actions';

export const graphQLDataApiReducer = (state, action) => {
  switch (action.type) {
    case GraphQLDataApiActions.REQUEST_INIT:
      return {
        ...state,
        errored: false,
        isLoading: true,
        pristine: false,
      };
    case GraphQLDataApiActions.REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errored: false,
        data: action.payload,
      };
    case GraphQLDataApiActions.REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        errored: true,
      };
    default:
      return state;
  }
};

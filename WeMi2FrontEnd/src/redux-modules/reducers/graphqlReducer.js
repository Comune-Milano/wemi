/** @format */
import {
  GRAPHQL_REQUEST,
  GRAPHQL_SUCCESS,
  GRAPHQL_FAILURE,
  CURRENT_REQUEST,
  FILTER_INDEX_ADD,
  RESET_FIELD,
  RESET_FIELDS,
} from 'types/actions';

const initialState = { loaded: 0, array: [] };

export default function graphqlReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GRAPHQL_REQUEST:
      return {
        ...state,
        loaded: 1
      };
    case GRAPHQL_SUCCESS:
      if (action.lista[0] !== undefined) {
        const result = { [action.lista[0]]: action.lista[1] };
        return {
          ...state,
          ...result,
          loaded: 2,
        };
      };
      action.lista.loaded = 2;
      return {
        ...state,
        ...action.lista,
        loaded: 2,
      };
    case GRAPHQL_FAILURE:
      return {
        ...state,
        loaded: 3,
        error: action.error.toString(),
      };

    case RESET_FIELD:
      return {
        ...state,
        [action.element]: undefined,
        loaded: 2,
      };
    case RESET_FIELDS: {
      // Creates an object embedding all reset fields.
      const resetFields = action.fields.reduce(
        (accumulator, field) => {
          accumulator[field] = undefined;
          return accumulator;
        },
        {},
      );
      return {
        ...state,
        ...resetFields,
      };
    }
    case FILTER_INDEX_ADD:
      return {
        ...state, filterIndex: action.element,
      };
    case CURRENT_REQUEST:
      return {
        ...state,
        current_request: action.element,
      };
    default:
      return state;
  }
}
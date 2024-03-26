/** @format */

import { SET_ROUTE_PATH } from 'types/actions';

export default function routingReducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_ROUTE_PATH:
      return {
        ...state,
        pathname: action.pathname,
      };

    default:
      return state;
  }
}

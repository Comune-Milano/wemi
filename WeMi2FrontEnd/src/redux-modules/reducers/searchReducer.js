/** @format */

import { SEARCH_INPUT } from 'types/actions';

export default function searchReducer(state = {}, action = {}) {
  switch (action.type) {
    case SEARCH_INPUT:
      return {
        ...state,
        parametriRicerca: action.element,
      };

    default:
      return state;
  }
}

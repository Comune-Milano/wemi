/** @format */

import { REQUEST_LOG, WEMI_ERROR } from 'types/actions';

const initialState = { loaded: 0, errorDTO: { } };

export default function errorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_LOG:
      return {
        ...state,
        log: action.element,
      };
    case WEMI_ERROR:
      return {
        ...state,
        errorDTO: action.errorDTO,
      };
    default:
      return state;
  }
}

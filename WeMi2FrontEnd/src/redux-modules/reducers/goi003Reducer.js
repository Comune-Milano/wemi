/** @format */

import { ADD_PARAMETER_GOI003 } from 'types/actions';

const initialState = {
  loaded: 0,
  eliminaMedia: [],
};

export default function goi003Reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_PARAMETER_GOI003:
      return {
        ...state,
        ...action.element,
      };
    default:
      return state;
  }
}

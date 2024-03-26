/** @format */

import {  ADD_FILTER_ENT_ERI } from 'types/actions';

const initialState = { loaded: 0 };

export default function entEriReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_FILTER_ENT_ERI:
      return {
        ...state,
        ...action.element
      };
    default:
      return state;
  }
}

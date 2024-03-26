/** @format */

import { GET_BROWSER_INFO, SET_REFERRER } from 'types/actions';

export default function trackingReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_BROWSER_INFO:
      return {
        ...state,
        ...action.browser,
      };

    case SET_REFERRER:
      return {
        ...state,
        referrer: action.referrer,
      };

    default:
      return state;
  }
}

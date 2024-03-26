/** @format */

import { CHANGE_LOCALE } from 'types/actions';

// const browserLocale = window.navigator.language;
const browserLocale = 'it-IT';
const initialState = browserLocale.substring(0, 2);

export default function localeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return action.payload;
    default:
      return state;
  }
}

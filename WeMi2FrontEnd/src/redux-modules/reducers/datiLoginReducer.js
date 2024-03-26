/** @format */

import { USER_LOGGED_IN } from "types/actions";

const initialState = {
  loaded: false,
  modal: false
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
        sessionStorage.setItem('DatiLogin', JSON.stringify(action.datiLogin));
      return {...state, authenticated: true};
    case 'OPEN_MODAL_LOGIN':
      return {...state, modal: action.value};
    default:
      return state;
  }
}

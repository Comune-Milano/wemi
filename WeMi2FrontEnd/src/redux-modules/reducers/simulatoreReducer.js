/** @format */

import { CALCOLA_SIM,APPLICA_PARAMETRI } from 'types/actions';
const initialState = {
    parametri: {
    }
}

export default function simulatoreReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CALCOLA_SIM:
      return {
        ...state,
        simulazione: action.element
      };
    case APPLICA_PARAMETRI:
        return {
            ...state,
            parametri: action.element
        }
    default:
      return state;
  }
}

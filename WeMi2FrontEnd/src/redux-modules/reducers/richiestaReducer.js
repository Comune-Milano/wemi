/** @format */

import {
    ENT_ERI_ACCETTAZIONE,
    ADD_CLIENT_ERROR
  } from 'types/actions';
  
  const initialState = {
      loaded: false
  }
    
    export default function richiestaReducer(state = initialState, action = {}) {
      switch (action.type) {
          case ENT_ERI_ACCETTAZIONE:
            return { ...state, ...action.entEriRichiesta, loaded: true };

        case ADD_CLIENT_ERROR:
          return {
            ...state,
            error: action.error
          }
        default:
          return state;
      }
  }
  
  
  
  
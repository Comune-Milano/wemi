/** @format */

import {
    TCB_ICL_001,
    ADD_CLIENT_ERROR
  } from 'types/actions';
  
  const initialState = {
    config001: {},
  }
    
    export default function tcbReducer(state = initialState, action = {}) {
      switch (action.type) {
        case TCB_ICL_001 : 
          return {...state, config001: action.candidaturaConfig };
        case ADD_CLIENT_ERROR:
          return {
            ...state,
            error: action.error
          }
        default:
          return state;
      }
  }
  
  
  
  
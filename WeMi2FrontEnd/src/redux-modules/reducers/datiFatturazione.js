/** @format */

import { DATI_FATTURAZIONE, ADD_CLIENT_ERROR } from 'types/actions';
  
  const initialState = {
    modalitaPagamento:{id:1,value:'Contanti'}
  }

    
    export default function fatturazioneReducer(state = initialState, action = {}) {
      switch (action.type) {
          case DATI_FATTURAZIONE:
            return { ...state, ...action.datiFatturazione };

        case ADD_CLIENT_ERROR:
          return {
            ...state,
            error: action.error
          }
        default:
          return state;
      }
  }
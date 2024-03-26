/** @format */

import { CATEGORIA_SELEZIONATA, ADD_CLIENT_ERROR } from 'types/actions';
  
  const initialState = {
  }

    
    export default function categoriaReducer(state = initialState, action = {}) {
      switch (action.type) {
          case CATEGORIA_SELEZIONATA:
            return { ...state, ...action.CategoriaSelezionata };

        case ADD_CLIENT_ERROR:
          return {
            ...state,
            error: action.error
          }
        default:
          return state;
      }
  }
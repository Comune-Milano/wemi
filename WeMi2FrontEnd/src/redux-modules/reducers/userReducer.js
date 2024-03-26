/** @format */

import {
  USER_LOGGED_OUT,
  FETCH_CURRENT_USER,
  ENTE_ADD,
  OVERLAY_SPINNER,
  ENTE_REMOVE,
  FILTER_ADD,
  FILTER_DATA_ADD,
  FILTER_REMOVE,
  CAT_HOMEPAGE,
  PRINT_ENABLED,
  SCROLL_INTO_VIEW,
} from 'types/actions';

const initialState = {
  loaded: false,
  enti: [],
  cat: [{idArea: 0,txTitoloArea: {it: "TUTTI"}}],
  // filtri: {
  //   orario: [],
  //   destinatariLiv1: [],
  //   destinatariLiv2: [],
  //   mansione: [],
  //   costo: 0,
  //   pagamento: [],
  //   tipologia: { id: 0, value: '' },
  //   municipio: 0,
  //   offerta: [],
  // },
  // datiFiltri: {
    
  //   // orario: [{ id: 0, label: '' }],
  //   // destinatariLiv1: [{ id: 0, label: '' }],
  //   // destinatariLiv2: [{ id: 0, label: '' }],
  //   // mansione: [{ id: 0, label: '' }],
  //   // costo: 0,
  //   // pagamento: [{ id: 0, label: '' }],
  //   // tipologia: { id: 0, label: '' },
  //   // municipio: { id: 0, label: '' },
  //   // offerta: [{ id: 0, label: '' }],
  // }
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case PRINT_ENABLED: 
      return {...state, print: action.print}
      case OVERLAY_SPINNER: 
      return {...state, overlaySpinner: action.value}
    case FETCH_CURRENT_USER:
      return { ...state, ...action.user, loaded: true };
    case SCROLL_INTO_VIEW:
        return { ...state, scrollIntoView: action.flag, loaded: true };
    case USER_LOGGED_OUT:
      return { loaded: true };
    case ENTE_ADD:
      return { ...state, enti: parseInt(action.ente) == -1 ? [] : [...state.enti,action.ente], added: true };
    case ENTE_REMOVE:
      
      var array2=[]
      
      for (let i=0;i<state.enti.length;i++){
        if(action.ente.id_servizio_ente!==state.enti[i].id_servizio_ente)
        array2.push(state.enti[i])
      }
              
      return{
        ...state,
         enti: array2,
         removed: true 
      }



    case FILTER_ADD:
      return { ...state, filtri: action.filter, loaded: true,};
    case FILTER_DATA_ADD:
      return { ...state, datiFiltri: action.filterData, loaded: true, };
    case FILTER_REMOVE:
        state[action.element]=undefined
        return{
          ...state,
          removed: action.element
        }
    case 'RESET_ENTI':
        return { ...state, enti: [], reset: true };
    case CAT_HOMEPAGE:
        return {...state, cat: action.cat};
    default:
      return state;
  }
}

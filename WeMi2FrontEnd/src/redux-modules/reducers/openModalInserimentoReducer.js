/** @format */

import { OPEN_MODAL_INSERIMENTO} from 'types/actions';

const initialState = { 
  open: false,
 };

export default function OpenModalInserimentoReducer(state = initialState, action = {}) {
  switch (action.type) {
    
    case OPEN_MODAL_INSERIMENTO: 
    return {
        ...state,
        ...action.element
      };
    default:
      return state;
  }
}

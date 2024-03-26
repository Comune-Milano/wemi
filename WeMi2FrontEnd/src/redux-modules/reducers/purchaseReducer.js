/** @format */

import { ADD_PURCHASE, REMOVE_PURCHASE } from 'types/actions';


export default function purchaseReducer(state={} , action = {}) {
  switch (action.type) {
    case ADD_PURCHASE:
      return {
        ...state,
        acquisto: action.purchase
      };
    case REMOVE_PURCHASE:
        state.acquisto = undefined;
        return{
            ...state
        }

    default:
      return state;
  }
}

/** @format */

import { ADD_CART, REMOVE_CART } from 'types/actions';


export default function cartReducer(state={} , action = {}) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        cart: state.cart ? [...state.cart, action.element] : [action.element],
      };
    case REMOVE_CART:
      return {
        ...state,
        cart: action.element,
        
      }
    default:
      return state;
  }
}

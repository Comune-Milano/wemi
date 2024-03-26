import {ADD_CART,REMOVE_CART} from 'types/actions';

export const addCart = element => ({
    type: ADD_CART,
    element,
  });
  export const removeCart = element => ({
    type: REMOVE_CART,
    element
  });
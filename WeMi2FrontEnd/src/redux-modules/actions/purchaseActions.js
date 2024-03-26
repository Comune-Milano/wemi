import {ADD_PURCHASE,REMOVE_PURCHASE} from 'types/actions';

export const AddPurchase = purchase => ({
    type: ADD_PURCHASE,
    purchase
  });
  export const RemovePurchase = () => ({
    type: REMOVE_PURCHASE
  });
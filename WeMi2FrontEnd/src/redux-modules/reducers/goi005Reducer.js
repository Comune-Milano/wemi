import { ADD_PARAMETER_GOI005 } from "types/actions";



export default function goi005Reducer(state={} , action = {}) {
  switch (action.type) {
   
    case ADD_PARAMETER_GOI005:
        return {...state, ...action.element};
    default:
      return state;
  }
}

import {TCB_STEPPER, TCB_STEPPER_2,TCB_STEPPER_2_INFO, ADD_CLIENT_ERROR} from 'types/actions';
  
  const initialState = {
    active: false,
    info: {},
    tcbStep: 1,
    tcbIclStep: 1,
  };
  

  export default function stepperTCB(state = initialState, action = {}) {
    switch (action.type) {
      case TCB_STEPPER :
        return {...state, ...action.stepperTCB};
      case TCB_STEPPER_2 :
        return {...state, active: action.stepperTCB};
      case TCB_STEPPER_2_INFO :
        return {...state, info: action.stepperTCBInfo};
      case ADD_CLIENT_ERROR:
        return {
          ...state,
          error: action.error
        }
      default:
        return state;
    }
  }
  
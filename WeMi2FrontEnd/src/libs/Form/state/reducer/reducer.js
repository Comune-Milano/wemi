
import { FormStateActions } from '../actions/actions';

/**
 * The form state reducer.
 * @param {*} state
 * @param {*} action
 */
export const formStateReducer = (state, action) => {
  switch (action.type) {
    case FormStateActions.SET_FIELD: {
      const { key, value } = action.payload;
      return {
        ...state,
        dataset: {
          ...state.dataset,
          [key]: value,
        },
      };
    }
    case FormStateActions.SET_FIELD_ERROR: {
      // Default to an empty string in case an error message is not available.
      const { fieldKey, errorMessage = '' } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [fieldKey]: errorMessage,
        },
      };
    }
    case FormStateActions.SET_FIELD_VALID: {
      const { fieldKey } = action.payload;
      // Removes from the invalid fields set the valid field.
      const { [fieldKey]: removedKey, ...newErrorsSet } = state.errors;

      return {
        ...state,
        errors: newErrorsSet,
      };
    }
    case FormStateActions.RESET_FORM: {
      return {
        ...state,
        dataset: action.payload,
      };
    }
    case FormStateActions.SET_FIELDS: {
      return {
        ...state,
        dataset:{ ...state.dataset, ...action.payload},
      };
    }
    case FormStateActions.SET_FIELD_TOUCHED: {
      const { fieldKey } = action.payload;

      return {
        ...state,
        touched: {
          ...state.touched,
          [fieldKey]: true,
        },
      };
    }
    case FormStateActions.SET_FORM_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case FormStateActions.SET_IS_VALIDATING:
      return {
        ...state,
        validating: action.payload,
      };
    case FormStateActions.SET_IS_SUBMITTING:
      return {
        ...state,
        submitting: action.payload,
      };
    default:
      return state;
  }
};

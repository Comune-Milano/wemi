
import { FormStateActions } from '../actions/actions';

/**
 * The action to dispatch to update the value of a form field.
 * @param {*} key The key identifying the form field.
 * @param {*} value The new value of the form field.
 */
export const setField = (key, value) => ({
  type: FormStateActions.SET_FIELD,
  payload: { key, value },
});

/**
 * The action to dispatch to mark a field as invalid.
 * @param {*} key The key identifying the form field.
 * @param {*} errorMessage The message describing the occurred error.
 */
export const setFieldError = (fieldKey, errorMessage) => ({
  type: FormStateActions.SET_FIELD_ERROR,
  payload: { fieldKey, errorMessage },
});

/**
 * The action to dispatch to mark a field as valid.
 * @param {*} payload An object embedding the field key and value.
 */
export const setFieldValid = fieldKey => ({
  type: FormStateActions.SET_FIELD_VALID,
  payload: { fieldKey },
});

/**
 * The action to dispatch to mark a field as touched.
 * @param {*} payload An object embedding the field key and value.
 */
export const setFieldTouched = fieldKey => ({
  type: FormStateActions.SET_FIELD_TOUCHED,
  payload: { fieldKey },
});

/**
 * The action to dispatch to set the errors on the form level.
 * @param {*} errors The errors set.
 */
export const setFormErrors = errors => ({
  type: FormStateActions.SET_FORM_ERRORS,
  payload: errors,
});

/**
 * The action to dispatch to set the validating
 * flag on the form level.
 * @param {*} errors The errors set.
 */
export const setIsValidating = flag => ({
  type: FormStateActions.SET_IS_VALIDATING,
  payload: flag,
});

/**
 * The action to dispatch to set the submitting
 * flag on the form level.
 * @param {*} errors The errors set.
 */
export const setIsSubmitting = flag => ({
  type: FormStateActions.SET_IS_SUBMITTING,
  payload: flag,
});


/**
 * The action to dispatch to reset all the values of the
 * form to the initialValues or new set of values
 * @param {*} value The new dataset of the form.
 */
export const resetForm = (value) => ({
  type: FormStateActions.RESET_FORM,
  payload: value,
});

/**
 * The action to dispatch to reset all the values of the
 * form to the initialValues or new set of values
 * @param {*} value The new dataset of the form.
 */
export const setFields = (value) => ({
  type: FormStateActions.SET_FIELDS,
  payload: value,
});
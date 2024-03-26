
import { isObject } from 'utils/functions/typeCheckers';

/**
 * A custom error to throw when there is an
 * internal error during the submit.
 */
export class FormSubmitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FormSubmitError';
  }
}

/**
 * Determines if the error is a FormSubmit one.
 * @param {*} error
 */
export function isSubmitError(error) {
  return isObject(error) && error instanceof FormSubmitError;
}

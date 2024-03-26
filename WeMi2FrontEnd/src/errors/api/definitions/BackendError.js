
import { isObject } from "util";
import { WeMiError } from "errors/WeMiError";

export class BackendError extends WeMiError {
  constructor(message, name = 'BackendError') {
    super(message, name);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BackendError.prototype);
  }
}

/**
 * Determines if the error is coming from an API request.
 * @param {*} error
 */
export function isBackendError(error) {
  return isObject(error) && error instanceof BackendError;
}

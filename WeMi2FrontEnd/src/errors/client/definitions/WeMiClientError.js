
import { WeMiError } from "errors/WeMiError";

/**
 * Any error that's thrown in the scope of the WeMi client.
 */
export class WeMiClientError extends WeMiError {
  constructor(name, message, code) {
    super(name, message);

    this.message = message;
    this.code = code;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, WeMiClientError.prototype);
  }
}

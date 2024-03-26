
import { BackendError } from './BackendError';

/**
 * A custom error to throw when there is a network
 * error while executing an API request.
 */
export class NetworkError extends BackendError {
  constructor(message, status, statusText, body) {
    super(message, 'NetworkError');

    this.status = status;
    this.statusText = statusText;
    this.body = body;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

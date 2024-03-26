
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { BackendError } from './BackendError';

/**
 * A custom error to throw when there is a network
 * error while executing an API request.
 */
export class GraphQLApiError extends BackendError {
  constructor(message, graphQLErrors, data) {
    super(message, 'GraphQLApiError');

    this.graphQLErrors = graphQLErrors || [];
    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GraphQLApiError.prototype);
  }

  /**
   *
   * @param {*} code
   */
  hasErrorCode(code) {
    return this.graphQLErrors.some(
      error => getObjectValue(error, 'code') === code
    );
  }

  /**
   * Finds the error from the errors set using the provided code
   */
  findErrorByCode(code) {
    return this.graphQLErrors.find(
      error => getObjectValue(error, 'code') === code
    );
  }
}

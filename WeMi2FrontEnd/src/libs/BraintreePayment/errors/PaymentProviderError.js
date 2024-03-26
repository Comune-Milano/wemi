
import { isObject } from 'utils/functions/typeCheckers';
import { WeMiClientError } from 'errors/client/definitions/WeMiClientError';

/**
 * A custom error to throw when there is an
 * internal error during the payment flow.
 */
export class PaymentProviderClientError extends WeMiClientError {
  constructor(code, message, originalError) {
    super(
      'PaymentProviderClientError',
      message,
      code
    );
    this.originalError = originalError;
  }
}

/**
 * Determines if the error is a PaymentProviderClientError one.
 * @param {*} error
 */
export function isPaymentProviderError(error) {
  return isObject(error) && error instanceof PaymentProviderClientError;
}

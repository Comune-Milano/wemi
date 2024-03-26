
const messagePrefix = 'Payment Provider';

export const INIT_ERROR = {
  code: 1,
  message: `${messagePrefix} - An error occurred while initializing the provider.`,
};

export const UNMOUNTED_ERROR = {
  code: 2,
  message: `${messagePrefix} - The component was unmounted.`,
};

export const PAYMENT_METHOD_NONCE_ERROR = {
  code: 3,
  message: `${messagePrefix} - Error while requesting the payment method nonce.`,
};

export const TRANSACTION_ERROR = {
  code: 4,
  message: `${messagePrefix} - An error occurred while executing the payment transaction.`,
};

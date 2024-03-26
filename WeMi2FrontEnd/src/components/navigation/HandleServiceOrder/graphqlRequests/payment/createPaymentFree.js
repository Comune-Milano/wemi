
const createPaymentFreeMutationName = 'createPaymentFree';

export const createPaymentFree = [
  '',
  `mutation ${createPaymentFreeMutationName}(
    $identificationBoundary: TransactionIdentificationBoundary!,
    $billing: TransactionBilling!
  ) {
    ${createPaymentFreeMutationName}(
      identificationBoundary: $identificationBoundary,
      billing: $billing
    ) {
      success,
      internalTransactionId
    }
  }`,
  createPaymentFreeMutationName,
];

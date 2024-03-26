
const createTransactionMutationName = 'createPaymentTransaction';

export const createPaymentTransaction = [
  '',
  `mutation ${createTransactionMutationName}(
    $transactionPayload: TransactionPayload!,
    $identificationBoundary: TransactionIdentificationBoundary!,
    $billing: TransactionBilling!,
    $transactionVouchers: [TransactionVoucher],
    $totalVoucherImport: Float
  ) {
    ${createTransactionMutationName}(
      transactionPayload: $transactionPayload,
      identificationBoundary: $identificationBoundary,
      billing: $billing,
      transactionVouchers: $transactionVouchers,
      totalVoucherImport: $totalVoucherImport
    ) {
      success,
      internalTransactionId
    }
  }`,
  createTransactionMutationName,
];

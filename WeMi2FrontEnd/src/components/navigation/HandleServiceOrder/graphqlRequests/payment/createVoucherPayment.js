
const createTransactionMutationName = 'createVoucherTransaction';

export const createVoucherTransaction = [
  '',
  `mutation ${createTransactionMutationName}(
    $identificationBoundary: TransactionIdentificationBoundary!,
    $billing: TransactionVoucherBilling!,
    $transactionVouchers: [TransactionVoucher]!,
    $totalVoucherImport: Float!
  ) {
    ${createTransactionMutationName}(
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

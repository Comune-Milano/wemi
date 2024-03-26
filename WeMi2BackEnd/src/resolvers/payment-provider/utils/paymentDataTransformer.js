
export const transformPaymentData = (
  transactionId,
  operationTimestamp,
  paymentType,
  totalVoucherImport
) => totalVoucherImport ? ({
  nrTransazione: transactionId,
  tsOperazione : operationTimestamp,
  txModalitaPagamento: paymentType,
  importoVoucher: totalVoucherImport,
}) : ({
  nrTransazione: transactionId,
  tsOperazione : operationTimestamp,
  txModalitaPagamento: paymentType,
});
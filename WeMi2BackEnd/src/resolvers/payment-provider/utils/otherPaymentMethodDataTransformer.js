
export const otherPaymentMethodDataTransformer = (operationTimestamp, totalVoucherImport) => totalVoucherImport ? ({
  tsOperazione : operationTimestamp,
  txModalitaPagamento: 'Altra',
  altraModalita: true,
  importoVoucher: totalVoucherImport,
}) : ({
  tsOperazione : operationTimestamp,
  txModalitaPagamento: 'Altra',
  altraModalita: true,
});
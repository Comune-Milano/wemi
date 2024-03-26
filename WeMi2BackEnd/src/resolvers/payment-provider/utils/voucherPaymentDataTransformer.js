
export const transformVoucherData = (
    importoVoucher,
    operationTimestamp,
  ) => ({
    tsOperazione : operationTimestamp,
    importoVoucher,
  });
export const getVoucherList = [
  '',
  `query getVoucherList($filters: FiltersVoucherListInput) {
    getVoucherList(
      params: $filters,
    ) {
        totalRows
        list {
          idVoucher
          inizioValidita
          fineValidita
          state
          code
          cfIntestatario
          nomeTitolare
          cognomeTitolare
          cfMinore
          totalImport
          remainingImport
          countedImport
          bando
          dateLastModified
        }
      }
  }`,
  'getVoucherList',
];

export const getStatoVoucher = [
  '',
  `query EstraiStatiVoucher {
      EstraiStatiVoucher {
          value,
          textValue
        } 
    },
  `,
  'EstraiStatiVoucher'
];

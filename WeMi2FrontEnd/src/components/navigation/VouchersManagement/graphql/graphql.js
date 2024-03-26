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
  'EstraiStatiVoucher',
];

export const estraiSostegnoEconomico = [
  '',
  `query EstraiSostegnoEconomico {
    EstraiSostegnoEconomico {
          value,
          textValue
        } 
    },
  `,
  'EstraiSostegnoEconomico',
];

export const elaboraCsv = [
  '',
  `mutation elaboraVouchers(
    $sostegnoEconomico: Int!,
    $media: mediaADDInput) {
      elaboraVouchers (
        sostegnoEconomico: $sostegnoEconomico,
        media: $media
      )
    },
  `,
  'elaboraVouchers',
];


export const confermaCsv = [
  '',
  `mutation uploadVouchers($idImportazione: Int!) {
    uploadVouchers (idImportazione: $idImportazione) 
    },
  `,
  'uploadVouchers',
];


export const downloadVouchersCont = [
  '',
  `query downloadVouchersCont($filters: FiltersVoucher){
    downloadVouchersCont(params:{filters: $filters})
  }`,
  'downloadVouchersCont',
];

export const hasVouchersCont = [
  '',
  `query hasVouchersCont{
    hasVouchersCont
  }`,
  'hasVouchersCont',
];

export const getTransazioniList = [
  '',
  `query getVoucherTransactionList($filters: FiltersTransactionListInput) {
    getVoucherTransactionList(
      params: $filters,
    ) {
        totalRows
        list {
          idTransazioneVoucher
          idVoucher
          idRichiestaServizioEnte
          idInternoTransazione
          importoSpeso
          state
          nomeEnte
          codiceVoucher
          dataUtilizzoVoucher
          dataContabilizzazione
          servizioAcquistato
          bando
          cfBeneficiario
          cfMinore
          cfPivaEnte
          nominativoTitolareEnte
        }
      }
  }`,
  'getVoucherTransactionList',
];

export const getStatoTransazione = [
  '',
  `query EstraiStatiTransazioneVoucher {
    EstraiStatiTransazioneVoucher {
          value,
          textValue
        } 
    },
  `,
  'EstraiStatiTransazioneVoucher',
];

export const stornoTransazione = [
  '',
  `
    mutation stornoTransazioneVoucher($id:[Int]){
      stornoTransazioneVoucher(id: $id)
      }`,
  'stornoTransazioneVoucher',
];

export const contabilizzaTransazione = [
  '',
  `
    mutation contabilizzaTransazioneVoucher($id: [Int]){
      contabilizzaTransazioneVoucher(id: $id)
      }`,
  'contabilizzaTransazioneVoucher',
];

export const getTransazioniDetail = [
  '',
  `query getTransactionDetails($idTransaction: Int!) {
    getTransactionDetails(idTransaction: $idTransaction) {
      idTransazioneVoucher
      idVoucher
      idRichiestaServizioEnte
      idInternoTransazione
      importoSpeso
      state
      nomeEnte
      codiceVoucher
      dataUtilizzoVoucher
      emailContatto
      cellContatto
      dataContabilizzazione
      dataStorno
      servizioAcquistato
      bando
      cfBeneficiario
      cfMinore
      cfPivaEnte
      nominativoTitolareEnte
      inizioValidita
      fineValidita
      importoVoucher
    }
  }
`,
  'getTransactionDetails',
];

export const hasTransactionsCont = [
  '',
  `query hasTransactionsCont{
    hasTransactionsCont
  }`,
  'hasTransactionsCont',
];

export const downloadTransactionsCont = [
  '',
  `query downloadTransactionsCont($filters: FiltersTransaction, $idVouchersList: [Int]){
    downloadTransactionsCont(params:{filters: $filters, idVouchersList: $idVouchersList})
  }`,
  'downloadTransactionsCont',
];

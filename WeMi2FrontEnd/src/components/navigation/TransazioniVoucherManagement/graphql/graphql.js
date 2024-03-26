export const getVoucherTransaction = [
  '',
  `query getVoucherTransaction($idVoucher: Int!, $page: Int!, $elementsPerPage: Int!) {
    getVoucherTransaction(
      idVoucher: $idVoucher,
      page: $page,
      elementsPerPage: $elementsPerPage
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
];

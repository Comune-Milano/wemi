export const getVoucherList = [
  '',
  `query getCitizenVoucherList($page: Int!, $elementsPerPage: Int!) {
    getCitizenVoucherList(
        page: $page,
        elementsPerPage: $elementsPerPage    
      ) {
      totalRows,
      list {
        idVoucher
        transazioniVoucher
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
  'getCitizenVoucherList',
];

export const getVoucherDetail = [
  '',
  `query getCitizenVoucherTransactionsList($idVoucher: Int!, $page: Int!, $elementsPerPage: Int!) {
    getCitizenVoucherTransactionsList(
      idVoucher: $idVoucher,
      page: $page,
      elementsPerPage: $elementsPerPage
    ) {
        totalRows
        voucherInfo {
          idVoucher
          transazioniVoucher
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
  }`,
  'getCitizenVoucherTransactionsList',
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

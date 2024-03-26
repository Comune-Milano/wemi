import moment from 'moment';

export const dataMapperTransactionDetail = (response) => {
  const result = {
    voucherDetails: {
      codiceVoucher: response.codiceVoucher,
      idVoucher: response.idVoucher,
      dataAcquisizione: response?.inizioValidita ? moment(response?.inizioValidita).format('DD/MM/YYYY') : null,
      dataScadenza: response?.fineValidita ? moment(response?.fineValidita).format('DD/MM/YYYY') : null,
      cfIntestatario: response.cfBeneficiario,
      importo: response.importoVoucher,
      emailContatto: response.emailContatto,
      cellContatto: response.cellContatto,
      bando: response.bando,
      cfMinore: response.cfMinore,
    },
    transactionDetails: {
      numeroTransazione: response.idTransazioneVoucher,
      dataUtilizzo: response?.dataUtilizzoVoucher ? moment(response?.dataUtilizzoVoucher).format('DD/MM/YYYY') : null,
      dataContabilizzazione: response?.dataContabilizzazione ? moment(response?.dataContabilizzazione).format('DD/MM/YYYY') : null,
      importoSpesa: response.importoSpeso,
      dataStorno: response.dataStorno ? moment(response?.dataStorno).format('DD/MM/YYYY') : null,
      servizioAcquistato: response.servizioAcquistato,
      ente: response.nomeEnte,
      idRichiesta: response.idRichiestaServizioEnte,
    },
  };
  return result;
};

import moment from 'moment';

export const dataMapperTransactionVoucherList = (response) => {
  const result = {
    totalRows: 0,
    list: [],
  };

  result.totalRows = response.getVoucherTransaction.totalRows;
  // create array to table
  result.list = response.getVoucherTransaction.list?.map(el => ({
    idTransazione: el.idTransazioneVoucher,
    cfMinore: el.cfMinore,
    importoTransazione: el.importoSpeso,
    stato: el.state,
    dataPagamento: el.dataUtilizzoVoucher ? moment(el.dataUtilizzoVoucher).format('DD/MM/YYYY') : null,
    servizioAcquistato: el.servizioAcquistato,
    ente: el.nomeEnte,
    idRichiestaServizioEnte: el.idRichiestaServizioEnte,
  }));

  return result;
};

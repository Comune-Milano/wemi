import moment from 'moment';

export const dataMapperVoucherList = (response) => {
  const result = {
    totalRows: 0,
    list: [],
  };

  result.totalRows = response.totalRows;
  // create array to table
  result.list = response.list?.map(el => ({
    idVoucher: el.idVoucher,
    inizioValidita: el.inizioValidita ? moment(el.inizioValidita).format('DD/MM/YYYY') : null,
    fineValidita: el.fineValidita ? moment(el.fineValidita).format('DD/MM/YYYY') : null,
    state: el.state,
    code: el.code,
    cfIntestatario: el.cfIntestatario,
    cfMinore: el.cfMinore,
    totalImport: el.totalImport,
    remainingImport: el.remainingImport ? el.remainingImport : null,
    countedImport: el.countedImport ? el.countedImport : null,
    bando: el.bando,
  }));

  return result;
};

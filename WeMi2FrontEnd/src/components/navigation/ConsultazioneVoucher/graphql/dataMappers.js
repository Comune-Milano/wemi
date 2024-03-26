import moment from 'moment';
import { moneyFormat } from 'utils/formatters/moneyFormat';

export const dataMapperVoucherList = (response) => {
  const result = {
    totalRows: 0,
    list: [],
  };

  result.totalRows = response.totalRows;
  result.list = response.list?.map(el => ({
    idVoucher: el.idVoucher,
    dataFineValidita: el.fineValidita ? moment(el.fineValidita).format('DD/MM/YYYY') : null,
    codiceVoucher: el.code,
    codiceFiscaleAssegnatario: el.cfMinore,
    importoResiduo: el.remainingImport ? moneyFormat(el.remainingImport, true) : moneyFormat(0, true),
  }));


  return result;
};

export const dataMapperVoucherDetail = (response) => {
  const result = {
    totalRows: 0,
    list: [],
    voucherInfo: {},
  };
  result.totalRows = response.totalRows;
  result.list = response.list?.map(el => ({
    idTransazioneVoucher: el.idTransazioneVoucher,
    idVoucher: el.idVoucher,
    idRichiestaServizioEnte: el.idRichiestaServizioEnte,
    idInternoTransazione: el.idInternoTransazione,
    importoSpeso: el.importoSpeso ? moneyFormat(el.importoSpeso, true) : moneyFormat(0, true),
    state: el.state,
    nomeEnte: el.nomeEnte,
    codiceVoucher: el.codiceVoucher,
    dataUtilizzoVoucher: el.dataUtilizzoVoucher ? moment(el.dataUtilizzoVoucher).format('DD/MM/YYYY') : null,
    dataContabilizzazione: el.dataContabilizzazione ? moment(el.dataContabilizzazione).format('DD/MM/YYYY') : null,
    dataStorno: el.dataStorno ? moment(el.dataStorno).format('DD/MM/YYYY') : null,
    servizioAcquistato: el.servizioAcquistato,
    bando: el.bando,
    cfBeneficiario: el.cfBeneficiario,
    cfMinore: el.cfMinore,
    cfPivaEnte: el.cfPivaEnte,
    nominativoTitolareEnte: el.nominativoTitolareEnte,
    inizioValidita: el.inizioValidita ? moment(el.inizioValidita).format('DD/MM/YYYY') : null,
    fineValidita: el.fineValidita ? moment(el.fineValidita).format('DD/MM/YYYY') : null,
    importoVoucher: el.importoVoucher ? moneyFormat(el.importoVoucher, true) : moneyFormat(0, true),
  }));
  if (response.voucherInfo) {
    result.voucherInfo = {
      idVoucher: response.voucherInfo.idVoucher,
      transazioniVoucher: response.voucherInfo.transazioniVoucher,
      inizioValidita: response?.voucherInfo?.inizioValidita ? moment(response.voucherInfo.inizioValidita).format('DD/MM/YYYY') : null,
      fineValidita: response?.voucherInfo?.fineValidita ? moment(response.voucherInfo.fineValidita).format('DD/MM/YYYY') : null,
      state: response.voucherInfo.state,
      code: response.voucherInfo.code,
      cfIntestatario: response.voucherInfo.cfIntestatario,
      nomeTitolare: response.voucherInfo.nomeTitolare,
      cognomeTitolare: response.voucherInfo.cognomeTitolare,
      cfMinore: response.voucherInfo.cfMinore,
      totalImport: response?.voucherInfo?.totalImport ? moneyFormat(response.voucherInfo.totalImport, true) : moneyFormat(0, true),
      remainingImport: response?.voucherInfo?.remainingImport ? moneyFormat(response.voucherInfo.remainingImport, true) : moneyFormat(0, true),
      countedImport: response?.voucherInfo?.countedImport ? moneyFormat(response.voucherInfo.remainingImport, true) : moneyFormat(0, true),
      bando: response.voucherInfo.bando,
      dateLastModified: response?.voucherInfo?.dateLastModified ? moment(response.voucherInfo.dateLastModified).format('DD/MM/YYYY') : null,
    };
  }

  return result;
};

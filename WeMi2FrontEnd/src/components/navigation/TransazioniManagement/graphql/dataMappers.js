import moment from 'moment';

export const dataMapperTransazioniList = (response) => {
  const result = {
    totalRows: 0,
    list: [],
  };

  result.totalRows = response.totalRows;
  // create array to table
  result.list = response.list?.map(el => ({
    checked: false,
    idTransazioneVoucher: el.idTransazioneVoucher,
    idVoucher: el.idVoucher,
    idRichiestaServizioEnte: el.idRichiestaServizioEnte,
    idInternoTransazione: el.idInternoTransazione,
    importoSpeso: el.importoSpeso,
    state: el.state,
    nomeEnte: el.nomeEnte,
    codiceVoucher: el.codiceVoucher,
    dataUtilizzoVoucher: el.dataUtilizzoVoucher ? moment(el.dataUtilizzoVoucher).format('DD/MM/YYYY') : null,
    dataContabilizzazione: el.dataContabilizzazione ? moment(el.dataContabilizzazione).format('DD/MM/YYYY') : null,
    servizioAcquistato: el.servizioAcquistato,
    bando: el.bando,
    cfBeneficiario: el.cfBeneficiario,
    cfMinore: el.cfMinore,
    cfPivaEnte: el.cfPivaEnte,
    nominativoTitolareEnte: el.nominativoTitolareEnte,
  }));

  return result;
};

export const dataMapperDettaglioTransazioneDrawer = (response) => {
  const result = {
    title: `Transazione ${response.state}`,
    transaction: {
      codiceVoucher: response.codiceVoucher,
      idTransazioneVoucher: response.idTransazioneVoucher,
      cfMinore: response.cfMinore,
      importoSpeso: response.importoSpeso,
      state: response.state,
    },
  };
  return result;
};

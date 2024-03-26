import moment from 'moment';

export const getInitialDataset = dbData => {
  return {
    anniEspTata: (dbData && dbData.anniEspTata) || 0,
    anniEspColf: (dbData && dbData.anniEspColf) || 0,
    anniEspBadante: (dbData && dbData.anniEspBadante) || 0,
    statoCandidatura: dbData && dbData.statoCandidatura,
    vincoliCandidatura: (dbData && dbData.vincoliCandidatura) || '',
    votoEspTata: (dbData && dbData.votoEspTata) || 0,
    votoEspColf: (dbData && dbData.votoEspColf) || 0,
    votoEspBadante: (dbData && dbData.votoEspBadante) || 0,
    iscrittoInps: (dbData && dbData.iscrittoInps) || false,
    dtItaliaDal: (dbData && dbData.dtItaliaDal) ? moment(dbData.dtItaliaDal).toDate() : undefined,
    iscrittoRegioneLombardia: (dbData && dbData.iscrittoRegioneLombardia) || false,
    notaOperatore: (dbData && dbData.notaOperatore) || '',
    documentiLavoratore: (dbData && dbData.documentiLavoratore) || [],
    documentiDaEliminare: [],
  };
};

export const getInitialDataset = dbData => {
  return {
    candidatura: (dbData && getFlagCandidatura(dbData.flagCandidatura)) || {},
    mansioniSelezionateTata: (dbData && dbData.mansioniTata) || [],
    terapieFlag: (dbData && dbData.terapieFlag) || false,
    terapieSpecificate: (dbData && dbData.terapieSpecificate) ||  '',
    altroFlag: (dbData && dbData.altroFlag) || false,
    altreMansioniTata: (dbData && dbData.altreMansioniTata) ||  '',
    faccendeDomestiche: (dbData && dbData.faccendeDomestiche) || undefined,
    mansioniSelezionateColf: (dbData && dbData.mansioniColf) || [],
    altreMansioniColf: (dbData && dbData.altreMansioniColf) ||  '',
  };
};

const getFlagCandidatura = (flagCandidatura) => {
  return {
    label: 'Vuoi candidarti come baby-sitter?',
    radioOptions: [
      { id: '1', label: 'Si, voglio candidarmi come baby-sitter', checked: flagCandidatura === '1' },
      { id: '2', label: 'No, non voglio candidarmi come baby-sitter', checked: flagCandidatura === '0' },
    ],
  };
};

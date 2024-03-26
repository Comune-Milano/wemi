export const getInitialDataset = dbData => {
  return {
    candidatura: (dbData && getFlagCandidatura(dbData.flagCandidatura)) || {},
    mansioniSelezionateColf: (dbData && dbData.mansioniColf) || [],
    altreMansioniColf: (dbData && dbData.altreMansioniColf) ||  '',
    faccendeDomestiche: 1,
  };
};

const getFlagCandidatura = (flagCandidatura) => {
  return {
    label: 'Vuoi candidarti come colf?',
    radioOptions: [
      { id: '1', label: 'Si, voglio candidarmi come colf', checked: flagCandidatura === '1' },
      { id: '2', label: 'No, non voglio candidarmi come colf', checked: flagCandidatura === '0' },
    ],
  };
};

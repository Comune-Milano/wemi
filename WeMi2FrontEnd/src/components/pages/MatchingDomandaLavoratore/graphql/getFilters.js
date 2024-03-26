const getFiltersQueryName = 'EstraiDatiMatchRicercaLavoratore';

export const getFilters = [
  '',
  `query ${getFiltersQueryName}{
    ${getFiltersQueryName}{
      id 
      value
      type
      pgVisualizzazione
      nrValoreMaxRif
      nrValoreMinRif
      }
    }
`,
  getFiltersQueryName,
];

const getTableFiltersQueryName = 'EstraiFiltersMatchingDomandaLavoratore';

export const getTableFilters = [
  '',
  `query ${getTableFiltersQueryName}{
    ${getTableFiltersQueryName}{
      id 
      value
      type
      }
    }
`,
  getTableFiltersQueryName
];

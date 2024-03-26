/** @format */

export const RequestIndexJson = {
  title: 'SearchPageTranslations.title',
  titleBold: 'Parrucchiere uomo',
};

export const SearchFiltersJson = {
  title: 'SearchFilters.title',
  costLabel: 'SearchFilters.label.cost',
  ratingLabel: 'SearchFilters.label.rating',

  select: [
    {
      name: 'SearchFilters.label.municipality',
      placeholder: 'SearchFilters.label.municipality',
      items: [
        { value: 'Municipio1', label: 'Municipio1', id: 1 },
        { value: 'Municipio2', label: 'Municipio2', id: 2 },
        { value: 'Municipio3', label: 'Municipio3', id: 3 },
      ],
    },

    {
      name: 'SearchFilters.label.task',
      placeholder: 'SearchFilters.label.task',
      items: [
        { value: 'Mansione1', label: 'Mansione1', id: 1 },
        { value: 'Mansione2', label: 'Mansione2', id: 2 },
        { value: 'Mansione3', label: 'Mansione3', id: 3 },
      ],
    },

    {
      name: 'SearchFilters.label.when',
      placeholder: 'SearchFilters.label.when',
      items: [
        { value: 'Mattina', label: 'Mattina', id: 1 },
        { value: 'Pomeriggio', label: 'Pomeriggio', id: 2 },
        { value: 'Sera', label: 'Sera', id: 3 },
      ],
    },

    {
      name: 'SearchFilters.label.target',
      placeholder: 'SearchFilters.label.target',
      items: [
        { value: '1', label: '1', id: 1 },
        { value: '2', label: '2', id: 2 },
        { value: '3', label: '3', id: 3 },
      ],
    },

    {
      name: 'SearchFilters.label.payment',
      placeholder: 'SearchFilters.label.payment',
      items: [
        { value: 'Pagamento1', label: 'Pagamento1', id: 1 },
        { value: 'Pagamento2', label: 'Pagamento2', id: 2 },
        { value: 'Pagamento3', label: 'Pagamento', id: 3 },
      ],
    },
  ],
};

export const SearchResultsJson = {
  sort: {
    label: 'Ordina Risultati per: ',
    items: [
      { value: 'Prezzo crescente', label: 'Prezzo crescente', id: 1 },
      { value: 'Prezzo decrescente', label: 'Prezzo decrescente', id: 2 },
      { value: 'Distanza', label: 'Distanza', id: 3 },
      { value: 'Rating', label: 'Rating', id: 2 },
    ],
  },
  entGrid: [],
};

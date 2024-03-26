export const STATE_ALL = { id: 0, value: 'Tutti gli stati' };

export const DEFAULT_SORT = {
  id: 1,
  value: 'Identificativo',
};

export const SORT_ITEMS = [
  DEFAULT_SORT,
  {
    id: 2,
    value: 'Alfabetico',
  },
  {
    id: 3,
    value: 'Progressivo',
  }];

export const TableColumnsReorganizedContent = ['Id', 'Descrizione', 'Progressivo', 'Codice contenuto', 'Stato', 'Azioni'];

export const CONTENT_STATE = {
  DRAFT: 1,
  PUBLISHED: 2,
  DEACTIVATED: 3,
};

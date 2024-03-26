import { PAGE_QUERY_SERVICES } from 'types/url';

export const createPath = (sottotipo, idCategoria = '?', codSezione = '?') => {
  if (sottotipo === 99) {
    return '/menuTcb';
  }
  return `${PAGE_QUERY_SERVICES}?idCategoria=${idCategoria}&codSezione=${codSezione}`;
};

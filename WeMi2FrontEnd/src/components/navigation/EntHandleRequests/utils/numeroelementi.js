import { PAGINATION_REQUEST_ENTE } from '../constants';

export const findNumeroElementi = (pageNumber) => {
  const elementi = (pageNumber - 1) * PAGINATION_REQUEST_ENTE;
  return elementi;
};

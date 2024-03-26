import {
  ID_SERVIZIO_TATA,
  ID_SERVIZIO_COLF,
  ID_SERVIZIO_BADANTE,
  CD_TIPOLOGICA_TATA,
  CD_TIPOLOGICA_COLF,
  CD_TIPOLOGICA_BADANTE,
} from 'types/tcbConstants';

export const getIdServizio = cdServizio => {
  switch (cdServizio) {
    case CD_TIPOLOGICA_TATA:
      return ID_SERVIZIO_TATA;
    case CD_TIPOLOGICA_COLF:
      return ID_SERVIZIO_COLF;
    case CD_TIPOLOGICA_BADANTE:
      return ID_SERVIZIO_BADANTE;
    default:
      return null;
  }
};

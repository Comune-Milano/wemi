export const ID_SERVIZIO_TATA = 999997;
export const ID_SERVIZIO_COLF = 999998;
export const ID_SERVIZIO_BADANTE = 999999;

export const idServiziTCB = [ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE];

export const CD_TIPOLOGICA_TATA = 1;
export const CD_TIPOLOGICA_COLF = 2;
export const CD_TIPOLOGICA_BADANTE = 3;
export const CD_TIPOLOGICA_ALTRO = 4;

export const CD_DOMINIO_TCB_ALTRO = 0;
export const CD_DOMINIO_TCB_LAUREA = 3;

export const getNomeServizioTCB = (id) => {
  switch (id) {
    case 1 :
    case 999997:
      return 'Baby-sitter';
    case 2 :
    case 999998:
      return 'Colf';
    case 3:
    case 999999:
      return 'Badante';
    default:
      return ''
  }
};
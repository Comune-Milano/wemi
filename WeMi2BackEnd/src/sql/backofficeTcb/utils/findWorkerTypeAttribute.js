import { CD_TIPOLOGICA_TATA, CD_TIPOLOGICA_BADANTE, CD_TIPOLOGICA_COLF, ID_SERVIZIO_TATA, ID_SERVIZIO_BADANTE, ID_SERVIZIO_COLF } from "constants/db/servizio_riferimento_tcb";
import { attributo } from "constants/db/attributo";

export const findWorkerTypeAttribute = (workerType) => {

  if(!workerType){
    return;
  }

  switch(workerType){
    case CD_TIPOLOGICA_TATA:
      return ID_SERVIZIO_TATA;
    case CD_TIPOLOGICA_BADANTE:
      return ID_SERVIZIO_BADANTE;
    case CD_TIPOLOGICA_COLF:
      return ID_SERVIZIO_COLF;
    default:
      return;
  }

};
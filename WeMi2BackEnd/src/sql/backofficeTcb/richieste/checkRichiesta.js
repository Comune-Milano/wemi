import tabelle from 'tabelle';
import { attributo } from 'constants/db/attributo';

export const checkRichiesta = `
  SELECT DISTINCT id_richiesta_servizio_tcb
  FROM ${tabelle.val_attributo_domanda}
  WHERE 
    id_richiesta_servizio_tcb = $[codiceRichiesta] AND
    cd_attributo = ${attributo.CD_MOTVO_CHIUSURA_DOMANDA};
`;
import { attributo } from 'constants/db/attributo';
import tabelle from 'tabelle';

export const deleteAttributiBeneficiario = ` 
DELETE FROM ${tabelle.val_attributo_domanda}
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb]
AND cd_attributo = ${attributo.LS_MANSIONI_RICHIESTE_TATA};
`;
import tabelle from 'tabelle';

export const deleteForElimBeneficiario =  `
DELETE FROM ${tabelle.val_attributo_domanda}
  WHERE 
    id_richiesta_servizio_tcb =$[idRichiestaTcb]
    AND cd_attributo = $[attr2.cd_attributo_1]
    AND cd_val_attributo = $[attr2.cd_val_attributo_1]
    ;`;
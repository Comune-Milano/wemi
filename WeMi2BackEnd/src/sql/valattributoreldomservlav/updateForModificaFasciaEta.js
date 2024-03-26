import tabelle from 'tabelle';

export const updateForModificaFasciaEta = `
UPDATE ${tabelle.val_attributo_rel_dom_serv_lav} 
SET cd_val_attributo_2 = $[fasciaEta.cd_val_attributo]
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb]
AND pg_beneficiario_richiesta_tcb = $[pgBen] 
AND cd_attributo_2 = 8`;
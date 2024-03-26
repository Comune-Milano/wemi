import tabelle from 'tabelle';

export const deleteForInserisciModificaAttr = `DELETE FROM ${tabelle.val_attributo_beneficiario}
where id_richiesta_servizio_tcb = $[idRichiestaTcb] AND cd_attributo = $[ls]
AND
pg_beneficiario_richiesta_tcb = $[arrBen.pgBen];`;
import tabelle from 'tabelle';

export const eliminaValAttributoDatoIdRichiesta =  `
DELETE FROM ${tabelle.val_attributo_rel_dom_serv_lav}
where id_richiesta_servizio_tcb = $[idRichiestaTcb] 
AND cd_attributo_1 = $[ls]`;
;